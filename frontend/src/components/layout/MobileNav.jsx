import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListFilter, PlusCircle, FileText, Bell } from 'lucide-react';

export function MobileNav() {
  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/issues', label: 'Issues', icon: ListFilter },
    { path: '/report', label: 'Report', icon: PlusCircle },
    { path: '/my-reports', label: 'My Tickets', icon: FileText },
    { path: '/announcements', label: 'Notices', icon: Bell },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default MobileNav;
