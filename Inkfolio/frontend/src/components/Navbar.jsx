import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 bg-surface/90 backdrop-blur-md border-b border-divider z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-serif font-bold text-2xl text-on-surface tracking-tight">
            InkFolio
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-sans font-medium">
            <Link 
              to="/" 
              className={isActive('/') ? "text-primary font-bold border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              Home
            </Link>
            <Link 
              to="/read/1" 
              className={isActive('/read/1') ? "text-primary font-bold border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              Reading Experience
            </Link>
            <Link 
              to="/editor" 
              className={isActive('/editor') ? "text-primary font-bold border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              Write
            </Link>
            <Link 
              to="/profile" 
              className={isActive('/profile') ? "text-primary font-bold border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              Profile
            </Link>
            <Link 
              to="/author/dashboard" 
              className={isActive('/author/dashboard') ? "text-primary font-bold border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              Author Dashboard
            </Link>
            <Link 
              to="/admin" 
              className={isActive('/admin') ? "text-primary font-bold border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              Admin Portal
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/verification" 
            className="hidden sm:inline-block text-xs font-semibold px-3 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all"
          >
            Get Verified
          </Link>
          <Link 
            to="/editor" 
            className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-container transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
            New Story
          </Link>
        </div>
      </div>
    </header>
  );
}
