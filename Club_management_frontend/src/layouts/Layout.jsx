// src/components/Layout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

const Layout = () => {
    const { isLoggedIn, user } = useUserData();
    const { logout, isAuthenticated } = useAuth();

    return (
        <div>
            {/* Navigation Bar */}
            {/* <nav style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
                <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
                <Link to="/clubs" style={{ marginRight: "1rem" }}>Clubs</Link>
                <Link to="/events" style={{ marginRight: "1rem" }}>Events</Link>

                {isAuthenticated && isLoggedIn ? (
                    <>
                        <span style={{ marginRight: "1rem" }}>Hello, {user.username}</span>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-200"
                            onClick={() => {
                                // Add your logout logic here
                                logout();
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav> */}

            <Navbar/>

            {/* Outlet renders nested routes */}
            <main style={{ padding: "1rem" }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
