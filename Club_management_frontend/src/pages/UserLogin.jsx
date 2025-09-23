import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
import useToast from "../hooks/useToast";
import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

// Validation schema
const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const { success, error } = useToast();




function UserLogin() {

    const [showPassword, setShowPassword] = useState(false);
    const { login, token } = useAuth();
    const navigate = useNavigate();
    const { user, updateUser, clearUser, isLoggedIn, setIsLoggedIn } = useUserData();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const result = await login(data.email, data.password);
        if (result.success) {
            const profile = await axios.get(`${base_url}/profile/`, {
                headers: {
                    Authorization: `Token ${result.token}`,
                }
            })
            success(result.message);
            
            if (profile.data) {
                console.log(profile.data.user);
                updateUser(profile.data.user);
                setIsLoggedIn(true);
                navigate("/");
            }
        }
        else {
            error(result.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back 👋</h2>

                {/* Email */}
                <label className="block mb-2 font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="w-full p-3 mb-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-red-500 mb-3 text-sm">{errors.email?.message}</p>

                {/* Password */}
                <label className="block mb-2 font-medium text-gray-700">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password")}
                        className="w-full p-3 mb-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>
                <p className="text-red-500 mb-3 text-sm">{errors.password?.message}</p>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" /> Remember Me
                    </label>
                    <a href="#" className="text-blue-600 hover:underline text-sm">
                        Forgot Password?
                    </a>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                    Login
                </button>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-400">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Social Logins (Optional UI Improvement) */}
                <div className="flex gap-3">
                    <button className="flex-1 py-2 border rounded-lg hover:bg-gray-100">
                        🔵 Google
                    </button>
                    <button className="flex-1 py-2 border rounded-lg hover:bg-gray-100">
                        🟦 Facebook
                    </button>
                </div>

                {/* Register Link */}
                <p className="text-center mt-6 text-gray-600">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}

export default UserLogin;
