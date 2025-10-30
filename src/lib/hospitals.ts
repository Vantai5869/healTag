export interface HospitalVariantConfig {
  slug: string;
  name: string;
  // i18n namespace keys, e.g. "Landing.common" or "Landing.bachMai"
  i18nKey: string;
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
    themeColor: "emerald",
    accent: "teal",
    heroImage: "/figma/auto/medical-records.svg",
    layout: "classic",
    heroGradient: { from: "#51C0FF", to: "#007BFF" },
    buttonGradient: { from: "#51C0FF", to: "#007BFF" },
  },
  "cho-ray": {
    slug: "cho-ray",
    name: "Chợ Rẫy Hospital",
    i18nKey: "Landing.choRay",
    themeColor: "indigo",
    accent: "violet",
    heroImage: "/figma/auto/medical-records.svg",
    layout: "modern",
    heroGradient: { from: "#51C0FF", to: "#007BFF" },
    buttonGradient: { from: "#51C0FF", to: "#007BFF" },
  },
};

export function getHospitalConfigBySlug(slug: string): HospitalVariantConfig | null {
  return hospitalBySlug[slug] ?? null;
}

export function getAllHospitalSlugs(): string[] {
  return Object.keys(hospitalBySlug);
}


