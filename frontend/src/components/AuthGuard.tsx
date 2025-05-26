import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const AuthGuard = ({ children, allowedRoles = [] }: AuthGuardProps) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem('healthcareUser');
    
    if (user) {
      const userData = JSON.parse(user);
      setIsAuthenticated(userData.isAuthenticated);
      setUserRole(userData.role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);
  
  // Still loading authentication status
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check role-based access if roles are specified
  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    // Redirect based on role
    switch (userRole) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'provider':
        return <Navigate to="/dashboard" replace />;
      case 'patient':
        return <Navigate to="/patient-portal" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }
  
  // Authorized, render children
  return <>{children}</>;
};

export default AuthGuard;
