import React from 'react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { Link } from 'react-router-dom';
import { MapPin, Globe, CheckCircle2, ArrowRight, Sparkles, MonitorCheck } from 'lucide-react';

export const OnlineDeliveryScene: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-canvas border-b border-canvas-border overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-canvas-border pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-cinematic-red uppercase tracking-widest block">
              [ SCENE 07 // DELIVERY MODES ]
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter text-ink-pure">
              Dual Formats. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink-pure to-cinematic-red">
                Identical Rigor.
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-ink-muted max-w-sm">
            Live interactive technical sessions led by experienced mentors from our Oddanchatram headquarters.
          </p>
        </div>

        {/* Contrasting Compositions: Not Two Identical Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Format 1: Weekday Evening Batches (7 Cols - Large Architectural Panel) */}
          <div className="lg:col-span-7 rounded-3xl p-8 sm:p-12 bg-canvas-surface border border-canvas-border shadow-cinematic flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
                <span className="text-cinematic-red font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> LIVE ONLINE CLASSROOM
                </span>
                <span>MON – FRI EVENINGS</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-ink-pure">
                Weekday Evening Batches
              </h3>

              <p className="text-sm text-ink-secondary font-light leading-relaxed max-w-xl">
                Immerse yourself in live technical sessions with direct two-way screen sharing. Immediate troubleshooting of geometry mates, compile errors, or styling layouts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-canvas-border text-xs text-ink-secondary">
                <div className="space-y-1.5">
                  <span className="font-mono text-ink-primary font-bold block">DIRECT MENTORING</span>
                  <p className="font-light">Real-time troubleshooting directly through interactive screen sharing.</p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-ink-primary font-bold block">DAILY DRILLS</span>
                  <p className="font-light">Consistent progression designed around college and professional shifts.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-canvas-border flex flex-wrap items-center gap-4">
              <button
                onClick={() => openEnquiryModal('', 'Live Online — Weekday Evening Batch')}
                className="px-6 py-3.5 rounded-full bg-cinematic-red hover:bg-cinematic-redHover text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <span>ENQUIRE FOR WEEKDAY ONLINE BATCH</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-xs font-mono text-ink-muted">
                HQ: Oddanchatram, Tamil Nadu
              </span>
            </div>
          </div>

          {/* Format 2: ONLINE REMOTE (5 Cols - Minimal High-Tech Terminal Card) */}
          <div className="lg:col-span-5 rounded-3xl p-8 sm:p-10 bg-canvas-card border border-canvas-border flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
                <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> REMOTE LIVE DIGITAL
                </span>
                <span>FLEXIBLE TIMINGS</span>
              </div>

              <h3 className="font-display text-3xl font-extrabold uppercase text-ink-pure">
                Online Interactive
              </h3>

              <p className="text-sm text-ink-secondary font-light leading-relaxed">
                Connect from any college or home across Tamil Nadu. Live screen-sharing, guided live exercises, and regular digital code and CAD model reviews.
              </p>

              <div className="space-y-3 pt-2 text-xs font-mono text-ink-secondary">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Live interactive screen sharing & debugging</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Flexible morning & evening time slots</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Digital portfolio and drawing submissions</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-canvas-border">
              <button
                onClick={() => openEnquiryModal('', 'Online')}
                className="w-full py-3.5 px-6 rounded-full bg-canvas-surface hover:bg-canvas border border-canvas-border text-ink-primary font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>ENQUIRE FOR LIVE ONLINE SESSIONS</span>
                <ArrowRight className="w-3.5 h-3.5 text-cinematic-red" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

