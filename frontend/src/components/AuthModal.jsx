import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authStore';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './AuthModal.css';

const MotionButton = motion.button;
const MotionDiv = motion.div;
const MotionSection = motion.section;

function getAuthErrorMessage(error, fallbackMessage) {
  const backendDetail = error?.response?.data?.detail;
  if (backendDetail) {
    return backendDetail;
  }

  const code = String(error?.code || '').toUpperCase();
  const rawMessage = String(error?.message || '').toLowerCase();
  const looksLikeNetworkFailure =
    code === 'ERR_NETWORK' ||
    code === 'ECONNABORTED' ||
    rawMessage.includes('network error') ||
    rawMessage.includes('connection refused') ||
    rawMessage.includes('timed out');

  if (looksLikeNetworkFailure) {
    return 'Cannot reach backend API. Start backend on port 8000 and check VITE_API_BASE_URL in frontend/.env.';
  }

  return error?.message || fallbackMessage;
}

const AuthModal = ({ isOpen, initialMode = 'signin', helperMessage, redirectPath = '/', onClose }) => {
  const [mode, setMode] = useState(initialMode);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage('');
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSignIn = async (payload) => {
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await signIn(payload);
      onClose();
      navigate(response?.role === 'admin' ? '/admin' : redirectPath, { replace: true });
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (payload) => {
    setErrorMessage('');
    setLoading(true);

    try {
      await signUp(payload);
      setMode('signin');
      setErrorMessage('Signup successful. Please sign in.');
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, 'Signup failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <MotionButton
            type="button"
            className="auth-overlay"
            aria-label="Close authentication modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div className="auth-modal-shell">
            <MotionSection
              className="auth-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Authentication"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <button type="button" className="auth-close" aria-label="Close" onClick={onClose}>
                X
              </button>

              <AnimatePresence mode="wait">
                <MotionDiv
                  key={mode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                >
                  {mode === 'signin' ? (
                    <LoginForm
                      onSubmit={handleSignIn}
                      loading={loading}
                      errorMessage={errorMessage}
                      helperMessage={helperMessage}
                      onToggle={() => {
                        setMode('signup');
                        setErrorMessage('');
                      }}
                    />
                  ) : (
                    <SignupForm
                      onSubmit={handleSignUp}
                      loading={loading}
                      errorMessage={errorMessage}
                      onToggle={() => {
                        setMode('signin');
                        setErrorMessage('');
                      }}
                    />
                  )}
                </MotionDiv>
              </AnimatePresence>
            </MotionSection>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default AuthModal;
