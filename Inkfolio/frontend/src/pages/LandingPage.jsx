import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../api';

export default function LandingPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedIds, setBookmarkedIds] = useState([1]);
  const [followingAuthors, setFollowingAuthors] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await fetchArticles();
      if (data && data.length > 0) {
        setArticles(data);
      } else {
        // Fallback editorial articles
        setArticles([
          {
            id: 1,
            title: "The Architecture of Deep Focus in the Digital Noise Age",
            subtitle: "Why cognitive solitude is becoming the rarest intellectual currency of our century.",
            category: "Deep Dive",
            read_time: "8 min read",
            published_date: "Sep 12, 2026",
            author_name: "Elena Vance",
            author_role: "Editor in Chief",
            author_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            cover_image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80"
          },
          {
            id: 2,
            title: "Brutalist Design & The Return of Pure Typography",
            subtitle: "Stripping away digital fluff to prioritize raw editorial narrative and timeless craftsmanship.",
            category: "Design Culture",
            read_time: "5 min read",
            published_date: "Sep 08, 2026",
            author_name: "Julian Thorne",
            author_role: "Senior Critic",
            author_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            cover_image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80"
          },
          {
            id: 3,
            title: "Evidence-Based Narratives for an Intentional Life",
            subtitle: "Exploring wellness, cognitive bandwidth, and slow journalism through scientific rigor.",
            category: "Health & Philosophy",
            read_time: "6 min read",
            published_date: "Aug 30, 2026",
            author_name: "Sarah Jenks",
            author_role: "Bioethics Contributor",
            author_avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
            cover_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80"
          },
          {
            id: 4,
            title: "Algorithmic Monoculture and the Human Voice",
            subtitle: "How generative systems are reshaping modern authorship and why handcrafted essays matter.",
            category: "Technology",
            read_time: "7 min read",
            published_date: "Aug 22, 2026",
            author_name: "Marcus Sterling",
            author_role: "Digital Ethicist",
            author_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
            cover_image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80"
          }
        ]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const toggleBookmark = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleFollow = (authorName) => {
    setFollowingAuthors(prev => ({
      ...prev,
      [authorName]: !prev[authorName]
    }));
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const categories = ['All', 'Deep Dive', 'Design Culture', 'Health & Philosophy', 'Technology'];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(a => a.category?.toLowerCase() === selectedCategory.toLowerCase());

  const leadStory = articles[0];
  const supportingStories = articles.slice(1, 3);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      {/* 1. Editorial Brand Intro & Masthead */}
      <section className="border-b border-divider pb-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[11px] font-sans font-bold tracking-widest text-accent uppercase">
              <span>InkFolio Editorial</span>
              <span>•</span>
              <span>Vol. IV • Curated Essays</span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-on-surface tracking-tight leading-[1.15]">
              Where ideas find their depth.
            </h1>
            <p className="font-serif text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              A quiet sanctuary for long-form essays, architectural typography, slow journalism, and voices of distinct craftsmanship.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-xs text-text-muted pb-1">
            <div className="text-right">
              <span className="block font-semibold text-on-surface text-sm">3,400+</span>
              <span>Subscribed Readers</span>
            </div>
            <div className="h-8 w-[1px] bg-divider"></div>
            <div className="text-right">
              <span className="block font-semibold text-on-surface text-sm">100%</span>
              <span>Independent & Ad-Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Asymmetric Magazine Cover Hero Section */}
      {articles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-widest font-bold text-text-muted">
              Featured Editorial
            </h2>
            <span className="text-xs text-accent font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Weekly Selection
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Lead Primary Story (Columns 1-7) */}
            {leadStory && (
              <article className="lg:col-span-7 group bg-surface-container-low rounded-2xl border border-divider overflow-hidden hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
                <Link to={`/read/${leadStory.id}`} className="block overflow-hidden relative">
                  <img 
                    src={leadStory.cover_image} 
                    alt={leadStory.title}
                    className="w-full h-72 sm:h-84 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-surface/90 backdrop-blur-md text-accent font-semibold text-xs rounded-full uppercase tracking-wider border border-divider shadow-sm">
                      {leadStory.category}
                    </span>
                  </div>
                  <button
                    onClick={(e) => toggleBookmark(leadStory.id, e)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-surface/90 backdrop-blur-md text-on-surface hover:text-accent border border-divider shadow-sm transition-all"
                    title={bookmarkedIds.includes(leadStory.id) ? "Remove Bookmark" : "Save Story"}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {bookmarkedIds.includes(leadStory.id) ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </Link>

                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-2xl sm:text-3xl text-on-surface leading-snug group-hover:text-primary transition-colors">
                      <Link to={`/read/${leadStory.id}`}>
                        {leadStory.title}
                      </Link>
                    </h3>
                    <p className="font-serif text-on-surface-variant text-base sm:text-lg leading-relaxed line-clamp-3">
                      {leadStory.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-divider/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={leadStory.author_avatar} 
                        alt={leadStory.author_name} 
                        className="w-10 h-10 rounded-full object-cover border border-divider"
                      />
                      <div>
                        <p className="font-sans font-semibold text-sm text-on-surface">{leadStory.author_name}</p>
                        <p className="text-xs text-text-muted">{leadStory.read_time} • {leadStory.published_date || 'Sep 2026'}</p>
                      </div>
                    </div>

                    <Link 
                      to={`/read/${leadStory.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform"
                    >
                      Read Essay
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
            )}

            {/* Supporting Featured Stories (Columns 8-12) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {supportingStories.map((story) => (
                <article 
                  key={story.id} 
                  className="group bg-surface-container-low rounded-2xl border border-divider p-6 hover:border-primary/40 hover:shadow-card transition-all duration-300 flex flex-col justify-between flex-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                        {story.category}
                      </span>
                      <span className="text-xs text-text-muted">{story.read_time}</span>
                    </div>

                    <h4 className="font-serif font-bold text-xl text-on-surface leading-snug group-hover:text-primary transition-colors">
                      <Link to={`/read/${story.id}`}>
                        {story.title}
                      </Link>
                    </h4>

                    <p className="font-serif text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                      {story.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-divider/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={story.author_avatar} 
                        alt={story.author_name} 
                        className="w-8 h-8 rounded-full object-cover" 
                      />
                      <span className="text-xs font-medium text-on-surface">{story.author_name}</span>
                    </div>

                    <Link 
                      to={`/read/${story.id}`} 
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      Read
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))}

              {/* Editorial Quote Box */}
              <div className="p-6 bg-primary text-white rounded-2xl space-y-2 relative overflow-hidden">
                <div className="absolute top-2 right-4 text-white/10 font-serif text-7xl select-none font-bold">
                  “
                </div>
                <p className="font-serif italic text-sm text-white/95 leading-relaxed relative z-10">
                  "To write thoughtfully is to resist the rush of the disposable. Quality endures."
                </p>
                <p className="text-[11px] uppercase tracking-wider text-white/70 font-sans font-semibold pt-1">
                  — The InkFolio Editorial Manifesto
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Interactive Category Filter Strip */}
      <section className="space-y-4 pt-4 border-t border-divider">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-2xl text-on-surface">Explore Topics</h2>
            <p className="text-xs text-text-muted mt-0.5">Filter by editorial theme and cognitive focus</p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-sm font-semibold'
                    : 'bg-surface-container border border-divider text-on-surface hover:border-primary/50'
                }`}
              >
                {cat}
                {cat === 'All' ? ` (${articles.length})` : ''}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Main Editorial Feed + Curated Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Article Stream (Cols 1-8) */}
        <main className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-divider pb-3">
            <h3 className="font-serif font-bold text-xl text-on-surface">
              {selectedCategory === 'All' ? 'Latest Publications' : `${selectedCategory} Articles`}
            </h3>
            <span className="text-xs text-text-muted">{filteredArticles.length} stories available</span>
          </div>

          {loading ? (
            <div className="space-y-6 py-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse bg-surface-container-low p-6 rounded-2xl border border-divider space-y-4">
                  <div className="h-4 bg-surface-container rounded w-1/4"></div>
                  <div className="h-6 bg-surface-container rounded w-3/4"></div>
                  <div className="h-4 bg-surface-container rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-low rounded-2xl border border-divider space-y-3">
              <span className="material-symbols-outlined text-4xl text-text-muted">menu_book</span>
              <p className="font-serif font-bold text-lg">No essays under this topic yet</p>
              <p className="text-xs text-text-muted max-w-sm mx-auto">
                Check back soon or explore other curated categories.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-2 text-xs font-semibold text-primary underline"
              >
                View all articles
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredArticles.map((art) => (
                <article 
                  key={art.id} 
                  className="group bg-surface-container-low rounded-2xl border border-divider p-6 sm:p-7 hover:border-primary/40 hover:shadow-card transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
                >
                  <div className="sm:col-span-8 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                        {art.category}
                      </span>
                      <span className="text-divider">•</span>
                      <span className="text-xs text-text-muted">{art.read_time}</span>
                    </div>

                    <h4 className="font-serif font-bold text-xl sm:text-2xl text-on-surface leading-snug group-hover:text-primary transition-colors">
                      <Link to={`/read/${art.id}`}>
                        {art.title}
                      </Link>
                    </h4>

                    <p className="font-serif text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                      {art.subtitle}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-text-muted">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={art.author_avatar} 
                          alt={art.author_name} 
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="font-medium text-on-surface">{art.author_name}</span>
                        <span>•</span>
                        <span>{art.published_date || 'Sep 2026'}</span>
                      </div>

                      <button
                        onClick={(e) => toggleBookmark(art.id, e)}
                        className="p-1 text-text-muted hover:text-accent transition-colors"
                        title={bookmarkedIds.includes(art.id) ? "Bookmarked" : "Bookmark Story"}
                      >
                        <span className="material-symbols-outlined text-lg">
                          {bookmarkedIds.includes(art.id) ? 'bookmark' : 'bookmark_border'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {art.cover_image && (
                    <div className="sm:col-span-4 overflow-hidden rounded-xl">
                      <Link to={`/read/${art.id}`} className="block">
                        <img 
                          src={art.cover_image} 
                          alt={art.title} 
                          className="w-full h-44 sm:h-36 object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                        />
                      </Link>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </main>

        {/* Curated Sidebar (Cols 9-12) */}
        <aside className="lg:col-span-4 space-y-8 sticky top-20">
          {/* Curated Authors Widget */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-divider space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-on-surface">Curated Voices</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent bg-accent-light px-2 py-0.5 rounded-full border border-accent/20">
                Staff Picks
              </span>
            </div>

            <div className="space-y-4 divide-y divide-divider/60">
              {/* Author 1 */}
              <div className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" 
                    className="w-11 h-11 rounded-full object-cover border border-divider" 
                    alt="Elena Vance" 
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-sm text-on-surface">Elena Vance</p>
                      <span className="material-symbols-outlined text-primary text-xs" title="Verified Author">verified</span>
                    </div>
                    <p className="text-xs text-text-muted">Editor in Chief • Essays</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => toggleFollow('Elena Vance')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                    followingAuthors['Elena Vance']
                      ? 'bg-primary text-white'
                      : 'border border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {followingAuthors['Elena Vance'] ? 'Following' : 'Follow'}
                </button>
              </div>

              {/* Author 2 */}
              <div className="pt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" 
                    className="w-11 h-11 rounded-full object-cover border border-divider" 
                    alt="Julian Thorne" 
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-sm text-on-surface">Julian Thorne</p>
                      <span className="material-symbols-outlined text-primary text-xs" title="Verified Author">verified</span>
                    </div>
                    <p className="text-xs text-text-muted">Design & Brutalism</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => toggleFollow('Julian Thorne')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                    followingAuthors['Julian Thorne']
                      ? 'bg-primary text-white'
                      : 'border border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {followingAuthors['Julian Thorne'] ? 'Following' : 'Follow'}
                </button>
              </div>

              {/* Author 3 */}
              <div className="pt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80" 
                    className="w-11 h-11 rounded-full object-cover border border-divider" 
                    alt="Sarah Jenks" 
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-sm text-on-surface">Sarah Jenks</p>
                      <span className="material-symbols-outlined text-primary text-xs" title="Verified Author">verified</span>
                    </div>
                    <p className="text-xs text-text-muted">Cognitive Science & Health</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => toggleFollow('Sarah Jenks')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                    followingAuthors['Sarah Jenks']
                      ? 'bg-primary text-white'
                      : 'border border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {followingAuthors['Sarah Jenks'] ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          </div>

          {/* Newsletter Digest Card */}
          <div className="bg-surface-container p-6 rounded-2xl border border-divider space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                Sunday Morning Dispatch
              </span>
              <h4 className="font-serif font-bold text-lg text-on-surface">
                Read without distractions.
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Receive one long-form essay and curated intellectual rabbit holes every weekend.
              </p>
            </div>

            {newsletterSubscribed ? (
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-xs font-semibold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-base">check_circle</span>
                You are subscribed to the Dispatch!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full px-3.5 py-2.5 bg-surface rounded-lg border border-divider text-xs text-on-surface focus:outline-none focus:border-primary transition-all placeholder:text-text-muted"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container transition-all"
                >
                  Join 3,400+ Readers
                </button>
              </form>
            )}
          </div>

          {/* Become an Author Card */}
          <div className="bg-gradient-to-br from-primary to-primary-container text-white p-6 rounded-2xl space-y-4 shadow-card">
            <span className="inline-block px-2.5 py-1 bg-white/20 text-white font-semibold text-[10px] rounded-full uppercase tracking-wider">
              Writer Studio
            </span>
            <h4 className="font-serif font-bold text-xl leading-snug">
              Have a perspective worthy of print?
            </h4>
            <p className="text-xs text-white/85 leading-relaxed">
              InkFolio authors earn 85% publication revenue share and receive bespoke editorial typography.
            </p>
            <Link 
              to="/verification" 
              className="block text-center w-full py-2.5 bg-white text-primary font-bold rounded-lg hover:bg-white/95 transition-all text-xs shadow-sm"
            >
              Apply as Verified Author →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
