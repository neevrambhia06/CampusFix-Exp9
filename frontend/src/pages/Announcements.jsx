import React from 'react';
import { PageHeader } from '../components/common/CommonComponents';
import AnnouncementCard from '../components/dashboard/AnnouncementCard';
import { mockAnnouncements } from '../data/mockData';

export function Announcements() {
  const featured = mockAnnouncements[0];
  const remaining = mockAnnouncements.slice(1);

  return (
    <div className="announcements-page space-y">
      <PageHeader
        title="Campus Maintenance Announcements"
        subtitle="Official notices, scheduled power outages, water shutdowns, and infrastructure upgrades."
      />

      {/* Featured Announcement Header */}
      <div className="space-y">
        <h2 className="section-title">Featured Campus Notice</h2>
        <AnnouncementCard announcement={featured} />
      </div>

      {/* List of remaining notices */}
      <div style={{ marginTop: '2rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>All Campus Notices</h2>
        <div className="announcements-grid">
          {mockAnnouncements.map((ann) => (
            <div key={ann.id} className="announcement-item-card">
              <div className="item-top">
                <span className="row-category-pill">{ann.category}</span>
                <span className="badge badge-priority-medium">{ann.badge}</span>
              </div>
              <h3 className="item-title">{ann.title}</h3>
              <p className="item-date">{ann.date}</p>
              <p className="item-desc">{ann.description}</p>
              <div className="item-footer">
                <span>Issued by: <strong>{ann.author}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Announcements;
