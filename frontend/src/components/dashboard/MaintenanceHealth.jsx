import React from 'react';

export function MaintenanceHealth(props) {
  const { percentage = 82, status = 'Healthy' } = props;

  // Calculate circle dashoffset
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="maintenance-health-card">
      <h3 className="health-card-title">Campus Maintenance Health</h3>
      
      <div className="health-visual-wrapper">
        <svg className="health-svg" viewBox="0 0 100 100">
          <circle
            className="health-circle-bg"
            cx="50"
            cy="50"
            r={radius}
          />
          <circle
            className="health-circle-progress"
            cx="50"
            cy="50"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="health-inner-text">
          <span className="health-percentage">{percentage}%</span>
          <span className="health-status">{status}</span>
        </div>
      </div>

      <p className="health-description">
        82% of reported infrastructure issues resolved within SLA timeframe this month.
      </p>
    </div>
  );
}

export default MaintenanceHealth;
