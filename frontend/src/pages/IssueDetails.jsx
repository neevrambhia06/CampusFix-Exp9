import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IssueTimeline from '../components/issues/IssueTimeline';
import { LoadingState, ErrorState } from '../components/common/CommonComponents';
import { useCampusFix } from '../context/CampusFixContext';
import { ArrowLeft, Trash2 } from 'lucide-react';

export function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchSingleIssue, patchIssue, deleteIssue, issues } = useCampusFix();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchSingleIssue(id)
      .then((data) => {
        if (isMounted) {
          if (data) {
            setIssue(data);
          } else {
            setError(`Issue #${id} could not be found.`);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(`Issue #${id} fetch failed: ${err.message}`);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, fetchSingleIssue, issues]);

  const handleUpdateStatus = async (newStatus) => {
    if (!issue) return;
    setIssue((prev) => ({ ...prev, status: newStatus }));
    await patchIssue(issue.id, { status: newStatus });
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete Issue #${id}?`)) {
      await deleteIssue(id);
      navigate('/issues');
    }
  };

  if (loading) return <LoadingState message={`Fetching issue details #${id}...`} />;
  if (error) return <ErrorState message={error} onRetry={() => navigate('/issues')} />;
  if (!issue) return null;

  return (
    <div className="issue-details-page space-y">
      <button 
        onClick={() => navigate('/issues')}
        className="btn btn-secondary btn-sm"
      >
        <ArrowLeft size={16} />
        <span>Back to Issues</span>
      </button>

      <div className="details-header-card">
        <div className="details-header-top">
          <div className="details-badges">
            <span className={`badge ${
              issue.priority === 'High' ? 'badge-priority-high' :
              issue.priority === 'Medium' ? 'badge-priority-medium' : 'badge-priority-low'
            }`}>
              {issue.priority} PRIORITY
            </span>
            <span className={`badge ${
              issue.status === 'Resolved' ? 'badge-status-resolved' :
              issue.status === 'In Progress' ? 'badge-status-progress' : 'badge-status-reported'
            }`}>
              {issue.status}
            </span>
          </div>
          <span className="details-ticket-id font-mono">Ticket #{issue.id}</span>
        </div>

        <h1 className="details-title">{issue.title}</h1>
        <p className="details-description">{issue.description}</p>
      </div>

      <div className="details-layout-grid">
        <div className="details-left-col space-y">
          <div className="details-info-grid">
            <div className="info-box">
              <span className="info-box-label">Category</span>
              <span className="info-box-value">{issue.category}</span>
            </div>
            <div className="info-box">
              <span className="info-box-label">Location</span>
              <span className="info-box-value">{issue.location}</span>
            </div>
            <div className="info-box">
              <span className="info-box-label">Reported By</span>
              <span className="info-box-value">{issue.reporter || issue.reportedBy}</span>
            </div>
            <div className="info-box">
              <span className="info-box-label">Reported Date</span>
              <span className="info-box-value">{issue.reportedAt || 'Recent'}</span>
            </div>
          </div>

          <IssueTimeline status={issue.status} />
        </div>

        <div className="details-right-col">
          <div className="action-panel-card">
            <h3 className="panel-title">Issue Management Actions</h3>
            <p className="panel-subtitle">Update resolution status or remove ticket record.</p>

            <div className="action-field">
              <label className="action-label">Change Status</label>
              <select
                value={issue.status}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                className="action-select"
              >
                <option value="Reported">Reported</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="panel-divider"></div>

            <button
              onClick={handleDelete}
              className="btn btn-danger-full"
            >
              <Trash2 size={16} />
              <span>Delete Ticket Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueDetails;

