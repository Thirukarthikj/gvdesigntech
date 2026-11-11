import React from 'react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { ArrowRight, CheckCircle2, MonitorCheck, Globe2 } from 'lucide-react';

export const LearningModesSection: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header matching reference */}
        <div className="max-w-3xl space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent-orange block">
            DELIVERY OPTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-slate-950">
            Choose How You Build Your Technical Edge
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Select the live online format that suits your schedule: weekday evening sessions or weekend intensive batches.
          </p>
        </div>

        {/* 2 Side-by-Side Cards matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Weekday Evening Online Sessions */}
          <div className="rounded-2xl border border-slate-200 p-8 sm:p-10 bg-white shadow-subtle flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  MON – FRI EVENINGS
                </span>
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-accent-orange flex items-center justify-center">
                  <MonitorCheck className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-slate-950">
                Weekday Evening Online Batches
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Learn side-by-side with experienced technical instructors in live interactive evening screen-sharing sessions.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700">
                    Direct two-way screen sharing when resolving complex sketching or programming issues
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700">
                    Daily 1:1 doubt clarification windows with dedicated instructors
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700">
                    Interact with fellow engineering students and diploma holders
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700">
                    Convenient evening batches tailored for college and working schedules
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => openEnquiryModal('', 'Live Online — Weekday Evening Batch')}
                className="w-full py-3.5 px-4 rounded bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <span>Enquire for Weekday Sessions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Live Studio Interactive */}
          <div className="rounded-2xl border border-slate-200 p-8 sm:p-10 bg-white shadow-subtle flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  REMOTE LIVE MENTORING
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                  <Globe2 className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-slate-950">
                Live Studio Interactive
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Access the same structured curriculum and experienced instruction from anywhere in Tamil Nadu and beyond.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700">
                    Live interactive screen-sharing guidance with real-time instructor feedback
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700">
                    Learn from home or college without commuting fatigue
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700">
                    Flexible evening and weekend batch timings
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700">
                    Regular project reviews and digital assignment submissions
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => openEnquiryModal('', 'Online')}
                className="w-full py-3.5 px-4 rounded bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>Enquire for Live Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
