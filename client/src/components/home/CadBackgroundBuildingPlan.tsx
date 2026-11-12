import React from 'react';

export const CadBackgroundBuildingPlan: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-visible">
      {/* Subtle Radial Vignette to keep center text razor-sharp */}
      <div className="absolute inset-0 bg-radial from-white/70 via-white/40 to-transparent pointer-events-none z-1" />

      {/* Floating 3D Architectural CAD Turntable in Background */}
      <div
        className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center opacity-35 sm:opacity-45 transition-opacity duration-700"
        style={{ perspective: '900px' }}
      >
        {/* Continuous 360° Rotating 3D Architectural Building Model */}
        <div
          className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center animate-cad-building"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Ambient Ground Contact Shadow */}
          <div
            className="absolute w-52 h-44 sm:w-64 sm:h-52 rounded-full bg-neutral-950/15 blur-[12px] pointer-events-none"
            style={{ transform: 'rotateX(90deg) translateZ(-44px)' }}
          />

          {/* 1. Ground Foundation & Site Plan Slab (Base Plane) */}
          <div
            className="absolute w-44 h-36 sm:w-52 sm:h-44 rounded border border-neutral-400 bg-[#F4F3EE]/85 shadow-xs overflow-hidden flex flex-col justify-between p-2 select-none"
            style={{ transform: 'rotateX(90deg) translateZ(-28px)', transformStyle: 'preserve-3d' }}
          >
            {/* Site Boundary & Walkway Grid */}
            <div className="flex items-center justify-between text-[7px] sm:text-[8px] font-mono text-neutral-500">
              <span className="font-semibold">GRID A-1 // LOT 32&apos;x40&apos;</span>
              <span className="text-[#DC2626] font-bold">NORTH ↑</span>
            </div>
            {/* Entryway Pavers & Steps */}
            <div className="flex justify-center gap-1 my-auto">
              <div className="w-16 sm:w-20 h-6 border border-dashed border-neutral-400 bg-white/70 flex items-center justify-center text-[7px] font-mono text-neutral-600">
                ENTRANCE PORCH
              </div>
            </div>
            <div className="flex items-center justify-between text-[7px] font-mono text-neutral-400">
              <span>SITE PLAN: 1:100</span>
              <span>BIM-CIVIL</span>
            </div>
          </div>

          {/* 2. Level 01 Ground Floor Plan (Architectural Blueprint Floor) */}
          <div
            className="absolute w-36 h-28 sm:w-44 sm:h-34 rounded-[2px] border-2 border-neutral-900 bg-white/95 shadow-md overflow-hidden flex flex-col justify-between p-1.5 select-none"
            style={{ transform: 'rotateX(90deg) translateZ(0px)', transformStyle: 'preserve-3d' }}
          >
            <div className="grid grid-cols-2 h-full gap-1 border-b border-neutral-200 pb-1">
              {/* Living Hall / Reception */}
              <div className="border-r border-neutral-300 pr-1 flex flex-col justify-between">
                <span className="text-[7px] sm:text-[8px] font-mono text-neutral-800 font-bold leading-none">
                  LIVING HALL
                </span>
                {/* Red Door Swing Arc */}
                <svg className="w-6 h-6 text-[#DC2626]" viewBox="0 0 20 20">
                  <path d="M 2 18 A 16 16 0 0 1 18 2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
                  <line x1="2" y1="18" x2="18" y2="18" stroke="#1E293B" strokeWidth="1.5" />
                </svg>
              </div>
              {/* Studio / CAD Lab */}
              <div className="flex flex-col justify-between pl-1">
                <span className="text-[7px] sm:text-[8px] font-mono text-neutral-600 leading-none">
                  CAD STUDIO
                </span>
                <div className="w-full h-3 border border-neutral-300 bg-neutral-100 rounded-[1px] flex items-center justify-center text-[5px] font-mono text-neutral-400">
                  WORKSTATIONS
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[7px] font-mono text-neutral-500 pt-0.5">
              <span className="text-[#DC2626] font-bold">LVL 01</span>
              <span>±0.00m</span>
            </div>
          </div>

          {/* 3. Exterior Cutaway Walls */}
          {/* Back Exterior Wall */}
          <div
            className="absolute w-36 sm:w-44 h-6 sm:h-8 border border-neutral-800 bg-neutral-900/90 text-[7px] font-mono text-neutral-300 flex items-center justify-around px-1"
            style={{ transform: 'translateZ(-56px) translateY(-14px)' }}
          >
            <span className="w-5 h-3 bg-sky-200/50 border border-neutral-600 rounded-[1px]" />
            <span className="w-5 h-3 bg-sky-200/50 border border-neutral-600 rounded-[1px]" />
            <span className="w-5 h-3 bg-sky-200/50 border border-neutral-600 rounded-[1px]" />
          </div>

          {/* Left Exterior Wall */}
          <div
            className="absolute w-28 sm:w-34 h-6 sm:h-8 border border-neutral-800 bg-neutral-850/90"
            style={{ transform: 'rotateY(90deg) translateZ(-72px) translateY(-14px)' }}
          />

          {/* Right Facade (Glass Curtain Wall with Mullions) */}
          <div
            className="absolute w-28 sm:w-34 h-6 sm:h-8 border border-sky-400/80 bg-sky-500/20 backdrop-blur-xs flex items-center justify-around"
            style={{ transform: 'rotateY(90deg) translateZ(72px) translateY(-14px)' }}
          >
            <span className="w-px h-full bg-sky-400/70" />
            <span className="w-px h-full bg-sky-400/70" />
            <span className="w-px h-full bg-sky-400/70" />
            <span className="w-px h-full bg-sky-400/70" />
          </div>

          {/* 4. Structural Columns (Concrete Pillars) */}
          <div
            className="absolute w-2 h-8 bg-neutral-900 border border-neutral-700 shadow-xs"
            style={{ transform: 'translate3d(-60px, -16px, 46px)' }}
          />
          <div
            className="absolute w-2 h-8 bg-neutral-900 border border-neutral-700 shadow-xs"
            style={{ transform: 'translate3d(60px, -16px, 46px)' }}
          />
          <div
            className="absolute w-1.5 h-8 bg-[#DC2626] shadow-xs"
            style={{ transform: 'translate3d(0px, -16px, 50px)' }}
          />
          <div
            className="absolute w-2 h-8 bg-neutral-900 border border-neutral-700 shadow-xs"
            style={{ transform: 'translate3d(-60px, -16px, -46px)' }}
          />
          <div
            className="absolute w-2 h-8 bg-neutral-900 border border-neutral-700 shadow-xs"
            style={{ transform: 'translate3d(60px, -16px, -46px)' }}
          />

          {/* 5. Central Elevator / Staircase Core Tower */}
          <div
            className="absolute w-8 h-16 bg-neutral-950 border border-neutral-700 shadow-lg flex flex-col justify-between p-1"
            style={{ transform: 'translate3d(-44px, -28px, -26px)' }}
          >
            <div className="w-full h-1.5 bg-[#DC2626]" />
            <div className="space-y-1">
              <div className="w-full h-0.5 bg-neutral-600" />
              <div className="w-full h-0.5 bg-neutral-600" />
              <div className="w-full h-0.5 bg-neutral-600" />
            </div>
            <span className="text-[6px] font-mono text-neutral-400 text-center">CORE</span>
          </div>

          {/* 6. Level 02 Upper Floor Slab & Balcony (Cantilevered Forward) */}
          <div
            className="absolute w-32 h-24 sm:w-40 sm:h-30 rounded-[2px] border-2 border-neutral-800 bg-[#FAF9F7]/95 shadow-sm flex flex-col justify-between p-1 select-none"
            style={{ transform: 'rotateX(90deg) translateZ(30px)', transformStyle: 'preserve-3d' }}
          >
            {/* Front Balcony with Blue Glass Railing */}
            <div className="h-4 w-full border-b border-sky-400/80 bg-sky-400/25 flex items-center justify-between px-1.5">
              <span className="text-[7px] font-mono text-sky-800 font-bold">BALCONY DECK</span>
              <span className="text-[7px] font-mono text-[#DC2626]">★</span>
            </div>
            {/* Upper Suite Floor Plan Layout */}
            <div className="flex items-center justify-between text-[7px] font-mono text-neutral-600 px-1">
              <span>SUITE 02 // LAB</span>
              <span className="text-neutral-500 font-semibold">+3.20m</span>
            </div>
          </div>

          {/* 7. Level 03 Modern Cantilevered Roof Slab & Pergola Louvers */}
          <div
            className="absolute w-28 h-20 sm:w-34 sm:h-24 rounded-[2px] border border-neutral-800 bg-neutral-900/95 shadow-md flex flex-col justify-between p-1.5 select-none"
            style={{ transform: 'rotateX(90deg) translateZ(52px)', transformStyle: 'preserve-3d' }}
          >
            {/* Louvered Solar Pergola Slats */}
            <div className="space-y-1 w-full">
              <div className="w-full h-0.5 bg-[#DC2626]" />
              <div className="w-full h-0.5 bg-neutral-500" />
              <div className="w-full h-0.5 bg-neutral-500" />
              <div className="w-full h-0.5 bg-[#DC2626]" />
            </div>
            <div className="flex items-center justify-between text-[7px] font-mono text-neutral-300">
              <span className="text-[#DC2626] font-bold">ROOF DECK</span>
              <span>+6.40m</span>
            </div>
          </div>
        </div>

        {/* OriginKit Technical Annotations Floating in HUD */}
        <div className="absolute top-2 left-2 z-10 flex flex-col text-[8px] font-mono text-neutral-400 pointer-events-none">
          <span className="text-[#DC2626] font-bold">BIM 3D // REVIT</span>
          <span>SCALE 1:100</span>
        </div>

        <div className="absolute top-2 right-2 z-10 text-[8px] font-mono text-neutral-400 pointer-events-none">
          REV: 360° // ISO
        </div>

        {/* Elevation Level Leader on the Right */}
        <div className="absolute right-2 top-12 bottom-12 z-10 flex flex-col justify-between text-[7px] font-mono text-neutral-400 border-l border-dashed border-neutral-300 pl-1.5 pointer-events-none">
          <span className="text-[#DC2626] font-semibold">+6.4m ROOF</span>
          <span>+3.2m LVL 02</span>
          <span>±0.0m GROUND</span>
        </div>
      </div>
    </div>
  );
};

