import React, { useState, useContext } from "react";
import profileImage from "../assets/images.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

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

          {/* Auth Buttons */}
          <div className="relative flex space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-gray-800 text-white px-4 py-2 rounded font-semibold"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/signup">
                  <button className="bg-red-500 text-white px-4 py-2 rounded font-semibold">
                    Sign Up
                  </button>
                </Link>
                <Link to="/signin">
                  <button className="bg-green-500 text-white px-4 py-2 rounded font-semibold">
                    Sign In
                  </button>
                </Link>
              </>
            )}
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
          <Link to="/election">
            <p className="block text-black px-3 py-2 rounded-md text-base font-medium hover:text-indigo-600">
              Elections
            </p>
          </Link>
          <Link to="/result">
            <p className="block text-black px-3 py-2 rounded-md text-base font-medium hover:text-indigo-600">
              Results
            </p>
          </Link>
          <Link to="/notices">
            <p className="block text-black px-3 py-2 rounded-md text-base font-medium hover:text-indigo-600">
              Notices
            </p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
