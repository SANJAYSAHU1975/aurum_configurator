'use client';

import { useConfiguratorStore } from '@/store/configurator-store';
import SelectionCard from '@/components/ui/SelectionCard';
import { formatCurrency } from '@/lib/utils';
import { getSizeImage } from '@/lib/images';

export default function StepSize() {
  const { brand, size: selectedSize, setSize, g1Option, setG1Option } = useConfiguratorStore();
  const v = brand?.visuals;

  if (!brand) return null;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: v?.textPrimary ?? '#111827' }}>
          Choose Your Size
        </h2>
        <p className="mt-2" style={{ color: v?.textSecondary ?? '#6b7280' }}>
          Select the floor plan that fits your family
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {brand.sizes.map((size) => (
          <SelectionCard
            key={size.sqft}
            title={size.label}
            subtitle={`${size.sqft} sqft`}
            price={formatCurrency(size.basePrice)}
            priceLabel="base price"
            selected={selectedSize?.sqft === size.sqft}
            onClick={() => setSize(size)}
            visuals={v}
            image={getSizeImage(brand.id, size.sqft)}
            features={[
              `${size.bedrooms} Bedroom${size.bedrooms > 1 ? 's' : ''}`,
              `${size.bathrooms} Bathroom${size.bathrooms > 1 ? 's' : ''}`,
              `${brand.ceilingHeight} ceiling`,
            ]}
          />
        ))}
      </div>

      {selectedSize && (
        <div
          className="mt-6 p-5 border-2 border-dashed rounded-xl"
          style={{ borderColor: `${v?.accent ?? '#10b981'}60`, backgroundColor: v?.cardBgActive ?? '#f0fdf4' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold" style={{ color: v?.textPrimary ?? '#111827' }}>
                G+1 Second Floor Option
              </h3>
              <p className="text-sm mt-1" style={{ color: v?.textSecondary ?? '#4b5563' }}>
                Double your living space with a stackable second floor (G+2 not available)
              </p>
              <p className="text-sm font-medium mt-1" style={{ color: v?.accent ?? '#16a34a' }}>
                + {formatCurrency(selectedSize.sqft * brand.pricePerSqft)} ({selectedSize.sqft} sqft × ₹{brand.pricePerSqft.toLocaleString('en-IN')}/sqft)
              </p>
            </div>
            <button
              onClick={() => setG1Option(!g1Option)}
              className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer"
              style={{ backgroundColor: g1Option ? (v?.accent ?? '#16a34a') : '#d1d5db' }}
            >
              <span
                className="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                style={{ transform: g1Option ? 'translateX(1.25rem)' : 'translateX(0.25rem)' }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
