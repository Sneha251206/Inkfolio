import React, { useState } from 'react';
import ReadingProgressBar from '../components/ReadingProgressBar';

export default function ReadingExperiencePage() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1420);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <>
      <ReadingProgressBar />
      <article className="max-w-[720px] mx-auto px-6 py-12 space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-semibold text-xs rounded-full uppercase tracking-wider">
            Deep Dive Essay
          </span>
          <h1 className="font-serif font-bold text-3xl md:text-5xl leading-tight text-on-surface">
            The Architecture of Deep Focus in the Digital Noise Age
          </h1>
          <p className="font-serif text-xl text-on-surface-variant leading-relaxed">
            Why cognitive solitude is becoming the rarest intellectual currency of our century.
          </p>
        </div>

        <div className="flex items-center justify-between border-y border-divider py-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
              alt="Elena Vance" 
              className="w-12 h-12 rounded-full object-cover" 
            />
            <div>
              <p className="font-semibold text-sm">Elena Vance</p>
              <p className="text-xs text-text-muted">Editor in Chief • 8 min read</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleLike} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                liked ? 'bg-red-50 text-red-600 border-red-200' : 'border-divider text-text-muted hover:border-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{liked ? 'favorite' : 'favorite_border'}</span>
              <span>{likeCount}</span>
            </button>
            <button 
              onClick={() => setBookmarked(!bookmarked)} 
              className={`p-2 rounded-full border transition-all ${
                bookmarked ? 'bg-primary text-white border-primary' : 'border-divider text-text-muted hover:border-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{bookmarked ? 'bookmark_added' : 'bookmark_border'}</span>
            </button>
          </div>
        </div>

        <img 
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80" 
          alt="Editorial Cover" 
          className="w-full h-96 object-cover rounded-xl shadow-sm"
        />

        <div className="font-serif text-lg leading-relaxed text-on-surface space-y-6">
          <p className="first-letter:float-left first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:font-serif">
            Deep focus is no longer a luxury; it is the ultimate competitive advantage and intellectual sanctuary. In an era dominated by hyper-notification systems, infinite scroll feeds, and algorithmic dopamine loops, the capacity for sustained, uninterrupted cognition has become uniquely rare.
          </p>

          <p>
            To construct an environment conducive to deep focus requires intentional boundaries. We must treat our attention not as a passive sponge, but as an active, highly curated gallery where only thoughts of distinct craftsmanship are permitted entry.
          </p>

          <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl font-medium text-primary-container bg-surface-container-low rounded-r-lg">
            "Solitude is the laboratory of leadership and creative breakthrough."
          </blockquote>

          <h2 className="font-serif font-bold text-2xl text-on-surface pt-4">Reclaiming Cognitive Autonomy</h2>

          <p>
            When we eliminate shallow context switches, our intellectual output experiences exponential gains in clarity and originality. Modern editorial platforms must reflect this philosophy by eliminating visual clutter, popups, and distracting sidebar noise.
          </p>
        </div>

        <div className="border-t border-divider pt-8 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="text-xs px-3 py-1 bg-surface-container rounded-full text-text-muted">#Focus</span>
            <span className="text-xs px-3 py-1 bg-surface-container rounded-full text-text-muted">#Writing</span>
            <span className="text-xs px-3 py-1 bg-surface-container rounded-full text-text-muted">#Philosophy</span>
          </div>

          <button className="text-xs font-semibold text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all">
            Share Article
          </button>
        </div>
      </article>
    </>
  );
}
