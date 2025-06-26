import React from "react";

export default function ConfirmationModal({
  candidate,
  candidateId,
  setCandidateId,
  onCancel,
  onConfirm,
  wallet,
  privateKey,
  setWallet,
  setPrivateKey,
  onSubmitVote,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Confirm Your Vote</h3>
        <p className="text-gray-600">
          Are you sure you want to vote for{" "}
          <span className="font-semibold">{candidate.name}</span> of{" "}
          <span className="italic">{candidate.party}</span>?
        </p>

        <div className="space-y-2">
          <label className="block text-sm text-gray-700">Candidate ID</label>
          <input
            type="text"
            className="w-full border border-black text-gray-500 px-3 py-2 rounded bg-gray-100"
            value={candidateId}
            readOnly
          />

          <label className="block text-sm text-gray-700">Wallet Address</label>
          <input
            type="text"
            placeholder="Enter your wallet address"
            className="w-full border border-black text-gray-700 px-3 py-2 rounded"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />

          <label className="block text-sm text-gray-700">Private Key</label>
          <input
            type="text"
            placeholder="Enter your private key"
            className="w-full border border-black text-gray-700 px-3 py-2 rounded"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={onSubmitVote}
          >
            Confirm & Submit Vote
          </button>
        </div>
      </div>
    </div>
  );
}
