import React from "react";

const elections = [
  {
    id: 1,
    title: "Presidential Election 2024",
    totalVotes: 5000,
    date: "June 10, 2025",
    status: "Completed",
    candidates: [
      { id: 1, name: "Alice Johnson", party: "Unity Party", votes: 2500 },
      { id: 2, name: "Michael Lee", party: "Progressive Front", votes: 2000 },
      { id: 3, name: "Sophia K.", party: "Green Alliance", votes: 500 },
    ],
  },
  {
    id: 2,
    title: "Mayoral Election - Kathmandu",
    totalVotes: 3200,
    date: "May 20, 2025",
    status: "Ongoing",
    candidates: [
      { id: 1, name: "Ramesh Thapa", party: "People's Voice", votes: 1700 },
      { id: 2, name: "Sunita Shrestha", party: "Democratic Forum", votes: 1500 },
    ],
  },
];

export default function ElectionResultsPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-16 flex flex-col gap-8">
      {elections.map((election) => (
        <div key={election.id} className="bg-white p-6 rounded shadow">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-indigo-700">{election.title}</h1>
            <p className="text-sm text-gray-500 mb-2">{election.date}</p>
            <span className={`inline-block ${
              election.status === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-800"
            } px-3 py-1 rounded-full text-xs font-semibold`}>
              {election.status}
            </span>
            <p className="mt-2 text-sm text-gray-600">
              Total Votes Cast: <strong>{election.totalVotes}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {election.candidates.map((candidate) => {
              const percentage = ((candidate.votes / election.totalVotes) * 100).toFixed(1);
              return (
                <div
                  key={candidate.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{candidate.party}</p>
                  <div className="text-sm text-gray-600 mb-1">
                    Votes: {candidate.votes} ({percentage}%)
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
