import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ReaderProfilePage() {
  const { user, isAuthor } = useAuth();

  const profileUser = user || {
    name: "Elena Vance",
    username: "elenavance",
    roleTitle: "Verified Author & Editor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    bio: "Advocating for brutalist simplicity in an overcomplicated digital world. Writing about deep focus, editorial design, and cognitive autonomy.",
    followers_count: 14200,
    following_count: 180,
    articles_count: 24
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-10 space-y-10">
      {/* Profile Header Card */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-surface-container-low p-8 rounded-2xl border border-divider">
        <img 
          src={profileUser.avatar} 
          alt={profileUser.name} 
          className="w-28 h-28 rounded-full object-cover shadow-md border-2 border-surface"
        />
        <div className="space-y-3 text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="font-serif font-bold text-2xl text-on-surface">{profileUser.name}</h1>
                {isAuthor && (
                  <span className="material-symbols-outlined text-primary text-xl" title="Verified Author">
                    verified
                  </span>
                )}
              </div>
              <p className="text-sm text-text-muted">
                @{profileUser.username || "user"} • {isAuthor ? "Verified Author & Editor" : "Standard Reader"}
              </p>
            </div>
            
            <div className="flex items-center gap-2 justify-center md:justify-end">
              {isAuthor ? (
                <Link 
                  to="/author/dashboard" 
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">analytics</span>
                  Author Dashboard
                </Link>
              ) : (
                <Link 
                  to="/verification" 
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">stars</span>
                  Become an Author
                </Link>
              )}
            </div>
          </div>

          <p className="font-serif text-sm text-on-surface-variant max-w-xl">
            {profileUser.bio}
          </p>

          <div className="flex justify-center md:justify-start gap-6 text-xs text-text-muted pt-2 border-t border-divider/60">
            <span>
              <strong className="text-on-surface font-semibold">
                {profileUser.followers_count?.toLocaleString() || 0}
              </strong> Followers
            </span>
            <span>
              <strong className="text-on-surface font-semibold">
                {profileUser.following_count || 0}
              </strong> Following
            </span>
            {isAuthor && (
              <span>
                <strong className="text-on-surface font-semibold">
                  {profileUser.articles_count || 24}
                </strong> Articles Published
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Reading List & Bookmarks */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-divider pb-3">
          <h2 className="font-serif font-bold text-xl">Saved Reading List & Bookmarks</h2>
          <span className="text-xs text-text-muted">2 stories saved</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-surface-container rounded-xl border border-divider space-y-3 hover:border-primary/40 transition-colors">
            <span className="text-xs font-semibold text-primary uppercase">Deep Dive</span>
            <h3 className="font-serif font-bold text-lg leading-snug">The Architecture of Deep Focus in the Digital Noise Age</h3>
            <p className="text-xs text-text-muted">Saved on Sep 02, 2026 • 8 min read</p>
            <Link to="/read/1" className="inline-block text-xs font-semibold text-primary hover:underline pt-2">
              Read Story →
            </Link>
          </div>

          <div className="p-6 bg-surface-container rounded-xl border border-divider space-y-3 hover:border-primary/40 transition-colors">
            <span className="text-xs font-semibold text-primary uppercase">Design Culture</span>
            <h3 className="font-serif font-bold text-lg leading-snug">Brutalist Design & The Return of Pure Typography</h3>
            <p className="text-xs text-text-muted">Saved on Aug 28, 2026 • 5 min read</p>
            <Link to="/read/2" className="inline-block text-xs font-semibold text-primary hover:underline pt-2">
              Read Story →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
