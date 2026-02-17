'use client';

import { AddonGroup, BrandVisuals } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface AddonToggleProps {
  group: AddonGroup;
  selectedOptionId: string | undefined;
  onSelect: (groupId: string, optionId: string) => void;
  visuals?: BrandVisuals;
}

export default function AddonToggle({ group, selectedOptionId, onSelect, visuals: v }: AddonToggleProps) {
  return (
    <div
      className="rounded-xl border p-5"
      style={v ? { backgroundColor: v.cardBg, borderColor: v.cardBorder } : { backgroundColor: '#fff', borderColor: '#e5e7eb' }}
    >
      <h3 className="font-semibold mb-3" style={v ? { color: v.textPrimary } : { color: '#111827' }}>
        {group.name}
      </h3>
      <div className="space-y-2">
        {group.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(group.id, option.id)}
              className="w-full text-left rounded-lg border p-3 transition-all duration-150 cursor-pointer"
              style={
                isSelected
                  ? v
                    ? { borderColor: v.cardBorderActive, backgroundColor: v.cardBgActive, boxShadow: `0 0 0 1px ${v.cardBorderActive}30` }
                    : { borderColor: '#3b82f6', backgroundColor: '#eff6ff' }
                  : v
                    ? { borderColor: v.cardBorder, backgroundColor: 'transparent' }
                    : { borderColor: '#e5e7eb' }
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: isSelected ? (v?.accent ?? '#3b82f6') : (v?.textMuted ?? '#d1d5db') }}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: v?.accent ?? '#3b82f6' }} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: v?.textPrimary ?? '#111827' }}>
                      {option.name}
                    </p>
                    <p className="text-xs" style={{ color: v?.textMuted ?? '#9ca3af' }}>
                      {option.description}
                    </p>
                  </div>
                </div>
                <span
                  className="text-sm font-semibold shrink-0"
                  style={{ color: option.price > 0 ? (v?.textPrimary ?? '#111827') : (v?.checkColor ?? '#16a34a') }}
                >
                  {option.price > 0 ? `+ ${formatCurrency(option.price)}` : 'Included'}
                </span>
              </div>
              {isSelected && option.features.length > 0 && (
                <div className="mt-2 ml-7 flex flex-wrap gap-1">
                  {option.features.map((f, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${v?.accent ?? '#6b7280'}15`, color: v?.textSecondary ?? '#4b5563' }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
