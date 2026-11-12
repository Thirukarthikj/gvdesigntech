import React from 'react';
import { Calendar, Laptop, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const TrainingFormatsSection: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section className="relative bg-[#FAF9F7] py-16 lg:py-20 border-b border-[#EAEAE7]">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center justify-center gap-2 mb-3 px-3 py-1 rounded-full bg-white border border-[#E5E5E2] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            <span className="text-[11px] font-mono font-semibold tracking-widest text-[#DC2626] uppercase">
              100% LIVE ONLINE FORMATS
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[46px] leading-[1.12] text-neutral-950 font-normal tracking-tight">
            Choose Your Online Training Schedule
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-3">
            All programs are conducted live online with real-time screen sharing, interactive mentor guidance, and practical software assignments from home.
          </p>
        </div>

        {/* 2 Comparison Cards (21st.dev Card Lift & OriginKit Crosshairs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Weekday Evening Batches */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="card-interactive relative bg-white rounded-lg border border-[#E5E5E2] p-8 shadow-subtle flex flex-col justify-between group"
          >
            <span className="crosshair-corner -top-1.5 -left-1 font-mono text-[11px] leading-none select-none">+</span>
            <span className="crosshair-corner -top-1.5 -right-1 font-mono text-[11px] leading-none select-none">+</span>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold group-hover:text-neutral-800 transition-colors">
                  MONDAY – FRIDAY EVENINGS
                </span>
                <div className="w-9 h-9 rounded-md bg-[#FAF9F7] border border-[#EAEAE7] group-hover:border-[#DC2626]/50 group-hover:scale-105 flex items-center justify-center text-[#DC2626] transition-all">
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-neutral-950 mb-3 tracking-tight group-hover:text-[#DC2626] transition-colors">
                Weekday Evening Batches
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                Designed for college students and working professionals. Attend scheduled 1.5 to 2-hour live interactive sessions every evening with immediate Q&amp;A and daily practice tasks.
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-neutral-700 leading-relaxed">
                    Live two-way screen sharing with real-time software walkthroughs
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-neutral-700 leading-relaxed">
                    Dedicated daily doubt clarification slot with your designated mentor
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-neutral-700 leading-relaxed">
                    Structured weekday progression that builds continuous technical discipline
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-neutral-700 leading-relaxed">
                    Remote code and drawing reviews submitted directly via project portals
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => openEnquiryModal('', 'Live Online — Weekday Evening Batch')}
                className="btn-shimmer btn-tactile group/btn w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-neutral-950 hover:bg-[#DC2626] text-white text-xs font-semibold uppercase tracking-wider rounded transition-all shadow-sm"
              >
                <span>ENQUIRE FOR WEEKDAY ONLINE BATCH</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Weekend Intensive Batches */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="card-interactive relative bg-white rounded-lg border border-[#E5E5E2] p-8 shadow-subtle flex flex-col justify-between group"
          >
            <span className="crosshair-corner -top-1.5 -left-1 font-mono text-[11px] leading-none select-none">+</span>
            <span className="crosshair-corner -top-1.5 -right-1 font-mono text-[11px] leading-none select-none">+</span>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold group-hover:text-neutral-800 transition-colors">
                  SATURDAY &amp; SUNDAY INTENSIVES
                </span>
                <div className="w-9 h-9 rounded-md bg-[#FAF9F7] border border-[#EAEAE7] group-hover:border-[#DC2626]/50 group-hover:scale-105 flex items-center justify-center text-[#DC2626] transition-all">
                  <Laptop className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-neutral-950 mb-3 tracking-tight group-hover:text-[#DC2626] transition-colors">
                Weekend Intensive Batches
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                Comprehensive deep-dive sessions over weekends. Ideal for those who need focused blocks of time for project milestones, engineering analysis, and portfolio reviews.
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-neutral-700 leading-relaxed">
                    Extended live weekend masterclasses focusing on complete end-to-end workflows
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-neutral-700 leading-relaxed">
                    Same complete syllabus, real assignments, and industry-standard tool coverage
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-neutral-700 leading-relaxed">
                    1:1 live portfolio feedback and resume-ready project assembly
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-neutral-700 leading-relaxed">
                    Mid-week async support and project milestones tracking
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => openEnquiryModal('', 'Live Online — Weekend Intensive Batch')}
                className="btn-tactile group/btn w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-white hover:bg-[#FAF9F7] text-neutral-900 text-xs font-semibold uppercase tracking-wider rounded border border-neutral-300 transition-all hover:border-neutral-400"
              >
                <span>ENQUIRE FOR WEEKEND ONLINE BATCH</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
