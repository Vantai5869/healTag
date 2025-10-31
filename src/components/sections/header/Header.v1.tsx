import Image from "next/image";
import type { HeaderProps } from "./Header.base";

// Header compact: giữ nguyên cấu trúc của default (logo + tên + icon bên phải), chỉ đổi style
export default function HeaderCompact({ config }: HeaderProps) {
  return (
    <div className="flex items-center w-full pr-0 rounded-xl bg-white/95 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-x-3 p-3">
        <Image src="/svgs/benhvien-logo.svg" alt="Hospital Logo" width={44} height={44} />
        <span className="text-[#0B1A37] font-inter text-xl sm:text-2xl font-bold leading-tight tracking-tight -ml-[2px]">
          {config.name}
        </span>
      </div>
      <div className="ml-auto">
        <Image src="/svgs/history-list.svg" alt="History Icon" width={72} height={56} className="h-auto opacity-80" />
      </div>
    </div>
  );
}


