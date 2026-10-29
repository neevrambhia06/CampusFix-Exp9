import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Bell, CheckCircle2, AlertCircle, Info, ShieldCheck, Lock, LogOut, LogIn, User } from 'lucide-react';
import { useCampusFix } from '../../context/CampusFixContext';

export function TopBar(props) {
  const { user, isAdmin, onLogout, searchTerm, onSearchChange } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const { openAlertModal } = useCampusFix();

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
      title: "Work Order Assigned to Technician",
      severity: "Notice",
      category: "Plumbing & HVAC",
      text: "Your AC leakage report #1 was assigned to Technician Ramesh Nair.",
      description: "Technician Ramesh Nair has been dispatched to Academic Block B · 3rd Floor to inspect the AC unit condensation line and isolate circuit breakers.",
      time: "10m ago",
      date: "Today · 10 mins ago",
      sender: "Dr. Ananya Sen · Dean of Infrastructure & Campus Operations",
      impactedLocations: [
        "Academic Block B · 3rd Floor Lab 302",
        "East Wing HVAC Distribution Trench"
      ],
      safetyChecklist: [
        "Area cordoned off with high-visibility caution cones",
        "Breaker sub-panel isolated to prevent electrical hazards",
        "Drainage catchment trays positioned beneath pipeline"
      ],
      icon: CheckCircle2,
      color: "#059669"
    },
    {
      id: 2,
      title: "Scheduled Power & Infrastructure Outage",
      severity: "Important",
      category: "Electrical",
      text: "Power outage planned for Block B on Friday 10 AM.",
      description: "Routine transformer testing, breaker upgrades, and thermal imaging inspections across Engineering Block B and Central Auditorium. Scheduled outage from 10:00 AM to 1:00 PM.",
      time: "2h ago",
      date: "Friday · 10:00 AM – 1:00 PM",
      sender: "Dr. Ananya Sen · Dean of Infrastructure & Campus Operations",
      impactedLocations: [
        "Engineering Block B (Floors 1 - 4)",
        "Central Auditorium Main Hall & Stage Dimmer Racks",
        "North Substation Transformer Yard"
      ],
      safetyChecklist: [
        "Verify backup battery on critical lab servers",
        "Avoid elevator usage 10 minutes prior to scheduled power toggle window",
        "Shut down sensitive oscilloscopes and spectrometers before 9:50 AM",
        "Report any sparks, unusual buzzing, or emergency trips to Security Dispatch"
      ],
      icon: AlertCircle,
      color: "#D97706"
    },
    {
      id: 3,
      title: "Work Order Resolved & Verified",
      severity: "Notice",
      category: "Facilities",
      text: "Gym Cable Cross Machine issue #6 was marked resolved.",
      description: "Right pulley rubber handle was replaced with an industrial-grade ergonomic grip. Verified with 120kg tension pull test by Estate General Crew.",
      time: "Yesterday",
      date: "Yesterday · 4:30 PM",
      sender: "Estate General Crew · Operations Lead",
      impactedLocations: [
        "Sports Complex · Fitness Center Ground Floor"
      ],
      safetyChecklist: [
        "High-tensile steel cable checked for fatigue micro-cracks",
        "Locking carabiner replaced with industrial safety clip",
        "Machine certified for student and staff athletic training"
      ],
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
                    <div 
                      key={n.id} 
                      className="notification-item"
                      onClick={() => {
                        openAlertModal(n);
                        setShowNotifications(false);
                      }}
                      style={{ cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      title="Click to view full advisory details"
                    >
                      <Icon size={16} style={{ color: n.color, flexShrink: 0, marginTop: '2px' }} />
                      <div className="notification-content">
                        <div className="notification-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                          <span>{n.title}</span>
                          <span style={{ fontSize: '0.65rem', color: n.color, fontWeight: 700, textTransform: 'uppercase' }}>{n.severity}</span>
                        </div>
                        <div className="notification-text">{n.text}</div>
                        <div className="notification-time">{n.time} · Click for safety checklist</div>
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
