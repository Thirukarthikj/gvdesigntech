import React from 'react';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import {
  MonitorCheck,
  Globe,
  Clock,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Laptop,
  Video,
  ShieldCheck,
  Cpu,
  Layers,
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LearningModesPage: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <div className="py-12 sm:py-16 bg-white text-neutral-900">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="border-b border-[#EAEAE7] pb-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8592B]" />
            <span className="text-[11px] font-mono font-semibold text-[#E8592B] uppercase tracking-widest block">
              100% LIVE INTERACTIVE TECHNICAL TRAINING
            </span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-normal tracking-tight text-neutral-950 leading-tight">
            The Live Online Learning Experience
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            All courses at GV DESIGN TECH are delivered 100% Live Online. Experience real-time two-way screen sharing, direct mentor guidance, and production project reviews from the comfort of your home or college.
          </p>
        </div>

        {/* 2 Primary Online Schedule Formats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Format 1: Weekday Evening Batches */}
          <div className="card-interactive bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-8 sm:p-10 shadow-subtle flex flex-col justify-between space-y-6 group">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#E8592B] uppercase tracking-wider font-semibold">
                  MONDAY – FRIDAY EVENINGS
                </span>
                <span className="text-neutral-500">
                  DAILY DISCIPLINE
                </span>
              </div>

              <div>
                <h2 className="font-editorial text-3xl font-normal text-neutral-950 mb-3 group-hover:text-[#E8592B] transition-colors">
                  Weekday Evening Batches
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Tailored for college students and working professionals. Engage in daily 1.5 to 2-hour interactive live screen-share sessions followed by guided exercises and immediate doubt clearance.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold">
                  What is included in Weekday Batches:
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E8592B] shrink-0 mt-0.5" />
                    <span>Live two-way screen sharing with real-time software walkthroughs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E8592B] shrink-0 mt-0.5" />
                    <span>Daily hands-on drills in CAD modeling, full-stack programming, or UI design</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E8592B] shrink-0 mt-0.5" />
                    <span>Daily designated 1:1 mentor doubt-clearing window after each lecture</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E8592B] shrink-0 mt-0.5" />
                    <span>Progressive milestone reviews that reinforce steady retention throughout the week</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-white rounded border border-[#E5E5E2] space-y-2 text-xs font-mono text-neutral-600">
                <div className="flex items-center gap-2 text-neutral-900 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#E8592B]" /> Timing Slots:
                </div>
                <p className="font-sans text-neutral-600 pl-5">
                  Evening slots between 6:00 PM – 9:00 PM (Configured based on batch consensus)
                </p>
                <div className="flex items-center gap-2 text-neutral-900 font-semibold pt-1">
                  <Globe className="w-3.5 h-3.5 text-neutral-500" /> Platform:
                </div>
                <p className="font-sans text-neutral-600 pl-5">
                  High-definition live video &amp; screen streaming with real-time microphone Q&amp;A
                </p>
              </div>
            </div>

            <button
              onClick={() => openEnquiryModal('', 'Live Online — Weekday Evening Batch')}
              className="btn-shimmer btn-tactile w-full py-3.5 px-6 bg-neutral-950 hover:bg-neutral-850 text-white font-mono text-xs font-semibold uppercase tracking-wider rounded transition-all shadow-sm"
            >
              Enquire for Weekday Online Batch →
            </button>
          </div>

          {/* Format 2: Weekend Intensive Batches */}
          <div className="card-interactive bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-8 sm:p-10 shadow-subtle flex flex-col justify-between space-y-6 group">
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#E8592B] uppercase tracking-wider font-semibold">
                  SATURDAY &amp; SUNDAY INTENSIVES
                </span>
                <span className="text-neutral-500">
                  DEEP-DIVE BLOCKS
                </span>
              </div>

              <div>
                <h2 className="font-editorial text-3xl font-normal text-neutral-950 mb-3 group-hover:text-[#E8592B] transition-colors">
                  Weekend Intensive Batches
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Designed for learners who prefer comprehensive weekend immersion. Dedicated 2.5 to 3.5-hour deep dives focusing on complete end-to-end design workflows and engineering assemblies.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold">
                  What is included in Weekend Intensives:
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E8592B] shrink-0 mt-0.5" />
                    <span>In-depth live architectural, drafting, and programming walkthroughs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E8592B] shrink-0 mt-0.5" />
                    <span>End-to-end project assembly milestones with real industry specifications</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E8592B] shrink-0 mt-0.5" />
                    <span>Personalized 1:1 portfolio review sessions to prepare industry dossiers</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E8592B] shrink-0 mt-0.5" />
                    <span>Mid-week async mentor support for assignment submissions and guidance</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-white rounded border border-[#E5E5E2] space-y-2 text-xs font-mono text-neutral-600">
                <div className="flex items-center gap-2 text-neutral-900 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#E8592B]" /> Timing Slots:
                </div>
                <p className="font-sans text-neutral-600 pl-5">
                  Saturdays &amp; Sundays: Morning or Afternoon blocks with intermittent interactive breaks
                </p>
                <div className="flex items-center gap-2 text-neutral-900 font-semibold pt-1">
                  <FileCheck2 className="w-3.5 h-3.5 text-neutral-500" /> Deliverables:
                </div>
                <p className="font-sans text-neutral-600 pl-5">
                  Production-grade 3D assemblies, full-stack GitHub repositories, or Figma design systems
                </p>
              </div>
            </div>

            <button
              onClick={() => openEnquiryModal('', 'Live Online — Weekend Intensive Batch')}
              className="btn-tactile w-full py-3.5 px-6 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 font-mono text-xs font-semibold uppercase tracking-wider rounded transition-all shadow-sm"
            >
              Enquire for Weekend Online Batch →
            </button>
          </div>

        </div>

        {/* 4 Pillars of Our Online Delivery */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#E8592B] font-semibold mb-2">
              THE VIRTUAL WORKSHOP ADVANTAGE
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-neutral-950">
              Why GV DESIGN TECH Live Online Works
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              We do not distribute prerecorded video libraries. Every session is conducted in real-time by dedicated engineering mentors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-[#EAEAE7] flex items-center justify-center text-[#E8592B]">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950">
                Live 2-Way Screen Sharing
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Watch the instructor execute parametric constraints or full-stack routes in real time, and share your screen immediately if you get stuck.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-[#EAEAE7] flex items-center justify-center text-[#E8592B]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950">
                1:1 Remote Debugging
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                No struggling in silence. Your instructor directly diagnoses syntax bugs, CAD sketch tangency conflicts, and simulation errors during class.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-[#EAEAE7] flex items-center justify-center text-[#E8592B]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950">
                Real Exercise Files
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Receive authentic industrial engineering drawings, UI design briefs, and programming starter kits to execute on your personal workstation.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-[#EAEAE7] flex items-center justify-center text-[#E8592B]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950">
                Headquarters Support
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Our administrative and faculty headquarters in Oddanchatram, Tamil Nadu ensures consistent syllabus governance and punctual schedule delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Comparison Table */}
        <div className="bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAEAE7] pb-4">
            <div>
              <h3 className="font-editorial text-2xl font-normal text-neutral-950">
                Online Batch Comparison
              </h3>
              <p className="text-xs text-neutral-500">
                Compare structure and pace between our two live online training options.
              </p>
            </div>
            <div className="font-mono text-xs text-[#E8592B] font-semibold">
              100% LIVE INTERACTIVE SESSIONS
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#EAEAE7] text-neutral-500 font-mono text-[11px] uppercase">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4 text-neutral-900 font-bold">Weekday Evening Batches</th>
                  <th className="py-3 px-4 text-neutral-900 font-bold">Weekend Intensive Batches</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAE7] text-neutral-700">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">Session Frequency</td>
                  <td className="py-3.5 px-4">Monday through Friday (5 days/week)</td>
                  <td className="py-3.5 px-4">Saturday and Sunday (2 days/week)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">Daily Duration</td>
                  <td className="py-3.5 px-4">1.5 to 2 hours per evening session</td>
                  <td className="py-3.5 px-4">2.5 to 3.5 hours per weekend session</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">Recommended For</td>
                  <td className="py-3.5 px-4">College students &amp; professionals seeking daily routine</td>
                  <td className="py-3.5 px-4">Working professionals &amp; final-year students needing weekend immersion</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">Project Review Cycle</td>
                  <td className="py-3.5 px-4">Daily assignment review at start of class</td>
                  <td className="py-3.5 px-4">Comprehensive milestone submission review each Sunday</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">Curriculum &amp; Tools</td>
                  <td className="py-3.5 px-4">100% Complete syllabus with full project portfolio</td>
                  <td className="py-3.5 px-4">100% Complete syllabus with full project portfolio</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">Delivery Mode</td>
                  <td className="py-3.5 px-4">Live Online Interactive with Screen Share</td>
                  <td className="py-3.5 px-4">Live Online Interactive with Screen Share</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* System Requirements & Pre-Requisites Box */}
        <div className="p-8 bg-white rounded-lg border border-[#E5E5E2] shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-[#E8592B]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900">
                HARDWARE &amp; SOFTWARE REQUIREMENTS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              To participate in our live online classes, all you need is a laptop or desktop computer with Windows 10/11 (for engineering &amp; CAD software), an active internet connection, and headphones/mic. Our technical team guides you step-by-step through setting up your software environment before your first session begins.
            </p>
          </div>

          <button
            onClick={() => openEnquiryModal('', 'Live Online — Weekday Evening Batch')}
            className="btn-shimmer btn-tactile shrink-0 px-6 py-3.5 bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-mono font-semibold uppercase tracking-wider rounded transition-all shadow-sm"
          >
            Apply for Live Online Batch
          </button>
        </div>

      </div>
    </div>
  );
};
