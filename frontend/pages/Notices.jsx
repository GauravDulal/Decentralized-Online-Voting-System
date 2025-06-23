import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const allNotices = [
  {
    title: "Presidential Elections - Final Round",
    description: "Voting begins on June 20, 9:00 AM to June 21, 5:00 PM. Ensure you’re registered.",
    tag: "Important",
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Candidate Debate Schedule",
    description: "Debates go live on June 18. Submit your questions early to participate.",
    tag: "Event",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Voter Registration Closed",
    description: "Late forms after June 15 won’t be accepted.",
    tag: "Alert",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Live Result Stream",
    description: "Real-time results will be broadcast from June 21 evening.",
    tag: "Update",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Security Guidelines",
    description: "Report any suspicious voting behavior via the official portal.",
    tag: "Security",
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Public Holiday Announcement",
    description: "Election Day (June 20) declared a public holiday.",
    tag: "Event",
    color: "bg-green-100 text-green-600",
  },
];

const tabs = ["All", "Important", "Alert", "Event", "Update", "Security"];

const NoticeCard = ({ title, description, tag, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-2xl bg-white shadow-md border border-gray-200 transition-all"
  >
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <span className={`text-xs px-2 py-1 rounded ${color}`}>{tag}</span>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

const Notices = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filtered = allNotices.filter((notice) => {
    const matchSearch =
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.description.toLowerCase().includes(search.toLowerCase());

    const matchTab = activeTab === "All" || notice.tag === activeTab;
    return matchSearch && matchTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">📢 Election Noticeboard</h1>
          <p className="text-gray-500 mt-2">
            All important updates, announcements, and alerts for the Decentralized Voting System.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 ">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search notices..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.length > 0 ? (
            filtered.map((notice, index) => <NoticeCard key={index} {...notice} />)
          ) : (
            <div className="col-span-full text-center text-gray-400 italic">
              No matching notices found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notices;
