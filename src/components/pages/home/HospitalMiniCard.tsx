"use client";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from 'next/navigation';
import Image from "next/image";

export interface MiniHospital {
  id: string;
  name: string;
  address: string;
  logo?: string;
  slug: string;
}

export default function HospitalMiniCard({ hospital }: { hospital: MiniHospital }) {
  const t = useTranslations("HospitalCard");
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale?.toString() || 'vi';
  return (
    <div className="flex w-full flex-col items-end rounded-[10px] bg-white border border-slate-200 overflow-hidden pt-3 pr-0 pb-0 pl-3">
      {/* Top section */}
      <div className="flex items-start gap-[10px] self-stretch pr-3">
        {/* Left logo 50x50 */}
        <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-black/5 bg-white">
          <Image 
            src={hospital.logo ?? "/svgs/Logo.svg"} 
            alt={t("logoAlt", { name: hospital.name })} 
            width={50} 
            height={50} 
            className="h-[50px] w-[50px] object-contain" 
            sizes="50px"
            loading="lazy"
          />
        </div>
        {/* Right text block */}
        <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
          <p className="truncate text-[18px] font-medium leading-[140%] tracking-[-1.08px] text-[#404040]">{hospital.name}</p>
          <div className="flex items-start gap-1 self-stretch">
            <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" className="mt-[2px] text-[#047DFF]" fill="currentColor"><path d="M10 2a6.5 6.5 0 016.5 6.5c0 4.784-6.5 9.5-6.5 9.5S3.5 13.284 3.5 8.5A6.5 6.5 0 0110 2Zm0 8.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"/></svg>
            <p className="truncate flex-1 min-w-0" style={{ color: "#047DFF", fontFamily: "Inter", fontSize: 14, fontWeight: 400, lineHeight: "20px" }}>
              {hospital.address}
            </p>
          </div>
        </div>
      </div>
      {/* Bottom button aligned right */}
      <div className="mt-4 flex w-full justify-end">
        <button
          className="flex items-center justify-end gap-[10px] rounded-tl-[50px] rounded-tr-0 rounded-br-0 rounded-bl-0 text-white cursor-pointer"
          style={{ padding: "6px 12px 6px 16px", background: "linear-gradient(90deg, #047DFF 0%, #51C1FF 100%)" }}
          onClick={() => router.push(`/${locale}/hospitals/${hospital.slug}`)}
        >
          <span className="text-white" style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.84px" }}>
            {t("bookNowButton")}
          </span>
        </button>
      </div>
    </div>
  );
}
