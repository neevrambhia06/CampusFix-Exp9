import React, { useState, useRef, useEffect } from 'react';
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
  Server, 
  Database, 
  UserCheck,
  RefreshCw,
  ChevronDown,
  Check,
  MapPin,
  Layers
} from 'lucide-react';
import { useCampusFix } from '../context/CampusFixContext';
import { formatReporterName } from '../data/mockData';

// ==========================================
// Minimalist & Aesthetic Custom Status Dropdown
// ==========================================
function StatusPillDropdown({ status, isUpdating, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusConfig = {
    'Reported': {
      bg: '#FFF1F2',
      color: '#E11D48',
      border: '#FECDD3',
      dot: '#E11D48',
      label: 'Reported',
    },
    'In Progress': {
      bg: '#FEF3C7',
      color: '#D97706',
      border: '#FDE68A',
      dot: '#D97706',
      label: 'In Progress',
    },
    'Resolved': {
      bg: '#ECFDF5',
      color: '#059669',
      border: '#A7F3D0',
      dot: '#059669',
      label: 'Resolved',
    },
  };

  const current = statusConfig[status] || statusConfig['Reported'];
  const options = ['Reported', 'In Progress', 'Resolved'];

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        disabled={isUpdating}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          padding: '5px 12px',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: 600,
          backgroundColor: current.bg,
          color: current.color,
          border: `1px solid ${current.border}`,
          cursor: isUpdating ? 'wait' : 'pointer',
          transition: 'all 0.15s ease',
          outline: 'none',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
          userSelect: 'none'
        }}
        title="Click to change status"
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: current.dot,
            flexShrink: 0
          }}
        />
        <span>{current.label}</span>
        <ChevronDown 
          size={13} 
          style={{ 
            opacity: 0.7, 
            transform: isOpen ? 'rotate(180deg)' : 'none', 
            transition: 'transform 0.15s ease' 
          }} 
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            zIndex: 60,
            minWidth: '150px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '5px',
            boxShadow: '0 12px 28px -4px rgba(15, 23, 42, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
            border: '1px solid #E2E8F0',
            animation: 'fadeIn 0.15s ease-out'
          }}
        >
          <div style={{ padding: '4px 8px 6px', fontSize: '0.675rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8' }}>
            Change Status
          </div>
          {options.map((opt) => {
            const optConfig = statusConfig[opt];
            const isSelected = opt === status;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 10px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 600 : 500,
                  color: isSelected ? optConfig.color : '#334155',
                  backgroundColor: isSelected ? optConfig.bg : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.12s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: optConfig.dot
                    }}
                  />
                  <span>{optConfig.label}</span>
                </span>
                {isSelected && <Check size={13} style={{ color: optConfig.color }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ==========================================
// Minimalist Priority Pill
// ==========================================
function PriorityPill({ priority }) {
  const styles = {
    'High': { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3', dot: '#E11D48' },
    'Medium': { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A', dot: '#D97706' },
    'Low': { bg: '#F1F5F9', color: '#475569', border: '#E2E8F0', dot: '#64748B' },
  }[priority] || { bg: '#F1F5F9', color: '#475569', border: '#E2E8F0', dot: '#64748B' };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 9px',
        borderRadius: '9999px',
        fontSize: '0.725rem',
        fontWeight: 600,
        backgroundColor: styles.bg,
        color: styles.color,
        border: `1px solid ${styles.border}`,
        letterSpacing: '0.01em'
      }}
    >
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: styles.dot }} />
      <span>{priority}</span>
    </span>
  );
}

// ==========================================
// Main Admin Dashboard Component
// ==========================================
export function AdminDashboard() {
  const { 
    issues, 
    currentUser, 
    isAdmin, 
    logout, 
    patchIssue, 
    deleteIssue, 
    loadIssues, 
    loading
  } = useCampusFix();

  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  // Protected route check
  if (!isAdmin) {
    return (
      <div className="state-box" style={{ maxWidth: '520px', margin: '4rem auto', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid #E2E8F0', backgroundColor: '#ffffff', boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.06)' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '14px', backgroundColor: '#FFF1F2', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <ShieldCheck size={28} />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
          Administrator Access Required
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.75rem' }}>
          You must be logged in with administrative credentials to access the Fixora Control Center.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ padding: '0.625rem 1.25rem' }}>
            Sign In as Admin
          </button>
          <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '0.625rem 1.25rem' }}>
            Return to User View
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
    const isResolved = (issue.status || '').toLowerCase() === 'resolved';
    const matchesStatus = statusFilter === 'All' 
      ? !isResolved 
      : (issue.status || '').toLowerCase() === statusFilter.toLowerCase();
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
    <div className="admin-dashboard-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Aesthetic Minimalist Header */}
      <div 
        style={{ 
          padding: '1.5rem 1.75rem', 
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1rem' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div 
            style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '12px', 
              background: '#E6F2F1', 
              color: '#004643', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: 'inset 0 0 0 1px rgba(0, 70, 67, 0.1)'
            }}
          >
            <ShieldCheck size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#0F172A', letterSpacing: '-0.02em' }}>
                Fixora Control Center
              </h1>
              <span 
                style={{ 
                  fontSize: '0.675rem', 
                  padding: '2px 8px', 
                  borderRadius: '9999px', 
                  background: '#ECFDF5', 
                  color: '#047857', 
                  fontWeight: 700,
                  border: '1px solid #A7F3D0',
                  letterSpacing: '0.04em'
                }}
              >
                SUPER ADMIN
              </span>
            </div>
            <p style={{ margin: '3px 0 0 0', color: '#64748B', fontSize: '0.825rem' }}>
              Authenticated as <strong>{currentUser.name}</strong> · {currentUser.email || 'admin@fixora.edu'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => loadIssues()}
            disabled={loading}
            className="btn btn-sm"
            style={{ 
              background: '#F8FAFC', 
              color: '#334155', 
              border: '1px solid #E2E8F0',
              fontWeight: 600,
              borderRadius: '10px',
              padding: '6px 12px'
            }}
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} style={{ marginRight: '6px', color: '#64748B' }} />
            <span>Sync</span>
          </button>
          
          <button
            onClick={() => {
              logout();
              navigate('/dashboard');
            }}
            className="btn btn-sm"
            style={{ 
              background: '#FFF1F2', 
              color: '#BE123C', 
              border: '1px solid #FECDD3',
              fontWeight: 600,
              borderRadius: '10px',
              padding: '6px 12px'
            }}
          >
            <LogOut size={13} style={{ marginRight: '6px' }} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards — Minimalist Aesthetic */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        
        {/* Total Tickets */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Total Tickets</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
              <Layers size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.5rem', color: '#0F172A', letterSpacing: '-0.03em' }}>
            {totalTickets}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>All logged campus reports</span>
        </div>

        {/* Needs Triage */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#BE123C' }}>Needs Triage</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E11D48' }}>
              <AlertTriangle size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.5rem', color: '#BE123C', letterSpacing: '-0.03em' }}>
            {reportedTickets}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#BE123C', opacity: 0.8 }}>Pending technician assignment</span>
        </div>

        {/* In Progress */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#B45309' }}>In Progress</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
              <Clock size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.5rem', color: '#B45309', letterSpacing: '-0.03em' }}>
            {inProgressTickets}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#B45309', opacity: 0.8 }}>Active campus work orders</span>
        </div>

        {/* Resolved */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#047857' }}>Resolved</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.5rem', color: '#047857', letterSpacing: '-0.03em' }}>
            {resolvedTickets}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#047857', opacity: 0.8 }}>Fixed and closed out</span>
        </div>

      </div>

      {/* Backend & Deployment Status Bar */}
      <div 
        style={{ 
          padding: '0.875rem 1.25rem', 
          backgroundColor: '#ffffff', 
          borderRadius: '12px', 
          border: '1px solid #E2E8F0',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '1rem',
          fontSize: '0.8rem',
          color: '#475569'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Server size={15} style={{ color: '#004643' }} />
            <span>Backend: <strong style={{ color: '#0F172A' }}>Google Firebase</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Database size={15} style={{ color: '#004643' }} />
            <span>Database: <strong style={{ color: '#047857' }}>Cloud Firestore (Live)</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <UserCheck size={15} style={{ color: '#004643' }} />
            <span>Role: <strong style={{ color: '#0F172A' }}>Super Administrator</strong></span>
          </div>

        </div>

        <Link 
          to="/issues" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '5px', 
            color: '#004643', 
            fontWeight: 600, 
            textDecoration: 'none',
            fontSize: '0.8rem' 
          }}
        >
          <span>View Public Ticket Tracker</span>
          <ExternalLink size={13} />
        </Link>
      </div>

      {/* Aesthetic Table Container */}
      <div 
        style={{ 
          backgroundColor: '#ffffff', 
          border: '1px solid #E2E8F0', 
          borderRadius: '16px', 
          boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
          overflow: 'hidden' 
        }}
      >
        {/* Table Filter & Search Header */}
        <div 
          style={{ 
            padding: '1.25rem 1.5rem', 
            borderBottom: '1px solid #E2E8F0', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '1rem',
            backgroundColor: '#ffffff'
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#0F172A' }}>
              Campus Maintenance Tickets
            </h2>
            <p style={{ fontSize: '0.775rem', color: '#64748B', margin: '2px 0 0 0' }}>
              Showing {filteredIssues.length} of {issues.length} total tickets
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', flexWrap: 'wrap' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search ticket, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  height: '34px',
                  paddingLeft: '2rem',
                  paddingRight: '0.75rem',
                  fontSize: '0.8rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  outline: 'none',
                  backgroundColor: '#F8FAFC',
                  color: '#0F172A',
                  minWidth: '220px',
                  transition: 'all 0.15s ease'
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.borderColor = '#004643';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '#F8FAFC';
                  e.target.style.borderColor = '#E2E8F0';
                }}
              />
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94A3B8' }} />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                height: '34px',
                fontSize: '0.8rem',
                fontWeight: 500,
                padding: '0 0.75rem',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                outline: 'none',
                cursor: 'pointer'
              }}
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
              style={{
                height: '34px',
                fontSize: '0.8rem',
                fontWeight: 500,
                padding: '0 0.75rem',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

          </div>
        </div>

        {/* Table Content */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '10px 18px', width: '60px', fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                  ID
                </th>
                <th style={{ padding: '10px 18px', fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                  Title & Reporter
                </th>
                <th style={{ padding: '10px 18px', fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                  Location & Department
                </th>
                <th style={{ padding: '10px 18px', fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                  Priority
                </th>
                <th style={{ padding: '10px 18px', minWidth: '160px', fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                  Lifecycle Status
                </th>
                <th style={{ padding: '10px 18px', textAlign: 'right', fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748B' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>No tickets found</div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Try adjusting your search query or filters.</div>
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue) => {
                  const isUpdating = updatingId === issue.id;

                  return (
                    <tr 
                      key={issue.id} 
                      style={{ 
                        borderBottom: '1px solid #F1F5F9', 
                        transition: 'background-color 0.12s ease',
                        opacity: isUpdating ? 0.6 : 1,
                        backgroundColor: '#ffffff'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    >
                      {/* Ticket ID */}
                      <td style={{ padding: '14px 18px', verticalAlign: 'middle' }}>
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-mono)', 
                            fontSize: '0.75rem', 
                            fontWeight: 700, 
                            color: '#64748B',
                            backgroundColor: '#F1F5F9',
                            padding: '3px 7px',
                            borderRadius: '6px'
                          }}
                        >
                          #{String(issue.id).padStart(2, '0')}
                        </span>
                      </td>

                      {/* Title & Reporter */}
                      <td style={{ padding: '14px 18px', verticalAlign: 'middle', maxWidth: '340px' }}>
                        <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: '2px', fontSize: '0.875rem' }}>
                          <Link 
                            to={`/issues/${issue.id}`} 
                            style={{ color: 'inherit', textDecoration: 'none' }}
                            onMouseEnter={(e) => e.target.style.color = '#004643'}
                            onMouseLeave={(e) => e.target.style.color = '#0F172A'}
                          >
                            {issue.title}
                          </Link>
                        </div>
                        <div style={{ fontSize: '0.775rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {issue.description || 'No description provided.'}
                        </div>
                        <div style={{ fontSize: '0.725rem', color: '#94A3B8', marginTop: '3px' }}>
                          Reported by <strong style={{ color: '#475569' }}>{formatReporterName(issue.reporter || issue.reportedBy)}</strong>
                        {issue.assignedTo && (
                          <span style={{ marginLeft: '6px', color: '#004643', fontWeight: 600, fontSize: '0.725rem' }}>
                            · Assigned: <strong>{issue.assignedTo}</strong>
                          </span>
                        )}
                        </div>
                      </td>

                      {/* Location & Dept */}
                      <td style={{ padding: '14px 18px', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500, color: '#334155', fontSize: '0.825rem' }}>
                          <MapPin size={13} style={{ color: '#94A3B8', flexShrink: 0 }} />
                          <span>{issue.location || 'Campus'}</span>
                        </div>
                        <div style={{ fontSize: '0.725rem', color: '#64748B', marginTop: '2px', paddingLeft: '17px' }}>
                          {issue.category || 'General'}
                        </div>
                      </td>

                      {/* Priority Pill */}
                      <td style={{ padding: '14px 18px', verticalAlign: 'middle' }}>
                        <PriorityPill priority={issue.priority || 'Low'} />
                      </td>

                      {/* Custom Aesthetic Status Pill Dropdown */}
                      <td style={{ padding: '14px 18px', verticalAlign: 'middle' }}>
                        <StatusPillDropdown 
                          status={issue.status}
                          isUpdating={isUpdating}
                          onChange={(newStatus) => handleStatusChange(issue.id, newStatus)}
                        />
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 18px', verticalAlign: 'middle', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <Link 
                            to={`/issues/${issue.id}`} 
                            style={{ 
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              color: '#64748B',
                              backgroundColor: 'transparent',
                              border: '1px solid #E2E8F0',
                              transition: 'all 0.15s ease',
                              textDecoration: 'none'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#F1F5F9';
                              e.currentTarget.style.color = '#004643';
                              e.currentTarget.style.borderColor = '#CBD5E1';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#64748B';
                              e.currentTarget.style.borderColor = '#E2E8F0';
                            }}
                            title="View Full Ticket Details"
                          >
                            <ExternalLink size={14} />
                          </Link>

                          <button
                            onClick={() => handleDelete(issue.id, issue.title)}
                            style={{ 
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              color: '#94A3B8',
                              backgroundColor: 'transparent',
                              border: '1px solid #E2E8F0',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFF1F2';
                              e.currentTarget.style.color = '#DC2626';
                              e.currentTarget.style.borderColor = '#FECDD3';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#94A3B8';
                              e.currentTarget.style.borderColor = '#E2E8F0';
                            }}
                            title="Delete Ticket"
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
