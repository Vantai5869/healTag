"use client";
import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import HospitalMiniCard from "@/components/pages/home/HospitalMiniCard";
import type { MiniHospital } from "@/components/pages/home/HospitalMiniCard";
import { SAMPLE_HOSPITALS } from "@/lib/hospitalSamples";

interface HospitalsStyledSectionProps {
  searchValue?: string;
}

export default function HospitalsStyledSection({ searchValue = '' }: HospitalsStyledSectionProps) {
  const t = useTranslations("Home.hospitals");
  
  const filteredItems = useMemo(() => {
    if (!searchValue.trim()) {
      return SAMPLE_HOSPITALS;
    }
    const query = searchValue.trim().toLowerCase();
    return SAMPLE_HOSPITALS.filter(h => 
      h.name.toLowerCase().includes(query)
    );
  }, [searchValue]);
  
  const mobilePages: MiniHospital[][] = [];
  for (let i = 0; i < filteredItems.length; i += 2) {
    mobilePages.push(filteredItems.slice(i, i + 2));
  }
  
  const desktopPages: MiniHospital[][] = [];
  for (let i = 0; i < filteredItems.length; i += 6) {
    desktopPages.push(filteredItems.slice(i, i + 6));
  }
  
  const [mobileSwiper, setMobileSwiper] = useState<SwiperType | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopSwiper, setDesktopSwiper] = useState<SwiperType | null>(null);
  const [desktopIndex, setDesktopIndex] = useState(0);

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 mt-16 mb-6">
      <div className="rounded-2xl bg-white flex flex-col gap-6 sm:gap-8">
        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-[#007BFF] to-[#004A99] min-h-[56px] px-4">
          <p className="text-white text-lg font-medium">{t("title")}</p>
          <img 
            src="/svgs/history-list.svg" 
            alt={t("historyIconAlt") || "Lịch sử tìm kiếm"} 
            className="h-6 w-auto" 
            loading="lazy" 
          />
        </div>

        <div className="block sm:hidden">
          <Swiper
            spaceBetween={12}
            slidesPerView={1}
            onSwiper={setMobileSwiper}
            onSlideChange={(s) => setMobileIndex(s.activeIndex)}
            className="w-full"
          >
            {mobilePages.map((page, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col gap-3">
                  {page.map((h) => (
                    <HospitalMiniCard key={h.id} hospital={h} />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center gap-2 mt-4">
            {mobilePages.map((_, i) => (
              <button
                key={i}
                onClick={() => mobileSwiper?.slideTo(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  mobileIndex === i ? 'bg-[#007BFF]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="hidden sm:block">
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            onSwiper={setDesktopSwiper}
            onSlideChange={(s) => setDesktopIndex(s.activeIndex)}
            className="w-full"
          >
            {desktopPages.map((page, idx) => (
              <SwiperSlide key={idx}>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                  {page.map((h) => (
                    <HospitalMiniCard key={h.id} hospital={h} />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center gap-2 mt-4">
            {desktopPages.map((_, i) => (
              <button
                key={i}
                onClick={() => desktopSwiper?.slideTo(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  desktopIndex === i ? 'bg-[#007BFF]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
