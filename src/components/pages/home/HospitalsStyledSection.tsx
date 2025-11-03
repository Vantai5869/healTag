"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
// Swiper CSS is now imported globally in globals.css
import HospitalMiniCard from "@/components/pages/home/HospitalMiniCard";
import type { MiniHospital } from "@/components/pages/home/HospitalMiniCard";
import { SAMPLE_HOSPITALS } from "@/lib/hospitalSamples";

export default function HospitalsStyledSection() {
  const t = useTranslations("Home.hospitals");
  const items = SAMPLE_HOSPITALS;
  const pages: MiniHospital[][] = [];
  for (let i = 0; i < items.length; i += 6) pages.push(items.slice(i, i + 6));
  // Desktop/Tablet swiper state
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Mobile: chunk into pages of 2 items (each item one row)
  const mobilePages: MiniHospital[][] = [];
  for (let i = 0; i < items.length; i += 2) mobilePages.push(items.slice(i, i + 2));
  const [mobileSwiper, setMobileSwiper] = useState<SwiperType | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  // Avoid SSR/CSR markup mismatch by rendering Swiper only on client after mount
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 mt-16 mb-6">
      <div className="rounded-2xl bg-white flex w-full max-w-[1200px] flex-col items-start gap-6 sm:gap-8">
        <div className="relative flex items-center justify-between self-stretch rounded-[8px] bg-gradient-to-r from-[#007BFF] to-[#004A99] backdrop-blur-[5px] min-h-[63px] pl-4">
          <p className="text-white" style={{ fontFamily: "Inter", fontSize: 18, fontWeight: 500, lineHeight: "140%", letterSpacing: "-1.08px" }}>
            {t("title")}
          </p>
          <div className="flex-shrink-0 h-[63px] flex items-center">
            {/* Using img for SVG to avoid Next.js Image warnings */}
            <img src="/svgs/history-list.svg" alt={t("historyIconAlt") || "Lịch sử tìm kiếm"} className="w-auto h-full" loading="lazy" />
          </div>
        </div>

        {/* Mobile-only: show 2 cards per slide, each on its own row */}
        <div className="block sm:hidden w-full">
          {isMounted && (
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            onSwiper={(s) => setMobileSwiper(s)}
            onSlideChange={(s) => setMobileActiveIndex(s.activeIndex)}
            className="w-full pb-4"
          >
            {mobilePages.map((page, idx) => (
              <SwiperSlide key={`m-${idx}`} className="w-full">
                <div className="grid grid-cols-1 gap-3">
                  {page.map((h) => (
                    <HospitalMiniCard key={h.id} hospital={h} />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          )}
          <div className="mt-3 w-full flex items-center justify-center gap-2">
            {mobilePages.map((_, i) => (
              <button
                key={`m-dot-${i}`}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => mobileSwiper?.slideTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${mobileActiveIndex === i ? 'bg-[#047DFF]' : 'bg-slate-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Tablet/Desktop: original 6-per-page grid */}
        <div className="hidden sm:block w-full">
          {isMounted && (
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            onSwiper={(s) => setSwiper(s)}
            onSlideChange={(s) => setActiveIndex(s.activeIndex)}
            className="w-full pb-6"
          >
            {pages.map((page, idx) => (
              <SwiperSlide key={idx} className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
                  {page.map((h) => (
                    <HospitalMiniCard key={h.id} hospital={h} />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          )}
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
      </div>
    </section>
  );
}
