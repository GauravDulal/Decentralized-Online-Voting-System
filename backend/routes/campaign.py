from flask import Blueprint, render_template, session, redirect, url_for, flash
from backend.services.database import (
    get_all_campaigns,
    get_candidates_by_campaign,
    get_campaign_by_id
)
from backend.services.blockchain import load_contract
import json, os

campaign_bp = Blueprint("campaign", __name__)


@campaign_bp.route('/')
def campaigns():
    if "user" not in session:
        return redirect(url_for('auth.signin'))
    campaigns = get_all_campaigns()
    return render_template('campaign.html', campaigns=campaigns)


@campaign_bp.route('/<int:campaign_id>/candidates')
def candidates(campaign_id):
    if "user" not in session:
        return redirect(url_for('auth.signin'))

    candidates = get_candidates_by_campaign(campaign_id)
    campaign = get_campaign_by_id(campaign_id)

    return render_template(
        'candidates.html',
        candidates=candidates,
        campaign_id=campaign_id,
        campaign_name=campaign["name"] if campaign else "Unknown Campaign"
    )


@campaign_bp.route('/<int:campaign_id>/vote')
def vote_page(campaign_id):
    if "user" not in session:
        flash("\u26a0\ufe0f Please log in to vote.")
        return redirect(url_for("auth.signin"))

    contract = load_contract()

    try:
        campaign_name = contract.functions.campaigns(campaign_id).call()
        candidate_count = contract.functions.candidatesCount(campaign_id).call()
    except Exception as e:
        flash("Failed to load campaign from blockchain.")
        print(f"Error: {e}")
        campaign_name = ""
        candidate_count = 0

    candidates = []
    for cid in range(1, candidate_count + 1):
        name = contract.functions.candidateNames(campaign_id, cid).call()
        candidates.append({"id": cid, "name": name})

    # Load ABI and contract address for frontend MetaMask interaction
    CONTRACT_JSON_PATH = os.getenv("CONTRACT_JSON_PATH", "truffle/build/contracts/VotingSystem.json")
    with open(CONTRACT_JSON_PATH) as f:
        contract_data = json.load(f)
        abi = contract_data["abi"]
        network_id = list(contract_data["networks"].keys())[0]
        address = contract_data["networks"][network_id]["address"]

    return render_template(
        "vote.html",
        campaign_id=campaign_id,
        campaign_name=campaign_name,
        candidates=candidates,
        contract_abi=json.dumps(abi),
        contract_address=address
    )
