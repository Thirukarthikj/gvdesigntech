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
            <span className="font-bold text-neutral-800 tracking-wider">3D BUILDING INSIDE VIEW</span>
          </div>
          <span className="text-[#DC2626] font-semibold">ROTATING</span>
        </div>

        {/* 3D Architectural Interior Cutaway Stage */}
        <div className="relative w-full h-56 xl:h-60 flex items-center justify-center overflow-hidden rounded-lg bg-[#FAF9F7] border border-[#EAEAE7]">
          {/* OriginKit Technical Coordinate Grid */}
          <div className="absolute inset-0 originkit-grid opacity-60" />

          {/* Technical Interior Metadata (OriginKit BIM Styling) */}
          <div className="absolute top-2 left-2.5 z-10 flex flex-col text-[9px] font-mono leading-tight pointer-events-none">
            <span className="text-[#DC2626] font-bold">INTERIOR // LVL 01</span>
            <span className="text-neutral-500 text-[8px]">AREA: 450 sq.ft • H: 3.6m</span>
          </div>

          <div className="absolute top-2 right-2.5 z-10 text-[9px] font-mono text-neutral-400 pointer-events-none">
            REV: 360° // BIM
          </div>

          {/* Interior Level Height Markers */}
          <div className="absolute right-2 top-12 bottom-10 z-10 flex flex-col justify-between text-[8px] font-mono text-neutral-400 border-l border-dashed border-neutral-300 pl-1.5 pointer-events-none">
            <span className="text-[#DC2626] font-semibold">+3.6m BEAM</span>
            <span>+2.2m MEZZ</span>
            <span>±0.0m FLOOR</span>
          </div>

          {/* 3D Rotating Perspective Architectural Interior Model */}
          <div
            className="relative w-40 h-40 xl:w-44 xl:h-44 flex items-center justify-center"
            style={{ perspective: '850px' }}
          >
            {/* 3D Building Turntable Rotating 360° around Y */}
            <div
              className="relative w-36 h-36 xl:w-40 xl:h-40 flex items-center justify-center animate-cad-building"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Soft Ambient Floor Contact Shadow */}
              <div
                className="absolute w-36 h-28 rounded-full bg-neutral-900/15 blur-[10px] pointer-events-none"
                style={{ transform: 'rotateX(90deg) translateZ(-30px)' }}
              />

              {/* 1. Main Interior Floor Slab (Parquet Finish with Area Rug) */}
              <div
                className="absolute w-32 h-26 rounded border-2 border-neutral-800 bg-[#F5F4EE] shadow-md overflow-hidden flex flex-col justify-between p-1.5 select-none"
                style={{ transform: 'rotateX(90deg) translateZ(-16px)', transformStyle: 'preserve-3d' }}
              >
                {/* Floor Texture & Wood Plank Lines */}
                <div className="absolute inset-0 opacity-40">
                  <div className="w-full h-full border-t border-b border-neutral-300 grid grid-cols-4 gap-1">
                    <span className="border-r border-neutral-200" />
                    <span className="border-r border-neutral-200" />
                    <span className="border-r border-neutral-200" />
                  </div>
                </div>

                {/* Lounge Area Carpet / Accent Mat (Left Side) */}
                <div className="relative z-10 w-14 h-12 border border-dashed border-[#DC2626]/50 bg-[#DC2626]/10 rounded-[1px] p-0.5">
                  <span className="text-[5px] font-mono text-[#DC2626] font-semibold">LOUNGE</span>
                </div>

                {/* Studio / Drafting Zone (Right Side) */}
                <div className="relative z-10 flex items-center justify-between text-[6px] font-mono text-neutral-500 pt-1">
                  <span>CAD STUDIO</span>
                  <span className="text-[#DC2626] font-bold">1:50</span>
                </div>
              </div>

              {/* 2. Solid Back Exterior Wall (South Elevation Interior with Picture Windows) */}
              <div
                className="absolute w-32 h-14 border border-neutral-800 bg-neutral-900 text-neutral-300 flex items-center justify-between px-2 shadow-md"
                style={{ transform: 'translateZ(-52px) translateY(-8px)' }}
              >
                {/* Left Picture Window with Daylighting Horizon */}
                <div className="w-10 h-8 border border-neutral-600 bg-sky-200/40 rounded-[1px] relative overflow-hidden backdrop-blur-xs flex items-center justify-center">
                  <span className="w-full h-px bg-neutral-600 absolute" />
                  <span className="h-full w-px bg-neutral-600 absolute" />
                </div>

                {/* Center Blueprint Wall Frame */}
                <div className="w-6 h-6 border border-neutral-600 bg-neutral-950 flex flex-col items-center justify-center p-0.5 text-center">
                  <span className="text-[4px] font-mono text-[#DC2626] font-bold leading-none">PLAN</span>
                  <div className="w-3 h-0.5 bg-neutral-600 mt-0.5" />
                </div>

                {/* Right Picture Window */}
                <div className="w-10 h-8 border border-neutral-600 bg-sky-200/40 rounded-[1px] relative overflow-hidden backdrop-blur-xs flex items-center justify-center">
                  <span className="w-full h-px bg-neutral-600 absolute" />
                  <span className="h-full w-px bg-neutral-600 absolute" />
                </div>
              </div>

              {/* 3. Solid Left Wall (West Wall with Entrance Door & Sconce) */}
              <div
                className="absolute w-26 h-14 border border-neutral-800 bg-neutral-850 p-1.5 flex flex-col justify-between shadow-md"
                style={{ transform: 'rotateY(90deg) translateZ(-64px) translateY(-8px)' }}
              >
                <div className="flex items-center justify-between">
                  {/* Modern Entry Door */}
                  <div className="w-8 h-10 border border-neutral-600 bg-neutral-800 rounded-t-[1px] flex flex-col justify-between p-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#DC2626] ml-auto mt-4" />
                    <span className="text-[4px] font-mono text-neutral-400 text-center">ENTRY</span>
                  </div>
                  {/* Wall Sconce Fixture */}
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-xs mr-2" />
                </div>
              </div>

              {/* 4. Section-Cut Framing Sills (Front & Right Open Cutaways) */}
              {/* Front Low Cutaway Base Edge (Red Section Cut Hatch) */}
              <div
                className="absolute w-32 h-2 bg-[#DC2626] border-t border-neutral-900"
                style={{ transform: 'translateZ(52px) translateY(8px)' }}
              />
              {/* Right Low Cutaway Base Edge */}
              <div
                className="absolute w-26 h-2 bg-neutral-900 border-t border-neutral-800"
                style={{ transform: 'rotateY(90deg) translateZ(64px) translateY(8px)' }}
              />

              {/* 5. Interior Furniture: CAD Workstation with Dual Monitors (Right Zone) */}
              {/* Workstation Table Surface */}
              <div
                className="absolute w-16 h-8 bg-white border border-neutral-800 shadow-sm flex items-center justify-around px-1"
                style={{ transform: 'rotateX(90deg) translate3d(14px, 4px, 2px)' }}
              >
                <div className="w-4 h-2 border border-neutral-300 bg-neutral-100 rounded-[1px]" />
                <div className="w-4 h-2 border border-neutral-300 bg-neutral-100 rounded-[1px]" />
              </div>

              {/* Dual Glowing CAD Monitors standing on desk */}
              <div
                className="absolute flex items-center gap-1"
                style={{ transform: 'translate3d(18px, -4px, -8px)' }}
              >
                {/* CAD Monitor 1 (Blueprint Elevation) */}
                <div className="w-6 h-4 bg-neutral-950 border border-neutral-700 rounded-[1px] flex flex-col justify-center items-center shadow-xs">
                  <div className="w-4 h-0.5 bg-sky-400 mb-0.5" />
                  <div className="w-3 h-0.5 bg-[#DC2626]" />
                </div>
                {/* CAD Monitor 2 (3D Wireframe) */}
                <div className="w-6 h-4 bg-neutral-950 border border-neutral-700 rounded-[1px] flex flex-col justify-center items-center shadow-xs">
                  <div className="w-4 h-2 border border-dashed border-emerald-400" />
                </div>
              </div>

              {/* CAD Office Chairs */}
              <div
                className="absolute w-4 h-4 rounded-full bg-neutral-900 border border-neutral-700 shadow-xs flex items-center justify-center"
                style={{ transform: 'translate3d(18px, 6px, 12px)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
              </div>

              {/* 6. Interior Furniture: Modern Lounge Area with L-Sofa (Left Zone) */}
              <div
                className="absolute flex flex-col items-start"
                style={{ transform: 'translate3d(-20px, 4px, 6px)' }}
              >
                {/* L-Sofa Cushion Base */}
                <div className="w-14 h-4 bg-neutral-900 border border-neutral-700 rounded-[2px] shadow-sm flex items-center justify-between px-1">
                  <span className="w-2 h-2 rounded-[1px] bg-[#DC2626] shadow-xs" />
                  <span className="w-3 h-1.5 bg-neutral-700 rounded-xs" />
                  <span className="w-3 h-1.5 bg-neutral-700 rounded-xs" />
                </div>
                {/* Coffee Table with Blueprint Roll */}
                <div className="w-8 h-3 bg-white border border-neutral-800 shadow-xs mt-1.5 flex items-center justify-center">
                  <span className="w-4 h-1 bg-[#DC2626]/20 border border-[#DC2626] rounded-full" />
                </div>
              </div>

              {/* 7. Interior Architectural Floating Staircase (Back-Right Corner) */}
              <div
                className="absolute flex flex-col"
                style={{ transform: 'translate3d(36px, 0px, -36px)' }}
              >
                {/* Tread Steps */}
                <div className="w-5 h-1 bg-[#DC2626] shadow-xs translate-y-3" />
                <div className="w-5 h-1 bg-neutral-800 shadow-xs translate-y-1.5 translate-x-1" />
                <div className="w-5 h-1 bg-neutral-800 shadow-xs translate-x-2" />
                <div className="w-5 h-1 bg-[#DC2626] shadow-xs -translate-y-1.5 translate-x-3" />
              </div>

              {/* 8. Upper Mezzanine Platform & Glass Railing (Multi-Level Inside View) */}
              <div
                className="absolute w-28 h-10 border border-neutral-800 bg-[#FAF9F7] shadow-md flex justify-between p-0.5"
                style={{ transform: 'rotateX(90deg) translate3d(0px, 32px, 16px)' }}
              >
                <span className="text-[5px] font-mono text-neutral-600">MEZZANINE LOFT</span>
                <span className="text-[5px] font-mono text-[#DC2626] font-bold">+2.2m</span>
              </div>

              {/* Mezzanine Translucent Blue Glass Balustrade */}
              <div
                className="absolute w-28 h-3 border-b-2 border-sky-400/80 bg-sky-500/20 backdrop-blur-xs flex items-center justify-around"
                style={{ transform: 'translate3d(0px, -14px, -18px)' }}
              >
                <span className="w-px h-full bg-sky-400/80" />
                <span className="w-px h-full bg-sky-400/80" />
                <span className="w-px h-full bg-sky-400/80" />
              </div>

              {/* 9. Structural Columns & Exposed Ceiling Lighting Beams */}
              {/* Slender Structural Column */}
              <div
                className="absolute w-1.5 h-14 bg-neutral-900 border border-neutral-700 shadow-sm"
                style={{ transform: 'translate3d(-6px, -4px, 20px)' }}
              />
              <div
                className="absolute w-1.5 h-14 bg-[#DC2626] shadow-sm"
                style={{ transform: 'translate3d(24px, -4px, 20px)' }}
              />

              {/* Overhead Architectural Ceiling Beam with Track Light Fixtures */}
              <div
                className="absolute w-32 h-1 bg-neutral-900 flex items-center justify-around"
                style={{ transform: 'translate3d(0px, -24px, 0px)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-neutral-400 pointer-events-none">
            <span>CUTAWAY: AXONOMETRIC</span>
            <span className="text-neutral-700 font-semibold">3D REVIT INTERIOR</span>
          </div>
        </div>

        {/* Technical Footer Telemetry */}
        <div className="pt-2 mt-2 border-t border-[#F0F0EE] flex items-center justify-between text-[10px] font-mono">
          <span className="text-neutral-500">Revit • SketchUp • 3ds Max</span>
          <span className="text-neutral-900 font-semibold">3D INTERIOR BIM</span>
        </div>
      </div>
    </motion.div>
  );
};