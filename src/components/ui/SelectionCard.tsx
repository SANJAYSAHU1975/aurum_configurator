'use client';

import { BrandVisuals } from '@/types';

interface SelectionCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  price?: string;
  priceLabel?: string;
  selected: boolean;
  onClick: () => void;
  visuals?: BrandVisuals;
  badge?: string;
  image?: string;
}

export default function SelectionCard({
  title,
  subtitle,
  description,
  features,
  price,
  priceLabel,
  selected,
  onClick,
  visuals,
  badge,
  image,
}: SelectionCardProps) {
  const v = visuals;

  const cardStyle = v
    ? {
        backgroundColor: selected ? v.cardBgActive : v.cardBg,
        borderColor: selected ? v.cardBorderActive : v.cardBorder,
        ...(selected ? { boxShadow: `0 0 0 2px ${v.cardBorderActive}30` } : {}),
      }
    : {};

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl border-2 overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer"
      style={cardStyle}
    >
      {/* Image */}
      {image && (
        <div className="w-full h-40 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            {badge && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block"
                style={v ? { backgroundColor: v.badgeBg, color: v.badgeText } : {}}
              >
                {badge}
              </span>
            )}
            <h3
              className="text-lg font-bold"
              style={v ? { color: v.textPrimary } : { color: '#111827' }}
            >
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm mt-0.5" style={v ? { color: v.textSecondary } : { color: '#6b7280' }}>
                {subtitle}
              </p>
            )}
          </div>
          {price && (
            <div className="text-right shrink-0 ml-3">
              <p className="text-lg font-bold" style={v ? { color: v.textPrimary } : { color: '#111827' }}>
                {price}
              </p>
              {priceLabel && (
                <p className="text-xs" style={v ? { color: v.textMuted } : { color: '#9ca3af' }}>
                  {priceLabel}
                </p>
              )}
            </div>
          )}
        </div>
        {description && (
          <p className="text-sm mt-2" style={v ? { color: v.textSecondary } : { color: '#4b5563' }}>
            {description}
          </p>
        )}
        {features && features.length > 0 && (
          <ul className="mt-3 space-y-1">
            {features.map((f, i) => (
              <li
                key={i}
                className="text-sm flex items-start gap-2"
                style={v ? { color: v.textSecondary } : { color: '#4b5563' }}
              >
                <span className="mt-0.5 shrink-0" style={v ? { color: v.checkColor } : { color: '#22c55e' }}>
                  &#10003;
                </span>
                {f}
              </li>
            ))}
          </ul>
        )}
        {selected && (
          <div className="mt-3 flex items-center gap-1 text-sm font-medium" style={v ? { color: v.accent } : { color: '#2563eb' }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Selected
          </div>
        )}
      </div>
    </button>
  );
}
