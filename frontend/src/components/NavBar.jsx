import React, { useState } from "react";
import profileImage from "../assets/images.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/">
            <div className="flex items-center space-x-3  cursor-pointer">
              <img className="h-8 w-8" src={profileImage} alt="Profile" />
              <p className="font-bold text-black ">DVSUB</p>
            </div>
          </Link>

          <div className="hidden sm:flex space-x-4">
            <Link to="/election">
              <p className="text-black px-3 py-2 rounded-md text-sm font-medium hover:text-indigo-600">
                Elections
              </p>
            </Link>
            <Link to="/result">
              <p className="text-black px-3 py-2 rounded-md text-sm font-medium hover:text-indigo-600">
                Results
              </p>
            </Link>
            <Link to="/notices">
              <p className="text-black px-3 py-2 rounded-md text-sm font-medium hover:text-indigo-600">
                Notices
              </p>
            </Link>
          </div>

          {/* Profile dropdown */}
          <div className="relative flex space-x-4 ">
            <Link to="/signup">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center cursor-pointer bg-red-500 p-3 text-sm font-bold rounded focus:outline-none focus:ring-2 focus:ring-white"
              >
                {/* <img
                className="h-8 w-8 rounded-full"
                src={profileImage}
                alt="Profile"
              /> */}
                Sign Up
              </button>
            </Link>
            <Link to="/signin">
              <button className="flex items-center cursor-pointer bg-green-500 p-3 text-sm font-bold rounded focus:outline-none focus:ring-2 focus:ring-white">
                Sign In
              </button>
            </Link>

            {/* {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </div>
            )} */}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu items */}
      {menuOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1 bg-white">
          <a
            href="#"
            className="block text-black px-3 py-2 rounded-md text-base font-medium hover:text-indigo-600"
          >
            Elections
          </a>
          <a
            href="#"
            className="block text-black px-3 py-2 rounded-md text-base font-medium hover:text-indigo-600"
          >
            Results
          </a>
          <a
            href="#"
            className="block text-black px-3 py-2 rounded-md text-base font-medium hover:text-indigo-600"
          >
            Notices
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
