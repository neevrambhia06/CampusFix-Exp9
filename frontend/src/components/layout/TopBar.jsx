import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Check, 
  CheckCheck, 
  X, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export function TopBar(props) {
  const { user, isAdmin, onLogout, dataSource, onToggleDataSource, searchTerm, onSearchChange } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifFilter, setNotifFilter] = useState('all'); // 'all' | 'unread'

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reactive notifications list
  const [notifications, setNotifications] = useState(() => [
    {
      id: 1,
      title: "Technician Dispatched",
      text: "AC leakage ticket #01 in Block B has been assigned to technician Rajesh.",
      time: "10m ago",
      icon: CheckCircle2,
      color: "#059669",
      bg: "#ECFDF5",
      read: false,
      link: "/issues/1"
    },
    {
      id: 2,
      title: "Campus Facility Alert",
      text: "Scheduled power maintenance in Academic Block B on Friday at 10:00 AM.",
      time: "2h ago",
      icon: AlertCircle,
      color: "#D97706",
      bg: "#FEF3C7",
      read: false,
      link: "/announcements"
    },
    {
      id: 3,
      title: "Ticket Verified & Closed",
      text: "Gym Cable Cross Machine issue #06 has been verified and marked Resolved.",
      time: "Yesterday",
      icon: Info,
      color: "#2563EB",
      bg: "#EFF6FF",
      read: true,
      link: "/issues/6"
    }
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setShowNotifications(false);
    if (notif.link) navigate(notif.link);
  };

  const dismissNotification = (e, id) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (notifFilter === 'unread') return !n.read;
    return true;
  });

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
    if (path === '/login') return 'Campus Portal Gateway';
    return 'Fixora Workspace';
  };

  return (
    <header className="topbar-shell">
      <div className="topbar-left">
        <div className="breadcrumb-path">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} className="breadcrumb-root">
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

        {/* Data Source Mode Switcher */}
        <button
          onClick={onToggleDataSource}
          className={`datasource-badge ${dataSource === 'api' ? 'api-mode' : 'mock-mode'}`}
          title="Click to toggle between Spring Boot REST API and static mockData.js"
        >
          <span className="dot"></span>
          <span>{dataSource === 'api' ? 'Spring Boot API' : 'Mock Data'}</span>
        </button>

        {/* Fixed Interactive Notification Bell & Dropdown */}
        <div className="topbar-dropdown-wrapper" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="topbar-icon-button"
            aria-label="View notifications"
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-ping"></span>}
          </button>

          {showNotifications && (
            <div 
              className="topbar-dropdown-menu notifications-menu"
              style={{
                width: '360px',
                right: 0,
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                animation: 'fadeIn 0.15s ease-out'
              }}
            >
              {/* Dropdown Header */}
              <div 
                style={{ 
                  padding: '12px 16px', 
                  borderBottom: '1px solid #F1F5F9', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span 
                      style={{ 
                        fontSize: '0.675rem', 
                        fontWeight: 700, 
                        padding: '1px 7px', 
                        borderRadius: '9999px', 
                        backgroundColor: '#FFF1F2', 
                        color: '#BE123C',
                        border: '1px solid #FECDD3'
                      }}
                    >
                      {unreadCount} New
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#004643',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: 0
                    }}
                    title="Mark all notifications as read"
                  >
                    <CheckCheck size={14} />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC', padding: '4px' }}>
                <button
                  type="button"
                  onClick={() => setNotifFilter('all')}
                  style={{
                    flex: 1,
                    padding: '5px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: notifFilter === 'all' ? 700 : 500,
                    backgroundColor: notifFilter === 'all' ? '#FFFFFF' : 'transparent',
                    color: notifFilter === 'all' ? '#0F172A' : '#64748B',
                    boxShadow: notifFilter === 'all' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  All ({notifications.length})
                </button>
                <button
                  type="button"
                  onClick={() => setNotifFilter('unread')}
                  style={{
                    flex: 1,
                    padding: '5px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: notifFilter === 'unread' ? 700 : 500,
                    backgroundColor: notifFilter === 'unread' ? '#FFFFFF' : 'transparent',
                    color: notifFilter === 'unread' ? '#0F172A' : '#64748B',
                    boxShadow: notifFilter === 'unread' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  Unread ({unreadCount})
                </button>
              </div>

              {/* Notifications List */}
              <div className="notifications-list" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {filteredNotifications.length === 0 ? (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#64748B' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                      <Check size={18} />
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>
                      All caught up!
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
                      No {notifFilter === 'unread' ? 'unread ' : ''}notifications at this time.
                    </div>
                  </div>
                ) : (
                  filteredNotifications.map((n) => {
                    const Icon = n.icon;
                    return (
                      <div 
                        key={n.id} 
                        onClick={() => handleNotificationClick(n)}
                        style={{
                          padding: '12px 14px',
                          borderBottom: '1px solid #F1F5F9',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          backgroundColor: n.read ? '#FFFFFF' : '#F0FDF9',
                          cursor: 'pointer',
                          transition: 'background-color 0.12s ease',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = n.read ? '#F8FAFC' : '#E6F9F3';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = n.read ? '#FFFFFF' : '#F0FDF9';
                        }}
                      >
                        <div 
                          style={{ 
                            width: '32px', 
                            height: '32px', 
                            borderRadius: '8px', 
                            backgroundColor: n.bg || '#F1F5F9', 
                            color: n.color, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            flexShrink: 0 
                          }}
                        >
                          <Icon size={16} />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: n.read ? 600 : 700, color: '#0F172A' }}>
                              {n.title}
                            </div>
                            <span style={{ fontSize: '0.675rem', color: '#94A3B8' }}>{n.time}</span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px', lineHeight: 1.4 }}>
                            {n.text}
                          </div>
                        </div>

                        {/* Individual Dismiss Button */}
                        <button
                          type="button"
                          onClick={(e) => dismissNotification(e, n.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#CBD5E1',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#CBD5E1'}
                          title="Dismiss notification"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Dropdown Footer */}
              <div 
                style={{ 
                  padding: '8px 14px', 
                  backgroundColor: '#F8FAFC', 
                  borderTop: '1px solid #F1F5F9', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  fontSize: '0.725rem' 
                }}
              >
                <Link 
                  to="/announcements" 
                  onClick={() => setShowNotifications(false)}
                  style={{ color: '#004643', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}
                >
                  <span>View All Campus Notices</span>
                  <ArrowRight size={11} />
                </Link>

                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setNotifications([])}
                    style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                  >
                    Clear all
                  </button>
                )}
              </div>

            </div>
          )}
        </div>

        {/* User Avatar & Dropdown */}
        <div className="topbar-dropdown-wrapper" ref={profileRef}>
          <div
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="topbar-user-pill"
            style={{
              borderColor: isAdmin ? 'var(--primary)' : undefined,
              backgroundColor: isAdmin ? 'var(--primary-light)' : undefined
            }}
          >
            <div className="user-avatar-small" style={{ backgroundColor: isAdmin ? 'var(--primary)' : undefined, color: isAdmin ? '#fff' : undefined }}>
              {user ? user.avatar || user.name.charAt(0) : 'A'}
            </div>
            <div className="user-pill-info">
              <span className="pill-name">{user ? user.name : 'Aarav Shah'}</span>
              <span className="pill-role" style={{ color: isAdmin ? 'var(--primary)' : undefined, fontWeight: isAdmin ? 700 : undefined }}>
                {user ? user.role : 'Student'}
              </span>
            </div>
          </div>

          {showProfileMenu && (
            <div className="topbar-dropdown-menu profile-menu">
              <div className="dropdown-header">
                <div className="user-display-name">{user ? user.name : 'Aarav Shah'}</div>
                <div className="user-display-role">{user ? user.email || 'aarav.shah@campus.edu' : ''}</div>
              </div>
              <ul className="profile-menu-links">
                {isAdmin ? (
                  <>
                    <li>
                      <Link to="/admin" onClick={() => setShowProfileMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 600 }}>
                        <ShieldCheck size={16} />
                        <span>Admin Dashboard</span>
                      </Link>
                    </li>
                    <li><Link to="/issues" onClick={() => setShowProfileMenu(false)}>View All Issues</Link></li>
                    <li><Link to="/analytics" onClick={() => setShowProfileMenu(false)}>System Analytics</Link></li>
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
                          fontSize: '0.85rem'
                        }}
                      >
                        <LogOut size={16} />
                        <span>Log Out of Admin</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li><Link to="/my-reports" onClick={() => setShowProfileMenu(false)}>My Reports & Tickets</Link></li>
                    <li><Link to="/report" onClick={() => setShowProfileMenu(false)}>Report New Issue</Link></li>
                    <li><Link to="/help" onClick={() => setShowProfileMenu(false)}>Help & Support</Link></li>
                    <li style={{ borderTop: '1px solid var(--border-light)', marginTop: '4px', paddingTop: '4px' }}>
                      <Link 
                        to="/login" 
                        onClick={() => setShowProfileMenu(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 600 }}
                      >
                        <Lock size={16} />
                        <span>Portal Login / Switch Role</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default TopBar;
