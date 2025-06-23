import React from "react";
import Sidebar from "../src/components/Sidebar";
import StatCard from "../src/components/StatCard";
import RecentActivity from "../src/components/RecentActivity";
import QuickActions from "../src/components/QuickActions";
import OngoingCampaign from "../src/components/OngoinCampagins";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full min-h-screen bg-gray-50">
        <main className="p-6 space-y-6">
          <section className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-black">Dashboard</h2>
              <p className="text-gray-500">
                Welcome to the voting system admin panel
              </p>
            </div>
            <button className="bg-black text-white p-2 px-4 rounded mb-2 font-semibold cursor-pointer ">
              + Create New Election
            </button>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Elections"
              value="5"
              subtitle="All time"
              icon="../src/assets/notebook.png"
            />
            <StatCard
              title="Active Elections"
              value="2"
              subtitle="Currently running"
              icon="../src/assets/heart-rate.png"
            />
            <StatCard
              title="Total Voters"
              value="150"
              subtitle="All time"
              icon="../src/assets/user.png"
            />
            <StatCard
              title="Total Votes Cast"
              value="120"
              subtitle="All time"
              icon="../src/assets/vote.png"
            />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
            <div className="lg:row-span-2 space-y-4">
              <QuickActions />
              <OngoingCampaign />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
