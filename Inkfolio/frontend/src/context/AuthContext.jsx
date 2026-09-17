import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const SAMPLE_USERS = {
  author: {
    id: 1,
    name: "Elena Vance",
    username: "elenavance",
    email: "elena@inkfolio.org",
    roleTitle: "Editor in Chief & Author",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Advocating for brutalist simplicity in an overcomplicated digital world. Writing about deep focus, editorial design, and cognitive autonomy.",
    is_author: true,
    is_verified: true,
    followers_count: 14200,
    following_count: 180,
    articles_count: 24
  },
  reader: {
    id: 2,
    name: "Clara Hughes",
    username: "clarahughes",
    email: "clara@example.com",
    roleTitle: "Standard Reader",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    bio: "Curious mind and passionate essay enthusiast. Exploring philosophy, brutalist architecture, and slow journalism.",
    is_author: false,
    is_verified: false,
    followers_count: 48,
    following_count: 112,
    articles_count: 0
  }
};

export function AuthProvider({ children }) {
  // Check localStorage, default to Author for pleasant first load, or retrieve saved state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('inkfolio_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return SAMPLE_USERS.author;
      }
    }
    return SAMPLE_USERS.author;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('inkfolio_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('inkfolio_user');
    }
  }, [user]);

  const login = (email, rolePreference = 'author') => {
    if (rolePreference === 'reader' || email.includes('reader')) {
      setUser(SAMPLE_USERS.reader);
      return SAMPLE_USERS.reader;
    }
    setUser(SAMPLE_USERS.author);
    return SAMPLE_USERS.author;
  };

  const loginAsAuthor = () => setUser(SAMPLE_USERS.author);
  const loginAsReader = () => setUser(SAMPLE_USERS.reader);

  const signup = ({ name, email, is_author }) => {
    const newUser = {
      id: Date.now(),
      name: name || (is_author ? "Elena Vance" : "Clara Hughes"),
      username: (name || "user").toLowerCase().replace(/\s+/g, ''),
      email: email || "user@inkfolio.org",
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
    setUser(newUser);
    return newUser;
  };

  const becomeAuthor = () => {
    if (user) {
      setUser(prev => ({
        ...prev,
        is_author: true,
        is_verified: true,
        roleTitle: "Verified Author"
      }));
    } else {
      setUser(SAMPLE_USERS.author);
    }
  };

  const logout = () => {
    setUser(null);
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
