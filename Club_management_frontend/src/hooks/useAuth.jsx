import { useState, useEffect } from "react";
import axios from "axios";
import { set } from "react-hook-form";
import { useUserData } from "../context/UserDataContext";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const {user, updateUser, clearUser, isLoggedIn, setIsLoggedIn} = useUserData();

  // Save token in localStorage whenever it changes
  useEffect(() => {
  const validateToken = async () => {
    if (token ) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;

      try {
        const res = await axios.get(`${BASE_URL}/profile/`);
        updateUser(res.data.user);
      } catch (err) {
        console.warn("Invalid token, logging out...");
        setToken(null);
        clearUser();
      }
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      clearUser();
    }
  };

  validateToken();
}, [token]);

  // 🔹 Register
  const register = async (username, email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/register/`, {
        username,
        email,
        password,
      });
      setIsLoggedIn(true);
      setToken(res.data.token);
      updateUser({ username: res.data.username || username });

      return { success: true, message: "Registration successful", token: res.data.token };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.error || "Registration failed",
      };
    }
  };

  // 🔹 Login
  const login = async (emailOrUsername, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/login/`, {
        email: emailOrUsername,
        password: password,
      });
      setIsLoggedIn(true);
      setToken(res.data.token);
      updateUser({ username: res.data.username || emailOrUsername });

      return { success: true, message: "Login successful", token: res.data.token };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.error || "Login failed",
      };
    }
  };

  // 🔹 Logout
  const logout = async () => {
  try {
    await axios.post(
      `${BASE_URL}/logout/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  } catch (err) {
    console.warn("Logout API failed (but local logout done).");
  }
  setIsLoggedIn(false);
  setToken(null);
  clearUser();
};


  return {
    token,
    user,
    login,
    logout,
    register,
    isAuthenticated: !!token,
    isLoggedIn,
  };
};

export default useAuth;
