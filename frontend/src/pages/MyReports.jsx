import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageHeader, EmptyState } from '../components/common/CommonComponents';
import IssueCard from '../components/issues/IssueCard';
import { useCampusFix } from '../context/CampusFixContext';
import { 
  PlusCircle, 
  FileText, 
  Layers, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search,
  Filter,
  UserCheck,
  Building2
} from 'lucide-react';

export function MyReports(props) {
  const context = useCampusFix();
  const navigate = useNavigate();

  const user = props.user || context.currentUser;
  const issues = props.issues || context.issues;

  // Retrieve tracked ticket IDs submitted from this browser/device
  const myTicketIds = useMemo(() => {
    try {
      const saved = localStorage.getItem('campusfix_my_ticket_ids');
      return saved ? JSON.parse(saved).map(String) : [];
    } catch {
      return [];
    }
  }, []);

  const userName = (user?.name || '').toLowerCase().trim();
  const userEmail = (user?.email || '').toLowerCase().trim();

  // Filter issues belonging to the current user or device
  const myIssues = useMemo(() => {
    return issues.filter((i) => {
      // 1. Check if ID matches a ticket submitted from this browser
      if (myTicketIds.includes(String(i.id))) return true;

      // 2. Check if reporter matches user's name or email
      const rep = (i.reporter || i.reportedBy || '').toLowerCase().trim();
      if (!rep) return false;

      if (userName && (rep === userName || rep.includes(userName) || userName.includes(rep))) {
        return true;
      }

      if (userEmail && (rep.includes(userEmail) || userEmail.includes(rep))) {
        return true;
      }

      return false;
    });
  }, [issues, myTicketIds, userName, userEmail]);

  // Tab State: 'my' (My Tickets) vs 'all' (All Campus Tickets)
  // If user has zero personal tickets, default to 'all' so they can immediately see all existing campus issues!
  const [activeTab, setActiveTab] = useState(() => {
    return myIssues.length > 0 ? 'my' : 'all';
  });

  // Filter & Search states within Reports
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Active dataset depending on selected tab
  const activeDataset = activeTab === 'my' ? myIssues : issues;

  // Apply status and search filtering to active dataset
  const displayedIssues = useMemo(() => {
    return activeDataset.filter((i) => {
      const isResolved = (i.status || '').toLowerCase() === 'resolved';
      const matchesStatus = statusFilter === 'All' 
        ? !isResolved 
        : (i.status || '').toLowerCase() === statusFilter.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (i.title || '').toLowerCase().includes(q) ||
        (i.location || '').toLowerCase().includes(q) ||
        (i.category || '').toLowerCase().includes(q) ||
        (i.reporter || i.reportedBy || '').toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [activeDataset, statusFilter, searchQuery]);

  // Statistics for active dataset
  const total = activeDataset.length;
  const pending = activeDataset.filter((i) => i.status === 'Reported').length;
  const inProgress = activeDataset.filter((i) => i.status === 'In Progress').length;
  const resolved = activeDataset.filter((i) => i.status === 'Resolved').length;

  return (
    <div className="my-reports-page space-y">
      <PageHeader
        title="Maintenance Reports & Ticket Tracker"
        subtitle={
          user
            ? `Track the live resolution status and technician updates for campus issues logged by ${user.name}.`
            : 'Track the live resolution status and technician updates for campus maintenance issues.'
        }
        action={
          <button
            onClick={() => navigate('/report')}
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <PlusCircle size={18} />
            <span>+ Report New Issue</span>
          </button>
        }
      />

      {/* Guest Mode Banner (if not logged in) */}
      {!user && (
        <div
          style={{
            padding: '0.85rem 1.25rem',
            borderRadius: '12px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.85rem',
            color: '#475569',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} style={{ color: '#004643', flexShrink: 0 }} />
            <span>
              You are viewing in <strong>Guest Mode</strong>. Tickets submitted from this browser are automatically tracked below.
            </span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-sm btn-secondary"
            style={{ fontSize: '0.8rem', padding: '4px 10px' }}
          >
            Sign In to Fixora
          </button>
        </div>
      )}

      {/* View Switcher Tabs: My Tickets vs All Campus Issues */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#F1F5F9', padding: '4px', borderRadius: '12px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('my')}
            style={{
              padding: '8px 16px',
              borderRadius: '9px',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: activeTab === 'my' ? '#004643' : 'transparent',
              color: activeTab === 'my' ? '#FFFFFF' : '#64748B',
              boxShadow: activeTab === 'my' ? '0 2px 6px rgba(0, 70, 67, 0.2)' : 'none',
            }}
          >
            <UserCheck size={15} />
            <span>My Reported Tickets ({myIssues.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('all')}
            style={{
              padding: '8px 16px',
              borderRadius: '9px',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: activeTab === 'all' ? '#004643' : 'transparent',
              color: activeTab === 'all' ? '#FFFFFF' : '#64748B',
              boxShadow: activeTab === 'all' ? '0 2px 6px rgba(0, 70, 67, 0.2)' : 'none',
            }}
          >
            <Layers size={15} />
            <span>All Campus Issues ({issues.length})</span>
          </button>
        </div>

        {/* Quick Search & Status Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '6px 10px 6px 30px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                fontSize: '0.8rem',
                color: '#0F172A',
                backgroundColor: '#ffffff',
                outline: 'none',
                width: '180px',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {['All', 'Reported', 'In Progress', 'Resolved'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: statusFilter === st ? '1px solid #004643' : '1px solid #E2E8F0',
                  backgroundColor: statusFilter === st ? '#E6F2F1' : '#FFFFFF',
                  color: statusFilter === st ? '#004643' : '#64748B',
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Metric Cards */}
      <div className="my-reports-stats-grid">
        <div className="my-stat-card">
          <span className="stat-label">{activeTab === 'my' ? 'My Reported' : 'Total Campus'}</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="my-stat-card amber">
          <span className="stat-label">Pending / Reported</span>
          <span className="stat-value">{pending}</span>
        </div>
        <div className="my-stat-card blue">
          <span className="stat-label">In Progress</span>
          <span className="stat-value">{inProgress}</span>
        </div>
        <div className="my-stat-card green">
          <span className="stat-label">Resolved</span>
          <span className="stat-value">{resolved}</span>
        </div>
      </div>

      {/* Main Issues Listing */}
      {displayedIssues.length === 0 ? (
        activeTab === 'my' ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '2px dashed #E2E8F0',
              padding: '3.5rem 2rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: '#64748B',
              }}
            >
              <FileText size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
              No Personal Tickets Found
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.875rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
              {user
                ? `You haven't logged any personal maintenance issues under ${user.name} yet.`
                : 'No tickets have been reported from this device yet.'} All campus reports ({issues.length}) are available to inspect.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/report')} className="btn btn-primary">
                <PlusCircle size={16} />
                <span>Report an Issue</span>
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className="btn btn-secondary"
              >
                <span>View All Campus Issues ({issues.length})</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '2px dashed #E2E8F0',
              padding: '3.5rem 2rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: '#64748B',
              }}
            >
              <Layers size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
              No Campus Issues Match Your Criteria
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.875rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
              Try adjusting your search query or reset the status filter to view all tickets.
            </p>
            <button
              onClick={() => {
                setStatusFilter('All');
                setSearchQuery('');
              }}
              className="btn btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )
      ) : (
        <div className="issue-grid-saas">
          {displayedIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onStatusChange={props.onStatusChange}
              onDelete={props.onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReports;
