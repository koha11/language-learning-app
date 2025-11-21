import { useAuth } from '@/shared/hooks/useAuth';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return <span>Loading...</span>;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <Outlet />;
};
export default ProtectedRoutes;
