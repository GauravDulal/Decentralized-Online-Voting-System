import os
import json
from web3 import Web3
from dotenv import load_dotenv
from backend.services.database import get_all_campaigns, get_candidates_by_campaign

load_dotenv()

RPC_URL = os.getenv("RPC_URL", "http://127.0.0.1:7545")
CONTRACT_JSON_PATH = os.getenv("CONTRACT_JSON_PATH", "truffle/build/contracts/VotingSystem.json")

# Web3 connection
w3 = Web3(Web3.HTTPProvider(RPC_URL))

def load_contract():
    with open(CONTRACT_JSON_PATH) as f:
        contract_data = json.load(f)
        abi = contract_data["abi"]
        network_id = list(contract_data["networks"].keys())[0]
        address = contract_data["networks"][network_id]["address"]
    return w3.eth.contract(address=address, abi=abi)

def get_vote_counts(contract):
    try:
        vote_events = contract.events.VoteCast().get_logs(fromBlock=0, toBlock='latest')
    except Exception as e:
        print(f"Error fetching VoteCast events: {e}")
        return {}

    counts = {}
    for event in vote_events:
        c_id = event.args.campaignId
        candidate_id = event.args.candidateId
        key = (c_id, candidate_id)
        counts[key] = counts.get(key, 0) + 1
    return counts

def get_votes_from_blockchain(contract):
    """Returns detailed vote info per candidate, and total votes."""
    campaigns = get_all_campaigns()
    vote_counts = get_vote_counts(contract)

    result = []
    total_votes = 0

    for camp in campaigns:
        campaign_id = camp["id"]
        candidates = get_candidates_by_campaign(campaign_id)

        for idx, cand in enumerate(candidates, 1):
            vote_key = (campaign_id, idx)
            votes = vote_counts.get(vote_key, 0)
            total_votes += votes

            result.append({
                "campaign_id": campaign_id,
                "campaign_name": camp["name"],
                "candidate_id": idx,
                "candidate_name": cand["name"],
                "wallet": cand["wallet_address"],
                "votes": votes
            })

    return result, total_votes
