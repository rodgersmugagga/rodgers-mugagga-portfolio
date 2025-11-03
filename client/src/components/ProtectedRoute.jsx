import { Navigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check localStorage directly as a fallback
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log('ProtectedRoute - Auth State:', { isAdmin, storedIsAdmin });
    setIsChecking(false);
  }, [isAdmin]);

  // Show nothing while checking to prevent flash of login page
  if (isChecking) {
    return null;
  }

  if (!isAdmin && localStorage.getItem('isAdmin') !== 'true') {
    console.log('ProtectedRoute - Access Denied');
    return <Navigate to="/admin/login" replace />;
  }

  console.log('ProtectedRoute - Access Granted');
  return children;
};

export default ProtectedRoute;