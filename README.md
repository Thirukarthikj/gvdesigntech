# GV DesignTech — Frontend Application Clone

A responsive, high-fidelity React.js clone of [GV DesignTech](https://www.pybotaisolutions.com/) (Oddanchatram, Tamil Nadu), built using **Vite**, **React 18**, **JavaScript (ES Modules)**, **HTML5**, and **CSS3**.

This project reproduces the visual design, interactive functionality, responsive layouts, and authentic assets of the original website without creative redesign or placeholder shortcuts.

---

## 🚀 Features & Observable Behavior

### 1. Global Navigation & Branding
- **Header & Navbar (`Navbar.jsx`):**
  - High-resolution SVG & PNG branding with dual-tone logo ("GV DesignTech").
  - Dynamic desktop dropdown menus with hover/focus states:
    - **Courses (4 tracks):** Data Science, Data Analytics, Artificial Intelligence, Machine Learning.
    - **Internship (5 tracks):** AI Internship, Summer Internship, College Internship, Data Science Internship, Machine Learning Internship.
    - **Flagship (5 tracks):** MoU & Partnerships, Placement Records, Gallery Showcase, Tech Blog, Pybot Video.
  - Direct links for **About Us**, **Student Portal** (external redirect), and **Contact Us**.
  - **Skill Test CTA:** Highlights interactive competency quiz.
  - **Mobile Responsive Drawer:** Animated hamburger toggle with touch-friendly accordion dropdowns and direct route links.

### 2. Immersive Visuals & Interactive Elements
- **3D Orbital Particle Neural Network Canvas (`BrainCanvas.jsx`):**
  - Interactive HTML5 canvas rendering floating neural network nodes with distance-based synapsing lines, dynamic radial pulse effects, and particle physics.
- **Floating Social Sidebar & Dynamic Actions (`FloatingElements.jsx`):**
  - Fixed desktop side rail with authentic SVGs for LinkedIn, Instagram, YouTube, and Facebook.
  - WhatsApp floating chat button with infinite pulsing ping animation.
  - **3D Recent Activities Widget:**
    - Floating interactive teaser showing latest institutional events, MoU signings, and hackathon highlights.
    - Full-screen 3D perspective modal with auto-rotation, slide controls, and celebratory confetti burst (`canvas-confetti`).
- **Diwali Special EMI Countdown Modal (`EnrollModal.jsx`):**
  - Dynamic ticking countdown timer (starts at 1m 52s and decrements live).
  - Multi-field enrollment form with name, email, phone, program selection, and validation feedback.
- **Dual-Row Testimonial Scroller (`Home.jsx`):**
  - Seamless CSS marquee animations running in alternating directions displaying 24 verified student reviews with ratings, avatars, and college designations.

### 3. Core Pages & Routes

| Route | Page Component | Key Features & Observable Elements |
|---|---|---|
| `/` | `Home.jsx` | 13 complete sections: Hero with real-time model accuracy metrics (98.4%), 12K+ learners, Vinith Gunasekaran founder card, marquee ticker, About neural overview, counter stats, AI Radar & rotating earth globe, Brain canvas section, dual-row continuous testimonial carousels, CTA pill, and success placement track. |
| `/about` | `About.jsx` | Mission & Vision, institutional history, core leadership, 3 service capabilities, showcase badges, and institutional impact metrics. |
| `/datascience` | `DataScience.jsx` | Telemetry HUD overlays (Neural Net Status, Synapse Activity, Data Pipeline), floating widget pills, 8 curriculum modules, 6-month roadmap, and interactive FAQ accordion. |
| `/dataanalytics` | `DataAnalytics.jsx` | Analytics Engine HUD, metric grid (PowerBI, Tableau, SQL, Excel), career pathways, and FAQs. |
| `/Artificial` | `ArtificialIntelligence.jsx` | Deep learning & neural architectures, 8 core capabilities, 5-step engineering pipeline, and certification details. |
| `/machinelearning` | `MachineLearning.jsx` | Predictive modeling, regression & classification pipelines, 6-stage ML workflow, and enrollment triggers. |
| `/flagship/mou` | `FlagshipMou.jsx` | 17 verified official MoUs signed with colleges/universities across Tamil Nadu with authentic institutional photos, student counts, and partnership badges. |
| `/flagship/galleryPage` | `FlagshipGallery.jsx` | 35 authentic event photos with interactive category filters (*All, Internships, Workshops, Placements, Hackathons*) and full-screen image lightbox modal. |
| `/flagship/Placement` | `FlagshipPlacement.jsx` | Placement statistics, 5-stage student career journey, 9 preparation pillars, and verified student placement cards. |
| `/flagship/Blog-page` | `FlagshipBlog.jsx` | 50 authentic technical blog posts with category filtering, real-time search filter, featured article banner, and interactive full-text article reader modal. |
| `/internship/*` | 5 Internship Pages | Dedicated pages for AI, Summer, College, Data Science, and Machine Learning internships with weekly syllabus, real project deliverables, and mentor listings. |
| `/certificate-verification` | `CertificateVerification.jsx` | Real-time credential lookup engine with instant validation against authentic student ID formats (e.g. `PYBOT-AI-2024-001`), issuing dates, and grade badges. |
| `/Contactus` | `ContactUs.jsx` | Oddanchatram campus address, interactive Google Maps embed, phone/email contact cards, and working message submission form. |
| `/pest-exam` | `SkillTest.jsx` | Interactive multi-domain assessment engine (Python, AI & ML, Data Analytics) with timer, instant scoring, question review, and result card. |
| `/Login` & `/Register` | `Login.jsx` / `Register.jsx` | Secure student portal authentication forms with toggleable password visibility and remember-me controls. |
| `/Pybot-video` | `PybotVideo.jsx` | Interactive video player showcasing student testimonials, classroom sessions, and workshop recaps. |

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** React 18.3.1 (Functional Components, Hooks)
- **Routing:** React Router DOM 6.26.2 (`BrowserRouter`, `Routes`, `Route`, `Link`, `useLocation`, `useNavigate`)
- **Build Tool:** Vite 5.4.21
- **Styling:** Pure CSS3 + authentic CSS Module definitions (631 KB stylesheet faithfully preserved from original production build)
- **Typography:** Plus Jakarta Sans, Cormorant Garamond, Inter, DM Sans, Outfit, Space Mono, Syne, Poppins
- **Icons & Fonts:** FontAwesome 6 Webfonts (`fa-solid-900`, `fa-brands-400`, `fa-regular-400`) & Inline SVGs
- **Special FX:** HTML5 2D Canvas physics, `@rollup/wasm-node` compatibility layer, `canvas-confetti`

---

## 📁 Repository Structure

```
├── public/
│   ├── assets/               # 97 authentic image, SVG, and webfont assets
│   │   ├── fa-brands-400-*.woff2
│   │   ├── fa-regular-400-*.woff2
│   │   ├── fa-solid-900-*.woff2
│   │   ├── logo.png
│   │   └── ... (original institutional & student photos)
│   ├── favicon.ico
│   └── logo.png
├── src/
│   ├── components/           # Reusable interactive components
│   │   ├── BrainCanvas.jsx
│   │   ├── EnrollModal.jsx
│   │   ├── FloatingElements.jsx
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── data/                 # Authentic content extracted from reference site
│   │   ├── blogs.js          # 50 real technical articles
│   │   ├── gallery.js        # 35 real event & workshop photos
│   │   ├── mous.js           # 17 official signed MOUs
│   │   ├── styles.js         # CSS module dictionaries
│   │   └── testimonials.js   # 24 verified reviews
│   ├── pages/                # All application routes
│   │   ├── About.jsx
│   │   ├── AiInternship.jsx
│   │   ├── ArtificialIntelligence.jsx
│   │   ├── CertificateVerification.jsx
│   │   ├── CollegeInternship.jsx
│   │   ├── ContactUs.jsx
│   │   ├── DataAnalytics.jsx
│   │   ├── DataScience.jsx
│   │   ├── DataScienceInternship.jsx
│   │   ├── FlagshipBlog.jsx
│   │   ├── FlagshipGallery.jsx
│   │   ├── FlagshipMou.jsx
│   │   ├── FlagshipPlacement.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MachineLearning.jsx
│   │   ├── MachineLearningInternship.jsx
│   │   ├── PybotVideo.jsx
│   │   ├── Register.jsx
│   │   ├── SkillTest.jsx
│   │   └── SummerInternship.jsx
│   ├── App.jsx               # Application root, routing & layout orchestration
│   ├── index.css             # Authentic master styling & CSS animations
│   └── main.jsx              # React 18 entry point
├── tools/
│   └── extraction/           # Data & asset extraction utilities used during build
├── index.html                # HTML5 container with Google Fonts & metadata
├── package.json
└── vite.config.js
```

---

## ⚙️ Installation & Running

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (bundled with Node.js)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The server will start and be available at:
`http://localhost:3000/` (or your configured port).

### 3. Build for Production
To create an optimized, minified production build:
```bash
npm run build
```
The production bundle will be generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔍 Visual Fidelity & Verification Audit

- **Desktop Viewport (1440px / 1280px):** Verified pixel accuracy against `https://www.pybotaisolutions.com/` for header navigation, hero typography, glowing neural borders, marquee ticker speed, dual-row continuous review scroller, and footer ISO certification banner.
- **Mobile Viewport (375px × 812px):** Tested on mobile touch viewport. The hamburger menu expands smoothly, collapses on route selection, and touch gestures work seamlessly across all dropdowns.
- **Interactions Tested:**
  - Enrollment modal countdown decrements accurately and validates submission.
  - Recent Activities 3D card auto-rotates and triggers celebratory confetti when opened.
  - Certificate Verification query validates `PYBOT-AI-2024-001` and provides structured status feedback.
  - Gallery filter toggles categories cleanly and lightbox displays high-resolution photos.
  - Blog search filters 50 posts instantly by title, tag, or content snippet.
  - Skill Test executes full multiple-choice evaluation with grading.
