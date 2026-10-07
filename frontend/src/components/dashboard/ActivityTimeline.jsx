import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

export function ActivityTimeline(props) {
  const { activities } = props;

  return (
    <div className="activity-timeline-card">
      <div className="activity-header">
        <h3 className="activity-title">Recent Activity</h3>
        <span className="activity-badge font-mono">Live Stream</span>
      </div>

      <div className="timeline-list">
        {activities && activities.map((act) => (
          <div key={act.id} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-title-row">
                <span className="timeline-item-title">{act.title}</span>
                <span className="timeline-time">{act.time}</span>
              </div>
              <p className="timeline-user">By {act.user}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;
