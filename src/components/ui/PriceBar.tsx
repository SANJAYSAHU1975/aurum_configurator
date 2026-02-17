'use client';

import { useConfiguratorStore } from '@/store/configurator-store';
import { calculateEstimate } from '@/lib/pricing';
import { formatCurrency } from '@/lib/utils';

export default function PriceBar() {
  const { brand, size, selectedAddons, g1Option } = useConfiguratorStore();
  const estimate = calculateEstimate(brand, size, selectedAddons, g1Option);
  const v = brand?.visuals;

  if (!size) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t shadow-lg z-40"
      style={{ backgroundColor: v?.priceBarBg ?? '#fff', borderColor: v?.cardBorder ?? '#e5e7eb' }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs" style={{ color: v?.textMuted ?? '#9ca3af' }}>Base Price</p>
            <p className="text-sm font-semibold" style={{ color: v?.priceBarText ?? '#111827' }}>
              {formatCurrency(estimate.basePrice)}
            </p>
          </div>
          {estimate.addonsTotal > 0 && (
            <div>
              <p className="text-xs" style={{ color: v?.textMuted ?? '#9ca3af' }}>Add-ons</p>
              <p className="text-sm font-semibold" style={{ color: v?.accent ?? '#2563eb' }}>
                + {formatCurrency(estimate.addonsTotal)}
              </p>
            </div>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: v?.textMuted ?? '#9ca3af' }}>Estimated Total</p>
          <p className="text-xl font-bold" style={{ color: v?.priceBarText ?? '#111827' }}>
            {formatCurrency(estimate.grandTotal)}
          </p>
        </div>
      </div>
    </div>
  );
}
