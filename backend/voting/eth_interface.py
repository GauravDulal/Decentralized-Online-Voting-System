from web3 import Web3
import json
import os
from decouple import config

# Connect to Ganache CLI (local Ethereum blockchain for development)
web3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))

# Set the deployed contract address (replace with your contract's address if different)
contract_address = web3.to_checksum_address("0xe211B4cD860dB51E852190D48a5d7490A8C0255A")

# Get the base directory of the current file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the contract ABI from the compiled contract JSON file
with open(os.path.join(BASE_DIR, "contract_data", "Voting.json")) as f:
    voting_json = json.load(f)
    abi = voting_json["abi"]

# Create a contract instance to interact with the deployed contract
contract = web3.eth.contract(address=contract_address, abi=abi)

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
    # Get the current transaction count (nonce) for the voter address
    nonce = web3.eth.get_transaction_count(voter_address)

    # Build the transaction to call the vote function of the contract
    txn = contract.functions.vote(candidate_id).build_transaction({
        "chainId": 1337,  # Chain ID for Ganache (may differ in other networks)
        "from": voter_address,
        "nonce": nonce,
        "gas": 2000000,  # Gas limit for the transaction
        "gasPrice": web3.to_wei("5", "gwei")  # Gas price
    })

    # Sign the transaction with the voter's private key
    signed_txn = web3.eth.account.sign_transaction(txn, private_key)
    # Send the signed transaction to the blockchain
    tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)

    # Return the transaction hash as a hex string
    return web3.to_hex(tx_hash)

