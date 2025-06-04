import React, { useState } from 'react';
import { vote } from '../api';

function Dashboard() {
  const [candidateId, setCandidateId] = useState('');
  const [wallet, setWallet] = useState('');
  const [privateKey, setPrivateKey] = useState('');

const handleVote = async () => {
  try {
    console.log("Voting with", { candidateId, wallet, privateKey });
    const token = localStorage.getItem('access');
    console.log("Token:", token);

    const res = await vote(token, candidateId, wallet, privateKey);
    alert(`Voted! Tx Hash: ${res.data.tx_hash}`);
  } catch (err) {
    console.error("Vote failed with error:", err);
    alert('Vote failed');
  }
};


  return (
    <div>
      <h2>Vote for a Candidate</h2>
      <input placeholder="Candidate ID" onChange={(e) => setCandidateId(e.target.value)} />
      <input placeholder="Wallet Address" onChange={(e) => setWallet(e.target.value)} />
      <input placeholder="Private Key" type="password" onChange={(e) => setPrivateKey(e.target.value)} />
      <button onClick={handleVote}>Vote</button>
    </div>
  );
}

export default Dashboard;