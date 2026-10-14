import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Trash2, 
  ExternalLink, 
  Search, 
  Filter, 
  Server, 
  Database, 
  UserCheck,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';
import { useCampusFix } from '../context/CampusFixContext';
import { Badge } from '../components/common/CommonComponents';

export function AdminDashboard() {
  const { 
    issues, 
    currentUser, 
    isAdmin, 
    logout, 
    patchIssue, 
    deleteIssue, 
    loadIssues, 
    loading,
    dataSource 
  } = useCampusFix();

  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  // If not admin, show access restricted prompt
  if (!isAdmin) {
    return (
      <div className="state-box" style={{ maxWidth: '540px', margin: '4rem auto' }}>
        <ShieldCheck size={48} style={{ color: 'var(--priority-high-text)', marginBottom: '1rem' }} />
        <h2 className="state-title">Administrator Access Required</h2>
        <p className="state-message">
          You must be logged in with administrative credentials to access the Fixora Control Center.
        </p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button onClick={() => navigate('/login')} className="btn btn-primary">
            Sign In with Admin Account
          </button>
          <Link to="/dashboard" className="btn btn-secondary">
            Return to User Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Handle direct status change by Admin
  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await patchIssue(id, { 
        status: newStatus,
        updatedAt: 'Just now by Admin'
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // Handle direct deletion by Admin
  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete ticket #${id}: "${title}"?`)) {
      await deleteIssue(id);
    }
  };

  // Filter issues
  const filteredIssues = issues.filter((issue) => {
    const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || issue.priority === priorityFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      (issue.title || '').toLowerCase().includes(q) ||
      (issue.location || '').toLowerCase().includes(q) ||
      (issue.reporter || '').toLowerCase().includes(q);

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const totalTickets = issues.length;
  const reportedTickets = issues.filter((i) => i.status === 'Reported').length;
  const inProgressTickets = issues.filter((i) => i.status === 'In Progress').length;
  const resolvedTickets = issues.filter((i) => i.status === 'Resolved').length;

  return (
    <div className="admin-dashboard-page space-y" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Header Card */}
      <div className="card" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'linear-gradient(135deg, #004643 0%, #002d2b 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={28} style={{ color: '#A7F3D0' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#fff' }}>
                Admin Control Center
              </h1>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '9999px', background: '#059669', color: '#fff', fontWeight: 600 }}>
                Super Admin
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', opacity: 0.85, fontSize: '0.875rem' }}>
              Signed in as <strong>{currentUser.name}</strong> ({currentUser.email || 'admin@fixora.edu'})
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => loadIssues()}
            disabled={loading}
            className="btn btn-sm"
            style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.3)' }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} style={{ marginRight: '6px' }} />
            <span>Sync API</span>
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/dashboard');
            }}
            className="btn btn-sm"
            style={{ background: '#DC2626', color: '#fff', border: 'none' }}
          >
            <LogOut size={14} style={{ marginRight: '6px' }} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Tickets</span>
            <SlidersHorizontal size={18} style={{ color: 'var(--primary)' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-main)' }}>
            {totalTickets}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Logged across all departments</span>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #BE123C' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Needs Triage</span>
            <AlertTriangle size={18} style={{ color: '#BE123C' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', color: '#BE123C' }}>
            {reportedTickets}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status: "Reported" (Pending review)</span>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #B45309' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Under Repair</span>
            <Clock size={18} style={{ color: '#B45309' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', color: '#B45309' }}>
            {inProgressTickets}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Assigned & in progress</span>
        </div>

        <div className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #047857' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Resolved</span>
            <CheckCircle2 size={18} style={{ color: '#047857' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', color: '#047857' }}>
            {resolvedTickets}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Successfully resolved</span>
        </div>

      </div>

      {/* Backend & Deployment Status Panel */}
      <div className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', backgroundColor: 'var(--bg-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Server size={18} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.875rem' }}>
              Backend: <strong>Spring Boot 3.2.5 (Render Live)</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={18} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.875rem' }}>
              Data Mode: <span className={`badge ${dataSource === 'api' ? 'badge-resolved' : 'badge-reported'}`}>{dataSource === 'api' ? 'REST API Active' : 'Offline / Mock'}</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={18} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.875rem' }}>
              Active Role: <strong>Administrator</strong>
            </span>
          </div>

        </div>

        <Link to="/issues" className="btn btn-sm btn-outline">
          <span>Student View</span>
          <ExternalLink size={14} style={{ marginLeft: '4px' }} />
        </Link>
      </div>

      {/* Administrative Tickets Management Table */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
              Campus Tickets Management
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
              Change ticket lifecycles in real-time or remove invalid entries.
            </p>
          </div>

          {/* Table Filters */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search ticket, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2rem', height: '36px', fontSize: '0.825rem', minWidth: '200px' }}
              />
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--text-light)' }} />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
              style={{ height: '36px', fontSize: '0.825rem', padding: '0 0.75rem' }}
            >
              <option value="All">All Statuses</option>
              <option value="Reported">Reported</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="form-select"
              style={{ height: '36px', fontSize: '0.825rem', padding: '0 0.75rem' }}
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

          </div>
        </div>

        {/* Table Content */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 0.5rem', width: '50px' }}>ID</th>
                <th style={{ padding: '0.75rem 1rem' }}>Title & Description</th>
                <th style={{ padding: '0.75rem 1rem' }}>Location & Dept</th>
                <th style={{ padding: '0.75rem 0.75rem' }}>Priority</th>
                <th style={{ padding: '0.75rem 1rem', minWidth: '160px' }}>Update Status</th>
                <th style={{ padding: '0.75rem 0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    No matching campus tickets found.
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue) => {
                  const isUpdating = updatingId === issue.id;

                  return (
                    <tr 
                      key={issue.id} 
                      style={{ 
                        borderBottom: '1px solid var(--border-light)', 
                        transition: 'background-color 0.15s ease',
                        opacity: isUpdating ? 0.6 : 1
                      }}
                    >
                      <td style={{ padding: '1rem 0.5rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        #{issue.id}
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
                          <Link to={`/issues/${issue.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {issue.title}
                          </Link>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {issue.description || 'No description provided.'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '4px' }}>
                          Reported by: <strong>{issue.reporter || 'Anonymous'}</strong>
                        </div>
                      </td>

                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>
                          {issue.location || 'Campus'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {issue.category || 'General'}
                        </div>
                      </td>

                      <td style={{ padding: '1rem 0.75rem' }}>
                        <span className={`badge ${
                          issue.priority === 'High' ? 'badge-high' :
                          issue.priority === 'Medium' ? 'badge-medium' : 'badge-low'
                        }`}>
                          {issue.priority}
                        </span>
                      </td>

                      {/* Administrative Live Status Changer */}
                      <td style={{ padding: '1rem' }}>
                        <select
                          value={issue.status}
                          disabled={isUpdating}
                          onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                          className="form-select"
                          style={{
                            height: '34px',
                            fontSize: '0.825rem',
                            fontWeight: 600,
                            borderRadius: '8px',
                            backgroundColor: 
                              issue.status === 'Resolved' ? '#D1FAE5' :
                              issue.status === 'In Progress' ? '#FEF3C7' : '#FFF1F2',
                            color:
                              issue.status === 'Resolved' ? '#047857' :
                              issue.status === 'In Progress' ? '#B45309' : '#9F1239',
                            borderColor: 'transparent'
                          }}
                        >
                          <option value="Reported">🔴 Reported</option>
                          <option value="In Progress">🟡 In Progress</option>
                          <option value="Resolved">🟢 Resolved</option>
                        </select>
                      </td>

                      {/* Action buttons */}
                      <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <Link 
                            to={`/issues/${issue.id}`} 
                            className="btn btn-sm btn-outline" 
                            title="View Full Ticket Details"
                            style={{ padding: '6px' }}
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <button
                            onClick={() => handleDelete(issue.id, issue.title)}
                            className="btn btn-sm btn-danger"
                            title="Delete Ticket"
                            style={{ padding: '6px' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
