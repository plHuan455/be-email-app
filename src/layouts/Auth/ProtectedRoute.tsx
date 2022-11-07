import { useAuth } from '@context/AppContext';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user, token } = useAuth();

  console.log({ user, token });
  // return children;
  return user && token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
