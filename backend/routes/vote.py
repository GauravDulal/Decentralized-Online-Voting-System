from flask import Blueprint, render_template, session, redirect, url_for, flash
from backend.services.blockchain import load_contract
import json
import os

vote_bp = Blueprint("vote", __name__)

@vote_bp.route('/')
def choose_campaign():
    contract = load_contract()

    campaign_list = []
    try:
        total = contract.functions.campaignsCount().call()
        for cid in range(1, total + 1):
            name = contract.functions.campaigns(cid).call()
            campaign_list.append({"id": cid, "name": name})
    except:
        pass

    return render_template("select_campaign.html", campaigns=campaign_list)

@vote_bp.route('/<int:campaign_id>')
def vote_page(campaign_id):
    if "user" not in session:
        flash("\u26a0\ufe0f Please log in to vote.")
        return redirect(url_for("auth.signin"))

    contract = load_contract()

    try:
        campaign_name = contract.functions.campaigns(campaign_id).call()
        candidate_count = contract.functions.candidatesCount(campaign_id).call()
    except:
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

    return render_template("vote.html",
                           campaign_id=campaign_id,
                           campaign_name=campaign_name,
                           candidates=candidates,
                           contract_abi=json.dumps(abi),
                           contract_address=address)
