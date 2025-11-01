"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import HospitalMiniCard from "@/components/pages/home/HospitalMiniCard";
import type { MiniHospital } from "@/components/pages/home/HospitalMiniCard";
import { SAMPLE_HOSPITALS } from "@/lib/hospitalSamples";

export default function HospitalsStyledSection() {
  const t = useTranslations("Home.hospitals");
  const items = SAMPLE_HOSPITALS;
  const pages: MiniHospital[][] = [];
  for (let i = 0; i < items.length; i += 6) pages.push(items.slice(i, i + 6));
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 mt-16 mb-6">
      <div className="rounded-2xl bg-white flex w-full max-w-[1200px] flex-col items-start gap-6 sm:gap-8">
        <div className="relative flex items-center justify-between self-stretch rounded-[8px] bg-gradient-to-r from-[#007BFF] to-[#004A99] p-4 backdrop-blur-[5px]">
          <p className="text-white" style={{ fontFamily: "Inter", fontSize: 18, fontWeight: 500, lineHeight: "140%", letterSpacing: "-1.08px" }}>
            {t("title")}
          </p>
          <div className="">
            <Image src="/svgs/history-list.svg" alt={t("historyIconAlt") || "Lịch sử tìm kiếm"} width={80} height={63} className="w-auto h-full" />
          </div>
        </div>

        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          onSwiper={(s) => setSwiper(s)}
          onSlideChange={(s) => setActiveIndex(s.activeIndex)}
          className="w-full pb-4 sm:pb-6"
        >
          {pages.map((page, idx) => (
            <SwiperSlide key={idx} className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                {page.map((h) => (
                  <HospitalMiniCard key={h.id} hospital={h} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-3 w-full flex items-center justify-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to page ${i + 1}`}
              onClick={() => swiper?.slideTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${activeIndex === i ? 'bg-[#047DFF]' : 'bg-slate-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
