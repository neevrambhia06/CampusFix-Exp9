import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';
import { user } from '../../data/mockData';

export function AppShell(props) {
  const { 
    children, 
    dataSource, 
    onToggleDataSource, 
    searchTerm, 
    onSearchChange 
  } = props;

  return (
    <div className="app-shell">
      {/* Desktop Fixed Left Sidebar */}
      <Sidebar user={user} />

      {/* Main Content Area */}
      <div className="app-main-wrapper">
        {/* Sticky Top Header Bar */}
        <TopBar 
          user={user} 
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
              <strong>CampusFix</strong> — Smart Campus Issue Reporting & Maintenance System
            </div>
            <div className="footer-right">
              Logged in as <strong>{user.name}</strong> ({user.role}) · WMD Mini Project 2026
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
