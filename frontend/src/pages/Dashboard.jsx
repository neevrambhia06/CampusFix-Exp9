import React from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHero from '../components/dashboard/WelcomeHero';
import StatCard from '../components/dashboard/StatCard';
import MaintenanceHealth from '../components/dashboard/MaintenanceHealth';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import AnnouncementCard from '../components/dashboard/AnnouncementCard';
import IssueCard from '../components/issues/IssueCard';
import { useCampusFix } from '../context/CampusFixContext';

import { mockAnnouncements, mockActivities } from '../data/mockData';
import { AlertTriangle, Clock, CheckCircle2, ListFilter, ArrowRight } from 'lucide-react';

export function Dashboard(props) {
  const context = useCampusFix();
  const navigate = useNavigate();

  const user = props.user || context.currentUser;
  const issues = props.issues || context.issues;
  const stats = context.stats;

  const total = stats ? stats.totalIssues : issues.length;
  const reported = stats ? stats.reportedIssues : issues.filter(i => i.status === 'Reported').length;
  const inProgress = stats ? stats.inProgressIssues : issues.filter(i => i.status === 'In Progress').length;
  const resolved = stats ? stats.resolvedIssues : issues.filter(i => i.status === 'Resolved').length;
  const highPriority = stats ? stats.highPriorityIssues : issues.filter(i => i.priority === 'High').length;

  const recentIssues = issues.slice(0, 3);
  const featuredAnnouncement = mockAnnouncements[0];

  return (
    <div className="dashboard-page space-y">
      <WelcomeHero user={user} />

      <div className="stats-grid">
        <StatCard 
          title="Total Issues" 
          value={total} 
          trend="Total logged campus tickets" 
          icon={ListFilter} 
          color="blue" 
        />
        <StatCard 
          title="Reported" 
          value={reported} 
          trend="Awaiting technician assignment" 
          icon={Clock} 
          color="amber" 
        />
        <StatCard 
          title="In Progress" 
          value={inProgress} 
          trend="Under active maintenance" 
          icon={Clock} 
          color="amber" 
        />
        <StatCard 
          title="Resolved" 
          value={resolved} 
          trend="Closed and verified" 
          icon={CheckCircle2} 
          color="emerald" 
        />
        <StatCard 
          title="High Priority" 
          value={highPriority} 
          trend="Requires urgent attention" 
          icon={AlertTriangle} 
          color="rose" 
        />
      </div>

      <div className="dashboard-layout-grid">
        <div className="dashboard-left-col space-y">
          <div className="dashboard-section-header">
            <div>
              <h2 className="section-title">Recent Campus Issues</h2>
              <p className="section-subtitle">Latest maintenance tickets reported across campus buildings</p>
            </div>
            <button 
              onClick={() => navigate('/issues')}
              className="btn-link-action"
            >
              <span>View all issues ({total})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="issue-grid-saas">
            {recentIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onStatusChange={props.onStatusChange}
                onDelete={props.onDelete}
              />
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Featured Maintenance Notice</h2>
            <AnnouncementCard announcement={featuredAnnouncement} />
          </div>
        </div>

        <div className="dashboard-right-col space-y">
          <MaintenanceHealth percentage={82} status="Healthy" />
          <ActivityTimeline activities={mockActivities} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

