import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAnalyticsOverview } from '../api';

export default function AuthorDashboardPage() {
  const [stats, setStats] = useState({
    total_views: 45800,
    total_likes: 4460,
    monthly_earnings: 3450.75,
    active_subscribers: 12840
  });

  const [activeTab, setActiveTab] = useState('published'); // 'published' or 'drafts'
  const [exportNotice, setExportNotice] = useState(false);

  useEffect(() => {
    async function loadStats() {
      const data = await fetchAnalyticsOverview();
      if (data) setStats(data);
    }
    loadStats();
  }, []);

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  const publishedStories = [
    {
      id: 1,
      title: "The Architecture of Deep Focus in the Digital Noise Age",
      category: "Deep Dive",
      publishedDate: "Sep 01, 2026",
      views: "12,400",
      likes: "1,420",
      comments: 28,
      earnings: "$1,240.00",
      status: "Published"
    },
    {
      id: 2,
      title: "Brutalist Design & The Return of Pure Typography",
      category: "Design Culture",
      publishedDate: "Aug 25, 2026",
      views: "6,700",
      likes: "890",
      comments: 14,
      earnings: "$670.50",
      status: "Published"
    },
    {
      id: 5,
      title: "The Silent Cognitive Tax of Hyper-Connectivity",
      category: "Deep Dive",
      publishedDate: "Aug 10, 2026",
      views: "8,920",
      likes: "1,104",
      comments: 21,
      earnings: "$892.00",
      status: "Published"
    }
  ];

  const drafts = [
    {
      id: 101,
      title: "On the Necessity of Physical Notebooks in the AI Era",
      category: "Philosophy",
      lastEdited: "Yesterday at 4:30 PM",
      words: "1,240 words",
      completion: "70%"
    },
    {
      id: 102,
      title: "Typography Rules for High-Density Data Interfaces",
      category: "Design Culture",
      lastEdited: "3 days ago",
      words: "860 words",
      completion: "45%"
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-divider pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-on-surface">Author Studio</h1>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[11px] font-bold uppercase rounded-full tracking-wider border border-primary/20">
              Verified Creator
            </span>
          </div>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Track reader retention, monthly royalty distributions, and manage your editorial publications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={handleExport}
            className="px-4 py-2 bg-surface-container border border-divider text-xs font-semibold rounded-lg hover:border-primary transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Export CSV
          </button>
          <Link 
            to="/editor"
            className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            New Story
          </Link>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 text-xs font-medium rounded-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-green-600 text-base">check_circle</span>
          Analytics report CSV generated and downloaded.
        </div>
      )}

      {/* Analytics Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-surface-container-low rounded-2xl border border-divider space-y-2 hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs uppercase font-bold tracking-wider">Total Views</span>
            <span className="material-symbols-outlined text-xl text-primary">visibility</span>
          </div>
          <p className="text-3xl font-bold font-serif text-on-surface">{stats.total_views.toLocaleString()}</p>
          <span className="text-xs text-green-700 font-semibold inline-flex items-center gap-1">
            ↑ +14.2% <span className="font-normal text-text-muted">vs last month</span>
          </span>
        </div>

        <div className="p-6 bg-surface-container-low rounded-2xl border border-divider space-y-2 hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs uppercase font-bold tracking-wider">Reader Claps & Likes</span>
            <span className="material-symbols-outlined text-xl text-red-500">favorite</span>
          </div>
          <p className="text-3xl font-bold font-serif text-on-surface">{stats.total_likes.toLocaleString()}</p>
          <span className="text-xs text-green-700 font-semibold inline-flex items-center gap-1">
            ↑ +8.7% <span className="font-normal text-text-muted">high engagement</span>
          </span>
        </div>

        <div className="p-6 bg-surface-container-low rounded-2xl border border-divider space-y-2 hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs uppercase font-bold tracking-wider">Estimated Earnings</span>
            <span className="material-symbols-outlined text-xl text-accent">payments</span>
          </div>
          <p className="text-3xl font-bold font-serif text-primary">${stats.monthly_earnings.toLocaleString()}</p>
          <span className="text-xs text-accent font-semibold inline-flex items-center gap-1">
            85% share <span className="font-normal text-text-muted">• Payout Sep 15</span>
          </span>
        </div>

        <div className="p-6 bg-surface-container-low rounded-2xl border border-divider space-y-2 hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs uppercase font-bold tracking-wider">Subscribers</span>
            <span className="material-symbols-outlined text-xl text-primary">group</span>
          </div>
          <p className="text-3xl font-bold font-serif text-on-surface">{stats.active_subscribers.toLocaleString()}</p>
          <span className="text-xs text-green-700 font-semibold inline-flex items-center gap-1">
            ↑ +210 new <span className="font-normal text-text-muted">subscribers</span>
          </span>
        </div>
      </div>

      {/* Story Management Studio */}
      <div className="bg-surface-container-low rounded-2xl border border-divider overflow-hidden">
        {/* Tab Header */}
        <div className="flex border-b border-divider px-6 pt-4 bg-surface-container/60 justify-between items-center">
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setActiveTab('published')}
              className={`pb-3 text-xs uppercase tracking-wider font-bold transition-all relative ${
                activeTab === 'published' ? 'text-primary' : 'text-text-muted hover:text-on-surface'
              }`}
            >
              Published Stories ({publishedStories.length})
              {activeTab === 'published' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('drafts')}
              className={`pb-3 text-xs uppercase tracking-wider font-bold transition-all relative ${
                activeTab === 'drafts' ? 'text-primary' : 'text-text-muted hover:text-on-surface'
              }`}
            >
              Drafts in Progress ({drafts.length})
              {activeTab === 'drafts' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
          </div>

          <Link
            to="/editor"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline pb-3"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Create draft
          </Link>
        </div>

        {/* Tab 1: Published Stories Table */}
        {activeTab === 'published' && (
          <div className="divide-y divide-divider/60">
            {publishedStories.map((story) => (
              <div key={story.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface transition-colors">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                      {story.status}
                    </span>
                    <span className="text-xs text-text-muted">{story.category}</span>
                    <span className="text-divider">•</span>
                    <span className="text-xs text-text-muted">Published {story.publishedDate}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-on-surface leading-snug">
                    <Link to={`/read/${story.id}`} className="hover:text-primary transition-colors">
                      {story.title}
                    </Link>
                  </h3>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p className="font-sans font-semibold text-xs text-on-surface">{story.views} Views</p>
                    <p className="text-[11px] text-text-muted">{story.likes} likes • {story.comments} responses</p>
                  </div>
                  <div className="text-right">
                    <p className="font-sans font-bold text-xs text-primary">{story.earnings}</p>
                    <p className="text-[11px] text-text-muted">Royalties</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link 
                      to={`/read/${story.id}`}
                      className="px-3 py-1.5 rounded-lg border border-divider text-xs font-semibold text-on-surface hover:border-primary hover:text-primary transition-all"
                    >
                      View
                    </Link>
                    <Link 
                      to="/editor"
                      className="px-3 py-1.5 rounded-lg bg-surface-container text-xs font-semibold text-on-surface hover:bg-primary hover:text-white transition-all"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Drafts Table */}
        {activeTab === 'drafts' && (
          <div className="divide-y divide-divider/60">
            {drafts.map((draft) => (
              <div key={draft.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Draft • {draft.completion}
                    </span>
                    <span className="text-xs text-text-muted">{draft.category}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-on-surface">
                    {draft.title}
                  </h3>
                  <p className="text-xs text-text-muted">Last edited {draft.lastEdited} • {draft.words}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to="/editor"
                    className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Continue Writing
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
