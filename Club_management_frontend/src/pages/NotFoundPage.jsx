import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 px-4">
      <div className="text-center">
        {/* Animated 404 */}
        <h1 className="text-9xl font-extrabold text-purple-400 animate-bounce">404</h1>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-700">
          Oops! Page not found
        </h2>
        <p className="text-gray-500 mt-2 md:mt-4">
          The page you are looking for does not exist or has been removed.
        </p>

        {/* Illustration */}
        <div className="my-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3176/3176296.png"
            alt="Page not found"
            className="w-48 h-48 mx-auto hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Button to go Home */}
        <button
          onClick={() => navigate("/")}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all transform hover:-translate-y-1 hover:scale-105"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
