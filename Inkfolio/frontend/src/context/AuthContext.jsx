import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api';

const AuthContext = createContext(null);

export const DEMO_ACCOUNTS = {
  author: {
    email: "elena@inkfolio.org",
    password: "elena123",
    user: {
      id: 1,
      name: "Elena Vance",
      username: "elenavance",
      email: "elena@inkfolio.org",
      roleTitle: "Editor in Chief & Author",
      role: "author",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: "Advocating for brutalist simplicity in an overcomplicated digital world. Writing about deep focus, editorial design, and cognitive autonomy.",
      is_author: true,
      is_verified: true,
      followers_count: 14200,
      following_count: 180,
      articles_count: 24
    }
  },
  reader: {
    email: "clara@example.com",
    password: "clara123",
    user: {
      id: 2,
      name: "Clara Hughes",
      username: "clarahughes",
      email: "clara@example.com",
      roleTitle: "Standard Reader",
      role: "reader",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      bio: "Curious mind and passionate essay enthusiast. Exploring philosophy, brutalist architecture, and slow journalism.",
      is_author: false,
      is_verified: false,
      followers_count: 48,
      following_count: 112,
      articles_count: 0
    }
  }
};

export const SAMPLE_USERS = {
  author: DEMO_ACCOUNTS.author.user,
  reader: DEMO_ACCOUNTS.reader.user
};

// Retrieve or initialize local offline credentials store
const getLocalAuthStore = () => {
  try {
    const raw = localStorage.getItem('inkfolio_credential_store');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse local auth store:', e);
  }
  const initialStore = [
    {
      email: DEMO_ACCOUNTS.author.email.toLowerCase(),
      password: DEMO_ACCOUNTS.author.password,
      user: DEMO_ACCOUNTS.author.user
    },
    {
      email: DEMO_ACCOUNTS.reader.email.toLowerCase(),
      password: DEMO_ACCOUNTS.reader.password,
      user: DEMO_ACCOUNTS.reader.user
    }
  ];
  localStorage.setItem('inkfolio_credential_store', JSON.stringify(initialStore));
  return initialStore;
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
          avatar: data.avatar || (data.is_author ? SAMPLE_USERS.author.avatar : SAMPLE_USERS.reader.avatar),
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

        // Cache locally for offline availability
        saveLocalUser(cleanEmail, cleanPassword, authenticatedUser);
        setUser(authenticatedUser);
        return authenticatedUser;
      }
    } catch (apiError) {
      // If the backend actively responded with an authentication rejection (400 or 401)
      if (apiError.response && (apiError.response.status === 401 || apiError.response.status === 400)) {
        const detail = apiError.response.data?.detail || 'Invalid email or password. Please verify your credentials.';
        throw new Error(detail);
      }
      // If backend is offline or network error, fallback to verified local credential store
      console.warn('Backend unavailable during login, verifying credentials via offline security store.');
    }

    // 2. Offline fallback: verify against local credentials store (STRICT PASSWORD CHECK)
    const store = getLocalAuthStore();
    const match = store.find(entry => entry.email.toLowerCase() === cleanEmail);

    if (!match || match.password !== cleanPassword) {
      throw new Error('Invalid email or password.');
    }

    // Password matches!
    setUser(match.user);
    return match.user;
  };

  const loginAsAuthor = () => {
    setUser(DEMO_ACCOUNTS.author.user);
    localStorage.setItem('inkfolio_token', 'inkfolio_demo_author_token');
    return DEMO_ACCOUNTS.author.user;
  };

  const loginAsReader = () => {
    setUser(DEMO_ACCOUNTS.reader.user);
    localStorage.setItem('inkfolio_token', 'inkfolio_demo_reader_token');
    return DEMO_ACCOUNTS.reader.user;
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
          avatar: data.avatar,
          bio: data.bio || '',
          is_author: !!data.is_author,
          is_verified: !!data.is_verified,
          followers_count: 0,
          following_count: 12,
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
      console.warn('Backend unavailable during registration, saving to local security store.');
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
      avatar: is_author 
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      bio: is_author ? "New contributor to InkFolio editorial." : "Reader exploring thought-provoking essays.",
      is_author: !!is_author,
      is_verified: !!is_author,
      followers_count: 0,
      following_count: 12,
      articles_count: 0
    };

    saveLocalUser(cleanEmail, cleanPassword, newUser);
    setUser(newUser);
    return newUser;
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
    } else {
      setUser(DEMO_ACCOUNTS.author.user);
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
      loginAsAuthor,
      loginAsReader,
      signup,
      becomeAuthor,
      logout,
      DEMO_ACCOUNTS
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
