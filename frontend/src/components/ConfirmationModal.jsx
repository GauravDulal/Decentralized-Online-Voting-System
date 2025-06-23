import React from "react";

export default function ConfirmationModal({
  candidate,
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
        <input
          type="text"
          placeholder="Candidate Id"
          className="w-full border border-black text-gray-500 px-3 py-2 rounded mt-2"
          value={candidate.id}
          onChange={(e) => setCandidateId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Wallet Address"
          className="w-full border border-black text-gray-500 px-3 py-2 rounded mt-2"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Private Key"
          className="w-full border border-black text-gray-500 px-3 py-2 rounded"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />

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
