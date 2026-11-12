import React from 'react';
import { motion } from 'framer-motion';

interface CadRotatingAssemblyRightProps {
  variant?: 'desktop' | 'mobile';
}

const BuildingTurntableModel: React.FC<{ modelSize?: string }> = ({ modelSize = 'w-28 h-28' }) => {
  return (
    <div
      className={`relative ${modelSize} flex items-center justify-center animate-cad-building`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Soft Ambient Contact Shadow on the Ground Plane */}
      <div
        className="absolute w-28 h-24 rounded-full bg-neutral-900/15 blur-[8px] pointer-events-none"
        style={{ transform: 'rotateX(90deg) translateZ(-26px)' }}
      />

      {/* 1. Ground Foundation & Site Plan Slab (Bottom Plane) */}
      <div
        className="absolute w-24 h-20 rounded border border-neutral-300 bg-[#F4F3EE]/95 shadow-xs overflow-hidden flex flex-col justify-between p-1 select-none pointer-events-none"
        style={{ transform: 'rotateX(90deg) translateZ(-16px)', transformStyle: 'preserve-3d' }}
      >
        {/* Site Boundary & Walkway Grid */}
        <div className="flex items-center justify-between text-[6px] font-mono text-neutral-400">
          <span>GRID A-1</span>
          <span className="text-[#DC2626] font-bold">NORTH ↑</span>
        </div>
        {/* Entryway Pavers & Steps */}
        <div className="flex justify-center gap-0.5 my-auto">
          <div className="w-8 h-4 border border-dashed border-neutral-400 bg-neutral-100 flex items-center justify-center text-[5px] font-mono text-neutral-500">
            PORCH
          </div>
        </div>
        <div className="flex items-center justify-between text-[5px] font-mono text-neutral-400">
          <span>LOT: 32&apos;x40&apos;</span>
          <span>PL-01</span>
        </div>
      </div>

      {/* 2. Level 01 Ground Floor Plan (Architectural Blueprint Floor) */}
      <div
        className="absolute w-20 h-16 rounded-[2px] border-2 border-neutral-900 bg-white shadow-md overflow-hidden flex flex-col justify-between p-1 select-none"
        style={{ transform: 'rotateX(90deg) translateZ(0px)', transformStyle: 'preserve-3d' }}
      >
        <div className="grid grid-cols-2 h-full gap-0.5 border-b border-neutral-200 pb-0.5">
          {/* Living / Reception Hall */}
          <div className="border-r border-neutral-300 pr-0.5 flex flex-col justify-between">
            <span className="text-[5px] font-mono text-neutral-600 font-bold leading-none">LIVING</span>
            {/* Door Swing Arc */}
            <svg className="w-4 h-4 text-[#DC2626]" viewBox="0 0 20 20">
              <path d="M 2 18 A 16 16 0 0 1 18 2" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1.5" />
              <line x1="2" y1="18" x2="18" y2="18" stroke="#1E293B" strokeWidth="1.5" />
            </svg>
          </div>
          {/* Office / Studio Room */}
          <div className="flex flex-col justify-between pl-0.5">
            <span className="text-[5px] font-mono text-neutral-500 leading-none">STUDIO</span>
            <div className="w-full h-2 border border-neutral-300 bg-neutral-50 rounded-[1px]" />
          </div>
        </div>
        <div className="flex items-center justify-between text-[5px] font-mono text-neutral-400 pt-0.5">
          <span className="text-[#DC2626] font-bold">LVL 01</span>
          <span>±0.00</span>
        </div>
      </div>

      {/* 3. Exterior Cutaway Walls */}
      <div
        className="absolute w-20 h-4 border border-neutral-800 bg-neutral-900 text-[6px] font-mono text-neutral-300 flex items-center justify-around px-1"
        style={{ transform: 'translateZ(-32px) translateY(-8px)' }}
      >
        <span className="w-3 h-2 bg-sky-200/40 border border-neutral-600" />
        <span className="w-3 h-2 bg-sky-200/40 border border-neutral-600" />
      </div>

      <div
        className="absolute w-16 h-4 border border-neutral-800 bg-neutral-850"
        style={{ transform: 'rotateY(90deg) translateZ(-40px) translateY(-8px)' }}
      />

      <div
        className="absolute w-16 h-4 border border-sky-400/60 bg-sky-500/20 backdrop-blur-xs flex items-center justify-around"
        style={{ transform: 'rotateY(90deg) translateZ(40px) translateY(-8px)' }}
      >
        <span className="w-px h-full bg-sky-400/60" />
        <span className="w-px h-full bg-sky-400/60" />
        <span className="w-px h-full bg-sky-400/60" />
      </div>

      {/* 4. Structural Columns */}
      <div
        className="absolute w-1.5 h-5 bg-neutral-900 border border-neutral-700 shadow-xs"
        style={{ transform: 'translate3d(-34px, -10px, 26px)' }}
      />
      <div
        className="absolute w-1.5 h-5 bg-neutral-900 border border-neutral-700 shadow-xs"
        style={{ transform: 'translate3d(34px, -10px, 26px)' }}
      />
      <div
        className="absolute w-1 h-5 bg-[#DC2626] shadow-xs"
        style={{ transform: 'translate3d(0px, -10px, 28px)' }}
      />

      {/* 5. Central Elevator / Staircase Core Tower */}
      <div
        className="absolute w-5 h-10 bg-neutral-950 border border-neutral-700 shadow-lg flex flex-col justify-between p-0.5"
        style={{ transform: 'translate3d(-26px, -18px, -16px)' }}
      >
        <div className="w-full h-1 bg-[#DC2626]" />
        <div className="space-y-0.5">
          <div className="w-full h-0.5 bg-neutral-700" />
          <div className="w-full h-0.5 bg-neutral-700" />
        </div>
        <span className="text-[4px] font-mono text-neutral-400 text-center">CORE</span>
      </div>

      {/* 6. Level 02 Upper Floor Slab & Balcony */}
      <div
        className="absolute w-18 h-14 rounded-[2px] border-2 border-neutral-800 bg-[#FAF9F7] shadow-sm flex flex-col justify-between p-0.5 select-none"
        style={{ transform: 'rotateX(90deg) translateZ(18px)', transformStyle: 'preserve-3d' }}
      >
        <div className="h-2.5 w-full border-b border-sky-400/60 bg-sky-400/20 flex items-center justify-between px-1">
          <span className="text-[5px] font-mono text-sky-700 font-semibold">BALCONY</span>
          <span className="text-[5px] font-mono text-[#DC2626]">★</span>
        </div>
        <div className="flex items-center justify-between text-[5px] font-mono text-neutral-600 px-1">
          <span>SUITE 02</span>
          <span className="text-neutral-400">+3.2m</span>
        </div>
      </div>

      {/* 7. Level 03 Modern Cantilevered Roof Slab & Pergola Louvers */}
      <div
        className="absolute w-16 h-12 rounded-[2px] border border-neutral-800 bg-neutral-900 shadow-md flex flex-col justify-between p-1 select-none"
        style={{ transform: 'rotateX(90deg) translateZ(32px)', transformStyle: 'preserve-3d' }}
      >
        <div className="space-y-0.5 w-full">
          <div className="w-full h-0.5 bg-[#DC2626]" />
          <div className="w-full h-0.5 bg-neutral-600" />
          <div className="w-full h-0.5 bg-neutral-600" />
          <div className="w-full h-0.5 bg-[#DC2626]" />
        </div>
        <div className="flex items-center justify-between text-[5px] font-mono text-neutral-300">
          <span className="text-[#DC2626] font-bold">ROOF</span>
          <span>+6.4m</span>
        </div>
      </div>
    </div>
  );
};

export const CadRotatingAssemblyRight: React.FC<CadRotatingAssemblyRightProps> = ({ variant = 'desktop' }) => {
  if (variant === 'mobile') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-start select-none"
      >
        <div className="card-interactive relative bg-white/95 backdrop-blur-md rounded-xl border border-[#E5E5E2] p-2.5 sm:p-3 shadow-subtle w-48 sm:w-56 text-left transition-all hover:border-[#DC2626]/40">
          {/* OriginKit Technical Corner Crosshairs */}
          <span className="crosshair-corner top-1.5 left-2 font-mono text-[8px] select-none">+</span>
          <span className="crosshair-corner top-1.5 right-2 font-mono text-[8px] select-none">+</span>
          <span className="crosshair-corner bottom-1.5 left-2 font-mono text-[8px] select-none">+</span>
          <span className="crosshair-corner bottom-1.5 right-2 font-mono text-[8px] select-none">+</span>

          {/* Technical Header */}
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#F0F0EE] text-[8px] sm:text-[9px] font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-neutral-800 tracking-wider">3D BUILDING PLAN</span>
            </div>
            <span className="text-[#DC2626] font-semibold">ROTATING</span>
          </div>

          {/* 3D Rotating Architectural Building Plan Stage */}
          <div className="relative w-full h-36 sm:h-40 flex items-center justify-center overflow-hidden rounded-lg bg-[#FAF9F7] border border-[#EAEAE7]">
            <div className="absolute inset-0 originkit-grid opacity-60" />

            <div className="absolute top-1.5 left-1.5 z-10 flex flex-col text-[7px] sm:text-[8px] font-mono leading-tight pointer-events-none">
              <span className="text-[#DC2626] font-bold">LVL 02 // +6.4m</span>
              <span className="text-neutral-500">AREA: 2,450 sq.ft</span>
            </div>

            <div className="absolute top-1.5 right-1.5 z-10 text-[7px] sm:text-[8px] font-mono text-neutral-400 pointer-events-none">
              REV: 360° // BIM
            </div>

            <div className="absolute right-1 top-8 bottom-6 z-10 flex flex-col justify-between text-[6px] sm:text-[7px] font-mono text-neutral-400 border-l border-dashed border-neutral-300 pl-1 pointer-events-none">
              <span className="text-[#DC2626] font-semibold">+6.4m</span>
              <span>+3.2m</span>
              <span>±0.0m</span>
            </div>

            <div
              className="relative w-28 h-28 flex items-center justify-center"
              style={{ perspective: '800px' }}
            >
              <BuildingTurntableModel modelSize="w-24 h-24 sm:w-26 sm:h-26" />
            </div>

            <div className="absolute bottom-1 left-1.5 right-1.5 flex items-center justify-between text-[7px] sm:text-[8px] font-mono text-neutral-400 pointer-events-none">
              <span>GRID: A-C // 1-3</span>
              <span className="text-neutral-700 font-semibold">REVIT BIM 3D</span>
            </div>
          </div>

          <div className="pt-1.5 mt-1.5 border-t border-[#F0F0EE] flex items-center justify-between text-[8px] sm:text-[9px] font-mono">
            <span className="text-neutral-500">AutoCAD • Revit</span>
            <span className="text-neutral-900 font-semibold">3D CIVIL &amp; ARCH</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="hidden xl:block absolute top-1/2 -translate-y-1/2 left-[calc(100%+1.5rem)] 2xl:left-[calc(100%+2.5rem)] z-20 pointer-events-auto select-none group"
    >
      <div className="card-interactive relative bg-white/95 backdrop-blur-md rounded-xl border border-[#E5E5E2] p-3.5 shadow-subtle w-56 2xl:w-60 text-left transition-all hover:border-[#DC2626]/40">
        {/* OriginKit Technical Corner Crosshairs */}
        <span className="crosshair-corner top-1.5 left-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner top-1.5 right-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner bottom-1.5 left-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner bottom-1.5 right-2 font-mono text-[9px] select-none">+</span>

        {/* Technical Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0F0EE] text-[9px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-neutral-800 tracking-wider">3D BUILDING PLAN</span>
          </div>
          <span className="text-[#DC2626] font-semibold">ROTATING</span>
        </div>

        {/* 3D Rotating Architectural Building Plan Stage */}
        <div className="relative w-full h-44 flex items-center justify-center overflow-hidden rounded-lg bg-[#FAF9F7] border border-[#EAEAE7]">
          {/* OriginKit Technical Architectural Coordinate Grid */}
          <div className="absolute inset-0 originkit-grid opacity-60" />

          {/* Technical Dimension Callouts (OriginKit BIM Styling) */}
          <div className="absolute top-2 left-2 z-10 flex flex-col text-[8px] font-mono leading-tight pointer-events-none">
            <span className="text-[#DC2626] font-bold">LVL 02 // +6.4m</span>
            <span className="text-neutral-500">AREA: 2,450 sq.ft</span>
          </div>

          <div className="absolute top-2 right-2 z-10 text-[8px] font-mono text-neutral-400 pointer-events-none">
            REV: 360° // BIM
          </div>

          {/* Elevation Level Height Markers (Right Edge Leader) */}
          <div className="absolute right-1.5 top-10 bottom-8 z-10 flex flex-col justify-between text-[7px] font-mono text-neutral-400 border-l border-dashed border-neutral-300 pl-1 pointer-events-none">
            <span className="text-[#DC2626] font-semibold">+6.4m ROOF</span>
            <span>+3.2m LVL 02</span>
            <span>±0.0m GROUND</span>
          </div>

          {/* 3D Rotating Perspective Architectural Model */}
          <div
            className="relative w-32 h-32 flex items-center justify-center"
            style={{ perspective: '800px' }}
          >
            <BuildingTurntableModel modelSize="w-28 h-28" />
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[8px] font-mono text-neutral-400 pointer-events-none">
            <span>GRID: A-C // 1-3</span>
            <span className="text-neutral-700 font-semibold">REVIT BIM 3D</span>
          </div>
        </div>

        {/* Technical Footer Telemetry */}
        <div className="pt-2 mt-2 border-t border-[#F0F0EE] flex items-center justify-between text-[9px] font-mono">
          <span className="text-neutral-500">AutoCAD • Revit • SketchUp</span>
          <span className="text-neutral-900 font-semibold">3D CIVIL &amp; ARCH</span>
        </div>
      </div>
    </motion.div>
  );
};