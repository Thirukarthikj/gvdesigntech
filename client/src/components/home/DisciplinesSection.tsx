import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const DisciplinesSection: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section className="relative bg-white py-16 lg:py-20 border-b border-[#EAEAE7]">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#FAF9F7] border border-[#E5E5E2] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8592B]" />
              <span className="text-[11px] font-mono font-semibold tracking-widest text-[#E8592B] uppercase">
                ALL 6 CURATED DISCIPLINES
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[46px] leading-[1.12] text-neutral-950 font-normal tracking-tight">
              Six Focused Disciplines. Proven Engineering Rigour.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-2xl">
              Explore our 6 fundamental technical domains built for practical competence and immediate workplace application.
            </p>
          </div>

          <Link
            to="/courses"
            className="btn-shimmer btn-tactile group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all shrink-0 self-start md:self-auto shadow-sm"
          >
            <span>VIEW ALL COURSES</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Disciplines Container */}
        <div className="space-y-8">
          
          {/* 01 - COMPUTER SCIENCE & IT (Feature Block with OriginKit Crosshairs) */}
          <div className="card-interactive relative bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-6 lg:p-8 shadow-subtle">
            {/* OriginKit Crosshairs */}
            <span className="absolute -top-1.5 -left-1 text-neutral-300 font-mono text-[11px] leading-none select-none">+</span>
            <span className="absolute -top-1.5 -right-1 text-neutral-300 font-mono text-[11px] leading-none select-none">+</span>
            <span className="absolute -bottom-1.5 -left-1 text-neutral-300 font-mono text-[11px] leading-none select-none">+</span>
            <span className="absolute -bottom-1.5 -right-1 text-neutral-300 font-mono text-[11px] leading-none select-none">+</span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Panel */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#E8592B] font-semibold mb-2">
                    01 — SOFTWARE &amp; WEB DEV
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-neutral-950 mb-3 tracking-tight">
                    Computer Science &amp; IT
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    From core algorithmic fundamentals with C and C++ to modern full-stack web applications with Python and Django. Practical programming taught from the ground up.
                  </p>
                </div>

                <div>
                  <Link
                    to="/courses/computer-science-it"
                    className="btn-shimmer btn-tactile group inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
                  >
                    <span>EXPLORE SYLLABUS</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Panel: 6 Sub-Cards (Tactile Hover & Arrow Shift) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    title: 'C & C++',
                    desc: 'Syntax, memory allocation, pointers, structures & procedural problem-solving.',
                  },
                  {
                    title: 'Java & Python Core',
                    desc: 'Object-oriented programming, class hierarchies, standard libraries, scripting.',
                  },
                  {
                    title: 'Python & Django',
                    desc: 'MVC architecture, ORM, REST APIs, production server deployment.',
                  },
                  {
                    title: 'Django Framework',
                    desc: 'Robust web development, relational database integration, and authentication.',
                  },
                  {
                    title: 'MySQL Database',
                    desc: 'Relational schemas, complex queries, indexing, joins and database integrity.',
                  },
                  {
                    title: 'Frontend Dev',
                    desc: 'Modern semantic HTML5, responsive CSS3, flexbox, grid, and JavaScript basics.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group p-4 bg-white rounded-lg border border-[#E5E5E2] hover:border-neutral-900/60 hover:-translate-y-0.5 hover:shadow-subtle transition-all duration-200 cursor-pointer"
                    onClick={() => openEnquiryModal(item.title)}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-neutral-900 group-hover:text-[#E8592B] transition-colors">
                        {item.title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* 02 - MECHANICAL & AUTOMOBILE DESIGN (Feature Block with OriginKit Crosshairs) */}
          <div className="card-interactive relative bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-6 lg:p-8 shadow-subtle">
            {/* OriginKit Crosshairs */}
            <span className="absolute -top-1.5 -left-1 text-neutral-300 font-mono text-[11px] leading-none select-none">+</span>
            <span className="absolute -top-1.5 -right-1 text-neutral-300 font-mono text-[11px] leading-none select-none">+</span>
            <span className="absolute -bottom-1.5 -left-1 text-neutral-300 font-mono text-[11px] leading-none select-none">+</span>
            <span className="absolute -bottom-1.5 -right-1 text-neutral-300 font-mono text-[11px] leading-none select-none">+</span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Panel */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#E8592B] font-semibold mb-2">
                    02 — CAD, CAM &amp; PARAMETRIC DESIGN
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-neutral-950 mb-3 tracking-tight">
                    Mechanical &amp; Automobile Design
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                    Parametric 3D solid modelling, complex surface design, assembly drafting, sheet metal and mechanical analysis using industry-standard engineering software suites.
                  </p>

                  {/* Software Tags (Tactile chips) */}
                  <div className="mb-6">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2">
                      Software Suite Covered:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['AutoCAD', 'SolidWorks', 'Creo PTC', 'CATIA', 'Mastercam', 'SolidCAM', 'GD&T', 'Reverse Engineering'].map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 bg-white border border-[#E5E5E2] hover:border-neutral-400 text-neutral-800 text-[10px] font-mono rounded shadow-xs transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    to="/courses/mechanical-automobile"
                    className="btn-shimmer btn-tactile group inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
                  >
                    <span>EXPLORE SYLLABUS</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Panel: 4 Sub-Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    title: 'Parametric 3D Solid Modelling',
                    desc: 'Sketching, feature-based modeling, part design, and complex mechanical assemblies.',
                  },
                  {
                    title: 'GD&T Tolerancing Standards',
                    desc: 'Geometric dimensioning & tolerancing according to ASME Y14.5 standards.',
                  },
                  {
                    title: 'Surface Modeling & Reverse Eng.',
                    desc: 'Advanced class-A surface generation, point cloud import, surface reconstruction and scan data manipulation.',
                  },
                  {
                    title: 'Toolpath & CNC Generation',
                    desc: '2D & 3D toolpath creation, tool selection, speeds, feeds, and post-processor configuration via Mastercam & SolidCAM.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group p-4 bg-white rounded-lg border border-[#E5E5E2] hover:border-neutral-900/60 hover:-translate-y-0.5 hover:shadow-subtle transition-all duration-200 cursor-pointer"
                    onClick={() => openEnquiryModal(item.title)}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-neutral-900 group-hover:text-[#E8592B] transition-colors">
                        {item.title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* 2x2 Grid for Disciplines 03, 04, 05, 06 (Card Interactive) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 03 — MULTIMEDIA & GRAPHIC DESIGN */}
            <div className="card-interactive bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-6 sm:p-7 flex flex-col justify-between shadow-subtle group">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#E8592B] font-semibold mb-2">
                  03 — BRANDING, UI/UX &amp; DIGITAL MEDIA
                </div>
                <h3 className="font-editorial text-2xl font-normal text-neutral-950 mb-3 tracking-tight group-hover:text-[#E8592B] transition-colors">
                  Multimedia &amp; Graphic Design
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-5">
                  Master industry graphic software. Learn vector composition, photo manipulation, interface wireframing, and interactive prototyping for digital products.
                </p>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {['Adobe Photoshop', 'Adobe Illustrator', 'Adobe XD & Figma', 'UI/UX Design Systems'].map((tool) => (
                    <div
                      key={tool}
                      className="p-2.5 bg-white rounded border border-[#E5E5E2] hover:border-neutral-400 text-[11px] font-medium text-neutral-800 transition-colors"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/courses/multimedia-graphic-design"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-[#E8592B] transition-colors pt-2 border-t border-[#EAEAE7]"
              >
                <span>EXPLORE DESIGN CURRICULUM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 04 — CIVIL ENGINEERING & ARCHITECTURE */}
            <div className="card-interactive bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-6 sm:p-7 flex flex-col justify-between shadow-subtle group">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#E8592B] font-semibold mb-2">
                  04 — CIVIL CAD, STRUCTURAL &amp; DRAFTING
                </div>
                <h3 className="font-editorial text-2xl font-normal text-neutral-950 mb-3 tracking-tight group-hover:text-[#E8592B] transition-colors">
                  Civil Engineering &amp; Architecture
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-5">
                  Architectural and structural technical training. Master 2D drafting, 3D structural modeling, plan generation, and building information fundamentals.
                </p>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {['2D Architectural Drafting', '3D Structural Modeling', 'Plan Detailing & Elevation', 'Building Estimation Fundamentals'].map((tool) => (
                    <div
                      key={tool}
                      className="p-2.5 bg-white rounded border border-[#E5E5E2] hover:border-neutral-400 text-[11px] font-medium text-neutral-800 transition-colors"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/courses/civil-engineering"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-[#E8592B] transition-colors pt-2 border-t border-[#EAEAE7]"
              >
                <span>EXPLORE CIVIL CURRICULUM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 05 — CNC & VMC PROGRAMMING */}
            <div className="card-interactive bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-6 sm:p-7 flex flex-col justify-between shadow-subtle group">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#E8592B] font-semibold mb-2">
                  05 — CNC &amp; INDUSTRIAL AUTOMATION
                </div>
                <h3 className="font-editorial text-2xl font-normal text-neutral-950 mb-3 tracking-tight group-hover:text-[#E8592B] transition-colors">
                  CNC &amp; VMC Programming
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-5">
                  Hands-on industrial CNC lathe and VMC milling programming. Master ISO G-codes, M-codes, simulation validation, and physical machine setup.
                </p>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {['G-Code & M-Code Programming', 'Simulation & Tool Offset Verification', 'Lathe & Milling Operations', 'Industrial CAM Integration'].map((tool) => (
                    <div
                      key={tool}
                      className="p-2.5 bg-white rounded border border-[#E5E5E2] hover:border-neutral-400 text-[11px] font-medium text-neutral-800 transition-colors"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/courses/cnc-programming"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-[#E8592B] transition-colors pt-2 border-t border-[#EAEAE7]"
              >
                <span>EXPLORE CNC CURRICULUM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 06 — ARTS & MULTIMEDIA */}
            <div className="card-interactive bg-[#FAF9F7] rounded-lg border border-[#E5E5E2] p-6 sm:p-7 flex flex-col justify-between shadow-subtle group">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#E8592B] font-semibold mb-2">
                  06 — CREATIVE MEDIA &amp; MOTION
                </div>
                <h3 className="font-editorial text-2xl font-normal text-neutral-950 mb-3 tracking-tight group-hover:text-[#E8592B] transition-colors">
                  Comprehensive Art &amp; Layouts
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-5">
                  The visual essence of digital publication, editorial artwork and advertising design. Combine traditional aesthetics with commercial production software.
                </p>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {['Commercial Advertising & Poster', 'Print Media & Layout Production', 'Motion Graphics & Visual Content', 'Brand Identity Systems'].map((tool) => (
                    <div
                      key={tool}
                      className="p-2.5 bg-white rounded border border-[#E5E5E2] hover:border-neutral-400 text-[11px] font-medium text-neutral-800 transition-colors"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/courses/arts-multimedia"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-[#E8592B] transition-colors pt-2 border-t border-[#EAEAE7]"
              >
                <span>EXPLORE ARTS CURRICULUM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
