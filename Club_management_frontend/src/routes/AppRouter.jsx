// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "../pages/UserLogin";
import UserRegister from "../pages/UserRegister";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../layouts/Layout";
import ClubPage from "../pages/ClubPage";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* Default redirect to login */}
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path="/clubs/:id" element={<ClubPage />} />
                    {/* Protected route example */}

                    {/* Fallback for unknown routes */}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                {/* Auth routes */}
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/register" element={<UserRegister />} />
            </Routes>
        </Router>
    );
}
