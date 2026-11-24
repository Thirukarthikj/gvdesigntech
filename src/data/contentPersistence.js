import { mouList } from './mous.js';
import { galleryItems } from './gallery.js';
import { blogPosts, blogCategories } from './blogs.js';

// Keys for localStorage
const MOU_KEY = 'gv_admin_mous';
const GALLERY_KEY = 'gv_admin_gallery';
const PLACEMENT_KEY = 'gv_admin_placement';
const BLOG_KEY = 'gv_admin_blogs';
const CERT_KEY = 'gv_admin_certificates';

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

/* --- 1. MOUs Persistence --- */
export function getStoredMous() {
  try {
    const raw = localStorage.getItem(MOU_KEY);
    if (!raw) {
      localStorage.setItem(MOU_KEY, JSON.stringify(mouList));
      return mouList;
    }
    return JSON.parse(raw);
  } catch {
    return mouList;
  }
}

export function saveStoredMous(list) {
  try {
    localStorage.setItem(MOU_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('gv_content_updated'));
  } catch (err) {
    console.error('Failed to save MOUs', err);
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
    window.dispatchEvent(new Event('gv_content_updated'));
  } catch (err) {
    console.error('Failed to save Gallery', err);
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
    window.dispatchEvent(new Event('gv_content_updated'));
  } catch (err) {
    console.error('Failed to save Placements', err);
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
    window.dispatchEvent(new Event('gv_content_updated'));
  } catch (err) {
    console.error('Failed to save Blogs', err);
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
    window.dispatchEvent(new Event('gv_content_updated'));
  } catch (err) {
    console.error('Failed to save Certificates', err);
  }
}
