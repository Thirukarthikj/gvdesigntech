import React from 'react';
import { motion } from 'framer-motion';
import { ThreeBuildingInteriorModel } from './ThreeBuildingInteriorModel';

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
          <span className="text-[#DC2626] font-semibold">360° MODEL</span>
        </div>

        {/* Real 3D WebGL Architectural Floor Plan Stage */}
        <div className="relative w-full h-60 xl:h-64 flex items-center justify-center overflow-hidden rounded-lg bg-[#FAF9F7] border border-[#EAEAE7]">
          {/* OriginKit Technical Coordinate Grid */}
          <div className="absolute inset-0 originkit-grid opacity-60 pointer-events-none" />

          {/* Technical Interior Metadata (OriginKit BIM Styling) */}
          <div className="absolute top-2 left-2.5 z-10 flex flex-col text-[9px] font-mono leading-tight pointer-events-none">
            <span className="text-[#DC2626] font-bold">REAL 3D CAD MODEL</span>
            <span className="text-neutral-500 text-[8px]">EXACT BIM FLOOR PLAN</span>
          </div>

          <div className="absolute top-2 right-2.5 z-10 text-[9px] font-mono text-neutral-400 pointer-events-none">
            LIVE 3D // BIM
          </div>

          {/* Interior Level Height Markers */}
          <div className="absolute right-2 top-12 bottom-12 z-10 flex flex-col justify-between text-[8px] font-mono text-neutral-400 border-l border-dashed border-neutral-300 pl-1.5 pointer-events-none">
            <span className="text-[#DC2626] font-semibold">+3.2m WALL</span>
            <span>+1.2m SILL</span>
            <span>±0.0m PLINTH</span>
          </div>

          {/* Interactive Drag Hint Badge */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-900/85 backdrop-blur-sm border border-white/20 text-[7px] font-mono text-white shadow-sm opacity-85 group-hover:opacity-100 transition-opacity">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wide">DRAG TO ROTATE 360°</span>
          </div>

          {/* Real 3D Three.js Building Interior Model */}
          <div className="relative w-full h-full z-0">
            <ThreeBuildingInteriorModel />
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-2 left-2.5 right-2.5 z-10 flex items-center justify-between text-[9px] font-mono text-neutral-400 pointer-events-none">
            <span>CUTAWAY: ARCHITECTURAL BIM</span>
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
