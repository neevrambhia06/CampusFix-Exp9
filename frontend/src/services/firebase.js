import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyCyeu1KiLsqe7v2Z5GZslnIOEe7cnNK1FE",
  authDomain: "fixora-exp9-wmd.firebaseapp.com",
  projectId: "fixora-exp9-wmd",
  storageBucket: "fixora-exp9-wmd.firebasestorage.app",
  messagingSenderId: "490453919880",
  appId: "1:490453919880:web:d9c451d47e20e87e28973d"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore Database
export const db = getFirestore(app);

export default db;
