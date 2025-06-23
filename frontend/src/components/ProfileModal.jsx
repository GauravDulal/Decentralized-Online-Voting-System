import React from "react";

export default function ProfileModal({ candidate, onClose }) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-30"></div>
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative z-10">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={candidate.photo}
            alt={candidate.name}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <h2 className="text-xl font-semibold text-gray-800">{candidate.name}</h2>
          <p className="text-sm text-gray-500">{candidate.party}</p>
          <p className="text-sm text-gray-600 text-center">{candidate.bio}</p>
        </div>
      </div>
    </div>
  );
}