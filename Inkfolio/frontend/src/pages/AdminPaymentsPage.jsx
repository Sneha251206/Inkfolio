import React from 'react';

export default function AdminPaymentsPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-8">
      <h1 className="font-serif font-bold text-3xl">Admin • Financial Payouts & Subscriptions</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-surface-container rounded-xl border border-divider">
          <p className="text-xs text-text-muted uppercase font-semibold">Pending Author Payouts</p>
          <p className="text-3xl font-bold font-serif text-amber-600 mt-2">$14,250.00</p>
        </div>
        <div className="p-6 bg-surface-container rounded-xl border border-divider">
          <p className="text-xs text-text-muted uppercase font-semibold">Processed This Month</p>
          <p className="text-3xl font-bold font-serif text-green-600 mt-2">$48,900.50</p>
        </div>
        <div className="p-6 bg-surface-container rounded-xl border border-divider">
          <p className="text-xs text-text-muted uppercase font-semibold">Active Paid Authors</p>
          <p className="text-3xl font-bold font-serif text-primary mt-2">128 Authors</p>
        </div>
      </div>
    </div>
  );
}
