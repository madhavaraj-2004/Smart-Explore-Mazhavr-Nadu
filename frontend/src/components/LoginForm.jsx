import { useState } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3l18 18" />
    <path d="M10.6 6.2A11.7 11.7 0 0 1 12 6c6.4 0 10 6 10 6a18.4 18.4 0 0 1-4.6 4.9" />
    <path d="M6.7 8.3A18.4 18.4 0 0 0 2 12s3.6 6 10 6c.5 0 .9 0 1.3-.1" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </svg>
);

const LoginForm = ({ onSubmit, loading, errorMessage, helperMessage, onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.email = 'Enter a valid email';
    }

    if (!password) {
      nextErrors.password = 'Password is required';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSubmit({ email: email.trim(), password });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h2>Sign In</h2>
      {helperMessage ? <p className="auth-note">{helperMessage}</p> : null}

      <label htmlFor="signin-email">Email</label>
      <input
        id="signin-email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
      />
      {errors.email ? <p className="auth-error">{errors.email}</p> : null}

      <label htmlFor="signin-password">Password</label>
      <div className="auth-password-wrap">
        <input
          id="signin-password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        />
        <button
          type="button"
          className="auth-password-toggle"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {errors.password ? <p className="auth-error">{errors.password}</p> : null}

      {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}

      <button type="submit" className="auth-submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Login'}
      </button>

      <p className="auth-switch-text">
        New user?{' '}
        <button type="button" className="auth-switch-btn" onClick={onToggle}>
          Sign up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
