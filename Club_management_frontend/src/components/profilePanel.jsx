// components/ProfilePanel.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserData } from "../context/UserDataContext";


const ProfilePanel = ({ isOpen, onClose }) => {
    const { user, isLoggedIn } = useUserData();
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Background Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-gray   backdrop-blur-sm z-40"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Side Panel */}
                    <motion.div
                        className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50 p-6 overflow-y-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-black text-xl font-bold">Profile</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-red-500 transition"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Profile Info */}
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover mb-3"
                            />
                            <h3 className="text-xl font-bold text-black ">{user?.first_name+" "+user?.last_name }</h3>
                            <p className="text-gray-600 text-sm">{user?.email}</p>
                            <div className="flex gap-4 mt-4">
                                <div className="text-center">
                                    <p className="text-black font-bold text-lg">287,401</p>
                                    <p className="text-gray-500 text-sm">Points</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-black font-bold text-lg">2,412</p>
                                    <p className="text-gray-500 text-sm">Stars</p>
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="space-y-4 text-gray-600">
                            <h4 className="text-gray-500 uppercase text-xs font-semibold">For Organizers</h4>
                            <ul className="space-y-2 ">
                                <li className="cursor-pointer hover:text-blue-600">Organizer Dashboard</li>
                                <li className="cursor-pointer hover:text-blue-600">My Jobs & Internships</li>
                                <li className="cursor-pointer hover:text-blue-600">My Opportunities</li>
                            </ul>

                            <h4 className="text-black gray-500 uppercase text-xs font-semibold  mt-6">For Users</h4>
                            <ul className="space-y-2">
                                <li className="cursor-pointer hover:text-blue-600">Registrations/Applications</li>
                                <li className="cursor-pointer hover:text-blue-600">Referrals</li>
                                <li className="cursor-pointer hover:text-blue-600">My Rounds</li>
                                <li className="cursor-pointer hover:text-blue-600">Awards Nominations</li>
                                <li className="cursor-pointer hover:text-blue-600">Watchlist</li>
                                <li className="cursor-pointer hover:text-blue-600">Bookmarked Questions</li>
                            </ul>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProfilePanel;
