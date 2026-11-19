import React from 'react';

interface CourseCardVisualProps {
  courseId: string;
  courseName: string;
  categorySlug?: string;
}

export const CourseCardVisual: React.FC<CourseCardVisualProps> = ({
  courseId,
  courseName,
}) => {
  // Render course-specific authentic visual
  switch (courseId) {
    // ----------------------------------------------------
    // MECHANICAL & AUTOMOBILE CAD
    // ----------------------------------------------------
    case 'autocad-mechanical':
      return (
        <div className="w-full h-full bg-[#181a1f] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          {/* CAD Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#242831_1px,transparent_1px),linear-gradient(to_bottom,#242831_1px,transparent_1px)] bg-[size:16px_16px] opacity-70" />

          {/* Top Status Bar */}
          <div className="relative z-10 flex items-center justify-between text-[9px] text-neutral-400 border-b border-[#2a2f3a] pb-1.5">
            <span className="flex items-center gap-1.5 text-[#DC2626] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
              AUTOCAD • 2D DRAFTING
            </span>
            <span className="text-cyan-400">X: 142.50  Y: 88.00</span>
          </div>

          {/* CAD Mechanical Drawing Geometry (SVG) */}
          <div className="relative z-10 flex items-center justify-center my-auto">
            <svg className="w-48 h-24 text-cyan-400" viewBox="0 0 200 100" fill="none" stroke="currentColor">
              {/* Centerlines */}
              <line x1="20" y1="50" x2="180" y2="50" stroke="#DC2626" strokeWidth="0.8" strokeDasharray="6,3,1,3" opacity="0.8" />
              <line x1="100" y1="10" x2="100" y2="90" stroke="#DC2626" strokeWidth="0.8" strokeDasharray="6,3,1,3" opacity="0.8" />
              {/* Outer Flange */}
              <circle cx="100" cy="50" r="36" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="100" cy="50" r="24" stroke="#e2e8f0" strokeWidth="1.2" />
              <circle cx="100" cy="50" r="12" stroke="#38bdf8" strokeWidth="1.2" />
              {/* Bolt Circle & Holes */}
              <circle cx="100" cy="50" r="30" stroke="#64748b" strokeWidth="0.8" strokeDasharray="2,2" />
              <circle cx="100" cy="20" r="3" fill="#38bdf8" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="100" cy="80" r="3" fill="#38bdf8" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="70" cy="50" r="3" fill="#38bdf8" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="130" cy="50" r="3" fill="#38bdf8" stroke="#e2e8f0" strokeWidth="0.8" />
              {/* Dimension Callouts */}
              <line x1="100" y1="50" x2="155" y2="25" stroke="#f59e0b" strokeWidth="0.8" />
              <text x="160" y="27" fill="#f59e0b" fontSize="7" fontFamily="monospace">Ø72.0</text>
              <text x="30" y="32" fill="#38bdf8" fontSize="7" fontFamily="monospace">R12.0</text>
            </svg>
          </div>

          {/* Bottom Coordinates & Tool status */}
          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#121418]/80 px-2 py-1 rounded border border-[#2a2f3a]">
            <span>SNAP: ON • ORTHO: ON</span>
            <span className="text-white">SCALE 1:1 • ISO-25</span>
          </div>
        </div>
      );

    case 'solidworks':
      return (
        <div className="w-full h-full bg-[#1c212a] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          {/* SolidWorks Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#252c38] via-[#1a1f28] to-[#12151c]" />

          {/* Top Status */}
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#2e3746] pb-1.5">
            <span className="flex items-center gap-1.5 text-blue-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              SOLIDWORKS • 3D CAD
            </span>
            <span className="text-neutral-400 text-[8px] bg-[#12151c] px-1.5 py-0.5 rounded border border-[#2e3746]">
              ISOMETRIC
            </span>
          </div>

          {/* 3D Parametric Mechanical Model SVG */}
          <div className="relative z-10 flex items-center justify-center my-auto">
            <svg className="w-48 h-24" viewBox="0 0 200 100" fill="none">
              {/* Isometric 3D Mechanical Bracket / Piston Body */}
              <path d="M60 40 L110 20 L150 40 L100 60 Z" fill="#3b82f6" fillOpacity="0.25" stroke="#60a5fa" strokeWidth="1.2" />
              <path d="M60 40 L60 65 L100 85 L100 60 Z" fill="#1d4ed8" fillOpacity="0.35" stroke="#3b82f6" strokeWidth="1.2" />
              <path d="M100 60 L100 85 L150 65 L150 40 Z" fill="#1e3a8a" fillOpacity="0.45" stroke="#3b82f6" strokeWidth="1.2" />
              {/* Extruded Bore Hole */}
              <ellipse cx="105" cy="40" rx="14" ry="7" stroke="#93c5fd" strokeWidth="1.2" fill="#0f172a" />
              <ellipse cx="105" cy="50" rx="14" ry="7" stroke="#60a5fa" strokeWidth="0.8" strokeDasharray="2,2" />
              {/* Feature Tree Callout */}
              <rect x="18" y="15" width="46" height="20" rx="2" fill="#0f172a" fillOpacity="0.85" stroke="#334155" />
              <text x="22" y="24" fill="#94a3b8" fontSize="5.5">Boss-Extrude1</text>
              <text x="22" y="31" fill="#60a5fa" fontSize="5.5">Fillet_R4.5</text>
              {/* Triad Coordinate Axis */}
              <line x1="170" y1="80" x2="185" y2="80" stroke="#ef4444" strokeWidth="1.5" />
              <line x1="170" y1="80" x2="170" y2="65" stroke="#22c55e" strokeWidth="1.5" />
              <line x1="170" y1="80" x2="160" y2="88" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="188" y="82" fill="#ef4444" fontSize="6">X</text>
              <text x="168" y="62" fill="#22c55e" fontSize="6">Y</text>
              <text x="154" y="94" fill="#3b82f6" fontSize="6">Z</text>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#12151c]/80 px-2 py-1 rounded border border-[#2e3746]">
            <span>FEATURE-BASED PARAMETRIC</span>
            <span className="text-blue-400">SOLID MESH: OK</span>
          </div>
        </div>
      );

    case 'creo-ptc':
      return (
        <div className="w-full h-full bg-[#171e19] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="absolute inset-0 bg-[radial-gradient(#2d4a36_1px,transparent_1px)] bg-[size:14px_14px] opacity-40" />

          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#25392b] pb-1.5">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              PTC CREO • PARAMETRIC
            </span>
            <span className="text-neutral-400 text-[8px]">DATUM PLANES: ON</span>
          </div>

          <div className="relative z-10 flex items-center justify-center my-auto">
            <svg className="w-48 h-24" viewBox="0 0 200 100" fill="none">
              {/* Datum Planes */}
              <rect x="25" y="15" width="150" height="70" stroke="#059669" strokeWidth="0.8" strokeDasharray="3,3" fill="#064e3b" fillOpacity="0.1" />
              <text x="28" y="24" fill="#34d399" fontSize="6">DTM1 (FRONT)</text>
              <line x1="100" y1="5" x2="100" y2="95" stroke="#10b981" strokeWidth="0.8" strokeDasharray="4,2" />
              <text x="103" y="12" fill="#10b981" fontSize="6">A_1</text>
              {/* Mechanical Turned Shaft / Gear Blank */}
              <path d="M60 50 L60 30 L90 30 L90 20 L130 20 L130 30 L150 30 L150 50 L150 70 L130 70 L130 80 L90 80 L90 70 L60 70 Z" fill="#047857" fillOpacity="0.3" stroke="#34d399" strokeWidth="1.2" />
              {/* Parametric Dimension Constraint */}
              <line x1="90" y1="14" x2="130" y2="14" stroke="#fbbf24" strokeWidth="0.8" />
              <text x="102" y="11" fill="#fbbf24" fontSize="6">d24=40.0</text>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#0f1712]/90 px-2 py-1 rounded border border-[#25392b]">
            <span>ENGINEERING MECHANISMS</span>
            <span className="text-emerald-400">FAMILY TABLES</span>
          </div>
        </div>
      );

    case 'catia':
      return (
        <div className="w-full h-full bg-[#111827] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-[#1e1b4b] to-[#111827]" />

          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#312e81] pb-1.5">
            <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              CATIA V5 • SURFACE STYLING
            </span>
            <span className="text-neutral-400 text-[8px]">CLASS-A G2</span>
          </div>

          <div className="relative z-10 flex items-center justify-center my-auto">
            <svg className="w-48 h-24" viewBox="0 0 200 100" fill="none">
              {/* Aerodynamic Vehicle Hood / Aerofoil Spline Surface */}
              <path d="M20 70 Q 70 20, 140 35 T 185 60" stroke="#818cf8" strokeWidth="2" fill="none" />
              <path d="M30 75 Q 80 30, 145 42 T 185 65" stroke="#a5b4fc" strokeWidth="1" strokeDasharray="3,2" fill="none" />
              <path d="M40 80 Q 90 40, 150 49 T 185 70" stroke="#6366f1" strokeWidth="0.8" fill="none" />
              {/* Curvature Comb Vectors */}
              <line x1="70" y1="20" x2="70" y2="8" stroke="#f43f5e" strokeWidth="0.8" />
              <line x1="90" y1="24" x2="94" y2="10" stroke="#f43f5e" strokeWidth="0.8" />
              <line x1="110" y1="29" x2="116" y2="16" stroke="#f43f5e" strokeWidth="0.8" />
              <line x1="140" y1="35" x2="148" y2="23" stroke="#f43f5e" strokeWidth="0.8" />
              <text x="65" y="6" fill="#f43f5e" fontSize="6">CURVATURE ANALYSIS</text>
              {/* Tangent Guide */}
              <circle cx="140" cy="35" r="2.5" fill="#818cf8" />
              <text x="145" y="32" fill="#c7d2fe" fontSize="5.5">G2 Continuity</text>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#0c101d]/90 px-2 py-1 rounded border border-[#312e81]">
            <span>AEROSPACE & AUTOMOTIVE</span>
            <span className="text-indigo-400">GENERATIVE SHAPE</span>
          </div>
        </div>
      );

    case 'mastercam':
      return (
        <div className="w-full h-full bg-[#191917] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a24_1px,transparent_1px),linear-gradient(to_bottom,#2a2a24_1px,transparent_1px)] bg-[size:12px_12px] opacity-40" />

          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#38372a] pb-1.5">
            <span className="flex items-center gap-1.5 text-yellow-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              MASTERCAM • CNC TOOLPATH
            </span>
            <span className="text-neutral-400 text-[8px]">FEED: 1200 mm/min</span>
          </div>

          <div className="relative z-10 flex items-center justify-center my-auto">
            <svg className="w-48 h-24" viewBox="0 0 200 100" fill="none">
              {/* Stock Material Boundary */}
              <rect x="40" y="25" width="120" height="55" stroke="#71717a" strokeWidth="1" strokeDasharray="3,2" fill="#27272a" fillOpacity="0.4" />
              {/* CNC Endmill Tool */}
              <rect x="95" y="5" width="10" height="25" fill="#e4e4e7" stroke="#71717a" strokeWidth="0.8" />
              <polygon points="95,30 105,30 100,36" fill="#eab308" />
              {/* Multi-Pass Spiral Contour Toolpaths (Cyan & Yellow) */}
              <path d="M50 35 L150 35 L150 70 L50 70 Z" stroke="#38bdf8" strokeWidth="0.9" fill="none" />
              <path d="M56 41 L144 41 L144 64 L56 64 Z" stroke="#06b6d4" strokeWidth="0.9" fill="none" />
              <path d="M62 47 L138 47 L138 58 L62 58 Z" stroke="#eab308" strokeWidth="1.2" fill="none" />
              {/* Toolpath Step-Over Lead-in Arrow */}
              <line x1="50" y1="35" x2="40" y2="25" stroke="#22c55e" strokeWidth="1" />
              <polygon points="40,25 46,26 43,30" fill="#22c55e" />
              <text x="32" y="20" fill="#22c55e" fontSize="6">RAPID IN</text>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#121210]/90 px-2 py-1 rounded border border-[#38372a]">
            <span>2D/3D MILLING & TURNING</span>
            <span className="text-yellow-400">NC POST-PROCESS</span>
          </div>
        </div>
      );

    case 'solidcam':
      return (
        <div className="w-full h-full bg-[#181a20] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#282d38] pb-1.5">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              SOLIDCAM • iMACHINING
            </span>
            <span className="text-neutral-400 text-[8px]">CYCLE TIME -70%</span>
          </div>

          <div className="relative z-10 flex items-center justify-center my-auto">
            <svg className="w-48 h-24" viewBox="0 0 200 100" fill="none">
              {/* SolidCAM Trochoidal High Speed Milling Path */}
              <path d="M40 50 C50 30, 60 70, 70 50 C80 30, 90 70, 100 50 C110 30, 120 70, 130 50 C140 30, 150 70, 160 50" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
              <path d="M42 55 C52 35, 62 75, 72 55 C82 35, 92 75, 102 55 C112 35, 122 75, 132 55 C142 35, 152 75, 162 55" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" fill="none" />
              {/* Morphing Spiral */}
              <circle cx="100" cy="50" r="16" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="3,2" />
              <circle cx="100" cy="50" r="28" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4,2" />
              <text x="65" y="85" fill="#38bdf8" fontSize="6">PATENTED MORPHING SPIRAL</text>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#101217]/90 px-2 py-1 rounded border border-[#282d38]">
            <span>MULTI-AXIS MACHINING</span>
            <span className="text-cyan-400">CHIP THICKNESS SYNC</span>
          </div>
        </div>
      );

    case 'gdt':
      return (
        <div className="w-full h-full bg-[#1b1e28] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#2d3446] pb-1.5">
            <span className="flex items-center gap-1.5 text-rose-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              ASME Y14.5 • GD&T
            </span>
            <span className="text-neutral-400 text-[8px]">ISO GPS METROLOGY</span>
          </div>

          {/* Authentic ASME Feature Control Frame Drawing */}
          <div className="relative z-10 flex items-center justify-center my-auto">
            <div className="space-y-2 text-center">
              {/* Feature Control Frame 1: True Position */}
              <div className="inline-flex border-2 border-slate-200 bg-slate-900 text-white text-xs divide-x-2 divide-slate-200 shadow-md">
                <span className="px-2 py-1 font-bold text-rose-400">⌖</span>
                <span className="px-2.5 py-1 text-slate-100 font-semibold">Ø 0.05 Ⓜ</span>
                <span className="px-2 py-1 font-bold text-amber-400">A</span>
                <span className="px-2 py-1 font-bold text-amber-400">B</span>
                <span className="px-2 py-1 font-bold text-amber-400">C</span>
              </div>
              {/* Feature Control Frame 2: Perpendicularity */}
              <div className="block">
                <div className="inline-flex border border-slate-400 bg-slate-900 text-white text-[10px] divide-x divide-slate-400">
                  <span className="px-1.5 py-0.5 text-cyan-400">⟂</span>
                  <span className="px-2 py-0.5">0.02</span>
                  <span className="px-1.5 py-0.5 text-amber-400">A</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#12141c]/90 px-2 py-1 rounded border border-[#2d3446]">
            <span>DATUM REFERENCE SYSTEMS</span>
            <span className="text-rose-400">MMC / LMC MODIFIERS</span>
          </div>
        </div>
      );

    case 'reverse-engineering':
      return (
        <div className="w-full h-full bg-[#131622] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#252c42] pb-1.5">
            <span className="flex items-center gap-1.5 text-violet-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              REVERSE ENGINEERING
            </span>
            <span className="text-neutral-400 text-[8px]">POINT CLOUD 3D SCAN</span>
          </div>

          <div className="relative z-10 flex items-center justify-center my-auto">
            <svg className="w-48 h-24" viewBox="0 0 200 100" fill="none">
              {/* Laser Scan Line */}
              <line x1="20" y1="50" x2="180" y2="50" stroke="#a855f7" strokeWidth="1.5" opacity="0.8" />
              {/* Point Cloud & Polygon Mesh */}
              <circle cx="60" cy="40" r="1.5" fill="#c084fc" />
              <circle cx="80" cy="30" r="1.5" fill="#c084fc" />
              <circle cx="100" cy="35" r="1.5" fill="#c084fc" />
              <circle cx="120" cy="25" r="1.5" fill="#c084fc" />
              <circle cx="140" cy="40" r="1.5" fill="#c084fc" />
              <circle cx="70" cy="60" r="1.5" fill="#c084fc" />
              <circle cx="90" cy="70" r="1.5" fill="#c084fc" />
              <circle cx="110" cy="65" r="1.5" fill="#c084fc" />
              <circle cx="130" cy="60" r="1.5" fill="#c084fc" />
              {/* Reconstructed NURBS Surface Mesh */}
              <polygon points="60,40 80,30 100,35 90,70 70,60" stroke="#8b5cf6" strokeWidth="0.8" fill="#8b5cf6" fillOpacity="0.2" />
              <polygon points="100,35 120,25 140,40 130,60 110,65" stroke="#a855f7" strokeWidth="0.8" fill="#a855f7" fillOpacity="0.25" />
              <text x="45" y="88" fill="#c084fc" fontSize="6">SCAN DATA TO PARAMETRIC CAD</text>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#0c0e17]/90 px-2 py-1 rounded border border-[#252c42]">
            <span>LASER CMM SCANNING</span>
            <span className="text-violet-400">DEVIATION ANALYSIS</span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // CIVIL ENGINEERING & ARCHITECTURE
    // ----------------------------------------------------
    case 'civil-software-drafting':
      return (
        <div className="w-full h-full bg-[#0d1e34] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          {/* Blueprint Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#19365e_1px,transparent_1px),linear-gradient(to_bottom,#19365e_1px,transparent_1px)] bg-[size:14px_14px] opacity-75" />

          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#1f4577] pb-1.5">
            <span className="flex items-center gap-1.5 text-sky-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              CIVIL CAD • ARCHITECTURAL
            </span>
            <span className="text-neutral-300 text-[8px]">PLAN VIEW 1:100</span>
          </div>

          {/* Architectural Floor Plan Drawing */}
          <div className="relative z-10 flex items-center justify-center my-auto">
            <svg className="w-48 h-24" viewBox="0 0 200 100" fill="none" stroke="#e0f2fe">
              {/* Outer Walls */}
              <rect x="30" y="15" width="140" height="70" strokeWidth="2" />
              {/* Interior Partitions */}
              <line x1="100" y1="15" x2="100" y2="85" strokeWidth="1.5" />
              <line x1="30" y1="55" x2="100" y2="55" strokeWidth="1.5" />
              {/* Door Swings */}
              <path d="M100 40 A 15 15 0 0 1 85 55" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="100" y1="40" x2="100" y2="55" stroke="#38bdf8" strokeWidth="1" />
              {/* Structural Columns */}
              <rect x="28" y="13" width="6" height="6" fill="#0284c7" strokeWidth="0" />
              <rect x="97" y="13" width="6" height="6" fill="#0284c7" strokeWidth="0" />
              <rect x="166" y="13" width="6" height="6" fill="#0284c7" strokeWidth="0" />
              <rect x="28" y="81" width="6" height="6" fill="#0284c7" strokeWidth="0" />
              <rect x="97" y="81" width="6" height="6" fill="#0284c7" strokeWidth="0" />
              <rect x="166" y="81" width="6" height="6" fill="#0284c7" strokeWidth="0" />
              {/* Room Text Callouts */}
              <text x="45" y="38" fill="#bae6fd" fontSize="6.5" stroke="none">LIVING 14'x16'</text>
              <text x="45" y="72" fill="#bae6fd" fontSize="6.5" stroke="none">KITCHEN</text>
              <text x="115" y="52" fill="#bae6fd" fontSize="6.5" stroke="none">BEDROOM 12'x16'</text>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-300 bg-[#091524]/90 px-2 py-1 rounded border border-[#1f4577]">
            <span>MUNICIPAL SUBMISSION NORMS</span>
            <span className="text-sky-300">STRUCTURAL GRIDS</span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // CNC & VMC PROGRAMMING
    // ----------------------------------------------------
    case 'cnc-programming-machining':
      return (
        <div className="w-full h-full bg-[#0a120c] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          {/* CRT Monitor Green Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,38,20,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-60" />

          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#1c3821] pb-1.5">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              FANUC 0i-TF • CNC PROGRAM
            </span>
            <span className="text-emerald-500 text-[8px]">SPINDLE: 1800 RPM</span>
          </div>

          {/* Real ISO G-Code Editor Lines */}
          <div className="relative z-10 my-auto text-[9.5px] leading-relaxed text-emerald-400 font-bold tracking-wider space-y-0.5">
            <div><span className="text-emerald-600">N010</span> G21 G90 G40 G80 (INIT)</div>
            <div><span className="text-emerald-600">N020</span> T0101 M06 (ROUGH TURN)</div>
            <div><span className="text-emerald-600">N030</span> G96 S220 M03 (CSS ON)</div>
            <div><span className="text-emerald-600">N040</span> G00 X52.0 Z2.0 M08</div>
            <div><span className="text-emerald-300">N050</span> G71 U2.0 R0.5 (CAN CYCLE)</div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-emerald-500 bg-[#061008]/90 px-2 py-1 rounded border border-[#1c3821]">
            <span>X: +052.000  Z: +002.000</span>
            <span className="text-emerald-300">FEED: 0.25 mm/rev</span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // COMPUTER SCIENCE & IT
    // ----------------------------------------------------
    case 'c-programming':
      return (
        <div className="w-full h-full bg-[#18181b] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-neutral-700 pb-1.5">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              C LANGUAGE • GCC COMPILER
            </span>
            <span className="text-neutral-400 text-[8px]">MEMORY POINTERS</span>
          </div>

          <div className="relative z-10 my-auto text-[9.5px] leading-relaxed text-neutral-300 font-medium">
            <div><span className="text-purple-400">#include</span> <span className="text-green-400">&lt;stdio.h&gt;</span></div>
            <div><span className="text-purple-400">#include</span> <span className="text-green-400">&lt;stdlib.h&gt;</span></div>
            <div><span className="text-blue-400">int</span> <span className="text-yellow-300">main</span>() &#123;</div>
            <div className="pl-3"><span className="text-blue-400">int</span> *ptr = <span className="text-blue-300">malloc</span>(<span className="text-blue-400">sizeof</span>(<span className="text-blue-400">int</span>));</div>
            <div className="pl-3"><span className="text-yellow-300">printf</span>(<span className="text-green-400">"Address: %p\n"</span>, ptr);</div>
            <div className="pl-3"><span className="text-purple-400">return</span> <span className="text-orange-400">0</span>;</div>
            <div>&#125;</div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-neutral-900/90 px-2 py-1 rounded border border-neutral-700">
            <span>LOW-LEVEL MEMORY MANAGEMENT</span>
            <span className="text-amber-400">BUILD: SUCCESS (0 ERRORS)</span>
          </div>
        </div>
      );

    case 'cpp-programming':
      return (
        <div className="w-full h-full bg-[#161a23] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-slate-700 pb-1.5">
            <span className="flex items-center gap-1.5 text-blue-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              C++ 20 • OBJECT ORIENTED
            </span>
            <span className="text-neutral-400 text-[8px]">STL & TEMPLATES</span>
          </div>

          <div className="relative z-10 my-auto text-[9.5px] leading-relaxed text-slate-200">
            <div><span className="text-purple-400">#include</span> <span className="text-emerald-400">&lt;iostream&gt;</span></div>
            <div><span className="text-purple-400">#include</span> <span className="text-emerald-400">&lt;vector&gt;</span></div>
            <div><span className="text-blue-400">class</span> <span className="text-yellow-300">EngineCAD</span> &#123;</div>
            <div className="pl-3 text-purple-400">public:</div>
            <div className="pl-6"><span className="text-blue-400">virtual void</span> <span className="text-yellow-300">simulate</span>() <span className="text-blue-400">noexcept</span>;</div>
            <div className="pl-6"><span className="text-blue-400">std::vector</span>&lt;<span className="text-blue-400">double</span>&gt; mesh;</div>
            <div>&#125;;</div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-slate-900/90 px-2 py-1 rounded border border-slate-700">
            <span>MODULAR ARCHITECTURE</span>
            <span className="text-blue-400">HIGH PERFORMANCE</span>
          </div>
        </div>
      );

    case 'java':
      return (
        <div className="w-full h-full bg-[#1b1c20] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-neutral-700 pb-1.5">
            <span className="flex items-center gap-1.5 text-orange-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              JAVA • ENTERPRISE & JVM
            </span>
            <span className="text-neutral-400 text-[8px]">JDK 17+ / SPRING</span>
          </div>

          <div className="relative z-10 my-auto text-[9.5px] leading-relaxed text-neutral-300">
            <div><span className="text-purple-400">public class</span> <span className="text-yellow-300">BatchService</span> &#123;</div>
            <div className="pl-3"><span className="text-blue-400">@Autowired</span></div>
            <div className="pl-3"><span className="text-purple-400">private</span> <span className="text-blue-300">Repository</span> repo;</div>
            <div className="pl-3"><span className="text-purple-400">public</span> <span className="text-blue-300">List</span>&lt;<span className="text-blue-300">Student</span>&gt; <span className="text-yellow-300">getActive</span>() &#123;</div>
            <div className="pl-6"><span className="text-purple-400">return</span> repo.<span className="text-yellow-300">findByMode</span>(<span className="text-green-400">"ONLINE"</span>);</div>
            <div className="pl-3">&#125;</div>
            <div>&#125;</div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-neutral-900/90 px-2 py-1 rounded border border-neutral-700">
            <span>JVM MULTI-THREADING</span>
            <span className="text-orange-400">JDBC DATABASE CONNECTIVITY</span>
          </div>
        </div>
      );

    case 'python':
      return (
        <div className="w-full h-full bg-[#1a1e27] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#293245] pb-1.5">
            <span className="flex items-center gap-1.5 text-yellow-300 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              PYTHON 3.12 • SCRIPTING
            </span>
            <span className="text-cyan-400 text-[8px]">AUTOMATION & LOGIC</span>
          </div>

          <div className="relative z-10 my-auto text-[9.5px] leading-relaxed text-slate-200">
            <div><span className="text-purple-400">import</span> <span className="text-cyan-300">math</span>, <span className="text-cyan-300">os</span></div>
            <div><span className="text-purple-400">def</span> <span className="text-blue-400">generate_gcode</span>(points, feed=<span className="text-orange-400">250</span>):</div>
            <div className="pl-3 text-slate-400">"""Calculates machine toolpath offsets"""</div>
            <div className="pl-3">coords = [p * <span className="text-orange-400">1.25</span> <span className="text-purple-400">for</span> p <span className="text-purple-400">in</span> points]</div>
            <div className="pl-3"><span className="text-purple-400">return</span> &#123;<span className="text-green-300">"pts"</span>: len(coords), <span className="text-green-300">"F"</span>: feed&#125;</div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#12161f]/90 px-2 py-1 rounded border border-[#293245]">
            <span>CLEAN MODULAR SCRIPTS</span>
            <span className="text-yellow-300">DATA & WEB BACKENDS</span>
          </div>
        </div>
      );

    case 'django':
      return (
        <div className="w-full h-full bg-[#122318] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#1f422b] pb-1.5">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              DJANGO • FULL-STACK MVT
            </span>
            <span className="text-neutral-400 text-[8px]">REST API & ORM</span>
          </div>

          <div className="relative z-10 my-auto text-[9.5px] leading-relaxed text-emerald-100">
            <div><span className="text-purple-300">from</span> django.db <span className="text-purple-300">import</span> models</div>
            <div><span className="text-purple-300">class</span> <span className="text-yellow-300">CourseModule</span>(models.Model):</div>
            <div className="pl-3">title = models.CharField(max_length=<span className="text-orange-300">100</span>)</div>
            <div className="pl-3">batch_capacity = models.IntegerField()</div>
            <div className="pl-3 text-emerald-400"># GET /api/v1/courses/ -&gt; 200 OK</div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#0c1810]/90 px-2 py-1 rounded border border-[#1f422b]">
            <span>USER AUTH & SESSIONS</span>
            <span className="text-emerald-400">DATABASE MIGRATIONS</span>
          </div>
        </div>
      );

    case 'mysql':
      return (
        <div className="w-full h-full bg-[#131c28] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#23354d] pb-1.5">
            <span className="flex items-center gap-1.5 text-sky-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              MYSQL 8.0 • RELATIONAL DATABASE
            </span>
            <span className="text-neutral-400 text-[8px]">ACID TRANSACTIONS</span>
          </div>

          <div className="relative z-10 my-auto text-[9.5px] leading-relaxed text-slate-200">
            <div><span className="text-purple-400">SELECT</span> c.name, <span className="text-yellow-300">COUNT</span>(e.id) <span className="text-purple-400">AS</span> total</div>
            <div><span className="text-purple-400">FROM</span> courses c</div>
            <div><span className="text-purple-400">JOIN</span> enrollments e <span className="text-purple-400">ON</span> c.id = e.course_id</div>
            <div><span className="text-purple-400">WHERE</span> e.status = <span className="text-green-300">'ACTIVE'</span></div>
            <div><span className="text-purple-400">GROUP BY</span> c.id <span className="text-purple-400">ORDER BY</span> total <span className="text-purple-400">DESC</span>;</div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#0c121a]/90 px-2 py-1 rounded border border-[#23354d]">
            <span>PRIMARY & FOREIGN KEYS</span>
            <span className="text-sky-400">NORMALIZED SCHEMAS</span>
          </div>
        </div>
      );

    case 'html':
      return (
        <div className="w-full h-full bg-[#201915] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#403028] pb-1.5">
            <span className="flex items-center gap-1.5 text-orange-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              HTML5 & CSS3 • WEB BACKBONE
            </span>
            <span className="text-neutral-400 text-[8px]">SEMANTIC MARKUP</span>
          </div>

          <div className="relative z-10 my-auto text-[9.5px] leading-relaxed text-amber-100">
            <div><span className="text-slate-400">&lt;!DOCTYPE html&gt;</span></div>
            <div><span className="text-orange-400">&lt;html</span> <span className="text-yellow-300">lang</span>=<span className="text-green-300">"en"</span><span className="text-orange-400">&gt;</span></div>
            <div className="pl-3"><span className="text-orange-400">&lt;header</span> <span className="text-yellow-300">class</span>=<span className="text-green-300">"site-header"</span><span className="text-orange-400">&gt;</span></div>
            <div className="pl-6"><span className="text-orange-400">&lt;h1&gt;</span>GV DESIGN TECH<span className="text-orange-400">&lt;/h1&gt;</span></div>
            <div className="pl-3"><span className="text-orange-400">&lt;/header&gt;</span></div>
            <div><span className="text-orange-400">&lt;/html&gt;</span></div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#140f0c]/90 px-2 py-1 rounded border border-[#403028]">
            <span>RESPONSIVE VIEWPORT META</span>
            <span className="text-orange-400">ARIA ACCESSIBILITY</span>
          </div>
        </div>
      );

    case 'frontend-development':
      return (
        <div className="w-full h-full bg-[#161a25] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#293249] pb-1.5">
            <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              FRONTEND • MODERN UI
            </span>
            <span className="text-neutral-400 text-[8px]">FLEX & CSS GRID</span>
          </div>

          {/* Desktop & Mobile Responsive Preview Frames */}
          <div className="relative z-10 flex items-center justify-center gap-4 my-auto">
            {/* Desktop Mockup */}
            <div className="w-32 h-20 bg-slate-900 rounded border border-slate-700 p-1 flex flex-col justify-between shadow-sm">
              <div className="flex items-center gap-1 border-b border-slate-800 pb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
              <div className="grid grid-cols-3 gap-1 h-12 pt-1">
                <div className="col-span-1 bg-indigo-950/60 rounded border border-indigo-800/40" />
                <div className="col-span-2 space-y-1">
                  <div className="h-3 bg-slate-800 rounded" />
                  <div className="h-6 bg-indigo-600/30 rounded border border-indigo-500/40" />
                </div>
              </div>
            </div>

            {/* Mobile Mockup */}
            <div className="w-12 h-20 bg-slate-900 rounded-lg border-2 border-slate-700 p-1 flex flex-col justify-between shadow-sm">
              <div className="w-4 h-0.5 bg-slate-600 mx-auto rounded-full" />
              <div className="space-y-1">
                <div className="h-2 bg-indigo-500/50 rounded" />
                <div className="h-6 bg-slate-800 rounded" />
                <div className="h-2 bg-indigo-500/30 rounded" />
              </div>
              <div className="w-2 h-2 rounded-full border border-slate-700 mx-auto" />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#0e111a]/90 px-2 py-1 rounded border border-[#293249]">
            <span>CROSS-BROWSER STANDARDS</span>
            <span className="text-indigo-400">JAVASCRIPT ES6+ DOM</span>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // MULTIMEDIA & GRAPHIC DESIGN
    // ----------------------------------------------------
    case 'adobe-photoshop':
      return (
        <div className="w-full h-full bg-[#171a22] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#283142] pb-1.5">
            <span className="flex items-center gap-1.5 text-blue-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              PHOTOSHOP CC • RASTER
            </span>
            <span className="text-neutral-400 text-[8px]">ADJUSTMENT LAYERS</span>
          </div>

          {/* Canvas & Layers Stack */}
          <div className="relative z-10 flex items-center justify-center gap-3 my-auto">
            {/* Active Artboard with Marquee Selection */}
            <div className="w-28 h-20 bg-neutral-900 rounded border border-neutral-700 p-1 relative flex items-center justify-center">
              <div className="w-20 h-14 border border-dashed border-cyan-400 rounded-sm relative flex items-center justify-center">
                <span className="text-[7.5px] text-cyan-300 font-bold">SELECTION</span>
              </div>
            </div>

            {/* Photoshop Layers Panel */}
            <div className="w-20 space-y-1 text-[7px] text-slate-300">
              <div className="bg-slate-800 p-1 rounded border border-blue-500/40 flex items-center justify-between">
                <span>Curves 1</span>
                <span className="text-blue-400">👁</span>
              </div>
              <div className="bg-slate-800 p-1 rounded border border-slate-700 flex items-center justify-between">
                <span>Mask Overlay</span>
                <span className="text-blue-400">👁</span>
              </div>
              <div className="bg-slate-800/60 p-1 rounded border border-slate-700 flex items-center justify-between">
                <span>Background</span>
                <span className="text-slate-500">🔒</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#0f1118]/90 px-2 py-1 rounded border border-[#283142]">
            <span>COLOR GRADING & RETOUCHING</span>
            <span className="text-blue-400">NON-DESTRUCTIVE</span>
          </div>
        </div>
      );

    case 'adobe-xd':
      return (
        <div className="w-full h-full bg-[#241525] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#472248] pb-1.5">
            <span className="flex items-center gap-1.5 text-pink-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              ADOBE XD • PROTOTYPE
            </span>
            <span className="text-neutral-400 text-[8px]">AUTO-ANIMATE</span>
          </div>

          {/* Interactive Screen Flow Prototype SVG */}
          <div className="relative z-10 flex items-center justify-center my-auto">
            <svg className="w-48 h-24" viewBox="0 0 200 100" fill="none">
              {/* Screen 1: Login */}
              <rect x="25" y="15" width="40" height="70" rx="3" fill="#180e18" stroke="#f472b6" strokeWidth="1" />
              <rect x="30" y="25" width="30" height="6" rx="1" fill="#ec4899" fillOpacity="0.4" />
              <rect x="30" y="36" width="30" height="8" rx="1" fill="#ec4899" fillOpacity="0.8" />
              {/* Screen 2: Dashboard */}
              <rect x="95" y="15" width="40" height="70" rx="3" fill="#180e18" stroke="#38bdf8" strokeWidth="1" />
              <rect x="100" y="22" width="30" height="15" rx="1" fill="#0284c7" fillOpacity="0.4" />
              <rect x="100" y="42" width="14" height="14" rx="1" fill="#0284c7" fillOpacity="0.6" />
              <rect x="116" y="42" width="14" height="14" rx="1" fill="#0284c7" fillOpacity="0.6" />
              {/* Screen 3: Details */}
              <rect x="150" y="25" width="30" height="50" rx="2" fill="#180e18" stroke="#64748b" strokeWidth="0.8" />
              {/* Prototyping Blue Bezier Noodle Arrow */}
              <path d="M60 40 C75 40, 80 28, 95 28" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="60" cy="40" r="2.5" fill="#38bdf8" />
              <polygon points="95,28 90,25 91,31" fill="#38bdf8" />
              <text x="68" y="22" fill="#38bdf8" fontSize="6">On Tap</text>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#160c17]/90 px-2 py-1 rounded border border-[#472248]">
            <span>INTERACTIVE SCREEN TRANSITIONS</span>
            <span className="text-pink-400">DESIGN SPEC HANDOFF</span>
          </div>
        </div>
      );

    case 'figma':
      return (
        <div className="w-full h-full bg-[#1e1e1e] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#383838] pb-1.5">
            <span className="flex items-center gap-1.5 text-purple-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              FIGMA • DESIGN SYSTEM
            </span>
            <span className="text-neutral-400 text-[8px]">AUTO-LAYOUT 5.0</span>
          </div>

          {/* Figma Canvas with Component Frames */}
          <div className="relative z-10 flex items-center justify-center gap-3 my-auto">
            {/* Frame 1 */}
            <div className="w-24 h-22 bg-[#2c2c2c] rounded border border-purple-500/50 p-1.5 flex flex-col justify-between shadow-md">
              <div className="flex items-center justify-between text-[6.5px] text-purple-300">
                <span># Card_Component</span>
                <span>❖</span>
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-purple-600/40 rounded flex items-center px-1 text-[6px] text-purple-200">
                  Auto Layout
                </div>
                <div className="h-5 bg-[#3a3a3a] rounded p-1 flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <div className="h-1.5 w-10 bg-slate-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Frame 2 Variant */}
            <div className="w-24 h-22 bg-[#2c2c2c] rounded border border-cyan-500/50 p-1.5 flex flex-col justify-between shadow-md">
              <div className="flex items-center justify-between text-[6.5px] text-cyan-300">
                <span># State=Hover</span>
                <span>❖</span>
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-cyan-600/40 rounded flex items-center px-1 text-[6px] text-cyan-200">
                  Gap: 12px
                </div>
                <div className="h-5 bg-[#3a3a3a] rounded p-1 flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <div className="h-1.5 w-10 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#141414]/90 px-2 py-1 rounded border border-[#383838]">
            <span>DESIGN TOKENS & VARIANTS</span>
            <span className="text-purple-400">SMART ANIMATE</span>
          </div>
        </div>
      );

    case 'ui-ux-design':
      return (
        <div className="w-full h-full bg-[#1b1e2b] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#2d3348] pb-1.5">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              UI/UX • RESEARCH & WIREFRAMES
            </span>
            <span className="text-neutral-400 text-[8px]">USER JOURNEYS</span>
          </div>

          {/* User Research Sticky Notes & Wireframes */}
          <div className="relative z-10 flex items-center justify-center gap-2.5 my-auto">
            {/* Sticky 1 */}
            <div className="w-16 h-18 bg-amber-200/90 text-amber-950 p-1.5 rounded shadow-sm text-[7px] flex flex-col justify-between font-sans rotate-[-2deg]">
              <span className="font-bold uppercase text-[6px] text-amber-800">User Need</span>
              <span>Fast CAD batch selection</span>
            </div>
            {/* Sticky 2 */}
            <div className="w-16 h-18 bg-rose-200/90 text-rose-950 p-1.5 rounded shadow-sm text-[7px] flex flex-col justify-between font-sans rotate-[2deg]">
              <span className="font-bold uppercase text-[6px] text-rose-800">Pain Point</span>
              <span>Theory overload without lab</span>
            </div>
            {/* Sticky 3 */}
            <div className="w-16 h-18 bg-sky-200/90 text-sky-950 p-1.5 rounded shadow-sm text-[7px] flex flex-col justify-between font-sans rotate-[-1deg]">
              <span className="font-bold uppercase text-[6px] text-sky-800">Solution</span>
              <span>100% terminal software practice</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#11131c]/90 px-2 py-1 rounded border border-[#2d3348]">
            <span>INFORMATION ARCHITECTURE</span>
            <span className="text-amber-400">USABILITY TESTING</span>
          </div>
        </div>
      );

    case 'adobe-illustrator':
      return (
        <div className="w-full h-full bg-[#201815] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#402e26] pb-1.5">
            <span className="flex items-center gap-1.5 text-amber-500 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              ILLUSTRATOR CC • VECTOR
            </span>
            <span className="text-neutral-400 text-[8px]">BEZIER PEN TOOL</span>
          </div>

          {/* Precision Vector Curves & Pen Tool Anchor Points */}
          <div className="relative z-10 flex items-center justify-center my-auto">
            <svg className="w-48 h-24" viewBox="0 0 200 100" fill="none">
              {/* Vector Logo Emblem Curve */}
              <path d="M30 65 C50 15, 150 15, 170 65" stroke="#f59e0b" strokeWidth="2" fill="none" />
              <path d="M40 75 C60 35, 140 35, 160 75" stroke="#d97706" strokeWidth="1" strokeDasharray="3,2" fill="none" />
              {/* Anchor Point 1 with Tangent Handles */}
              <circle cx="100" cy="27" r="3" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
              <line x1="75" y1="27" x2="125" y2="27" stroke="#38bdf8" strokeWidth="1" />
              <circle cx="75" cy="27" r="2" fill="#38bdf8" />
              <circle cx="125" cy="27" r="2" fill="#38bdf8" />
              {/* Pen Tool Cursor Icon */}
              <polygon points="135,45 142,58 138,60 134,56 128,62 126,58" fill="#f59e0b" stroke="#ffffff" strokeWidth="0.8" />
              <text x="65" y="85" fill="#f59e0b" fontSize="6.5">MATHEMATICALLY PRECISE CURVES</text>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#140e0c]/90 px-2 py-1 rounded border border-[#402e26]">
            <span>LOGO DESIGN & BRAND ASSETS</span>
            <span className="text-amber-500">PRINT READY CMYK & SVG</span>
          </div>
        </div>
      );

    case 'creative-arts-multimedia':
      return (
        <div className="w-full h-full bg-[#1e1528] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#3c2552] pb-1.5">
            <span className="flex items-center gap-1.5 text-purple-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              MULTIMEDIA & DIGITAL ARTS
            </span>
            <span className="text-neutral-400 text-[8px]">VISUAL COMPOSITION</span>
          </div>

          {/* Color Wheel & Golden Ratio Composition */}
          <div className="relative z-10 flex items-center justify-center my-auto">
            <svg className="w-48 h-24" viewBox="0 0 200 100" fill="none">
              {/* Golden Spiral */}
              <path d="M60 70 A 10 10 0 0 1 70 60 A 20 20 0 0 1 90 80 A 40 40 0 0 1 50 80 A 60 60 0 0 1 110 20" stroke="#c084fc" strokeWidth="1.2" fill="none" opacity="0.8" />
              {/* Color Harmonies Palette Swatches */}
              <circle cx="140" cy="35" r="7" fill="#ef4444" />
              <circle cx="155" cy="40" r="7" fill="#f59e0b" />
              <circle cx="165" cy="55" r="7" fill="#10b981" />
              <circle cx="155" cy="70" r="7" fill="#3b82f6" />
              <circle cx="140" cy="75" r="7" fill="#8b5cf6" />
              <text x="35" y="32" fill="#d8b4fe" fontSize="6.5">GOLDEN RATIO φ = 1.618</text>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-[#120b1a]/90 px-2 py-1 rounded border border-[#3c2552]">
            <span>COLOR THEORY & TYPOGRAPHY</span>
            <span className="text-purple-400">CREATIVE PORTFOLIO</span>
          </div>
        </div>
      );

    // Default Fallback
    default:
      return (
        <div className="w-full h-full bg-[#181a20] relative overflow-hidden flex flex-col justify-between p-3 select-none font-mono">
          <div className="relative z-10 flex items-center justify-between text-[9px] border-b border-[#2d323f] pb-1.5">
            <span className="text-[#DC2626] font-bold">{courseName}</span>
            <span className="text-neutral-400 text-[8px]">GV DESIGN TECH</span>
          </div>
          <div className="relative z-10 flex items-center justify-center my-auto text-xs text-neutral-400">
            <span>TECHNICAL SPECIFICATION TERMINAL</span>
          </div>
          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-400 bg-black/60 px-2 py-1 rounded">
            <span>ODDANCHATRAM CAMPUS</span>
            <span className="text-white">LIVE ONLINE</span>
          </div>
        </div>
      );
  }
};
