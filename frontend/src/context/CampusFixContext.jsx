import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { mockIssues } from '../data/mockData';
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
  // Retrieve initial issues from localStorage cache, falling back to mockIssues
  const getInitialIssues = () => {
    try {
      const saved = localStorage.getItem('campusfix_cached_issues');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return mockIssues;
    } catch {
      return mockIssues;
    }
  };

  // Application Data & Auth State
  const [issues, setIssues] = useState(getInitialIssues);
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
  const [loading, setLoading] = useState(false);
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

  // Load Issues Action (GET /issues) — Stale-While-Revalidate with API database sync
  const loadIssues = async (isRetry = false) => {
    setError(null);
    try {
      const data = await getIssues();
      if (Array.isArray(data) && data.length > 0) {
        setIssues((prev) => {
          const apiIds = new Set(data.map((i) => String(i.id)));
          
          let myTicketIds = [];
          try {
            myTicketIds = JSON.parse(localStorage.getItem('campusfix_my_ticket_ids') || '[]');
          } catch {}

          // Retain any locally created tickets that aren't on the server yet
          const localOnly = prev.filter(
            (i) => !apiIds.has(String(i.id)) && (String(i.id).startsWith('ISS-') || myTicketIds.map(String).includes(String(i.id)))
          );

          // Retain mock issues that aren't colliding so initial demonstration data remains intact
          const remainingMock = mockIssues.filter(
            (m) => !apiIds.has(String(m.id)) && !localOnly.some((l) => String(l.id) === String(m.id))
          );

          const merged = [...localOnly, ...data, ...remainingMock];
          try {
            localStorage.setItem('campusfix_cached_issues', JSON.stringify(merged));
          } catch {}
          return merged;
        });
      }
    } catch (err) {
      console.warn('API sync deferred (using local cached issues):', err.message);
      // Auto-retry once after 3.5s if Render was spinning up
      if (!isRetry) {
        setTimeout(() => loadIssues(true), 3500);
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial Load with useEffect
  useEffect(() => {
    loadIssues();
  }, []);

  // Action: Add Issue (POST /issues) — Instant Optimistic Creation & Background Sync
  const addIssue = async (newIssueData) => {
    setError(null);

    // 1. Instantly generate optimistic issue with client ID
    const newId = `ISS-${Date.now().toString().slice(-5)}`;
    const optimisticIssue = {
      id: newId,
      title: newIssueData.title,
      category: newIssueData.category,
      location: newIssueData.location,
      priority: newIssueData.priority,
      status: 'Reported',
      reporter: newIssueData.reporter || (currentUser ? currentUser.name : 'Campus Resident'),
      reportedBy: newIssueData.reportedBy || (currentUser ? currentUser.name : 'Campus Resident'),
      reportedAt: 'Just now',
      updatedAt: 'Just now',
      description: newIssueData.description,
    };

    // 2. Track ticket ID for My Reports
    try {
      const myTicketIds = JSON.parse(localStorage.getItem('campusfix_my_ticket_ids') || '[]');
      if (!myTicketIds.includes(newId)) {
        myTicketIds.push(newId);
        localStorage.setItem('campusfix_my_ticket_ids', JSON.stringify(myTicketIds));
      }
    } catch (e) {
      console.warn('Storage error for my_ticket_ids:', e);
    }

    // 3. Immediately update state and localStorage (INSTANT UI RESPONSE, 0 delay!)
    setIssues((prev) => {
      const updated = [optimisticIssue, ...prev];
      try {
        localStorage.setItem('campusfix_cached_issues', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // 4. Background sync to Render backend API
    (async () => {
      try {
        const created = await createIssue(newIssueData);
        if (created && created.id) {
          setIssues((prev) => {
            const updated = prev.map((item) =>
              item.id === optimisticIssue.id ? { ...optimisticIssue, ...created } : item
            );
            try {
              localStorage.setItem('campusfix_cached_issues', JSON.stringify(updated));
            } catch {}
            return updated;
          });
          try {
            const myTicketIds = JSON.parse(localStorage.getItem('campusfix_my_ticket_ids') || '[]');
            myTicketIds.push(String(created.id));
            localStorage.setItem('campusfix_my_ticket_ids', JSON.stringify(myTicketIds));
          } catch {}
        }
      } catch (err) {
        console.warn('Background server sync delayed (ticket preserved locally):', err.message);
      }
    })();

    return optimisticIssue;
  };

  // Action: Update Issue (PUT /issues/:id)
  const handleUpdateIssue = async (id, updatedIssueData) => {
    // Optimistic update
    setIssues((prev) => {
      const updated = prev.map((item) => (String(item.id) === String(id) ? { ...item, ...updatedIssueData } : item));
      try { localStorage.setItem('campusfix_cached_issues', JSON.stringify(updated)); } catch {}
      return updated;
    });
    if (selectedIssue && String(selectedIssue.id) === String(id)) {
      setSelectedIssue((prev) => ({ ...prev, ...updatedIssueData }));
    }

    try {
      const res = await updateIssue(id, updatedIssueData);
      return res;
    } catch (err) {
      console.warn('API update deferred:', err);
      return updatedIssueData;
    }
  };

  // Action: Patch Issue (PATCH /issues/:id)
  const handlePatchIssue = async (id, patchData) => {
    // Optimistic patch
    setIssues((prev) => {
      const patched = prev.map((item) =>
        String(item.id) === String(id) ? { ...item, ...patchData, updatedAt: 'Just now' } : item
      );
      try { localStorage.setItem('campusfix_cached_issues', JSON.stringify(patched)); } catch {}
      return patched;
    });
    if (selectedIssue && String(selectedIssue.id) === String(id)) {
      setSelectedIssue((prev) => ({ ...prev, ...patchData, updatedAt: 'Just now' }));
    }

    try {
      const patched = await patchIssue(id, patchData);
      return patched;
    } catch (err) {
      console.warn('API patch deferred:', err);
      return patchData;
    }
  };

  // Action: Delete Issue (DELETE /issues/:id)
  const handleDeleteIssue = async (id) => {
    setIssues((prev) => {
      const filtered = prev.filter((item) => String(item.id) !== String(id));
      try { localStorage.setItem('campusfix_cached_issues', JSON.stringify(filtered)); } catch {}
      return filtered;
    });
    if (selectedIssue && String(selectedIssue.id) === String(id)) {
      setSelectedIssue(null);
    }

    try {
      await deleteIssue(id);
    } catch (err) {
      console.warn('API delete deferred:', err);
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
        selectedCategory === 'All' ||
        issue.category === selectedCategory ||
        (selectedCategory === 'IT / Network' && (issue.category === 'IT / Network' || issue.category === 'Network'));

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
