'use client';

import { brands } from '@/data/brands';
import { useConfiguratorStore } from '@/store/configurator-store';
import SelectionCard from '@/components/ui/SelectionCard';
import { getBrandHeroImage } from '@/lib/images';

export default function StepBrand() {
  const { brand: selectedBrand, setBrand } = useConfiguratorStore();

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Brand</h2>
        <p className="text-gray-500 mt-2">Select the brand that matches your lifestyle and budget</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {brands.map((brand) => (
          <SelectionCard
            key={brand.id}
            title={brand.name}
            subtitle={brand.tagline}
            description={brand.description}
            price={`₹${brand.pricePerSqft.toLocaleString('en-IN')}`}
            priceLabel="per sqft"
            selected={selectedBrand?.id === brand.id}
            onClick={() => setBrand(brand)}
            visuals={brand.visuals}
            badge={brand.ceilingHeight}
            image={getBrandHeroImage(brand.id)}
            features={[
              `${brand.themes.length} design theme${brand.themes.length > 1 ? 's' : ''}`,
              `${brand.sizes.length} size options (${brand.sizes[0].sqft}-${brand.sizes[brand.sizes.length - 1].sqft} sqft)`,
              `Starting at ₹${(brand.sizes[0].basePrice / 100000).toFixed(0)} Lakhs`,
            ]}
          />
        ))}
      </div>
    </div>
  );
}
