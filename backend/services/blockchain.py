import os
import json
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

RPC_URL = os.getenv("RPC_URL", "http://127.0.0.1:7545")
CONTRACT_JSON_PATH = os.getenv("CONTRACT_JSON_PATH", "truffle/build/contracts/VotingSystem.json")

w3 = Web3(Web3.HTTPProvider(RPC_URL))

def load_contract():
    with open(CONTRACT_JSON_PATH) as f:
        contract_data = json.load(f)
        abi = contract_data["abi"]
        network_id = list(contract_data["networks"].keys())[0]
        address = contract_data["networks"][network_id]["address"]
    return w3.eth.contract(address=address, abi=abi)

def get_vote_counts(contract):
    vote_events = contract.events.VoteCast().get_logs(fromBlock=0, toBlock='latest')
    counts = {}
    for event in vote_events:
        c_id = event.args.campaignId
        candidate_id = event.args.candidateId
        key = (c_id, candidate_id)
        counts[key] = counts.get(key, 0) + 1
    return counts
