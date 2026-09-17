import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ReaderProfilePage() {
  const { user, isAuthor } = useAuth();
  const [activeTab, setActiveTab] = useState('saved');

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

  const savedArticles = [
    {
      id: 1,
      title: "The Architecture of Deep Focus in the Digital Noise Age",
      category: "Deep Dive",
      savedDate: "Saved on Sep 12, 2026",
      readTime: "8 min read",
      author: "Elena Vance",
      cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Brutalist Design & The Return of Pure Typography",
      category: "Design Culture",
      savedDate: "Saved on Aug 28, 2026",
      readTime: "5 min read",
      author: "Julian Thorne",
      cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80"
    }
  ];

  const readingHistory = [
    {
      id: 3,
      title: "Evidence-Based Narratives for an Intentional Life",
      category: "Health & Philosophy",
      readDate: "Finished reading Sep 14",
      readTime: "6 min read",
      author: "Sarah Jenks"
    },
    {
      id: 1,
      title: "The Architecture of Deep Focus in the Digital Noise Age",
      category: "Deep Dive",
      readDate: "Finished reading Sep 10",
      readTime: "8 min read",
      author: "Elena Vance"
    }
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Profile Card */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-surface-container-low p-8 rounded-2xl border border-divider shadow-sm">
        <img 
          src={profileUser.avatar} 
          alt={profileUser.name} 
          className="w-28 h-28 rounded-full object-cover shadow-md border-2 border-surface"
        />
        <div className="space-y-4 text-center md:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-on-surface">{profileUser.name}</h1>
                {isAuthor && (
                  <span className="material-symbols-outlined text-primary text-xl" title="Verified Author">
                    verified
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                @{profileUser.username || "user"} • {isAuthor ? "Verified Author & Editor" : "Standard Reader"}
              </p>
            </div>
            
            <div className="flex items-center gap-2 justify-center md:justify-end">
              {isAuthor ? (
                <Link 
                  to="/author/dashboard" 
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">analytics</span>
                  Author Studio
                </Link>
              ) : (
                <Link 
                  to="/verification" 
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">stars</span>
                  Become an Author
                </Link>
              )}
            </div>
          </div>

          <p className="font-serif text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
            {profileUser.bio}
          </p>

          <div className="flex justify-center md:justify-start gap-6 text-xs text-text-muted pt-3 border-t border-divider/60">
            <span>
              <strong className="text-on-surface font-semibold text-sm">
                {profileUser.followers_count?.toLocaleString() || 0}
              </strong> Followers
            </span>
            <span>
              <strong className="text-on-surface font-semibold text-sm">
                {profileUser.following_count || 0}
              </strong> Following
            </span>
            {isAuthor && (
              <span>
                <strong className="text-on-surface font-semibold text-sm">
                  {profileUser.articles_count || 24}
                </strong> Articles Published
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex border-b border-divider gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`pb-3 text-xs uppercase tracking-wider font-bold transition-all relative ${
              activeTab === 'saved' ? 'text-primary' : 'text-text-muted hover:text-on-surface'
            }`}
          >
            Saved Reading List ({savedArticles.length})
            {activeTab === 'saved' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-xs uppercase tracking-wider font-bold transition-all relative ${
              activeTab === 'history' ? 'text-primary' : 'text-text-muted hover:text-on-surface'
            }`}
          >
            Reading History ({readingHistory.length})
            {activeTab === 'history' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
            )}
          </button>

          {isAuthor && (
            <button
              type="button"
              onClick={() => setActiveTab('published')}
              className={`pb-3 text-xs uppercase tracking-wider font-bold transition-all relative ${
                activeTab === 'published' ? 'text-primary' : 'text-text-muted hover:text-on-surface'
              }`}
            >
              Published Works
              {activeTab === 'published' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
          )}
        </div>

        {/* Tab 1: Saved Reading List */}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedArticles.map((article) => (
              <div 
                key={article.id} 
                className="group p-6 bg-surface-container-low rounded-2xl border border-divider hover:border-primary/40 hover:shadow-card transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-xs text-text-muted">{article.readTime}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-on-surface group-hover:text-primary transition-colors leading-snug">
                    <Link to={`/read/${article.id}`}>{article.title}</Link>
                  </h3>
                  <p className="text-xs text-text-muted">By {article.author} • {article.savedDate}</p>
                </div>

                <div className="pt-3 border-t border-divider/60 flex items-center justify-between">
                  <Link to={`/read/${article.id}`} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                    Read Story
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                  <span className="text-xs text-text-muted">Saved</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Reading History */}
        {activeTab === 'history' && (
          <div className="bg-surface-container-low rounded-2xl border border-divider divide-y divide-divider/60">
            {readingHistory.map((item) => (
              <div key={item.id} className="p-5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="font-serif font-bold text-base text-on-surface">
                    <Link to={`/read/${item.id}`} className="hover:text-primary transition-colors">
                      {item.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-text-muted">By {item.author} • {item.readDate}</p>
                </div>
                <Link 
                  to={`/read/${item.id}`}
                  className="px-3 py-1.5 rounded-lg border border-divider text-xs font-semibold text-on-surface hover:border-primary transition-colors whitespace-nowrap"
                >
                  Read Again
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Published Works (Authors) */}
        {activeTab === 'published' && isAuthor && (
          <div className="p-8 text-center bg-surface-container-low rounded-2xl border border-divider space-y-3">
            <span className="material-symbols-outlined text-3xl text-primary">auto_stories</span>
            <h3 className="font-serif font-bold text-lg">Author Studio Publications</h3>
            <p className="text-xs text-text-muted max-w-md mx-auto">
              You have published 3 stories with over 28,000 total reader views.
            </p>
            <Link
              to="/author/dashboard"
              className="inline-block px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container transition-all"
            >
              Open Full Author Dashboard →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
