import React from "react";

const elections = [
  {
    id: 1,
    title: "Presidential Election 2024",
    description: "A nationwide vote to elect the next president.",
    date: "June 10, 2025",
    status: "Ongoing",
  },
  {
    id: 2,
    title: "Kathmandu Mayoral Election",
    description: "Local election to select the next mayor of Kathmandu.",
    date: "June 25, 2025",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Provincial Assembly Election",
    description: "Electing members of the provincial legislative body.",
    date: "May 15, 2025",
    status: "Completed",
  },
    {
    id: 4,
    title: "Assembly Election",
    description: "Electing members of the provincial legislative body.",
    date: "May 15, 2024",
    status: "Completed",
  },
    {
    id: 5,
    title: "Presidential Election 2027",
    description: "A nationwide vote to elect the next president.",
    date: "June 10, 2027",
    status: "Upcoming",
  },
      {
    id: 6,
    title: "Presidential Election 2027",
    description: "A nationwide vote to elect the next president.",
    date: "June 10, 2025",
    status: "Ongoing",
  },
];

const statusColors = {
  Ongoing: "bg-green-100 text-green-700",
  Upcoming: "bg-yellow-100 text-yellow-800",
  Completed: "bg-gray-200 text-gray-700",
};

export default function Elections() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32 h-screen">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base font-semibold text-indigo-600">
          Elections
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Track ongoing and upcoming elections.
        </p>

        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {elections.map((election, idx) => (
            <div
              key={election.id}
              className={`relative ${
                idx === 0 ? "lg:row-span-2" : ""
              } rounded-lg overflow-hidden shadow group`}
            >
              <div className="absolute inset-0 bg-white rounded-lg" />
              <div className="relative h-full flex flex-col justify-between p-6">
                <div>
                  <span
                    className={`inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full ${
                      statusColors[election.status]
                    }`}
                  >
                    {election.status}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {election.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {election.description}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-400">Date: {election.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
