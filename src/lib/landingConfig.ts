// Types for landing page configuration

export type SectionType = 
  | 'header'
  | 'hero'
  | 'services'
  | 'departments'
  | 'doctors'
  | 'news';

export type ComponentVariant = 'default' | 'variant1' | 'variant2' | 'variant3';

export interface SectionConfig {
  id: string;
  type: SectionType;
  componentVariant: ComponentVariant;
  order: number;
  enabled: boolean;
  props?: Record<string, unknown>;
}

export interface LandingPageConfig {
  sections: SectionConfig[];
  theme: {
    primaryColor: string;
    gradientFrom: string;
    gradientTo: string;
  };
  lastUpdated: string;
}

export const DEFAULT_LANDING_CONFIG: LandingPageConfig = {
  sections: [
    { id: 'header', type: 'header', componentVariant: 'default', order: 0, enabled: true },
    { id: 'hero', type: 'hero', componentVariant: 'default', order: 1, enabled: true },
    { id: 'services', type: 'services', componentVariant: 'default', order: 2, enabled: true },
    { id: 'departments', type: 'departments', componentVariant: 'default', order: 3, enabled: true },
    { id: 'doctors', type: 'doctors', componentVariant: 'default', order: 4, enabled: true },
    { id: 'news', type: 'news', componentVariant: 'default', order: 5, enabled: true },
  ],
  theme: {
    primaryColor: '#3A8EF6',
    gradientFrom: '#3A8EF6',
    gradientTo: '#6F3AFA',
  },
  lastUpdated: new Date().toISOString(),
};

// Storage helpers
const STORAGE_KEY = 'landing-page-config';

export function getLandingConfig(): LandingPageConfig {
  if (typeof window === 'undefined') return DEFAULT_LANDING_CONFIG;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_LANDING_CONFIG;
  
  try {
    return { ...DEFAULT_LANDING_CONFIG, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_LANDING_CONFIG;
  }
}

export function saveLandingConfig(config: LandingPageConfig): void {
  if (typeof window === 'undefined') return;
  
  const toSave = {
    ...config,
    lastUpdated: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

export function resetLandingConfig(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

