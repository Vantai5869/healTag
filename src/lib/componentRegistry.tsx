// Component Registry - Maps section types and variants to actual components

import type { SectionType, ComponentVariant } from './landingConfig';
import type { HospitalVariantConfig } from './hospitals';

// Import all section components
import { headerVariants, headerVariantLabels } from '@/components/sections/header';
import { heroVariants, heroVariantLabels } from '@/components/sections/hero';
import ServicesSection from '@/components/sections/ServicesSection';
import DepartmentsSection from '@/components/sections/DepartmentsSection';
import DoctorsSection from '@/components/sections/DoctorsSection';
import NewsSection from '@/components/sections/NewsSection';

// Component type for section props
export type SectionComponentProps = {
  config: HospitalVariantConfig;
  theme?: {
    primaryColor: string;
    gradientFrom: string;
    gradientTo: string;
  };
  variant?: ComponentVariant;
};

// Registry mapping: sectionType -> variant -> Component
type ComponentRegistry = {
  [K in SectionType]: {
    [V in ComponentVariant]: React.ComponentType<SectionComponentProps>;
  };
};

// Default components (we'll add variants later)
const registry: ComponentRegistry = {
  header: {
    default: headerVariants.default,
    variant1: headerVariants.variant1 ?? headerVariants.default,
    variant2: (headerVariants as any).variant2 ?? headerVariants.default,
    variant3: (headerVariants as any).variant3 ?? headerVariants.default,
  },
  hero: {
    default: heroVariants.default,
    variant1: heroVariants.variant1 ?? heroVariants.default,
    variant2: (heroVariants as any).variant2 ?? heroVariants.default,
    variant3: (heroVariants as any).variant3 ?? heroVariants.default,
  },
  services: {
    default: ServicesSection,
    variant1: ServicesSection,
    variant2: ServicesSection,
    variant3: ServicesSection,
  },
  departments: {
    default: DepartmentsSection,
    variant1: DepartmentsSection,
    variant2: DepartmentsSection,
    variant3: DepartmentsSection,
  },
  doctors: {
    default: DoctorsSection,
    variant1: DoctorsSection,
    variant2: DoctorsSection,
    variant3: DoctorsSection,
  },
  news: {
    default: NewsSection,
    variant1: NewsSection,
    variant2: NewsSection,
    variant3: NewsSection,
  },
};

export function getSectionComponent(
  sectionType: SectionType,
  variant: ComponentVariant = 'default'
): React.ComponentType<SectionComponentProps> {
  return registry[sectionType]?.[variant] || registry[sectionType].default;
}

export function getVariantKeys(sectionType: SectionType): ComponentVariant[] {
  if (sectionType === 'hero') return ['default','variant1','variant2'];
  if (sectionType === 'header') return ['default','variant1'];
  return ['default','variant1','variant2','variant3'];
}

export function getVariantLabel(sectionType: SectionType, key: string): string {
  if (sectionType === 'hero') return (heroVariantLabels as Record<string,string>)[key] ?? key;
  if (sectionType === 'header') return (headerVariantLabels as Record<string,string>)[key] ?? key;
  const map: Record<string,string> = { default: 'Mặc định', variant1: 'Biến thể 1', variant2: 'Biến thể 2', variant3: 'Biến thể 3' };
  return map[key] ?? key;
}

