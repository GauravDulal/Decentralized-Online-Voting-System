import React from "react";

export default function ToastNotification({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-green-500 text-white px-4 py-3 rounded shadow-lg flex items-center gap-2">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold">&times;</button>
      </div>
    </div>
  );
}
