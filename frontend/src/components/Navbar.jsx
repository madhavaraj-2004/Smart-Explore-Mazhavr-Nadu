import { Link } from 'react-router-dom';
import logo from '../assets/mazhavar-logo.png';
import { useAuth } from '../context/authStore';
import NavigationLinks from './NavigationLinks';
import ProfileAvatar from './ProfileAvatar';

const Navbar = ({ links, districtLinks, onOpenMenu, onOpenAuth, isAuthenticated: isAuthProp }) => {
  const { isAuthenticated: isAuthContext } = useAuth();
  const isAuthenticated = isAuthProp ?? isAuthContext;

  return (
    <header className="site-header">
      <div className="site-nav shell">
        <Link className="brand" to="/" aria-label="Smart Explorer Mazhavarnadu home">
          <span className="brand-mark">
            <img src={logo} alt="Smart Explorer Mazhavarnadu logo" className="brand-logo" />
          </span>
          <span className="brand-copy">
            <strong>Smart Explorer</strong>
            <span>Mazhavarnadu</span>
          </span>
        </Link>

        <NavigationLinks
          links={links}
          districtLinks={districtLinks}
          isAuthenticated={isAuthenticated}
          onRequireAuth={() => onOpenAuth('signin', { message: 'Please Sign In to continue' })}
        />

        <div className="nav-actions">
          {isAuthenticated ? (
            <ProfileAvatar />
          ) : (
            <button type="button" className="auth-btn" onClick={() => onOpenAuth('signin')}>
              Login
            </button>
          )}

          <button
            type="button"
            className="menu-toggle"
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

