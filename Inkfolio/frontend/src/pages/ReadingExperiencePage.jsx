import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReadingProgressBar from '../components/ReadingProgressBar';
import { fetchArticleById } from '../api';
import { useAuth } from '../context/AuthContext';

export default function ReadingExperiencePage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1420);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [fontSize, setFontSize] = useState('text-lg'); // text-base, text-lg, text-xl
  const [followingAuthor, setFollowingAuthor] = useState(false);

  // Comments State
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Julian Thorne",
      role: "Senior Design Critic",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      date: "Sep 13, 2026",
      text: "The concept of cognitive solitude as intellectual currency resonates deeply. In architecture, whitespace dictates the power of the structure; in thinking, uninterrupted quiet does the exact same."
    },
    {
      id: 2,
      author: "Clara Hughes",
      role: "Standard Reader",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      date: "Sep 14, 2026",
      text: "Loved the observation on eliminating shallow context switches. Reading this on InkFolio without blinking banner ads or popups is such a breath of fresh air."
    }
  ]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    async function loadArticle() {
      if (id) {
        const data = await fetchArticleById(id);
        if (data) {
          setArticle(data);
          setLikeCount(data.likes || 1420);
          return;
        }
      }
      // Fallback articles based on ID
      const mockArticles = {
        '1': {
          id: 1,
          title: "The Architecture of Deep Focus in the Digital Noise Age",
          subtitle: "Why cognitive solitude is becoming the rarest intellectual currency of our century.",
          category: "Deep Dive Essay",
          read_time: "8 min read",
          published_date: "September 12, 2026",
          author_name: "Elena Vance",
          author_role: "Editor in Chief & Essayist",
          author_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          author_bio: "Advocating for brutalist simplicity in an overcomplicated digital world. Editor in Chief at InkFolio, writing on deep focus, cognition, and typography.",
          cover_image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80",
          likes: 1420
        },
        '2': {
          id: 2,
          title: "Brutalist Design & The Return of Pure Typography",
          subtitle: "Stripping away digital fluff to prioritize raw editorial narrative and timeless craftsmanship.",
          category: "Design Culture",
          read_time: "5 min read",
          published_date: "September 08, 2026",
          author_name: "Julian Thorne",
          author_role: "Senior Critic & Typographer",
          author_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          author_bio: "Architectural enthusiast, writer, and typography addict exploring the intersection of form, function, and readability.",
          cover_image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80",
          likes: 890
        },
        '3': {
          id: 3,
          title: "Evidence-Based Narratives for an Intentional Life",
          subtitle: "Exploring wellness, cognitive bandwidth, and slow journalism through scientific rigor.",
          category: "Health & Philosophy",
          read_time: "6 min read",
          published_date: "August 30, 2026",
          author_name: "Sarah Jenks",
          author_role: "Bioethics Contributor",
          author_avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
          author_bio: "Research fellow and science essayist exploring human longevity, intentional lifestyle design, and ethical philosophy.",
          cover_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80",
          likes: 2150
        }
      };

      const selected = mockArticles[id] || mockArticles['1'];
      setArticle(selected);
      setLikeCount(selected.likes || 1420);
    }

    loadArticle();
    window.scrollTo(0, 0);
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setShareToast(true);
    setTimeout(() => setShareToast(false), 3000);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      id: Date.now(),
      author: user?.name || "Guest Reader",
      role: user?.is_author ? "Verified Author" : "Reader",
      avatar: user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      date: "Just now",
      text: newComment.trim()
    };

    setComments(prev => [commentObj, ...prev]);
    setNewComment('');
  };

  if (!article) {
    return (
      <div className="max-w-[760px] mx-auto px-6 py-20 text-center">
        <p className="font-serif text-lg text-text-muted">Loading article...</p>
      </div>
    );
  }

  return (
    <>
      <ReadingProgressBar />

      {/* Floating Reader Interaction Bar */}
      <aside className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-surface/90 backdrop-blur-md border border-divider shadow-card-hover rounded-full px-5 py-2.5 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
        {/* Like Button */}
        <button 
          onClick={handleLike} 
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
            liked 
              ? 'bg-red-50 text-red-600 border border-red-200' 
              : 'text-on-surface hover:text-red-600 hover:bg-surface-container'
          }`}
          title="Applaud / Like essay"
        >
          <span className="material-symbols-outlined text-lg">{liked ? 'favorite' : 'favorite_border'}</span>
          <span>{likeCount.toLocaleString()}</span>
        </button>

        <div className="h-4 w-[1px] bg-divider"></div>

        {/* Comment Count / Jump */}
        <a 
          href="#discussion" 
          className="flex items-center gap-1.5 text-xs font-semibold text-on-surface hover:text-primary px-2 py-1 rounded-full transition-colors"
          title="Jump to discussion"
        >
          <span className="material-symbols-outlined text-lg">chat_bubble_outline</span>
          <span>{comments.length}</span>
        </a>

        <div className="h-4 w-[1px] bg-divider"></div>

        {/* Bookmark Button */}
        <button 
          onClick={() => setBookmarked(!bookmarked)} 
          className={`p-1.5 rounded-full transition-all ${
            bookmarked 
              ? 'text-primary' 
              : 'text-text-muted hover:text-on-surface'
          }`}
          title={bookmarked ? "Saved to your list" : "Bookmark this essay"}
        >
          <span className="material-symbols-outlined text-lg">{bookmarked ? 'bookmark' : 'bookmark_border'}</span>
        </button>

        {/* Share Button */}
        <button 
          onClick={handleShare} 
          className="p-1.5 text-text-muted hover:text-primary rounded-full transition-colors relative"
          title="Share article link"
        >
          <span className="material-symbols-outlined text-lg">share</span>
        </button>

        <div className="h-4 w-[1px] bg-divider"></div>

        {/* Reading Size Adjuster */}
        <div className="flex items-center gap-1 text-xs font-serif text-text-muted">
          <button 
            onClick={() => setFontSize('text-base')} 
            className={`px-1.5 py-0.5 rounded ${fontSize === 'text-base' ? 'font-bold text-primary bg-surface-container' : 'hover:text-on-surface'}`}
            title="Standard text size"
          >
            A
          </button>
          <button 
            onClick={() => setFontSize('text-lg')} 
            className={`px-1.5 py-0.5 rounded ${fontSize === 'text-lg' ? 'font-bold text-primary bg-surface-container' : 'hover:text-on-surface'}`}
            title="Large text size"
          >
            A+
          </button>
        </div>
      </aside>

      {/* Share Toast Notification */}
      {shareToast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-base">link</span>
          Article link copied to clipboard!
        </div>
      )}

      {/* Main Article Container */}
      <article className="max-w-[760px] mx-auto px-5 sm:px-8 py-10 md:py-16 space-y-10">
        {/* Article Header */}
        <header className="space-y-5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 bg-accent-light text-accent border border-accent/20 font-semibold text-xs rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-divider">•</span>
            <span className="text-xs text-text-muted">{article.read_time}</span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-on-surface tracking-tight">
            {article.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-on-surface-variant leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author Byline */}
          <div className="pt-4 border-y border-divider py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={article.author_avatar} 
                alt={article.author_name} 
                className="w-12 h-12 rounded-full object-cover border border-divider shadow-sm" 
              />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <p className="font-sans font-semibold text-sm text-on-surface">{article.author_name}</p>
                  <span className="material-symbols-outlined text-primary text-xs" title="Verified Author">verified</span>
                </div>
                <p className="text-xs text-text-muted">
                  {article.author_role} • Published {article.published_date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button 
                type="button"
                onClick={() => setFollowingAuthor(!followingAuthor)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all ${
                  followingAuthor 
                    ? 'bg-primary text-white' 
                    : 'border border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {followingAuthor ? 'Following' : 'Follow Author'}
              </button>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="overflow-hidden rounded-2xl border border-divider shadow-sm">
          <img 
            src={article.cover_image} 
            alt={article.title} 
            className="w-full h-80 sm:h-96 md:h-[420px] object-cover"
          />
        </div>

        {/* Editorial Body Content */}
        <div className={`font-serif ${fontSize} leading-[1.8] text-on-surface space-y-7`}>
          <p className="drop-cap text-on-surface">
            Deep focus is no longer a luxury; it is the ultimate competitive advantage and intellectual sanctuary. In an era dominated by hyper-notification systems, infinite scroll feeds, and algorithmic dopamine loops, the capacity for sustained, uninterrupted cognition has become uniquely rare.
          </p>

          <p>
            To construct an environment conducive to deep focus requires intentional boundaries. We must treat our attention not as a passive sponge, but as an active, highly curated gallery where only thoughts of distinct craftsmanship are permitted entry.
          </p>

          <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 italic text-xl font-medium text-primary-container bg-surface-container-low rounded-r-2xl">
            "Solitude is the laboratory of leadership and creative breakthrough."
          </blockquote>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-on-surface pt-4">
            Reclaiming Cognitive Autonomy
          </h2>

          <p>
            When we eliminate shallow context switches, our intellectual output experiences exponential gains in clarity and originality. Modern editorial platforms must reflect this philosophy by eliminating visual clutter, popups, and distracting sidebar noise.
          </p>

          <p>
            The brutalist discipline of clean typography allows the narrative to breathe. Without the artificial stimuli of flashing advertisements, the reader and writer enter a silent contract: one where respect for time and substance takes precedence over fleeting algorithmic impressions.
          </p>
        </div>

        {/* Article Footer & Tags */}
        <div className="border-t border-divider pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1 bg-surface-container rounded-full text-text-muted hover:border-primary/40 border border-transparent cursor-pointer">
              #Focus
            </span>
            <span className="text-xs px-3 py-1 bg-surface-container rounded-full text-text-muted hover:border-primary/40 border border-transparent cursor-pointer">
              #SlowJournalism
            </span>
            <span className="text-xs px-3 py-1 bg-surface-container rounded-full text-text-muted hover:border-primary/40 border border-transparent cursor-pointer">
              #EditorialDesign
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleShare}
              className="text-xs font-semibold text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">share</span>
              Share Essay
            </button>
          </div>
        </div>

        {/* Author Bio Signature Box */}
        <section className="p-8 bg-surface-container-low rounded-2xl border border-divider flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img 
            src={article.author_avatar} 
            alt={article.author_name} 
            className="w-20 h-20 rounded-full object-cover border-2 border-surface shadow-sm"
          />
          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <h3 className="font-serif font-bold text-xl text-on-surface">{article.author_name}</h3>
                  <span className="material-symbols-outlined text-primary text-sm">verified</span>
                </div>
                <p className="text-xs text-text-muted">{article.author_role}</p>
              </div>
              <Link 
                to="/profile" 
                className="text-xs font-semibold text-primary hover:underline"
              >
                View Profile →
              </Link>
            </div>
            <p className="font-serif text-sm text-on-surface-variant leading-relaxed">
              {article.author_bio || "Contributing author at InkFolio, exploring philosophical perspectives on culture, design, and attention."}
            </p>
          </div>
        </section>

        {/* Reader Discussion / Comments Section */}
        <section id="discussion" className="space-y-6 pt-6 border-t border-divider">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-2xl text-on-surface">
              Discussion & Responses ({comments.length})
            </h3>
            <span className="text-xs text-text-muted">Civil, thoughtful dialogue</span>
          </div>

          {/* New Comment Box */}
          <form onSubmit={handleCommentSubmit} className="space-y-3 p-5 bg-surface-container-low rounded-2xl border border-divider">
            <div className="flex items-center gap-3">
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"} 
                alt="User" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-xs font-semibold text-on-surface">
                {user ? `Commenting as ${user.name}` : 'Join the discussion'}
              </span>
            </div>

            <textarea
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts on this perspective? Keep it constructive and reflective..."
              className="w-full p-3.5 bg-surface rounded-xl border border-divider text-sm font-serif text-on-surface focus:outline-none focus:border-primary placeholder:text-text-muted"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container disabled:opacity-50 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">send</span>
                Publish Response
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4 divide-y divide-divider/60">
            {comments.map((comment) => (
              <div key={comment.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={comment.avatar} 
                      alt={comment.author} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-xs text-on-surface">{comment.author}</p>
                      <p className="text-[11px] text-text-muted">{comment.role}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-text-muted">{comment.date}</span>
                </div>
                <p className="font-serif text-sm text-on-surface-variant pl-10 leading-relaxed">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Stories / Next Read */}
        <section className="space-y-6 pt-10 border-t border-divider">
          <h3 className="font-serif font-bold text-2xl text-on-surface">Recommended from InkFolio</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link 
              to="/read/2" 
              className="group p-6 bg-surface-container-low rounded-2xl border border-divider hover:border-primary/40 hover:shadow-card transition-all space-y-3 block"
            >
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Design Culture</span>
              <h4 className="font-serif font-bold text-lg text-on-surface group-hover:text-primary transition-colors leading-snug">
                Brutalist Design & The Return of Pure Typography
              </h4>
              <p className="text-xs text-text-muted">By Julian Thorne • 5 min read</p>
            </Link>

            <Link 
              to="/read/3" 
              className="group p-6 bg-surface-container-low rounded-2xl border border-divider hover:border-primary/40 hover:shadow-card transition-all space-y-3 block"
            >
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Health & Philosophy</span>
              <h4 className="font-serif font-bold text-lg text-on-surface group-hover:text-primary transition-colors leading-snug">
                Evidence-Based Narratives for an Intentional Life
              </h4>
              <p className="text-xs text-text-muted">By Sarah Jenks • 6 min read</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
