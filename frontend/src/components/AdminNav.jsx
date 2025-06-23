import React from 'react';
import profileImage from "../assets/images.png";

const AdminNav = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <h1 className="text-2xl font-semibold">Admin Dashboard <span className="text-green-600 text-sm ml-2">Live</span></h1>
      <div className="flex items-center gap-4">
         <img src={profileImage} alt="" className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer"/>
      </div>
    </header>
  );
};

export default AdminNav;
