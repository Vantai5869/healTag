import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Only support Vietnamese and English
  locales: ["vi", "en"],
  
  // Default to Vietnamese
  defaultLocale: "vi",
  
  // Enable automatic locale detection
  localeDetection: true,
  
  // Remove locale prefix from URL for cleaner URLs
  localePrefix: "never",
});
