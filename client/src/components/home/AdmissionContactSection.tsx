import React from 'react';
import { EnquiryForm } from '../common/EnquiryForm';
import {
  PhoneCall,
  Mail,
  Instagram,
  Clock,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const AdmissionContactSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Admissions Desk Contact Information (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent-red block">
                ADMISSIONS DESK
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-slate-950">
                Begin Your Enrollment Conversation
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Reach out to our counseling desk in Oddanchatram to discuss syllabus details, batch timings, or learning modes. We are here to help you select the right course for your technical goals.
              </p>
            </div>

            {/* Clickable Contact Cards matching reference */}
            <div className="space-y-3.5 pt-2">
              {/* Telephone Card */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-subtle hover:border-slate-300 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-accent-red flex items-center justify-center flex-shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Direct Admissions Line
                    </span>
                    <div className="mt-1 text-sm font-bold text-slate-950">
                      <a href="tel:+919655364707" className="hover:text-accent-red transition-colors">
                        +91 96553 64707
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-subtle hover:border-slate-300 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Official Counseling Inbox
                    </span>
                    <a
                      href="mailto:gvdesigntech707@gmail.com"
                      className="text-xs font-semibold text-slate-900 hover:text-accent-red transition-colors block mt-1"
                    >
                      gvdesigntech707@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram Card */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-subtle hover:border-slate-300 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Official Media Channel
                    </span>
                    <a
                      href="https://instagram.com/gvdesigntech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-pink-600 transition-colors mt-1"
                    >
                      @gvdesigntech <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Campus Schedule Card */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">
                      Monday – Saturday: 9:00 AM – 9:00 PM
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      Oddanchatram Campus, Tamil Nadu, India
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Course Application Details Form (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white shadow-subtle">
            <div className="mb-5 pb-4 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent-red block">
                ADMISSION REGISTRATION
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-950 mt-0.5">
                Course Application Details
              </h3>
            </div>

            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};

