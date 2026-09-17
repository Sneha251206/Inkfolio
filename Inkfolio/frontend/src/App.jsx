import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import ReadingExperiencePage from './pages/ReadingExperiencePage';
import BlogEditorPage from './pages/BlogEditorPage';
import ReaderProfilePage from './pages/ReaderProfilePage';
import ProfileVerificationPage from './pages/ProfileVerificationPage';
import AuthorDashboardPage from './pages/AuthorDashboardPage';
import AuthPage from './pages/AuthPage';

import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminPaymentsPage from './pages/AdminPaymentsPage';
import AdminModerationPage from './pages/AdminModerationPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-surface text-on-surface">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/read/:id" element={<ReadingExperiencePage />} />
              <Route path="/verification" element={<ProfileVerificationPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />

              {/* Protected Author Routes (Only Authors can access) */}
              <Route 
                path="/author/dashboard" 
                element={
                  <ProtectedRoute requireAuthor={true}>
                    <AuthorDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/editor" 
                element={
                  <ProtectedRoute requireAuthor={true}>
                    <BlogEditorPage />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Profile Route (Logged-in users) */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ReaderProfilePage />
                  </ProtectedRoute>
                } 
              />

              {/* Admin Portal Routes */}
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/payments" element={<AdminPaymentsPage />} />
              <Route path="/admin/moderation" element={<AdminModerationPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
