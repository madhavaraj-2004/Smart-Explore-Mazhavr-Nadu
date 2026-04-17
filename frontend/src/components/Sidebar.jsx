import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/authStore';
import NavigationLinks from './NavigationLinks';

const MotionButton = motion.button;
const MotionAside = motion.aside;

const Sidebar = ({ links, districtLinks, isOpen, onClose, onOpenAuth, isAuthenticated }) => {
  const { currentUser, logout } = useAuth();
  const fullName = `${currentUser?.first_name || currentUser?.firstName || ''} ${currentUser?.last_name || currentUser?.lastName || ''}`.trim() || 'User';

  const handleLogin = () => {
    onClose();
    onOpenAuth('signin', { message: 'Please Sign In to continue' });
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <MotionButton
            type="button"
            className="sidebar-overlay"
            aria-label="Close navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <MotionAside
            className="sidebar-panel"
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="sidebar-header">
              <div>
                <p className="eyebrow">Menu</p>
                <strong>Smart Explorer</strong>
              </div>
              <button type="button" className="sidebar-close" onClick={onClose} aria-label="Close menu">
                ×
              </button>
            </div>

            {isAuthenticated ? (
              <div className="sidebar-account-card">
                <p className="sidebar-account-eyebrow">Signed in</p>
                <p className="sidebar-account-name">{fullName}</p>
                <button type="button" className="sidebar-account-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button type="button" className="sidebar-login-btn" onClick={handleLogin}>
                Login
              </button>
            )}

            <NavigationLinks
              links={links}
              districtLinks={districtLinks}
              variant="mobile"
              onNavigate={onClose}
              isAuthenticated={isAuthenticated}
              onRequireAuth={() => {
                onClose();
                onOpenAuth('signin', { message: 'Please Sign In to continue' });
              }}
            />
          </MotionAside>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default Sidebar;