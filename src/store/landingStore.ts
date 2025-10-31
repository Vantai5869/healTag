import { create } from 'zustand';
import type { LandingPageConfig, SectionConfig } from '@/lib/landingConfig';
import { getLandingConfig, saveLandingConfig, resetLandingConfig, DEFAULT_LANDING_CONFIG } from '@/lib/landingConfig';

interface LandingStore {
  config: LandingPageConfig;
  updateSection: (sectionId: string, updates: Partial<SectionConfig>) => void;
  reorderSections: (newOrder: string[]) => void;
  updateTheme: (theme: Partial<LandingPageConfig['theme']>) => void;
  toggleSection: (sectionId: string) => void;
  resetConfig: () => void;
}

export const useLandingStore = create<LandingStore>((set) => ({
  config: getLandingConfig(),
  
  updateSection: (sectionId: string, updates: Partial<SectionConfig>) => {
    set((state) => {
      const newConfig = {
        ...state.config,
        sections: state.config.sections.map((s) =>
          s.id === sectionId ? { ...s, ...updates } : s
        ),
      };
      saveLandingConfig(newConfig);
      return { config: newConfig };
    });
  },
  
  reorderSections: (newOrder: string[]) => {
    set((state) => {
      const sectionMap = new Map(state.config.sections.map((s) => [s.id, s]));
      const newSections = newOrder
        .map((id, index) => ({
          ...sectionMap.get(id)!,
          order: index,
        }))
        .filter(Boolean);
      
      const newConfig = {
        ...state.config,
        sections: newSections,
      };
      saveLandingConfig(newConfig);
      return { config: newConfig };
    });
  },
  
  updateTheme: (theme: Partial<LandingPageConfig['theme']>) => {
    set((state) => {
      const newConfig = {
        ...state.config,
        theme: { ...state.config.theme, ...theme },
      };
      saveLandingConfig(newConfig);
      return { config: newConfig };
    });
  },
  
  toggleSection: (sectionId: string) => {
    set((state) => {
      const newConfig = {
        ...state.config,
        sections: state.config.sections.map((s) =>
          s.id === sectionId ? { ...s, enabled: !s.enabled } : s
        ),
      };
      saveLandingConfig(newConfig);
      return { config: newConfig };
    });
  },
  
  resetConfig: () => {
    resetLandingConfig();
    set({ config: DEFAULT_LANDING_CONFIG });
  },
}));

