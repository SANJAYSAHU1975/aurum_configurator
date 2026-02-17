'use client';

import { useConfiguratorStore } from '@/store/configurator-store';
import SelectionCard from '@/components/ui/SelectionCard';
import { getThemeImage } from '@/lib/images';

export default function StepTheme() {
  const { brand, theme: selectedTheme, setTheme } = useConfiguratorStore();
  const v = brand?.visuals;

  if (!brand) return null;

  if (brand.themes.length === 1) {
    const onlyTheme = brand.themes[0];
    return (
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold" style={{ color: v?.textPrimary ?? '#111827' }}>
            Design Theme
          </h2>
          <p className="mt-2" style={{ color: v?.textSecondary ?? '#6b7280' }}>
            {brand.name} comes with a single curated theme
          </p>
        </div>
        <div className="max-w-lg mx-auto">
          <SelectionCard
            title={onlyTheme.name}
            subtitle={onlyTheme.style}
            description={onlyTheme.description}
            features={onlyTheme.keyFeatures}
            selected={true}
            onClick={() => {}}
            visuals={v}
            image={getThemeImage(brand.id, onlyTheme.id)}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: v?.textPrimary ?? '#111827' }}>
          Choose Your Theme
        </h2>
        <p className="mt-2" style={{ color: v?.textSecondary ?? '#6b7280' }}>
          {brand.name} offers {brand.themes.length} curated design themes
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brand.themes.map((theme) => (
          <SelectionCard
            key={theme.id}
            title={theme.name}
            subtitle={theme.style}
            description={theme.description}
            features={theme.keyFeatures}
            selected={selectedTheme?.id === theme.id}
            onClick={() => setTheme(theme)}
            visuals={v}
            image={getThemeImage(brand.id, theme.id)}
          />
        ))}
      </div>
    </div>
  );
}
