import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation();
  const token = localStorage.getItem("token");         // normal user token
  const adminToken = localStorage.getItem("adminToken"); // admin token

  console.log("AdminOnly:", adminOnly, "token:", token, "adminToken:", adminToken);


  // Admin route protection
  if (adminOnly) {
    if (!adminToken) {
      // Even if a normal user token exists, redirect to admin login
      return (
        <Navigate
          to="/admin/login"
          state={{ from: location }}
          replace
        />
      );
    }
    return children;
  }

  // Normal user route protection
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
