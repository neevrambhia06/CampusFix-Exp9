import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from './firebase.js';
import { mockIssues } from '../data/mockData.js';

const ISSUES_COLLECTION = 'issues';

// Default initial dataset to seed into Firestore if the database collection is empty
const defaultSeedIssues = [
  {
    id: "1",
    title: "Water Leakage in Lab 302",
    category: "Plumbing",
    location: "Academic Block B - 3rd Floor",
    priority: "High",
    status: "In Progress",
    reporter: "Aarav Shah",
    reportedAt: "2h ago",
    updatedAt: "30m ago",
    description: "Continuous water dripping near the AC pipeline causing ceiling dampness and risk of short circuit."
  },
  {
    id: "2",
    title: "Projector HDMI Port Damaged",
    category: "IT / Network",
    location: "Seminar Hall A",
    priority: "Medium",
    status: "Reported",
    reporter: "Priya Sharma",
    reportedAt: "4h ago",
    updatedAt: "4h ago",
    description: "The main projector display flickers intermittently due to a loose HDMI input connector."
  },
  {
    id: "3",
    title: "Broken Desk in Classroom 104",
    category: "Furniture",
    location: "Main Building - Ground Floor",
    priority: "Low",
    status: "Resolved",
    reporter: "Rohan Verma",
    reportedAt: "1d ago",
    updatedAt: "2h ago",
    description: "Desktop wood panel came off on desk row 3, bench number 4."
  },
  {
    id: "4",
    title: "Wi-Fi Access Point Offline",
    category: "IT / Network",
    location: "Central Library - 2nd Floor",
    priority: "High",
    status: "Reported",
    reporter: "Ananya Patel",
    reportedAt: "5h ago",
    updatedAt: "5h ago",
    description: "No internet connection available near the quiet study zone since morning."
  },
  {
    id: "5",
    title: "Elevator B Door Sensor Fault",
    category: "Electrical",
    location: "Engineering Block",
    priority: "High",
    status: "In Progress",
    reporter: "Karan Malhotra",
    reportedAt: "6h ago",
    updatedAt: "1h ago",
    description: "Elevator doors close abruptly without sensing obstruction."
  },
  {
    id: "6",
    title: "Gym Equipment Handle Broken",
    category: "Facilities",
    location: "Sports Complex",
    priority: "Low",
    status: "Resolved",
    reporter: "Neha Gupta",
    reportedAt: "2d ago",
    updatedAt: "1d ago",
    description: "Cable crossover machine right handle grip is damaged."
  },
  {
    id: "7",
    title: "AC not working",
    category: "Electrical",
    location: "Lab 408",
    priority: "High",
    status: "Reported",
    reporter: "Aarav Sharma",
    reportedAt: "1d ago",
    updatedAt: "1d ago",
    description: "Continuous AC malfunction causing high temperature in lab."
  },
  {
    id: "8",
    title: "Campus Wi-Fi Router Reset Required",
    category: "IT / Network",
    location: "Hostel Block C",
    priority: "Medium",
    status: "Reported",
    reporter: "Neev Rambhia",
    reportedAt: "Just now",
    updatedAt: "Just now",
    description: "Frequent disconnects on the 5GHz SSID across floors 2 and 3."
  }
];

// Helper to seed Firestore if empty
async function seedFirestoreIfEmpty() {
  try {
    for (const item of defaultSeedIssues) {
      await setDoc(doc(db, ISSUES_COLLECTION, String(item.id)), item);
    }
    console.log('Firebase Firestore successfully seeded with initial Fixora campus issues.');
    return defaultSeedIssues;
  } catch (err) {
    console.warn('Could not auto-seed Firestore:', err);
    return defaultSeedIssues;
  }
}

// 1. Fetch all issues from Firebase Firestore
export async function getIssues() {
  try {
    const colRef = collection(db, ISSUES_COLLECTION);
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      console.log('Firestore issues collection is empty. Seeding initial campus issues...');
      return await seedFirestoreIfEmpty();
    }

    const issues = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }));

    // Sort by id descending (or newest first)
    return issues.sort((a, b) => String(b.id).localeCompare(String(a.id), undefined, { numeric: true }));
  } catch (err) {
    console.warn('Firebase getIssues failed, falling back to local cache/mock:', err.message);
    try {
      const cached = JSON.parse(localStorage.getItem('campusfix_cached_issues') || '[]');
      if (cached.length > 0) return cached;
    } catch {}
    return mockIssues;
  }
}

// 2. Fetch single issue from Firebase Firestore
export async function getIssue(id) {
  try {
    const docRef = doc(db, ISSUES_COLLECTION, String(id));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    
    // Check fallback in seed issues or mock
    const fallback = defaultSeedIssues.find((i) => String(i.id) === String(id));
    if (fallback) return fallback;
    throw new Error(`Issue #${id} not found in Firestore.`);
  } catch (err) {
    console.warn(`Firebase getIssue #${id} failed:`, err.message);
    throw err;
  }
}

// 3. Create issue in Firebase Firestore
export async function createIssue(issueData) {
  try {
    const newId = issueData.id || `ISS-${Date.now().toString().slice(-5)}`;
    const payload = {
      ...issueData,
      id: String(newId),
      createdAt: issueData.createdAt || new Date().toISOString(),
      updatedAt: 'Just now'
    };

    const docRef = doc(db, ISSUES_COLLECTION, String(newId));
    await setDoc(docRef, payload);
    return payload;
  } catch (err) {
    console.warn('Firebase createIssue failed:', err.message);
    throw err;
  }
}

// 4. Update entire issue in Firebase Firestore
export async function updateIssue(id, issueData) {
  try {
    const docRef = doc(db, ISSUES_COLLECTION, String(id));
    const payload = {
      ...issueData,
      updatedAt: 'Just now'
    };
    await setDoc(docRef, payload, { merge: true });
    return { id, ...payload };
  } catch (err) {
    console.warn(`Firebase updateIssue #${id} failed:`, err.message);
    throw err;
  }
}

// 5. Patch partial issue in Firebase Firestore
export async function patchIssue(id, patchData) {
  try {
    const docRef = doc(db, ISSUES_COLLECTION, String(id));
    const payload = {
      ...patchData,
      updatedAt: 'Just now'
    };
    await setDoc(docRef, payload, { merge: true });
    return { id, ...payload };
  } catch (err) {
    console.warn(`Firebase patchIssue #${id} failed:`, err.message);
    throw err;
  }
}

// 6. Delete issue from Firebase Firestore
export async function deleteIssue(id) {
  try {
    const docRef = doc(db, ISSUES_COLLECTION, String(id));
    await deleteDoc(docRef);
    return { success: true, id };
  } catch (err) {
    console.warn(`Firebase deleteIssue #${id} failed:`, err.message);
    throw err;
  }
}

// 7. Real-Time Snapshot Listener for Firestore Issues
export function subscribeToIssues(onUpdate, onError) {
  try {
    const colRef = collection(db, ISSUES_COLLECTION);
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
          list.sort((a, b) => String(b.id).localeCompare(String(a.id), undefined, { numeric: true }));
          onUpdate(list);
        } else {
          // If empty, auto-seed and report
          seedFirestoreIfEmpty().then(onUpdate);
        }
      },
      (err) => {
        console.warn('Firestore subscription error:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    console.warn('Could not establish Firestore real-time listener:', err);
    return () => {};
  }
}

// 8. Campus Authentication (Multi-Role Support)
export async function loginUser(username, password) {
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
      token: `adm_fb_${Date.now()}`,
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
      token: `stu_fb_${Date.now()}`,
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
      token: `fac_fb_${Date.now()}`,
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
      token: `tech_fb_${Date.now()}`,
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
      token: `usr_fb_${Date.now()}`,
    };
  }

  throw new Error('Please enter a valid username and password.');
}

// Backward-compatible alias for existing imports
export const loginAdmin = loginUser;
