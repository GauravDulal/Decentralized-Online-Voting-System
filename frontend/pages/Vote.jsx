import React, { useEffect, useState } from "react";
import CandidateCard from "../src/components/CandidateCard";
import ProfileModal from "../src/components/ProfileModal";
import ConfirmationModal from "../src/components/ConfirmationModal";
import ToastNotification from "../src/components/ToastNotification";
import { vote, refreshToken } from "../src/api";

const campaigns = [
  {
    id: 1,
    title: "Presidential Election 2024",
    endTime: new Date("2025-06-20T23:59:59"),
    posts: [
      "Voting starts June 10, 2025 at 8:00 AM.",
      "Bring valid digital ID to vote.",
    ],
    candidates: [
      {
        id: 1,
        name: "Alice Johnson",
        party: "Unity Party",
        bio: "Former senator and civil rights advocate.",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: 2,
        name: "Michael Lee",
        party: "Progressive Front",
        bio: "Tech entrepreneur and education reformist.",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Kathmandu Mayoral Election",
    endTime: new Date("2025-06-25T18:00:00"),
    posts: ["Deadline to vote: June 25, 2025.", "Each resident may vote once."],
    candidates: [
      {
        id: 1,
        name: "Ramesh Thapa",
        party: "People's Voice",
        bio: "Community organizer and environmentalist.",
        photo: "https://randomuser.me/api/portraits/men/50.jpg",
      },
      {
        id: 2,
        name: "Sunita Shrestha",
        party: "Democratic Forum",
        bio: "Urban planner with 10 years of experience.",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
      },
    ],
  },
];
export default function Vote() {
  const [remainingTimes, setRemainingTimes] = useState({});
  const [votes, setVotes] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const updated = {};
      campaigns.forEach((camp) => {
        const diff = Math.max(0, (camp.endTime - now) / 1000);
        const h = Math.floor(diff / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = Math.floor(diff % 60);
        updated[camp.id] = `${h}h ${m}m ${s}s`;
      });
      setRemainingTimes(updated);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVoteChange = (campaignId, candidateId, candidate) => {
    setVotes((prev) => ({ ...prev, [campaignId]: candidateId }));
  };

  const handleVoteSubmit = (campaignId) => {
    const candidateId = votes[campaignId];
    const campaign = campaigns.find((c) => c.id === campaignId);
    const candidate = campaign?.candidates.find((c) => c.id === candidateId);

    if (candidate) {
      setConfirmationModal({ campaignId, candidate });
    }
  };

  const confirmVote = () => {
    setCandidateId(confirmationModal.candidate.id);
    setToastMessage(
      `Vote successfully cast for ${confirmationModal.candidate.name}!`
    );
    setConfirmationModal(null);
  };

  const [candidateId, setCandidateId] = useState("");
  const [wallet, setWallet] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleVote = async () => {
    try {
      console.log("Voting with", { candidateId, wallet, privateKey });

      let token = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        alert("Refresh token not found. Please log in again.");
        return;
      }

      // Try refreshing access token
      const refreshRes = await refreshToken(refresh);
      token = refreshRes.data.access;
      localStorage.setItem("access", token);

      const res = await vote(token, candidateId, wallet, privateKey);
      alert(`Voted! Tx Hash: ${res.data.tx_hash}`);
    } catch (err) {
      console.error("Vote failed with error:", err);
      alert("Vote failed. Please try again or re-login.");
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen pt-20 px-6 lg:px-20 py-10 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-700">Vote Now</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Choose your candidates and shape the future — securely and easily.
        </p>
      </div>

      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="bg-white shadow rounded-lg p-6 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {campaign.title}
              </h2>
              <p className="text-sm text-gray-500">
                ⏳ Ends in:{" "}
                <span className="text-indigo-600">
                  {remainingTimes[campaign.id]}
                </span>
              </p>
            </div>
            <button
              onClick={() => handleVoteSubmit(campaign.id)}
              disabled={!votes[campaign.id]}
              className={`mt-4 sm:mt-0 px-4 py-2 text-white rounded transition ${
                votes[campaign.id]
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Cast Vote
            </button>
          </div>

          <div className="bg-indigo-50 rounded-md p-4">
            <h3 className="text-sm font-semibold text-indigo-700 mb-2">
              📝 Important Notes:
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {campaign.posts.map((post, index) => (
                <li key={index}>{post}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaign.candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                campaignId={campaign.id}
                isSelected={votes[campaign.id] === candidate.id}
                onSelect={handleVoteChange}
                onViewProfile={setSelectedCandidate}
              />
            ))}
          </div>
        </div>
      ))}

      {selectedCandidate && (
        <ProfileModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

      {confirmationModal && (
        <ConfirmationModal
          candidate={confirmationModal.candidate}
          onCancel={() => setConfirmationModal(null)}
          onConfirm={confirmVote}
          wallet={wallet}
          privateKey={privateKey}
          setWallet={setWallet}
          setPrivateKey={setPrivateKey}
          onSubmitVote={handleVote}
        />
      )}

      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
