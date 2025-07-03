🗳️ Decentralized Online Voting System

A decentralized blockchain-based voting platform where users cast their votes by sending exactly 1 ETH to a candidate’s wallet. The vote is recorded on the Ethereum blockchain via a smart contract.

Built with:

Python (Flask) for the backend

Solidity smart contract (via Truffle)

MySQL for user/campaign/candidate data

HTML + Tailwind CSS for frontend

MetaMask & Web3 for wallet interaction

📁 Project Structure

Decentralized-Online-Voting-System/
├── backend/                  # Flask app
│   ├── routes/              # Flask Blueprints
│   ├── services/            # Contract/web3/db logic
│   ├── templates/           # HTML templates
│   └── __pycache__/
├── database/                # SQL setup files or seeds
├── truffle/                 # Smart contract project
│   ├── build/               # Compiled artifacts (ABI, bytecode)
│   ├── contracts/           # Solidity source files
│   └── migrations/          # Truffle deployment scripts
├── .env                     # Environment config
├── requirements.txt         # Python dependencies
└── README.md                # Project guide

✅ Prerequisites

Install the following tools on a clean machine:

Python 3.10 or higher

pip

MySQL Server (with user access)

Node.js & npm

Ganache (GUI or CLI)

Truffle (npm install -g truffle)

MetaMask browser extension

⚖️ Setup Instructions

Clone this repository

git clone https://github.com/yourname/Decentralized-Online-Voting-System.git
cd Decentralized-Online-Voting-System

(Optional) Set up a virtual environment

python -m venv venv
# Activate:
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

Install Python dependencies

pip install -r requirements.txt

If requirements.txt is missing, manually install:

pip install flask flask-mysqldb web3 python-dotenv

Configure MySQL database

In MySQL:

CREATE DATABASE voting_system;

USE voting_system;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  wallet_address VARCHAR(255)
);

CREATE TABLE campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE candidates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  campaign_id INT,
  wallet_address VARCHAR(255),
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
);

Create a .env file in root

SECRET_KEY=your_secret_key
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DB=voting_system

Set up and deploy the smart contract

cd truffle
truffle compile
truffle migrate --reset

Update contract address and ABI

Copy VotingSystem.json from truffle/build/contracts/ to backend/services/contract_data/Voting.json

In backend/services/blockchain.py, replace the contract address:

contract_address = "0xYourDeployedContractAddress"

Start Ganache and ensure it matches the Truffle network config

Run the Flask app

From root folder:

python -m backend.app

Visit: http://localhost:5000

🔍 Usage Guide

Register with email, password, wallet address

Admin:

Add campaigns

Add candidates with their wallet addresses

Users:

View campaigns and vote by sending 1 ETH (via MetaMask)

Can vote once per campaign

Results:

Real-time vote count per candidate using candidateVotes mapping on-chain

💡 How Voting Works

Each vote = 1 ETH sent to a candidate's wallet

Voter must not have voted before in that campaign

Smart contract enforces:

Exact payment (1 ETH)

One vote per wallet per campaign

candidateVotes[campaignId][candidateId] stores on-chain vote totals

Flask pulls this value via Web3 and displays it in results.html

✅ Tips

Use MetaMask and switch to Ganache network

Use Ganache accounts with enough ETH for test voting

Use print statements/logs for debugging contract and Flask errors

Let me know if you want this file saved or zipped with the project!

