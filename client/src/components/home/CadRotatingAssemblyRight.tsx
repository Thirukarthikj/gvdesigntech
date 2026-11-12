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
      <div className="card-interactive relative bg-white/95 backdrop-blur-md rounded-xl border border-[#E5E5E2] p-3.5 shadow-subtle w-52 2xl:w-56 text-left transition-all">
        {/* OriginKit Technical Corner Crosshairs */}
        <span className="crosshair-corner top-1.5 left-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner top-1.5 right-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner bottom-1.5 left-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner bottom-1.5 right-2 font-mono text-[9px] select-none">+</span>

        {/* Technical Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0F0EE] text-[9px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-neutral-800 tracking-wider">3D CAD ASSEMBLY</span>
          </div>
          <span className="text-[#DC2626] font-semibold">ROTATING</span>
        </div>

        {/* 3D Rotating Mechanical Rotor & Dimension Callout Stage */}
        <div className="relative w-full h-40 flex items-center justify-center overflow-hidden rounded-lg bg-[#FAF9F7] border border-[#EAEAE7]">
          {/* OriginKit Technical Engineering Coordinate Grid */}
          <div className="absolute inset-0 originkit-grid opacity-60" />

          {/* Technical Dimension Leader Line Callout (OriginKit CAD styling) */}
          <div className="absolute top-2 left-2 z-10 flex flex-col text-[8px] font-mono leading-tight">
            <span className="text-[#DC2626] font-bold">Ø 64.0 mm</span>
            <span className="text-neutral-400">TOL ±0.005</span>
          </div>

          <div className="absolute top-2 right-2 z-10 text-[8px] font-mono text-neutral-400">
            RPM: 18.0
          </div>

          {/* Isometric 3D Rotating Gear / Mechanical Impeller Assembly */}
          <div
            className="relative w-28 h-28 flex items-center justify-center"
            style={{ perspective: '800px' }}
          >
            {/* 3D Tilted Rotating CAD Assembly */}
            <div className="w-24 h-24 animate-cad-iso flex items-center justify-center relative">
              {/* Outer Gear Teeth Silhouette in Engineering Linework */}
              <svg
                className="w-full h-full text-neutral-900 pointer-events-none drop-shadow-xs"
                viewBox="0 0 100 100"
              >
                {/* Pitch Circle & Reference Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  fill="rgba(15, 23, 42, 0.04)"
                  stroke="#DC2626"
                  strokeWidth="0.8"
                  strokeDasharray="3 2"
                />

                {/* 8 Mechanical Gear Teeth / Impeller Fins */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <rect
                    key={deg}
                    x="47"
                    y="4"
                    width="6"
                    height="8"
                    rx="1"
                    fill="#DC2626"
                    transform={`rotate(${deg} 50 50)`}
                  />
                ))}

                {/* Inner Web Cutouts & Ribs */}
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <line
                    key={deg}
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="20"
                    stroke="#94A3B8"
                    strokeWidth="1"
                    transform={`rotate(${deg} 50 50)`}
                  />
                ))}

                {/* Center Hub & Keyway Bore Hole */}
                <circle
                  cx="50"
                  cy="50"
                  r="14"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="8"
                  fill="#0F172A"
                  stroke="#DC2626"
                  strokeWidth="1"
                />
                {/* Keyway slot */}
                <rect x="48.5" y="40" width="3" height="5" fill="#0F172A" />
              </svg>

              {/* Wireframe Coordinate Axis Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="w-full h-px bg-neutral-300/60" />
                <span className="h-full w-px bg-neutral-300/60 absolute" />
              </div>
            </div>

            {/* Depth Shadow Ring */}
            <div
              className="absolute w-20 h-20 rounded-full bg-neutral-900/10 blur-[6px] pointer-events-none -bottom-2"
              style={{ transform: 'rotateX(60deg)' }}
            />
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[8px] font-mono text-neutral-400">
            <span>AXIS: Z-ROT</span>
            <span className="text-neutral-700 font-semibold">SOLIDWORKS CAD</span>
          </div>
        </div>

        {/* Technical Footer Telemetry */}
        <div className="pt-2 mt-2 border-t border-[#F0F0EE] flex items-center justify-between text-[9px] font-mono">
          <span className="text-neutral-500">CATIA • Mastercam</span>
          <span className="text-neutral-900 font-semibold">3D PARAMETRIC</span>
        </div>
      </div>
    </motion.div>
  );
};
