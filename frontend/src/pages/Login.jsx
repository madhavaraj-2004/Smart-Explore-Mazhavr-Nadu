import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authStore';

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const helperMessage = location.state?.message || 'Sign in to unlock protected features.';
  const redirectPath = location.state?.from?.pathname || '/';

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    login({ email: trimmedEmail });
    navigate(redirectPath, { replace: true });
  };

  return (
    <section className="login-page">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <p className="eyebrow">Smart Explorer Mazhavarnadu</p>
        <h1>Welcome Back</h1>
        <p className="login-note">{helperMessage}</p>
        <p className="login-copy">You can still browse public pages without logging in.</p>

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        />

        {error ? <p className="login-error">{error}</p> : null}

        <button type="submit" className="button button-primary login-button">
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
