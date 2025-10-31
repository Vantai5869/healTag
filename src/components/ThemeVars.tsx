"use client";

import { useEffect } from "react";
import { useLandingStore } from "@/store/landingStore";

export default function ThemeVars() {
  const theme = useLandingStore((s) => s.config.theme);

  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    root.style.setProperty("--lp-primary", theme.primaryColor);
    root.style.setProperty("--lp-gradient-from", theme.gradientFrom);
    root.style.setProperty("--lp-gradient-to", theme.gradientTo);
  }, [theme]);

  return null;
}


