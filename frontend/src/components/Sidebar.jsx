// Sidebar.jsx
import { useState } from "react";
import {
  LayoutDashboard,
  SquareCheck,
  Users,
  UserRound,
  BarChart2,
  Settings,
  Menu,
  X
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Elections", icon: SquareCheck },
  { name: "Candidates", icon: Users },
  { name: "Voters", icon: UserRound },
  { name: "Results", icon: BarChart2 },
  { name: "Settings", icon: Settings }
];

export default function Sidebar() {
  const [active, setActive] = useState("Elections"); // Default to Elections as in your image
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-white h-full w-64 p-4 shadow-md space-y-4 fixed md:relative transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close Button on Mobile */}
        <div className="flex justify-end md:hidden mb-2 text-black cursor-pointer font-bold">
          <button onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {navItems.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition
              ${active === name ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
            onClick={() => {
              setActive(name);
              setIsOpen(false); // close sidebar on mobile after click
            }}
          >
            <Icon size={20} />
            <span>{name}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
