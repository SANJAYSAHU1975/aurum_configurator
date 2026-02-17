export type BrandId = 'luxuria' | 'modura' | 'nivasa' | 'nomad';

export interface Theme {
  id: string;
  name: string;
  description: string;
  style: string;
  keyFeatures: string[];
}

export interface SizePlan {
  sqft: number;
  label: string;
  bedrooms: number;
  bathrooms: number;
  basePrice: number;
}

export interface BrandVisuals {
  // Background & surface colors
  pageBg: string;        // Main page background
  cardBg: string;        // Card background
  cardBorder: string;    // Card border
  cardBorderActive: string; // Selected card border
  cardBgActive: string;  // Selected card background

  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Accent colors
  accent: string;        // Primary accent (buttons, highlights)
  accentHover: string;
  accentText: string;    // Text on accent background

  // Header
  headerBg: string;
  headerText: string;
  headerSubtext: string;

  // Price bar
  priceBarBg: string;
  priceBarText: string;

  // Badge
  badgeBg: string;
  badgeText: string;

  // Check/selected indicator
  checkColor: string;
}

export interface Brand {
  id: BrandId;
  name: string;
  tagline: string;
  pricePerSqft: number;
  ceilingHeight: string;
  description: string;
  color: string;
  visuals: BrandVisuals;
  themes: Theme[];
  sizes: SizePlan[];
}

export interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface AddonGroup {
  id: string;
  name: string;
  category: 'interiors' | 'furniture' | 'furnishing' | 'technology' | 'energy' | 'structure';
  options: AddonOption[];
  brandAvailability: BrandId[];
}

export interface ConfigState {
  currentStep: number;
  brand: Brand | null;
  theme: Theme | null;
  size: SizePlan | null;
  selectedAddons: Record<string, string>; // addonGroupId → addonOptionId
  g1Option: boolean;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface ConfigureAction {
  action: 'configure';
  brand: BrandId;
  theme?: string;
  size?: number;
}
