import React from 'react';
import { Link } from 'react-router-dom';
import { COURSE_CATEGORIES } from '../../data/coursesData';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { ArrowRight, PhoneCall, Mail, Instagram, MapPin, Clock, ExternalLink } from 'lucide-react';

export const CinematicFooter: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <footer className="relative bg-canvas border-t border-canvas-border text-ink-secondary pt-20 pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cinematic-red/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Top Massive Typographic Signature */}
        <div className="border-b border-canvas-border pb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3">
            <span className="text-[11px] font-mono text-cinematic-red uppercase tracking-widest block">
              [ SCENE 09 // THE FINAL FRAME ]
            </span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-ink-pure leading-[0.9]">
              GV DESIGN TECH
            </h2>
            <p className="font-display text-xl sm:text-2xl font-normal text-ink-secondary tracking-tight">
              Learn Today. Lead Tomorrow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => openEnquiryModal()}
              className="px-8 py-4 rounded-full bg-cinematic-red hover:bg-cinematic-redHover text-white font-display font-bold text-xs uppercase tracking-wider shadow-glow-red transition-all flex items-center gap-2 group"
            >
              <span>REGISTER ADMISSION ENQUIRY</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 4-Column Editorial Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-canvas-border text-xs font-mono">
          {/* Column 1: Institute Profile & Location (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-ink-primary font-bold uppercase tracking-wider block">
              INSTITUTE CAMPUS
            </span>
            <p className="text-ink-secondary font-sans text-xs leading-relaxed font-light">
              Technical training institute in Oddanchatram, Tamil Nadu. Imparting practical software competence across Mechanical &amp; Automobile CAD, Civil Drafting, CNC Programming, Computer Science &amp; IT, and UI/UX.
            </p>

            <div className="space-y-1.5 pt-2 text-ink-muted">
              <div className="flex items-center gap-2 text-ink-secondary">
                <MapPin className="w-3.5 h-3.5 text-cinematic-red" />
                <span>Oddanchatram, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-ink-muted" />
                <span>Mon–Sat: 9:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 2: Program Tracks (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-ink-primary font-bold uppercase tracking-wider block">
              DISCIPLINES
            </span>
            <ul className="space-y-2">
              {COURSE_CATEGORIES.map(category => (
                <li key={category.id}>
                  <Link
                    to={`/courses/${category.slug}`}
                    className="text-ink-secondary hover:text-cinematic-red transition-colors block py-0.5"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-ink-primary font-bold uppercase tracking-wider block">
              NAVIGATION
            </span>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-ink-secondary hover:text-cinematic-red transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ink-secondary hover:text-cinematic-red transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-ink-secondary hover:text-cinematic-red transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/learning-modes" className="text-ink-secondary hover:text-cinematic-red transition-colors">
                  Learning Modes
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ink-secondary hover:text-cinematic-red transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Coordinates (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <span className="text-ink-primary font-bold uppercase tracking-wider block">
              ADMISSIONS DESK
            </span>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-ink-primary font-bold">
                <PhoneCall className="w-3.5 h-3.5 text-cinematic-red" />
                <a href="tel:+919655364707" className="hover:text-cinematic-red transition-colors">
                  +91 96553 64707
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-ink-muted" />
                <a href="mailto:gvdesigntech707@gmail.com" className="hover:text-cinematic-red transition-colors">
                  gvdesigntech707@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <a
                  href="https://instagram.com/gvdesigntech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors inline-flex items-center gap-1"
                >
                  @gvdesigntech <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizon Strip */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] text-ink-muted gap-4">
          <p>
            &copy; {new Date().getFullYear()} GV DESIGN TECH. ODDANCHATRAM, TAMIL NADU, INDIA.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-ink-primary uppercase">
              LEARN TODAY. LEAD TOMORROW.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

