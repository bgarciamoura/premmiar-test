import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute: React.FC<any> = ({ children }: any) => {
  const { user } = useAuth();
  console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
