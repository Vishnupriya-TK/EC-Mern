// client/src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.isAdmin ? children : <Navigate to="/" />;
};

export const UserRoute = ({ children }) => {
  const { user } = useAuth();
  return !user?.isAdmin ? children : <Navigate to="/admin" />;
};

export default ProtectedRoute;