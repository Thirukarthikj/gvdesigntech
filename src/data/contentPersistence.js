import { mouList } from './mous.js';
import { galleryItems } from './gallery.js';
import { blogPosts, blogCategories } from './blogs.js';
import { initialCourses } from './coursesData.js';
import { initialInternshipPrograms } from './internshipsData.js';
import { initialSkillQuestions } from './skillTestData.js';
import { syncToFirestore, subscribeToFirestore } from '../services/firebase.js';
import { isVideoFile, formatVideoEmbedUrl } from './videoUtils.js';

// Keys for localStorage
const MOU_KEY = 'gv_admin_mous';
const GALLERY_KEY = 'gv_admin_gallery';
const PLACEMENT_KEY = 'gv_admin_placement';
const BLOG_KEY = 'gv_admin_blogs';
const CERT_KEY = 'gv_admin_certificates';
const LEADERS_KEY = 'gv_admin_leaders';
const COURSE_KEY = 'gv_admin_courses';
const INTERNSHIP_PROGRAMS_KEY = 'gv_admin_internship_programs';
const SKILL_TEST_QUESTIONS_KEY = 'gv_skill_test_questions';
const SKILL_TEST_RESULTS_KEY = 'gv_skill_test_results';
const SITE_CONFIG_KEY = 'gv_site_config';
const CUSTOM_DEPTS_KEY = 'gv_admin_custom_departments';

export const initialSiteConfig = {
  contactInfo: {
    heading: 'Headquarters: Oddanchatram, Tamil Nadu',
    address: 'Headquarters: Oddanchatram, Tamil Nadu 624619',
    email: 'gvdesigntech707@gmail.com',
    phone: '+91 96553 64707',
    secondaryPhone: '',
    operatingHoursWeekdays: 'Monday – Saturday: 9:00 AM – 7:00 PM',
    operatingHoursSunday: 'Sunday: Prior Appointment Only',
    mapAddress: 'Headquarters: Oddanchatram, Dindigul District, Tamil Nadu 624619, India',
    mapDirectionsUrl: 'https://maps.google.com/?q=Oddanchatram,+Tamil+Nadu',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Oddanchatram,+Tamil+Nadu,+India&t=&z=14&ie=UTF8&iwloc=&output=embed'
  },
  socialLinks: {
    youtube: 'https://www.youtube.com/@GVDESIGNTECH',
    instagram: 'https://www.instagram.com/gvdesigntech/',
    linkedin: 'https://www.linkedin.com/in/gv-design-tech-undefined-42845a35a',
    facebook: 'https://www.facebook.com/profile.php?id=61596803677692',
    whatsapp: 'https://wa.me/919655364707'
  },
  demoVideo: {
    videoUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=UCSTvrgSrwwi5hx3mdkXLX5A',
    title: 'Watch How We Shape the Future of CAD & Engineering Design Education',
    description: 'Take a guided virtual tour through our state-of-the-art CAD workstations, hands-on 3D printing & prototyping labs, BIM coordination studios, and placement training sessions at GV DesignTech.'
  },
  aboutVideo: {
    videoUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=UCSTvrgSrwwi5hx3mdkXLX5A',
    title: 'GV DesignTech Academy Showcase',
    tag: '3D 5-AXIS VMC MACHINING CENTER'
  },
  recentActivity: {
    badge: 'NEW',
    title: 'Recent Activities',
    desc: "See what's happening at GV DesignTech.",
    thumb: '/assets/recent-activity/ai-workshop-2.jpg',
    modalHeading: 'AI Workshop',
    modalHeadingAccent: 'Successfully Completed',
    modalText: 'Students participated in a hands-on AI and technology workshop focused on practical learning, real-world applications, and future-ready skills.',
    modalDate: 'September 2026',
    modalLocation: 'GV DesignTech, Oddanchatram, Tamil Nadu',
    items: [
      {
        id: 'act-1',
        src: '/assets/recent-activity/ai-workshop-2.jpg',
        alt: 'CAD Training Classroom',
        title: 'AI Workshop',
        accent: 'Successfully Completed',
        desc: 'Students participated in a hands-on AI and technology workshop focused on practical learning, real-world applications, and future-ready skills.',
        date: 'September 2026',
        location: 'GV DesignTech, Oddanchatram, Tamil Nadu'
      },
      {
        id: 'act-2',
        src: '/assets/recent-activity/ai-workshop-3.jpg',
        alt: 'CAD Workshop Mentorship',
        title: 'Masterclass Workshop',
        accent: 'Industrial Prototyping',
        desc: 'Hands-on CAD modeling, engineering design verification, and direct mentorship session with industry specialists.',
        date: 'October 2026',
        location: 'GV DesignTech, Oddanchatram, Tamil Nadu'
      }
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
    studentImage: '/assets/gokul-prasath.jpg',
    course: 'Master Diploma in Mechanical CAD & FEA Simulation',
    completionDate: '15 November 2026',
    grade: 'Distinction (A+)',
    status: 'VERIFIED AUTHENTIC',
    issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
  },
  'GV-BIM-2024-204': {
    certId: 'GV-BIM-2024-204',
    name: 'Praveen Kumar',
    studentImage: '/assets/chairman-real-uq_F_5Yk.jpg',
    course: 'Civil CADD & Structural BIM Architecture',
    completionDate: '20 November 2026',
    grade: 'Distinction (A+)',
    status: 'VERIFIED AUTHENTIC',
    issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
  },
  'GV-CNC-2024-301': {
    certId: 'GV-CNC-2024-301',
    name: 'Suresh Babu',
    studentImage: '/assets/image1-CO0kRs3Y.jpeg',
    course: 'CNC Programming & MasterCAM Precision Machining',
    completionDate: '18 November 2026',
    grade: 'Distinction (A+)',
    status: 'VERIFIED AUTHENTIC',
    issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
  },
  'GV-AI-2024-001': {
    certId: 'GV-AI-2024-001',
    name: 'Arun Kumar',
    studentImage: '/assets/chairman-real-uq_F_5Yk.jpg',
    course: 'Artificial Intelligence & Deep Learning Master Track',
    completionDate: '14 August 2026',
    grade: 'Distinction (A+)',
    status: 'VERIFIED AUTHENTIC',
    issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
  },
  'GV-DS-2024-042': {
    certId: 'GV-DS-2024-042',
    name: 'Sanjana Priya',
    studentImage: '/assets/image2-KIrwALpr.jpeg',
    course: 'Advanced Data Science & MLOps Certification',
    completionDate: '28 September 2026',
    grade: 'Distinction (A+)',
    status: 'VERIFIED AUTHENTIC',
    issuedBy: 'GV DesignTech, Oddanchatram, Tamil Nadu'
  },
  'GV-FS-2024-118': {
    certId: 'GV-FS-2024-118',
    name: 'Vignesh Kumar',
    studentImage: '/assets/gokul-prasath.jpg',
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
    const [mousRes, galRes, placeRes, blogsRes, leadRes, certRes, leadsRes, coursesRes, internRes, siteConfigRes, internApplicantsRes] = await Promise.allSettled([
      fetch('/api/mous').then(r => r.ok ? r.json() : null),
      fetch('/api/gallery').then(r => r.ok ? r.json() : null),
      fetch('/api/placements').then(r => r.ok ? r.json() : null),
      fetch('/api/blogs').then(r => r.ok ? r.json() : null),
      fetch('/api/leaders').then(r => r.ok ? r.json() : null),
      fetch('/api/certificates').then(r => r.ok ? r.json() : null),
      fetch('/api/leads').then(r => r.ok ? r.json() : null),
      fetch('/api/courses').then(r => r.ok ? r.json() : null),
      fetch('/api/internship-programs').then(r => r.ok ? r.json() : null),
      fetch('/api/site-config').then(r => r.ok ? r.json() : null),
      fetch('/api/internship-applicants').then(r => r.ok ? r.json() : null)
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
      const mergedConfig = {
        ...initialSiteConfig,
        ...siteConfigRes.value,
        contactInfo: { ...initialSiteConfig.contactInfo, ...(siteConfigRes.value.contactInfo || {}) },
        socialLinks: { ...initialSiteConfig.socialLinks, ...(siteConfigRes.value.socialLinks || {}) },
        demoVideo: { ...initialSiteConfig.demoVideo, ...(siteConfigRes.value.demoVideo || {}) }
      };
      localStorage.setItem(SITE_CONFIG_KEY, JSON.stringify(mergedConfig));
      changed = true;
    }
    if (internApplicantsRes && internApplicantsRes.status === 'fulfilled' && Array.isArray(internApplicantsRes.value) && internApplicantsRes.value.length > 0) {
      localStorage.setItem('gv_admin_internships', JSON.stringify(internApplicantsRes.value));
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
      if (initialCourses && initialCourses.length > 0) {
        localStorage.setItem(COURSE_KEY, JSON.stringify(initialCourses));
        return initialCourses;
      }
      return [];
    }
    const list = JSON.parse(raw);
    return Array.isArray(list) ? dedupeCourseList(list) : (initialCourses || []);
  } catch {
    return initialCourses || [];
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
      contactInfo: { ...initialSiteConfig.contactInfo, ...(parsed.contactInfo || {}) },
      socialLinks: { ...initialSiteConfig.socialLinks, ...(parsed.socialLinks || {}) },
      demoVideo: {
        ...initialSiteConfig.demoVideo,
        ...(parsed.demoVideo || {}),
        videoUrl: isVideoFile(parsed.demoVideo?.videoUrl)
          ? (parsed.demoVideo?.videoUrl || '').trim()
          : formatVideoEmbedUrl(parsed.demoVideo?.videoUrl || initialSiteConfig.demoVideo.videoUrl)
      },
      aboutVideo: {
        ...initialSiteConfig.aboutVideo,
        ...(parsed.aboutVideo || {}),
        videoUrl: isVideoFile(parsed.aboutVideo?.videoUrl)
          ? (parsed.aboutVideo?.videoUrl || '').trim()
          : formatVideoEmbedUrl(parsed.aboutVideo?.videoUrl || initialSiteConfig.aboutVideo.videoUrl)
      },
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
  const sanitizedConfig = config ? {
    ...config,
    demoVideo: config.demoVideo ? {
      ...config.demoVideo,
      videoUrl: isVideoFile(config.demoVideo.videoUrl)
        ? (config.demoVideo.videoUrl || '').trim()
        : formatVideoEmbedUrl(config.demoVideo.videoUrl || '')
    } : config.demoVideo,
    aboutVideo: config.aboutVideo ? {
      ...config.aboutVideo,
      videoUrl: isVideoFile(config.aboutVideo.videoUrl)
        ? (config.aboutVideo.videoUrl || '').trim()
        : formatVideoEmbedUrl(config.aboutVideo.videoUrl || '')
    } : config.aboutVideo
  } : config;

  // Protect localStorage from QuotaExceededError by stripping large base64 video payloads
  let localSafeConfig = sanitizedConfig;
  if (
    sanitizedConfig?.demoVideo?.videoUrl?.startsWith('data:video/') ||
    sanitizedConfig?.aboutVideo?.videoUrl?.startsWith('data:video/')
  ) {
    localSafeConfig = {
      ...sanitizedConfig,
      demoVideo: sanitizedConfig.demoVideo ? {
        ...sanitizedConfig.demoVideo,
        videoUrl: sanitizedConfig.demoVideo.videoUrl.startsWith('data:video/')
          ? 'indexeddb://demoVideo'
          : sanitizedConfig.demoVideo.videoUrl
      } : sanitizedConfig.demoVideo,
      aboutVideo: sanitizedConfig.aboutVideo ? {
        ...sanitizedConfig.aboutVideo,
        videoUrl: sanitizedConfig.aboutVideo.videoUrl.startsWith('data:video/')
          ? 'indexeddb://aboutVideo'
          : sanitizedConfig.aboutVideo.videoUrl
      } : sanitizedConfig.aboutVideo
    };
  }

  try {
    localStorage.setItem(SITE_CONFIG_KEY, JSON.stringify(localSafeConfig));
    notifyContentUpdate('site_config');
  } catch (err) {
    console.warn('Failed to save Site Config to localStorage (possibly quota exceeded):', err.message);
    notifyContentUpdate('site_config');
  }

  // Persist directly to MongoDB and sync back clean short URLs
  try {
    fetch('/api/site-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedConfig)
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && typeof data === 'object') {
          try {
            const current = getStoredSiteConfig();
            const merged = { ...current, ...data };
            localStorage.setItem(SITE_CONFIG_KEY, JSON.stringify(merged));
            notifyContentUpdate('site_config');
          } catch {}
        }
      })
      .catch(e => console.warn('MongoDB Site Config sync:', e.message));
  } catch (e) {}

  // Cloud firestore sync (only if payload is small enough for Firestore's 1MB limit)
  try {
    if (JSON.stringify(localSafeConfig).length < 800000) {
      syncToFirestore('site_config', localSafeConfig);
    }
  } catch {}
}

/* ==========================================================================
   11. Skill Test Questions Persistence (Dynamic Admin Question Bank)
   ========================================================================== */
export function getStoredSkillTestQuestions() {
  try {
    const raw = localStorage.getItem(SKILL_TEST_QUESTIONS_KEY);
    if (!raw) {
      localStorage.setItem(SKILL_TEST_QUESTIONS_KEY, JSON.stringify(initialSkillQuestions));
      return initialSkillQuestions;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialSkillQuestions;
  } catch {
    return initialSkillQuestions;
  }
}

export function saveStoredSkillTestQuestions(questions) {
  try {
    localStorage.setItem(SKILL_TEST_QUESTIONS_KEY, JSON.stringify(questions));
    notifyContentUpdate('skill_test_questions');
  } catch (err) {
    console.error('Failed to save skill test questions to localStorage:', err);
  }

  // Persist directly to MongoDB
  try {
    fetch('/api/skill-test-questions/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questions)
    }).catch(e => console.warn('MongoDB Skill Test Questions sync error:', e.message));
  } catch (e) {}

  // Cloud Firestore sync
  try {
    syncToFirestore('skill_test_questions', questions);
  } catch {}
}

/* ==========================================================================
   12. Skill Test Student Results Persistence (Admin Score Registry)
   ========================================================================== */
export function getStoredSkillTestResults() {
  try {
    const raw = localStorage.getItem(SKILL_TEST_RESULTS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredSkillTestResult(result) {
  try {
    const existing = getStoredSkillTestResults();
    const cleanResult = {
      ...result,
      id: result.id || `str-${Date.now()}`,
      submittedAt: result.submittedAt || new Date().toISOString()
    };
    const updated = [cleanResult, ...existing.filter(r => r.id !== cleanResult.id)];
    localStorage.setItem(SKILL_TEST_RESULTS_KEY, JSON.stringify(updated));
    notifyContentUpdate('skill_test_results');

    // Also persist student lead if phone/email provided
    try {
      const leads = JSON.parse(localStorage.getItem('gv_admin_leads') || '[]');
      const newLead = {
        id: 'lead-test-' + Date.now(),
        name: cleanResult.studentName,
        email: cleanResult.email,
        phone: cleanResult.phone,
        college: cleanResult.college || 'Skill Test Assessment',
        program: `${cleanResult.domainLabel || cleanResult.domain} Skill Test (Score: ${cleanResult.score}/${cleanResult.totalQuestions})`,
        message: `Attended Skill Test on ${cleanResult.domainLabel || cleanResult.domain}. Scored ${cleanResult.score}/${cleanResult.totalQuestions} (${cleanResult.percentage}% - ${cleanResult.status}).`,
        date: new Date().toISOString().split('T')[0],
        status: cleanResult.percentage >= 60 ? 'Qualified' : 'New'
      };
      const updatedLeads = [newLead, ...leads];
      localStorage.setItem('gv_admin_leads', JSON.stringify(updatedLeads));
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      }).catch(() => {});
    } catch {}

    // Persist test result directly to MongoDB
    try {
      fetch('/api/skill-test-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanResult)
      }).catch(e => console.warn('MongoDB Skill Test Result sync error:', e.message));
    } catch (e) {}

    // Cloud Firestore sync
    try {
      syncToFirestore('skill_test_results', updated);
    } catch {}

    return cleanResult;
  } catch (err) {
    console.error('Failed to save skill test result:', err);
    return result;
  }
}

export function deleteStoredSkillTestResult(id) {
  try {
    const existing = getStoredSkillTestResults();
    const updated = existing.filter(r => r.id !== id);
    localStorage.setItem(SKILL_TEST_RESULTS_KEY, JSON.stringify(updated));
    notifyContentUpdate('skill_test_results');

    try {
      fetch(`/api/skill-test-results/${id}`, { method: 'DELETE' }).catch(() => {});
    } catch {}

    try {
      syncToFirestore('skill_test_results', updated);
    } catch {}
  } catch (err) {
    console.error('Failed to delete skill test result:', err);
  }
}

export function clearStoredSkillTestResults() {
  try {
    localStorage.setItem(SKILL_TEST_RESULTS_KEY, JSON.stringify([]));
    notifyContentUpdate('skill_test_results');

    try {
      fetch('/api/skill-test-results', { method: 'DELETE' }).catch(() => {});
    } catch {}

    try {
      syncToFirestore('skill_test_results', []);
    } catch {}
  } catch (err) {
    console.error('Failed to clear skill test results:', err);
  }
}

// Re-export internship applicants pipeline utilities
export {
  getStoredInternships,
  saveStoredInternships,
  saveStoredInternshipApplicant
} from './adminInitialData.js';

// Default Departments Definition
export const DEFAULT_DEPARTMENTS = [
  'Mechanical & Automobile',
  'Civil Engineering & BIM',
  'CNC Programming & CAM',
  'Computer Science & IT',
  'EEE & Automation',
  'ECE Embedded & IoT',
  'Piping Engineering (Oil & Gas)',
  'Robotics & Automation',
  'AI & Data Science'
];

export function isCustomDepartment(deptName) {
  if (!deptName) return false;
  return !DEFAULT_DEPARTMENTS.some(d => d.toLowerCase().trim() === deptName.toLowerCase().trim());
}

export function slugifyDepartment(deptName = '') {
  return (deptName || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeInternshipLink(prog) {
  if (!prog) return '/internship';
  let link = (typeof prog === 'string' ? prog : prog.link || '').trim();

  // Fix common typos in prefix like /interahip/..., /intership/..., /intern/...
  link = link.replace(/^\/+inter[a-z]*\//i, '/internship/');

  // If empty, or just root internship page
  if (!link || link === '/internship' || link === '/internship/' || link === '#' || link === '/') {
    const title = typeof prog === 'object' ? (prog.title || prog.subtitle || '') : '';
    const slug = slugifyDepartment(title);
    return slug ? `/internship/${slug}` : '/internship';
  }

  if (!link.startsWith('/')) {
    link = `/${link}`;
  }

  // Pre-configured paths like /internship/aiInternship
  if (link.startsWith('/internship/') || link.startsWith('/internships/')) {
    return link;
  }

  return `/internship/${link.replace(/^\/+/, '')}`;
}

export function getDepartmentIcon(deptName = '') {
  const d = (deptName || '').toLowerCase().trim();
  if (d.includes('aero') || d.includes('space') || d.includes('aviation')) return '🚀';
  if (d.includes('mech') || d.includes('auto')) return '⚙️';
  if (d.includes('civil') || d.includes('bim') || d.includes('arch')) return '🏛️';
  if (d.includes('cnc') || d.includes('cam') || d.includes('machin')) return '⚡';
  if (d.includes('computer') || d.includes('software') || d.includes('web') || d === 'cs' || d.startsWith('cs ')) return '💻';
  if (d.includes('robot') || d.includes('auto')) return '🤖';
  if (d.includes('eee') || d.includes('electr')) return '💡';
  if (d.includes('ece') || d.includes('embed') || d.includes('iot')) return '📡';
  if (d.includes('piping') || d.includes('oil') || d.includes('gas')) return '🛢️';
  if (d.includes('ai') || d.includes('data') || d.includes('learn')) return '🧠';
  if (d.includes('marine') || d.includes('ocean')) return '⚓';
  if (d.includes('bio') || d.includes('medic') || d.includes('health')) return '🧬';
  if (d.includes('chem') || d.includes('material')) return '🧪';
  return '🎓';
}

export function courseMatchesDept(course, deptName) {
  if (!course || !deptName) return false;
  const target = deptName.toLowerCase().trim();
  const cDept = (course.department || '').toLowerCase().trim();

  // Exact match always matches
  if (cDept === target) return true;

  // Check if target is a custom department (i.e. not in DEFAULT_DEPARTMENTS)
  const isTargetDefault = DEFAULT_DEPARTMENTS.some(d => d.toLowerCase().trim() === target);
  if (!isTargetDefault) {
    // For ANY CUSTOM department: STRICT EXACT MATCH ONLY!
    return cDept === target;
  }

  // Check if the course itself has a custom department
  const isCourseCustom = !DEFAULT_DEPARTMENTS.some(d => d.toLowerCase().trim() === cDept);
  if (isCourseCustom) {
    // A course assigned to a custom department MUST NEVER leak into any default department section!
    return false;
  }

  // Canonical aliases for DEFAULT_DEPARTMENTS ONLY:
  if (target === 'mechanical & automobile') {
    return cDept.includes('mech') || cDept.includes('automobile');
  }
  if (target === 'civil engineering & bim') {
    return cDept.includes('civil') || cDept.includes('bim');
  }
  if (target === 'cnc programming & cam') {
    return cDept.includes('cnc') || cDept.includes('cam');
  }
  if (target === 'computer science & it') {
    return cDept.includes('computer') || cDept.includes('software') || cDept === 'it';
  }
  if (target === 'eee & automation') {
    return cDept.includes('eee') || cDept.includes('electrical');
  }
  if (target === 'ece embedded & iot') {
    return cDept.includes('ece') || cDept.includes('embedded') || cDept.includes('iot');
  }
  if (target === 'piping engineering (oil & gas)') {
    return cDept.includes('piping') || cDept.includes('oil');
  }
  if (target === 'robotics & automation') {
    return cDept.includes('robotics');
  }
  if (target === 'ai & data science') {
    return cDept.includes('ai') || cDept.includes('data science') || cDept.includes('analytics');
  }

  return false;
}

// Custom Departments Management
export function getStoredCustomDepartments() {
  try {
    const raw = localStorage.getItem(CUSTOM_DEPTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredCustomDepartments(depts) {
  try {
    const clean = Array.isArray(depts)
      ? Array.from(new Set(depts.filter(d => typeof d === 'string' && d.trim()))).map(d => d.trim())
      : [];
    localStorage.setItem(CUSTOM_DEPTS_KEY, JSON.stringify(clean));
    notifyContentUpdate('custom_departments');

    try {
      syncToFirestore('custom_departments', { departments: clean });
    } catch {}
  } catch (err) {
    console.error('Failed to save custom departments:', err);
  }
}
