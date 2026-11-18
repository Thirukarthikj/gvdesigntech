import React from 'react';
import { motion } from 'framer-motion';

export const CadRotatingAssemblyRight: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="hidden xl:block absolute top-1/2 -translate-y-1/2 left-[calc(100%+1rem)] 2xl:left-[calc(100%+2rem)] z-20 pointer-events-auto select-none group"
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
            <span className="text-[#DC2626] font-bold">INTERIOR // 3D CUTAWAY</span>
            <span className="text-neutral-500 text-[8px]">AREA: 2,450 sq.ft • H: 3.2m</span>
          </div>

          <div className="absolute top-2 right-2.5 z-10 text-[9px] font-mono text-neutral-400 pointer-events-none">
            BIM: 360° // ISO
          </div>

          {/* Interior Level Height Markers */}
          <div className="absolute right-2 top-12 bottom-10 z-10 flex flex-col justify-between text-[8px] font-mono text-neutral-400 border-l border-dashed border-neutral-300 pl-1.5 pointer-events-none">
            <span className="text-[#DC2626] font-semibold">+3.2m WALL</span>
            <span>+1.2m SILL</span>
            <span>±0.0m PLINTH</span>
          </div>

          {/* 3D Perspective Turntable Stage with Calibrated Ring & Model */}
          <div
            className="relative w-full h-full flex items-center justify-center pt-2"
            style={{ perspective: '850px' }}
          >
            {/* 3D Calibrated Turntable Ring (Rotating underneath the building plinth) */}
            <svg
              className="absolute w-52 h-52 animate-spin-slow pointer-events-none text-neutral-300 opacity-70"
              viewBox="0 0 100 100"
              style={{ transform: 'rotateX(65deg) translateY(24px)' }}
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeDasharray="2.5 3"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#DC2626"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
              {/* Compass Axis Lines */}
              <line x1="50" y1="2" x2="50" y2="8" stroke="#DC2626" strokeWidth="1.5" />
              <line x1="98" y1="50" x2="92" y2="50" stroke="#64748B" strokeWidth="1" />
              <line x1="50" y1="98" x2="50" y2="92" stroke="#64748B" strokeWidth="1" />
              <line x1="2" y1="50" x2="8" y2="50" stroke="#64748B" strokeWidth="1" />
            </svg>

            {/* Depth Contact Shadow */}
            <div
              className="absolute w-44 h-24 rounded-full bg-neutral-900/15 blur-[12px] pointer-events-none"
              style={{ transform: 'rotateX(65deg) translateY(32px)' }}
            />

            {/* 3D Rotating & Orbiting Interior Model Container */}
            <div
              className="relative flex items-center justify-center animate-cad-interior transition-transform duration-500 ease-out group-hover:scale-105"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* The Photorealistic 3D Building Interior Cutaway Model */}
              <img
                src="/images/3d-building-interior-model.png"
                alt="3D Architectural Building Inside View Floor Plan"
                className="w-56 xl:w-64 h-auto object-contain mix-blend-multiply drop-shadow-md select-none pointer-events-none"
                loading="eager"
              />

              {/* Interactive CAD Room Hotspot Markers */}
              {/* Living Room Hotspot */}
              <div
                className="absolute left-6 bottom-8 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-sm border border-[#E5E5E2] px-1.5 py-0.5 rounded shadow-xs text-[7px] font-mono pointer-events-none"
                style={{ transform: 'translateZ(15px)' }}
              >
                <span className="w-1 h-1 rounded-full bg-[#DC2626] animate-pulse" />
                <span className="text-neutral-800 font-bold">LIVING</span>
              </div>

              {/* Staircase Hotspot */}
              <div
                className="absolute left-1/2 -translate-x-4 top-10 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-sm border border-[#E5E5E2] px-1.5 py-0.5 rounded shadow-xs text-[7px] font-mono pointer-events-none"
                style={{ transform: 'translateZ(20px)' }}
              >
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-neutral-800 font-bold">STAIRS</span>
              </div>

              {/* Master Bedroom Hotspot */}
              <div
                className="absolute right-6 top-14 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-sm border border-[#E5E5E2] px-1.5 py-0.5 rounded shadow-xs text-[7px] font-mono pointer-events-none"
                style={{ transform: 'translateZ(15px)' }}
              >
                <span className="w-1 h-1 rounded-full bg-[#DC2626] animate-pulse" />
                <span className="text-neutral-800 font-bold">BEDROOM</span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-neutral-400 pointer-events-none">
            <span>CUTAWAY: ISOMETRIC BIM</span>
            <span className="text-neutral-700 font-semibold">REVIT • 3DS MAX</span>
          </div>
        </div>

        {/* Technical Footer Telemetry */}
        <div className="pt-2 mt-2 border-t border-[#F0F0EE] flex items-center justify-between text-[10px] font-mono">
          <span className="text-neutral-500">AutoCAD • Revit • SketchUp</span>
          <span className="text-neutral-900 font-semibold">3D INTERIOR BIM</span>
        </div>
      </div>
    </motion.div>
  );
};