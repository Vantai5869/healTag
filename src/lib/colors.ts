export type ThemeColor =
  | "emerald"
  | "indigo"
  | "teal"
  | "violet"
  | "blue"
  | "rose"
  | "amber";

interface ColorClasses {
  buttonBg: string; // bg-* class
  buttonHover: string; // hover:bg-* class
  dotBg: string; // bg-* for status dot
  border: string; // border-* accent
  text: string; // text-* accent
  gradientFrom: string; // from-* for hero gradient
}

const MAP: Record<ThemeColor, ColorClasses> = {
  emerald: {
    buttonBg: "bg-emerald-600",
    buttonHover: "hover:bg-emerald-700",
    dotBg: "bg-emerald-500",
    border: "border-emerald-300",
    text: "text-emerald-700 dark:text-emerald-300",
    gradientFrom: "from-emerald-100/60 dark:from-emerald-950/20",
  },
  indigo: {
    buttonBg: "bg-indigo-600",
    buttonHover: "hover:bg-indigo-700",
    dotBg: "bg-indigo-500",
    border: "border-indigo-300",
    text: "text-indigo-700 dark:text-indigo-300",
    gradientFrom: "from-indigo-100/60 dark:from-indigo-950/20",
  },
  teal: {
    buttonBg: "bg-teal-600",
    buttonHover: "hover:bg-teal-700",
    dotBg: "bg-teal-500",
    border: "border-teal-300",
    text: "text-teal-700 dark:text-teal-300",
    gradientFrom: "from-teal-100/60 dark:from-teal-950/20",
  },
  violet: {
    buttonBg: "bg-violet-600",
    buttonHover: "hover:bg-violet-700",
    dotBg: "bg-violet-500",
    border: "border-violet-300",
    text: "text-violet-700 dark:text-violet-300",
    gradientFrom: "from-violet-100/60 dark:from-violet-950/20",
  },
  blue: {
    buttonBg: "bg-blue-600",
    buttonHover: "hover:bg-blue-700",
    dotBg: "bg-blue-500",
    border: "border-blue-300",
    text: "text-blue-700 dark:text-blue-300",
    gradientFrom: "from-blue-100/60 dark:from-blue-950/20",
  },
  rose: {
    buttonBg: "bg-rose-600",
    buttonHover: "hover:bg-rose-700",
    dotBg: "bg-rose-500",
    border: "border-rose-300",
    text: "text-rose-700 dark:text-rose-300",
    gradientFrom: "from-rose-100/60 dark:from-rose-950/20",
  },
  amber: {
    buttonBg: "bg-amber-600",
    buttonHover: "hover:bg-amber-700",
    dotBg: "bg-amber-500",
    border: "border-amber-300",
    text: "text-amber-700 dark:text-amber-300",
    gradientFrom: "from-amber-100/60 dark:from-amber-950/20",
  },
};

export function getColorClasses(color: string | undefined): ColorClasses {
  if (!color) return MAP.emerald;
  const key = color as ThemeColor;
  return MAP[key] ?? MAP.emerald;
}


