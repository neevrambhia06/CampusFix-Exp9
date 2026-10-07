import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, User, ChevronRight, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export function IssueCard(props) {
  const { issue, onStatusChange, onDelete } = props;
  const navigate = useNavigate();

  if (!issue) return null;

  return (
    <div className="issue-card-saas">
      {/* Top Header Row with Badges */}
      <div className="card-top-row">
        <div className="card-badge-group">
          {/* Conditional Rendering for Priority Badge */}
          {issue.priority === 'High' && (
            <span className="badge badge-priority-high">
              <AlertTriangle size={11} className="badge-icon" /> HIGH PRIORITY
            </span>
          )}
          {issue.priority === 'Medium' && (
            <span className="badge badge-priority-medium">MEDIUM PRIORITY</span>
          )}
          {issue.priority === 'Low' && (
            <span className="badge badge-priority-low">LOW PRIORITY</span>
          )}

          {/* Conditional Rendering for Status Badge */}
          {issue.status === 'Resolved' && (
            <span className="badge badge-status-resolved">
              <CheckCircle2 size={11} className="badge-icon" /> RESOLVED
            </span>
          )}
          {issue.status === 'In Progress' && (
            <span className="badge badge-status-progress">
              <Clock size={11} className="badge-icon" /> IN PROGRESS
            </span>
          )}
          {issue.status === 'Reported' && (
            <span className="badge badge-status-reported">REPORTED</span>
          )}
        </div>

        <span className="issue-category-tag">{issue.category}</span>
      </div>

      {/* Main Title & Description */}
      <h3 
        onClick={() => navigate(`/issues/${issue.id}`)}
        className="issue-card-title clickable"
      >
        {issue.title}
      </h3>

      <p className="issue-card-preview">{issue.description}</p>

      {/* Meta Information Footer */}
      <div className="card-meta-section">
        <div className="meta-item">
          <MapPin size={14} className="meta-icon" />
          <span className="meta-text">{issue.location}</span>
        </div>
        <div className="meta-item">
          <User size={14} className="meta-icon" />
          <span className="meta-text">{issue.reporter}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="card-footer-actions">
        <button
          onClick={() => navigate(`/issues/${issue.id}`)}
          className="btn-link-action"
        >
          <span>View Details</span>
          <ChevronRight size={14} />
        </button>

        <div className="action-button-group">
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

          {onDelete && (
            <button
              onClick={() => onDelete(issue.id)}
              className="btn-delete-icon"
              title="Delete Issue Record"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default IssueCard;
