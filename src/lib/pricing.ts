import { Brand, SizePlan } from '@/types';
import { addonGroups } from '@/data/addons';

export interface PriceBreakdown {
  basePrice: number;
  g1Price: number;
  addonItems: { name: string; price: number }[];
  addonsTotal: number;
  grandTotal: number;
}

export function calculateEstimate(
  brand: Brand | null,
  size: SizePlan | null,
  selectedAddons: Record<string, string>,
  g1Option: boolean
): PriceBreakdown {
  const basePrice = size?.basePrice ?? 0;

  // G+1 second floor: same floor area × brand rate per sqft (available for all brands)
  const g1Price = g1Option && brand && size ? size.sqft * brand.pricePerSqft : 0;

  const addonItems: { name: string; price: number }[] = [];

  for (const [groupId, optionId] of Object.entries(selectedAddons)) {
    const group = addonGroups.find((g) => g.id === groupId);
    if (!group) continue;
    const option = group.options.find((o) => o.id === optionId);
    if (!option) continue;

    // For G+1 floor, calculate dynamic price based on brand rate (price is 0 in data, calculated here)
    if (groupId === 'g1floor' && optionId === 'g1-yes') {
      addonItems.push({ name: 'G+1 Second Floor', price: g1Price });
    } else if (option.price > 0) {
      addonItems.push({ name: `${group.name}: ${option.name}`, price: option.price });
    }
  }

  const addonsTotal = addonItems.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = basePrice + addonsTotal;

  return { basePrice, g1Price, addonItems, addonsTotal, grandTotal };
}
