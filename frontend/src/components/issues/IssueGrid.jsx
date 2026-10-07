import React from 'react';
import IssueCard from './IssueCard';
import { EmptyState } from '../common/CommonComponents';
import { FileQuestion } from 'lucide-react';

export function IssueGrid(props) {
  const { issues, onStatusChange, onDelete } = props;

  // Conditional Rendering: Empty State
  if (!issues || issues.length === 0) {
    return (
      <EmptyState
        icon={FileQuestion}
        title="No Campus Issues Found"
        description="There are no active maintenance tickets matching your search query or filter controls."
      />
    );
  }

  return (
    <div className="issue-grid-saas">
      {/* Rendering lists with map() - Unique key is mandatory */}
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default IssueGrid;
