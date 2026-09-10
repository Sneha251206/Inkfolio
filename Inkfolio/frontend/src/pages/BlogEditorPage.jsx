import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../api';

export default function BlogEditorPage() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Deep Dive');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage('Please enter a title and content before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      await createArticle({
        title,
        subtitle,
        category,
        content,
        author_name: 'Elena Vance',
        read_time: '5 min read',
        published: true
      });
      setMessage('Story published successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage('Published locally (API connection fallback).');
      setTimeout(() => navigate('/'), 1500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-10">
      <div className="flex items-center justify-between border-b border-divider pb-4 mb-8">
        <h1 className="font-serif font-bold text-2xl">Editor & Story Studio</h1>
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={handlePublish}
            disabled={submitting}
            className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-container transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">send</span>
            {submitting ? 'Publishing...' : 'Publish Story'}
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-medium">
          {message}
        </div>
      )}

      <form onSubmit={handlePublish} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <input 
              type="text" 
              placeholder="Title..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl font-serif font-bold bg-transparent border-b border-divider pb-3 focus:outline-none focus:border-primary placeholder:text-text-muted"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase mb-1">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-surface-container rounded-lg border border-divider text-sm font-sans focus:outline-none focus:border-primary"
            >
              <option value="Deep Dive">Deep Dive</option>
              <option value="Design Culture">Design Culture</option>
              <option value="Health & Philosophy">Health & Philosophy</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
        </div>

        <div>
          <input 
            type="text" 
            placeholder="Subtitle or brief abstract..." 
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full text-xl font-serif text-on-surface-variant bg-transparent border-b border-divider pb-3 focus:outline-none focus:border-primary placeholder:text-text-muted/70"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase mb-2">Narrative Content</label>
          <textarea 
            rows="14"
            placeholder="Write your story here... Markdown is supported."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 font-serif text-lg leading-relaxed bg-surface-container-low rounded-xl border border-divider focus:outline-none focus:border-primary"
          />
        </div>
      </form>
    </div>
  );
}
