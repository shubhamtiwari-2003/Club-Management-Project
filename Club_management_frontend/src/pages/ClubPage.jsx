// pages/ClubPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ClubPage = () => {
    const { id } = useParams(); // get club ID from URL
    const [clubData, setClubData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock API endpoint (replace with your backend)
    const API_URL = `https://mockapi.com/clubs/${id}`;

    useEffect(() => {
        const fetchClub = async () => {
            try {
                // Replace with real backend API
                const res = await axios.get(API_URL);

                // If no backend, you can mock data like:
                // const res = { data: { name: "...", description: "...", ... } };

                setClubData(res.data);
            } catch (error) {
                console.error("Error fetching club:", error);

                // fallback static data
                setClubData({
                    id,
                    name: "Robotics Club",
                    description:
                        "The Robotics Club is a hub for innovation, creativity, and problem-solving.",
                    club_logo: "https://via.placeholder.com/120x120",
                    club_banner: "https://source.unsplash.com/1200x400/?robotics,technology",
                    joining_available: true,
                    secretaries: [
                        {
                            id: 1,
                            name: "Shubham Tiwari",
                            image: "https://source.unsplash.com/100x100/?face,man",
                        },
                        {
                            id: 2,
                            name: "Ananya Gupta",
                            image: "https://source.unsplash.com/100x100/?face,woman",
                        },
                    ],
                });
            } finally {
                setLoading(false);
            }
        };

        fetchClub();
    }, [id]);

    if (loading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="w-full">
            {/* Banner */}
            <div className="relative">
                <img
                    src={clubData.club_banner}
                    alt={`${clubData.name} banner`}
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">{clubData.name}</h1>
                </div>
            </div>

            {/* Club Info Section */}
            <div className="max-w-5xl mx-auto px-6 py-10">
                <div className="flex items-center gap-6 mb-8">
                    <img
                        src={clubData.club_logo}
                        alt="club logo"
                        className="w-28 h-28 rounded-full shadow-lg"
                    />
                    <div>
                        <h2 className="text-3xl font-bold">{clubData.name}</h2>
                        <p className="text-gray-600 mt-2">{clubData.description}</p>
                    </div>
                    {/* Join Club Button */}
                    {typeof clubData.joining_available !== "undefined" && (
                        <button
                            className={`px-6 py-2 rounded-lg font-semibold text-white transition-colors ${clubData.joining_available
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                            disabled={!clubData.joining_available}
                        >
                            Join Club
                        </button>
                    )}
                </div>



                {/* Secretaries */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Club Secretaries</h3>
                    <div className="flex flex-wrap gap-6">
                        {clubData.secretaries.map((sec) => (
                            <div
                                key={sec.id}
                                className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md w-40"
                            >
                                <img
                                    src={sec.image}
                                    alt={sec.name}
                                    className="w-20 h-20 rounded-full object-cover mb-2"
                                />
                                <p className="text-gray-800 font-medium">{sec.name}</p>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ClubPage;
