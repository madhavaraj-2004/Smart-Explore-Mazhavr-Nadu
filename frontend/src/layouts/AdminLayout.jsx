import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useAuth } from '../context/authStore';
import AuthModal from '../components/AuthModal';

const ADMIN_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'charts', label: 'Charts' },
  { id: 'users', label: 'Users' },
  { id: 'videos', label: 'District Videos' },
];

const AdminLayout = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const tabs = useMemo(() => ADMIN_TABS, []);
  const isAdmin = isAuthenticated && userRole === 'admin';

  if (isAuthenticated && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="admin-shell">
      {isAdmin ? (
        <aside className="admin-sidebar admin-tabs" aria-label="Admin dashboard navigation">
          <p className="admin-sidebar-title">Admin Menu</p>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`admin-tab${activeTab === tab.id ? ' admin-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </aside>
      ) : (
        <aside className="admin-sidebar admin-tabs" aria-label="Admin login area">
          <p className="admin-sidebar-title">Admin Menu</p>
          <p className="admin-access-note">Please login with an admin account to view dashboard tabs.</p>
        </aside>
      )}

      <main className="admin-layout-main">
        <div className="admin-topbar">
          <div className="admin-topbar-spacer" />
          {isAuthenticated ? (
            <button type="button" className="auth-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button
              type="button"
              className="auth-btn"
              onClick={() => setAuthModalOpen(true)}
            >
              Login
            </button>
          )}
        </div>

        {isAdmin ? (
          <Outlet context={{ activeTab, setActiveTab }} />
        ) : (
          <section className="admin-locked-state">
            <h2>Admin Access Required</h2>
            <p>Login as admin to open Overview, Charts, Users, and District Videos panels.</p>
          </section>
        )}
      </main>

      <AuthModal
        isOpen={authModalOpen}
        initialMode="signin"
        helperMessage="Sign in as admin to continue"
        redirectPath="/admin"
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
};

export default AdminLayout;
