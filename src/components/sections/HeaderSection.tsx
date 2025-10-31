import Image from "next/image";
import type { SectionComponentProps } from "@/lib/componentRegistry";

export default function HeaderSection({ config, theme }: SectionComponentProps) {
  const gradientFrom = theme?.gradientFrom || '#3A8EF6';
  const gradientTo = theme?.gradientTo || '#6F3AFA';

  return (
    <div 
      className="flex items-center w-full pr-0 rounded-lg backdrop-blur-sm"
      style={{
        background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      <div className="flex items-center gap-x-3 p-4">
        <Image src="/svgs/benhvien-logo.svg" alt="Hospital Logo" width={50} height={50} />
        <span className="text-white font-inter text-2xl sm:text-3xl font-bold leading-tight tracking-tight -ml-[2px]">
          {config.name}
        </span>
      </div>
      <div className="ml-auto">
        <Image src="/svgs/history-list.svg" alt="History Icon" width={80} height={63} className="h-auto" />
      </div>
    </div>
  );
}
