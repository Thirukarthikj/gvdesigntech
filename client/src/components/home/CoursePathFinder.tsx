import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ALL_COURSES } from '../../data/coursesData';
import { CourseCard } from '../common/CourseCard';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import {
  Compass,
  GraduationCap,
  Wrench,
  BookOpen,
  Briefcase,
  Cpu,
  Code,
  PenTool,
  Settings,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CoursePathFinder: React.FC = () => {
  const [learnerType, setLearnerType] = useState<string>('engineering');
  const [interestDomain, setInterestDomain] = useState<string>('mechanical');
  const { openEnquiryModal } = useEnquiryModal();

  const learnerTypes = [
    {
      id: 'engineering',
      label: 'Engineering Student',
      icon: <GraduationCap className="w-4 h-4" />,
      desc: 'B.E. / B.Tech mechanical, civil, CS, or circuit branches',
    },
    {
      id: 'diploma',
      label: 'Polytechnic / Diploma',
      icon: <Wrench className="w-4 h-4" />,
      desc: 'Diploma in mechanical, automobile, civil, or IT',
    },
    {
      id: 'arts_science',
      label: 'Arts & Science Graduate',
      icon: <BookOpen className="w-4 h-4" />,
      desc: 'B.Sc, BCA, B.Com, or design aspirants',
    },
    {
      id: 'working_pro',
      label: 'Working Professional',
      icon: <Briefcase className="w-4 h-4" />,
      desc: 'Upgrading software proficiency or expanding skills',
    },
  ];

  const interestDomains = [
    {
      id: 'mechanical',
      label: 'Mechanical & CAD Modeling',
      icon: <Cpu className="w-4 h-4" />,
      courseIds: ['solidworks', 'autocad-mechanical', 'creo-ptc', 'catia'],
    },
    {
      id: 'programming',
      label: 'Programming & Web Dev',
      icon: <Code className="w-4 h-4" />,
      courseIds: ['python', 'django', 'java', 'frontend-development'],
    },
    {
      id: 'design',
      label: 'UI/UX & Creative Graphics',
      icon: <PenTool className="w-4 h-4" />,
      courseIds: ['figma', 'ui-ux-design', 'adobe-photoshop', 'adobe-illustrator'],
    },
    {
      id: 'cnc',
      label: 'CNC Machining & CAM',
      icon: <Settings className="w-4 h-4" />,
      courseIds: ['cnc-programming-machining', 'mastercam', 'solidcam'],
    },
    {
      id: 'civil',
      label: 'Civil Drafting & Planning',
      icon: <Building2 className="w-4 h-4" />,
      courseIds: ['civil-software-drafting', 'autocad-mechanical'],
    },
  ];

  const currentDomainObj =
    interestDomains.find(d => d.id === interestDomain) || interestDomains[0];

  const matchedCourses = ALL_COURSES.filter(c =>
    currentDomainObj.courseIds.includes(c.id)
  ).slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Interactive Guidance"
          badgeColor="purple"
          title="Find Your Ideal"
          titleHighlight="Learning Pathway"
          description="Select your current academic profile and technical interest to discover the most relevant software programs at GV DESIGN TECH."
        />

        {/* Step 1: Profile Selection */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Step 1: Your Academic or Professional Background
            </span>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Who are you?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {learnerTypes.map(item => {
              const isSelected = learnerType === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setLearnerType(item.id)}
                  className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-brand-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`p-1.5 rounded-lg ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-brand-600'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-display text-sm font-bold">{item.label}</span>
                  </div>
                  <p
                    className={`text-[11px] leading-snug ${
                      isSelected ? 'text-brand-100' : 'text-slate-500'
                    }`}
                  >
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Technical Domain Selection */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Step 2: Technical Skill of Interest
            </span>
            <h3 className="font-display text-lg font-bold text-slate-900">
              What domain do you want to master?
            </h3>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {interestDomains.map(domain => {
              const isSelected = interestDomain === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => setInterestDomain(domain.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>{domain.icon}</span>
                  <span>{domain.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results: Matched Courses */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-0.5">
                Recommended Curriculum Matches
              </span>
              <h3 className="font-display text-xl font-bold text-slate-900">
                Top Programs for {learnerTypes.find(l => l.id === learnerType)?.label} in {currentDomainObj.label}
              </h3>
            </div>
            <button
              onClick={() => openEnquiryModal()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-800"
            >
              <span>Need custom counseling? Enquire here</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

