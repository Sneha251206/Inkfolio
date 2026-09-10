import React from 'react';

export default function AdminModerationPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-8">
      <h1 className="font-serif font-bold text-3xl">Admin • Operations & Content Moderation</h1>

      <div className="bg-surface-container p-6 rounded-xl border border-divider space-y-4">
        <h2 className="font-serif font-bold text-xl">Pending Flags Queue</h2>
        <div className="divide-y divide-divider">
          <div className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-base">Understanding Quantum Computing Paradigms</p>
              <p className="text-xs text-text-muted">Author: Marcus Vance • Flag Reason: Copyright Notice</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-green-600 text-white rounded text-xs font-semibold">Approve</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded text-xs font-semibold">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
