async function castVote(campaignId, candidateId) {
const status = document.getElementById("status");
status.textContent = "⏳ Waiting for MetaMask...";

if (typeof window.ethereum === 'undefined') {
status.textContent = "⚠️ MetaMask not detected. Please install it.";
return;
}

try {
const [account] = await ethereum.request({ method: 'eth_requestAccounts' });
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

const tx = await contract.vote(campaignId, candidateId, {
  value: ethers.utils.parseEther("1"),
  gasLimit: 300000,
});

status.textContent = "⏳ Waiting for transaction to confirm...";
await tx.wait();

status.textContent = "✅ Vote successfully cast!";
} catch (err) {
    alert("MetaMask not found. Please install MetaMask.");
}
}
