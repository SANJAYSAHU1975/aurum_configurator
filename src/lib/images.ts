import { BrandId } from '@/types';

// Image path conventions:
// Brand hero:  /images/{brand}/brand-hero.jpg
// Theme:       /images/{brand}/{themeId}-1.{ext}  (exterior)
//              /images/{brand}/{themeId}-2.{ext}  (interior)
// Size:        /images/{brand}/size-{sqft}.{ext}  (floor plan / exterior render)

// Theme image extension map: key = "{themeId}-{1|2}", value = extension
const themeExtMap: Record<string, string> = {
  // LUXURIA
  'lux-zen-1': 'png',    'lux-zen-2': 'jpg',
  'lux-roma-1': 'jpg',   'lux-roma-2': 'jpg',
  'lux-moda-1': 'png',   'lux-moda-2': 'jpg',
  'lux-ai-1': 'png',     'lux-ai-2': 'png',
  'lux-rajasthani-1': 'jpg', 'lux-rajasthani-2': 'jpg',
  // MODURA
  'mod-modern-1': 'png',     'mod-modern-2': 'png',
  'mod-neoclassic-1': 'jpg', 'mod-neoclassic-2': 'jpg',
  'mod-genz-1': 'png',       'mod-genz-2': 'png',
  // NIVASA
  'niv-modern-1': 'png',  'niv-modern-2': 'jpg',
  // NOMAD
  'nomad-tropical-1': 'png', 'nomad-tropical-2': 'png',
  'nomad-mountain-1': 'png', 'nomad-mountain-2': 'png',
  'nomad-minimal-1': 'png',  'nomad-minimal-2': 'png',
};

// Size image extension map: key = "{brandId}-{sqft}", value = extension
// Update this map when replacing SVG placeholders with real images
const sizeExtMap: Record<string, string> = {
  // LUXURIA — replace 'svg' with 'jpg' or 'png' when real images are added
  'luxuria-1000': 'svg',
  'luxuria-1500': 'svg',
  'luxuria-2000': 'svg',
  // MODURA
  'modura-800': 'svg',
  'modura-1200': 'svg',
  'modura-1600': 'svg',
  // NIVASA
  'nivasa-600': 'svg',
  'nivasa-900': 'svg',
  'nivasa-1200': 'svg',
  // NOMAD
  'nomad-360': 'svg',
  'nomad-540': 'svg',
};

function themeExt(themeId: string, index: number): string {
  return themeExtMap[`${themeId}-${index}`] || 'svg';
}

function sizeExt(brandId: BrandId, sqft: number): string {
  return sizeExtMap[`${brandId}-${sqft}`] || 'svg';
}

export function getBrandHeroImage(brandId: BrandId): string {
  const ext = brandId === 'nomad' ? 'png' : 'jpg';
  return `/images/${brandId}/brand-hero.${ext}`;
}

export function getThemeImages(brandId: BrandId, themeId: string): string[] {
  return [
    `/images/${brandId}/${themeId}-1.${themeExt(themeId, 1)}`,
    `/images/${brandId}/${themeId}-2.${themeExt(themeId, 2)}`,
  ];
}

export function getThemeImage(brandId: BrandId, themeId: string): string {
  return `/images/${brandId}/${themeId}-1.${themeExt(themeId, 1)}`;
}

export function getSizeImage(brandId: BrandId, sqft: number): string {
  return `/images/${brandId}/size-${sqft}.${sizeExt(brandId, sqft)}`;
}
