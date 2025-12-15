// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PrivateRoute = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  }
  // not authenticated -> go to login
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
