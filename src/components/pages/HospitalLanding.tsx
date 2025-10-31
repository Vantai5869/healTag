'use client';
import Image from "next/image";
import type { HospitalVariantConfig } from "@/lib/hospitals";
import { Ambulance, Building2, FlaskConical, Pill, Stethoscope, HeartPulse, ShieldPlus, ActivitySquare } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';

export default function HospitalLanding({ config }: { config: HospitalVariantConfig }) {
  const doctors = [
    { name: 'PGS Trần Hoài Nam', dept: 'Khoa cấp cứu', img: '/imgs/bacsi-avatar.png' },
    { name: 'PGS Phạm Thu Hà', dept: 'Khoa cấp cứu', img: '/imgs/bacsi-avatar.png' },
    { name: 'BS Nguyễn Minh Khoa', dept: 'Khoa tim mạch', img: '/imgs/bacsi-avatar.png' },
    { name: 'BS Lê Hồng Sơn', dept: 'Khoa hô hấp', img: '/imgs/bacsi-avatar.png' },
    { name: 'BS Trần Hải Yến', dept: 'Khoa tiêu hoá', img: '/imgs/bacsi-avatar.png' },
    { name: 'BS Phạm Quang Vũ', dept: 'Khoa ngoại', img: '/imgs/bacsi-avatar.png' },
  ];

  const [activeNewsTab, setActiveNewsTab] = useState<'latest' | 'training' | 'common'>('latest');
  const newsByTab: Record<string, string[]> = {
    latest: ['/imgs/banner-art.png', '/imgs/banner-art.png', '/imgs/banner-art.png', '/imgs/banner-art.png', '/imgs/banner-art.png', '/imgs/banner-art.png'],
    training: ['/imgs/banner-art.png', '/imgs/banner-art.png', '/imgs/banner-art.png', '/imgs/banner-art.png', '/imgs/banner-art.png', '/imgs/banner-art.png'],
    common: ['/imgs/banner-art.png', '/imgs/banner-art.png', '/imgs/banner-art.png', '/imgs/banner-art.png', '/imgs/banner-art.png', '/imgs/banner-art.png'],
  };

  return (
    <div className="min-h-screen bg-[#FAFBFE] pt-6 md:pt-[50px] pb-[100px] px-2 sm:px-4 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Header section */}
        <div className="flex items-center w-full pr-0 rounded-lg bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] backdrop-blur-sm">
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
        {/* Section 2: Responsive Hero */}
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-between mt-8 gap-4 md:gap-10">
          {/* Left image */}
          <div className="w-full max-w-[487px] mb-6 md:mb-0">
            <Image src="/imgs/doctor-banner.png" alt="Doctor Banner" width={487} height={612} priority style={{ width: '100%', height: 'auto' }} />
          </div>
          {/* Right content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8 md:gap-10 w-full md:w-auto">
            {/* Text block */}
            <div className="flex flex-col gap-4 w-full max-w-[666px]">
              <h1 className="font-inter font-bold text-[2rem] md:text-[40px] leading-normal bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] bg-clip-text text-transparent w-full">
                Chào mừng đến với trang bệnh viện!
              </h1>
              <p className="font-poppins text-[#6C87AE] text-[15.4px] font-medium max-w-[655px] mx-auto md:mx-0 w-full">
                Mô tả ngắn về bệnh viện, dịch vụ, sứ mệnh, thông điệp và cam kết phục vụ sức khỏe cộng đồng.
              </p>
            </div>
            {/* Button block */}
            <button className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] shadow-lg mx-auto md:mx-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-white font-inter text-[17px] font-bold leading-8 tracking-[-0.6px]">
                Đặt lịch khám ngay
              </span>
            </button>
          </div>
        </div>
        {/* Section 3: Services */}
        <section className="mt-16">
          <div className="mx-auto w-full max-w-[1200px] flex flex-col items-center gap-[31px] rounded-lg bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.10)] p-6">
            <h3 className="self-stretch text-center text-[#102851] font-inter text-[20px] font-medium leading-none tracking-[0.4px]">
              Dịch vụ chúng tôi cung cấp
            </h3>
            <div className="flex w-full items-center justify-between">
              {[
                { label: "Bác sĩ", icon: <Stethoscope className="h-12 w-12 text-[#3A8EF6]" /> },
                { label: "Phòng nghiên cứu", icon: <FlaskConical className="h-12 w-12 text-[#3A8EF6]" /> },
                { label: "Phòng khám", icon: <Building2 className="h-12 w-12 text-[#3A8EF6]" /> },
                { label: "Thuốc", icon: <Pill className="h-12 w-12 text-[#3A8EF6]" /> },
                { label: "Xe cứu thương", icon: <Ambulance className="h-12 w-12 text-[#3A8EF6]" /> },
              ].map((item) => (
                <div key={item.label} className="flex w-[203px] h-[153px] flex-col items-center justify-center rounded-xl bg-[#F6F9FF]">
                  {item.icon}
                  <span className="mt-4 text-center text-[#ABB6C7] font-inter text-[18px] font-normal leading-none tracking-[0.36px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Section 4: Featured departments */}
        <section className="mt-16">
          <div className="mx-auto w-full max-w-[1200px] flex flex-col items-center gap-[46px] rounded-none bg-[#EFF6FE] p-6">
            <h3 className="self-stretch text-center text-[#1B3C74] font-inter text-[32px] font-semibold leading-[67px] capitalize">
              Chuyên khoa nổi bật
            </h3>
            <div className="flex w-full flex-wrap items-start justify-between gap-6">
              {[
                { label: "Trung tâm cấp cứu A9", icon: <Building2 className="h-14 w-14 text-[#3A8EF6]" /> },
                { label: "Trung tâm Phẫu thuật tiêu hoá", icon: <Stethoscope className="h-14 w-14 text-[#3A8EF6]" /> },
                { label: "Trung tâm hô hấp", icon: <HeartPulse className="h-14 w-14 text-[#3A8EF6]" /> },
                { label: "Trung tâm hồi sức tích cực", icon: <ActivitySquare className="h-14 w-14 text-[#3A8EF6]" /> },
                { label: "Trung tâm huyết học và truyền máu", icon: <FlaskConical className="h-14 w-14 text-[#3A8EF6]" /> },
                { label: "Trung tâm an toàn", icon: <ShieldPlus className="h-14 w-14 text-[#3A8EF6]" /> },
                { label: "Trung tâm phẫu thuật", icon: <Building2 className="h-14 w-14 text-[#3A8EF6]" /> },
                { label: "Trung tâm xương khớp", icon: <ActivitySquare className="h-14 w-14 text-[#3A8EF6]" /> },
              ].map((item) => (
                <div key={item.label} className="flex w-[270px] p-6 justify-between items-start rounded-[10px] bg-white shadow-[0_34px_44px_0_rgba(213,219,228,0.44)]">
                  <div className="flex h-[136px] flex-col items-center gap-2 mx-auto">
                    {item.icon}
                    <span className="w-[121px] h-[36px] shrink-0 text-center text-[#ABB6C7] font-inter text-[14px] font-medium leading-[22px]">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* Section 5: Doctors carousel - full width up to 1438px */}
      <section className="mt-16">
        <div className="mx-auto w-full max-w-[1438px]">
          <h3 className="text-center text-[#1B3C74] font-inter text-[28px] md:text-[32px] font-semibold mb-6">Đội ngũ bác sĩ</h3>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {doctors.map((d, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col items-center">
                  <div className="w-[260px] h-[260px] rounded-full bg-gradient-to-b from-white to-[#CFE6FF] p-2 shadow-sm">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#A9D6FF] to-[#6CB2FF] flex items-center justify-center">
                      <Image src={d.img} alt={d.name} width={240} height={240} className="rounded-full object-cover" />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-[#1B3C74] font-medium">{d.name}</div>
                    <div className="text-[#3A8EF6] text-sm mt-1">{d.dept}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Section 6: News with tabs (moved below doctors) */}
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
                  className={`w-[218.329px] text-center font-[Lexend] text-[18px] leading-[26px] font-semibold transition-colors ${activeNewsTab === tab.key ? 'text-[#3A8EF6]' : 'text-black/60'}`}
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
              <SwiperSlide key={idx}>
                <div className="rounded-2xl overflow-hidden bg-white shadow-md w-full">
                  <div className="relative w-full aspect-[16/9] min-w-0">
                    <Image src={src} alt={`news-${activeNewsTab}-${idx}`} fill className="object-cover" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}


