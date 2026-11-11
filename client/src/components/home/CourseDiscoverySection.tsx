import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const CourseDiscoverySection: React.FC = () => {
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section id="courses" className="py-16 sm:py-24 bg-white border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header matching reference */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200/80">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent-orange block">
              COURSE CATALOG
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-slate-950">
              Six Focused Disciplines. Practical Engineering Fluency.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore our 6 structured technical tracks built around industry-standard software tools and hands-on laboratory exercises.
            </p>
          </div>

          <Link
            to="/courses"
            className="self-start md:self-auto px-4 py-2.5 rounded bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all flex-shrink-0"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Disciplines Grid matching reference layout */}
        <div className="space-y-8">
          {/* Card 1: Computer Science & IT (Wide 2-Column Panel) */}
          <div className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[11px] font-mono font-bold text-slate-400 block">
                01 / TECHNICAL INSTRUCTION
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-950">
                Computer Science & IT
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From foundational computation in C/C++ to scalable Python backends, modern frontend interfaces, and relational SQL databases.
              </p>
              <div className="pt-2">
                <Link
                  to="/courses/computer-science-it"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Explore IT Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                <h4 className="font-sans text-xs font-bold text-slate-900 mb-1">
                  C & C++
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Memory management, pointers, and object-oriented algorithms.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                <h4 className="font-sans text-xs font-bold text-slate-900 mb-1">
                  Core & Advanced Java
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Multi-threading, JVM architecture, collections, and enterprise APIs.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                <h4 className="font-sans text-xs font-bold text-slate-900 mb-1">
                  Python & Django
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Scripting, automation, Django ORM, REST APIs, and database modeling.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                <h4 className="font-sans text-xs font-bold text-slate-900 mb-1">
                  Django Framework
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Rapid, secure web development with MVT architecture.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                <h4 className="font-sans text-xs font-bold text-slate-900 mb-1">
                  MySQL Database
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Relational schema design, complex SQL joins, indexing, and normalization.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                <h4 className="font-sans text-xs font-bold text-slate-900 mb-1">
                  Frontend Web
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Responsive interfaces with HTML5, CSS3, modern Flexbox/Grid, and interactive JavaScript.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Mechanical & Automobile Design (Wide 2-Column Panel) */}
          <div className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[11px] font-mono font-bold text-slate-400 block">
                02 / CAD, CAM & DESIGN LAB
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-950">
                Mechanical & Automobile Design
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Industry-standard parametric CAD, 3D modeling, assembly design, sheet metal, GD&T, and reverse engineering.
              </p>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Core Software:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['AutoCAD', 'SolidWorks', 'Creo PTC', 'CATIA', 'Mastercam', 'SolidCAM'].map(soft => (
                    <span key={soft} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-700">
                      {soft}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/courses/mechanical-automobile"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Explore Mechanical</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                <h4 className="font-sans text-xs font-bold text-slate-900 mb-1">
                  Parametric 3D Assembly
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Multi-part mechanical assemblies, kinematic mates, interference checks, and motion studies.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                <h4 className="font-sans text-xs font-bold text-slate-900 mb-1">
                  CAM Machining & Toolpaths
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  2D/3D milling, turning cycles, and toolpath post-processing in Mastercam and SolidCAM.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                <h4 className="font-sans text-xs font-bold text-slate-900 mb-1">
                  Surface Modeling & Styling
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Complex surface generation, Class-A curvature continuity, and aesthetic automotive body styling.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                <h4 className="font-sans text-xs font-bold text-slate-900 mb-1">
                  Toolpath & CNC Generation
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Translating engineering parts into verified G-code for shop-floor production.
                </p>
              </div>
            </div>
          </div>

          {/* Cards 3 & 4 (Side by Side Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 3: Multimedia & Graphic Design */}
            <div className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white shadow-subtle flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-mono font-bold text-slate-400 block">
                  03 / DESIGN LAB
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-950">
                  Multimedia & Graphic Design
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Visual design, vector illustration, and digital user interfaces crafted with industry-standard design tools.
                </p>

                <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 font-medium">
                    Adobe Photoshop
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 font-medium">
                    Adobe Illustrator
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 font-medium">
                    Adobe XD
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 font-medium">
                    Figma & UI/UX
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  to="/courses/multimedia-graphic-design"
                  className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-accent-orange inline-flex items-center gap-1.5"
                >
                  <span>Explore Design Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4: Civil Engineering & Architecture */}
            <div className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white shadow-subtle flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-mono font-bold text-slate-400 block">
                  04 / CIVIL DRAFTING LAB
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-950">
                  Civil Engineering & Architecture
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Architectural drafting, structural planning grids, building elevations, and municipal submission drawings.
                </p>

                <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 font-medium">
                    Architectural 2D Drafting
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 font-medium">
                    Structural Column Grids
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 font-medium">
                    3D Building Layouts
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 font-medium">
                    Municipal Approval Plans
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  to="/courses/civil-engineering"
                  className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-accent-orange inline-flex items-center gap-1.5"
                >
                  <span>Explore Civil Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Cards 5 & 6 (Side by Side Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 5: CNC & VMC Programming */}
            <div className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white shadow-subtle flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-mono font-bold text-slate-400 block">
                  05 / PRECISION MACHINING
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-950">
                  CNC & VMC Programming
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Manual G & M code part programming, canned turning and milling cycles, coordinate offset setup, and software simulation.
                </p>

                <div className="pt-2 space-y-2 text-xs text-slate-700">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 font-medium">
                    Lathe & Milling G & M Codes
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 font-medium">
                    Simulation and Toolpath Verification
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  to="/courses/cnc-programming"
                  className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-accent-orange inline-flex items-center gap-1.5"
                >
                  <span>Explore CNC Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 6: Comprehensive Art & Layouts */}
            <div className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-white shadow-subtle flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-mono font-bold text-slate-400 block">
                  06 / CREATIVE MEDIA
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-950">
                  Comprehensive Art & Layouts
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Creative design, composition fundamentals, digital media asset creation, color psychology, and visual presentation.
                </p>

                <div className="pt-2 space-y-2 text-xs text-slate-700">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 font-medium">
                    Creative Composition & Visual Arts
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 font-medium">
                    Digital Art Illustration & Vector Assets
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  to="/courses/arts-multimedia"
                  className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-accent-orange inline-flex items-center gap-1.5"
                >
                  <span>Explore Arts Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
