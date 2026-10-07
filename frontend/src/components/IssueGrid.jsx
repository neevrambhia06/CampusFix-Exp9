import React from 'react';
import IssueCard from './IssueCard';
import { useCampusFix } from '../context/CampusFixContext';

export function IssueGrid(props) {
  const { filteredIssues } = useCampusFix();
  const { issues: propIssues, onStatusChange, onDelete } = props;
  const issues = propIssues || filteredIssues;

  // Conditional rendering: Empty State
  if (!issues || issues.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3 className="empty-title">No Issues Found</h3>
        <p className="empty-description">
          No issues match your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="issue-grid">
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default IssueGrid;

