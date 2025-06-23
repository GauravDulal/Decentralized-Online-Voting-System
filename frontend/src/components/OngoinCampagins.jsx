import React from "react";

const campaigns = [
  {
    id: 1,
    title: "Presidential Election 2024",
    description: "National level election for the new president.",
    status: "Ongoing",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
  },
  {
    id: 2,
    title: "Mayoral Election - Kathmandu",
    description: "Electing the new mayor of Kathmandu.",
    status: "Ongoing",
    startDate: "2025-06-10",
    endDate: "2025-06-20",
  },
  // Add more campaigns here
];

export default function OngoingCampaign() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-black">Ongoing Campaigns</h2>
      <div className="grid grid-row-1 md:grid-row-2 gap-4 cursor-pointer">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="border p-4 rounded-lg hover:shadow transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-blue-700">
                {campaign.title}
              </h3>
              <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                {campaign.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
            <p className="text-xs text-gray-400">
              {campaign.startDate} - {campaign.endDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
