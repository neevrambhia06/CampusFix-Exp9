import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListFilter, 
  PlusCircle, 
  FileText, 
  Bell, 
  HelpCircle, 
  BarChart3, 
  Wrench,
  ShieldCheck
} from 'lucide-react';

export function Sidebar(props) {
  const { user } = props;
  const location = useLocation();

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
      <div className="sidebar-brand">
        <div className="brand-logo-icon">
          <ShieldCheck size={20} className="brand-icon-svg" />
        </div>
        <div className="brand-text">
          <div className="brand-name">
            CampusFix <span className="brand-badge">PRO</span>
          </div>
          <p className="brand-tagline">Report it. Track it. Fix it.</p>
        </div>
      </div>

      {/* Main Navigation List */}
      <nav className="sidebar-nav">
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
        </ul>
      </nav>

      {/* Sidebar Footer User Profile */}
      <div className="sidebar-user-footer">
        <div className="user-avatar-circle">
          {user ? user.avatar || user.name.charAt(0) : 'A'}
        </div>
        <div className="user-details">
          <div className="user-display-name">{user ? user.name : 'Aarav Shah'}</div>
          <div className="user-display-role">{user ? user.role : 'Student'}</div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
