'use client';

import { useConfiguratorStore } from '@/store/configurator-store';
import { addonGroups } from '@/data/addons';
import AddonToggle from '@/components/ui/AddonToggle';

export default function StepAddons() {
  const { brand, selectedAddons, setAddon } = useConfiguratorStore();
  const v = brand?.visuals;

  if (!brand) return null;

  const availableGroups = addonGroups.filter((g) => g.brandAvailability.includes(brand.id));

  const categories = [
    { key: 'interiors', label: 'Interior Upgrades' },
    { key: 'furniture', label: 'Furniture' },
    { key: 'furnishing', label: 'Furnishing' },
    { key: 'technology', label: 'Technology' },
    { key: 'energy', label: 'Energy' },
    { key: 'structure', label: 'Structure' },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: v?.textPrimary ?? '#111827' }}>
          Customize Your Home
        </h2>
        <p className="mt-2" style={{ color: v?.textSecondary ?? '#6b7280' }}>
          Add optional upgrades and packages
        </p>
      </div>
      <div className="space-y-6">
        {categories.map((cat) => {
          const groups = availableGroups.filter((g) => g.category === cat.key);
          if (groups.length === 0) return null;
          return (
            <div key={cat.key}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-3"
                style={{ color: v?.textMuted ?? '#9ca3af' }}
              >
                {cat.label}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map((group) => (
                  <AddonToggle
                    key={group.id}
                    group={group}
                    selectedOptionId={selectedAddons[group.id]}
                    onSelect={setAddon}
                    visuals={v}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
