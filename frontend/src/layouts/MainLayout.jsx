import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AIAssistant from '../components/AIAssistant';
import AuthModal from '../components/AuthModal';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/authStore';
import { recordDistrictView, recordPlaceClick } from '../utils/activityTracker';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [authMessage, setAuthMessage] = useState('Sign in to continue.');
  const [authRedirectPath, setAuthRedirectPath] = useState('/');
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = useMemo(
    () => [
      { label: 'Home', to: '/' },
      { label: 'Attractions', to: '/attractions' },
      { label: 'About', to: '/about' },
    ],
    [],
  );

  const districtLinks = useMemo(
    () => [
      { label: 'Salem', to: '/salem' },
      { label: 'Dharmapuri', to: '/dharmapuri' },
      { label: 'Krishnagiri', to: '/krishnagiri' },
      { label: 'Namakkal', to: '/namakkal' },
    ],
    [],
  );

  useEffect(() => {
    document.body.style.overflow = sidebarOpen || authModalOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen, authModalOpen]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const districtByPath = {
      '/salem': 'Salem',
      '/dharmapuri': 'Dharmapuri',
      '/krishnagiri': 'Krishnagiri',
      '/namakkal': 'Namakkal',
    };

    if (districtByPath[location.pathname]) {
      recordDistrictView(districtByPath[location.pathname]);
    }

    if (location.pathname.startsWith('/street-view/')) {
      const placeId = location.pathname.split('/street-view/')[1];
      if (placeId) {
        recordPlaceClick(placeId);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.state?.openAuth) {
      setAuthModalOpen(true);
      setAuthMode('signin');
      setAuthMessage(location.state?.message || 'Sign in to continue.');
      setAuthRedirectPath(location.state?.from?.pathname || '/');
    }
  }, [location.state]);

  const handleOpenAuth = (mode = 'signin', options = {}) => {
    setAuthMode(mode);
    setAuthMessage(options.message || 'Sign in to continue.');
    setAuthRedirectPath(options.redirectPath || '/');
    setAuthModalOpen(true);
  };

  return (
    <div className="app-shell">
      <Navbar
        links={navLinks}
        districtLinks={districtLinks}
        onOpenMenu={() => setSidebarOpen(true)}
        onOpenAuth={handleOpenAuth}
        isAuthenticated={isAuthenticated}
      />
      <Sidebar
        links={navLinks}
        districtLinks={districtLinks}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenAuth={handleOpenAuth}
        isAuthenticated={isAuthenticated}
      />

      <main className="app-main">
        <Outlet />
      </main>

      <Footer links={navLinks} />
      <AIAssistant
        isAuthenticated={isAuthenticated}
        onRequireAuth={() => handleOpenAuth('signin', { message: 'Please Sign In to use AI assistant' })}
      />
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        helperMessage={authMessage}
        redirectPath={authRedirectPath}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
};

export default MainLayout;
