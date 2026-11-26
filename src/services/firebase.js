// Firebase App, Firestore, Storage & Analytics Configuration for GV DesignTech
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyCeWumBgrdmJ1DBNNr3qwJHv4DjsCm_8-A",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "gvdesigntech.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "gvdesigntech",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "gvdesigntech.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "595294376162",
  appId: env.VITE_FIREBASE_APP_ID || "1:595294376162:web:a2b2c44740605c2ffc4ebb",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-92J44HJ8TV"
};

// Initialize Firebase App (ensures single instance)
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Cloud Firestore Database
export const db = getFirestore(app);

// Cloud Storage Bucket (gvdesigntech.firebasestorage.app)
export const storage = getStorage(app);

// Authentication
export const auth = getAuth(app);

// Google Analytics 4 (gracefully checks browser environment)
export let analytics = null;
if (typeof window !== 'undefined') {
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log('📊 Firebase Analytics initialized (Measurement ID: G-92J44HJ8TV)');
    }
  }).catch((err) => {
    console.warn('Firebase Analytics not supported in this environment:', err);
  });
}

/**
 * Uploads a file (image, document, photo) to Firebase Cloud Storage
 * @param {File|Blob} file 
 * @param {string} destinationPath - e.g. 'mous/university-logo.jpg'
 * @returns {Promise<{ url: string, isFirebase: boolean, path: string }>}
 */
export async function uploadToFirebaseStorage(file, destinationPath) {
  try {
    const filename = `${Date.now()}_${file.name || 'upload.jpg'}`;
    const fullPath = destinationPath ? `${destinationPath}/${filename}` : `uploads/${filename}`;
    const storageRef = ref(storage, fullPath);

    const snapshot = await uploadBytesResumable(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    return {
      url: downloadUrl,
      isFirebase: true,
      path: fullPath
    };
  } catch (error) {
    console.error('Firebase Storage upload error:', error);
    throw error;
  }
}

/**
 * Syncs a content collection document to Firestore Cloud Database
 * @param {string} docKey - e.g. 'mous', 'gallery', 'placements', 'blogs', 'leaders'
 * @param {any} data 
 */
export async function syncToFirestore(docKey, data) {
  try {
    const docRef = doc(db, 'content', docKey);
    await setDoc(docRef, {
      data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn(`Firestore sync error for ${docKey} (offline/permissions):`, err.message);
    return false;
  }
}

/**
 * Subscribes to real-time cloud updates from Firestore
 * @param {string} docKey - 'mous' | 'gallery' | 'placements' | 'blogs' | 'leaders'
 * @param {Function} onDataCallback 
 * @returns {Function} Unsubscribe function
 */
export function subscribeToFirestore(docKey, onDataCallback) {
  try {
    const docRef = doc(db, 'content', docKey);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        if (cloudData && cloudData.data) {
          onDataCallback(cloudData.data);
        }
      }
    }, (err) => {
      console.warn(`Firestore realtime listener warning for ${docKey}:`, err.message);
    });
  } catch (err) {
    console.warn('Could not attach Firestore listener:', err.message);
    return () => {};
  }
}
