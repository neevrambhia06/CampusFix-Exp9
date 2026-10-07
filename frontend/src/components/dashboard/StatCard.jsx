import React from 'react';

export function StatCard(props) {
  const { title, value, trend, icon: Icon, color = 'blue' } = props;

  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-card-top">
        <span className="stat-card-title">{title}</span>
        {Icon && (
          <div className="stat-card-icon">
            <Icon size={18} />
          </div>
        )}
      </div>
      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        {trend && <span className="stat-card-trend">{trend}</span>}
      </div>
    </div>
  );
}

export default StatCard;
