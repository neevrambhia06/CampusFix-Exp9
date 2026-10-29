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
const defaultSeedIssues = mockIssues;

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

// 1. Fetch all issues from Firebase Firestore (with 2500ms safety timeout)
export async function getIssues() {
  try {
    const colRef = collection(db, ISSUES_COLLECTION);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firestore getDocs timeout')), 2500)
    );
    const snapshot = await Promise.race([getDocs(colRef), timeoutPromise]);

    if (!snapshot || snapshot.empty) {
      console.log('Firestore issues collection is empty. Seeding initial campus issues...');
      return await seedFirestoreIfEmpty();
    }

    const issues = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }));

    return issues.sort((a, b) => String(b.id).localeCompare(String(a.id), undefined, { numeric: true }));
  } catch (err) {
    console.warn('Firebase getIssues deferred (using fallback):', err.message);
    try {
      const cached = JSON.parse(localStorage.getItem('campusfix_cached_issues') || '[]');
      if (Array.isArray(cached) && cached.length > 0) return cached;
    } catch {}
    return mockIssues;
  }
}

// 2. Fetch single issue from Firebase Firestore (0ms instant match + 2000ms safety timeout)
export async function getIssue(id) {
  const localMatch = mockIssues.find((i) => String(i.id) === String(id));

  try {
    const docRef = doc(db, ISSUES_COLLECTION, String(id));
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firestore getDoc timeout')), 2000)
    );
    const docSnap = await Promise.race([getDoc(docRef), timeoutPromise]);

    if (docSnap && docSnap.exists && docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    
    if (localMatch) return localMatch;
    throw new Error(`Issue #${id} not found in Firestore.`);
  } catch (err) {
    console.warn(`Firebase getIssue #${id} deferred (using local cache):`, err.message);
    if (localMatch) return localMatch;
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

// 8. Campus Authentication (Multi-Role Support — Exp 10 Aligned)
export async function loginUser(username, password) {
  const cleanUser = (username || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  // Admin (Dr. Ananya Sen)
  if (cleanUser === 'admin' || cleanUser.startsWith('admin@')) {
    if (cleanPass === 'admin@123' || cleanPass === 'admin' || cleanPass === 'admin123') {
      return {
        success: true,
        user: {
          id: 'ADM-SEN',
          name: 'Dr. Ananya Sen',
          username: 'admin',
          role: 'Admin',
          department: 'Dean of Infrastructure & Campus Operations',
          email: 'admin@apsit.edu.in',
          avatar: '🛡️',
        },
        token: `adm_${Date.now()}`,
      };
    }
  }

  // Technicians (Suresh, Vikram, Ramesh, Estate Crew, Rajesh)
  const isTechPass = cleanPass === 'tech@123' || cleanPass === 'tech' || cleanPass.endsWith('@123');
  const isTechUser = 
    cleanUser === 'suresh' || cleanUser.startsWith('suresh') ||
    cleanUser === 'vikram' || cleanUser.startsWith('vikram') ||
    cleanUser === 'ramesh' || cleanUser.startsWith('ramesh') ||
    cleanUser === 'estate' || cleanUser.startsWith('estate') ||
    cleanUser === 'crew' || cleanUser.startsWith('crew') ||
    cleanUser === 'technician' || cleanUser.includes('tech') ||
    (cleanUser.includes('rajesh') && cleanPass === 'tech@123');

  if (isTechUser && isTechPass) {
    let techName = 'Suresh Kumar';
    let techDept = 'Campus Facilities & Electrical Maintenance';
    let techId = 'TECH-SURESH';
    let techTitle = 'Lead Maintenance Technician';

    if (cleanUser.includes('vikram')) {
      techName = 'Vikram Rao';
      techDept = 'IT & Audio-Visual Systems';
      techId = 'TECH-VIKRAM';
      techTitle = 'IT & AV Network Lead';
    } else if (cleanUser.includes('ramesh')) {
      techName = 'Ramesh Nair';
      techDept = 'Plumbing & Water Management';
      techId = 'TECH-RAMESH';
      techTitle = 'Plumbing Specialist';
    } else if (cleanUser.includes('estate') || cleanUser.includes('crew')) {
      techName = 'Estate General Crew';
      techDept = 'Estate Maintenance & Ground Facilities';
      techId = 'TECH-CREW';
      techTitle = 'Campus General Operations Crew';
    } else if (cleanUser.includes('rajesh')) {
      techName = 'Rajesh Sharma';
      techDept = 'Air Conditioning & Ventilation Support';
      techId = 'TECH-RAJESH';
      techTitle = 'HVAC & Facilities Technician';
    }

    return {
      success: true,
      user: {
        id: techId,
        name: techName,
        username: cleanUser,
        role: 'Technician',
        roleTitle: techTitle,
        department: techDept,
        email: `${cleanUser.split('@')[0]}@apsit.edu.in`,
        avatar: '🔧',
      },
      token: `tech_${Date.now()}`,
    };
  }

  // Faculty (Prof. Rajesh Verma)
  if (cleanUser === 'faculty' || cleanUser.includes('prof') || (cleanUser.includes('rajesh') && cleanPass === 'faculty@123')) {
    if (cleanPass === 'faculty@123' || cleanPass === 'faculty' || cleanPass === 'rajesh@123') {
      return {
        success: true,
        user: {
          id: 'FAC-VERMA',
          name: 'Prof. Rajesh Verma',
          username: 'faculty',
          role: 'Faculty',
          department: 'Dept. of Computer Science & Engineering',
          email: 'rajesh.verma@apsit.edu.in',
          avatar: '👨‍🏫',
        },
        token: `fac_${Date.now()}`,
      };
    }
  }

  // Student (Numeric Moodle ID)
  const beforeAt = cleanUser.includes('@') ? cleanUser.split('@')[0] : cleanUser;
  const isNumeric = /^\d+$/.test(beforeAt);

  if (isNumeric || cleanUser.startsWith('student') || cleanUser.endsWith('@apsit.edu.in')) {
    const studentId = isNumeric ? beforeAt : '25206010';
    const isStudentPass = cleanPass === 'student@123' || cleanPass === 'student' || cleanPass === studentId;
    if (isStudentPass) {
      return {
        success: true,
        user: {
          id: studentId,
          name: studentId === '25206010' ? 'Neev Rambhia' : 'Student Reporter',
          username: cleanUser,
          role: 'Student',
          department: `Computer Engineering (ID ${studentId})`,
          email: `${studentId}@apsit.edu.in`,
          avatar: '🎓',
        },
        token: `stu_${Date.now()}`,
      };
    }
  }

  throw new Error('Incorrect credentials. Please verify your campus username and password.');
}

// Backward-compatible alias for existing imports
export const loginAdmin = loginUser;
