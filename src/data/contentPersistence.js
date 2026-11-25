import { mouList } from './mous.js';
import { galleryItems } from './gallery.js';
import { blogPosts, blogCategories } from './blogs.js';
import { initialCourses } from './coursesData.js';
import { syncToFirestore, subscribeToFirestore } from '../services/firebase.js';

// Keys for localStorage
const MOU_KEY = 'gv_admin_mous';
const GALLERY_KEY = 'gv_admin_gallery';
const PLACEMENT_KEY = 'gv_admin_placement';
const BLOG_KEY = 'gv_admin_blogs';
const CERT_KEY = 'gv_admin_certificates';
const LEADERS_KEY = 'gv_admin_leaders';
const COURSE_KEY = 'gv_admin_courses';

// Default Leaders Data
export const defaultLeaders = [
  {
    id: 'leader-1',
    name: 'Vinith Gunasekaran',
    role: 'Founder / CEO',
    org: 'GV DesignTech',
    image: '/assets/chairman-real-uq_F_5Yk.jpg',
    objectPosition: 'center center'
  },
  {
    id: 'leader-2',
    name: 'Gokul Prasath K',
    role: 'Managing Director',
    org: 'GV DesignTech',
    image: '/assets/gokul-prasath.jpg',
    objectPosition: 'center 12%'
  }
];

// Default Placements Data
export const defaultPlacements = {
  stats: [
    { target: '500+', label: 'Students Placed' },
    { target: '150+', label: 'Hiring Partners' },
    { target: '98%', label: 'Placement Rate' },
    { target: '₹7.5L', label: 'Highest Package' },
    { target: '₹5.2L', label: 'Average Package' }
  ],
  stories: [
    {
      id: 'story-1',
      name: 'Karthik Raja',
      role: 'Mechanical Design Engineer @ Automotive Tier-1',
      pkg: '7.2 LPA',
      quote: 'The SolidWorks 3D modeling and GD&T production drafting at GV DesignTech gave me the exact skills needed to clear all technical interview rounds.'
    },
    {
      id: 'story-2',
      name: 'Praveen Kumar',
      role: 'BIM Modeler & Coordinator @ Infrastructure Firm',
      pkg: '6.8 LPA',
      quote: 'From 2D AutoCAD drafting to advanced 3D Revit architectural modeling and BIM clash detection — the practical guidance was outstanding.'
    },
    {
      id: 'story-3',
      name: 'Suresh Babu',
      role: 'CNC CAM Engineer @ Precision Aerospace Tools',
      pkg: '6.5 LPA',
      quote: 'The MasterCAM multi-axis toolpath simulation and G-Code optimization workshops gave me immediate on-the-job confidence.'
    }
  ]
};

// Default Certificates Data
export const defaultCertificates = {
  'GV-CAD-2024-105': {
    certId: 'GV-CAD-2024-105',
    name: 'Karthik Raja',
    course: 'Master Diploma in Mechanical CAD & FEA Simulation',
    completionDate: '15 November 2026',
    grade: 'Distinction (A+)',
    status: 'VERIFIED AUTHENTIC',
    issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
  },
  'GV-BIM-2024-204': {
    certId: 'GV-BIM-2024-204',
    name: 'Praveen Kumar',
    course: 'Civil CADD & Structural BIM Architecture',
    completionDate: '20 November 2026',
    grade: 'Distinction (A+)',
    status: 'VERIFIED AUTHENTIC',
    issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
  },
  'GV-CNC-2024-301': {
    certId: 'GV-CNC-2024-301',
    name: 'Suresh Babu',
    course: 'CNC Programming & MasterCAM Precision Machining',
    completionDate: '18 November 2026',
    grade: 'Distinction (A+)',
    status: 'VERIFIED AUTHENTIC',
    issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
  },
  'GV-AI-2024-001': {
    certId: 'GV-AI-2024-001',
    name: 'Arun Kumar',
    course: 'Artificial Intelligence & Deep Learning Master Track',
    completionDate: '14 August 2026',
    grade: 'Distinction (A+)',
    status: 'VERIFIED AUTHENTIC',
    issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
  },
  'GV-DS-2024-042': {
    certId: 'GV-DS-2024-042',
    name: 'Sanjana Priya',
    course: 'Advanced Data Science & MLOps Certification',
    completionDate: '28 September 2026',
    grade: 'Distinction (A+)',
    status: 'VERIFIED AUTHENTIC',
    issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
  },
  'GV-FS-2024-118': {
    certId: 'GV-FS-2024-118',
    name: 'Vignesh Kumar',
    course: 'Python Full Stack Web Developer Track',
    completionDate: '10 October 2026',
    grade: 'First Class (A)',
    status: 'VERIFIED AUTHENTIC',
    issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
  }
};

// Cross-tab and cross-window sync channel
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('gv_admin_sync')
  : null;

let mongoSyncTriggered = false;

/**
 * Synchronizes all content collections from MongoDB on startup or manual refresh
 */
export async function syncWithMongo() {
  if (typeof window === 'undefined') return;
  try {
    const [mousRes, galRes, placeRes, blogsRes, leadRes, certRes, leadsRes, coursesRes] = await Promise.allSettled([
      fetch('/api/mous').then(r => r.ok ? r.json() : null),
      fetch('/api/gallery').then(r => r.ok ? r.json() : null),
      fetch('/api/placements').then(r => r.ok ? r.json() : null),
      fetch('/api/blogs').then(r => r.ok ? r.json() : null),
      fetch('/api/leaders').then(r => r.ok ? r.json() : null),
      fetch('/api/certificates').then(r => r.ok ? r.json() : null),
      fetch('/api/leads').then(r => r.ok ? r.json() : null),
      fetch('/api/courses').then(r => r.ok ? r.json() : null)
    ]);

    let changed = false;

    if (mousRes.status === 'fulfilled' && Array.isArray(mousRes.value) && mousRes.value.length > 0) {
      localStorage.setItem(MOU_KEY, JSON.stringify(mousRes.value));
      changed = true;
    }
    if (galRes.status === 'fulfilled' && Array.isArray(galRes.value) && galRes.value.length > 0) {
      localStorage.setItem(GALLERY_KEY, JSON.stringify(galRes.value));
      changed = true;
    }
    if (placeRes.status === 'fulfilled' && placeRes.value && (placeRes.value.stats || placeRes.value.stories)) {
      localStorage.setItem(PLACEMENT_KEY, JSON.stringify(placeRes.value));
      changed = true;
    }
    if (blogsRes.status === 'fulfilled' && Array.isArray(blogsRes.value) && blogsRes.value.length > 0) {
      localStorage.setItem(BLOG_KEY, JSON.stringify(blogsRes.value));
      changed = true;
    }
    if (leadRes.status === 'fulfilled' && Array.isArray(leadRes.value) && leadRes.value.length > 0) {
      localStorage.setItem(LEADERS_KEY, JSON.stringify(leadRes.value));
      changed = true;
    }
    if (certRes.status === 'fulfilled' && certRes.value && Object.keys(certRes.value).length > 0) {
      localStorage.setItem(CERT_KEY, JSON.stringify(certRes.value));
      changed = true;
    }
    if (leadsRes.status === 'fulfilled' && Array.isArray(leadsRes.value) && leadsRes.value.length > 0) {
      localStorage.setItem('gv_admin_leads', JSON.stringify(leadsRes.value));
      changed = true;
    }
    if (coursesRes.status === 'fulfilled' && Array.isArray(coursesRes.value) && coursesRes.value.length > 0) {
      localStorage.setItem(COURSE_KEY, JSON.stringify(coursesRes.value));
      changed = true;
    }

    if (changed) {
      notifyContentUpdate('all');
    }
  } catch (err) {
    console.warn('MongoDB background fetch notice:', err.message);
  }
}

// Background sync on client initialization
if (typeof window !== 'undefined' && !mongoSyncTriggered) {
  mongoSyncTriggered = true;
  setTimeout(syncWithMongo, 80);
}

export function notifyContentUpdate(topic = 'all') {
  if (typeof window === 'undefined') return;
  // Local window event
  window.dispatchEvent(new CustomEvent('gv_content_updated', { detail: { topic } }));
  // Cross-tab broadcast
  try {
    syncChannel?.postMessage({ type: 'GV_SYNC', topic, timestamp: Date.now() });
  } catch (err) {
    // broadcast channel fallback
  }
}

export function subscribeToContentUpdates(callback) {
  if (typeof window === 'undefined') return () => {};

  const handleUpdate = () => callback();

  // 1. Same-window custom event
  window.addEventListener('gv_content_updated', handleUpdate);

  // 2. Cross-tab storage event
  window.addEventListener('storage', handleUpdate);

  // 3. Tab focus & visibility change (when user returns to tab)
  window.addEventListener('focus', handleUpdate);
  const handleVisibility = () => {
    if (document.visibilityState === 'visible') handleUpdate();
  };
  document.addEventListener('visibilitychange', handleVisibility);

  // 4. Cross-tab BroadcastChannel
  let bcListener = null;
  if (syncChannel) {
    bcListener = () => handleUpdate();
    syncChannel.addEventListener('message', bcListener);
  }

  return () => {
    window.removeEventListener('gv_content_updated', handleUpdate);
    window.removeEventListener('storage', handleUpdate);
    window.removeEventListener('focus', handleUpdate);
    document.removeEventListener('visibilitychange', handleVisibility);
    if (syncChannel && bcListener) {
      syncChannel.removeEventListener('message', bcListener);
    }
  };
}

/* --- 1. MOUs Persistence --- */
export function getStoredMous() {
  try {
    const raw = localStorage.getItem(MOU_KEY);
    if (!raw) {
      localStorage.setItem(MOU_KEY, JSON.stringify(mouList));
      return mouList;
    }
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return mouList;

    // Ensure default flagship entries like 'kahe' and 'Government College of Engineering, Salem' are present
    let modified = false;
    for (let i = mouList.length - 1; i >= 0; i--) {
      const def = mouList[i];
      const exists = list.some(m => (m.name || '').toLowerCase().trim() === (def.name || '').toLowerCase().trim());
      if (!exists && (def.name.toLowerCase() === 'kahe' || def.name.toLowerCase().includes('salem'))) {
        list.unshift(def);
        modified = true;
      }
    }
    if (modified) {
      try {
        localStorage.setItem(MOU_KEY, JSON.stringify(list));
      } catch (e) {
        console.warn('Could not persist merged defaults to localStorage', e);
      }
    }
    return list;
  } catch {
    return mouList;
  }
}

export function saveStoredMous(list) {
  try {
    localStorage.setItem(MOU_KEY, JSON.stringify(list));
    notifyContentUpdate('mou');
  } catch (err) {
    console.warn('Failed to save MOUs to localStorage (quota check):', err);
    if (err.name === 'QuotaExceededError' || err.code === 22) {
      try {
        // Strip out any oversized base64 strings if quota exceeded
        const lightweight = list.map(item => ({
          ...item,
          image: (item.image && item.image.length > 80000) ? '' : item.image
        }));
        localStorage.setItem(MOU_KEY, JSON.stringify(lightweight));
        notifyContentUpdate('mou');
      } catch (innerErr) {
        console.error('Fatal quota error on MOUs:', innerErr);
      }
    }
  }

  // Persist directly to MongoDB
  try {
    fetch('/api/mous/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)
    }).catch(e => console.warn('MongoDB MOU sync:', e.message));
  } catch (e) {}

  // Non-blocking background cloud sync
  try {
    syncToFirestore('mous', list);
  } catch {
    // ignore
  }
}

/* --- 2. Gallery Persistence --- */
export function getStoredGallery() {
  try {
    const raw = localStorage.getItem(GALLERY_KEY);
    if (!raw) {
      localStorage.setItem(GALLERY_KEY, JSON.stringify(galleryItems));
      return galleryItems;
    }
    return JSON.parse(raw);
  } catch {
    return galleryItems;
  }
}

export function saveStoredGallery(items) {
  try {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(items));
    notifyContentUpdate('gallery');
  } catch (err) {
    console.warn('Failed to save Gallery (quota check):', err);
    if (err.name === 'QuotaExceededError' || err.code === 22) {
      try {
        const lightweight = items.map(item => ({
          ...item,
          image: (item.image && item.image.length > 80000) ? '' : item.image
        }));
        localStorage.setItem(GALLERY_KEY, JSON.stringify(lightweight));
        notifyContentUpdate('gallery');
      } catch (innerErr) {
        console.error('Fatal quota error on Gallery:', innerErr);
      }
    }
  }

  // Persist directly to MongoDB
  try {
    fetch('/api/gallery/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    }).catch(e => console.warn('MongoDB Gallery sync:', e.message));
  } catch (e) {}

  // Non-blocking background cloud sync
  try {
    syncToFirestore('gallery', items);
  } catch {
    // ignore
  }
}

/* --- 3. Placement Persistence --- */
export function getStoredPlacements() {
  try {
    const raw = localStorage.getItem(PLACEMENT_KEY);
    if (!raw) {
      localStorage.setItem(PLACEMENT_KEY, JSON.stringify(defaultPlacements));
      return defaultPlacements;
    }
    return JSON.parse(raw);
  } catch {
    return defaultPlacements;
  }
}

export function saveStoredPlacements(data) {
  try {
    localStorage.setItem(PLACEMENT_KEY, JSON.stringify(data));
    notifyContentUpdate('placement');
  } catch (err) {
    console.error('Failed to save Placements', err);
  }

  // Persist directly to MongoDB
  try {
    fetch('/api/placements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(e => console.warn('MongoDB Placements sync:', e.message));
  } catch (e) {}

  // Non-blocking background cloud sync
  try {
    syncToFirestore('placements', data);
  } catch {
    // ignore
  }
}

/* --- 4. Blogs Persistence --- */
export function getStoredBlogs() {
  try {
    const raw = localStorage.getItem(BLOG_KEY);
    if (!raw) {
      localStorage.setItem(BLOG_KEY, JSON.stringify(blogPosts));
      return blogPosts;
    }
    return JSON.parse(raw);
  } catch {
    return blogPosts;
  }
}

export function saveStoredBlogs(posts) {
  try {
    localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
    notifyContentUpdate('blogs');
  } catch (err) {
    console.error('Failed to save Blogs', err);
  }

  // Persist directly to MongoDB
  try {
    fetch('/api/blogs/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(posts)
    }).catch(e => console.warn('MongoDB Blogs sync:', e.message));
  } catch (e) {}

  // Non-blocking background cloud sync
  try {
    syncToFirestore('blogs', posts);
  } catch {
    // ignore
  }
}

/* --- 5. Certificates Registry Persistence --- */
export function getStoredCertificates() {
  try {
    const raw = localStorage.getItem(CERT_KEY);
    if (!raw) {
      localStorage.setItem(CERT_KEY, JSON.stringify(defaultCertificates));
      return defaultCertificates;
    }
    return JSON.parse(raw);
  } catch {
    return defaultCertificates;
  }
}

export function saveStoredCertificates(registry) {
  try {
    localStorage.setItem(CERT_KEY, JSON.stringify(registry));
    notifyContentUpdate('certificates');
  } catch (err) {
    console.error('Failed to save Certificates', err);
  }

  // Persist directly to MongoDB
  try {
    fetch('/api/certificates/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registry)
    }).catch(e => console.warn('MongoDB Certificates sync:', e.message));
  } catch (e) {}

  // Non-blocking background cloud sync
  try {
    syncToFirestore('certificates', registry);
  } catch {
    // ignore
  }
}

/* --- 6. Leadership Profiles Persistence --- */
export function getStoredLeaders() {
  try {
    const raw = localStorage.getItem(LEADERS_KEY);
    if (!raw) {
      localStorage.setItem(LEADERS_KEY, JSON.stringify(defaultLeaders));
      return defaultLeaders;
    }
    return JSON.parse(raw);
  } catch {
    return defaultLeaders;
  }
}

export function saveStoredLeaders(leaders) {
  try {
    localStorage.setItem(LEADERS_KEY, JSON.stringify(leaders));
    notifyContentUpdate('leaders');
  } catch (err) {
    console.error('Failed to save Leaders', err);
  }

  // Persist directly to MongoDB
  try {
    fetch('/api/leaders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leaders)
    }).catch(e => console.warn('MongoDB Leaders sync:', e.message));
  } catch (e) {}

  // Non-blocking background cloud sync
  try {
    syncToFirestore('leaders', leaders);
  } catch {
    // ignore
  }
}

/* --- 7. Courses Catalog & Curriculum Persistence --- */
export function getStoredCourses() {
  try {
    const raw = localStorage.getItem(COURSE_KEY);
    if (!raw) {
      localStorage.setItem(COURSE_KEY, JSON.stringify(initialCourses));
      return initialCourses;
    }
    const list = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) {
      localStorage.setItem(COURSE_KEY, JSON.stringify(initialCourses));
      return initialCourses;
    }
    return list;
  } catch {
    return initialCourses;
  }
}

export function saveStoredCourses(courses) {
  try {
    localStorage.setItem(COURSE_KEY, JSON.stringify(courses));
    notifyContentUpdate('courses');
  } catch (err) {
    console.error('Failed to save Courses to localStorage:', err);
    if (err.name === 'QuotaExceededError' || err.code === 22) {
      try {
        const lightweight = courses.map(item => ({
          ...item,
          image: (item.image && item.image.length > 80000) ? '' : item.image
        }));
        localStorage.setItem(COURSE_KEY, JSON.stringify(lightweight));
        notifyContentUpdate('courses');
      } catch (innerErr) {
        console.error('Fatal quota error on Courses:', innerErr);
      }
    }
  }

  // Persist directly to MongoDB
  try {
    fetch('/api/courses/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courses)
    }).catch(e => console.warn('MongoDB Courses sync:', e.message));
  } catch (e) {}

  // Non-blocking background cloud sync
  try {
    syncToFirestore('courses', courses);
  } catch {
    // ignore
  }
}
