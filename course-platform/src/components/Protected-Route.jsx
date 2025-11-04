import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  console.log("AdminOnly:", adminOnly, "token:", token, "adminToken:", adminToken);

  // Admin route protection
  if (adminOnly) {
    if (!adminToken) {
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
