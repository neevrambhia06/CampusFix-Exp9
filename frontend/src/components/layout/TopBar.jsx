import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Bell, CheckCircle2, AlertCircle, Info, ShieldCheck, Lock, LogOut, LogIn, User } from 'lucide-react';

export function TopBar(props) {
  const { user, isAdmin, onLogout, searchTerm, onSearchChange } = props;
  const location = useLocation();
  const navigate = useNavigate();

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
    if (path === '/admin') return 'Administrator Control Center';
    if (path === '/login') return 'Campus Portal';
    return 'Fixora Workspace';
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
          <Link to="/" className="breadcrumb-root" style={{ textDecoration: 'none', color: 'inherit' }} title="Visit Fixora Home">
            Fixora
          </Link>
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

        {/* User Avatar & Dropdown / Guest Sign In */}
        {user ? (
          <div className="topbar-dropdown-wrapper">
            <div
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="topbar-user-pill"
              style={{
                borderColor: isAdmin ? 'var(--primary)' : undefined,
                backgroundColor: isAdmin ? 'var(--primary-light)' : undefined,
                cursor: 'pointer'
              }}
            >
              <div className="user-avatar-small" style={{ backgroundColor: isAdmin ? 'var(--primary)' : undefined, color: isAdmin ? '#fff' : undefined }}>
                {user.avatar && user.avatar.length <= 2 ? user.avatar : (user.name ? user.name.charAt(0).toUpperCase() : 'U')}
              </div>
              <div className="user-pill-info">
                <span className="pill-name">{user.name}</span>
                <span className="pill-role" style={{ color: isAdmin ? 'var(--primary)' : undefined, fontWeight: isAdmin ? 700 : undefined }}>
                  {user.role}
                </span>
              </div>
            </div>

            {showProfileMenu && (
              <div className="topbar-dropdown-menu profile-menu">
                <div className="dropdown-header">
                  <div className="user-display-name">{user.name}</div>
                  <div className="user-display-role">{user.email || user.rollNo || `${user.role} Account`}</div>
                  {user.department && (
                    <div style={{ fontSize: '0.725rem', color: '#64748B', marginTop: '2px' }}>
                      {user.department}
                    </div>
                  )}
                  {user.authProvider === 'google' && (
                    <div style={{ fontSize: '0.675rem', color: '#047857', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                      <span>✓ Google Verified</span>
                    </div>
                  )}
                </div>
                <ul className="profile-menu-links">
                  {isAdmin ? (
                    <>
                      <li>
                        <Link to="/admin" onClick={() => setShowProfileMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 600 }}>
                          <ShieldCheck size={16} />
                          <span>Admin Control Center</span>
                        </Link>
                      </li>
                      <li><Link to="/issues" onClick={() => setShowProfileMenu(false)}>View All Issues</Link></li>
                      <li><Link to="/analytics" onClick={() => setShowProfileMenu(false)}>System Analytics</Link></li>
                    </>
                  ) : (
                    <>
                      <li><Link to="/my-reports" onClick={() => setShowProfileMenu(false)}>My Reports & Tickets</Link></li>
                      <li><Link to="/report" onClick={() => setShowProfileMenu(false)}>Report New Issue</Link></li>
                      <li><Link to="/help" onClick={() => setShowProfileMenu(false)}>Help & Support</Link></li>
                      <li>
                        <Link to="/login" onClick={() => setShowProfileMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 500 }}>
                          <User size={15} />
                          <span>Account Settings & Profile</span>
                        </Link>
                      </li>
                    </>
                  )}
                  <li style={{ borderTop: '1px solid var(--border-light)', marginTop: '4px', paddingTop: '4px' }}>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        if (onLogout) onLogout();
                        navigate('/dashboard');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#DC2626',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '0.5rem 0',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              to="/login"
              className="btn btn-primary"
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '0.825rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '8px'
              }}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </Link>
          </div>
        )}

      </div>
    </header>
  );
}

export default TopBar;
