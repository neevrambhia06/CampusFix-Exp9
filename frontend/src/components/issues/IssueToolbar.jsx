import React from 'react';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';

export function IssueToolbar(props) {
  const { 
    searchTerm, 
    onSearchChange, 
    categoryFilter, 
    onCategoryChange, 
    priorityFilter, 
    onPriorityChange, 
    statusFilter, 
    onStatusChange,
    viewMode,
    onViewModeChange,
    sortBy,
    onSortChange
  } = props;

  return (
    <div className="issue-toolbar-saas">
      {/* Search Field */}
      <div className="toolbar-search-wrapper">
        <Search size={16} className="toolbar-search-icon" />
        <input
          type="text"
          placeholder="Search issues by title, location or description..."
          value={searchTerm || ''}
          onChange={onSearchChange}
          className="toolbar-search-input"
        />
      </div>

      {/* Filter Selects */}
      <div className="toolbar-filters-group">
        <div className="select-with-label">
          <label className="select-label">Category</label>
          <select
            value={categoryFilter || 'All'}
            onChange={onCategoryChange}
            className="toolbar-select"
          >
            <option value="All">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="IT / Network">IT / Network</option>
            <option value="Electronics">Electronics</option>
            <option value="Electrical">Electrical</option>
            <option value="Furniture">Furniture</option>
            <option value="Facilities">Facilities</option>
          </select>
        </div>

        <div className="select-with-label">
          <label className="select-label">Priority</label>
          <select
            value={priorityFilter || 'All'}
            onChange={onPriorityChange}
            className="toolbar-select"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="select-with-label">
          <label className="select-label">Status</label>
          <select
            value={statusFilter || 'All'}
            onChange={onStatusChange}
            className="toolbar-select"
          >
            <option value="All">All Statuses</option>
            <option value="Reported">Reported</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {onSortChange && (
          <div className="select-with-label">
            <label className="select-label">Sort By</label>
            <select
              value={sortBy || 'newest'}
              onChange={onSortChange}
              className="toolbar-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">Highest Priority</option>
            </select>
          </div>
        )}

        {/* Grid/List View Controls */}
        {onViewModeChange && (
          <div className="view-toggle-buttons">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default IssueToolbar;
