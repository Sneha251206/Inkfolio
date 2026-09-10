import React from 'react';

export default function AdminUsersPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-8">
      <h1 className="font-serif font-bold text-3xl">Admin • Users & Authors Management</h1>

      <div className="bg-surface-container rounded-xl border border-divider overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-container-high text-xs uppercase text-text-muted font-semibold">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Verification</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-divider font-sans">
            <tr>
              <td className="p-4 font-semibold">Elena Vance</td>
              <td className="p-4 text-text-muted">Editor in Chief</td>
              <td className="p-4 text-green-600 font-semibold">Verified Badge</td>
              <td className="p-4"><span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Active</span></td>
              <td className="p-4 text-right">
                <button className="text-xs font-semibold text-primary hover:underline">Edit Role</button>
              </td>
            </tr>
            <tr>
              <td className="p-4 font-semibold">Julian Thorne</td>
              <td className="p-4 text-text-muted">Senior Author</td>
              <td className="p-4 text-green-600 font-semibold">Verified Badge</td>
              <td className="p-4"><span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Active</span></td>
              <td className="p-4 text-right">
                <button className="text-xs font-semibold text-primary hover:underline">Edit Role</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
