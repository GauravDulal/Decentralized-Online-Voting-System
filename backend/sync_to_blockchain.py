import os
from backend.services.database import get_all_campaigns, get_candidates_by_campaign
from backend.services.blockchain import load_contract, w3
from web3.middleware import geth_poa_middleware
from backend import create_app

# Inject middleware once
try:
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
except ValueError:
    pass

app = create_app()
OWNER_PRIVATE_KEY = "0x2ecf67c819d52b3fa6e2300889c01ad377695c135c18a92977d606a1d76b050d"
if not OWNER_PRIVATE_KEY:
    raise ValueError("Missing OWNER_PRIVATE_KEY environment variable!")

def send_transaction(func, private_key):
    account = w3.eth.account.privateKeyToAccount(private_key)
    nonce = w3.eth.get_transaction_count(account.address)
    
    gas_price = w3.eth.gas_price
    try:
        estimated_gas = func.estimateGas({'from': account.address})
    except Exception:
        estimated_gas = 300000

    txn = func.buildTransaction({
        'from': account.address,
        'nonce': nonce,
        'gas': estimated_gas,
        'gasPrice': gas_price,
    })
    try:
        signed_txn = w3.eth.account.sign_transaction(txn, private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        if receipt.status != 1:
            print(f"Transaction failed: {tx_hash.hex()}")
            return None
        return tx_hash.hex()
    except Exception as e:
        print(f"Transaction error: {e}")
        return None

def sync():
    with app.app_context():
        contract = load_contract()
        campaigns = get_all_campaigns()

        onchain_campaigns_count = contract.functions.campaignsCount().call()

        for camp in campaigns:
            if camp['id'] <= onchain_campaigns_count:
                print(f"Skipping existing campaign {camp['name']} (id {camp['id']})")
                continue

            print(f"Adding campaign: {camp['name']}")
            tx_hash = send_transaction(contract.functions.addCampaign(camp['name']), OWNER_PRIVATE_KEY)
            if not tx_hash:
                continue

            candidates = get_candidates_by_campaign(camp['id'])
            for cand in candidates:
                tx_hash = send_transaction(
                    contract.functions.addCandidate(camp['id'], cand['name'], cand['wallet_address']),
                    OWNER_PRIVATE_KEY
                )
                if not tx_hash:
                    print(f"Failed to add candidate {cand['name']}")

def verify_sync():
    with app.app_context():
        contract = load_contract()
        campaigns_db = get_all_campaigns()
        onchain_campaigns_count = contract.functions.campaignsCount().call()
        print(f"On-chain campaigns: {onchain_campaigns_count}, DB campaigns: {len(campaigns_db)}")

        for camp in campaigns_db:
            cid = camp['id']
            onchain_name = contract.functions.campaigns(cid).call()
            if onchain_name != camp['name']:
                print(f"Mismatch campaign {cid} name: DB {camp['name']} vs Onchain {onchain_name}")

            candidates_db = get_candidates_by_campaign(cid)
            onchain_candidates_count = contract.functions.candidatesCount(cid).call()
            if onchain_candidates_count != len(candidates_db):
                print(f"Mismatch candidates count in campaign {cid}")

            for idx, cand in enumerate(candidates_db, 1):
                onchain_cand_name = contract.functions.candidateNames(cid, idx).call()
                onchain_cand_wallet = contract.functions.candidates(cid, idx).call()
                if onchain_cand_name != cand['name'] or onchain_cand_wallet.lower() != cand['wallet_address'].lower():
                    print(f"Mismatch candidate {idx} in campaign {cid}")

if __name__ == "__main__":
    sync()
    verify_sync()
