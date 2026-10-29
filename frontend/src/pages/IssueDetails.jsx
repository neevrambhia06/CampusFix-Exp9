import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import IssueTimeline from '../components/issues/IssueTimeline';
import { LoadingState, ErrorState } from '../components/common/CommonComponents';
import { useCampusFix } from '../context/CampusFixContext';
import { mockIssues, isAssignedToUser, formatReporterName } from '../data/mockData';
import { 
  ArrowLeft, 
  Trash2, 
  ShieldCheck, 
  MapPin, 
  User, 
  Calendar, 
  Tag, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  ExternalLink,
  ChevronRight,
  Lock,
  Wrench,
  FileText
} from 'lucide-react';

export function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchSingleIssue, patchIssue, deleteIssue, issues, currentUser, isAdmin } = useCampusFix();

  // Instant lookup with multi-tier cache: context issues -> localStorage -> mock data (0ms instant load!)
  const localIssue = useMemo(() => {
    if (issues && issues.length > 0) {
      const match = issues.find((i) => String(i.id) === String(id));
      if (match) return match;
    }
    try {
      const cached = JSON.parse(localStorage.getItem('campusfix_cached_issues') || '[]');
      const foundInCache = cached.find((i) => String(i.id) === String(id));
      if (foundInCache) return foundInCache;
    } catch {}
    return mockIssues.find((i) => String(i.id) === String(id)) || null;
  }, [issues, id]);

  // Initial state: immediate sync with localIssue (0ms latency, zero spinner freeze)
  const [issue, setIssue] = useState(() => localIssue);
  const [loading, setLoading] = useState(() => !localIssue);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync whenever localIssue updates in context or cache
  useEffect(() => {
    if (localIssue) {
      setIssue(localIssue);
      setLoading(false);
      setError(null);
    }
  }, [localIssue]);

  // Background fetch only if not already resolved locally
  useEffect(() => {
    if (issue || localIssue) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    // 2-second failsafe timer so user never gets stuck on loading spinner
    const timer = setTimeout(() => {
      if (isMounted) {
        const fallback = mockIssues.find((i) => String(i.id) === String(id));
        if (fallback) {
          setIssue(fallback);
          setLoading(false);
        } else {
          setError(`Issue #${id} could not be found.`);
          setLoading(false);
        }
      }
    }, 2000);

    fetchSingleIssue(id)
      .then((data) => {
        clearTimeout(timer);
        if (isMounted) {
          if (data) {
            setIssue(data);
          } else {
            const fallback = mockIssues.find((i) => String(i.id) === String(id));
            if (fallback) setIssue(fallback);
            else setError(`Issue #${id} could not be found.`);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        clearTimeout(timer);
        if (isMounted) {
          const fallback = mockIssues.find((i) => String(i.id) === String(id));
          if (fallback) {
            setIssue(fallback);
            setLoading(false);
          } else {
            setError(`Issue #${id} fetch failed: ${err.message}`);
            setLoading(false);
          }
        }
      });

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [id, localIssue]);

  const isAssigned = isAssignedToUser(issue?.assignedTo, currentUser);
  const canModify = currentUser?.role === 'Admin' || (currentUser?.role === 'Technician' && isAssigned);

  const handleUpdateStatus = async (newStatus) => {
    if (!issue || isUpdating || !canModify) return;
    setIsUpdating(true);

    let resolutionNotes = issue.resolutionNotes || '';
    if (newStatus === 'Resolved' && currentUser?.role === 'Technician') {
      const tag = `(Logged by ${currentUser.name})`;
      if (!resolutionNotes.includes(tag)) {
        resolutionNotes = resolutionNotes ? `${resolutionNotes} ${tag}` : `Work completed and verified on site ${tag}`;
      }
    }

    // Instant optimistic update
    setIssue((prev) => ({ 
      ...prev, 
      status: newStatus, 
      resolutionNotes: resolutionNotes || prev.resolutionNotes,
      updatedAt: 'Just now' 
    }));

    try {
      await patchIssue(issue.id, { 
        status: newStatus,
        ...(resolutionNotes ? { resolutionNotes } : {})
      });
    } catch (err) {
      console.warn('Status patch deferred:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to permanently delete Issue #${id}?`)) {
      await deleteIssue(id);
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/issues');
      }
    }
  };

  // If loading and we don't have any cached data yet
  if (loading && !issue) {
    return (
      <div className="issue-details-page space-y">
        <LoadingState message={`Fetching issue details #${id}...`} />
      </div>
    );
  }

  // If error and no issue found
  if (error && !issue) {
    return (
      <div className="issue-details-page space-y">
        <ErrorState 
          message={error} 
          onRetry={() => {
            if (isAdmin) navigate('/admin');
            else navigate('/issues');
          }} 
        />
      </div>
    );
  }

  if (!issue) return null;

  return (
    <div className="issue-details-page space-y">
      {/* Top Breadcrumb & Navigation Actions */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '0.75rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {isAdmin ? (
            <button
              onClick={() => navigate('/admin')}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={15} />
              <span>Admin Dashboard</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/issues')}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={15} />
              <span>Back to Issues</span>
            </button>
          )}

          <span style={{ color: '#CBD5E1' }}>/</span>
          <span style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 600 }}>
            Ticket #{String(issue.id).padStart(2, '0')}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link
            to="/issues"
            style={{
              fontSize: '0.8rem',
              color: '#004643',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>All Issues</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>

      {/* Main Header Card */}
      <div 
        style={{ 
          backgroundColor: '#FFFFFF', 
          border: '1px solid #E2E8F0', 
          borderRadius: '16px', 
          padding: '1.75rem',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            {/* Priority Badge */}
            <span
              style={{
                fontSize: '0.725rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor:
                  issue.priority === 'High' ? '#FFF1F2' :
                  issue.priority === 'Medium' ? '#FEF3C7' : '#F1F5F9',
                color:
                  issue.priority === 'High' ? '#E11D48' :
                  issue.priority === 'Medium' ? '#D97706' : '#475569',
                border: `1px solid ${
                  issue.priority === 'High' ? '#FECDD3' :
                  issue.priority === 'Medium' ? '#FDE68A' : '#E2E8F0'
                }`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              {issue.priority === 'High' && <AlertTriangle size={12} />}
              {issue.priority || 'Low'} Priority
            </span>

            {/* Status Badge */}
            <span
              style={{
                fontSize: '0.725rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor:
                  issue.status === 'Resolved' ? '#ECFDF5' :
                  issue.status === 'In Progress' ? '#FEF3C7' : '#FFF1F2',
                color:
                  issue.status === 'Resolved' ? '#059669' :
                  issue.status === 'In Progress' ? '#D97706' : '#E11D48',
                border: `1px solid ${
                  issue.status === 'Resolved' ? '#A7F3D0' :
                  issue.status === 'In Progress' ? '#FDE68A' : '#FECDD3'
                }`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              {issue.status === 'Resolved' && <CheckCircle2 size={12} />}
              {issue.status === 'In Progress' && <Clock size={12} />}
              {issue.status || 'Reported'}
            </span>

            <span
              style={{
                fontSize: '0.725rem',
                fontWeight: 600,
                padding: '4px 9px',
                borderRadius: '6px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#64748B'
              }}
            >
              {issue.category || 'General'}
            </span>
          </div>

          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', fontFamily: 'monospace' }}>
            ID #{String(issue.id).padStart(2, '0')}
          </span>
        </div>

        <h1 
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: 800, 
            color: '#0F172A', 
            letterSpacing: '-0.02em', 
            margin: '0 0 0.75rem 0',
            lineHeight: 1.3
          }}
        >
          {issue.title}
        </h1>

        <p 
          style={{ 
            fontSize: '0.925rem', 
            color: '#475569', 
            lineHeight: 1.6, 
            margin: 0,
            whiteSpace: 'pre-wrap'
          }}
        >
          {issue.description || 'No detailed description provided for this campus ticket.'}
        </p>
      </div>

      {/* Grid: 2 Columns */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '1.25rem', 
          alignItems: 'start' 
        }}
      >
        {/* Left Column: Details Info & Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Key Attributes Grid */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
              gap: '0.875rem' 
            }}
          >
            {/* Location */}
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0', 
                borderRadius: '12px', 
                padding: '1rem',
                boxShadow: '0 1px 2px rgba(15, 23, 42, 0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                <MapPin size={13} style={{ color: '#004643' }} />
                <span>Location</span>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
                {issue.location || 'Campus Facilities'}
              </div>
            </div>

            {/* Reporter (Clean format without IDs) */}
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0', 
                borderRadius: '12px', 
                padding: '1rem',
                boxShadow: '0 1px 2px rgba(15, 23, 42, 0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                <User size={13} style={{ color: '#004643' }} />
                <span>Reported By</span>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
                {formatReporterName(issue.reporter || issue.reportedBy)}
              </div>
            </div>

            {/* Assigned Technician */}
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0', 
                borderRadius: '12px', 
                padding: '1rem',
                boxShadow: '0 1px 2px rgba(15, 23, 42, 0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                <Wrench size={13} style={{ color: '#004643' }} />
                <span>Assigned To</span>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: issue.assignedTo ? '#004643' : '#64748B' }}>
                {issue.assignedTo || 'Unassigned (Triage)'}
              </div>
            </div>

            {/* Category */}
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0', 
                borderRadius: '12px', 
                padding: '1rem',
                boxShadow: '0 1px 2px rgba(15, 23, 42, 0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                <Tag size={13} style={{ color: '#004643' }} />
                <span>Category</span>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
                {issue.category || 'Maintenance'}
              </div>
            </div>

            {/* Reported At */}
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0', 
                borderRadius: '12px', 
                padding: '1rem',
                boxShadow: '0 1px 2px rgba(15, 23, 42, 0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                <Calendar size={13} style={{ color: '#004643' }} />
                <span>Reported Date</span>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
                {issue.reportedAt || 'Recently'}
              </div>
            </div>
          </div>

          {/* Workflow Timeline */}
          <div 
            style={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E2E8F0', 
              borderRadius: '16px', 
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
            }}
          >
            <IssueTimeline status={issue.status} />
          </div>

        </div>

        {/* Right Column: Management Actions Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div 
            style={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E2E8F0', 
              borderRadius: '16px', 
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <ShieldCheck size={18} style={{ color: '#004643' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Resolution Control
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem 0' }}>
              Update ticket lifecycle state and notify assigned technicians.
            </p>

            {/* Resolution Notes Banner if present */}
            {issue.resolutionNotes && (
              <div style={{
                padding: '0.875rem 1rem',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: '12px',
                marginBottom: '1rem',
                fontSize: '0.8rem',
                color: '#065F46'
              }}>
                <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <CheckCircle2 size={15} style={{ color: '#059669' }} />
                  <span>Resolution Notes</span>
                </div>
                <div>{issue.resolutionNotes}</div>
              </div>
            )}

            {/* Strict Access Control: If technician is not assigned, render restriction card */}
            {currentUser?.role === 'Technician' && !isAssigned ? (
              <div style={{
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.875rem', color: '#0F172A', marginBottom: '6px' }}>
                  <Lock size={16} style={{ color: '#E11D48' }} />
                  <span>Technician Access Restricted</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  {issue.assignedTo 
                    ? `This work order is assigned to "${issue.assignedTo}". Only the assigned technician or campus administrator has permission to modify or resolve this ticket.`
                    : 'This work order is currently unassigned. An administrator must dispatch this ticket to your queue before you can take action.'}
                </p>
              </div>
            ) : canModify ? (
              <div style={{ marginBottom: '1.25rem' }}>
                <label 
                  style={{ 
                    display: 'block', 
                    fontSize: '0.775rem', 
                    fontWeight: 700, 
                    color: '#334155', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.03em', 
                    marginBottom: '6px' 
                  }}
                >
                  Change Status
                </label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { value: 'Reported', label: 'Reported (Queued for Triage)', color: '#E11D48', bg: '#FFF1F2' },
                    { value: 'In Progress', label: 'In Progress (Active Repair)', color: '#D97706', bg: '#FEF3C7' },
                    { value: 'Resolved', label: 'Resolved (Fixed & Verified)', color: '#059669', bg: '#ECFDF5' }
                  ].map((st) => (
                    <button
                      key={st.value}
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleUpdateStatus(st.value)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontSize: '0.825rem',
                        fontWeight: issue.status === st.value ? 700 : 500,
                        cursor: isUpdating ? 'wait' : 'pointer',
                        border: issue.status === st.value ? `2px solid ${st.color}` : '1px solid #E2E8F0',
                        backgroundColor: issue.status === st.value ? st.bg : '#FFFFFF',
                        color: issue.status === st.value ? st.color : '#334155',
                        transition: 'all 0.15s ease',
                        textAlign: 'left'
                      }}
                    >
                      <span>{st.label}</span>
                      {issue.status === st.value && (
                        <CheckCircle2 size={16} style={{ color: st.color }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{
                padding: '1rem',
                backgroundColor: '#F8FAFC',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                fontSize: '0.8rem',
                color: '#64748B',
                fontStyle: 'italic',
                marginBottom: '1rem'
              }}>
                Ticket lifecycle updates are managed by assigned technicians and campus operations personnel.
              </div>
            )}

            <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '1.25rem 0' }} />

            {/* Delete Action */}
            {isAdmin && (
              <button
                type="button"
                onClick={handleDelete}
                style={{
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  borderRadius: '10px',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  color: '#BE123C',
                  backgroundColor: '#FFF1F2',
                  border: '1px solid #FECDD3',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FEE2E2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFF1F2';
                }}
              >
                <Trash2 size={15} />
                <span>Delete Ticket Record</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default IssueDetails;
