import React from "react";
import { Plus, Eye, Users, BadgePlus } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-bold mb-4 text-black">
        Quick Actions
      </h2>

      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 mb-3 transition-all cursor-pointer">
        <Plus size={16} />
        Create New Election
      </button>

      <div className="flex flex-col gap-2">
        <button className="flex items-center gap-2 w-full px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer">
          <Eye size={16} />
          View Results
        </button>

        <button className="flex items-center gap-2 w-full px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer">
          <Users size={16} />
          Manage Voters
        </button>

        <button className="flex items-center gap-2 w-full px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer">
          <BadgePlus size={16} />
          Manage Candidates
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
