import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function IssueRow(props) {
  const { issue, onStatusChange, onDelete } = props;
  const navigate = useNavigate();

  if (!issue) return null;

  return (
    <tr className="issue-table-row">
      <td className="row-id font-mono">#{issue.id}</td>
      <td className="row-title">
        <span 
          onClick={() => navigate(`/issues/${issue.id}`)}
          className="clickable-title"
        >
          {issue.title}
        </span>
        <span className="row-subtitle">{issue.reporter || issue.reportedBy} · {issue.reportedAt || 'Recent'}</span>
      </td>
      <td>
        <span className="row-category-pill">{issue.category}</span>
      </td>
      <td className="row-location">{issue.location}</td>
      <td>
        <span className={`badge ${
          issue.priority === 'High' ? 'badge-priority-high' :
          issue.priority === 'Medium' ? 'badge-priority-medium' : 'badge-priority-low'
        }`}>
          {issue.priority}
        </span>
      </td>
      <td>
        <span className={`badge ${
          issue.status === 'Resolved' ? 'badge-status-resolved' :
          issue.status === 'In Progress' ? 'badge-status-progress' : 'badge-status-reported'
        }`}>
          {issue.status}
        </span>
      </td>
      <td className="row-actions">
        <div className="row-actions-group">
          {onStatusChange && (
            <select
              value={issue.status}
              onChange={(e) => onStatusChange(issue.id, e.target.value)}
              className="status-select-sm"
            >
              <option value="Reported">Reported</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          )}

          <button
            onClick={() => navigate(`/issues/${issue.id}`)}
            className="btn-icon-circle"
            title="View Details"
          >
            <ChevronRight size={14} />
          </button>

          {onDelete && (
            <button
              onClick={() => onDelete(issue.id)}
              className="btn-delete-text"
            >
              Delete
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default IssueRow;

