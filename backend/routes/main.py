from flask import Blueprint, render_template, session
from backend.services.blockchain import load_contract, get_vote_counts
from backend.services.database import get_all_candidates

main_bp = Blueprint("main", __name__)

@main_bp.route('/')
def index():
    return render_template('index.html')

@main_bp.route('/dashboard')
def dashboard():
    if "user" not in session:
        return render_template('index.html')
    return render_template('dashboard.html')


@main_bp.route("/results")
def results():
    contract = load_contract()
    campaigns = []
    for cid in range(1, contract.functions.campaignsCount().call() + 1):
        campaign_name = contract.functions.campaigns(cid).call()
        candidate_list = []
        for i in range(1, contract.functions.candidatesCount(cid).call() + 1):
            name = contract.functions.candidateNames(cid, i).call()
            address = contract.functions.candidates(cid, i).call()
            candidate_list.append({
                "id": i,
                "name": name,
                "wallet": address
            })
        campaigns.append({
            "id": cid,
            "name": campaign_name,
            "candidates": candidate_list
        })

    return render_template("results.html", campaigns=campaigns)
