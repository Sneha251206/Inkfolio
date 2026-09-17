import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../api';

export default function LandingPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchArticles();
      if (data && data.length > 0) {
        setArticles(data);
      } else {
        // Local fallback data if API is offline
        setArticles([
          {
            id: 1,
            title: "The Architecture of Deep Focus in the Digital Noise Age",
            subtitle: "Why cognitive solitude is becoming the rarest intellectual currency of our century.",
            category: "Deep Dive",
            read_time: "8 min read",
            author_name: "Elena Vance",
            author_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            cover_image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80"
          },
          {
            id: 2,
            title: "Brutalist Design & The Return of Pure Typography",
            subtitle: "Stripping away fluff to prioritize raw editorial narrative.",
            category: "Design Culture",
            read_time: "5 min read",
            author_name: "Julian Thorne",
            author_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            cover_image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80"
          },
          {
            id: 3,
            title: "Evidence-Based Narratives for an Intentional Life",
            subtitle: "Exploring wellness through scientific rigor and slow journalism.",
            category: "Health & Philosophy",
            read_time: "6 min read",
            author_name: "Sarah Jenks",
            author_avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
            cover_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80"
          }
        ]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-12">
      {/* Hero Featured Section */}
      {articles.length > 0 && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-container-low p-8 rounded-2xl border border-divider">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-semibold text-xs rounded-full uppercase tracking-wider">
              Featured Story • {articles[0].category}
            </span>
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-on-surface leading-tight">
              <Link to={`/read/${articles[0].id}`} className="hover:text-primary transition-colors">
                {articles[0].title}
              </Link>
            </h1>
            <p className="font-serif text-lg text-on-surface-variant line-clamp-3">
              {articles[0].subtitle}
            </p>
            <div className="flex items-center gap-3 pt-4">
              <img src={articles[0].author_avatar} alt={articles[0].author_name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-sans font-semibold text-sm">{articles[0].author_name}</p>
                <p className="font-sans text-xs text-text-muted">{articles[0].read_time}</p>
              </div>
              <Link 
                to={`/read/${articles[0].id}`} 
                className="ml-auto bg-primary text-white font-sans text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary-container transition-all"
              >
                Read Story
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img 
              src={articles[0].cover_image} 
              alt={articles[0].title} 
              className="w-full h-72 lg:h-80 object-cover rounded-xl shadow-sm"
            />
          </div>
        </section>
      )}

      {/* Main Grid & Editorial Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8 space-y-8">
          <h2 className="font-serif font-bold text-2xl border-b border-divider pb-3">Latest Articles</h2>

          {loading ? (
            <p className="text-text-muted py-8">Loading articles...</p>
          ) : (
            articles.map((art) => (
              <article key={art.id} className="grid grid-cols-1 sm:grid-cols-12 gap-6 pb-8 border-b border-divider items-center">
                <div className="sm:col-span-8 space-y-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{art.category}</span>
                  <h3 className="font-serif font-bold text-xl leading-snug">
                    <Link to={`/read/${art.id}`} className="hover:text-primary transition-colors">
                      {art.title}
                    </Link>
                  </h3>
                  <p className="font-serif text-sm text-on-surface-variant line-clamp-2">{art.subtitle}</p>
                  <div className="flex items-center gap-3 pt-2 text-xs font-sans text-text-muted">
                    <span>By {art.author_name}</span>
                    <span>•</span>
                    <span>{art.read_time}</span>
                  </div>
                </div>
                {art.cover_image && (
                  <div className="sm:col-span-4">
                    <img src={art.cover_image} alt={art.title} className="w-full h-36 object-cover rounded-lg" />
                  </div>
                )}
              </article>
            ))
          )}
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container p-6 rounded-xl border border-divider space-y-4">
            <h3 className="font-serif font-bold text-xl">Curated Authors</h3>
            <div className="editorial-divider"></div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" className="w-10 h-10 rounded-full" alt="Elena Vance" />
                  <div>
                    <p className="font-semibold text-sm">Elena Vance</p>
                    <p className="text-xs text-text-muted">Editor in Chief</p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-primary border border-primary px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-all">
                  Follow
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" className="w-10 h-10 rounded-full" alt="Julian Thorne" />
                  <div>
                    <p className="font-semibold text-sm">Julian Thorne</p>
                    <p className="text-xs text-text-muted">Design Critic</p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-primary border border-primary px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-all">
                  Follow
                </button>
              </div>
            </div>
          </div>

          <div className="bg-primary text-white p-6 rounded-xl space-y-3">
            <h3 className="font-serif font-bold text-xl">Write for InkFolio?</h3>
            <p className="text-sm opacity-90">Join our community of thoughtful authors and get paid for your perspective.</p>
            <Link to="/verification" className="block text-center w-full py-2.5 bg-white text-primary font-bold rounded-lg hover:bg-opacity-90 transition-all text-sm">
              Apply to Write
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
