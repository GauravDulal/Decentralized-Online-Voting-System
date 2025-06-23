import React from "react";

export default function CandidateCard({
  candidate,
  campaignId,
  isSelected,
  onSelect,
  onViewProfile,
}) {
  return (
    <label
      className={`cursor-pointer border p-4 rounded-lg ... ${
        isSelected
          ? "border-green-500 ring-1 ring-green-300"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">{candidate.name}</h3>
        <input
          type="radio"
          name={`vote-${campaignId}`}
          value={candidate.id}
          checked={isSelected}
          onChange={() => onSelect(campaignId, candidate.id, candidate)}
          className="w-4 h-4 text-indigo-600"
        />
      </div>
      <p className="text-sm text-gray-500">{candidate.party}</p>
      <button
        type="button"
        onClick={() => onViewProfile(candidate)}
        className="text-sm text-indigo-700 hover:underline w-fit"
      >
        View Profile
      </button>
    </label>
  );
}
