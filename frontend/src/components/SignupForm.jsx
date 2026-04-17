import { useState } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^\d{10}$/;

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

const SignupForm = ({ onSubmit, loading, errorMessage, onToggle }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    mobileNumber: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required';
    if (!form.dateOfBirth) nextErrors.dateOfBirth = 'Date of birth is required';

    if (!form.mobileNumber.trim()) {
      nextErrors.mobileNumber = 'Mobile number is required';
    } else if (!mobileRegex.test(form.mobileNumber.trim())) {
      nextErrors.mobileNumber = 'Enter a valid 10 digit mobile number';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email';
    }

    if (!form.location.trim()) nextErrors.location = 'Address or location is required';

    if (!form.password) {
      nextErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password';
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSubmit(form);
  };

  return (
    <form className="auth-form auth-form-signup" onSubmit={handleSubmit} noValidate>
      <h2>Sign Up</h2>

      <div className="auth-grid">
        <label>
          First Name
          <input name="firstName" value={form.firstName} onChange={handleChange} />
          {errors.firstName ? <span className="auth-error">{errors.firstName}</span> : null}
        </label>

        <label>
          Last Name
          <input name="lastName" value={form.lastName} onChange={handleChange} />
          {errors.lastName ? <span className="auth-error">{errors.lastName}</span> : null}
        </label>

        <label>
          Date of Birth
          <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
          {errors.dateOfBirth ? <span className="auth-error">{errors.dateOfBirth}</span> : null}
        </label>

        <label>
          Mobile Number
          <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange} placeholder="10 digits" />
          {errors.mobileNumber ? <span className="auth-error">{errors.mobileNumber}</span> : null}
        </label>

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email ? <span className="auth-error">{errors.email}</span> : null}
        </label>

        <label>
          Address / Location
          <input name="location" value={form.location} onChange={handleChange} />
          {errors.location ? <span className="auth-error">{errors.location}</span> : null}
        </label>

        <label>
          Password
          <div className="auth-password-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
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
          {errors.password ? <span className="auth-error">{errors.password}</span> : null}
        </label>

        <label>
          Confirm Password
          <div className="auth-password-wrap">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.confirmPassword ? <span className="auth-error">{errors.confirmPassword}</span> : null}
        </label>
      </div>

      {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}

      <button type="submit" className="auth-submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Signup'}
      </button>

      <p className="auth-switch-text">
        Already have an account?{' '}
        <button type="button" className="auth-switch-btn" onClick={onToggle}>
          Sign in
        </button>
      </p>
    </form>
  );
};

export default SignupForm;
