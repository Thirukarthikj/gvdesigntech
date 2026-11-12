import React from 'react';
import { EnquiryForm } from '../components/common/EnquiryForm';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Instagram,
  ArrowRight,
  ExternalLink,
  Navigation
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 bg-white text-neutral-900">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="border-b border-[#EAEAE7] pb-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            <span className="text-[11px] font-mono font-semibold text-[#DC2626] uppercase tracking-widest block">
              CONTACT &amp; ADMISSIONS • ODDANCHATRAM
            </span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-normal tracking-tight text-neutral-950 leading-tight">
            Contact GV DESIGN TECH
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Reach out by phone, email, or complete the admission enquiry form below to connect with our academic counseling desk in Oddanchatram.
          </p>
        </div>

        {/* 2-Column Contact Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Institute Information Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Location Card */}
            <div className="card-interactive p-6 rounded-lg bg-[#FAF9F7] hover:bg-white border border-[#E5E5E2] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DC2626] font-semibold block">
                INSTITUTE HEADQUARTERS
              </span>
              <h3 className="font-editorial text-2xl font-normal text-neutral-950">
                GV DESIGN TECH
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Oddanchatram, Tamil Nadu, India — Pin Code: 624619.
              </p>
            </div>

            {/* Telephone Card */}
            <div className="card-interactive p-6 rounded-lg bg-[#FAF9F7] hover:bg-white border border-[#E5E5E2] space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DC2626] font-semibold block">
                DIRECT TELEPHONE DESK
              </span>
              <div className="space-y-2 font-mono text-xs">
                <a
                  href="tel:+919655364707"
                  className="btn-tactile p-3 rounded bg-white border border-[#E5E5E2] hover:border-neutral-400 text-neutral-900 font-bold flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>+91 96553 64707</span>
                  </div>
                  <span className="text-[10px] font-normal text-neutral-500">Admissions &amp; Enquiries</span>
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="card-interactive p-6 rounded-lg bg-[#FAF9F7] hover:bg-white border border-[#E5E5E2] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DC2626] font-semibold block">
                DIRECT EMAIL DESK
              </span>
              <a
                href="mailto:gvdesigntech707@gmail.com"
                className="font-mono text-xs sm:text-sm font-semibold text-neutral-900 hover:text-[#DC2626] flex items-center gap-2 transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#DC2626] shrink-0" /> gvdesigntech707@gmail.com
              </a>
            </div>

            {/* Instagram Card */}
            <div className="card-interactive p-6 rounded-lg bg-[#FAF9F7] hover:bg-white border border-[#E5E5E2] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DC2626] font-semibold block">
                INSTAGRAM CHANNEL
              </span>
              <a
                href="https://instagram.com/gvdesigntech"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-sm font-semibold text-neutral-900 hover:text-[#DC2626] flex items-center gap-2 transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#DC2626] shrink-0" /> @gvdesigntech
              </a>
            </div>

            {/* Operational Schedule */}
            <div className="card-interactive p-6 rounded-lg bg-[#FAF9F7] hover:bg-white border border-[#E5E5E2] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                INSTITUTE &amp; COUNSELING HOURS
              </span>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-900">Monday – Saturday</span>
                  <span className="text-neutral-600 font-mono">9:00 AM – 9:00 PM</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#EAEAE7]">
                  <span className="text-neutral-500">Sunday</span>
                  <span className="text-neutral-400 font-mono">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Admission Enquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-8 shadow-card">
            <div className="mb-6 pb-4 border-b border-[#EAEAE7]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DC2626] font-semibold block mb-1">
                ONLINE APPLICATION
              </span>
              <h2 className="font-editorial text-2xl font-normal text-neutral-950">
                Send an Admission Enquiry
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                Fill in your contact details and desired software program. We will call you back to confirm syllabus coverage and batch timing.
              </p>
            </div>

            <EnquiryForm />
          </div>
        </div>

        {/* Dedicated Google Maps Section */}
        <div className="pt-8 border-t border-[#EAEAE7] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                <span className="text-[10px] font-mono font-semibold text-[#DC2626] uppercase tracking-widest block">
                  GEOGRAPHIC LOCATION • TAMIL NADU
                </span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-neutral-950 tracking-tight">
                Find GV DESIGN TECH in Oddanchatram
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Oddanchatram, Dindigul District, Tamil Nadu, India — Postal Code: 624619
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Oddanchatram%2C+Tamil+Nadu+624619"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#FAF9F7] text-neutral-900 text-xs font-semibold uppercase tracking-wider rounded border border-[#E5E5E2] hover:border-neutral-400 transition-colors shadow-xs shrink-0 self-start sm:self-auto"
            >
              <Navigation className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>OPEN IN GOOGLE MAPS</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
          </div>

          {/* Map Frame with OriginKit Architectural Crosshairs */}
          <div className="relative rounded-lg border border-[#E5E5E2] overflow-hidden shadow-subtle bg-[#FAF9F7]">
            {/* OriginKit Crosshairs */}
            <span className="absolute top-2 left-2 text-neutral-400 font-mono text-xs leading-none select-none z-10 pointer-events-none">+</span>
            <span className="absolute top-2 right-2 text-neutral-400 font-mono text-xs leading-none select-none z-10 pointer-events-none">+</span>
            <span className="absolute bottom-2 left-2 text-neutral-400 font-mono text-xs leading-none select-none z-10 pointer-events-none">+</span>
            <span className="absolute bottom-2 right-2 text-neutral-400 font-mono text-xs leading-none select-none z-10 pointer-events-none">+</span>

            {/* Embedded Google Map Iframe */}
            <iframe
              title="GV DESIGN TECH Oddanchatram Location Map"
              src="https://maps.google.com/maps?q=Oddanchatram%2C+Tamil+Nadu+624619&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[380px] sm:h-[460px] border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Bottom Telemetry Strip */}
            <div className="px-5 py-3 bg-white border-t border-[#EAEAE7] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                <span className="font-semibold text-neutral-900 uppercase">ODDANCHATRAM HEADQUARTERS</span>
                <span className="text-neutral-300">•</span>
                <span>Coordinates: 10.4871° N, 77.7479° E</span>
              </div>
              <div className="flex items-center gap-4 text-neutral-500">
                <span>PIN: 624619</span>
                <span>•</span>
                <span>Mon–Sat: 9:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
