import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { login, signup, loginAsAuthor, loginAsReader } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we arrived via /signup or /login
  const isSignupInit = location.pathname.includes('signup');
  const [isSignup, setIsSignup] = useState(isSignupInit);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('author'); // 'author' or 'reader'
  const [error, setError] = useState('');

  const redirectPath = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    if (isSignup) {
      if (!name) {
        setError('Please enter your full name.');
        return;
      }
      signup({
        name,
        email,
        is_author: role === 'author'
      });
    } else {
      login(email, role);
    }

    navigate(redirectPath);
  };

  const handleDemoAuthor = () => {
    loginAsAuthor();
    navigate(redirectPath);
  };

  const handleDemoReader = () => {
    loginAsReader();
    navigate(redirectPath);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-surface-container-low border border-divider rounded-2xl p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="font-serif font-bold text-2xl text-on-surface tracking-tight inline-block">
            InkFolio
          </Link>
          <h1 className="font-serif text-2xl font-bold text-on-surface">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="font-sans text-xs text-text-muted">
            {isSignup 
              ? 'Join our community of thoughtful readers and independent authors' 
              : 'Enter your credentials to continue reading and writing'}
          </p>
        </div>

        {/* Quick Demo Switcher Buttons for seamless testing */}
        <div className="p-3 bg-surface-container rounded-xl border border-divider/60 space-y-2">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-text-muted text-center">
            Instant Demo Testing
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoAuthor}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary-container transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              As Author
            </button>
            <button
              type="button"
              onClick={handleDemoReader}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-surface border border-divider text-on-surface hover:border-primary transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">menu_book</span>
              As Reader
            </button>
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-divider"></div>
          <span className="flex-shrink mx-3 text-xs uppercase tracking-widest text-text-muted font-medium">Or continue with</span>
          <div className="flex-grow border-t border-divider"></div>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-divider">
          <button
            type="button"
            onClick={() => { setIsSignup(false); setError(''); }}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors relative ${
              !isSignup ? 'text-primary' : 'text-text-muted hover:text-on-surface'
            }`}
          >
            Log In
            {!isSignup && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>}
          </button>
          <button
            type="button"
            onClick={() => { setIsSignup(true); setError(''); }}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors relative ${
              isSignup ? 'text-primary' : 'text-text-muted hover:text-on-surface'
            }`}
          >
            Sign Up
            {isSignup && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>}
          </button>
        </div>

        {error && (
          <div className="p-3 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elena Vance"
                className="w-full px-3.5 py-2.5 bg-surface rounded-lg border border-divider text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 bg-surface rounded-lg border border-divider text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-surface rounded-lg border border-divider text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {isSignup ? (
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-2">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                    role === 'reader'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-divider bg-surface text-on-surface hover:border-outline'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="reader"
                    checked={role === 'reader'}
                    onChange={() => setRole('reader')}
                    className="sr-only"
                  />
                  <span className="font-semibold text-xs">Standard Reader</span>
                  <span className="text-[11px] text-text-muted mt-0.5">Read & bookmark</span>
                </label>

                <label
                  className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                    role === 'author'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-divider bg-surface text-on-surface hover:border-outline'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="author"
                    checked={role === 'author'}
                    onChange={() => setRole('author')}
                    className="sr-only"
                  />
                  <span className="font-semibold text-xs">Author / Writer</span>
                  <span className="text-[11px] text-text-muted mt-0.5">Publish & studio</span>
                </label>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                Account Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 bg-surface rounded-lg border border-divider text-xs text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="author">Author (Has Dashboard & Publishing)</option>
                <option value="reader">Reader (Reading & Bookmarks)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary-container transition-all"
          >
            {isSignup ? 'Complete Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-text-muted">
          By continuing, you agree to InkFolio's Terms of Service and Editorial Standards.
        </p>
      </div>
    </div>
  );
}
