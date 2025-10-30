"use client";
import { Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useParams } from "next/navigation";

export default function MobileLangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  // App expects /[locale]/... structure (en/vi as first param)
  const locale = params?.locale?.toString() || "en";
  const isEN = locale === "en";
  const nextLocale = isEN ? "vi" : "en";
  const label = isEN ? "ENG" : "VIE";
  function handleSwitch() {
    // Replace the locale prefix in URL
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = nextLocale;
    }
    const newPath = segments.join("/");
    router.replace(newPath);
  }

  return (
    <button
      aria-label="Chuyển ngôn ngữ"
      onClick={handleSwitch}
      className="flex items-center gap-1 px-2 py-2 group text-slate-700 hover:text-blue-700 focus:ring-2 focus:outline-none rounded-full cursor-pointer"
      type="button"
    >
      <Globe className="h-6 w-6 text-slate-400 group-hover:text-blue-700" />
      <span className="font-semibold text-xs uppercase tracking-wide group-hover:text-blue-700">
        {label}
      </span>
    </button>
  );
}
