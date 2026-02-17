import { create } from 'zustand';
import { Brand, Theme, SizePlan, BrandId } from '@/types';
import { brands } from '@/data/brands';

interface ConfiguratorState {
  currentStep: number;
  brand: Brand | null;
  theme: Theme | null;
  size: SizePlan | null;
  selectedAddons: Record<string, string>;
  g1Option: boolean;
  customerName: string;
  customerPhone: string;
  customerEmail: string;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setBrand: (brand: Brand) => void;
  setTheme: (theme: Theme) => void;
  setSize: (size: SizePlan) => void;
  setAddon: (groupId: string, optionId: string) => void;
  setG1Option: (enabled: boolean) => void;
  setCustomerName: (name: string) => void;
  setCustomerPhone: (phone: string) => void;
  setCustomerEmail: (email: string) => void;
  applyConfiguration: (brandId: BrandId, themeId?: string, sqft?: number) => void;
  reset: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  currentStep: 0,
  brand: null,
  theme: null,
  size: null,
  selectedAddons: {},
  g1Option: false,
  customerName: '',
  customerPhone: '',
  customerEmail: '',

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 4) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),

  setBrand: (brand) => {
    // Reset theme, size, and addons when brand changes
    const autoTheme = brand.themes.length === 1 ? brand.themes[0] : null;
    set({
      brand,
      theme: autoTheme,
      size: null,
      selectedAddons: {},
      g1Option: false,
    });
  },

  setTheme: (theme) => set({ theme }),
  setSize: (size) => set({ size }),

  setAddon: (groupId, optionId) =>
    set((s) => ({
      selectedAddons: { ...s.selectedAddons, [groupId]: optionId },
    })),

  setG1Option: (enabled) => {
    set((s) => {
      const addons = { ...s.selectedAddons };
      if (enabled) {
        addons['g1floor'] = 'g1-yes';
      } else {
        delete addons['g1floor'];
      }
      return { g1Option: enabled, selectedAddons: addons };
    });
  },

  setCustomerName: (name) => set({ customerName: name }),
  setCustomerPhone: (phone) => set({ customerPhone: phone }),
  setCustomerEmail: (email) => set({ customerEmail: email }),

  applyConfiguration: (brandId, themeId, sqft) => {
    const brand = brands.find((b) => b.id === brandId);
    if (!brand) return;

    const theme = themeId
      ? brand.themes.find((t) => t.id === themeId)
      : brand.themes.length === 1
        ? brand.themes[0]
        : null;

    const size = sqft ? brand.sizes.find((s) => s.sqft === sqft) : null;

    let step = 1; // Go to theme step
    if (theme) step = 2; // Go to size step
    if (theme && size) step = 3; // Go to addons step

    set({
      brand,
      theme: theme ?? null,
      size: size ?? null,
      selectedAddons: {},
      g1Option: false,
      currentStep: step,
    });
  },

  reset: () =>
    set({
      currentStep: 0,
      brand: null,
      theme: null,
      size: null,
      selectedAddons: {},
      g1Option: false,
      customerName: '',
      customerPhone: '',
      customerEmail: '',
    }),
}));
