import React from 'react';
import { motion } from 'framer-motion';

export const CadRotatingGizmoTopLeft: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="hidden xl:block absolute top-6 xl:top-8 left-4 xl:left-6 2xl:left-10 z-20 pointer-events-auto select-none group"
    >
      <div className="card-interactive relative bg-white/95 backdrop-blur-md rounded-xl border border-[#E5E5E2] p-4 shadow-subtle w-60 xl:w-64 2xl:w-72 transition-all hover:border-[#DC2626]/40">
        {/* OriginKit Technical Corner Crosshairs */}
        <span className="crosshair-corner top-1.5 left-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner top-1.5 right-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner bottom-1.5 left-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner bottom-1.5 right-2 font-mono text-[9px] select-none">+</span>

        {/* Technical Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0F0EE] text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
            <span className="font-bold text-neutral-800 tracking-wider">3D CAD GIMBAL</span>
          </div>
          <span className="text-neutral-400 font-medium">ISO // 360°</span>
        </div>

        {/* 3D Rotating CAD Coordinate Assembly Stage */}
        <div
          className="relative w-full h-52 xl:h-56 flex items-center justify-center overflow-hidden rounded-lg bg-[#FAF9F7] border border-[#EAEAE7]"
          style={{ perspective: '750px' }}
        >
          {/* Subtle Blueprint Grid Pattern */}
          <div className="absolute inset-0 originkit-grid opacity-60" />

          {/* Outer Degree Calibrated Dial (Rotates Clockwise) */}
          <svg
            className="absolute w-44 h-44 xl:w-48 xl:h-48 animate-spin-slow pointer-events-none text-neutral-300"
            viewBox="0 0 120 120"
          >
            {/* Outer Graduation Ring */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="2.5 3.5"
            />
            {/* Inner Precision Ring */}
            <circle
              cx="60"
              cy="60"
              r="48"
              fill="none"
              stroke="#E5E5E2"
              strokeWidth="0.6"
            />
            {/* Cardinal Axis Markers */}
            <line x1="60" y1="2" x2="60" y2="10" stroke="#DC2626" strokeWidth="2" />
            <line x1="118" y1="60" x2="110" y2="60" stroke="#64748B" strokeWidth="1.2" />
            <line x1="60" y1="118" x2="60" y2="110" stroke="#64748B" strokeWidth="1.2" />
            <line x1="2" y1="60" x2="10" y2="60" stroke="#64748B" strokeWidth="1.2" />
            {/* 30-Degree Calibration Ticks */}
            {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="60"
                y1="8"
                x2="60"
                y2="13"
                stroke="#94A3B8"
                strokeWidth="0.75"
                transform={`rotate(${deg} 60 60)`}
              />
            ))}
          </svg>

          {/* Inner Reverse Ring (Rotates Counter-Clockwise) */}
          <svg
            className="absolute w-36 h-36 xl:w-40 xl:h-40 animate-spin-reverse-slow pointer-events-none text-neutral-400"
            viewBox="0 0 100 100"
          >
            <ellipse
              cx="50"
              cy="50"
              rx="42"
              ry="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              transform="rotate(45 50 50)"
            />
            <ellipse
              cx="50"
              cy="50"
              rx="42"
              ry="18"
              fill="none"
              stroke="#DC2626"
              strokeWidth="0.8"
              strokeDasharray="4 3"
              transform="rotate(-45 50 50)"
            />
          </svg>

          {/* Prominent Scaled-Up 3D Wireframe Perspective Cube */}
          <div
            className="relative w-24 h-24 xl:w-28 xl:h-28 animate-cad-cube flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front Face */}
            <div
              className="absolute w-20 h-20 xl:w-22 xl:h-22 border-2 border-neutral-900 bg-neutral-900/10 shadow-sm flex items-center justify-center"
              style={{ transform: 'translateZ(40px)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
            </div>

            {/* Right Face (Red Accent) */}
            <div
              className="absolute w-20 h-20 xl:w-22 xl:h-22 border-2 border-[#DC2626] bg-[#DC2626]/10 shadow-sm flex items-center justify-center"
              style={{ transform: 'rotateY(90deg) translateZ(40px)' }}
            >
              <span className="text-[7px] font-mono font-bold text-[#DC2626]">X-AXIS</span>
            </div>

            {/* Top Face */}
            <div
              className="absolute w-20 h-20 xl:w-22 xl:h-22 border-2 border-neutral-700 bg-neutral-700/10 shadow-sm flex items-center justify-center"
              style={{ transform: 'rotateX(90deg) translateZ(40px)' }}
            >
              <span className="text-[7px] font-mono text-neutral-600">TOP // Z</span>
            </div>

            {/* Back Face (Dashed Engineering Wireframe) */}
            <div
              className="absolute w-20 h-20 xl:w-22 xl:h-22 border-2 border-dashed border-neutral-400"
              style={{ transform: 'translateZ(-40px)' }}
            />

            {/* Left Face */}
            <div
              className="absolute w-20 h-20 xl:w-22 xl:h-22 border border-neutral-400 bg-neutral-500/5"
              style={{ transform: 'rotateY(-90deg) translateZ(40px)' }}
            />

            {/* Bottom Face */}
            <div
              className="absolute w-20 h-20 xl:w-22 xl:h-22 border border-neutral-400 bg-neutral-500/5"
              style={{ transform: 'rotateX(-90deg) translateZ(40px)' }}
            />

            {/* 3D Coordinate Axis Vector Spikes (X, Y, Z projecting outward) */}
            {/* X-Axis (Red) */}
            <div
              className="absolute h-0.5 bg-[#DC2626] w-28 -translate-x-4 pointer-events-none"
              style={{ transform: 'translateX(8px)' }}
            />
            {/* Y-Axis (Neutral) */}
            <div
              className="absolute w-0.5 bg-neutral-800 h-28 -translate-y-4 pointer-events-none"
              style={{ transform: 'translateY(-8px)' }}
            />

            {/* Central Coordinate Pivot Core */}
            <div className="absolute w-3.5 h-3.5 rounded-full bg-[#DC2626] shadow-sm animate-ping" />
            <div className="absolute w-3 h-3 rounded-full bg-neutral-950 border border-white/60" />
          </div>

          {/* Coordinate Vector Badges [X, Y, Z] */}
          <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 text-[9px] font-mono text-neutral-500">
            <span className="text-[#DC2626] font-bold">X+</span>
            <span>•</span>
            <span className="text-neutral-700 font-bold">Y+</span>
            <span>•</span>
            <span className="text-neutral-400 font-bold">Z+</span>
          </div>

          <div className="absolute top-2 right-2.5 text-[9px] font-mono text-neutral-400">
            REV: 360° // ISO
          </div>
        </div>

        {/* Technical Footer Telemetry */}
        <div className="pt-2 mt-2 border-t border-[#F0F0EE] flex items-center justify-between text-[10px] font-mono">
          <span className="text-neutral-500">AutoCAD • SolidWorks</span>
          <span className="text-[#DC2626] font-semibold">100% LIVE 3D</span>
        </div>
      </div>
    </motion.div>
  );
};