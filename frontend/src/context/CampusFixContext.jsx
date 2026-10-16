import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  getIssues, 
  getIssue, 
  createIssue, 
  updateIssue, 
  patchIssue, 
  deleteIssue,
  loginAdmin
} from '../services/issueService';

// 1. Create Context
export const CampusFixContext = createContext(null);

// 2. Provider Component
export function CampusFixProvider({ children }) {
  // Application Data & Auth State
  const [issues, setIssues] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('campusfix_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [selectedIssue, setSelectedIssue] = useState(null);
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Status & Connectivity State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataSource = 'api'; // Always connected directly to API database

  // Admin status helper
  const isAdmin = useMemo(() => currentUser?.role === 'Admin', [currentUser]);

  // Retrieve registered user accounts from localStorage
  const getRegisteredUsers = () => {
    try {
      const saved = localStorage.getItem('campusfix_registered_users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  // Auth Action: Standard Login (Checks local registered users first, then API)
  const login = async (identifier, password) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // 1. Check local registered student/staff directory
    const registeredUsers = getRegisteredUsers();
    const matched = registeredUsers.find(
      (u) =>
        (u.email?.toLowerCase() === cleanId ||
          u.rollNo?.toLowerCase() === cleanId ||
          u.username?.toLowerCase() === cleanId) &&
        u.password === cleanPass
    );

    if (matched) {
      const sessionUser = { ...matched };
      delete sessionUser.password;
      setCurrentUser(sessionUser);
      localStorage.setItem('campusfix_user', JSON.stringify(sessionUser));
      localStorage.setItem('campusfix_token', `usr_${Date.now()}`);
      return sessionUser;
    }

    // 2. Authenticate against Spring Boot API database
    const res = await loginAdmin(identifier, password);
    if (res && res.user) {
      setCurrentUser(res.user);
      localStorage.setItem('campusfix_user', JSON.stringify(res.user));
      if (res.token) localStorage.setItem('campusfix_token', res.token);
      return res.user;
    }
    throw new Error('Authentication failed: Invalid credentials.');
  };

  // Auth Action: Register genuine student or staff member
  const register = async (userData) => {
    const registeredUsers = getRegisteredUsers();

    const exists = registeredUsers.some(
      (u) =>
        u.email?.toLowerCase() === userData.email.trim().toLowerCase() ||
        (userData.rollNo && u.rollNo?.toLowerCase() === userData.rollNo.trim().toLowerCase())
    );

    if (exists) {
      throw new Error('An account with this institutional email or roll number already exists.');
    }

    const newUser = {
      id: userData.rollNo ? userData.rollNo.trim().toUpperCase() : `STU-${Date.now().toString().slice(-4)}`,
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      rollNo: userData.rollNo ? userData.rollNo.trim().toUpperCase() : '',
      department: userData.department || 'Computer Science & Engg.',
      role: userData.role || 'Student',
      avatar: userData.avatar || userData.name.trim().charAt(0).toUpperCase(),
      authProvider: 'credentials',
      password: userData.password,
      createdAt: new Date().toISOString(),
    };

    registeredUsers.push(newUser);
    localStorage.setItem('campusfix_registered_users', JSON.stringify(registeredUsers));

    const sessionUser = { ...newUser };
    delete sessionUser.password;
    setCurrentUser(sessionUser);
    localStorage.setItem('campusfix_user', JSON.stringify(sessionUser));
    localStorage.setItem('campusfix_token', `stu_${Date.now()}`);

    return sessionUser;
  };

  // Auth Action: Authenticate with Google
  const loginWithGoogle = async (googleData) => {
    const sessionUser = {
      id: googleData.rollNo ? googleData.rollNo.trim().toUpperCase() : `GGL-${Date.now().toString().slice(-4)}`,
      name: googleData.name.trim(),
      email: googleData.email.trim().toLowerCase(),
      rollNo: googleData.rollNo ? googleData.rollNo.trim().toUpperCase() : 'G-VERIFIED',
      department: googleData.department || 'Computer Science & Engg.',
      role: googleData.role || 'Student',
      avatar: googleData.picture || googleData.name.trim().charAt(0).toUpperCase(),
      authProvider: 'google',
      verified: true,
      lastLogin: new Date().toISOString(),
    };

    setCurrentUser(sessionUser);
    localStorage.setItem('campusfix_user', JSON.stringify(sessionUser));
    localStorage.setItem('campusfix_token', `ggl_${Date.now()}`);

    return sessionUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('campusfix_user');
    localStorage.removeItem('campusfix_token');
  };

  // Load Issues Action (GET /issues) — directly from API database
  const loadIssues = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getIssues();
      setIssues(data);
    } catch (err) {
      console.error('API load failed:', err.message);
      setError('Unable to connect to Fixora API database. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  // Initial Load with useEffect
  useEffect(() => {
    loadIssues();
  }, []);

  // Action: Add Issue (POST /issues) — directly to API database
  const addIssue = async (newIssueData) => {
    setError(null);
    try {
      const created = await createIssue(newIssueData);
      setIssues((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      console.error('API create issue failed:', err);
      setError(`Failed to create issue on database: ${err.message}`);
      throw err;
    }
  };

  // Action: Update Issue (PUT /issues/:id) — directly to API database
  const handleUpdateIssue = async (id, updatedIssueData) => {
    try {
      const updated = await updateIssue(id, updatedIssueData);
      setIssues((prev) => prev.map((item) => (String(item.id) === String(id) ? updated : item)));
      if (selectedIssue && String(selectedIssue.id) === String(id)) {
        setSelectedIssue(updated);
      }
      return updated;
    } catch (err) {
      console.error('API update failed:', err);
      setError(`Failed to update issue: ${err.message}`);
      throw err;
    }
  };

  // Action: Patch Issue (PATCH /issues/:id) — directly to API database
  const handlePatchIssue = async (id, patchData) => {
    try {
      const patched = await patchIssue(id, patchData);
      setIssues((prev) =>
        prev.map((item) => (String(item.id) === String(id) ? { ...item, ...patched } : item))
      );
      if (selectedIssue && String(selectedIssue.id) === String(id)) {
        setSelectedIssue((prev) => ({ ...prev, ...patched }));
      }
      return patched;
    } catch (err) {
      console.error('API patch status failed:', err);
      setError(`Failed to update status: ${err.message}`);
      throw err;
    }
  };

  // Action: Delete Issue (DELETE /issues/:id) — directly from API database
  const handleDeleteIssue = async (id) => {
    try {
      await deleteIssue(id);
      setIssues((prev) => prev.filter((item) => String(item.id) !== String(id)));
      if (selectedIssue && String(selectedIssue.id) === String(id)) {
        setSelectedIssue(null);
      }
    } catch (err) {
      console.error('API delete failed:', err);
      setError(`Failed to delete issue: ${err.message}`);
      throw err;
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
    isAdmin,
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
    login,
    register,
    loginWithGoogle,
    getRegisteredUsers,
    logout,
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
    setDataSource: () => {},
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
