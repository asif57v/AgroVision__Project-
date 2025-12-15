// src/components/RedirectIfAuth.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RedirectIfAuth({ children }) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={user.role === 'farmer' ? '/FarmerPage' : '/vendorpage'} replace />;
  }
  return children;
}
