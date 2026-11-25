// Initial seed data and local persistence helpers for GV DesignTech Admin Portal

export const initialAdminLeads = [
  {
    id: 'lead-101',
    name: 'Karthik Subramanian',
    email: 'karthik.s@gmail.com',
    phone: '+91 98421 55670',
    college: 'Dr. Mahalingam College of Engineering (MCET)',
    program: 'Mechanical & Automobile CAD',
    message: 'Interested in SolidWorks, CATIA surfacing, and GD&T drafting for automotive OEM placement.',
    date: '2026-11-23',
    status: 'New'
  },
  {
    id: 'lead-102',
    name: 'Priya Dharshini',
    email: 'priyadharshini.v@outlook.com',
    phone: '+91 97890 22341',
    college: 'Bannari Amman Institute of Technology (BIT)',
    program: 'Civil BIM & Structural Design',
    message: 'Looking for Revit Architecture & STAAD.Pro hands-on project training.',
    date: '2026-11-22',
    status: 'Contacted'
  },
  {
    id: 'lead-103',
    name: 'Vigneshwaran M',
    email: 'vignesh.cad@gmail.com',
    phone: '+91 94432 88910',
    college: 'Government College of Technology (GCT) Coimbatore',
    program: 'CNC Programming & MasterCAM',
    message: 'Want to learn 5-axis CNC milling toolpath programming and G-Code generation.',
    date: '2026-11-21',
    status: 'Enrolled'
  },
  {
    id: 'lead-104',
    name: 'Ananya Ramesh',
    email: 'ananya.ramesh@gmail.com',
    phone: '+91 96551 44328',
    college: 'Kumaraguru College of Technology (KCT)',
    program: 'Computer Science & Full Stack',
    message: 'Seeking hands-on Python, React, and Database engineering masterclass.',
    date: '2026-11-21',
    status: 'Contacted'
  },
  {
    id: 'lead-105',
    name: 'Suresh Kumar R',
    email: 'suresh.piping@gmail.com',
    phone: '+91 99440 12890',
    college: 'PSG College of Technology',
    program: 'Piping Engineering (Oil & Gas)',
    message: 'Interested in SP3D, AVEVA E3D, and pipe stress analysis for refinery EPC consultancy.',
    date: '2026-11-20',
    status: 'New'
  },
  {
    id: 'lead-106',
    name: 'Divya Bharathi',
    email: 'divya.eee@gmail.com',
    phone: '+91 98433 77612',
    college: 'Sri Krishna College of Engineering and Technology (SKCET)',
    program: 'EEE & Industrial Automation',
    message: 'Require Siemens PLC & SCADA panel designing training with physical hardware kit.',
    date: '2026-11-19',
    status: 'Enrolled'
  },
  {
    id: 'lead-107',
    name: 'Aravind Swaminathan',
    email: 'aravind.ece@gmail.com',
    phone: '+91 97500 33418',
    college: 'CIT Coimbatore',
    program: 'ECE – Embedded Systems & IoT',
    message: 'Interested in PCB design in Altium and ARM Cortex microcontroller programming.',
    date: '2026-11-18',
    status: 'Archived'
  }
];

export const initialAdminBatches = [
  {
    id: 'batch-m01',
    department: 'Mechanical',
    courseName: 'Master Mechanical & Automobile CAD',
    startDate: '2026-12-05',
    timing: 'Morning Batch (09:30 AM - 12:30 PM)',
    mode: 'Classroom Studio',
    totalSeats: 25,
    filledSeats: 21,
    status: 'Filling Fast'
  },
  {
    id: 'batch-c01',
    department: 'Civil',
    courseName: 'Civil BIM & Structural Detailing',
    startDate: '2026-12-08',
    timing: 'Evening Batch (02:00 PM - 05:00 PM)',
    mode: 'Hybrid Lab',
    totalSeats: 20,
    filledSeats: 16,
    status: 'Filling Fast'
  },
  {
    id: 'batch-cnc01',
    department: 'CNC',
    courseName: '5-Axis CNC Milling & CAM Masterclass',
    startDate: '2026-12-12',
    timing: 'Weekend Batch (Sat & Sun Full Day)',
    mode: 'Workshop Floor',
    totalSeats: 15,
    filledSeats: 14,
    status: 'Almost Full'
  },
  {
    id: 'batch-cs01',
    department: 'Computer Science',
    courseName: 'Full Stack & Data Engineering',
    startDate: '2026-12-15',
    timing: 'Regular Batch (10:00 AM - 01:00 PM)',
    mode: 'Online Interactive',
    totalSeats: 30,
    filledSeats: 18,
    status: 'Active'
  },
  {
    id: 'batch-pipe01',
    department: 'Piping',
    courseName: 'AVEVA E3D & Plant 3D Master Track',
    startDate: '2026-12-18',
    timing: 'Evening Batch (04:30 PM - 07:30 PM)',
    mode: 'Classroom Studio',
    totalSeats: 18,
    filledSeats: 9,
    status: 'Upcoming'
  },
  {
    id: 'batch-eee01',
    department: 'EEE & Automation',
    courseName: 'PLC, SCADA & Electrical Panel Design',
    startDate: '2026-12-20',
    timing: 'Morning Batch (09:30 AM - 12:30 PM)',
    mode: 'Physical Lab',
    totalSeats: 20,
    filledSeats: 11,
    status: 'Upcoming'
  }
];

export const initialAdminInternships = [
  {
    id: 'intern-201',
    candidateName: 'Ravi Teja M',
    email: 'raviteja.eng@gmail.com',
    phone: '+91 98840 99812',
    college: 'MCET Pollachi',
    department: 'Mechanical',
    cgpa: '8.4',
    internshipProgram: 'AI in Engineering Internship',
    appliedDate: '2026-11-23',
    status: 'Shortlisted'
  },
  {
    id: 'intern-202',
    candidateName: 'Meenakshi Sundaram',
    email: 'meena.sundar@gmail.com',
    phone: '+91 94451 22319',
    college: 'PSG College of Tech',
    department: 'CSE',
    cgpa: '8.9',
    internshipProgram: 'Data Science Internship',
    appliedDate: '2026-11-22',
    status: 'Selected'
  },
  {
    id: 'intern-203',
    candidateName: 'Balaji K',
    email: 'balaji.cad@gmail.com',
    phone: '+91 97899 44102',
    college: 'GCT Coimbatore',
    department: 'Civil',
    cgpa: '7.8',
    internshipProgram: 'College Internship Program',
    appliedDate: '2026-11-21',
    status: 'Under Review'
  },
  {
    id: 'intern-204',
    candidateName: 'Sanjay Krishnan',
    email: 'sanjay.krish@gmail.com',
    phone: '+91 99420 55819',
    college: 'KCT Coimbatore',
    department: 'Mechatronics',
    cgpa: '8.2',
    internshipProgram: 'Summer Internship Program',
    appliedDate: '2026-11-20',
    status: 'Shortlisted'
  },
  {
    id: 'intern-205',
    candidateName: 'Sneha Varadarajan',
    email: 'sneha.v@gmail.com',
    phone: '+91 96550 11984',
    college: 'BIT Sathy',
    department: 'AI & Data Science',
    cgpa: '9.1',
    internshipProgram: 'Machine Learning Internship',
    appliedDate: '2026-11-19',
    status: 'Selected'
  }
];

// Helper functions for localStorage persistence
const LEADS_KEY = 'gv_admin_leads';
const BATCHES_KEY = 'gv_admin_batches';
const INTERNS_KEY = 'gv_admin_internships';

export function getStoredLeads() {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_KEY, JSON.stringify(initialAdminLeads));
      return initialAdminLeads;
    }
    return JSON.parse(raw);
  } catch {
    return initialAdminLeads;
  }
}

export function saveStoredLeads(leads) {
  try {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Failed to save leads', err);
  }
  try {
    fetch('/api/leads/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leads)
    }).catch(e => console.warn('MongoDB Leads sync:', e.message));
  } catch (e) {}
}

export function getStoredBatches() {
  try {
    const raw = localStorage.getItem(BATCHES_KEY);
    if (!raw) {
      localStorage.setItem(BATCHES_KEY, JSON.stringify(initialAdminBatches));
      return initialAdminBatches;
    }
    return JSON.parse(raw);
  } catch {
    return initialAdminBatches;
  }
}

export function saveStoredBatches(batches) {
  try {
    localStorage.setItem(BATCHES_KEY, JSON.stringify(batches));
  } catch (err) {
    console.error('Failed to save batches', err);
  }
}

export function getStoredInternships() {
  try {
    const raw = localStorage.getItem(INTERNS_KEY);
    if (!raw || raw === '[]') {
      localStorage.setItem(INTERNS_KEY, JSON.stringify(initialAdminInternships));
      return initialAdminInternships;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(INTERNS_KEY, JSON.stringify(initialAdminInternships));
      return initialAdminInternships;
    }
    return parsed;
  } catch {
    return initialAdminInternships;
  }
}

export function saveStoredInternships(interns) {
  try {
    localStorage.setItem(INTERNS_KEY, JSON.stringify(interns));
  } catch (err) {
    console.error('Failed to save internships', err);
  }
}
