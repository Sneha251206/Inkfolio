import React from 'react';
import { Link } from 'react-router-dom';

export default function ReaderProfilePage() {
  return (
    <div className="max-w-[1000px] mx-auto px-6 py-10 space-y-10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-surface-container-low p-8 rounded-2xl border border-divider">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
          alt="Elena Vance" 
          className="w-28 h-28 rounded-full object-cover shadow-md"
        />
        <div className="space-y-3 text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif font-bold text-2xl">Elena Vance</h1>
              <p className="text-sm text-text-muted">@elenavance • Verified Author & Editor</p>
            </div>
            <Link to="/verification" className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container transition-all">
              Manage Membership
            </Link>
          </div>
          <p className="font-serif text-sm text-on-surface-variant max-w-xl">
            Advocating for brutalist simplicity in an overcomplicated digital world. Writing about deep focus, editorial design, and cognitive autonomy.
          </p>
          <div className="flex justify-center md:justify-start gap-6 text-xs text-text-muted pt-2">
            <span><strong className="text-on-surface font-semibold">14.2k</strong> Followers</span>
            <span><strong className="text-on-surface font-semibold">180</strong> Following</span>
            <span><strong className="text-on-surface font-semibold">24</strong> Articles Published</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-serif font-bold text-xl border-b border-divider pb-3">Saved Reading List & Bookmarks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-surface-container rounded-xl border border-divider space-y-3">
            <span className="text-xs font-semibold text-primary uppercase">Deep Dive</span>
            <h3 className="font-serif font-bold text-lg">The Architecture of Deep Focus in the Digital Noise Age</h3>
            <p className="text-xs text-text-muted">Saved on Sep 02, 2026 • 8 min read</p>
            <Link to="/read/1" className="inline-block text-xs font-semibold text-primary hover:underline pt-2">
              Read Again →
            </Link>
          </div>

          <div className="p-6 bg-surface-container rounded-xl border border-divider space-y-3">
            <span className="text-xs font-semibold text-primary uppercase">Design Culture</span>
            <h3 className="font-serif font-bold text-lg">Brutalist Design & The Return of Pure Typography</h3>
            <p className="text-xs text-text-muted">Saved on Aug 28, 2026 • 5 min read</p>
            <Link to="/read/2" className="inline-block text-xs font-semibold text-primary hover:underline pt-2">
              Read Again →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
