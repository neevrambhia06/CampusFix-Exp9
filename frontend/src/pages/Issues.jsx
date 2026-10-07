import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, LoadingState, ErrorState } from '../components/common/CommonComponents';
import IssueToolbar from '../components/issues/IssueToolbar';
import IssueGrid from '../components/issues/IssueGrid';
import IssueRow from '../components/issues/IssueRow';
import { useCampusFix } from '../context/CampusFixContext';
import { PlusCircle } from 'lucide-react';

export function Issues(props) {
  const context = useCampusFix();
  const navigate = useNavigate();

  const loading = props.loading !== undefined ? props.loading : context.loading;
  const error = props.error !== undefined ? props.error : context.error;
  const onRetry = props.onRetry || context.loadIssues;
  const onSwitchMock = props.onSwitchMock || (() => {
    context.setDataSource('mock');
  });

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  const issuesToDisplay = [...context.filteredIssues].sort((a, b) => {
    if (sortBy === 'priority') {
      const pOrder = { High: 3, Medium: 2, Low: 1 };
      return (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0);
    }
    if (sortBy === 'oldest') {
      return String(a.id).localeCompare(String(b.id));
    }
    return String(b.id).localeCompare(String(a.id));
  });

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

      {loading && <LoadingState message="Loading campus issues..." />}

      {!loading && error && (
        <ErrorState
          message="Unable to connect to CampusFix API."
          onRetry={onRetry}
          onSwitchMock={onSwitchMock}
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

      {!loading && !error && issuesToDisplay.length > 0 && (
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

