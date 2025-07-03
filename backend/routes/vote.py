from flask import Blueprint, session, redirect, url_for, flash, request
from backend.services.blockchain import load_contract, w3
from web3.exceptions import ContractLogicError

vote_bp = Blueprint("vote", __name__)

@vote_bp.route('/<int:campaign_id>/<int:candidate_id>', methods=['POST'])
def vote(campaign_id, candidate_id):
    if "user" not in session or "wallet" not in session["user"] or "private_key" not in session["user"]:
        flash("⚠️ Please connect your wallet first.")
        return redirect(url_for('auth.signin'))

    contract = load_contract()
    sender_address = session['user']['wallet']
    private_key = session['user']['private_key']

    try:
        nonce = w3.eth.get_transaction_count(sender_address)
        txn = contract.functions.vote(campaign_id, candidate_id).build_transaction({
            'from': sender_address,
            'value': w3.to_wei(1, 'ether'),
            'gas': 300000,
            'gasPrice': w3.to_wei('20', 'gwei'),
            'nonce': nonce
        })

        signed_txn = w3.eth.account.sign_transaction(txn, private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        w3.eth.wait_for_transaction_receipt(tx_hash)

        flash("✅ Vote cast successfully!")
    except ContractLogicError as e:
        message = str(e)
        if "already voted" in message:
            flash("⚠️ You have already voted in this campaign.")
        else:
            flash("⚠️ Vote failed. Please try again later.")
    except Exception:
        flash("⚠️ Unexpected error. Please check your wallet or try again.")

    return redirect(url_for('campaign.candidates', campaign_id=campaign_id))
