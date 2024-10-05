import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAdmin = sessionStorage.getItem('isAdmin');
  return isAdmin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
