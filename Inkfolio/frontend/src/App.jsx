import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ReadingExperiencePage from './pages/ReadingExperiencePage';
import BlogEditorPage from './pages/BlogEditorPage';
import ReaderProfilePage from './pages/ReaderProfilePage';
import ProfileVerificationPage from './pages/ProfileVerificationPage';
import AuthorDashboardPage from './pages/AuthorDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminPaymentsPage from './pages/AdminPaymentsPage';
import AdminModerationPage from './pages/AdminModerationPage';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/read/:id" element={<ReadingExperiencePage />} />
            <Route path="/editor" element={<BlogEditorPage />} />
            <Route path="/profile" element={<ReaderProfilePage />} />
            <Route path="/verification" element={<ProfileVerificationPage />} />
            <Route path="/author/dashboard" element={<AuthorDashboardPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/payments" element={<AdminPaymentsPage />} />
            <Route path="/admin/moderation" element={<AdminModerationPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
