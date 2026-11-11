import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data storage path
const DATA_DIR = path.join(__dirname, '../data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// In-memory rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ENQUIRIES_PER_WINDOW = 6;

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_ENQUIRIES_PER_WINDOW) {
    return false;
  }
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

// Valid courses list
const VALID_COURSES = [
  'C Programming',
  'C++',
  'Java',
  'Python',
  'Django',
  'MySQL',
  'HTML',
  'Frontend Development',
  'Adobe Photoshop',
  'Adobe XD',
  'Figma',
  'UI/UX Design',
  'Adobe Illustrator',
  'AutoCAD',
  'SolidWorks',
  'Creo PTC',
  'CATIA',
  'Mastercam',
  'SolidCAM',
  'GD&T',
  'Reverse Engineering',
  'Civil Engineering Software Training',
  'CNC Programming & Machining',
  'Arts & Creative Multimedia',
  'General Technical Enquiry'
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    institute: 'GV DESIGN TECH',
    tagline: 'Learn Today. Lead Tomorrow.',
    location: 'Oddanchatram, Tamil Nadu, India',
    timestamp: new Date().toISOString()
  });
});

// Enquiries submission endpoint
app.post('/api/enquire', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  // 1. Honeypot spam check
  // Hidden field `website` or `fax` must be empty. If filled, bot detected.
  if (req.body.website || req.body.fax) {
    return res.status(400).json({
      success: false,
      message: 'Spam submission detected.'
    });
  }

  // 2. Rate limiting check
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Too many enquiries submitted from this network. Please wait a few minutes before trying again or call us directly at +91 96553 64707.'
    });
  }

  const { fullName, mobileNumber, email, course, preferredMode, message } = req.body;

  // 3. Validation checks
  const errors = {};

  // Full Name validation
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (minimum 2 characters).';
  }

  // Indian Mobile number validation
  // Strips optional leading +91 or 0, checks if it is a 10-digit number starting with 6, 7, 8, or 9
  const cleanedMobile = (mobileNumber || '').toString().trim().replace(/^(\+91|0)/, '').replace(/\s+/g, '');
  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (!cleanedMobile || !indianMobileRegex.test(cleanedMobile)) {
    errors.mobileNumber = 'Please provide a valid 10-digit Indian mobile number (e.g. 9655364707).';
  }

  // Email validation (optional in frontend, but if supplied must be valid)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && typeof email === 'string' && email.trim().length > 0 && !emailRegex.test(email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  // Preferred Mode validation
  if (!preferredMode || typeof preferredMode !== 'string' || preferredMode.trim().length === 0) {
    errors.preferredMode = 'Please select a preferred online batch schedule.';
  }

  // Course validation
  if (!course || typeof course !== 'string' || course.trim().length === 0) {
    errors.course = 'Please select a course of interest.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please resolve the highlighted validation errors.',
      errors
    });
  }

  // Create new enquiry record
  const newEnquiry = {
    id: `GVD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    fullName: fullName.trim(),
    mobileNumber: `+91 ${cleanedMobile}`,
    email: email.trim().toLowerCase(),
    course: course.trim(),
    preferredMode,
    message: (message || '').trim(),
    createdAt: new Date().toISOString(),
    ip: clientIp,
    status: 'New'
  };

  // Construct direct WhatsApp dispatch URL for official admissions hotline (+91 96553 64707)
  const whatsappLines = [
    `*NEW ADMISSION ENQUIRY — GV DESIGN TECH*`,
    ``,
    `*Student Name:* ${newEnquiry.fullName}`,
    `*Mobile Number:* ${newEnquiry.mobileNumber}`,
    `*Email:* ${newEnquiry.email}`,
    `*Course Selected:* ${newEnquiry.course}`,
    `*Preferred Schedule:* ${newEnquiry.preferredMode}`,
    newEnquiry.message ? `*Student Note:* ${newEnquiry.message}` : null,
    `*Enquiry Ref ID:* ${newEnquiry.id}`,
    ``,
    `_Transmitted via GV DESIGN TECH Official Admissions Desk (Oddanchatram)_`
  ].filter(Boolean).join('\n');

  const whatsappUrl = `https://wa.me/919655364707?text=${encodeURIComponent(whatsappLines)}`;

  try {
    const existingData = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    const enquiries = JSON.parse(existingData);
    enquiries.unshift(newEnquiry);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been registered and is ready to send to our official WhatsApp counseling desk.',
      enquiryId: newEnquiry.id,
      timestamp: newEnquiry.createdAt,
      whatsappUrl
    });
  } catch (err) {
    console.error('Error saving enquiry:', err);
    return res.status(500).json({
      success: false,
      message: 'A server error occurred while registering your enquiry. Please reach out via phone at +91 96553 64707.'
    });
  }
});

// Admin endpoint to view enquiries
app.get('/api/enquiries', (req, res) => {
  try {
    const data = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    const enquiries = JSON.parse(data);
    res.json({
      total: enquiries.length,
      enquiries
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve enquiries' });
  }
});

// Serve frontend build files in production
const CLIENT_DIST = path.join(__dirname, '../../client/dist');
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    res.sendFile(path.join(CLIENT_DIST, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`GV DESIGN TECH Full-Stack Application running on port ${PORT}`);
});
