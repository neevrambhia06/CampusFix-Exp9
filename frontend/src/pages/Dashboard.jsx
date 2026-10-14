import React from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHero from '../components/dashboard/WelcomeHero';
import MaintenanceHealth from '../components/dashboard/MaintenanceHealth';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import AnnouncementCard from '../components/dashboard/AnnouncementCard';
import IssueCard from '../components/issues/IssueCard';
import { useCampusFix } from '../context/CampusFixContext';
import { MagicBento, BentoCard } from '../components/reactbits/MagicBento';

import { mockAnnouncements, mockActivities } from '../data/mockData';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ListFilter, 
  ArrowRight, 
  PlusCircle, 
  Server, 
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';

export function Dashboard(props) {
  const context = useCampusFix();
  const navigate = useNavigate();

  const user = props.user || context.currentUser;
  const issues = props.issues || context.issues;
  const stats = context.stats;
  const dataSource = context.dataSource;
  const loadIssues = context.loadIssues;

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

      {/* REACT BITS: MagicBento Grid for Dashboard */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.01em' }}>
              Campus Overview & Live Telemetry
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '2px 0 0' }}>
              Interactive Magic Bento with reactive cursor edge lighting and click ripples
            </p>
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#E6F2F1', color: '#004643', border: '1px solid #B2D8D5' }}>
            MAGIC BENTO V2
          </span>
        </div>

        <MagicBento>
          {/* Bento Card 1: Issue Metrics Triage */}
          <BentoCard
            title="Campus Maintenance Telemetry"
            subtitle="Live distribution of active tickets"
            icon={ListFilter}
            badge={`${total} Total Tickets`}
            badgeColor="#004643"
            badgeBg="#E6F2F1"
            onClick={() => navigate('/issues')}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '1rem' }}>
              <div style={{ padding: '12px 6px', backgroundColor: '#FFF1F2', borderRadius: '12px', textAlign: 'center', border: '1px solid #FECDD3' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#E11D48', letterSpacing: '-0.02em' }}>{reported}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#BE123C' }}>Needs Triage</div>
              </div>

              <div style={{ padding: '12px 6px', backgroundColor: '#FEF3C7', borderRadius: '12px', textAlign: 'center', border: '1px solid #FDE68A' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#D97706', letterSpacing: '-0.02em' }}>{inProgress}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#B45309' }}>In Progress</div>
              </div>

              <div style={{ padding: '12px 6px', backgroundColor: '#ECFDF5', borderRadius: '12px', textAlign: 'center', border: '1px solid #A7F3D0' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669', letterSpacing: '-0.02em' }}>{resolved}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#047857' }}>Resolved</div>
              </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B' }}>
              <span>High Priority: <strong style={{ color: '#E11D48' }}>{highPriority} critical</strong></span>
              <span style={{ color: '#004643', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span>View Directory</span>
                <ArrowRight size={12} />
              </span>
            </div>
          </BentoCard>

          {/* Bento Card 2: Quick Action Reporting */}
          <BentoCard
            title="Report a Facility Problem"
            subtitle="Submit an issue in under 60 seconds"
            icon={PlusCircle}
            badge="QUICK ACTION"
            badgeColor="#2563EB"
            badgeBg="#EFF6FF"
            onClick={() => navigate('/report')}
          >
            <p style={{ fontSize: '0.825rem', color: '#475569', margin: '0.5rem 0 1rem', lineHeight: 1.5 }}>
              Notice broken laboratory equipment, AC leakage, or plumbing issues? Log a report directly to dispatch the operations crew.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%', padding: '9px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '10px' }}
            >
              <PlusCircle size={15} />
              <span>Log New Campus Issue</span>
            </button>
          </BentoCard>

          {/* Bento Card 3: Live Cloud Backend Telemetry */}
          <BentoCard
            title="Spring Boot Cloud API"
            subtitle="Render Docker Container Status"
            icon={Server}
            badge={dataSource === 'api' ? 'LIVE API ACTIVE' : 'CACHED MOCK'}
            badgeColor={dataSource === 'api' ? '#047857' : '#D97706'}
            badgeBg={dataSource === 'api' ? '#ECFDF5' : '#FFFBEB'}
            onClick={() => window.open('https://campusfix-backend-ceqd.onrender.com/api/health', '_blank')}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#475569', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Backend Port:</span>
                <strong style={{ color: '#0F172A', fontFamily: 'monospace' }}>8080 (Dynamic Render)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Container:</span>
                <strong style={{ color: '#0F172A' }}>Eclipse Temurin 21 JRE</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Data Mode:</span>
                <strong style={{ color: '#047857' }}>Relational JPA / Hibernate</strong>
              </div>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  loadIssues();
                }}
                className="btn btn-sm btn-secondary"
                style={{ flex: 1, padding: '5px', fontSize: '0.75rem', borderRadius: '8px' }}
              >
                Sync Database
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/admin');
                }}
                className="btn btn-sm btn-secondary"
                style={{ flex: 1, padding: '5px', fontSize: '0.75rem', borderRadius: '8px', color: '#004643', fontWeight: 600 }}
              >
                Admin Control
              </button>
            </div>
          </BentoCard>
        </MagicBento>
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
