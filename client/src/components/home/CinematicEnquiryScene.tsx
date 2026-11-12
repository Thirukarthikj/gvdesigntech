import React from 'react';
import { EnquiryForm } from '../common/EnquiryForm';
import { PhoneCall, MessageSquare, ArrowRight, MapPin, Clock, ExternalLink } from 'lucide-react';

export const CinematicEnquiryScene: React.FC = () => {
  const whatsappUrl = `https://wa.me/919655364707?text=${encodeURIComponent(
    'Hello GV DESIGN TECH, I would like to enquire about technical courses in Oddanchatram.'
  )}`;

  return (
    <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-canvas-subtle border-b border-canvas-border overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Massive Headline */}
        <div className="space-y-4 max-w-4xl">
          <span className="text-xs font-mono text-cinematic-orange uppercase tracking-widest block">
            [ SCENE 08 // THE ENQUIRY EXPERIENCE ]
          </span>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tighter text-ink-pure leading-[0.9]">
            Your Next Skill <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink-pure via-ink-secondary to-cinematic-orange">
              Starts Here.
            </span>
          </h2>
          <p className="text-base sm:text-xl text-ink-secondary font-light max-w-2xl pt-2">
            Explore courses. Ask questions. Find the right learning direction with GV DESIGN TECH in Oddanchatram, Tamil Nadu.
          </p>
        </div>

        {/* 2-Column Split: Interactive Channels + Direct Admissions Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Direct Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border hover:border-emerald-500/50 hover:bg-canvas-card transition-all flex items-center justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                  INSTANT CHAT CHANNEL
                </span>
                <h3 className="font-display text-xl font-bold text-ink-primary">
                  WhatsApp Admissions Desk
                </h3>
                <p className="text-xs text-ink-muted font-light">
                  Direct message our counselor at +91 96553 64707.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </a>

            {/* Direct Telephone Action */}
            <div className="p-6 rounded-2xl bg-canvas-surface border border-canvas-border space-y-3">
              <span className="text-[10px] font-mono text-cinematic-orange uppercase tracking-widest block">
                DIRECT VOICE ASSISTANCE
              </span>
              <h3 className="font-display text-xl font-bold text-ink-primary">
                Call Our Counselors
              </h3>
              <p className="text-xs text-ink-muted font-light">
                Available Monday to Saturday from 9:00 AM to 9:00 PM.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href="tel:+919655364707"
                  className="px-4 py-2.5 rounded-xl bg-canvas-card border border-canvas-border text-ink-primary font-mono text-xs font-bold hover:border-cinematic-orange transition-colors flex items-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-cinematic-orange" />
                  <span>+91 96553 64707</span>
                </a>
              </div>
            </div>

            {/* Telemetry metadata */}
            <div className="p-5 rounded-2xl bg-canvas-surface/60 border border-canvas-border space-y-2 text-xs font-mono text-ink-muted">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cinematic-orange" />
                <span>Oddanchatram, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-ink-secondary" />
                <span>Mon–Sat: 9:00 AM – 9:00 PM (Sunday Closed)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Admission Enquiry Form (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl p-8 sm:p-10 bg-canvas-surface border border-canvas-border shadow-cinematic">
            <div className="mb-6 pb-4 border-b border-canvas-border">
              <span className="text-[10px] font-mono text-cinematic-orange uppercase tracking-widest block">
                OFFICIAL REGISTRATION
              </span>
              <h3 className="font-display text-2xl font-bold text-ink-primary mt-1">
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

