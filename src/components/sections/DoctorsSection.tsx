'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import type { SectionComponentProps } from "@/lib/componentRegistry";
import { useEffect, useRef, useState } from 'react';

export default function DoctorsSection({ theme }: SectionComponentProps) {
  const doctors = [
    { name: 'PGS Trần Hoài Nam', dept: 'Khoa cấp cứu', img: '/imgs/bacsi-avatar.png', desc: 'Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương – khớp phức tạp.' },
    { name: 'PGS Phạm Thu Hà', dept: 'Khoa cấp cứu', img: '/imgs/bacsi-avatar.png', desc: 'Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương – khớp phức tạp.' },
    { name: 'BS Nguyễn Minh Khoa', dept: 'Khoa tim mạch', img: '/imgs/bacsi-avatar.png', desc: 'Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương – khớp phức tạp.' },
    { name: 'BS Lê Hồng Sơn', dept: 'Khoa hô hấp', img: '/imgs/bacsi-avatar.png', desc: 'Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương – khớp phức tạp.' },
    { name: 'BS Trần Hải Yến', dept: 'Khoa tiêu hoá', img: '/imgs/bacsi-avatar.png', desc: 'Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương – khớp phức tạp.' },
    { name: 'BS Phạm Quang Vũ', dept: 'Khoa ngoại', img: '/imgs/bacsi-avatar.png', desc: 'Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương – khớp phức tạp.' },
  ];

  const gradientFrom = theme?.gradientFrom || '#A9D6FF';
  const gradientTo = theme?.gradientTo || '#6CB2FF';

  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [maxCardHeight, setMaxCardHeight] = useState<number | null>(null);

  useEffect(() => {
    function measure() {
      const h = Math.max(
        0,
        ...cardRefs.current.map((el) => (el ? el.offsetHeight : 0))
      );
      setMaxCardHeight(h || null);
    }
    measure();
    const id = setTimeout(measure, 0);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', measure);
    };
  }, [doctors.length]);

  return (
    <section className="mt-16">
      <div className="mx-auto w-full max-w-[1200px]">
        <h3 className="text-center text-[#1B3C74] font-inter text-[28px] md:text-[32px] font-semibold mb-6">Đội ngũ bác sĩ</h3>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          breakpoints={{
            1024: { spaceBetween: 30 },
          }}
          slidesPerView={'auto'}
          observer
          observeParents
          watchOverflow
        >
          {doctors.map((d, idx) => (
            <SwiperSlide key={idx} className="!w-auto">
              {/* Outer card */}
              <div
                ref={(el) => {
                  if (el) cardRefs.current[idx] = el;
                }}
                className="flex w-[380px] min-w-[380px] max-w-[380px] p-[35px] pt-[35px] pb-[35px] px-[30px] items-start gap-[10px] rounded-[30px]"
                style={{
                  background: 'rgba(251, 247, 210, 0.30)',
                  height: maxCardHeight ? `${maxCardHeight}px` : undefined,
                }}
              >
                {/* Inner column */}
                <div className="flex flex-col items-center gap-[15px] flex-[1_0_0] h-full">
                  {/* Doctor image */}
                  <div className="w-[260px] h-[260px] rounded-full bg-gradient-to-b from-white to-[#CFE6FF] p-2 shadow-sm">
                    <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center" style={{ background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})` }}>
                      <Image src={d.img} alt={d.name} width={240} height={240} className="rounded-full object-cover" />
                    </div>
                  </div>
                  {/* Text block */}
                  <div className="flex flex-col items-center gap-[18px] self-stretch flex-1">
                    <div className="flex flex-col items-start gap-2 self-stretch">
                      <div className="self-stretch text-center" style={{ color: '#2677BC', fontFamily: 'Inter', fontSize: 32, fontWeight: 700, lineHeight: 'normal' }}>
                        {d.name}
                      </div>
                      <div className="self-stretch text-center" style={{ color: '#FA843A', fontFamily: 'Inter', fontSize: 24, fontWeight: 400, lineHeight: 'normal' }}>
                        {d.dept}
                      </div>
                    </div>
                    <div className="text-center flex-[1_0_0]" style={{ color: '#5B5B5B', fontFamily: 'Inter', fontSize: 18, fontWeight: 400, lineHeight: 'normal' }}>
                      {d.desc}
                    </div>
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

