import React from 'react';
import { useCampusFix } from '../context/CampusFixContext';

export function SummaryCards(props) {
  const { issues: contextIssues, stats } = useCampusFix();
  const issues = props.issues || contextIssues;

  const total = stats ? stats.totalIssues : (issues ? issues.length : 0);
  const reported = stats ? stats.reportedIssues : (issues ? issues.filter(i => i.status === 'Reported').length : 0);
  const inProgress = stats ? stats.inProgressIssues : (issues ? issues.filter(i => i.status === 'In Progress').length : 0);
  const resolved = stats ? stats.resolvedIssues : (issues ? issues.filter(i => i.status === 'Resolved').length : 0);
  const highPriority = stats ? stats.highPriorityIssues : (issues ? issues.filter(i => i.priority === 'High').length : 0);

  return (
    <div className="summary-cards">
      <div className="summary-card total">
        <span className="card-label">Total Issues</span>
        <span className="card-value">{total}</span>
      </div>

      <div className="summary-card reported">
        <span className="card-label">Reported</span>
        <span className="card-value">{reported}</span>
      </div>

      <div className="summary-card progress">
        <span className="card-label">In Progress</span>
        <span className="card-value">{inProgress}</span>
      </div>

      <div className="summary-card resolved">
        <span className="card-label">Resolved</span>
        <span className="card-value">{resolved}</span>
      </div>

      <div className="summary-card high-priority">
        <span className="card-label">High Priority</span>
        <span className="card-value">{highPriority}</span>
      </div>
    </div>
  );
}

export default SummaryCards;

