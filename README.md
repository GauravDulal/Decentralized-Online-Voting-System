# Decentralized Online Voting System

This project is a full-stack decentralized voting platform built using **Django (backend)**, **React (frontend)**, and **Solidity (smart contracts)** deployed to a local Ethereum blockchain (Ganache).

---

## Project Structure

```
Decentralized-Online-Voting-System/
├── backend/                  # Django project
│   ├── manage.py
│   ├── dvs/                  # Main Django project settings
│   └── voting/               # Django app for voting logic
├── frontend/                 # React frontend
│   ├── src/
│   └── package.json
├── contracts/               # Solidity smart contracts
│   └── Voting.sol
├── migrations/              # Truffle migrations
├── truffle-config.js
└── README.md
```

---

## Prerequisites

> Make sure you have the following installed:

### System Requirements
- [Node.js](https://nodejs.org/) (v18 recommended)
- [Truffle](https://trufflesuite.com/) `npm install -g truffle`
- [Ganache](https://trufflesuite.com/ganache/) (for local Ethereum blockchain)
- [Python 3.10+](https://www.python.org/downloads/)
- [Django](https://www.djangoproject.com/)
- [MetaMask](https://metamask.io/) (browser extension)

### Python Dependencies
Run these inside the `backend/` folder:

```bash
pip install -r requirements.txt
```

If no `requirements.txt`, install manually:

```bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers web3
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/GauravDulal/Decentralized-Online-Voting-System.git
cd Decentralized-Online-Voting-System
```

### 2. Set Up Ganache

#### 🛠 Install Ganache:
- Download and install from: https://trufflesuite.com/ganache

#### 🚀 Run Ganache:
- Open the application
- Click **"QUICKSTART ETHEREUM"**
- Ganache will launch a local Ethereum blockchain on `http://127.0.0.1:7545`
- You’ll see 10 generated accounts with addresses and private keys
- Go to settings and add truffle_congif.js on the project file             

#### 🔑 Copy for later use:
- Select the **first account**
- Copy both the **wallet address** and **private key** for use in voting and MetaMask import

### 3. Connect MetaMask to Ganache

#### 🛠 Install MetaMask:
Use the [MetaMask extension](https://metamask.io/) on Chrome/Brave

#### 🔌 Add Ganache as a network:
```
Network Name: Ganache
RPC URL: http://127.0.0.1:7545
Chain ID: 1337
```

#### 🔑 Import Ganache Account:
- Open MetaMask → Click account icon
- Select **Import Account**
- Paste in the private key you copied from Ganache

### 4. Deploy Smart Contract

```bash
cd Decentralized-Online-Voting-System
npm install -g truffle        # if not installed globally
npm install                   # install local deps if needed
```

#### Configure `truffle-config.js`:
```js
networks: {
  development: {
    host: "127.0.0.1",
    port: 7545,
    network_id: "*"
  }
},
```

#### 🚀 Compile & Deploy:
```bash
truffle compile
truffle migrate --reset
```
You should see your contract deployed with a transaction hash and address.

### 5. Run Django Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
Running on: `http://127.0.0.1:8000/`

Ensure `Voting.json` exists at: `build/contracts/Voting.json`

---

### 6. Run React Frontend

```bash
cd ../frontend
npm install
npm start
```
Running on: `http://localhost:3000/`

---

## 🔑 Authentication & Voting Flow

1. **Register/Login** using React UI
2. JWT **access + refresh tokens** are saved in `localStorage`
3. Tokens are included in the headers for protected endpoints
4. Vote by sending a POST to `/api/vote/` with:
   - `candidate_id`
   - `wallet`
   - `private_key`

> Token must be sent as `Authorization: Bearer <access_token>`

---

## ✅ FULL WORKFLOW CHECKLIST

| Step | Action |
|------|--------|
| 1 | Open Ganache and copy a private key/address |
| 2 | Import that wallet into MetaMask |
| 3 | Run `truffle migrate --reset` to deploy the smart contract |
| 4 | Start Django: `python manage.py runserver` |
| 5 | Start React: `npm start` |
| 6 | Register a user via `/register` |
| 7 | Login and use token from localStorage |
| 8 | Add a candidate (if admin) |
| 9 | Vote with candidate ID, wallet address, and private key |

---
