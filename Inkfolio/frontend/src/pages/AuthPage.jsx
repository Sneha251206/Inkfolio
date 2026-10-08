import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';

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
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('author'); // 'author' or 'reader'
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      setError('Please enter your email address.');
      return;
    }

    if (!cleanPassword) {
      setError('Please enter your password.');
      return;
    }

    if (cleanPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isSignup) {
        if (!name.trim()) {
          setError('Please enter your full name.');
          setIsSubmitting(false);
          return;
        }
        await signup({
          name: name.trim(),
          email: cleanEmail,
          password: cleanPassword,
          is_author: role === 'author'
        });
      } else {
        await login(cleanEmail, cleanPassword);
      }

      navigate(redirectPath);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoAuthor = () => {
    loginAsAuthor();
    navigate(redirectPath);
  };

  const handleDemoReader = () => {
    loginAsReader();
    navigate(redirectPath);
  };

  const autofillCredentials = (accountType) => {
    const creds = DEMO_ACCOUNTS[accountType];
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.password);
      setError('');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-surface-container-low border border-divider rounded-2xl p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="font-serif font-bold text-2xl text-on-surface tracking-tight inline-block hover:opacity-80 transition-opacity">
            InkFolio
          </Link>
          <h1 className="font-serif text-2xl font-bold text-on-surface">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="font-sans text-xs text-text-muted">
            {isSignup 
              ? 'Join our community of thoughtful readers and independent authors' 
              : 'Enter your verified credentials to continue reading and writing'}
          </p>
        </div>

        {/* Quick Demo Switcher Buttons */}
        <div className="p-3.5 bg-surface-container rounded-xl border border-divider/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted">
              Instant Demo Access
            </span>
            <span className="text-[10px] bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full">
              One-click testing
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoAuthor}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              As Author (Elena)
            </button>
            <button
              type="button"
              onClick={handleDemoReader}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-surface border border-divider text-on-surface hover:border-primary transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-sm">menu_book</span>
              As Reader (Clara)
            </button>
          </div>

          {!isSignup && (
            <div className="pt-1 text-[11px] text-text-muted flex items-center justify-between border-t border-divider/40">
              <span>Demo logins:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => autofillCredentials('author')}
                  className="text-primary hover:underline font-medium"
                >
                  Fill Author
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => autofillCredentials('reader')}
                  className="text-primary hover:underline font-medium"
                >
                  Fill Reader
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-divider"></div>
          <span className="flex-shrink mx-3 text-xs uppercase tracking-widest text-text-muted font-medium">Or enter credentials</span>
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
          <div className="p-3.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <span className="material-symbols-outlined text-base flex-shrink-0 text-red-600">error</span>
            <div className="space-y-1">
              <p>{error}</p>
              {!isSignup && error.includes('Invalid') && (
                <p className="text-[11px] text-red-600 font-normal">
                  Demo hint: Author pass is <code className="bg-red-100 px-1 py-0.5 rounded font-mono font-bold">elena123</code>, Reader pass is <code className="bg-red-100 px-1 py-0.5 rounded font-mono font-bold">clara123</code>.
                </p>
              )}
            </div>
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
                required={isSignup}
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
              required
              className="w-full px-3.5 py-2.5 bg-surface rounded-lg border border-divider text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-text-muted uppercase">
                Password
              </label>
              <span className="text-[11px] text-text-muted">Min 6 characters</span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 pr-10 bg-surface rounded-lg border border-divider text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-on-surface transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
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
                Account Role Preference
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
            disabled={isSubmitting}
            className={`w-full py-2.5 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.99]'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Validating credentials...</span>
              </>
            ) : (
              <span>{isSignup ? 'Complete Sign Up' : 'Sign In'}</span>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-text-muted">
          By continuing, you agree to InkFolio's Terms of Service and Editorial Standards.
        </p>
      </div>
    </div>
  );
}
