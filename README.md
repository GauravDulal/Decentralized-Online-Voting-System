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

### 2. Setup the Smart Contract

```bash
truffle compile
truffle migrate --reset
```

> Make sure Ganache is running at `http://127.0.0.1:7545`

### 3. Setup Django Backend

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # Optional for admin access
python manage.py runserver
```

> If `UnicodeEncodeError` appears, remove emojis from `print()` statements.

### 4. Enable CORS in `backend/dvs/settings.py`

```python
INSTALLED_APPS += [
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

### 5. Setup React Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## 🔑 Authentication & Voting Flow

1. **Register/Login** using React UI
2. Obtain JWT access token on login
3. Store and use token for authenticated requests
4. Cast vote by sending POST `/api/vote/` with:
   - `candidate_id`
   - `wallet`
   - `private_key`

> Token must be sent as `Bearer` in `Authorization` header.

---

