import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: 'blue' | 'amber' | 'emerald' | 'purple' | 'slate';
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeColor = 'blue',
  title,
  titleHighlight,
  description,
  align = 'center',
  className = '',
}) => {
  const badgeColors = {
    blue: 'bg-brand-50 text-brand-700 border-brand-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    purple: 'bg-purple-50 text-purple-800 border-purple-200',
    slate: 'bg-slate-100 text-slate-800 border-slate-200',
  };

  const isCenter = align === 'center';

  return (
    <div
      className={`max-w-3xl ${
        isCenter ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border mb-3.5 ${badgeColors[badgeColor]}`}
        >
          {badge}
        </div>
      )}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-[1.2]">
        {title}{' '}
        {titleHighlight && (
          <span className="text-brand-600 relative inline-block">
            {titleHighlight}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

