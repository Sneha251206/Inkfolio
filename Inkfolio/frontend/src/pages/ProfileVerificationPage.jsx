import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfileVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthor, becomeAuthor, isLoggedIn } = useAuth();
  const [upgraded, setUpgraded] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const isAuthorRequired = searchParams.get('reason') === 'author_required';

  const handleUpgrade = () => {
    becomeAuthor();
    setUpgraded(true);
    setTimeout(() => {
      navigate('/editor');
    }, 1200);
  };

  return (
    <div className="max-w-[900px] mx-auto px-6 py-12 space-y-10">
      {/* Notice Banner when redirected from Write a Story */}
      {isAuthorRequired && !isAuthor && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-start gap-3">
          <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
          <div>
            <h4 className="text-sm font-semibold text-primary">Author Status Required</h4>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Only verified authors can compose and publish stories on InkFolio. Upgrade your reader membership below to unlock the Story Editor Studio and Author Dashboard.
            </p>
          </div>
        </div>
      )}

      {upgraded && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800 text-sm font-medium">
          <span className="material-symbols-outlined text-green-600">check_circle</span>
          Congratulations! You are now a Verified Author. Redirecting to Story Studio...
        </div>
      )}

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="px-3 py-1 bg-primary/10 text-primary font-semibold text-xs rounded-full uppercase tracking-wider">
          Verified Author Membership
        </span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-on-surface">
          Elevate Your Voice with InkFolio Verification
        </h1>
        <p className="font-serif text-on-surface-variant text-base">
          Get verified checkmarks, publish editorial pieces to thousands of engaged readers, and earn directly from your stories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Standard Reader Card */}
        <div className="p-8 bg-surface-container rounded-2xl border border-divider space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-2xl">Standard Reader</h3>
              <p className="text-3xl font-bold text-on-surface">$0 <span className="text-sm font-normal text-text-muted">/ month</span></p>
            </div>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                Unlimited public article reading
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                Bookmark & curate reading lists
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">check</span>
                Like and comment on public essays
              </li>
              <li className="flex items-center gap-2 text-text-muted">
                <span className="material-symbols-outlined text-base opacity-40">close</span>
                Story publishing studio
              </li>
              <li className="flex items-center gap-2 text-text-muted">
                <span className="material-symbols-outlined text-base opacity-40">close</span>
                Author analytics & earnings
              </li>
            </ul>
          </div>
          <button 
            disabled
            className="w-full py-3 bg-surface-container-high font-semibold text-sm rounded-lg text-on-surface opacity-80 cursor-default"
          >
            {!isAuthor ? 'Current Plan' : 'Reader Tier'}
          </button>
        </div>

        {/* Verified Author Card */}
        <div className="p-8 bg-primary text-white rounded-2xl space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-4 right-4 bg-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Recommended
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-2xl">Verified Author</h3>
              <p className="text-3xl font-bold">$12 <span className="text-sm font-normal opacity-80">/ month</span></p>
            </div>
            <ul className="space-y-3 text-sm opacity-95">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">verified</span>
                Gold Verified Badge on Profile
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">edit_document</span>
                Publish Unlimited Stories
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">analytics</span>
                Comprehensive Author Analytics Dashboard
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">payments</span>
                85% Author Publication Revenue Share
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">support_agent</span>
                Priority Editorial Review Support
              </li>
            </ul>
          </div>
          <div>
            {isAuthor ? (
              <div className="w-full py-3 bg-white/20 text-white font-bold text-sm rounded-lg text-center">
                ✓ You are already a Verified Author
              </div>
            ) : (
              <button 
                onClick={handleUpgrade}
                className="w-full py-3 bg-white text-primary font-bold text-sm rounded-lg hover:bg-opacity-95 transition-all shadow-md active:scale-[0.99]"
              >
                Upgrade & Activate Author Status
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
