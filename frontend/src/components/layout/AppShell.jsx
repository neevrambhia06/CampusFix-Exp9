import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';
import { useCampusFix } from '../../context/CampusFixContext';

export function AppShell(props) {
  const { 
    children, 
    dataSource, 
    onToggleDataSource, 
    searchTerm, 
    onSearchChange 
  } = props;

  const { currentUser, isAdmin, logout } = useCampusFix();
  const activeUser = currentUser || { name: 'Aarav Shah', role: 'Student' };

  return (
    <div className="app-shell">
      {/* Desktop Fixed Left Sidebar */}
      <Sidebar user={activeUser} isAdmin={isAdmin} onLogout={logout} />

      {/* Main Content Area */}
      <div className="app-main-wrapper">
        {/* Sticky Top Header Bar */}
        <TopBar 
          user={activeUser} 
          isAdmin={isAdmin}
          onLogout={logout}
          dataSource={dataSource}
          onToggleDataSource={onToggleDataSource}
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
              Active Session: <strong>{activeUser.name}</strong> ({activeUser.role})
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}

export default AppShell;
