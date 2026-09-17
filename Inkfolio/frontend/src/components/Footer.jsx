import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-divider mt-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <Link to="/" className="font-serif font-bold text-2xl text-on-surface tracking-tight">
              InkFolio
            </Link>
            <p className="font-serif text-sm text-on-surface-variant max-w-sm leading-relaxed">
              An independent editorial publication dedicated to deep focus, brutalist typography, slow journalism, and thoughtful perspectives.
            </p>
            <p className="text-xs text-text-muted pt-2">
              Designed with timeless typography and ad-free editorial integrity.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[11px] font-sans uppercase font-bold tracking-widest text-text-muted">Editorial</p>
            <ul className="space-y-2 text-xs font-sans text-on-surface-variant">
              <li><Link to="/" className="hover:text-primary transition-colors">Home Feed</Link></li>
              <li><Link to="/read/1" className="hover:text-primary transition-colors">Featured Essays</Link></li>
              <li><Link to="/verification" className="hover:text-primary transition-colors">Topics & Archive</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[11px] font-sans uppercase font-bold tracking-widest text-text-muted">Authors</p>
            <ul className="space-y-2 text-xs font-sans text-on-surface-variant">
              <li><Link to="/verification" className="hover:text-primary transition-colors">Become an Author</Link></li>
              <li><Link to="/verification" className="hover:text-primary transition-colors">Author Royalties</Link></li>
              <li><Link to="/editor" className="hover:text-primary transition-colors">Story Studio</Link></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[11px] font-sans uppercase font-bold tracking-widest text-text-muted">Community</p>
            <ul className="space-y-2 text-xs font-sans text-on-surface-variant">
              <li><Link to="/profile" className="hover:text-primary transition-colors">Reader Profile</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Log In / Register</Link></li>
              <li><Link to="/admin" className="hover:text-primary transition-colors text-text-muted/60">Staff Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-divider/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© 2026 InkFolio Editorial. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-on-surface cursor-pointer transition-colors">Terms of Publication</span>
            <span className="hover:text-on-surface cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-on-surface cursor-pointer transition-colors">Editorial Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
