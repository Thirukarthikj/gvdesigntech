import React from 'react';

export const HeroBuilding3DBackground: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      {/* Soft Blueprint Radial Focus Glow */}
      <div className="absolute w-72 sm:w-96 md:w-[480px] h-72 sm:h-96 md:h-[480px] rounded-full bg-gradient-to-tr from-red-500/5 via-sky-500/5 to-transparent blur-2xl pointer-events-none" />

      {/* OriginKit Technical Coordinate Markers & Level Guides */}
      <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 md:px-12 pointer-events-none opacity-40">
        <div className="flex flex-col gap-1 text-[7px] sm:text-[8px] font-mono text-neutral-400">
          <span className="text-[#DC2626] font-semibold">+6.4m ROOF</span>
          <span className="w-8 border-b border-dashed border-neutral-300" />
          <span>+3.2m LVL 02</span>
          <span className="w-8 border-b border-dashed border-neutral-300" />
          <span>±0.0m GROUND</span>
        </div>
        <div className="flex flex-col items-end gap-1 text-[7px] sm:text-[8px] font-mono text-neutral-400">
          <span className="text-neutral-500 font-semibold">BIM: 360° ISO</span>
          <span className="text-[#DC2626]">SCALE 1:100</span>
          <span>AUTOCAD // REVIT</span>
        </div>
      </div>

      {/* 3D Perspective Stage */}
      <div
        className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center scale-90 sm:scale-105 md:scale-125 lg:scale-135 opacity-45 sm:opacity-50 transition-opacity"
        style={{ perspective: '850px' }}
      >
        {/* 3D Building Turntable Rotating 360° around Y */}
        <div
          className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center animate-cad-building"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Ground Contact Shadow */}
          <div
            className="absolute w-44 h-36 rounded-full bg-neutral-900/15 blur-[10px] pointer-events-none"
            style={{ transform: 'rotateX(90deg) translateZ(-34px)' }}
          />

          {/* 1. Ground Foundation & Site Plan Slab */}
          <div
            className="absolute w-36 h-28 rounded border border-neutral-300 bg-[#F4F3EE]/95 shadow-sm overflow-hidden flex flex-col justify-between p-1.5 select-none"
            style={{ transform: 'rotateX(90deg) translateZ(-22px)', transformStyle: 'preserve-3d' }}
          >
            <div className="flex items-center justify-between text-[7px] font-mono text-neutral-400">
              <span>GRID A-1 // LOT: 36&apos;x48&apos;</span>
              <span className="text-[#DC2626] font-bold">NORTH ↑</span>
            </div>
            <div className="flex justify-center gap-1 my-auto">
              <div className="w-12 h-6 border border-dashed border-neutral-400 bg-neutral-100 flex items-center justify-center text-[6px] font-mono text-neutral-500">
                PORCH // ENTRY
              </div>
            </div>
            <div className="flex items-center justify-between text-[6px] font-mono text-neutral-400">
              <span>FOUNDATION SLAB</span>
              <span>PL-01</span>
            </div>
          </div>

          {/* 2. Level 01 Ground Floor Plan (Architectural Blueprint Floor) */}
          <div
            className="absolute w-30 h-22 sm:w-32 sm:h-24 rounded-[2px] border-2 border-neutral-900 bg-white shadow-md overflow-hidden flex flex-col justify-between p-1.5 select-none"
            style={{ transform: 'rotateX(90deg) translateZ(0px)', transformStyle: 'preserve-3d' }}
          >
            <div className="grid grid-cols-2 h-full gap-1 border-b border-neutral-200 pb-1">
              {/* Living Hall / Foyer */}
              <div className="border-r border-neutral-300 pr-1 flex flex-col justify-between">
                <span className="text-[6px] font-mono text-neutral-700 font-bold leading-none">LIVING // FOYER</span>
                {/* Door Swing Arc */}
                <svg className="w-5 h-5 text-[#DC2626]" viewBox="0 0 20 20">
                  <path d="M 2 18 A 16 16 0 0 1 18 2" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1.5" />
                  <line x1="2" y1="18" x2="18" y2="18" stroke="#1E293B" strokeWidth="1.5" />
                </svg>
              </div>
              {/* Studio / Conference */}
              <div className="flex flex-col justify-between pl-1">
                <span className="text-[6px] font-mono text-neutral-500 leading-none">STUDIO // WORKSPACE</span>
                <div className="w-full h-3 border border-neutral-300 bg-neutral-50 rounded-[1px] flex items-center justify-center text-[5px] font-mono text-neutral-400">
                  DESK CORE
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[6px] font-mono text-neutral-400 pt-0.5">
              <span className="text-[#DC2626] font-bold">LVL 01</span>
              <span>ELEV ±0.00m</span>
            </div>
          </div>

          {/* 3. Exterior Cutaway Walls */}
          {/* Back Wall */}
          <div
            className="absolute w-30 sm:w-32 h-6 border border-neutral-800 bg-neutral-900 text-[6px] font-mono text-neutral-300 flex items-center justify-around px-1"
            style={{ transform: 'translateZ(-44px) translateY(-12px)' }}
          >
            <span className="w-4 h-3 bg-sky-200/50 border border-neutral-600" />
            <span className="w-4 h-3 bg-sky-200/50 border border-neutral-600" />
          </div>

          {/* Left Wall */}
          <div
            className="absolute w-22 sm:w-24 h-6 border border-neutral-800 bg-neutral-850"
            style={{ transform: 'rotateY(90deg) translateZ(-56px) translateY(-12px)' }}
          />

          {/* Right Glass Curtain Wall */}
          <div
            className="absolute w-22 sm:w-24 h-6 border border-sky-400/60 bg-sky-500/25 backdrop-blur-xs flex items-center justify-around"
            style={{ transform: 'rotateY(90deg) translateZ(56px) translateY(-12px)' }}
          >
            <span className="w-px h-full bg-sky-400/70" />
            <span className="w-px h-full bg-sky-400/70" />
            <span className="w-px h-full bg-sky-400/70" />
          </div>

          {/* 4. Structural Columns (Pillars connecting Ground to Level 02) */}
          <div
            className="absolute w-2 h-7 bg-neutral-900 border border-neutral-700 shadow-xs"
            style={{ transform: 'translate3d(-48px, -14px, 36px)' }}
          />
          <div
            className="absolute w-2 h-7 bg-neutral-900 border border-neutral-700 shadow-xs"
            style={{ transform: 'translate3d(48px, -14px, 36px)' }}
          />
          <div
            className="absolute w-1.5 h-7 bg-[#DC2626] shadow-xs"
            style={{ transform: 'translate3d(0px, -14px, 40px)' }}
          />

          {/* 5. Central Elevator / Staircase Core Tower */}
          <div
            className="absolute w-7 h-14 bg-neutral-950 border border-neutral-700 shadow-xl flex flex-col justify-between p-1"
            style={{ transform: 'translate3d(-36px, -24px, -22px)' }}
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
            className="absolute w-26 h-18 sm:w-28 sm:h-20 rounded-[2px] border-2 border-neutral-800 bg-[#FAF9F7] shadow-md flex flex-col justify-between p-1 select-none"
            style={{ transform: 'rotateX(90deg) translateZ(24px)', transformStyle: 'preserve-3d' }}
          >
            {/* Front Balcony with Blue Glass Railing */}
            <div className="h-3 w-full border-b border-sky-400/70 bg-sky-400/25 flex items-center justify-between px-1.5">
              <span className="text-[6px] font-mono text-sky-800 font-bold">BALCONY TERRACE</span>
              <span className="text-[6px] font-mono text-[#DC2626]">★</span>
            </div>
            {/* Upper Suite Blueprint */}
            <div className="flex items-center justify-between text-[6px] font-mono text-neutral-600 px-1">
              <span>EXECUTIVE SUITE 02</span>
              <span className="text-neutral-400">+3.20m</span>
            </div>
          </div>

          {/* 7. Level 03 Modern Cantilevered Roof Slab & Pergola Louvers */}
          <div
            className="absolute w-24 h-16 sm:w-26 sm:h-18 rounded-[2px] border border-neutral-800 bg-neutral-900 shadow-lg flex flex-col justify-between p-1.5 select-none"
            style={{ transform: 'rotateX(90deg) translateZ(44px)', transformStyle: 'preserve-3d' }}
          >
            {/* Louvered Solar Pergola Slats */}
            <div className="space-y-0.5 w-full">
              <div className="w-full h-0.5 bg-[#DC2626]" />
              <div className="w-full h-0.5 bg-neutral-600" />
              <div className="w-full h-0.5 bg-neutral-600" />
              <div className="w-full h-0.5 bg-[#DC2626]" />
            </div>
            <div className="flex items-center justify-between text-[6px] font-mono text-neutral-300">
              <span className="text-[#DC2626] font-bold">ROOFTOP</span>
              <span>+6.40m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};