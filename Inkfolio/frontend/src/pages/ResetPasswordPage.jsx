import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Missing or invalid password reset token. Please request a new link.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please verify and try again.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword({ token, new_password: newPassword });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-surface-container-low border border-divider rounded-2xl p-8 shadow-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="font-serif font-bold text-2xl text-on-surface tracking-tight inline-block hover:opacity-80 transition-opacity">
            InkFolio
          </Link>
          <h1 className="font-serif text-2xl font-bold text-on-surface">
            Set a new password
          </h1>
          <p className="font-sans text-xs text-text-muted">
            Enter your new secure password below to complete the reset.
          </p>
        </div>

        {error && (
          <div className="p-3.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-base flex-shrink-0 text-red-600">error</span>
            <p>{error}</p>
          </div>
        )}

        {success ? (
          <div className="space-y-4">
            <div className="p-4 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                Password reset successful!
              </div>
              <p>Your password has been updated. You can now sign in with your new credentials.</p>
            </div>
            <Link
              to="/login"
              className="w-full py-2.5 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Sign In Now
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!token && (
              <div className="p-3 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg">
                No reset token found in URL. Please use the link sent to your email.
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-text-muted uppercase">
                  New Password
                </label>
                <span className="text-[11px] text-text-muted">Min 6 characters</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 bg-surface rounded-lg border border-divider text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 bg-surface rounded-lg border border-divider text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !token}
              className={`w-full py-2.5 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm ${
                isSubmitting || !token ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.99]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Updating password...</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>

            <div className="text-center pt-2">
              <Link to="/login" className="text-xs text-primary hover:underline font-medium">
                Remember your password? Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
