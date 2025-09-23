// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
import useAuth from "../hooks/useAuth";
import ProfilePanel from "./profilePanel";

const Navbar = () => {
  const { user, isLoggedIn, setIsLoggedIn } = useUserData();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="font-bold text-xl">Club Manager</Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center ">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/clubs" className="hover:text-gray-300">Clubs</Link>
            <Link to="/events" className="hover:text-gray-300">Events</Link>
            <Link to="/announcements" className="hover:text-gray-300">Announcements</Link>


            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setIsSidePanelOpen(true)}
                  className="text-gray-800 font-medium hover:text-blue-600 transition"
                >
                  <span className="mr-2">Hello, {user.first_name}</span>
                </button>

                <button
                  onClick={logout}
                  className="bg-green-600 cursor-pointer px-3 py-1 rounded border-2 border-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
                <Link to="/register" className="hover:text-gray-300">Register</Link>
              </>
            )}
          </div>

          {/* Profile Panel */}
          <ProfilePanel isOpen={isSidePanelOpen} onClose={() => setIsSidePanelOpen(false)} />

          {/* Hamburger for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-teal-600 px-2 pt-2 pb-3 space-y-1 absolute w-full  z-100">
          <Link to="/" className="block px-3 py-10 rounded hover:bg-blue-500  hover: bg-teal-600">Home</Link>
          <Link to="/clubs" className="block px-3 py-10 rounded hover:bg-blue-500 my-10">Clubs</Link>
          <Link to="/events" className="block px-3 py-10 rounded hover:bg-blue-500 my-10">Events</Link>
          <Link to="/announcements" className="block px-3 py-10 rounded hover:bg-blue-500 my-10">Announcements</Link>
          {isAuthenticated ? (
            <>
              <span className="block px-3 py-2 font-semibold my-10">Hello, {user.first_name}</span>
              <button
                onClick={logout}
                className="block w-full text-left px-3 py-2 rounded bg-green-600 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 rounded hover:bg-blue-500">Login</Link>
              <Link to="/register" className="block px-3 py-2 rounded hover:bg-blue-500">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
