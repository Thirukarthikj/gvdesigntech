import React from 'react';
import { motion } from 'framer-motion';

export const CadRotatingAssemblyRight: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="hidden xl:block absolute top-1/2 -translate-y-1/2 left-[calc(100%+1.5rem)] 2xl:left-[calc(100%+2.5rem)] z-20 pointer-events-auto select-none group"
    >
      <div className="card-interactive relative bg-white/95 backdrop-blur-md rounded-xl border border-[#E5E5E2] p-4 shadow-subtle w-64 xl:w-72 2xl:w-80 text-left transition-all hover:border-[#DC2626]/40">
        {/* OriginKit Technical Corner Crosshairs */}
        <span className="crosshair-corner top-1.5 left-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner top-1.5 right-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner bottom-1.5 left-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner bottom-1.5 right-2 font-mono text-[9px] select-none">+</span>

        {/* Technical Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0F0EE] text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-neutral-800 tracking-wider">3D BUILDING PLAN</span>
          </div>
          <span className="text-[#DC2626] font-semibold">ROTATING</span>
        </div>

        {/* Scaled-Up 3D Architectural Building Plan Stage */}
        <div className="relative w-full h-52 xl:h-56 flex items-center justify-center overflow-hidden rounded-lg bg-[#FAF9F7] border border-[#EAEAE7]">
          {/* OriginKit Technical Architectural Coordinate Grid */}
          <div className="absolute inset-0 originkit-grid opacity-60" />

          {/* Technical Dimension Callouts (OriginKit BIM Styling) */}
          <div className="absolute top-2 left-2.5 z-10 flex flex-col text-[9px] font-mono leading-tight pointer-events-none">
            <span className="text-[#DC2626] font-bold">LVL 02 // +6.4m</span>
            <span className="text-neutral-500 text-[8px]">AREA: 2,450 sq.ft</span>
          </div>

          <div className="absolute top-2 right-2.5 z-10 text-[9px] font-mono text-neutral-400 pointer-events-none">
            REV: 360° // BIM
          </div>

          {/* Elevation Level Height Markers (Right Edge Leader) */}
          <div className="absolute right-2 top-11 bottom-9 z-10 flex flex-col justify-between text-[8px] font-mono text-neutral-400 border-l border-dashed border-neutral-300 pl-1.5 pointer-events-none">
            <span className="text-[#DC2626] font-semibold">+6.4m ROOF</span>
            <span>+3.2m LVL 02</span>
            <span>±0.0m GROUND</span>
          </div>

          {/* 3D Rotating Perspective Architectural Model */}
          <div
            className="relative w-40 h-40 xl:w-44 xl:h-44 flex items-center justify-center"
            style={{ perspective: '850px' }}
          >
            {/* 3D Building Turntable Rotating 360° around Y */}
            <div
              className="relative w-36 h-36 xl:w-40 xl:h-40 flex items-center justify-center animate-cad-building"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Soft Ambient Contact Shadow on the Ground Plane */}
              <div
                className="absolute w-36 h-28 rounded-full bg-neutral-900/15 blur-[10px] pointer-events-none"
                style={{ transform: 'rotateX(90deg) translateZ(-30px)' }}
              />

              {/* 1. Ground Foundation & Site Plan Slab (Bottom Plane) */}
              <div
                className="absolute w-32 h-26 rounded border-2 border-neutral-300 bg-[#F4F3EE]/95 shadow-xs overflow-hidden flex flex-col justify-between p-1.5 select-none pointer-events-none"
                style={{ transform: 'rotateX(90deg) translateZ(-18px)', transformStyle: 'preserve-3d' }}
              >
                {/* Site Boundary & Walkway Grid */}
                <div className="flex items-center justify-between text-[7px] font-mono text-neutral-400">
                  <span>GRID A-1</span>
                  <span className="text-[#DC2626] font-bold">NORTH ↑</span>
                </div>
                {/* Entryway Pavers & Steps */}
                <div className="flex justify-center gap-1 my-auto">
                  <div className="w-12 h-5 border border-dashed border-neutral-400 bg-neutral-100 flex items-center justify-center text-[6px] font-mono text-neutral-500">
                    PORCH / ENTRY
                  </div>
                </div>
                <div className="flex items-center justify-between text-[6px] font-mono text-neutral-400">
                  <span>LOT: 32&apos;x45&apos;</span>
                  <span>PL-01 FOUNDATION</span>
                </div>
              </div>

              {/* 2. Level 01 Ground Floor Plan (Architectural Blueprint Floor) */}
              <div
                className="absolute w-28 h-22 rounded-[2px] border-2 border-neutral-900 bg-white shadow-md overflow-hidden flex flex-col justify-between p-1.5 select-none"
                style={{ transform: 'rotateX(90deg) translateZ(0px)', transformStyle: 'preserve-3d' }}
              >
                <div className="grid grid-cols-2 h-full gap-1 border-b border-neutral-200 pb-1">
                  {/* Living / Reception Hall */}
                  <div className="border-r border-neutral-300 pr-1 flex flex-col justify-between">
                    <span className="text-[6px] font-mono text-neutral-700 font-bold leading-none">LIVING HALL</span>
                    {/* Door Swing Arc */}
                    <svg className="w-5 h-5 text-[#DC2626]" viewBox="0 0 20 20">
                      <path d="M 2 18 A 16 16 0 0 1 18 2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
                      <line x1="2" y1="18" x2="18" y2="18" stroke="#1E293B" strokeWidth="2" />
                    </svg>
                  </div>
                  {/* Office / Studio Room */}
                  <div className="flex flex-col justify-between pl-1">
                    <span className="text-[6px] font-mono text-neutral-600 leading-none">STUDIO ROOM</span>
                    <div className="w-full h-3 border border-neutral-300 bg-neutral-50 rounded-[1px] flex items-center justify-center text-[5px] font-mono text-neutral-400">
                      WORKSTATION
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[6px] font-mono text-neutral-400 pt-0.5">
                  <span className="text-[#DC2626] font-bold">LVL 01</span>
                  <span>DIM: 8.5m x 6.4m</span>
                </div>
              </div>

              {/* 3. Exterior Cutaway Walls (Giving True 3D Architecture Depth) */}
              {/* Back Exterior Wall */}
              <div
                className="absolute w-28 h-5 border border-neutral-800 bg-neutral-900 text-[6px] font-mono text-neutral-300 flex items-center justify-around px-1"
                style={{ transform: 'translateZ(-44px) translateY(-10px)' }}
              >
                <span className="w-4 h-2.5 bg-sky-200/50 border border-neutral-600" />
                <span className="w-4 h-2.5 bg-sky-200/50 border border-neutral-600" />
              </div>

              {/* Left Exterior Wall */}
              <div
                className="absolute w-22 h-5 border border-neutral-800 bg-neutral-850"
                style={{ transform: 'rotateY(90deg) translateZ(-56px) translateY(-10px)' }}
              />

              {/* Right Facade (Glass Curtain Wall with Mullions) */}
              <div
                className="absolute w-22 h-5 border border-sky-400/60 bg-sky-500/20 backdrop-blur-xs flex items-center justify-around"
                style={{ transform: 'rotateY(90deg) translateZ(56px) translateY(-10px)' }}
              >
                <span className="w-px h-full bg-sky-400/70" />
                <span className="w-px h-full bg-sky-400/70" />
                <span className="w-px h-full bg-sky-400/70" />
                <span className="w-px h-full bg-sky-400/70" />
              </div>

              {/* 4. Structural Columns (Pillars connecting Ground to Level 02) */}
              {/* Front-Left Column */}
              <div
                className="absolute w-2 h-7 bg-neutral-900 border border-neutral-700 shadow-xs"
                style={{ transform: 'translate3d(-46px, -14px, 34px)' }}
              />
              {/* Front-Right Column */}
              <div
                className="absolute w-2 h-7 bg-neutral-900 border border-neutral-700 shadow-xs"
                style={{ transform: 'translate3d(46px, -14px, 34px)' }}
              />
              {/* Center Accent Canopy Column */}
              <div
                className="absolute w-1.5 h-7 bg-[#DC2626] shadow-xs"
                style={{ transform: 'translate3d(0px, -14px, 36px)' }}
              />

              {/* 5. Central Elevator / Staircase Core Tower */}
              <div
                className="absolute w-6 h-12 bg-neutral-950 border border-neutral-700 shadow-lg flex flex-col justify-between p-0.5"
                style={{ transform: 'translate3d(-34px, -24px, -20px)' }}
              >
                <div className="w-full h-1.5 bg-[#DC2626]" />
                <div className="space-y-0.5">
                  <div className="w-full h-0.5 bg-neutral-700" />
                  <div className="w-full h-0.5 bg-neutral-700" />
                  <div className="w-full h-0.5 bg-neutral-700" />
                </div>
                <span className="text-[5px] font-mono text-neutral-400 text-center">CORE</span>
              </div>

              {/* 6. Level 02 Upper Floor Slab & Balcony (Cantilevered Forward) */}
              <div
                className="absolute w-26 h-18 rounded-[2px] border-2 border-neutral-800 bg-[#FAF9F7] shadow-sm flex flex-col justify-between p-1 select-none"
                style={{ transform: 'rotateX(90deg) translateZ(22px)', transformStyle: 'preserve-3d' }}
              >
                {/* Front Balcony with Blue Glass Railing */}
                <div className="h-3.5 w-full border-b border-sky-400/60 bg-sky-400/25 flex items-center justify-between px-1.5">
                  <span className="text-[6px] font-mono text-sky-800 font-bold">BALCONY TERRACE</span>
                  <span className="text-[6px] font-mono text-[#DC2626]">★</span>
                </div>
                {/* Upper Suite Floor Plan Layout */}
                <div className="flex items-center justify-between text-[6px] font-mono text-neutral-600 px-1">
                  <span>MASTER SUITE 02</span>
                  <span className="text-neutral-400">+3.2m</span>
                </div>
              </div>

              {/* 7. Level 03 Modern Cantilevered Roof Slab & Pergola Louvers */}
              <div
                className="absolute w-22 h-16 rounded-[2px] border border-neutral-800 bg-neutral-900 shadow-md flex flex-col justify-between p-1.5 select-none"
                style={{ transform: 'rotateX(90deg) translateZ(38px)', transformStyle: 'preserve-3d' }}
              >
                {/* Louvered Solar Pergola Slats */}
                <div className="space-y-0.5 w-full">
                  <div className="w-full h-0.5 bg-[#DC2626]" />
                  <div className="w-full h-0.5 bg-neutral-600" />
                  <div className="w-full h-0.5 bg-neutral-600" />
                  <div className="w-full h-0.5 bg-[#DC2626]" />
                  <div className="w-full h-0.5 bg-neutral-600" />
                </div>
                <div className="flex items-center justify-between text-[6px] font-mono text-neutral-300">
                  <span className="text-[#DC2626] font-bold">ROOF CANOPY</span>
                  <span>+6.4m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-neutral-400 pointer-events-none">
            <span>GRID: A-C // 1-3</span>
            <span className="text-neutral-700 font-semibold">REVIT BIM 3D</span>
          </div>
        </div>

        {/* Technical Footer Telemetry */}
        <div className="pt-2 mt-2 border-t border-[#F0F0EE] flex items-center justify-between text-[10px] font-mono">
          <span className="text-neutral-500">AutoCAD • Revit • SketchUp</span>
          <span className="text-neutral-900 font-semibold">3D CIVIL &amp; ARCH</span>
        </div>
      </div>
    </motion.div>
  );
};