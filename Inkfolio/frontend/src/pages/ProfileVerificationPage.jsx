import React from 'react';

export default function ProfileVerificationPage() {
  return (
    <div className="max-w-[900px] mx-auto px-6 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="px-3 py-1 bg-primary/10 text-primary font-semibold text-xs rounded-full uppercase tracking-wider">
          Verified Author Membership
        </span>
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-on-surface">
          Elevate Your Voice with InkFolio Verification
        </h1>
        <p className="font-serif text-on-surface-variant text-base">
          Get verified checkmarks, publish paywalled editorial pieces, and earn directly from your readers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-surface-container rounded-2xl border border-divider space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-2xl">Standard Reader</h3>
            <p className="text-3xl font-bold text-on-surface">$0 <span className="text-sm font-normal text-text-muted">/ month</span></p>
          </div>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            <li className="flex items-center gap-2">✓ Unlimited public article reading</li>
            <li className="flex items-center gap-2">✓ Bookmark & curate reading lists</li>
            <li className="flex items-center gap-2">✓ Comment on public essays</li>
          </ul>
          <button className="w-full py-3 bg-surface-container-high font-semibold text-sm rounded-lg text-on-surface">
            Current Plan
          </button>
        </div>

        <div className="p-8 bg-primary text-white rounded-2xl space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Recommended
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-2xl">Verified Author</h3>
            <p className="text-3xl font-bold">$12 <span className="text-sm font-normal opacity-80">/ month</span></p>
          </div>
          <ul className="space-y-3 text-sm opacity-95">
            <li className="flex items-center gap-2">✓ Gold Verified Badge on Profile</li>
            <li className="flex items-center gap-2">✓ Publish Paywalled Articles</li>
            <li className="flex items-center gap-2">✓ 85% Author Revenue Share</li>
            <li className="flex items-center gap-2">✓ Priority Admin & Editorial Support</li>
          </ul>
          <button className="w-full py-3 bg-white text-primary font-bold text-sm rounded-lg hover:bg-opacity-95 transition-all">
            Upgrade & Submit Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
