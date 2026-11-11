import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { COURSE_CATEGORIES } from '../../data/coursesData';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Instagram,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <footer className="bg-white text-slate-700 pt-16 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200">
          {/* Column 1: Brand & Institute Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm mt-3">
              GV DESIGN TECH is a technical training institute headquartered in Oddanchatram, Tamil Nadu. We deliver structured practical software instruction in CAD, Engineering Design, Computer Science, UI/UX, Civil Drafting, and CNC Programming through live interactive online classes.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent-orange flex-shrink-0" />
                <span>Oddanchatram, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Operating Schedule: Mon–Sat: 9:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 2: Program Tracks (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-900">
              Program Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              {COURSE_CATEGORIES.map(category => (
                <li key={category.id}>
                  <Link
                    to={`/courses/${category.slug}`}
                    className="text-slate-600 hover:text-accent-orange transition-colors block py-0.5"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institution (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-900">
              Institution
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-600 hover:text-accent-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-accent-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-600 hover:text-accent-orange transition-colors">
                  Full Course Catalog
                </Link>
              </li>
              <li>
                <Link to="/learning-modes" className="text-slate-600 hover:text-accent-orange transition-colors">
                  Learning Modes
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-accent-orange transition-colors">
                  Contact Campus
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Enrollment (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-900">
              Contact & Enrollment
            </h4>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-accent-orange flex-shrink-0" />
                <div className="flex items-center gap-1 font-semibold text-slate-900">
                  <a href="tel:+919655364707" className="hover:text-accent-orange transition-colors">
                    +91 96553 64707
                  </a>
                  <span>/</span>
                  <a href="tel:+916381974581" className="hover:text-accent-orange transition-colors">
                    +91 63819 74581
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <a
                  href="mailto:gvdesigntech707@gmail.com"
                  className="hover:text-accent-orange transition-colors truncate"
                >
                  gvdesigntech707@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                <a
                  href="https://instagram.com/gvdesigntech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 transition-colors inline-flex items-center gap-1 font-semibold"
                >
                  @gvdesigntech <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openEnquiryModal()}
                className="w-full py-2.5 px-4 rounded bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Enquire Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} GV DESIGN TECH. All rights reserved. Oddanchatram, Tamil Nadu, India.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-serif italic text-slate-700">
              "Learn Today. Lead Tomorrow."
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
