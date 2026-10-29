import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';
import AlertDetailsModal from '../common/AlertDetailsModal';
import { useCampusFix } from '../../context/CampusFixContext';

export function AppShell(props) {
  const { 
    children, 
    searchTerm, 
    onSearchChange 
  } = props;

  const { currentUser, isAdmin, logout, activeAlert, closeAlertModal } = useCampusFix();

  return (
    <div className="app-shell">
      {/* Desktop Fixed Left Sidebar */}
      <Sidebar user={currentUser} isAdmin={isAdmin} onLogout={logout} />

      {/* Main Content Area */}
      <div className="app-main-wrapper">
        {/* Sticky Top Header Bar */}
        <TopBar 
          user={currentUser} 
          isAdmin={isAdmin}
          onLogout={logout}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />

        {/* Scrollable Page Body */}
        <div className="app-page-content">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-left">
              <strong>Fixora</strong> — Smart Campus Issue Reporting & Maintenance System
            </div>
            <div className="footer-right">
              {currentUser ? (
                <>Active Session: <strong>{currentUser.name}</strong> ({currentUser.role})</>
              ) : (
                <>Guest Session · <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</Link></>
              )}
            </div>
          </div>
        </footer>
      </div>

      {/* Global Interactive Alert & Notifications Modal */}
      {activeAlert && (
        <AlertDetailsModal alert={activeAlert} onClose={closeAlertModal} />
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}

export default AppShell;
