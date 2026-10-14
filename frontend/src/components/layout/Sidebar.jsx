import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  Lock,
  LogOut,
  Globe
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
    { path: '/', label: 'Home Landing', icon: Globe },
    { path: '/analytics', label: 'Issue Analytics', icon: BarChart3 },
    { path: '/maintenance-team', label: 'Maintenance Team', icon: Wrench },
  ];

  return (
    <aside className="app-sidebar">
      {/* Brand Logo Header */}
      <div 
        className="sidebar-brand" 
        onClick={() => navigate('/')} 
        style={{ cursor: 'pointer' }}
        title="Go to Home Landing Page"
      >
        <div className="brand-logo-icon">
          <ShieldCheck size={20} className="brand-icon-svg" />
        </div>
        <div className="brand-text">
          <div className="brand-name">
            Fixora <span className="brand-badge">{isAdmin ? 'ADMIN' : 'PRO'}</span>
          </div>
          <p className="brand-tagline">Report it. Track it. Fix it.</p>
        </div>
      </div>

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
              ) : (
                <>
                  <Lock size={18} className="nav-icon" style={{ color: 'var(--accent-amber)' }} />
                  <span>Portal Login</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer User Profile */}
      <div className="sidebar-user-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <div className="user-avatar-circle" style={{ backgroundColor: isAdmin ? 'var(--primary)' : undefined, color: isAdmin ? '#fff' : undefined }}>
            {user ? (user.avatar || user.name.charAt(0)) : 'A'}
          </div>
          <div className="user-details" style={{ minWidth: 0 }}>
            <div className="user-display-name" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {user ? user.name : 'Aarav Shah'}
            </div>
            <div className="user-display-role" style={{ color: isAdmin ? 'var(--primary)' : undefined, fontWeight: isAdmin ? 600 : undefined }}>
              {user ? user.role : 'Student'}
            </div>
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              if (onLogout) onLogout();
              navigate('/dashboard');
            }}
            title="Log out of Admin"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
