import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, EmptyState } from '../components/common/CommonComponents';
import IssueCard from '../components/issues/IssueCard';
import { useCampusFix } from '../context/CampusFixContext';
import { PlusCircle, FileText } from 'lucide-react';

export function MyReports(props) {
  const context = useCampusFix();
  const navigate = useNavigate();

  const user = props.user || context.currentUser;
  const issues = props.issues || context.issues;

  const userName = (user?.name || '').toLowerCase();
  const myIssues = issues.filter((i) => {
    const rep = (i.reporter || i.reportedBy || '').toLowerCase();
    if (!rep) return false;
    if (userName && (rep === userName || rep.includes(userName) || userName.includes(rep))) {
      return true;
    }
    // Default fallback if initial student
    return userName.includes('aarav') && rep.includes('aarav');
  });

  const total = myIssues.length;
  const pending = myIssues.filter((i) => i.status === 'Reported').length;
  const inProgress = myIssues.filter((i) => i.status === 'In Progress').length;
  const resolved = myIssues.filter((i) => i.status === 'Resolved').length;

  return (
    <div className="my-reports-page space-y">
      <PageHeader
        title="My Reported Tickets"
        subtitle={`Track the progress and updates for issues logged by ${user ? user.name : 'you'}.`}
        action={
          <button
            onClick={() => navigate('/report')}
            className="btn btn-primary"
          >
            <PlusCircle size={18} />
            <span>+ Report New Issue</span>
          </button>
        }
      />

      <div className="my-reports-stats-grid">
        <div className="my-stat-card">
          <span className="stat-label">Total My Tickets</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="my-stat-card amber">
          <span className="stat-label">Pending / Reported</span>
          <span className="stat-value">{pending}</span>
        </div>
        <div className="my-stat-card blue">
          <span className="stat-label">In Progress</span>
          <span className="stat-value">{inProgress}</span>
        </div>
        <div className="my-stat-card green">
          <span className="stat-label">Resolved</span>
          <span className="stat-value">{resolved}</span>
        </div>
      </div>

      {myIssues.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No Reports Submitted Yet"
          description="You haven't logged any campus maintenance tickets yet."
          action={
            <button
              onClick={() => navigate('/report')}
              className="btn btn-primary"
            >
              Report Your First Issue
            </button>
          }
        />
      ) : (
        <div className="issue-grid-saas">
          {myIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onStatusChange={props.onStatusChange}
              onDelete={props.onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReports;

