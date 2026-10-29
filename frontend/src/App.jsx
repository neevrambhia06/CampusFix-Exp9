import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import AppShell from './components/layout/AppShell';
import { CampusFixProvider, useCampusFix } from './context/CampusFixContext';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Fixora Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '480px', width: '100%', background: '#FFFFFF', border: '1px solid #FECDD3', borderRadius: '16px', padding: '2rem', boxShadow: '0 8px 24px rgba(15,23,42,0.06)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FFF1F2', color: '#E11D48', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1.4rem' }}>
              ⚠️
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Something went wrong loading this ticket
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {this.state.error?.message || 'An unexpected rendering error occurred while displaying this view.'}
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn btn-secondary btn-sm"
              >
                Reload View
              </button>
              <a
                href="/issues"
                className="btn btn-primary btn-sm"
                style={{ textDecoration: 'none' }}
              >
                Back to All Issues
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Issues from './pages/Issues';
import IssueDetails from './pages/IssueDetails';
import ReportIssue from './pages/ReportIssue';
import MyReports from './pages/MyReports';
import Announcements from './pages/Announcements';
import Help from './pages/Help';
import Analytics from './pages/Analytics';
import MaintenanceTeam from './pages/MaintenanceTeam';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import './index.css';

function AppLayout() {
  const location = useLocation();
  const { 
    searchTerm, 
    setSearchTerm 
  } = useCampusFix();

  // Route '/' renders the standalone SaaS Landing Page (clean, full-width, no sidebar/topbar shell)
  if (location.pathname === '/') {
    return <LandingPage />;
  }

  // All application portal pages render inside the AppShell
  return (
    <AppShell
      searchTerm={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
    >
      <Routes>
        {/* Page 1: Dashboard Overview */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Page 2: Issues Management */}
        <Route path="/issues" element={<Issues />} />

        {/* Page 2 Detail: Issue Details */}
        <Route path="/issues/:id" element={<IssueDetails />} />

        {/* Page 3: Report Issue */}
        <Route path="/report" element={<ReportIssue />} />

        {/* Page 4: My Reports */}
        <Route path="/my-reports" element={<MyReports />} />

        {/* Page 5: Announcements */}
        <Route path="/announcements" element={<Announcements />} />

        {/* Page 6: Help & Support */}
        <Route path="/help" element={<Help />} />

        {/* Page 7: Analytics */}
        <Route path="/analytics" element={<Analytics />} />

        {/* Maintenance Team Roster */}
        <Route path="/maintenance-team" element={<MaintenanceTeam />} />

        {/* Authentication & Admin Routes */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Fallback Redirection */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

export function App() {
  return (
    <CampusFixProvider>
      <Router>
        <ErrorBoundary>
          <AppLayout />
        </ErrorBoundary>
      </Router>
    </CampusFixProvider>
  );
}

export default App;
