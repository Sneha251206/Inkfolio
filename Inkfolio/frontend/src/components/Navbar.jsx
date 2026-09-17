import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, isAuthor, logout, loginAsAuthor, loginAsReader } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Handle "Write a Story" click
  const handleWriteStoryClick = (e) => {
    if (!isLoggedIn || !isAuthor) {
      e.preventDefault();
      // Redirect to Become an Author / Verification page with notice
      navigate('/verification?reason=author_required');
    } else {
      navigate('/editor');
    }
  };

  return (
    <header className="sticky top-0 bg-surface/95 backdrop-blur-md border-b border-divider z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Side: Brand & Navigation */}
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="font-serif font-bold text-2xl text-on-surface tracking-tight hover:opacity-90 transition-opacity"
          >
            InkFolio
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-sans font-medium">
            <Link 
              to="/" 
              className={isActive('/') ? "text-primary font-bold border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              Home
            </Link>
          </nav>
        </div>

        {/* Right Side: Dynamic state according to Login & Role */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Write a Story Button - Always on the right side */}
          <button
            onClick={handleWriteStoryClick}
            type="button"
            className="bg-primary text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-lg hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm active:scale-[0.98]"
            title={isAuthor ? "Write a new story" : "Author verification required to publish"}
          >
            <span className="material-symbols-outlined text-base sm:text-lg">edit</span>
            <span className="hidden xs:inline">Write a Story</span>
          </button>

          {/* Logged Out View */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link 
                to="/login" 
                className="text-xs sm:text-sm font-medium text-on-surface hover:text-primary px-3 py-1.5 rounded-lg transition-colors"
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="hidden sm:inline-block text-xs sm:text-sm font-medium bg-surface-container border border-divider text-on-surface hover:border-primary px-3.5 py-1.5 rounded-lg transition-all"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            /* Logged In View (Reader or Author) */
            <div className="flex items-center gap-3">
              {/* If Reader, show quick "Get Verified" pill */}
              {!isAuthor && (
                <Link 
                  to="/verification" 
                  className="hidden md:inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Get Verified
                </Link>
              )}

              {/* Profile Avatar Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-primary/20 transition-all focus:outline-none"
                  aria-expanded={dropdownOpen}
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                    alt={user?.name || "User Avatar"}
                    className="w-9 h-9 rounded-full object-cover border border-divider"
                  />
                  <span className="material-symbols-outlined text-sm text-text-muted hidden sm:inline-block">
                    {dropdownOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {/* Dropdown Card */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-surface rounded-xl shadow-lg border border-divider py-2 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* User Summary Header */}
                    <div className="px-4 py-3 border-b border-divider">
                      <p className="font-sans font-semibold text-sm text-on-surface truncate">
                        {user?.name}
                      </p>
                      <p className="font-sans text-xs text-text-muted truncate">
                        {user?.email}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className={`inline-flex items-center text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider ${
                          isAuthor ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-text-muted'
                        }`}>
                          {isAuthor ? 'Verified Author' : 'Reader'}
                        </span>
                        {isAuthor && (
                          <span className="material-symbols-outlined text-primary text-xs">verified</span>
                        )}
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="py-1">
                      {/* Author Dashboard - ONLY for Authors */}
                      {isAuthor && (
                        <Link
                          to="/author/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-on-surface hover:bg-surface-container transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span className="material-symbols-outlined text-base text-primary">analytics</span>
                          Author Dashboard
                        </Link>
                      )}

                      {/* Profile Link - For both Reader and Author */}
                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-on-surface hover:bg-surface-container transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="material-symbols-outlined text-base text-text-muted">person</span>
                        My Profile
                      </Link>

                      {/* Upgrade to Author link if current user is Reader */}
                      {!isAuthor && (
                        <Link
                          to="/verification"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span className="material-symbols-outlined text-base">stars</span>
                          Become an Author
                        </Link>
                      )}
                    </div>

                    {/* Interactive Role Switcher for seamless testing */}
                    <div className="border-t border-divider px-4 py-2 bg-surface-container-low/60">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                        Demo View Switcher
                      </p>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => { loginAsAuthor(); setDropdownOpen(false); }}
                          className={`flex-1 py-1 text-[11px] font-medium rounded transition-all ${
                            isAuthor ? 'bg-primary text-white' : 'bg-surface border border-divider text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          Author
                        </button>
                        <button
                          type="button"
                          onClick={() => { loginAsReader(); setDropdownOpen(false); }}
                          className={`flex-1 py-1 text-[11px] font-medium rounded transition-all ${
                            !isAuthor ? 'bg-primary text-white' : 'bg-surface border border-divider text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          Reader
                        </button>
                      </div>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-divider pt-1">
                      <button
                        type="button"
                        onClick={() => { logout(); setDropdownOpen(false); navigate('/'); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">logout</span>
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-on-surface hover:text-primary rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-divider bg-surface px-6 py-4 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 font-sans text-sm font-medium">
            <Link
              to="/"
              className={isActive('/') ? "text-primary font-bold" : "text-on-surface hover:text-primary"}
            >
              Home
            </Link>

            {isLoggedIn && isAuthor && (
              <Link
                to="/author/dashboard"
                className={isActive('/author/dashboard') ? "text-primary font-bold flex items-center gap-2" : "text-on-surface hover:text-primary flex items-center gap-2"}
              >
                <span className="material-symbols-outlined text-sm text-primary">analytics</span>
                Author Dashboard
              </Link>
            )}

            {isLoggedIn && (
              <Link
                to="/profile"
                className={isActive('/profile') ? "text-primary font-bold flex items-center gap-2" : "text-on-surface hover:text-primary flex items-center gap-2"}
              >
                <span className="material-symbols-outlined text-sm text-text-muted">person</span>
                Profile
              </Link>
            )}

            {!isAuthor && (
              <Link
                to="/verification"
                className="text-primary font-medium flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">stars</span>
                Become an Author
              </Link>
            )}

            {!isLoggedIn ? (
              <div className="pt-2 border-t border-divider flex gap-3">
                <Link
                  to="/login"
                  className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-surface-container border border-divider"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-primary text-white"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="pt-2 border-t border-divider flex items-center justify-between">
                <span className="text-xs text-text-muted">Logged in as {user?.name}</span>
                <button
                  type="button"
                  onClick={() => { logout(); navigate('/'); }}
                  className="text-xs text-red-600 font-semibold hover:underline"
                >
                  Log Out
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
