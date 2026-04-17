import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, AUTH_STORAGE_KEY } from '../context/authStore';

const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

const getInitials = ({ firstName, lastName, email }) => {
  const first = (firstName || '').trim().charAt(0);
  const last = (lastName || '').trim().charAt(0);

  if (first || last) {
    return `${first}${last}`.toUpperCase();
  }

  return (email || '?').trim().charAt(0).toUpperCase();
};

const resolveUserProfile = (contextUser) => {
  if (contextUser) {
    return {
      firstName: contextUser.first_name || contextUser.firstName || '',
      lastName: contextUser.last_name || contextUser.lastName || '',
      email: contextUser.email || '',
    };
  }

  const stored = safeParse(localStorage.getItem(AUTH_STORAGE_KEY));
  const storedUser = stored?.currentUser || null;

  return {
    firstName: storedUser?.first_name || storedUser?.firstName || '',
    lastName: storedUser?.last_name || storedUser?.lastName || '',
    email: storedUser?.email || stored?.email || '',
  };
};

const ProfileAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const profile = useMemo(() => resolveUserProfile(currentUser), [currentUser]);
  const initials = useMemo(() => getInitials(profile), [profile]);
  const fullName = `${profile.firstName} ${profile.lastName}`.trim() || 'User';
  const email = profile.email || 'No email available';

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="profile-avatar-wrap" ref={containerRef}>
      <button
        type="button"
        className="profile-avatar-btn"
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="profile-avatar-initials">{initials}</span>
      </button>

      <div className={`profile-dropdown ${isOpen ? 'profile-dropdown-open' : ''}`} role="menu" aria-hidden={!isOpen}>
        <p className="profile-dropdown-name">{fullName}</p>
        <p className="profile-dropdown-email">{email}</p>
        <button type="button" className="profile-dropdown-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileAvatar;
