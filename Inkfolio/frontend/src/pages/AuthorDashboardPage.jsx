import React, { useState, useEffect } from 'react';
import { fetchAnalyticsOverview } from '../api';

export default function AuthorDashboardPage() {
  const [stats, setStats] = useState({
    total_views: 45800,
    total_likes: 4460,
    monthly_earnings: 3450.75,
    active_subscribers: 12840
  });

  useEffect(() => {
    async function loadStats() {
      const data = await fetchAnalyticsOverview();
      if (data) setStats(data);
    }
    loadStats();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-3xl">Author Analytics & Studio</h1>
          <p className="text-sm text-text-muted">Track your readership growth and monthly publication earnings.</p>
        </div>
        <button className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg">
          Export Analytics CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-surface-container rounded-xl border border-divider">
          <p className="text-xs text-text-muted uppercase font-semibold">Total Readership Views</p>
          <p className="text-3xl font-bold font-serif text-on-surface mt-2">{stats.total_views.toLocaleString()}</p>
          <span className="text-xs text-green-600 font-semibold mt-1 inline-block">↑ +14.2% this month</span>
        </div>

        <div className="p-6 bg-surface-container rounded-xl border border-divider">
          <p className="text-xs text-text-muted uppercase font-semibold">Reader Engagement (Likes)</p>
          <p className="text-3xl font-bold font-serif text-on-surface mt-2">{stats.total_likes.toLocaleString()}</p>
          <span className="text-xs text-green-600 font-semibold mt-1 inline-block">↑ +8.7% this month</span>
        </div>

        <div className="p-6 bg-surface-container rounded-xl border border-divider">
          <p className="text-xs text-text-muted uppercase font-semibold">Monthly Earnings</p>
          <p className="text-3xl font-bold font-serif text-primary mt-2">${stats.monthly_earnings.toLocaleString()}</p>
          <span className="text-xs text-green-600 font-semibold mt-1 inline-block">Payout date: Sep 15</span>
        </div>

        <div className="p-6 bg-surface-container rounded-xl border border-divider">
          <p className="text-xs text-text-muted uppercase font-semibold">Active Paid Subscribers</p>
          <p className="text-3xl font-bold font-serif text-on-surface mt-2">{stats.active_subscribers.toLocaleString()}</p>
          <span className="text-xs text-green-600 font-semibold mt-1 inline-block">↑ +210 new</span>
        </div>
      </div>

      <div className="bg-surface-container-low p-6 rounded-xl border border-divider space-y-4">
        <h2 className="font-serif font-bold text-xl">Top Performing Articles</h2>
        <div className="divide-y divide-divider">
          <div className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-base">The Architecture of Deep Focus in the Digital Noise Age</p>
              <p className="text-xs text-text-muted">Published Sep 01, 2026 • Deep Dive</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">12.4k Views</p>
              <p className="text-xs text-green-600 font-medium">$1,240.00 Earned</p>
            </div>
          </div>

          <div className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-base">Brutalist Design & The Return of Pure Typography</p>
              <p className="text-xs text-text-muted">Published Aug 25, 2026 • Design Culture</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">6.7k Views</p>
              <p className="text-xs text-green-600 font-medium">$670.50 Earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
