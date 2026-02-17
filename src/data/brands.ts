import { Brand, BrandVisuals } from '@/types';

// ═══════════════════════════════════════════════════════════
// LUXURIA: Dark luxury theme — black/charcoal + gold accents
// ═══════════════════════════════════════════════════════════
const luxuriaVisuals: BrandVisuals = {
  pageBg: '#0f0f0f',
  cardBg: '#1a1a1a',
  cardBorder: '#2a2a2a',
  cardBorderActive: '#d4a853',
  cardBgActive: '#1f1a10',
  textPrimary: '#f5f0e6',
  textSecondary: '#b8a88a',
  textMuted: '#6b6355',
  accent: '#d4a853',
  accentHover: '#e0b85e',
  accentText: '#0f0f0f',
  headerBg: '#0a0a0a',
  headerText: '#f5f0e6',
  headerSubtext: '#d4a853',
  priceBarBg: '#0a0a0a',
  priceBarText: '#f5f0e6',
  badgeBg: '#d4a853',
  badgeText: '#0f0f0f',
  checkColor: '#d4a853',
};

// ═══════════════════════════════════════════════════════════
// MODURA: Warm beige modern — cream/sand tones + brown accents
// ═══════════════════════════════════════════════════════════
const moduraVisuals: BrandVisuals = {
  pageBg: '#faf7f2',
  cardBg: '#ffffff',
  cardBorder: '#e8dfd4',
  cardBorderActive: '#8b7355',
  cardBgActive: '#f5efe6',
  textPrimary: '#3d3229',
  textSecondary: '#6b5b48',
  textMuted: '#a08f7a',
  accent: '#8b7355',
  accentHover: '#7a6348',
  accentText: '#ffffff',
  headerBg: '#f0e9df',
  headerText: '#3d3229',
  headerSubtext: '#8b7355',
  priceBarBg: '#f0e9df',
  priceBarText: '#3d3229',
  badgeBg: '#8b7355',
  badgeText: '#ffffff',
  checkColor: '#8b7355',
};

// ═══════════════════════════════════════════════════════════
// NIVASA: Clean white — pure white + green accents
// ═══════════════════════════════════════════════════════════
const nivasaVisuals: BrandVisuals = {
  pageBg: '#ffffff',
  cardBg: '#ffffff',
  cardBorder: '#e5e7eb',
  cardBorderActive: '#16a34a',
  cardBgActive: '#f0fdf4',
  textPrimary: '#111827',
  textSecondary: '#4b5563',
  textMuted: '#9ca3af',
  accent: '#16a34a',
  accentHover: '#15803d',
  accentText: '#ffffff',
  headerBg: '#ffffff',
  headerText: '#111827',
  headerSubtext: '#16a34a',
  priceBarBg: '#ffffff',
  priceBarText: '#111827',
  badgeBg: '#16a34a',
  badgeText: '#ffffff',
  checkColor: '#16a34a',
};

export const brands: Brand[] = [
  {
    id: 'luxuria',
    name: 'LUXURIA',
    tagline: 'Where Luxury Meets Perfection',
    pricePerSqft: 3500,
    ceilingHeight: '10-16 ft (Double Height)',
    description:
      'Ultra-premium prefab homes with 5 curated design themes. Marble floors, Italian kitchens, spa bathrooms, and 150+ WOW features per home.',
    color: 'amber',
    visuals: luxuriaVisuals,
    themes: [
      {
        id: 'lux-zen',
        name: 'LuxZen',
        description: 'Japanese minimalist luxury with natural materials and serene spaces',
        style: 'Japanese Minimalism',
        keyFeatures: [
          'Shoji screens & tatami elements',
          'Charred timber (Shou Sugi Ban) cladding',
          'Indoor rock garden & water features',
          'Onsen-inspired soaking tub',
          'Engineered oak & bamboo flooring',
        ],
      },
      {
        id: 'lux-roma',
        name: 'LuxRoma',
        description: 'Mediterranean classical luxury with columns, arches, and frescoes',
        style: 'Mediterranean Classical',
        keyFeatures: [
          'Roman columns & arched doorways',
          'Terracotta & Tuscan cream stucco',
          'Imported marble & granite floors',
          'Italian kitchen with island',
          'Outdoor pergola & courtyard prep',
        ],
      },
      {
        id: 'lux-moda',
        name: 'LuxModa',
        description: 'Contemporary luxury with clean lines and modern comfort',
        style: 'Contemporary Modern',
        keyFeatures: [
          'Floor-to-ceiling glass walls',
          'Floating staircase design',
          'Smart home automation built-in',
          'Designer lighting fixtures',
          'Premium modular kitchen',
        ],
      },
      {
        id: 'lux-ai',
        name: 'LuxAI',
        description: 'Futuristic tech-integrated home for the next generation',
        style: 'Futuristic / Gen-Z',
        keyFeatures: [
          'Full smart home AI integration',
          'RGB ambient lighting system',
          'Content creation studio space',
          'Wireless charging surfaces',
          'Voice-controlled everything',
        ],
      },
      {
        id: 'lux-rajasthani',
        name: 'LuxRajasthani',
        description: 'Indian heritage luxury with artisanal craftsmanship',
        style: 'Indian Heritage',
        keyFeatures: [
          'Jharokha windows & jaali screens',
          'Blue pottery accents',
          'Handcrafted stone carvings',
          'Traditional courtyard layout',
          'Artisanal tile work',
        ],
      },
    ],
    sizes: [
      { sqft: 1000, label: 'Compact Luxury', bedrooms: 2, bathrooms: 2, basePrice: 3500000 },
      { sqft: 1500, label: 'Luxury Home', bedrooms: 3, bathrooms: 3, basePrice: 5250000 },
      { sqft: 2000, label: 'Luxury Estate', bedrooms: 4, bathrooms: 4, basePrice: 7000000 },
    ],
  },
  {
    id: 'modura',
    name: 'MODURA',
    tagline: 'Smart Living, Modern Design',
    pricePerSqft: 3000,
    ceilingHeight: '10-12 ft',
    description:
      'Quality-certified modern homes for professionals and growing families. Functional design with premium finishes at accessible pricing.',
    color: 'blue',
    visuals: moduraVisuals,
    themes: [
      {
        id: 'mod-modern',
        name: 'Modern',
        description: 'Clean lines, minimalist design, contemporary materials',
        style: 'Contemporary Minimalist',
        keyFeatures: [
          'Clean geometric lines',
          'Open-plan living areas',
          'Modular kitchen with appliances',
          'Quality ceramic tile flooring',
          'Energy-efficient LED lighting',
        ],
      },
      {
        id: 'mod-neoclassic',
        name: 'Neo-Classic',
        description: 'Contemporary with subtle traditional warmth',
        style: 'Modern Classic',
        keyFeatures: [
          'Warm neutral color palette',
          'Crown molding accents',
          'Hardwood-look flooring',
          'Classic kitchen cabinetry',
          'Elegant bathroom fixtures',
        ],
      },
      {
        id: 'mod-genz',
        name: 'Gen-Z',
        description: 'Smart, connected, and designed for digital living',
        style: 'Digital Modern',
        keyFeatures: [
          'Smart home ready wiring',
          'Multi-functional spaces',
          'Integrated charging stations',
          'Contemporary bold accents',
          'Instagram-worthy interiors',
        ],
      },
    ],
    sizes: [
      { sqft: 800, label: 'Compact Modern', bedrooms: 1, bathrooms: 1, basePrice: 2400000 },
      { sqft: 1200, label: 'Contemporary Home', bedrooms: 2, bathrooms: 2, basePrice: 3600000 },
      { sqft: 1600, label: 'Modern Family', bedrooms: 3, bathrooms: 3, basePrice: 4800000 },
    ],
  },
  {
    id: 'nivasa',
    name: 'NIVASA',
    tagline: 'Your First Home, Your Pride',
    pricePerSqft: 2500,
    ceilingHeight: '8-10 ft',
    description:
      'Affordable, permanent RCC homes for first-time buyers. Practical design, maximum value, and the dignity of real homeownership. G+1 stackable option available.',
    color: 'emerald',
    visuals: nivasaVisuals,
    themes: [
      {
        id: 'niv-modern',
        name: 'Standard Modern',
        description: 'Clean, practical, space-optimized modern design',
        style: 'Practical Modern',
        keyFeatures: [
          'Space-optimized layouts',
          'Murphy beds & fold-out furniture',
          'Quality ceramic tile flooring',
          'Basic modular kitchen',
          'Storage-integrated design',
        ],
      },
    ],
    sizes: [
      { sqft: 600, label: 'Starter Home', bedrooms: 1, bathrooms: 1, basePrice: 1500000 },
      { sqft: 900, label: 'Growing Family', bedrooms: 2, bathrooms: 1, basePrice: 2250000 },
      { sqft: 1200, label: 'Family Home', bedrooms: 3, bathrooms: 2, basePrice: 3000000 },
    ],
  },
];
