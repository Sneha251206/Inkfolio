import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-divider mt-20">
      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-serif font-bold text-2xl text-on-surface">InkFolio</span>
          <p className="text-text-muted text-sm max-w-xs text-center md:text-left">
            Editorial Excellence in every word. A sanctuary for deep reading and intellectual curiosity.
          </p>
          <p className="text-text-muted text-xs mt-2">© 2026 InkFolio. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-text-muted">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/read/1" className="hover:text-primary transition-colors">Articles</Link>
          <Link to="/verification" className="hover:text-primary transition-colors">Pricing & Verification</Link>
          <Link to="/admin" className="hover:text-primary transition-colors">Admin Console</Link>
        </div>

        <div className="flex gap-3">
          <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-divider hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">mail</span>
          </a>
          <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-divider hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">rss_feed</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
