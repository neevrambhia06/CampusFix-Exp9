import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import AppShell from './components/layout/AppShell';
import { CampusFixProvider, useCampusFix } from './context/CampusFixContext';

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
    dataSource, 
    setDataSource, 
    loadIssues, 
    searchTerm, 
    setSearchTerm 
  } = useCampusFix();

  const handleToggleDataSource = () => {
    if (dataSource === 'api') {
      setDataSource('mock');
    } else {
      loadIssues();
    }
  };

  // Route '/' renders the standalone SaaS Landing Page (clean, full-width, no sidebar/topbar shell)
  if (location.pathname === '/') {
    return <LandingPage />;
  }

  // All application portal pages render inside the AppShell
  return (
    <AppShell
      dataSource={dataSource}
      onToggleDataSource={handleToggleDataSource}
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
        <AppLayout />
      </Router>
    </CampusFixProvider>
  );
}

export default App;
