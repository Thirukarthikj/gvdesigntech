import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'light',
  showTagline = true,
}) => {
  const isDark = variant === 'dark';

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Official GV DESIGN TECH Brand Emblem */}
      <div
        className={`relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 overflow-hidden ${
          isDark
            ? 'bg-neutral-900 border-neutral-800 group-hover:border-brand-red'
            : 'bg-white border-neutral-200 shadow-sm group-hover:border-brand-red'
        }`}
      >
        <img
          src={isDark ? '/images/gv-monogram-white.png' : '/images/gv-monogram-clean.png'}
          alt="GV DESIGN TECH Official Logo"
          className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`text-[15px] font-sans font-bold tracking-tight leading-none transition-colors ${
            isDark ? 'text-white group-hover:text-brand-red' : 'text-neutral-950 group-hover:text-brand-red'
          }`}
        >
          GV DESIGN TECH
        </span>
        {showTagline && (
          <span
            className={`text-[9px] font-mono tracking-widest uppercase mt-1 ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            Learn Today. Lead Tomorrow.
          </span>
        )}
      </div>
    </Link>
  );
};
