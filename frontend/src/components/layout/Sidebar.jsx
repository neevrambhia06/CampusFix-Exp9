import React from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListFilter, 
  PlusCircle, 
  FileText, 
  Bell, 
  HelpCircle, 
  BarChart3, 
  Wrench,
  ShieldCheck,
  LogOut,
  LogIn,
  UserCheck
} from 'lucide-react';

export function Sidebar(props) {
  const { user, isAdmin, onLogout } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const mainNavItems = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/issues', label: 'Issues', icon: ListFilter },
    { path: '/report', label: 'Report Issue', icon: PlusCircle },
    { path: '/my-reports', label: 'My Reports', icon: FileText },
    { path: '/announcements', label: 'Announcements', icon: Bell },
    { path: '/help', label: 'Help & Support', icon: HelpCircle },
  ];

  const managementNavItems = [
    { path: '/analytics', label: 'Issue Analytics', icon: BarChart3 },
    { path: '/maintenance-team', label: 'Maintenance Team', icon: Wrench },
  ];

  return (
    <aside className="app-sidebar">
      {/* Brand Logo Header */}
      <Link to="/" className="sidebar-brand" style={{ textDecoration: 'none', color: 'inherit' }} title="Return to Fixora Landing Page">
        <div className="brand-logo-icon">
          <ShieldCheck size={20} className="brand-icon-svg" />
        </div>
        <div className="brand-text">
          <div className="brand-name">
            Fixora <span className="brand-badge">{isAdmin ? 'ADMIN' : 'PRO'}</span>
          </div>
          <p className="brand-tagline">Report it. Track it. Fix it.</p>
        </div>
      </Link>

      {/* Main Navigation List */}
      <nav className="sidebar-nav">
        {/* Admin Special Highlight Link */}
        {isAdmin && (
          <div style={{ marginBottom: '1.25rem' }}>
            <div className="nav-section-label" style={{ color: 'var(--primary)', fontWeight: 700 }}>
              ADMINISTRATION
            </div>
            <ul className="nav-list">
              <li>
                <NavLink
                  to="/admin"
                  className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                  style={{
                    backgroundColor: location.pathname === '/admin' ? 'var(--primary)' : 'var(--primary-light)',
                    color: location.pathname === '/admin' ? '#fff' : 'var(--primary)',
                    fontWeight: 600,
                  }}
                >
                  <ShieldCheck size={18} className="nav-icon" />
                  <span>Admin Dashboard</span>
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <div className="nav-section-label">MENU</div>
        <ul className="nav-list">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path === '/issues' && location.pathname.startsWith('/issues/'));

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} className="nav-icon" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Management Section */}
        <div className="nav-section-label" style={{ marginTop: '1.5rem' }}>MANAGEMENT</div>
        <ul className="nav-list">
          {managementNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} className="nav-icon" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}

          {/* Campus Portal Gateway / Login */}
          <li>
            <NavLink
              to={isAdmin ? '/admin' : '/login'}
              className={`nav-link ${location.pathname === '/login' || location.pathname === '/admin' ? 'active' : ''}`}
              style={{
                marginTop: '0.25rem',
                border: '1px dashed var(--border-light)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck size={18} className="nav-icon" style={{ color: 'var(--primary)' }} />
                  <span>Admin Control</span>
                </>
              ) : user ? (
                <>
                  <UserCheck size={18} className="nav-icon" style={{ color: 'var(--primary)' }} />
                  <span>My Account</span>
                </>
              ) : (
                <>
                  <LogIn size={18} className="nav-icon" style={{ color: 'var(--primary)' }} />
                  <span>Sign In</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer User Profile */}
      {user ? (
        <div className="sidebar-user-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div className="user-avatar-circle" style={{ backgroundColor: isAdmin ? 'var(--primary)' : undefined, color: isAdmin ? '#fff' : undefined }}>
              {user.avatar && user.avatar.length <= 2 ? user.avatar : (user.name ? user.name.charAt(0).toUpperCase() : 'U')}
            </div>
            <div className="user-details" style={{ minWidth: 0 }}>
              <div className="user-display-name" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={user.name}>
                {user.name}
              </div>
              <div className="user-display-role" style={{ color: isAdmin ? 'var(--primary)' : undefined, fontWeight: isAdmin ? 600 : undefined }}>
                {user.role}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (onLogout) onLogout();
              navigate('/dashboard');
            }}
            title="Sign out"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#DC2626'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <div className="sidebar-user-footer" style={{ padding: '0.75rem 1rem' }}>
          <Link
            to="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '0.55rem 0.75rem',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: '8px',
              fontSize: '0.825rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'opacity 0.15s ease'
            }}
          >
            <LogIn size={15} />
            <span>Sign In to Fixora</span>
          </Link>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
