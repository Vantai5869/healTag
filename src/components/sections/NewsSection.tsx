'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';
import type { SectionComponentProps } from "@/lib/componentRegistry";

export default function NewsSection({ theme }: SectionComponentProps) {
  const [activeNewsTab, setActiveNewsTab] = useState<'latest' | 'training' | 'common'>('latest');
  const newsByTab: Record<string, string[]> = {
    latest: ['/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png'],
    training: ['/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png'],
    common: ['/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png'],
  };

  const primaryColor = theme?.primaryColor || '#3A8EF6';

  return (
    <section className="mt-16">
      <div className="mx-auto w-full max-w-[1200px] flex flex-col items-start gap-[46px]">
        {/* Header row */}
        <div className="flex w-full items-center justify-between">
          <h3 className="w-[428.718px] text-black font-inter text-[40px] font-semibold leading-[48px]">Tin tức</h3>
          <div className="w-[565px] h-8 flex items-center justify-end gap-6">
            {[
              { key: 'latest', label: 'Tin tức mới nhất' },
              { key: 'training', label: 'Đào tạo, chỉ đạo' },
              { key: 'common', label: 'Y học thường thức' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveNewsTab(tab.key as any)}
                className={`w-[218.329px] text-center font-[Lexend] text-[18px] leading-[26px] font-semibold transition-colors ${activeNewsTab === tab.key ? '' : 'text-black/60'}`}
                style={activeNewsTab === tab.key ? { color: primaryColor } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Slider */}
        <Swiper
          key={activeNewsTab}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          autoHeight={false}
          observer={true}
          observeParents={true}
          observeSlideChildren={false}
          resizeObserver={true}
          className="w-full [&_.swiper-pagination]:mt-6"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          loop
        >
          {newsByTab[activeNewsTab].map((src, idx) => (
            <SwiperSlide key={idx} className="!w-auto">
              <div
                className="flex w-[390px] h-[342.557px] min-w-[209.072px] flex-col items-start rounded-[12.866px] bg-[#FAFDFF] shadow-[0_40.206px_40.206px_-40.206px_rgba(0,0,0,0.10)] overflow-hidden"
              >
                {/* Image top */}
                <div className="relative w-full h-[190px] min-w-0">
                  <Image src={src} alt={`news-${activeNewsTab}-${idx}`} fill className="object-cover" />
                </div>
                {/* Text block */}
                <div className="flex flex-col items-start gap-2 p-3">
                  <div
                    className="text-[18px] font-medium leading-[150%] text-[#072831] text-ellipsis overflow-hidden"
                    style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical' as any, WebkitLineClamp: 1 }}
                  >
                    Tiêu đề bài viết mẫu {idx + 1}
                  </div>
                  <div
                    className="text-[12px] font-normal leading-[150%] text-[#09333F] text-ellipsis overflow-hidden w-[257.32px]"
                    style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical' as any, WebkitLineClamp: 2 }}
                  >
                    Mô tả ngắn của bài viết. Nội dung mô tả sẽ bị cắt dòng sau 2 dòng để đảm bảo bố cục gọn gàng theo thiết kế.
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

