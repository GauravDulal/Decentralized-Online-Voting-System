from flask import Blueprint, jsonify
import json
from backend.services.blockchain import load_contract

contract_info_bp = Blueprint("contract_info", __name__)

@contract_info_bp.route("/contract-info")
def contract_info():
    contract = load_contract()
    return jsonify({
        "address": contract.address,
        "abi": contract.abi
    })
