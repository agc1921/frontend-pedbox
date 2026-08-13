import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

export default function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader label="Verificando sesión..." />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
