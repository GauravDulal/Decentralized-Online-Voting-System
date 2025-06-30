from web3 import Web3
import json
import os
from decouple import config

# Connect to Ganache or local blockchain
web3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))

# Replace with the correct new deployed contract address
contract_address = web3.to_checksum_address("0x54510daddF522942B1d3A6eE57fd398e9496647e")

# Get the base directory of the current file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the contract ABI (ensure it's the updated one with payable vote())
with open(os.path.join(BASE_DIR, "contract_data", "Voting.json")) as f:
    voting_json = json.load(f)
    abi = voting_json["abi"]

# Instantiate contract
contract = web3.eth.contract(address=contract_address, abi=abi)

VOTING_FEE_ETH = 1  # Ether required per vote

def cast_vote(candidate_id, voter_address, private_key):
    """
    Cast a vote for a candidate on the Ethereum blockchain.

    Args:
        candidate_id (int): The ID of the candidate to vote for.
        voter_address (str): The Ethereum address of the voter.
        private_key (str): The voter's private key for signing the transaction.

    Returns:
        str: The transaction hash of the vote.
    """
    nonce = web3.eth.get_transaction_count(voter_address)

    txn = contract.functions.vote(candidate_id).build_transaction({
        'from': voter_address,
        'nonce': nonce,
        'gas': 200000,
        'gasPrice': web3.to_wei('10', 'gwei'),
        'value': web3.to_wei(VOTING_FEE_ETH, 'ether'),
    })

    signed_txn = web3.eth.account.sign_transaction(txn, private_key)
    tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)
    return web3.to_hex(tx_hash)
