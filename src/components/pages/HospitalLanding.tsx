'use client';
import Image from "next/image";
import type { HospitalVariantConfig } from "@/lib/hospitals";
import { Ambulance, Building2, FlaskConical, Pill, Stethoscope, HeartPulse, ShieldPlus, ActivitySquare } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import HospitalTitleBar from "./HospitalTitleBar";
import HospitalContactCard from "./HospitalContactCard";

export default function HospitalLanding({ config }: { config: HospitalVariantConfig }) {
  const doctorImages = ['/imgs/bacsi1-1.png', '/imgs/bacsi1-2.png', '/imgs/bacsi1-3.png'];
  const doctors = [
    { name: 'PGS Trần Hoài Nam', dept: 'Khoa cấp cứu', img: doctorImages[0] },
    { name: 'PGS Phạm Thu Hà', dept: 'Khoa cấp cứu', img: doctorImages[1] },
    { name: 'BS Nguyễn Minh Khoa', dept: 'Khoa tim mạch', img: doctorImages[2] },
    { name: 'BS Lê Hồng Sơn', dept: 'Khoa hô hấp', img: doctorImages[0] },
    { name: 'BS Trần Hải Yến', dept: 'Khoa tiêu hoá', img: doctorImages[1] },
    { name: 'BS Phạm Quang Vũ', dept: 'Khoa ngoại', img: doctorImages[2] },
  ];

  const [activeNewsTab, setActiveNewsTab] = useState<'latest' | 'training' | 'common'>('latest');
  const [doctorActive, setDoctorActive] = useState(0);
  const [doctorSwiper, setDoctorSwiper] = useState<SwiperType | null>(null);
  const [newsActive, setNewsActive] = useState(0);
  const [newsSwiper, setNewsSwiper] = useState<SwiperType | null>(null);
  const newsByTab: Record<string, string[]> = {
    latest: ['/imgs/tintuc1-1.png', '/imgs/tintuc1-2.png', '/imgs/tintuc1-3.png', '/imgs/tintuc1-1.png', '/imgs/tintuc1-2.png', '/imgs/tintuc1-3.png'],
    training: ['/imgs/tintuc1-1.png', '/imgs/tintuc1-2.png', '/imgs/tintuc1-3.png', '/imgs/tintuc1-1.png', '/imgs/tintuc1-2.png', '/imgs/tintuc1-3.png'],
    common: ['/imgs/tintuc1-1.png', '/imgs/tintuc1-2.png', '/imgs/tintuc1-3.png', '/imgs/tintuc1-1.png', '/imgs/tintuc1-2.png', '/imgs/tintuc1-3.png'],
  };

  return (
    <div className="min-h-screen bg-[#FAFBFE] pt-6 md:pt-[50px] pb-[100px] px-2 sm:px-4 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Header section */}
        <HospitalTitleBar 
          hospitalName={config.name}
          gradientFrom="#3A8EF6"
          gradientTo="#6F3AFA"
        />
        {/* Section 2: Responsive Hero */}
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-between mt-8 gap-4 md:gap-10">
          {/* Left image */}
          <div className="w-full max-w-[487px] mb-6 md:mb-0">
            <Image 
              src="/imgs/doctor-banner.png" 
              alt="Doctor Banner" 
              width={487} 
              height={612} 
              priority 
              sizes="(max-width: 768px) 100vw, 487px"
              className="w-full h-auto"
              style={{ width: '100%', height: 'auto' }} 
            />
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
             <div
               className="grid w-full gap-4 sm:gap-5 md:gap-6"
               style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
             >
              {[
                { label: "Bác sĩ", icon: <Stethoscope className="h-12 w-12 text-[#3A8EF6]" /> },
                { label: "Phòng nghiên cứu", icon: <FlaskConical className="h-12 w-12 text-[#3A8EF6]" /> },
                { label: "Phòng khám", icon: <Building2 className="h-12 w-12 text-[#3A8EF6]" /> },
                { label: "Thuốc", icon: <Pill className="h-12 w-12 text-[#3A8EF6]" /> },
                { label: "Xe cứu thương", icon: <Ambulance className="h-12 w-12 text-[#3A8EF6]" /> },
              ].map((item) => (
                 <div key={item.label} className="flex h-[153px] flex-col items-center justify-center rounded-xl bg-[#F6F9FF]">
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
            <div
              className="w-full grid gap-4 sm:gap-5 md:gap-6 justify-items-stretch"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
            >
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
                <div key={item.label} className="flex w-full p-6 justify-between items-start rounded-[10px] bg-white shadow-[0_34px_44px_0_rgba(213,219,228,0.44)]">
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
      {/* Section 5: Doctors carousel - Swiper with stable sizing and preloading */}
      <section className="mt-16">
        <div className="mx-auto w-full max-w-[1438px]">
          <h3 className="text-center text-[#1B3C74] font-inter text-[28px] md:text-[32px] font-semibold mb-6">Đội ngũ bác sĩ</h3>
           <Swiper
             modules={[Pagination]}
             pagination={false}
            spaceBetween={0}
            slidesPerView={'auto'}
            loop={false}
             className="px-2 md:px-4"
             onSwiper={(s) => setDoctorSwiper(s)}
             onSlideChange={(s) => setDoctorActive(s.activeIndex)}
          >
            {doctors.map((d, idx) => (
              <SwiperSlide key={idx} className="!w-auto mr-[15px] last:mr-0">
                <div className="flex w-[370px] flex-col items-start gap-[15px]">
                  {/* Image wrapper with fixed box to avoid CLS */}
                  <div className="flex h-[414px] p-[10px] flex-col justify-center items-center self-stretch rounded-[250px_250px_8px_8px] bg-white shadow-[0_15px_55px_-10px_rgba(0,0,0,0.09)]">
                    <div className="relative w-[350px] h-[394px]">
                      <Image 
                        src={d.img} 
                        alt={d.name} 
                        fill 
                        className="object-contain" 
                        sizes="350px"
                        loading={idx < 2 ? "eager" : "lazy"}
                      />
                    </div>
                  </div>
                  {/* Text block */}
                  <div className="flex w-[370px] flex-col items-center gap-[1px]">
                    <div className="self-stretch text-[#1B3C74] text-center font-inter text-[24px] font-[400] leading-[48px]">
                      {d.name}
                    </div>
                    <div className="self-stretch text-[#3A8EF6] text-center font-inter text-[16px] font-[500] leading-[27px]">
                      {d.dept}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
           <div className="mt-5 flex items-center justify-center gap-2">
             {doctors.map((_, i) => (
               <button
                 key={i}
                 aria-label={`Go to slide ${i + 1}`}
                 onClick={() => doctorSwiper?.slideTo(i)}
                 className={`h-2.5 w-2.5 rounded-full transition-colors ${doctorActive === i ? 'bg-[#047DFF]' : 'bg-slate-300'}`}
               />
             ))}
           </div>
        </div>
      </section>

      {/* Section 6: News with tabs (responsive like dev) */}
      <section className="mt-16">
        <div className="mx-auto w-full max-w-[1200px] flex flex-col items-start gap-[46px]">
          {/* Header row */}
          <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h3 className="text-black font-inter text-[28px] sm:text-[32px] md:text-[40px] font-semibold leading-[38px] md:leading-[48px] whitespace-nowrap">Tin tức</h3>
            <div className="h-12 flex items-end justify-start md:justify-end gap-4 md:gap-[60px] w-full md:w-auto overflow-x-auto whitespace-nowrap">
              {[
                { key: 'latest', label: 'Tin tức mới nhất' },
                { key: 'training', label: 'Đào tạo, chỉ đạo' },
                { key: 'common', label: 'Y học thường thức' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveNewsTab(tab.key as 'latest' | 'training' | 'common')}
                  className={`shrink-0 flex flex-col items-center justify-end text-center transition-colors ${activeNewsTab === tab.key ? 'text-[#3A8EF6]' : 'text-black/60'}`}
                  style={{ fontFamily: 'Lexend', fontWeight: 600, lineHeight: activeNewsTab === tab.key ? '26px' : undefined, fontSize: activeNewsTab === tab.key ? 18 : undefined }}
                >
                  <span className="block text-[12px] leading-[15.416px] md:text-[18px] md:leading-[26px]">{tab.label}</span>
                  <span
                    className={`mt-2 hidden md:block h-[2px] w-[106.708px] ${activeNewsTab === tab.key ? 'bg-[#3A8EF6]' : 'bg-transparent'}`}
                    aria-hidden
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Slider - images only */}
          <Swiper
            key={activeNewsTab}
            modules={[Pagination]}
            pagination={false}
            spaceBetween={0}
            slidesPerView={'auto'}
            autoHeight={false}
            observer
            observeParents
            observeSlideChildren={false}
            resizeObserver
            className="w-full"
            onSwiper={(s) => setNewsSwiper(s)}
            onSlideChange={(s) => setNewsActive(s.activeIndex)}
            loop
          >
            {newsByTab[activeNewsTab].map((src, idx) => (
              <SwiperSlide key={idx} className="!w-auto mr-4 last:mr-0">
                <div className="relative w-[380px] h-[199.149px] overflow-hidden rounded-[12px] bg-white shadow-[0_12px_24px_-12px_rgba(0,0,0,0.12)]">
                  <Image 
                    src={src} 
                    alt={`news-${activeNewsTab}-${idx}`} 
                    fill 
                    className="object-cover" 
                    sizes="380px"
                    loading={idx < 2 ? "eager" : "lazy"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-5 w-full flex items-center justify-center gap-2">
            {newsByTab[activeNewsTab].map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => newsSwiper?.slideTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${newsActive === i ? 'bg-[#047DFF]' : 'bg-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Section 7: Hospital contact card */}
      <section className="mt-16">
        <HospitalContactCard hospitalName={config.name} />
      </section>
    </div>
  );
}



