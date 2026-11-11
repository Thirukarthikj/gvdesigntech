import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 sm:py-36 bg-white flex items-center justify-center text-neutral-900 border-b border-[#EAEAE7]">
      <div className="max-w-lg mx-auto px-6 text-center space-y-6">
        <div className="w-14 h-14 rounded-lg bg-[#FAF9F7] border border-[#E5E5E2] text-[#E8592B] flex items-center justify-center mx-auto shadow-subtle">
          <Compass className="w-7 h-7" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F7] border border-[#E5E5E2] shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8592B]" />
          <span className="font-mono text-[11px] font-semibold text-[#E8592B] tracking-widest uppercase">
            404 ERROR • PAGE NOT FOUND
          </span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight leading-tight">
          The Requested Page Could Not Be Located
        </h1>

        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
          The technical curriculum link or resource you followed may have been updated or moved. Explore our directory of software training or return to the institute homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
          <Link
            to="/"
            className="btn-shimmer btn-tactile w-full sm:w-auto px-6 py-3 bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <Link
            to="/courses"
            className="btn-tactile w-full sm:w-auto px-6 py-3 bg-white hover:bg-neutral-50 text-neutral-900 text-xs font-semibold uppercase tracking-wider rounded border border-neutral-300 hover:border-neutral-400 flex items-center justify-center gap-2 shadow-sm"
          >
            Browse Courses <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
