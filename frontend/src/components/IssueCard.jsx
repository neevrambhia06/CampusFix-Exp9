import React from 'react';
import { useCampusFix } from '../context/CampusFixContext';

export function IssueCard(props) {
  const { patchIssue, deleteIssue } = useCampusFix();
  const { issue } = props;

  const handleStatusChange = props.onStatusChange || ((id, newStatus) => patchIssue(id, { status: newStatus }));
  const handleDelete = props.onDelete || ((id) => {
    if (window.confirm(`Are you sure you want to delete Issue #${id}?`)) {
      deleteIssue(id);
    }
  });

  if (!issue) return null;

  return (
    <div className="issue-card">
      <div className="card-header">
        <div className="card-badges">
          {issue.priority === 'High' && (
            <span className="badge badge-priority-high">HIGH PRIORITY</span>
          )}
          {issue.priority === 'Medium' && (
            <span className="badge badge-priority-medium">MEDIUM PRIORITY</span>
          )}
          {issue.priority === 'Low' && (
            <span className="badge badge-priority-low">LOW PRIORITY</span>
          )}

          {issue.status === 'Resolved' && (
            <span className="badge badge-status-resolved">RESOLVED</span>
          )}
          {issue.status === 'In Progress' && (
            <span className="badge badge-status-progress">IN PROGRESS</span>
          )}
          {issue.status === 'Reported' && (
            <span className="badge badge-status-reported">REPORTED</span>
          )}
        </div>

        <span className="issue-category">{issue.category}</span>
      </div>

      <h3 className="issue-title">{issue.title}</h3>
      <p className="issue-description">{issue.description}</p>

      <div className="card-details">
        <div className="detail-item">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{issue.location}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Reporter:</span>
          <span className="detail-value">{issue.reporter || issue.reportedBy}</span>
        </div>
      </div>

      <div className="card-actions">
        <select
          value={issue.status}
          onChange={(e) => handleStatusChange(issue.id, e.target.value)}
          className="status-update-select"
        >
          <option value="Reported">Reported</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <button
          onClick={() => handleDelete(issue.id)}
          className="delete-button"
          title="Delete Issue"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default IssueCard;

