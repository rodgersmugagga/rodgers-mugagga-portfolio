import { Navigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
