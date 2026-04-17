import { useCallback, useMemo, useState } from 'react';
import { loginUser, signupUser } from '../api/authApi';
import { AUTH_STORAGE_KEY, AuthContext } from './authStore';

const getInitialAuthState = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return {
        isAuthenticated: false,
        token: '',
        userRole: 'user',
        currentUser: null,
      };
    }

    const parsed = JSON.parse(raw);
    return {
      isAuthenticated: Boolean(parsed?.loggedIn),
      token: parsed?.token || '',
      userRole: parsed?.userRole || 'user',
      currentUser: parsed?.currentUser || null,
    };
  } catch {
    return {
      isAuthenticated: false,
      token: '',
      userRole: 'user',
      currentUser: null,
    };
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(getInitialAuthState);

  const applyAuthState = useCallback(({ email, token, userRole = 'user', currentUser = null }) => {
    const nextState = {
      isAuthenticated: true,
      token,
      userRole,
      currentUser: currentUser || { email },
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        loggedIn: true,
        email,
        token,
        userRole,
        currentUser: nextState.currentUser,
        loginAt: Date.now(),
      }),
    );
    setAuthState(nextState);
  }, []);

  const login = useCallback(({ email, token = '', userRole = 'user', currentUser = null }) => {
    applyAuthState({ email, token, userRole, currentUser });
  }, [applyAuthState]);

  const signIn = useCallback(async ({ email, password }) => {
    const data = await loginUser({ email, password });
    applyAuthState({
      email,
      token: data?.access_token || '',
      userRole: data?.role || 'user',
      currentUser: data?.user || { email },
    });
    return data;
  }, [applyAuthState]);

  const signUp = useCallback(async (payload) => {
    await signupUser(payload);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthState({
      isAuthenticated: false,
      token: '',
      userRole: 'user',
      currentUser: null,
    });
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: authState.isAuthenticated,
      token: authState.token,
      userRole: authState.userRole,
      currentUser: authState.currentUser,
      login,
      signIn,
      signUp,
      logout,
    }),
    [authState, login, signIn, signUp, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};