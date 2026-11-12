import React from 'react';

const SOFTWARE_TOOLS = [
  { name: 'AutoCAD', domain: 'Mechanical & Civil CAD' },
  { name: 'SolidWorks', domain: 'Parametric 3D Modelling' },
  { name: 'Python', domain: 'Backend & Automation' },
  { name: 'Creo PTC', domain: 'Engineering Assemblies' },
  { name: 'CATIA', domain: 'Surface & Aerospace CAD' },
  { name: 'Django', domain: 'Web Framework' },
  { name: 'Mastercam', domain: 'CAM Toolpath Generation' },
  { name: 'SolidCAM', domain: 'CNC Milling & Lathe' },
  { name: 'Adobe Photoshop', domain: 'Digital Media & Retouching' },
  { name: 'Figma', domain: 'UI/UX Interface Prototyping' },
  { name: 'C & C++', domain: 'System & Algorithmic Core' },
  { name: 'Java', domain: 'Enterprise OOP' },
  { name: 'MySQL', domain: 'Relational Database Integrity' },
  { name: 'Adobe Illustrator', domain: 'Vector Brand Identity' },
  { name: 'GD&T', domain: 'ASME Y14.5 Tolerancing' },
  { name: 'Reverse Engineering', domain: 'Point Cloud Surface Scan' },
  { name: 'Adobe XD', domain: 'Interaction Prototyping' },
  { name: 'CNC / VMC', domain: 'ISO G & M Code Machining' },
];

export const SoftwareMarqueeStrip: React.FC = () => {
  return (
    <div className="bg-[#FAF9F7] border-b border-[#EAEAE7] py-4 sm:py-5 overflow-hidden select-none">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
            INDUSTRY SOFTWARE SUITES TAUGHT
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
          100% Practical Laboratory Terminal Sessions
        </span>
      </div>

      {/* Marquee Track with Fade Mask */}
      <div className="mask-fade-edges overflow-hidden py-1">
        <div className="animate-marquee flex items-center gap-3">
          {/* Double array for seamless loop */}
          {[...SOFTWARE_TOOLS, ...SOFTWARE_TOOLS].map((tool, idx) => (
            <div
              key={`${tool.name}-${idx}`}
              className="btn-tactile flex items-center gap-2.5 px-3.5 py-1.5 bg-white border border-[#E5E5E2] hover:border-[#DC2626]/40 hover:shadow-subtle rounded-md shadow-xs transition-all shrink-0 group cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-[#DC2626] transition-colors" />
              <span className="text-xs font-mono font-bold text-neutral-900 group-hover:text-[#DC2626] transition-colors">
                {tool.name}
              </span>
              <span className="text-[10px] font-mono text-neutral-400 hidden md:inline">
                / {tool.domain}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

