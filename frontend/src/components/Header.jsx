import React from 'react';
import { useCampusFix } from '../context/CampusFixContext';

export function Header(props) {
  const { currentUser } = useCampusFix();
  const user = props.user || currentUser;

  return (
    <header className="campusfix-header">
      <div className="header-container">
        <div className="brand-section">
          <div className="logo-badge">CF</div>
          <div>
            <h1 className="brand-title">CampusFix</h1>
            <p className="brand-subtitle">Smart Campus Maintenance</p>
          </div>
        </div>

        <div className="user-profile">
          <div className="user-avatar">
            {user ? user.name.charAt(0) : 'A'}
          </div>
          <div className="user-info">
            <span className="user-name">{user ? user.name : 'Aarav Shah'}</span>
            <span className="user-role">{user ? user.role : 'Student'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

