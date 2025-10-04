import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import HomePage from "./Pages/Home-Page.jsx";
import LoginPage from "./Pages/Login-Page.jsx";
import SignupPage from "./Pages/Signup-Page.jsx";
import AddNewCourse from "./Pages/Add-New-Course.jsx";
import CourseDetails from "./Pages/Course-Page.jsx";
import AdminLogin from "./Pages/Admin-Login-Page.jsx";
import AdminDashboard from "./Pages/Admin-Dashboard.jsx";
import ProtectedRoute from "./components/Protected-Route.jsx";
import AdminSignup from "./Pages/Admin-Signup-Page.jsx";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  // ✅ Restore login state from localStorage on page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    if (adminToken) setUser({ isAdmin: true });
    else if (token) setUser({ isAdmin: false });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={<LoginPage onLogin={() => setUser({ isAdmin: false })} />}
        />
        <Route
          path="/signup"
          element={<SignupPage onSignup={() => setUser({ isAdmin: false })} />}
        />

        {/* Protected user route */}
        <Route
          path="/add-course"
          element={
            <ProtectedRoute>
              <AddNewCourse onAdd={(course) => setCourses((prev) => [...prev, course])} />
            </ProtectedRoute>
          }
        />

        <Route path="/courses/:id" element={<CourseDetails />} />

        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route
          path="/admin/login"
          element={<AdminLogin onAdminLogin={() => setUser({ isAdmin: true })} />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-new-course"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddNewCourse />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h2 className="not-found">Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
