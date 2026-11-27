// IndexedDB Video Storage Utility for GV DesignTech
// Provides persistent client-side storage for large mobile video files (10MB - 100MB+)
// to bypass localStorage 5MB quota restrictions and ensure instant local playback.

const DB_NAME = 'GV_VideoStorage_DB';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported in this environment.'));
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Stores a video Blob or File in IndexedDB
 * @param {string} key - e.g. 'aboutVideo' or 'demoVideo'
 * @param {Blob|File} blob - Raw video file
 */
export async function storeVideoInIndexedDB(key, blob) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(blob, key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB storeVideo error:', err.message);
    return false;
  }
}

/**
 * Retrieves a stored video Blob from IndexedDB
 * @param {string} key - 'aboutVideo' | 'demoVideo'
 * @returns {Promise<Blob|null>}
 */
export async function getVideoFromIndexedDB(key) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Deletes a stored video from IndexedDB
 * @param {string} key 
 */
export async function deleteVideoFromIndexedDB(key) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}
