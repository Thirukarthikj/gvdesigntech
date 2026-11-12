import React from 'react';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import {
  Compass,
  GraduationCap,
  Users2,
  MapPin,
  Clock,
  ArrowRight,
  Wrench,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <div className="py-12 sm:py-16 bg-white text-neutral-900">
      {/* Editorial Page Header */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="border-b border-[#EAEAE7] pb-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#DC2626] block">
              INSTITUTE PROFILE • ODDANCHATRAM
            </span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-normal tracking-tight text-neutral-950 leading-tight">
            About GV DESIGN TECH
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            GV DESIGN TECH is a technical training institute established in Oddanchatram, Tamil Nadu, committed to imparting practical, industry-aligned software education across engineering, design, computer science, and multimedia.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-mono text-neutral-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#DC2626]" /> Oddanchatram, Tamil Nadu, India
            </span>
            <span className="text-neutral-300">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" /> Mon – Sat: 9:00 AM – 9:00 PM
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Who Can Benefit Section */}
        <div className="relative rounded-lg border border-[#E5E5E2] p-8 sm:p-12 bg-[#FAF9F7] space-y-8 shadow-subtle">
          {/* OriginKit Crosshairs */}
          <span className="crosshair-corner -top-1.5 -left-1 font-mono text-[11px] leading-none select-none">+</span>
          <span className="crosshair-corner -top-1.5 -right-1 font-mono text-[11px] leading-none select-none">+</span>
          <span className="crosshair-corner -bottom-1.5 -left-1 font-mono text-[11px] leading-none select-none">+</span>
          <span className="crosshair-corner -bottom-1.5 -right-1 font-mono text-[11px] leading-none select-none">+</span>

          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#DC2626] block">
                TARGET LEARNERS
              </span>
            </div>
            <h2 className="font-editorial text-3xl font-normal text-neutral-950">
              Who Can Benefit From GV DESIGN TECH Courses?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Our structured modules are calibrated to support individuals at different stages of their academic and professional development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-interactive bg-white rounded-lg p-5 border border-[#E5E5E2] shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-md bg-[#FAF9F7] border border-[#EAEAE7] text-[#DC2626] flex items-center justify-center mb-3">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-base font-normal text-neutral-950 mb-1.5">
                  Engineering Students
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  Mechanical, Civil, Automobile, and Computer Science undergraduates seeking practical software fluency to excel in coursework and final-year design projects.
                </p>
              </div>
            </div>

            <div className="card-interactive bg-white rounded-lg p-5 border border-[#E5E5E2] shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-md bg-[#FAF9F7] border border-[#EAEAE7] text-[#DC2626] flex items-center justify-center mb-3">
                  <Wrench className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-base font-normal text-neutral-950 mb-1.5">
                  Polytechnic &amp; Diploma
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  Diploma holders seeking advanced skills in AutoCAD, SolidWorks, CNC G-Code programming, or Frontend web technologies to improve their industry capability.
                </p>
              </div>
            </div>

            <div className="card-interactive bg-white rounded-lg p-5 border border-[#E5E5E2] shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-md bg-[#FAF9F7] border border-[#EAEAE7] text-[#DC2626] flex items-center justify-center mb-3">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-base font-normal text-neutral-950 mb-1.5">
                  Arts &amp; Science Graduates
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  Graduates eager to transition into high-growth digital domains such as UI/UX Design, Figma prototyping, Graphic Design, or Python web frameworks.
                </p>
              </div>
            </div>

            <div className="card-interactive bg-white rounded-lg p-5 border border-[#E5E5E2] shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-md bg-[#FAF9F7] border border-[#EAEAE7] text-[#DC2626] flex items-center justify-center mb-3">
                  <Users2 className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-base font-normal text-neutral-950 mb-1.5">
                  Working Professionals
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  Professionals looking to modernize their technical toolkits, learn Mastercam or Reverse Engineering, or study software after working hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA with Authentic Visible CAD Technical Drafting Background */}
        <div className="relative rounded-xl border border-[#E5E5E2] p-8 sm:p-12 overflow-hidden bg-white shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6 group">
          {/* Authentic Technical CAD Drafting Linework Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <img
              src="/images/cad-design-light.jpg"
              alt="Technical CAD drafting and engineering blueprint background"
              className="w-full h-full object-cover object-center opacity-90 scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Soft Feathered Gradient for pristine typography readability on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>

          {/* OriginKit Architectural Corner Crosshairs */}
          <span className="absolute top-2.5 left-2.5 text-neutral-400 font-mono text-xs leading-none select-none z-20">+</span>
          <span className="absolute top-2.5 right-2.5 text-neutral-400 font-mono text-xs leading-none select-none z-20">+</span>
          <span className="absolute bottom-2.5 left-2.5 text-neutral-400 font-mono text-xs leading-none select-none z-20">+</span>
          <span className="absolute bottom-2.5 right-2.5 text-neutral-400 font-mono text-xs leading-none select-none z-20">+</span>

          {/* Foreground Text */}
          <div className="relative z-10 space-y-1.5 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#DC2626]">
                ADMISSIONS DESK • ODDANCHATRAM
              </span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-neutral-950 tracking-tight">
              Ready to begin your technical training?
            </h3>
            <p className="text-neutral-700 text-xs sm:text-sm font-medium leading-relaxed">
              Connect with our counseling team based in Oddanchatram to arrange a live online batch preview.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => openEnquiryModal()}
              className="btn-shimmer btn-tactile group px-6 py-3.5 rounded bg-[#DC2626] hover:bg-[#B91C1C] text-white font-mono font-semibold text-xs uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(220,38,38,0.39)]"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-3.5 h-3.5 inline ml-1.5 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              to="/contact"
              className="btn-tactile px-5 py-3.5 rounded bg-white hover:bg-[#FAF9F7] border border-[#E5E5E2] hover:border-neutral-400 text-neutral-900 font-mono text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              Contact Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
