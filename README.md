# 🗳️ Decentralized Online Voting System

A **decentralized blockchain-based voting platform** where users cast their votes by sending exactly **1 ETH** to a candidate’s wallet. All votes are securely recorded on the **Ethereum blockchain** via a smart contract.

---

## 🚀 Tech Stack

- **Backend**: Python (Flask)
- **Smart Contract**: Solidity (via Truffle)
- **Database**: MySQL
- **Frontend**: HTML + Tailwind CSS
- **Wallet Integration**: MetaMask & Web3

---

## 📁 Project Structure

```
Decentralized-Online-Voting-System/
├── backend/                  # Flask app
│   ├── routes/              # Flask Blueprints
│   ├── services/            # Web3, Contract, DB logic
│   ├── templates/           # HTML (Jinja2) templates
├── database/                # SQL setup/seeds
├── truffle/                 # Solidity contract project
│   ├── contracts/           # Voting smart contract
│   ├── build/               # ABI & bytecode
│   └── migrations/          # Truffle migration scripts
├── .env                     # Environment config
├── requirements.txt         # Python dependencies
└── README.md                # You're reading it!
```

---

## ✅ Prerequisites

Ensure these tools are installed:

- [Python 3.10+](https://www.python.org/)
- [pip](https://pip.pypa.io/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- [Node.js & npm](https://nodejs.org/)
- [Ganache](https://trufflesuite.com/ganache/)
- [Truffle](https://trufflesuite.com/) (`npm install -g truffle`)
- [MetaMask](https://metamask.io/)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourname/Decentralized-Online-Voting-System.git
cd Decentralized-Online-Voting-System
```

### 2. (Optional) Create & Activate Virtual Environment

```bash
python -m venv venv

# Activate:
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` is missing:

```bash
pip install flask flask-mysqldb web3 python-dotenv
```

### 4. Configure MySQL

```sql
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
```

### 5. Create `.env` File in Root

```
SECRET_KEY=your_secret_key
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DB=voting_system
```

---

## 🔗 Smart Contract Deployment

### 1. Compile & Deploy with Truffle

```bash
cd truffle
truffle compile
truffle migrate --reset
```

### 2. Update Contract Info

- Copy ABI:

```bash
cp build/contracts/VotingSystem.json ../backend/services/contract_data/Voting.json
```

- Update contract address in `backend/services/blockchain.py`:

```python
contract_address = "0xYourDeployedContractAddress"
```

---

## ▶️ Run the App

Start Ganache and ensure the network matches Truffle config.

Then, from the root directory:

```bash
python -m backend.app
```

Visit: [http://localhost:5000](http://localhost:5000)

---

## 🧑‍💻 Usage Guide

### 👤 Users

- Register with email, password, and wallet address
- View campaigns and vote using MetaMask (1 ETH required)
- Can vote **once per campaign**

### 🛠️ Admin

- Add campaigns
- Add candidates with wallet addresses

---

## 💡 How Voting Works

- Each vote = **1 ETH** sent to a candidate's wallet
- Voting enforced by smart contract:
  - Exact payment (1 ETH)
  - Only one vote per campaign per wallet

- Votes stored on-chain:

```solidity
candidateVotes[campaignId][candidateId]
```

- Flask reads this value via Web3 and displays it in `results.html`

---

## 📌 Tips

- Switch MetaMask to **Ganache local network**
- Use test accounts with ETH from Ganache
- Use `print()` or logs in Flask/Truffle for debugging

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
