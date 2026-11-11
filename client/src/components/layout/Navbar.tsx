import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { COURSE_CATEGORIES } from '../../data/coursesData';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  PhoneCall,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const location = useLocation();
  const { openEnquiryModal } = useEnquiryModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Telemetry / Announcement Bar */}
      <div className="bg-[#FAF9F7] border-b border-[#EAEAE7] text-[11px] font-mono text-neutral-600 hidden md:block">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8592B]" />
            <span className="text-neutral-800 font-medium tracking-wider uppercase">
              100% LIVE INTERACTIVE ONLINE TECHNICAL TRAINING
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-neutral-500 uppercase tracking-wider">
              HEADQUARTERED IN ODDANCHATRAM, TN
            </span>
          </div>

          <div className="flex items-center gap-5 text-neutral-600">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#E8592B]" /> Oddanchatram, Tamil Nadu
            </span>
            <span className="text-neutral-300">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-neutral-400" /> Mon–Sat: 9:00 AM – 9:00 PM
            </span>
            <span className="text-neutral-300">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-500">Call:</span>
              <a
                href="tel:+919655364707"
                className="font-semibold text-neutral-900 hover:text-[#E8592B] transition-colors"
              >
                +91 96553 64707
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Clean Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 bg-white/95 backdrop-blur-md border-b border-[#E5E5E2] ${
          isScrolled ? 'py-3 shadow-sm' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <BrandLogo variant="light" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-neutral-950 font-bold border-b-2 border-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                isActive('/about')
                  ? 'text-neutral-950 font-bold border-b-2 border-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              About Us
            </Link>

            {/* Courses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <Link
                to="/courses"
                className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider inline-flex items-center gap-1 transition-colors ${
                  isActive('/courses')
                    ? 'text-neutral-950 font-bold border-b-2 border-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Courses
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    coursesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </Link>

              {coursesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50">
                  <div className="bg-white rounded-md border border-[#E5E5E2] shadow-elevated p-3 divide-y divide-[#F0F0EE]">
                    <div className="pb-2 px-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      Curated Disciplines (6)
                    </div>
                    <div className="pt-2 space-y-1">
                      {COURSE_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/courses/${cat.slug}`}
                          className="flex items-center justify-between p-2 rounded hover:bg-[#F9F9F8] transition-colors group"
                        >
                          <div>
                            <div className="text-xs font-semibold text-neutral-900 group-hover:text-[#E8592B] transition-colors">
                              {cat.title}
                            </div>
                            <div className="text-[11px] text-neutral-500 line-clamp-1">
                              {cat.courses.length} Software modules
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#E8592B] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2 mt-2 px-1">
                      <Link
                        to="/courses"
                        className="block text-center text-xs font-semibold text-neutral-900 hover:text-[#E8592B] py-1 transition-colors"
                      >
                        Browse All Courses →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/learning-modes"
              className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                isActive('/learning-modes')
                  ? 'text-neutral-950 font-bold border-b-2 border-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Online Learning
            </Link>

            <Link
              to="/contact"
              className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                isActive('/contact')
                  ? 'text-neutral-950 font-bold border-b-2 border-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+919655364707"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-950 hover:bg-[#F5F5F3] rounded border border-[#E5E5E2] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E8592B]" />
              <span>+91 96553 64707</span>
            </a>

            <button
              onClick={() => openEnquiryModal()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 rounded transition-all duration-150 shadow-sm"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => openEnquiryModal()}
              className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white bg-neutral-900 rounded"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded border border-[#E5E5E2]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[57px] bg-white border-b border-[#E5E5E2] shadow-elevated z-30 p-5 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              About Us
            </Link>
            <Link
              to="/courses"
              className="block px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              All Courses
            </Link>
            <div className="pl-4 space-y-1 border-l-2 border-[#EAEAE7] ml-3 my-2">
              {COURSE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/courses/${cat.slug}`}
                  className="block py-1 text-xs text-neutral-600 hover:text-[#E8592B]"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
            <Link
              to="/learning-modes"
              className="block px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              Online Learning Experience
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 rounded"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-4 border-t border-[#EAEAE7] space-y-2 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E8592B]" />
              <span>Oddanchatram, Tamil Nadu</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-400" />
              <span>Monday – Saturday: 9:00 AM – 9:00 PM</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-neutral-900">
              <PhoneCall className="w-4 h-4 text-[#E8592B]" />
              <a href="tel:+919655364707">+91 96553 64707</a>
              <span className="text-neutral-400">/</span>
              <a href="tel:+916381974581">+91 63819 74581</a>
            </div>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openEnquiryModal();
            }}
            className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 rounded shadow"
          >
            Submit Admission Enquiry
          </button>
        </div>
      )}
    </>
  );
};
