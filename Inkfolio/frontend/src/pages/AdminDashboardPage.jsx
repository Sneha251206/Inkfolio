import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-divider pb-4">
        <div>
          <h1 className="font-serif font-bold text-3xl">Admin Overview & Control Center</h1>
          <p className="text-sm text-text-muted">Manage system operations, moderation queues, user roles, and payouts.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/users" className="px-4 py-2 bg-surface-container border border-divider rounded-lg text-sm font-semibold hover:border-primary">
            Manage Users
          </Link>
          <Link to="/admin/payments" className="px-4 py-2 bg-surface-container border border-divider rounded-lg text-sm font-semibold hover:border-primary">
            Financial Payouts
          </Link>
          <Link to="/admin/moderation" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold">
            Moderation Queue
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-surface-container rounded-xl border border-divider">
          <p className="text-xs text-text-muted uppercase font-semibold">Total Platform Users</p>
          <p className="text-3xl font-bold font-serif mt-2">128,490</p>
        </div>
        <div className="p-6 bg-surface-container rounded-xl border border-divider">
          <p className="text-xs text-text-muted uppercase font-semibold">Pending Moderation Flags</p>
          <p className="text-3xl font-bold font-serif text-amber-600 mt-2">3 Articles</p>
        </div>
        <div className="p-6 bg-surface-container rounded-xl border border-divider">
          <p className="text-xs text-text-muted uppercase font-semibold">Monthly Platform GMV</p>
          <p className="text-3xl font-bold font-serif text-primary mt-2">$84,200.00</p>
        </div>
      </div>
    </div>
  );
}
