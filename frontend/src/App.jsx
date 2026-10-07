import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AppShell from './components/layout/AppShell';
import { CampusFixProvider, useCampusFix } from './context/CampusFixContext';

// Pages
import Dashboard from './pages/Dashboard';
import Issues from './pages/Issues';
import IssueDetails from './pages/IssueDetails';
import ReportIssue from './pages/ReportIssue';
import MyReports from './pages/MyReports';
import Announcements from './pages/Announcements';
import Help from './pages/Help';
import Analytics from './pages/Analytics';
import MaintenanceTeam from './pages/MaintenanceTeam';

import './index.css';

function AppContent() {
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

  return (
    <Router>
      <AppShell
        dataSource={dataSource}
        onToggleDataSource={handleToggleDataSource}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      >
        <Routes>
          {/* Default Redirection */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

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

          {/* Optional Roster Route */}
          <Route path="/maintenance-team" element={<MaintenanceTeam />} />

          {/* Fallback 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export function App() {
  return (
    <CampusFixProvider>
      <AppContent />
    </CampusFixProvider>
  );
}

export default App;

