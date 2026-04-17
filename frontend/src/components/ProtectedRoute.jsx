import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AUTH_STORAGE_KEY, useAuth } from '../context/authStore';

const hasStoredToken = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return false;
    }
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.token);
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ message = 'Please Sign In to continue' }) => {
  const { isAuthenticated, token } = useAuth();
  const location = useLocation();
  const hasToken = Boolean(token) || hasStoredToken();

  if (!isAuthenticated || !hasToken) {
    return <Navigate to="/" replace state={{ openAuth: true, from: location, message }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;