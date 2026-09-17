import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAuthor = false }) {
  const { user, isLoggedIn, isAuthor } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // If not logged in, redirect to login or verification depending on requirement
    if (requireAuthor) {
      return <Navigate to="/verification?reason=author_required" state={{ from: location }} replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAuthor && !isAuthor) {
    // User is logged in, but not an author
    return <Navigate to="/verification?reason=author_required" state={{ from: location }} replace />;
  }

  return children;
}
