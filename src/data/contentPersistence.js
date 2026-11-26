import { mouList } from './mous.js';
import { galleryItems } from './gallery.js';
import { blogPosts, blogCategories } from './blogs.js';
import { initialCourses } from './coursesData.js';
import { initialInternshipPrograms } from './internshipsData.js';
import { syncToFirestore, subscribeToFirestore } from '../services/firebase.js';

// Keys for localStorage
const MOU_KEY = 'gv_admin_mous';
const GALLERY_KEY = 'gv_admin_gallery';
const PLACEMENT_KEY = 'gv_admin_placement';
const BLOG_KEY = 'gv_admin_blogs';
const CERT_KEY = 'gv_admin_certificates';
const LEADERS_KEY = 'gv_admin_leaders';
const COURSE_KEY = 'gv_admin_courses';
const INTERNSHIP_PROGRAMS_KEY = 'gv_admin_internship_programs';
const SITE_CONFIG_KEY = 'gv_site_config';

export const initialSiteConfig = {
  demoVideo: {
    videoUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=UCSTvrgSrwwi5hx3mdkXLX5A',
    title: 'Watch How We Shape the Future of CAD & Engineering Design Education',
    description: 'Take a guided virtual tour through our state-of-the-art CAD workstations, hands-on 3D printing & prototyping labs, BIM coordination studios, and placement training sessions at GV DesignTech.'
  },
  recentActivity: {
    badge: 'NEW',
    title: 'Recent Activities',
    desc: "See what's happening at GV DesignTech.",
    thumb: '/assets/recent-activity/ai-workshop-2.jpg',
    items: [
      { id: 2, src: '/assets/recent-activity/ai-workshop-2.jpg', alt: 'CAD Training Classroom' },
      { id: 3, src: '/assets/recent-activity/ai-workshop-3.jpg', alt: 'CAD Workshop Mentorship' }
    ]
  },
  stats: [
    { id: 'stat-1', count: 8500, suffix: '+', title: 'Professionals Worldwide Choose Us' },
    { id: 'stat-2', count: 3, suffix: '+', title: 'Years of Training Excellence' },
    { id: 'stat-3', count: 250, suffix: '+', title: 'Alumni Placed Globally' },
    { id: 'stat-4', count: 25, suffix: '+', title: 'Industry Awards & Accreditations' }
  ],
  showcaseImages: {
    image1: '/assets/cad-lab-classroom.jpg',
    alt1: 'CAD Design Classroom and Workshop at GV DesignTech',
    image2: '/assets/cad-lab-students.jpg',
    alt2: 'Students Practicing 2D and 3D CAD Modeling at GV DesignTech'
  },
  enrollModal: {
    title: 'Enroll Now',
    subtitle: 'Start your journey with GV DesignTech',
    showOffer: true,
    offerBadgeImage: '',
    offerBadgeText: 'EMI',
    offerBadgeSub: 'OFFER',
    offerTitle: '🪔 Instant Installment Offer',
    offerSub: 'Diwali Special · Pay your course fee in installments',
    offerMinutes: 2,
    buttonText: 'Join Us'
  },
  specializations: {
    sectionTag: 'OUR CORE SPECIALIZATIONS',
    sectionTitle: 'Drive Your Engineering Success With Our CAD Training Programs',
    cards: [
      {
        id: 'spec-mech',
        badge: '⚙️ Mechanical & Auto CAD',
        image: '/assets/cad-card-mechanical.jpg',
        title: 'Mechanical & Automobile CAD',
        desc: 'Master parametric 3D solid modeling, powertrain assembly design, sheet metal fabrication, and GD&T production drafting.',
        tools: ['AutoCAD 2D/3D', 'SolidWorks', 'CATIA V5', 'Ansys FEA', 'GD&T'],
        btnText: 'Explore Mechanical Track →'
      },
      {
        id: 'spec-civil',
        badge: '🏛️ Civil & Architectural BIM',
        image: '/assets/cad-card-civil.jpg',
        title: 'Civil BIM & Architectural Drafting',
        desc: 'Learn structural engineering drafting, 3D architectural elevations, MEP service coordination, and Building Information Modeling.',
        tools: ['Revit Architecture', 'AutoCAD Civil 3D', 'BIM Modeling', 'Navisworks', '3ds Max'],
        btnText: 'Explore Civil BIM Track →'
      },
      {
        id: 'spec-cnc',
        badge: '⚡ CNC Machining & CAM',
        image: '/assets/cad-card-cnc.jpg',
        title: 'CNC Programming & CAM',
        desc: 'Develop precision G-code & M-code routines, 3-axis/5-axis CNC turning and milling toolpath simulations, and modern CAM workflows.',
        tools: ['MasterCAM', 'CNC Turning', '5-Axis Milling', 'G-Code / M-Code', 'Toolpath Sim'],
        btnText: 'Explore CNC Track →'
      }
    ]
  }
};

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
    { target: '0+', label: 'Students Placed' },
    { target: '0+', label: 'Hiring Partners' },
    { target: '100%', label: 'Placement Rate' },
    { target: '₹0L', label: 'Highest Package' },
    { target: '₹0L', label: 'Average Package' }
  ],
  stories: []
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
    const [mousRes, galRes, placeRes, blogsRes, leadRes, certRes, leadsRes, coursesRes, internRes, siteConfigRes] = await Promise.allSettled([
      fetch('/api/mous').then(r => r.ok ? r.json() : null),
      fetch('/api/gallery').then(r => r.ok ? r.json() : null),
      fetch('/api/placements').then(r => r.ok ? r.json() : null),
      fetch('/api/blogs').then(r => r.ok ? r.json() : null),
      fetch('/api/leaders').then(r => r.ok ? r.json() : null),
      fetch('/api/certificates').then(r => r.ok ? r.json() : null),
      fetch('/api/leads').then(r => r.ok ? r.json() : null),
      fetch('/api/courses').then(r => r.ok ? r.json() : null),
      fetch('/api/internship-programs').then(r => r.ok ? r.json() : null),
      fetch('/api/site-config').then(r => r.ok ? r.json() : null)
    ]);

    let changed = false;

    if (mousRes.status === 'fulfilled' && Array.isArray(mousRes.value)) {
      localStorage.setItem(MOU_KEY, JSON.stringify(mousRes.value));
      changed = true;
    }
    if (galRes.status === 'fulfilled' && Array.isArray(galRes.value)) {
      localStorage.setItem(GALLERY_KEY, JSON.stringify(galRes.value));
      changed = true;
    }
    if (placeRes.status === 'fulfilled' && placeRes.value) {
      localStorage.setItem(PLACEMENT_KEY, JSON.stringify(placeRes.value));
      changed = true;
    }
    if (blogsRes.status === 'fulfilled' && Array.isArray(blogsRes.value)) {
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
    if (coursesRes.status === 'fulfilled' && Array.isArray(coursesRes.value)) {
      const dedupedCourses = dedupeCourseList(coursesRes.value);
      localStorage.setItem(COURSE_KEY, JSON.stringify(dedupedCourses));
      changed = true;
    }
    if (internRes.status === 'fulfilled' && Array.isArray(internRes.value) && internRes.value.length > 0) {
      localStorage.setItem(INTERNSHIP_PROGRAMS_KEY, JSON.stringify(internRes.value));
      changed = true;
    }
    if (siteConfigRes.status === 'fulfilled' && siteConfigRes.value && typeof siteConfigRes.value === 'object') {
      localStorage.setItem(SITE_CONFIG_KEY, JSON.stringify(siteConfigRes.value));
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
    return Array.isArray(list) ? list : mouList;
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
function dedupeCourseList(list) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  const deduped = [];
  for (const item of list) {
    if (!item) continue;
    const key = (item.id || item._id || item.title || '').toString().trim().toLowerCase();
    if (key && !seen.has(key)) {
      seen.add(key);
      deduped.push(item);
    }
  }
  return deduped.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getStoredCourses() {
  try {
    const raw = localStorage.getItem(COURSE_KEY);
    if (!raw) {
      return [];
    }
    const list = JSON.parse(raw);
    return Array.isArray(list) ? dedupeCourseList(list) : [];
  } catch {
    return [];
  }
}

export function saveStoredCourses(courses) {
  const cleanCourses = dedupeCourseList(courses);
  try {
    localStorage.setItem(COURSE_KEY, JSON.stringify(cleanCourses));
    notifyContentUpdate('courses');
  } catch (err) {
    console.error('Failed to save Courses to localStorage:', err);
    if (err.name === 'QuotaExceededError' || err.code === 22) {
      try {
        const lightweight = cleanCourses.map(item => ({
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
      body: JSON.stringify(cleanCourses)
    }).catch(e => console.warn('MongoDB Courses sync:', e.message));
  } catch (e) {}

  // Non-blocking background cloud sync
  try {
    syncToFirestore('courses', cleanCourses);
  } catch {
    // ignore
  }
}

/* --- 8. Internship Programs Catalog Persistence --- */
export function getStoredInternshipPrograms() {
  try {
    const raw = localStorage.getItem(INTERNSHIP_PROGRAMS_KEY);
    if (!raw) {
      localStorage.setItem(INTERNSHIP_PROGRAMS_KEY, JSON.stringify(initialInternshipPrograms));
      return initialInternshipPrograms;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialInternshipPrograms;
  } catch {
    return initialInternshipPrograms;
  }
}

export function saveStoredInternshipPrograms(programs) {
  const cleanPrograms = Array.isArray(programs) ? programs : [];
  try {
    localStorage.setItem(INTERNSHIP_PROGRAMS_KEY, JSON.stringify(cleanPrograms));
    notifyContentUpdate('internships');
  } catch (err) {
    console.error('Failed to save Internship Programs to localStorage:', err);
  }

  // Persist directly to MongoDB
  try {
    fetch('/api/internship-programs/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanPrograms)
    }).catch(e => console.warn('MongoDB Internship Programs sync:', e.message));
  } catch (e) {}

  // Cloud firestore sync
  try {
    syncToFirestore('internship_programs', cleanPrograms);
  } catch {}
}

/* --- 9. Site Config Persistence (Demo Video, Recent Activities, Stats, Showcase Images) --- */
export function getStoredSiteConfig() {
  try {
    const raw = localStorage.getItem(SITE_CONFIG_KEY);
    if (!raw) {
      localStorage.setItem(SITE_CONFIG_KEY, JSON.stringify(initialSiteConfig));
      return initialSiteConfig;
    }
    const parsed = JSON.parse(raw);
    return {
      ...initialSiteConfig,
      ...parsed,
      demoVideo: { ...initialSiteConfig.demoVideo, ...(parsed.demoVideo || {}) },
      recentActivity: {
        ...initialSiteConfig.recentActivity,
        ...(parsed.recentActivity || {}),
        items: (Array.isArray(parsed.recentActivity?.items) && parsed.recentActivity.items.length > 0)
          ? parsed.recentActivity.items
          : initialSiteConfig.recentActivity.items
      },
      stats: (Array.isArray(parsed.stats) && parsed.stats.length === 4)
        ? parsed.stats
        : initialSiteConfig.stats,
      showcaseImages: { ...initialSiteConfig.showcaseImages, ...(parsed.showcaseImages || {}) },
      enrollModal: { ...initialSiteConfig.enrollModal, ...(parsed.enrollModal || {}) },
      specializations: {
        ...initialSiteConfig.specializations,
        ...(parsed.specializations || {}),
        cards: (Array.isArray(parsed.specializations?.cards) && parsed.specializations.cards.length > 0)
          ? parsed.specializations.cards
          : initialSiteConfig.specializations.cards
      }
    };
  } catch {
    return initialSiteConfig;
  }
}

export function saveStoredSiteConfig(config) {
  try {
    localStorage.setItem(SITE_CONFIG_KEY, JSON.stringify(config));
    notifyContentUpdate('site_config');
  } catch (err) {
    console.error('Failed to save Site Config to localStorage:', err);
  }

  // Persist directly to MongoDB
  try {
    fetch('/api/site-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    }).catch(e => console.warn('MongoDB Site Config sync:', e.message));
  } catch (e) {}

  // Cloud firestore sync
  try {
    syncToFirestore('site_config', config);
  } catch {}
}
