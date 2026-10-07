import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Bell, CheckCircle2, AlertCircle, Info, User } from 'lucide-react';

export function TopBar(props) {
  const { user, dataSource, onToggleDataSource, searchTerm, onSearchChange } = props;
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Generate breadcrumb titles
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'Overview Dashboard';
    if (path === '/issues') return 'Campus Maintenance Issues';
    if (path.startsWith('/issues/')) return `Issue Detail #${path.split('/')[2]}`;
    if (path === '/report') return 'Report New Campus Issue';
    if (path === '/my-reports') return 'My Reported Tickets';
    if (path === '/announcements') return 'Campus Maintenance Announcements';
    if (path === '/help') return 'Help & Support Desk';
    if (path === '/analytics') return 'Issue Distribution Analytics';
    if (path === '/maintenance-team') return 'Maintenance Personnel Roster';
    return 'CampusFix Workspace';
  };

  const notifications = [
    {
      id: 1,
      title: "Issue Assigned",
      text: "Your AC leakage report #1 was assigned to Technician Rajesh.",
      time: "10m ago",
      icon: CheckCircle2,
      color: "#059669"
    },
    {
      id: 2,
      title: "Maintenance Scheduled",
      text: "Power outage planned for Block B on Friday 10 AM.",
      time: "2h ago",
      icon: AlertCircle,
      color: "#D97706"
    },
    {
      id: 3,
      title: "Ticket Resolved",
      text: "Gym Cable Cross Machine issue #6 was marked resolved.",
      time: "Yesterday",
      icon: Info,
      color: "#2563EB"
    }
  ];

  return (
    <header className="topbar-shell">
      <div className="topbar-left">
        <div className="breadcrumb-path">
          <span className="breadcrumb-root">CampusFix</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{getBreadcrumb()}</span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Search input in topbar */}
        <div className="topbar-search">
          <Search size={16} className="search-icon-svg" />
          <input
            type="text"
            placeholder="Quick search issues or keywords..."
            value={searchTerm || ''}
            onChange={onSearchChange}
            className="topbar-search-input"
          />
        </div>

        {/* Data Source Mode Switcher */}
        <button
          onClick={onToggleDataSource}
          className={`datasource-badge ${dataSource === 'api' ? 'api-mode' : 'mock-mode'}`}
          title="Click to toggle between JSON Server REST API and static mockData.js"
        >
          <span className="dot"></span>
          <span>{dataSource === 'api' ? 'JSON Server API' : 'Mock Data'}</span>
        </button>

        {/* Notification Bell Icon & Dropdown */}
        <div className="topbar-dropdown-wrapper">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="topbar-icon-button"
            aria-label="View notifications"
          >
            <Bell size={18} />
            <span className="notification-ping"></span>
          </button>

          {showNotifications && (
            <div className="topbar-dropdown-menu notifications-menu">
              <div className="dropdown-header">
                <span className="dropdown-title">Notifications</span>
                <span className="dropdown-badge">3 New</span>
              </div>
              <div className="notifications-list">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className="notification-item">
                      <Icon size={16} style={{ color: n.color, flexShrink: 0, marginTop: '2px' }} />
                      <div className="notification-content">
                        <div className="notification-title">{n.title}</div>
                        <div className="notification-text">{n.text}</div>
                        <div className="notification-time">{n.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Dropdown */}
        <div className="topbar-dropdown-wrapper">
          <div
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="topbar-user-pill"
          >
            <div className="user-avatar-small">
              {user ? user.avatar || user.name.charAt(0) : 'A'}
            </div>
            <div className="user-pill-info">
              <span className="pill-name">{user ? user.name : 'Aarav Shah'}</span>
              <span className="pill-role">{user ? user.role : 'Student'}</span>
            </div>
          </div>

          {showProfileMenu && (
            <div className="topbar-dropdown-menu profile-menu">
              <div className="dropdown-header">
                <div className="user-display-name">{user ? user.name : 'Aarav Shah'}</div>
                <div className="user-display-role">{user ? user.email || 'aarav.shah@campus.edu' : ''}</div>
              </div>
              <ul className="profile-menu-links">
                <li><Link to="/my-reports" onClick={() => setShowProfileMenu(false)}>My Reports & Tickets</Link></li>
                <li><Link to="/report" onClick={() => setShowProfileMenu(false)}>Report New Issue</Link></li>
                <li><Link to="/help" onClick={() => setShowProfileMenu(false)}>Help & Support</Link></li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default TopBar;
