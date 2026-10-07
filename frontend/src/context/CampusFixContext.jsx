import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { user as initialUser, mockIssues } from '../data/mockData';
import { 
  getIssues, 
  getIssue, 
  createIssue, 
  updateIssue, 
  patchIssue, 
  deleteIssue 
} from '../services/issueService';

// 1. Create Context
export const CampusFixContext = createContext(null);

// 2. Provider Component
export function CampusFixProvider({ children }) {
  // Application Data & Auth State
  const [issues, setIssues] = useState([]);
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [selectedIssue, setSelectedIssue] = useState(null);
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Status & Connectivity State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('api'); // 'api' or 'mock'

  // Load Issues Action (GET /issues)
  const loadIssues = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getIssues();
      setIssues(data);
      setDataSource('api');
    } catch (err) {
      console.warn('REST API unavailable. Falling back to mockData.js:', err.message);
      setError('Unable to connect to CampusFix API. Showing cached mock data.');
      setIssues(mockIssues);
      setDataSource('mock');
    } finally {
      setLoading(false);
    }
  };

  // Initial Load with useEffect
  useEffect(() => {
    loadIssues();
  }, []);

  // Action: Add Issue (POST /issues)
  const addIssue = async (newIssueData) => {
    setError(null);
    try {
      if (dataSource === 'api') {
        const created = await createIssue(newIssueData);
        setIssues((prev) => [created, ...prev]);
        return created;
      } else {
        const fallback = { ...newIssueData, id: String(Date.now()) };
        setIssues((prev) => [fallback, ...prev]);
        return fallback;
      }
    } catch (err) {
      console.error('API create issue failed:', err);
      setError(`Failed to create issue on server: ${err.message}`);
      const fallback = { ...newIssueData, id: String(Date.now()) };
      setIssues((prev) => [fallback, ...prev]);
      return fallback;
    }
  };

  // Action: Update Issue (PUT /issues/:id)
  const handleUpdateIssue = async (id, updatedIssueData) => {
    try {
      if (dataSource === 'api') {
        const updated = await updateIssue(id, updatedIssueData);
        setIssues((prev) => prev.map((item) => (String(item.id) === String(id) ? updated : item)));
        if (selectedIssue && String(selectedIssue.id) === String(id)) {
          setSelectedIssue(updated);
        }
      } else {
        setIssues((prev) =>
          prev.map((item) => (String(item.id) === String(id) ? { ...item, ...updatedIssueData } : item))
        );
      }
    } catch (err) {
      console.error('API update failed:', err);
      setError(`Failed to replace issue: ${err.message}`);
    }
  };

  // Action: Patch Issue (PATCH /issues/:id)
  const handlePatchIssue = async (id, patchData) => {
    try {
      if (dataSource === 'api') {
        const patched = await patchIssue(id, patchData);
        setIssues((prev) =>
          prev.map((item) => (String(item.id) === String(id) ? { ...item, ...patched } : item))
        );
        if (selectedIssue && String(selectedIssue.id) === String(id)) {
          setSelectedIssue((prev) => ({ ...prev, ...patched }));
        }
      } else {
        setIssues((prev) =>
          prev.map((item) => (String(item.id) === String(id) ? { ...item, ...patchData } : item))
        );
      }
    } catch (err) {
      console.error('API patch status failed:', err);
      setIssues((prev) =>
        prev.map((item) => (String(item.id) === String(id) ? { ...item, ...patchData } : item))
      );
    }
  };

  // Action: Delete Issue (DELETE /issues/:id)
  const handleDeleteIssue = async (id) => {
    try {
      if (dataSource === 'api') {
        await deleteIssue(id);
      }
      setIssues((prev) => prev.filter((item) => String(item.id) !== String(id)));
      if (selectedIssue && String(selectedIssue.id) === String(id)) {
        setSelectedIssue(null);
      }
    } catch (err) {
      console.error('API delete failed:', err);
      setIssues((prev) => prev.filter((item) => String(item.id) !== String(id)));
    }
  };

  // Fetch single issue details
  const fetchSingleIssue = async (id) => {
    try {
      const issue = await getIssue(id);
      setSelectedIssue(issue);
      return issue;
    } catch (err) {
      console.warn(`Could not fetch issue #${id} from API, finding in local state:`, err.message);
      const found = issues.find((i) => String(i.id) === String(id));
      if (found) setSelectedIssue(found);
      return found;
    }
  };

  // Derived Filtered Issues (non-mutating)
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const titleText = (issue.title || '').toLowerCase();
      const descText = (issue.description || '').toLowerCase();
      const locText = (issue.location || '').toLowerCase();
      const reporterText = (issue.reporter || issue.reportedBy || '').toLowerCase();
      const query = searchTerm.toLowerCase();

      const matchesSearch =
        !searchTerm ||
        titleText.includes(query) ||
        descText.includes(query) ||
        locText.includes(query) ||
        reporterText.includes(query);

      const matchesCategory =
        selectedCategory === 'All' || issue.category === selectedCategory;

      const matchesPriority =
        selectedPriority === 'All' || issue.priority === selectedPriority;

      const matchesStatus =
        selectedStatus === 'All' || issue.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });
  }, [issues, searchTerm, selectedCategory, selectedPriority, selectedStatus]);

  // Dynamic Dashboard Statistics derived from issues state
  const stats = useMemo(() => {
    const totalIssues = issues.length;
    const reportedIssues = issues.filter((i) => i.status === 'Reported').length;
    const inProgressIssues = issues.filter((i) => i.status === 'In Progress').length;
    const resolvedIssues = issues.filter((i) => i.status === 'Resolved').length;
    const highPriorityIssues = issues.filter((i) => i.priority === 'High').length;

    return {
      totalIssues,
      reportedIssues,
      inProgressIssues,
      resolvedIssues,
      highPriorityIssues,
    };
  }, [issues]);

  const value = {
    // State Values
    issues,
    filteredIssues,
    currentUser,
    setCurrentUser,
    selectedIssue,
    setSelectedIssue,
    searchTerm,
    selectedCategory,
    selectedPriority,
    selectedStatus,
    loading,
    error,
    dataSource,
    stats,

    // Actions & Setters
    loadIssues,
    addIssue,
    updateIssue: handleUpdateIssue,
    patchIssue: handlePatchIssue,
    deleteIssue: handleDeleteIssue,
    fetchSingleIssue,
    setSearchTerm,
    setSelectedCategory,
    setSelectedPriority,
    setSelectedStatus,
    setDataSource,
  };

  return (
    <CampusFixContext.Provider value={value}>
      {children}
    </CampusFixContext.Provider>
  );
}

// Custom Hook to consume Context
export function useCampusFix() {
  const context = useContext(CampusFixContext);
  if (!context) {
    throw new Error('useCampusFix must be used within a CampusFixProvider');
  }
  return context;
}

export default CampusFixContext;
