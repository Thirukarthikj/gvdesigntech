import React from 'react';
import { motion } from 'framer-motion';

export const CadRotatingGizmoTopLeft: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="hidden xl:block absolute top-6 xl:top-8 left-4 xl:left-6 2xl:left-12 z-20 pointer-events-auto select-none group"
    >
      <div className="card-interactive relative bg-white/95 backdrop-blur-md rounded-xl border border-[#E5E5E2] p-3.5 shadow-subtle w-44 xl:w-48 2xl:w-52 transition-all">
        {/* OriginKit Technical Corner Crosshairs */}
        <span className="crosshair-corner top-1.5 left-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner top-1.5 right-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner bottom-1.5 left-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner bottom-1.5 right-2 font-mono text-[9px] select-none">+</span>

        {/* Technical Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0F0EE] text-[9px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
            <span className="font-bold text-neutral-800 tracking-wider">3D CAD GIMBAL</span>
          </div>
          <span className="text-neutral-400 font-medium">ISO // 360°</span>
        </div>

        {/* 3D Rotating CAD Coordinate Assembly */}
        <div
          className="relative w-full h-36 flex items-center justify-center overflow-hidden rounded-lg bg-[#FAF9F7] border border-[#EAEAE7]"
          style={{ perspective: '600px' }}
        >
          {/* Subtle Blueprint Grid Pattern */}
          <div className="absolute inset-0 originkit-grid opacity-50" />

          {/* Outer Degree Calibrated Dial (Rotates Clockwise) */}
          <svg
            className="absolute w-32 h-32 animate-spin-slow pointer-events-none text-neutral-300"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="2 3"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#E5E5E2"
              strokeWidth="0.5"
            />
            {/* Compass Axis Markers */}
            <line x1="50" y1="2" x2="50" y2="8" stroke="#DC2626" strokeWidth="1.5" />
            <line x1="98" y1="50" x2="92" y2="50" stroke="#64748B" strokeWidth="1" />
            <line x1="50" y1="98" x2="50" y2="92" stroke="#64748B" strokeWidth="1" />
            <line x1="2" y1="50" x2="8" y2="50" stroke="#64748B" strokeWidth="1" />
          </svg>

          {/* Inner Reverse Ring (Rotates Counter-Clockwise) */}
          <svg
            className="absolute w-24 h-24 animate-spin-reverse-slow pointer-events-none text-neutral-400"
            viewBox="0 0 100 100"
          >
            <ellipse
              cx="50"
              cy="50"
              rx="36"
              ry="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              transform="rotate(45 50 50)"
            />
            <ellipse
              cx="50"
              cy="50"
              rx="36"
              ry="16"
              fill="none"
              stroke="#DC2626"
              strokeWidth="0.75"
              strokeDasharray="3 3"
              transform="rotate(-45 50 50)"
            />
          </svg>

          {/* Center 3D Rotating Isometric Wireframe Cube / Assembly */}
          <div
            className="relative w-14 h-14 animate-cad-cube flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Isometric 3D Wireframe Cube Faces */}
            <div
              className="absolute w-12 h-12 border border-neutral-900 bg-neutral-900/5 shadow-xs"
              style={{ transform: 'translateZ(24px)' }}
            />
            <div
              className="absolute w-12 h-12 border border-[#DC2626] bg-[#DC2626]/5 shadow-xs"
              style={{ transform: 'rotateY(90deg) translateZ(24px)' }}
            />
            <div
              className="absolute w-12 h-12 border border-neutral-700 bg-neutral-700/5 shadow-xs"
              style={{ transform: 'rotateX(90deg) translateZ(24px)' }}
            />
            <div
              className="absolute w-12 h-12 border border-dashed border-neutral-400"
              style={{ transform: 'translateZ(-24px)' }}
            />

            {/* Central Coordinate Pivot Core */}
            <div className="absolute w-2 h-2 rounded-full bg-[#DC2626] shadow-sm animate-ping" />
            <div className="absolute w-2 h-2 rounded-full bg-neutral-950" />
          </div>

          {/* Coordinate Vector Badges [X, Y, Z] */}
          <div className="absolute bottom-1.5 left-2 flex items-center gap-1.5 text-[8px] font-mono text-neutral-500">
            <span className="text-[#DC2626] font-bold">X+</span>
            <span>•</span>
            <span className="text-neutral-700 font-bold">Y+</span>
            <span>•</span>
            <span className="text-neutral-400 font-bold">Z+</span>
          </div>

          <div className="absolute top-1.5 right-2 text-[8px] font-mono text-neutral-400">
            REV: 360°
          </div>
        </div>

        {/* Technical Footer Telemetry */}
        <div className="pt-2 mt-2 border-t border-[#F0F0EE] flex items-center justify-between text-[9px] font-mono">
          <span className="text-neutral-500">AutoCAD • SolidWorks</span>
          <span className="text-[#DC2626] font-semibold">100% LIVE 3D</span>
        </div>
      </div>
    </motion.div>
  );
};
