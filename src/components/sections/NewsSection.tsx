'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useRef, useState } from 'react';

export default function NewsSection() {
  const [activeNewsTab, setActiveNewsTab] = useState<'latest' | 'training' | 'common'>('latest');
  const rootRef = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    function measure() {
      const el = rootRef.current;
      const w = el?.offsetWidth || 0;
      const forced = el?.closest('.force-stack');
      setIsNarrow(!!forced || (w > 0 && w < 768));
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (rootRef.current) ro.observe(rootRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);
  const newsByTab: Record<string, string[]> = {
    latest: ['/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png'],
    training: ['/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png'],
    common: ['/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png', '/imgs/tin-tuc.png'],
  };


  return (
    <section className="mt-16">
      <div ref={rootRef} className="mx-auto w-full max-w-[1200px] flex flex-col items-start gap-[46px]">
        {/* Header row */}
        <div className={`flex w-full ${isNarrow ? 'flex-col' : 'flex-row items-center justify-between'} gap-3`}>
          <h3 className={`text-black font-inter ${isNarrow ? 'text-[28px] leading-[38px]' : 'text-[40px] leading-[48px]'} font-semibold whitespace-nowrap`}>Tin tức</h3>
          <div className={`h-8 flex items-center ${isNarrow ? 'justify-start' : 'justify-end'} gap-4 md:gap-6 w-full md:w-auto overflow-x-auto whitespace-nowrap`}>
            {[
              { key: 'latest', label: 'Tin tức mới nhất' },
              { key: 'training', label: 'Đào tạo, chỉ đạo' },
              { key: 'common', label: 'Y học thường thức' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveNewsTab(tab.key as 'latest' | 'training' | 'common')}
                className={`shrink-0 ${isNarrow ? 'w-[103px]' : 'w-[218.329px]'} text-center font-semibold transition-colors ${activeNewsTab === tab.key ? 'text-[#017450]' : 'text-black/60'}`}
                style={{ fontFamily: 'Lexend', fontWeight: 600 }}
              >
                <span className={`block ${isNarrow ? 'text-[12px] leading-[15.416px]' : 'text-[18px] leading-[26px]'}`}>
                {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* Slider */}
        <Swiper
          key={activeNewsTab}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={'auto'}
          autoHeight={false}
          observer
          observeParents
          observeSlideChildren={false}
          resizeObserver
          className="w-full [&_.swiper-pagination]:mt-6"
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
                    style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}
                  >
                    Tiêu đề bài viết mẫu {idx + 1}
                  </div>
                  <div
                    className="text-[12px] font-normal leading-[150%] text-[#09333F] text-ellipsis overflow-hidden w-[257.32px]"
                    style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}
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

