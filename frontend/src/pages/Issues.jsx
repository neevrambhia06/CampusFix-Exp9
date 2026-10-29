import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, LoadingState, ErrorState } from '../components/common/CommonComponents';
import IssueToolbar from '../components/issues/IssueToolbar';
import IssueGrid from '../components/issues/IssueGrid';
import IssueRow from '../components/issues/IssueRow';
import { useCampusFix } from '../context/CampusFixContext';
import { PlusCircle, Wrench, Layers } from 'lucide-react';
import { isAssignedToUser } from '../data/mockData';

export function Issues(props) {
  const context = useCampusFix();
  const navigate = useNavigate();

  const loading = props.loading !== undefined ? props.loading : context.loading;
  const error = props.error !== undefined ? props.error : context.error;
  const onRetry = props.onRetry || context.loadIssues;

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [scope, setScope] = useState('all'); // 'all' | 'assigned'

  const isTechnician = context.currentUser?.role === 'Technician';

  // Apply technician assigned scope filter if active
  const scopedIssues = useMemo(() => {
    let list = context.filteredIssues;
    if (isTechnician && scope === 'assigned') {
      list = list.filter((issue) => isAssignedToUser(issue.assignedTo, context.currentUser));
    }
    return list;
  }, [context.filteredIssues, isTechnician, scope, context.currentUser]);

  const issuesToDisplay = useMemo(() => {
    return [...scopedIssues].sort((a, b) => {
      if (sortBy === 'priority') {
        const pOrder = { High: 3, Medium: 2, Low: 1 };
        return (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0);
      }
      if (sortBy === 'oldest') {
        return String(a.id).localeCompare(String(b.id));
      }
      return String(b.id).localeCompare(String(a.id));
    });
  }, [scopedIssues, sortBy]);

  return (
    <div className="issues-page space-y">
      <PageHeader
        title="Campus Maintenance Issues"
        subtitle="Track, filter, and monitor reported problems across all campus blocks."
        action={
          <button
            onClick={() => navigate('/report')}
            className="btn btn-primary"
          >
            <PlusCircle size={18} />
            <span>+ Report Issue</span>
          </button>
        }
      />

      {/* Technician Scope Switch (Exp 10 RBAC) */}
      {isTechnician && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#F1F5F9',
          padding: '4px',
          borderRadius: '12px',
          width: 'fit-content',
          border: '1px solid #E2E8F0'
        }}>
          <button
            type="button"
            onClick={() => setScope('all')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: scope === 'all' ? '#004643' : 'transparent',
              color: scope === 'all' ? '#FFFFFF' : '#475569',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: scope === 'all' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Layers size={14} />
            <span>All Campus</span>
            <span style={{
              fontSize: '0.7rem',
              padding: '1px 6px',
              borderRadius: '9999px',
              backgroundColor: scope === 'all' ? 'rgba(255,255,255,0.2)' : '#E2E8F0',
              color: scope === 'all' ? '#FFFFFF' : '#475569'
            }}>
              {context.filteredIssues.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setScope('assigned')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: scope === 'assigned' ? '#004643' : 'transparent',
              color: scope === 'assigned' ? '#FFFFFF' : '#475569',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: scope === 'assigned' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Wrench size={14} />
            <span>My Assigned</span>
            <span style={{
              fontSize: '0.7rem',
              padding: '1px 6px',
              borderRadius: '9999px',
              backgroundColor: scope === 'assigned' ? 'rgba(255,255,255,0.2)' : '#E2E8F0',
              color: scope === 'assigned' ? '#FFFFFF' : '#475569'
            }}>
              {context.filteredIssues.filter(i => isAssignedToUser(i.assignedTo, context.currentUser)).length}
            </span>
          </button>
        </div>
      )}

      <IssueToolbar
        searchTerm={context.searchTerm}
        onSearchChange={(e) => context.setSearchTerm(e.target.value)}
        categoryFilter={context.selectedCategory}
        onCategoryChange={(e) => context.setSelectedCategory(e.target.value)}
        priorityFilter={context.selectedPriority}
        onPriorityChange={(e) => context.setSelectedPriority(e.target.value)}
        statusFilter={context.selectedStatus}
        onStatusChange={(e) => context.setSelectedStatus(e.target.value)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortChange={(e) => setSortBy(e.target.value)}
      />

      {loading && issuesToDisplay.length === 0 && (
        <LoadingState message="Loading campus issues..." />
      )}

      {!loading && error && issuesToDisplay.length === 0 && (
        <ErrorState
          message="Unable to connect to Fixora API."
          onRetry={onRetry}
        />
      )}

      {!loading && !error && issuesToDisplay.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3 className="empty-title">No issues match your filters.</h3>
          <p className="empty-description">
            Try adjusting your search terms or filter selections.
          </p>
        </div>
      )}

      {issuesToDisplay.length > 0 && (
        viewMode === 'grid' ? (
          <IssueGrid
            issues={issuesToDisplay}
            onStatusChange={(id, newStatus) => context.patchIssue(id, { status: newStatus })}
            onDelete={(id) => {
              if (window.confirm(`Are you sure you want to delete Issue #${id}?`)) {
                context.deleteIssue(id);
              }
            }}
          />
        ) : (
          <div className="issue-table-container">
            <table className="issue-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title & Reporter</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {issuesToDisplay.map((issue) => (
                  <IssueRow
                    key={issue.id}
                    issue={issue}
                    onStatusChange={(id, newStatus) => context.patchIssue(id, { status: newStatus })}
                    onDelete={(id) => {
                      if (window.confirm(`Are you sure you want to delete Issue #${id}?`)) {
                        context.deleteIssue(id);
                      }
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}

export default Issues;

