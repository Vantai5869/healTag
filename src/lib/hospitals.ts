export interface HospitalVariantConfig {
  slug: string;
  name: string;
  // i18n namespace keys, e.g. "Landing.common" or "Landing.bachMai"
  i18nKey: string;
  // Landing page variant: 1, 2, or 3
  // In the future, this will be determined by API call
  landingPageVariant?: 1 | 2 | 3;
  // UI variant options per hospital
  themeColor: string; // tailwind color token e.g. "blue"
  accent?: string; // tailwind color token for accents
  heroImage?: string; // public path to image
  logoSvg?: string; // optional svg path
  layout?: "classic" | "modern" | "compact";
  // Optional Figma-accurate gradient colors (hex)
  heroGradient?: { from: string; to: string };
  buttonGradient?: { from: string; to: string };
}

export const hospitalBySlug: Record<string, HospitalVariantConfig> = {
  "bach-mai": {
    slug: "bach-mai",
    name: "Bạch Mai Hospital",
    i18nKey: "Landing.bachMai",
    landingPageVariant: 1,
    themeColor: "emerald",
    accent: "teal",
    heroImage: "/figma/auto/medical-records.svg",
    layout: "classic",
    heroGradient: { from: "#51C0FF", to: "#007BFF" },
    buttonGradient: { from: "#51C0FF", to: "#007BFF" },
  },
  "viet-duc": {
    slug: "viet-duc",
    name: "Bệnh viện Việt Đức",
    i18nKey: "Landing.vietDuc",
    landingPageVariant: 3,
    themeColor: "blue",
    accent: "cyan",
    heroImage: "/figma/auto/medical-records.svg",
    layout: "modern",
    heroGradient: { from: "#3A8EF6", to: "#6F3AFA" },
    buttonGradient: { from: "#3A8EF6", to: "#6F3AFA" },
  },
  "quan-doi-108": {
    slug: "quan-doi-108",
    name: "BV TW Quân đội 108",
    i18nKey: "Landing.quanDoi108",
    landingPageVariant: 1,
    themeColor: "slate",
    accent: "gray",
    heroImage: "/figma/auto/medical-records.svg",
    layout: "classic",
    heroGradient: { from: "#51C0FF", to: "#007BFF" },
    buttonGradient: { from: "#51C0FF", to: "#007BFF" },
  },
  "cho-ray": {
    slug: "cho-ray",
    name: "Chợ Rẫy Hospital",
    i18nKey: "Landing.choRay",
    landingPageVariant: 2,
    themeColor: "indigo",
    accent: "violet",
    heroImage: "/figma/auto/medical-records.svg",
    layout: "modern",
    heroGradient: { from: "#51C0FF", to: "#007BFF" },
    buttonGradient: { from: "#51C0FF", to: "#007BFF" },
  },
  "tu-du": {
    slug: "tu-du",
    name: "Bệnh viện Từ Dũ",
    i18nKey: "Landing.tuDu",
    landingPageVariant: 2,
    themeColor: "pink",
    accent: "rose",
    heroImage: "/figma/auto/medical-records.svg",
    layout: "modern",
    heroGradient: { from: "#EC4899", to: "#F43F5E" },
    buttonGradient: { from: "#EC4899", to: "#F43F5E" },
  },
  "115": {
    slug: "115",
    name: "Bệnh viện 115",
    i18nKey: "Landing.115",
    landingPageVariant: 3,
    themeColor: "green",
    accent: "emerald",
    heroImage: "/figma/auto/medical-records.svg",
    layout: "compact",
    heroGradient: { from: "#10B981", to: "#059669" },
    buttonGradient: { from: "#10B981", to: "#059669" },
  },
  "huu-nghi": {
    slug: "huu-nghi",
    name: "Bệnh viện Hữu Nghị",
    i18nKey: "Landing.huuNghi",
    landingPageVariant: 1,
    themeColor: "orange",
    accent: "amber",
    heroImage: "/figma/auto/medical-records.svg",
    layout: "classic",
    heroGradient: { from: "#F97316", to: "#FB923C" },
    buttonGradient: { from: "#F97316", to: "#FB923C" },
  },
  "nhi-dong-1": {
    slug: "nhi-dong-1",
    name: "Bệnh viện Nhi Đồng 1",
    i18nKey: "Landing.nhiDong1",
    landingPageVariant: 2,
    themeColor: "purple",
    accent: "fuchsia",
    heroImage: "/figma/auto/medical-records.svg",
    layout: "modern",
    heroGradient: { from: "#A855F7", to: "#D946EF" },
    buttonGradient: { from: "#A855F7", to: "#D946EF" },
  },
};

export function getHospitalConfigBySlug(slug: string): HospitalVariantConfig | null {
  return hospitalBySlug[slug] ?? null;
}

export function getAllHospitalSlugs(): string[] {
  return Object.keys(hospitalBySlug);
}


