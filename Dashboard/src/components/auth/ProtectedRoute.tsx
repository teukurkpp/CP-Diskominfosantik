import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to the login page if no token is found
    return <Navigate to="/auth/signin" replace />;
  }

  // If token exists, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
