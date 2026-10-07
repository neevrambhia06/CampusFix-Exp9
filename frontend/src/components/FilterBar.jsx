import React from 'react';
import { useCampusFix } from '../context/CampusFixContext';

export function FilterBar(props) {
  const context = useCampusFix();

  const searchTerm = props.searchTerm !== undefined ? props.searchTerm : context.searchTerm;
  const onSearchChange = props.onSearchChange || ((e) => context.setSearchTerm(e.target.value));

  const categoryFilter = props.categoryFilter !== undefined ? props.categoryFilter : (props.selectedCategory !== undefined ? props.selectedCategory : context.selectedCategory);
  const onCategoryChange = props.onCategoryChange || props.setSelectedCategory || ((e) => context.setSelectedCategory(e.target.value));

  const priorityFilter = props.priorityFilter !== undefined ? props.priorityFilter : (props.selectedPriority !== undefined ? props.selectedPriority : context.selectedPriority);
  const onPriorityChange = props.onPriorityChange || props.setSelectedPriority || ((e) => context.setSelectedPriority(e.target.value));

  const statusFilter = props.statusFilter !== undefined ? props.statusFilter : (props.selectedStatus !== undefined ? props.selectedStatus : context.selectedStatus);
  const onStatusChange = props.onStatusChange || props.setSelectedStatus || ((e) => context.setSelectedStatus(e.target.value));

  return (
    <div className="filter-bar">
      <div className="filter-group search-group">
        <label htmlFor="search-issues" className="filter-label">Search Issues</label>
        <input
          id="search-issues"
          type="text"
          placeholder="Search by title, description, location, or reportedBy..."
          value={searchTerm || ''}
          onChange={onSearchChange}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="category-select" className="filter-label">Category</label>
        <select
          id="category-select"
          value={categoryFilter || 'All'}
          onChange={onCategoryChange}
          className="filter-select"
        >
          <option value="All">All Categories</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Furniture">Furniture</option>
          <option value="Cleanliness">Cleanliness</option>
          <option value="IT / Network">IT / Network</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority-select" className="filter-label">Priority</label>
        <select
          id="priority-select"
          value={priorityFilter || 'All'}
          onChange={onPriorityChange}
          className="filter-select"
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status-select" className="filter-label">Status</label>
        <select
          id="status-select"
          value={statusFilter || 'All'}
          onChange={onStatusChange}
          className="filter-select"
        >
          <option value="All">All Statuses</option>
          <option value="Reported">Reported</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;

