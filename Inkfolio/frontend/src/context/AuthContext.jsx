import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, forgotPasswordApi, resetPasswordApi } from '../api';

const AuthContext = createContext(null);

// Retrieve local offline credentials store (only real users who registered on this browser)
const getLocalAuthStore = () => {
  try {
    const raw = localStorage.getItem('inkfolio_credential_store');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse local auth store:', e);
  }
  return [];
};

const saveLocalUser = (email, password, user) => {
  const store = getLocalAuthStore();
  const filtered = store.filter(entry => entry.email.toLowerCase() !== email.toLowerCase());
  filtered.push({ email: email.toLowerCase(), password, user });
  localStorage.setItem('inkfolio_credential_store', JSON.stringify(filtered));
};

export function AuthProvider({ children }) {
  // Check localStorage, return null if no active user session
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('inkfolio_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('inkfolio_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('inkfolio_user');
      localStorage.removeItem('inkfolio_token');
    }
  }, [user]);

  // Authenticate user with strict password validation
  const login = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanEmail) {
      throw new Error('Please enter your email address.');
    }
    if (!cleanPassword) {
      throw new Error('Please enter your password.');
    }

    // 1. First attempt login against the backend API
    try {
      const data = await loginUser({ email: cleanEmail, password: cleanPassword });
      if (data) {
        const authenticatedUser = {
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          roleTitle: data.is_author ? 'Verified Author' : 'Standard Reader',
          avatar: data.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          bio: data.bio || '',
          is_author: !!data.is_author,
          is_verified: !!data.is_verified,
          followers_count: data.followers_count || 0,
          following_count: data.following_count || 0,
          articles_count: data.articles_count || 0
        };

        if (data.token) {
          localStorage.setItem('inkfolio_token', data.token);
        }

        saveLocalUser(cleanEmail, cleanPassword, authenticatedUser);
        setUser(authenticatedUser);
        return authenticatedUser;
      }
    } catch (apiError) {
      if (apiError.response && (apiError.response.status === 401 || apiError.response.status === 400)) {
        const detail = apiError.response.data?.detail || 'Invalid email or password.';
        throw new Error(detail);
      }
    }

    // 2. Offline fallback: verify against local registered users
    const store = getLocalAuthStore();
    const match = store.find(entry => entry.email.toLowerCase() === cleanEmail);

    if (!match || match.password !== cleanPassword) {
      throw new Error('Invalid email or password.');
    }

    // Password matches!
    setUser(match.user);
    return match.user;
  };

  const signup = async ({ name, email, password, is_author }) => {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanName) {
      throw new Error('Please enter your full name.');
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    if (cleanPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    // 1. Try registering with backend
    try {
      const data = await registerUser({
        name: cleanName,
        email: cleanEmail,
        password: cleanPassword,
        is_author: !!is_author
      });

      if (data) {
        const newUser = {
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          roleTitle: data.is_author ? 'Verified Author' : 'Standard Reader',
          avatar: data.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          bio: data.bio || '',
          is_author: !!data.is_author,
          is_verified: !!data.is_verified,
          followers_count: 0,
          following_count: 0,
          articles_count: 0
        };

        if (data.token) {
          localStorage.setItem('inkfolio_token', data.token);
        }
        saveLocalUser(cleanEmail, cleanPassword, newUser);
        setUser(newUser);
        return newUser;
      }
    } catch (apiError) {
      if (apiError.response && apiError.response.status === 400) {
        throw new Error(apiError.response.data?.detail || 'An account with this email already exists.');
      }
    }

    // 2. Offline fallback: check local store
    const store = getLocalAuthStore();
    if (store.some(entry => entry.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email already exists. Please sign in instead.');
    }

    const newUser = {
      id: Date.now(),
      name: cleanName,
      username: cleanName.toLowerCase().replace(/\s+/g, ''),
      email: cleanEmail,
      roleTitle: is_author ? "Verified Author" : "Standard Reader",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: is_author ? "Author on InkFolio." : "Reader exploring essays.",
      is_author: !!is_author,
      is_verified: !!is_author,
      followers_count: 0,
      following_count: 0,
      articles_count: 0
    };

    saveLocalUser(cleanEmail, cleanPassword, newUser);
    setUser(newUser);
    return newUser;
  };

  const forgotPassword = async (email) => {
    return await forgotPasswordApi(email);
  };

  const resetPassword = async ({ token, new_password }) => {
    return await resetPasswordApi({ token, new_password });
  };

  const becomeAuthor = () => {
    if (user) {
      const updated = {
        ...user,
        is_author: true,
        is_verified: true,
        roleTitle: "Verified Author"
      };
      setUser(updated);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('inkfolio_user');
    localStorage.removeItem('inkfolio_token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isAuthor: !!user?.is_author,
      login,
      signup,
      forgotPassword,
      resetPassword,
      becomeAuthor,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
