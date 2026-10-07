const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const BASE_URL = `${API_BASE.replace(/\/$/, '')}/issues`;

export async function getIssues() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch issues: ${response.statusText}`);
  }
  return await response.json();
}

export async function getIssue(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch issue #${id}: ${response.statusText}`);
  }
  return await response.json();
}

export async function createIssue(issueData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(issueData),
  });
  if (!response.ok) {
    throw new Error(`Failed to create issue: ${response.statusText}`);
  }
  return await response.json();
}

export async function updateIssue(id, issueData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(issueData),
  });
  if (!response.ok) {
    throw new Error(`Failed to replace issue: ${response.statusText}`);
  }
  return await response.json();
}

export async function patchIssue(id, patchData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patchData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update issue: ${response.statusText}`);
  }
  return await response.json();
}

export async function deleteIssue(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete issue: ${response.statusText}`);
  }
  return await response.json();
}