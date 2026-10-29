import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BellRing, ArrowRight, ShieldAlert, ExternalLink } from 'lucide-react';
import { useCampusFix } from '../../context/CampusFixContext';

export function AnnouncementCard(props) {
  const { announcement } = props;
  const navigate = useNavigate();
  const { openAlertModal } = useCampusFix();

  if (!announcement) return null;

  return (
    <div 
      className="featured-announcement-card"
      style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
      onClick={() => openAlertModal(announcement)}
      title="Click to view full campus advisory details & safety checklist"
    >
      <div className="announcement-card-header">
        <div className="announcement-icon-badge">
          <BellRing size={16} />
        </div>
        <span className="announcement-category-pill">{announcement.category}</span>
        <span className="announcement-badge-important">{announcement.badge || announcement.severity}</span>
      </div>

      <h3 className="announcement-card-title">{announcement.title}</h3>
      <p className="announcement-card-date">{announcement.date}</p>
      <p className="announcement-card-desc">{announcement.description}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openAlertModal(announcement);
          }}
          className="btn btn-secondary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.775rem' }}
        >
          <ShieldAlert size={14} style={{ color: '#004643' }} />
          <span>View Advisory & Safety Checklist</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate('/announcements');
          }}
          className="announcement-card-link"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <span>All notices</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

export default AnnouncementCard;
