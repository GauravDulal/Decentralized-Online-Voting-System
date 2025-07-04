from flask import Blueprint, request, render_template, redirect, url_for, flash, session
from backend.services.blockchain import load_contract, w3
from web3.middleware.geth_poa import geth_poa_middleware


admin_bp = Blueprint("admin", __name__)

# Ensure w3 uses PoA middleware if needed (Ganache)
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

# def send_transaction(func, private_key):
#     account = w3.eth.account.privateKeyToAccount(private_key)
#     nonce = w3.eth.get_transaction_count(account.address)
#     txn = func.buildTransaction({
#         'from': account.address,
#         'nonce': nonce,
#         'gas': 300000,
#         'gasPrice': w3.toWei('20', 'gwei')
#     })
#     signed_txn = w3.eth.account.sign_transaction(txn, private_key)
#     tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
#     w3.eth.wait_for_transaction_receipt(tx_hash)
#     return tx_hash.hex()

@admin_bp.route('/admin')
def admin_home():
    if "user" not in session:
        flash("Please sign in first")
        return redirect(url_for('auth.signin'))
    # You can add role checking here to allow only admin user
    return render_template('admin_home.html')

@admin_bp.route('/admin/add_campaign', methods=['GET', 'POST'])
def add_campaign():
    if request.method == 'POST':
        name = request.form['name']
        private_key = session['user']['private_key']  # Use admin private key stored in session or elsewhere

        contract = load_contract()
        func = contract.functions.addCampaign(name)
        try:
            tx_hash = send_transaction(func, private_key)
            flash(f"Campaign added with tx: {tx_hash}")
        except Exception as e:
            flash(f"Error: {str(e)}")
        return redirect(url_for('admin.add_campaign'))

    return render_template('add_campaign.html')

@admin_bp.route('/admin/add_candidate', methods=['GET', 'POST'])
def add_candidate():
    if request.method == 'POST':
        campaign_id = int(request.form['campaign_id'])
        name = request.form['name']
        wallet = request.form['wallet_address']
        private_key = session['user']['private_key']

        contract = load_contract()
        func = contract.functions.addCandidate(campaign_id, name, wallet)
        # try:
        #     tx_hash = send_transaction(func, private_key)
        #     flash(f"Candidate added with tx: {tx_hash}")
        # except Exception as e:
        #     flash(f"Error: {str(e)}")
        return redirect(url_for('admin.add_candidate'))

    # Fetch campaigns from blockchain or DB to show in dropdown
    contract = load_contract()
    campaigns = []
    count = contract.functions.campaignsCount().call()
    for i in range(1, count+1):
        campaigns.append({
            'id': i,
            'name': contract.functions.campaigns(i).call()
        })
    return render_template('add_candidate.html', campaigns=campaigns)
