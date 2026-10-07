import React from 'react';

export function IssueTable(props) {
  const { issues, onStatusChange, onDelete } = props;

  if (!issues || issues.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-description">No issues available in table view.</p>
      </div>
    );
  }

  return (
    <div className="issue-table-container">
      <table className="issue-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Location</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Reporter</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td>#{issue.id}</td>
              <td className="font-semibold">{issue.title}</td>
              <td>{issue.category}</td>
              <td>{issue.location}</td>
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
              <td>{issue.reporter}</td>
              <td>
                <div className="table-actions">
                  {onStatusChange && (
                    <select
                      value={issue.status}
                      onChange={(e) => onStatusChange(issue.id, e.target.value)}
                      className="status-update-select"
                    >
                      <option value="Reported">Reported</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(issue.id)}
                      className="delete-button-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IssueTable;
