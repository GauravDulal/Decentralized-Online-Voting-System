from flask import Blueprint, render_template
from backend.services.blockchain import load_contract, w3

result_bp = Blueprint("result", __name__)


@result_bp.route("/results/<int:campaign_id>")
def results(campaign_id):
    contract = load_contract()
    try:
        campaign_name = contract.functions.campaigns(campaign_id).call()
    except Exception as e:
        print(f"Error fetching campaign name: {e}")
        campaign_name = ""

    try:
        candidate_count = contract.functions.candidatesCount(campaign_id).call()
        print(f"Candidate count for campaign {campaign_id}: {candidate_count}")
    except Exception as e:
        print(f"Error getting candidate count: {e}")
        candidate_count = 0

    results = []

    for cid in range(1, candidate_count + 1):
        try:
            name = contract.functions.candidateNames(campaign_id, cid).call()
            votes = contract.functions.candidateVotes(campaign_id, cid).call()
            results.append({"name": name, "votes": votes})
        except Exception as e:
            print(f"Error fetching candidate {cid}: {e}")

    return render_template(
        "result_campaign.html", results=results, campaign_name=campaign_name
    )
