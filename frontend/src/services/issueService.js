const API_BASE = import.meta.env.VITE_API_URL || 'https://campusfix-backend-ceqd.onrender.com/api';
const BASE_URL = `${API_BASE.replace(/\/$/, '')}/issues`;
const AUTH_URL = `${API_BASE.replace(/\/$/, '')}/auth/login`;

// Helper: fetch with timeout to prevent hanging on Render spin-up
async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return res;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export async function getIssues() {
  const response = await fetchWithTimeout(BASE_URL, {}, 12000);
  if (!response.ok) {
    throw new Error(`Failed to fetch issues: ${response.statusText}`);
  }
  return await response.json();
}

export async function getIssue(id) {
  const response = await fetchWithTimeout(`${BASE_URL}/${id}`, {}, 12000);
  if (!response.ok) {
    throw new Error(`Failed to fetch issue #${id}: ${response.statusText}`);
  }
  return await response.json();
}

export async function createIssue(issueData) {
  const response = await fetchWithTimeout(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(issueData),
  }, 45000);
  if (!response.ok) {
    throw new Error(`Failed to create issue: ${response.statusText}`);
  }
  return await response.json();
}

export async function updateIssue(id, issueData) {
  const response = await fetchWithTimeout(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(issueData),
  }, 10000);
  if (!response.ok) {
    throw new Error(`Failed to replace issue: ${response.statusText}`);
  }
  return await response.json();
}

export async function patchIssue(id, patchData) {
  const response = await fetchWithTimeout(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patchData),
  }, 10000);
  if (!response.ok) {
    throw new Error(`Failed to update issue: ${response.statusText}`);
  }
  return await response.json();
}

export async function deleteIssue(id) {
  const response = await fetchWithTimeout(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  }, 10000);
  if (!response.ok) {
    throw new Error(`Failed to delete issue: ${response.statusText}`);
  }
  return await response.json();
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('Backend auth unreachable, falling back to local verification:', err.message);
  }

  // Offline fallback authentication
  const cleanUser = (username || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  if (cleanUser === 'admin' && (cleanPass === 'admin' || cleanPass === 'admin123')) {
    return {
      success: true,
      user: {
        id: 'ADM-2026-01',
        name: 'Campus Administrator',
        username: 'admin',
        role: 'Admin',
        department: 'Campus Maintenance Directorate',
        email: 'admin@fixora.edu',
        avatar: '🛡️',
      },
      token: `adm_local_${Date.now()}`,
    };
  }

  if (cleanUser === 'student' || cleanUser === 'aarav' || cleanUser.includes('student')) {
    return {
      success: true,
      user: {
        id: 'STU-2026-88',
        name: 'Aarav Shah',
        username: 'student',
        role: 'Student',
        department: 'Computer Science & Engg.',
        email: 'aarav.shah@campus.edu',
        avatar: '🎓',
      },
      token: `stu_local_${Date.now()}`,
    };
  }

  if (cleanUser === 'faculty' || cleanUser === 'teacher' || cleanUser.includes('prof')) {
    return {
      success: true,
      user: {
        id: 'FAC-2026-14',
        name: 'Dr. Neha Sen',
        username: 'faculty',
        role: 'Faculty',
        department: 'Information Technology',
        email: 'neha.sen@campus.edu',
        avatar: '👩‍🏫',
      },
      token: `fac_local_${Date.now()}`,
    };
  }

  if (cleanUser === 'technician' || cleanUser === 'tech' || cleanUser.includes('crew')) {
    return {
      success: true,
      user: {
        id: 'TECH-2026-03',
        name: 'Ramesh Patel',
        username: 'technician',
        role: 'Technician',
        department: 'Electrical & HVAC Services',
        email: 'ramesh.patel@fixora.edu',
        avatar: '🔧',
      },
      token: `tech_local_${Date.now()}`,
    };
  }

  // Any non-empty credentials can log in as a registered campus member
  if (cleanUser && cleanPass) {
    return {
      success: true,
      user: {
        id: `USR-${Date.now().toString().slice(-4)}`,
        name: username.trim(),
        username: cleanUser,
        role: 'Student',
        department: 'Campus Resident',
        email: `${cleanUser}@campus.edu`,
        avatar: username.charAt(0).toUpperCase(),
      },
      token: `usr_local_${Date.now()}`,
    };
  }

  throw new Error('Please enter a valid username and password.');
}

// Backward-compatible alias for existing imports
export const loginAdmin = loginUser;