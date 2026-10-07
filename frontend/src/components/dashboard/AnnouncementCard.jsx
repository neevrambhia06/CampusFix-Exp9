import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BellRing, ArrowRight } from 'lucide-react';

export function AnnouncementCard(props) {
  const { announcement } = props;
  const navigate = useNavigate();

  if (!announcement) return null;

  return (
    <div className="featured-announcement-card">
      <div className="announcement-card-header">
        <div className="announcement-icon-badge">
          <BellRing size={16} />
        </div>
        <span className="announcement-category-pill">{announcement.category}</span>
        <span className="announcement-badge-important">{announcement.badge}</span>
      </div>

      <h3 className="announcement-card-title">{announcement.title}</h3>
      <p className="announcement-card-date">{announcement.date}</p>
      <p className="announcement-card-desc">{announcement.description}</p>

      <button
        onClick={() => navigate('/announcements')}
        className="announcement-card-link"
      >
        <span>View all announcements</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

export default AnnouncementCard;
