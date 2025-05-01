from web3 import Web3
import json

w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8000"))  # Ganache
with open("VotingABI.json") as f:
    abi = json.load(f)

contract = w3.eth.contract(address="0xYourContractAddress", abi=abi)

def cast_vote(candidate_id, wallet, private_key):
    tx = contract.functions.vote(candidate_id).build_transaction({
        'from': wallet,
        'nonce': w3.eth.get_transaction_count(wallet),
        'gas': 3000000,
        'gasPrice': w3.to_wei('20', 'gwei')
    })
    signed = w3.eth.account.sign_transaction(tx, private_key)
    tx_hash = w3.eth.send_raw_transaction(signed.rawTransaction)
    return tx_hash.hex()
