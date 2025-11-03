import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Only support Vietnamese and English
  locales: ["vi", "en"],
  
  // Default to Vietnamese
  defaultLocale: "vi",
  
  // Disable automatic locale detection for better performance
  // Middleware will skip locale detection which makes navigation faster
  localeDetection: false,
  
  // Remove locale prefix from URL for cleaner URLs
  localePrefix: "always",
});
