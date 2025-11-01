'use client';
import Image from "next/image";
import type { HospitalVariantConfig } from "@/lib/hospitals";
import HospitalTitleBar from "./HospitalTitleBar";
import { Building2, Calendar, ClipboardList, Stethoscope, Heart, Hospital, FlaskConical, type LucideIcon } from "lucide-react";
import HospitalContactCard from "./HospitalContactCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';

interface SpecializedUnit {
  name: string;
  icon: LucideIcon;
}

const specializedUnits: SpecializedUnit[] = [
  { name: 'Trung tâm cấp cứu A9', icon: Building2 },
  { name: 'Trung tâm hô hấp', icon: Calendar },
  { name: 'Trung tâm hồi sức tích cực', icon: ClipboardList },
  { name: 'Trung tâm Phẫu thuật tiêu hoá', icon: Stethoscope },
];

interface StatCard {
  icon: LucideIcon;
  iconColor: string;
  number: string;
  label: string;
}

const statCards: StatCard[] = [
  { icon: Heart, iconColor: '#3A8EF6', number: '5000+', label: 'Hoạt động' },
  { icon: Hospital, iconColor: '#EF4444', number: '200+', label: 'Cơ sở' },
  { icon: FlaskConical, iconColor: '#F59E0B', number: '1000+', label: 'Labs' },
  { icon: Stethoscope, iconColor: '#10B981', number: '700+', label: 'Bác sĩ' },
];

const appointmentFeatures = [
  'Xác nhận lịch khám ngay sau khi đăng ký',
  'Nhận thông báo nhắc lịch qua Hệ thống / SMS / Email',
  'Chọn bác sĩ, chuyên khoa và giờ khám mong muốn',
  'Giảm thời gian chờ đợi, ưu tiên tiếp đón nhanh',
];

interface Doctor {
  name: string;
  specialty: string;
  description: string;
  image: string;
}

interface News {
  title: string;
  description: string;
  image: string;
}

const doctors: Doctor[] = [
  {
    name: 'PGS Phạm Thu Hà',
    specialty: 'Khoa cấp cứu',
    description: 'Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương - khớp phức tạp.',
    image: '/imgs/bacsi2-1.png'
  },
  {
    name: 'PGS Phạm Thu Hà',
    specialty: 'Khoa cấp cứu',
    description: 'Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương - khớp phức tạp.',
    image: '/imgs/bacsi2-2.png'
  },
  {
    name: 'PGS Trần Hoài Nam',
    specialty: 'Khoa cấp cứu',
    description: 'Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương - khớp phức tạp.',
    image: '/imgs/bacsi2-3.png'
  },
  {
    name: 'PGS Phạm Thu Hà',
    specialty: 'Khoa cấp cứu',
    description: 'Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương - khớp phức tạp.',
    image: '/imgs/bacsi2-1.png'
  },
  {
    name: 'PGS Phạm Thu Hà',
    specialty: 'Khoa cấp cứu',
    description: 'Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương - khớp phức tạp.',
    image: '/imgs/bacsi2-2.png'
  },
  {
    name: 'PGS Trần Hoài Nam',
    specialty: 'Khoa cấp cứu',
    description: 'Hơn 20 năm trong lĩnh vực điều trị các bệnh lý cơ – xương - khớp phức tạp.',
    image: '/imgs/bacsi2-3.png'
  },
];

const newsItems: News[] = [
  {
    title: 'Tin tức y tế mới nhất về các phương pháp điều trị hiện đại',
    description: 'Cập nhật những thông tin mới nhất về các phương pháp điều trị và công nghệ y tế tiên tiến.',
    image: '/imgs/tintuc2-1.png'
  },
  {
    title: 'Hướng dẫn chăm sóc sức khỏe tại nhà hiệu quả',
    description: 'Những mẹo vặt và phương pháp chăm sóc sức khỏe đơn giản nhưng hiệu quả cho cả gia đình.',
    image: '/imgs/tintuc2-2.png'
  },
  {
    title: 'Chương trình khám sức khỏe miễn phí cho cộng đồng',
    description: 'Thông tin về các chương trình khám sức khỏe định kỳ và tư vấn miễn phí cho người dân.',
    image: '/imgs/tintuc2-3.png'
  },
  {
    title: 'Tin tức y tế mới nhất về các phương pháp điều trị hiện đại',
    description: 'Cập nhật những thông tin mới nhất về các phương pháp điều trị và công nghệ y tế tiên tiến.',
    image: '/imgs/tintuc2-1.png'
  },
  {
    title: 'Hướng dẫn chăm sóc sức khỏe tại nhà hiệu quả',
    description: 'Những mẹo vặt và phương pháp chăm sóc sức khỏe đơn giản nhưng hiệu quả cho cả gia đình.',
    image: '/imgs/tintuc2-2.png'
  },
  {
    title: 'Chương trình khám sức khỏe miễn phí cho cộng đồng',
    description: 'Thông tin về các chương trình khám sức khỏe định kỳ và tư vấn miễn phí cho người dân.',
    image: '/imgs/tintuc2-3.png'
  },
];

export default function HospitalLanding2({ config }: { config: HospitalVariantConfig }) {

  if (!config) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-16 bg-[#FFFFF9] pb-[100px] px-2 sm:px-4 md:px-8 w-full max-w-[1512px] mx-auto">
      {/* Header section */}
      <div className="flex flex-col items-start gap-8 w-full max-w-[1200px] mt-6 md:mt-[50px]">
        {/* Title bar */}
        <HospitalTitleBar 
          hospitalName={config.name}
          gradientFrom="#FFBF2A"
          gradientTo="#FA843A"
        />

        {/* Hero section: Image left, Text right */}
        <div className="flex flex-col md:flex-row items-center w-full max-w-[1200px] gap-8 md:gap-[74px]">
          {/* Left: Image */}
          <div className="flex-shrink-0 w-full md:flex-1" style={{ minWidth: 'min(300px, 100%)', maxWidth: '540px' }}>
            <Image 
              src="/imgs/banner2-art.png" 
              alt="Doctor Banner" 
              width={487} 
              height={612} 
              priority 
              sizes="(max-width: 768px) 100vw, min(540px, 40vw)"
              className="w-full h-auto" 
            />
          </div>

          {/* Right: Text block */}
          <div className="flex flex-col gap-4 md:gap-6 w-full md:flex-1 md:max-w-[585.949px] min-w-0 overflow-hidden">
            {/* Text 1: Uppercase */}
            <div className="text-[#FFBF2A] font-inter text-sm md:text-base font-semibold leading-[27px] uppercase break-words" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
              ĐẶT LỊCH DỄ DÀNG – TIẾP NHẬN NHANH CHÓNG – KHÁM ĐÚNG BÁC SĨ
            </div>

            {/* Text 2: Large title */}
            <div className="break-words" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
              <span className="text-[#1B3C74] font-inter text-[32px] md:text-[48px] font-semibold leading-[40px] md:leading-[67px]">
                Patient
              </span>
              <span className="text-[#FFBF2A] font-inter text-[32px] md:text-[48px] font-semibold leading-[40px] md:leading-[67px]">
                {' '}Caring
              </span>
            </div>

            {/* Text 3: Description */}
            <p className="text-[#77829D] font-inter text-[15px] md:text-[17px] font-medium leading-[24px] md:leading-[29px] break-words" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
              Hệ thống đặt lịch khám bệnh thông minh giúp bạn tiết kiệm thời gian, tránh chờ đợi và được khám đúng với bác sĩ chuyên khoa mong muốn. Với quy trình tiếp nhận nhanh chóng và chuyên nghiệp, chúng tôi cam kết mang đến trải nghiệm chăm sóc sức khỏe tốt nhất cho bạn.
            </p>

            {/* Text 4-6: Bullet points */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 md:gap-3 min-w-0">
                <Image 
                  src="/svgs/checked.svg" 
                  alt="Check" 
                  width={24} 
                  height={24} 
                  className="mt-1 flex-shrink-0"
                  sizes="24px"
                />
                <p className="text-[#1B3C74] font-inter text-base md:text-lg font-medium leading-[24px] md:leading-[27px] break-words min-w-0 flex-1" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                  Đặt lịch trực tuyến: qua website hoặc ứng dụng của bệnh viện.
                </p>
              </div>
              <div className="flex items-start gap-2 md:gap-3 min-w-0">
                <Image 
                  src="/svgs/checked.svg" 
                  alt="Check" 
                  width={24} 
                  height={24} 
                  className="mt-1 flex-shrink-0"
                  sizes="24px"
                />
                <p className="text-[#1B3C74] font-inter text-base md:text-lg font-medium leading-[24px] md:leading-[27px] break-words min-w-0 flex-1" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                  Qua tổng đài: gọi 0989 989 899 để được nhân viên hỗ trợ.
                </p>
              </div>
              <div className="flex items-start gap-2 md:gap-3 min-w-0">
                <Image 
                  src="/svgs/checked.svg" 
                  alt="Check" 
                  width={24} 
                  height={24} 
                  className="mt-1 flex-shrink-0"
                  sizes="24px"
                />
                <p className="text-[#1B3C74] font-inter text-base md:text-lg font-medium leading-[24px] md:leading-[27px] break-words min-w-0 flex-1" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                  Trực tiếp tại quầy hướng dẫn.
                </p>
              </div>
            </div>

            {/* Button */}
            <button className="flex items-center justify-center gap-2.5 px-7 py-2.5 rounded-md bg-[#FFBF2A] mt-4 md:mt-auto w-full md:w-auto max-w-[163px]">
              <span className="text-white font-inter text-base font-bold leading-[21px]">
                Đặt lịch khám
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Specialized Units Section */}
      <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-[1170px] px-4 sm:px-6 md:px-12 py-6 bg-[#FBF7D2] gap-6 md:gap-8">
        {/* Left: Text block */}
        <div className="flex flex-col items-start gap-4 md:gap-6 w-full md:flex-1 flex-shrink-0 pt-0 md:pt-[65px]" style={{ maxWidth: '449px' }}>
          <h2 className="text-[#141416] font-inter text-[28px] sm:text-[32px] md:text-[40px] font-bold leading-[40px] sm:leading-[48px] md:leading-[60px] tracking-[-0.4px] break-words">
            Đơn vị chuyên khoa
          </h2>
          <p className="w-full text-[#353945] font-inter text-sm sm:text-base md:text-[18px] font-normal leading-[24px] sm:leading-[28px] md:leading-[32px] break-words" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
            Chăm sóc sức khỏe toàn diện cho gia đình bạn. Không cần xếp hàng chờ đợi, Hệ thống hỗ trợ đặt lịch khám theo chuyên khoa, bác sĩ hoặc khung giờ mong muốn – giúp bạn chủ động sắp xếp thời gian và được tiếp đón chu đáo khi đến bệnh viện.
          </p>
          <button className="flex items-center justify-center gap-2.5 px-7 py-2.5 rounded-md bg-[#FFBF2A] w-full md:w-auto" style={{ maxWidth: '163px' }}>
            <span className="text-white font-inter text-base font-bold leading-[21px]">
              Đặt lịch khám
            </span>
          </button>
        </div>

        {/* Right: Image with Cards overlay */}
        <div className="flex flex-col items-start gap-4 md:gap-[21.338px] w-full md:flex-1 relative flex-shrink-0 min-w-0" style={{ maxWidth: '490.771px' }}>
          {/* Background art image */}
          <div className="absolute inset-0 w-full z-0 overflow-visible" style={{ minHeight: '300px', maxHeight: '500px' }}>
            <Image 
              src="/svgs/illustration-langd2.svg" 
              alt="Background Art" 
              width={490} 
              height={400} 
              className="object-contain w-full h-full"
              sizes="(max-width: 768px) 100vw, 490px"
              priority
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </div>

          {/* Cards container */}
          <div className="relative z-10 w-full flex flex-col gap-2 sm:gap-3 md:gap-[13.336px] p-3 sm:p-4 md:p-[48.01px] rounded-t-[16px] md:rounded-t-[32.007px] bg-white min-w-0" style={{ marginTop: 'clamp(120px, 25vw, 205px)' }}>
            {specializedUnits.map((unit, index) => {
              const IconComponent = unit.icon;
              return (
                <div 
                  key={index}
                  className="flex flex-col justify-center items-center gap-2 md:gap-[13.337px] p-2 sm:p-2.5 md:p-[12px_24px] rounded-[10px] md:rounded-[13.337px] border border-[#D3D3D3] bg-white shadow-[0_5.335px_13.337px_0_rgba(15,15,15,0.12)] w-full min-w-0"
                >
                  <div className="flex w-full justify-between items-center gap-1.5 sm:gap-2" style={{ minHeight: 'auto' }}>
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-[13.337px] min-w-0 flex-1">
                      <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 rounded" style={{ background: '#F0F5FF' }}>
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-[#3A8EF6]" />
                      </div>
                      <div className="flex flex-col items-start gap-0.5 md:gap-[6.668px] min-w-0 flex-1">
                        <span className="text-black font-inter text-[11px] sm:text-xs md:text-sm lg:text-base font-medium leading-tight break-words" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                          {unit.name}
                        </span>
                      </div>
                    </div>
                    <button className="flex items-center justify-center flex-shrink-0 rounded px-1.5 sm:px-2" style={{ minWidth: '50px', height: '22px', background: '#FEE9DD' }}>
                      <span className="text-[#FA8F54] font-inter text-[8px] sm:text-[9px] md:text-[10px] font-medium leading-normal whitespace-nowrap">
                        Xem ngay
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats and Appointment Section */}
      <div className="flex flex-col lg:flex-row items-center w-full max-w-[1200px] gap-8 px-2 sm:px-4 md:px-8" style={{ gap: 'clamp(32px, 5vw, 74px)' }}>
        {/* Left: Stats Cards Grid */}
        <div className="w-full lg:flex-1 flex justify-center">
          <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full max-w-[485px]">
            {statCards.map((card, index) => {
              const IconComponent = card.icon;
              // Cards ở cột phải (index 1, 3) thấp hơn 70px chỉ trên desktop
              const isRightColumn = index % 2 === 1;
              return (
                <div
                  key={index}
                  className={`flex flex-col justify-center items-center flex-shrink-0 rounded-lg bg-white w-full py-5 lg:py-10 ${isRightColumn ? 'lg:mt-[70px]' : ''}`}
                  style={{
                    minHeight: '304px',
                    height: 'auto',
                    maxWidth: '242.5px',
                    width: '100%',
                    boxShadow: '0 15px 45px -5px rgba(0, 0, 0, 0.07)',
                    minWidth: '0',
                  }}
                >
                  <div className="flex flex-col justify-center items-center gap-3 md:gap-6 flex-shrink-0 w-full" style={{ minHeight: '224px', height: 'auto', width: '100%' }}>
                    {/* Icon */}
                    <IconComponent 
                      className="flex-shrink-0 w-16 h-16 lg:w-[100px] lg:h-[100px]" 
                      style={{ 
                        color: card.iconColor,
                      }}
                    />
                    
                    {/* Text block */}
                    <div 
                      className="flex flex-col items-center gap-2 lg:gap-[19.5px] flex-shrink-0 w-full px-4 lg:px-[30.5px]"
                      style={{ 
                        minHeight: '100px',
                        height: 'auto',
                        width: '100%',
                        paddingBottom: '3px',
                      }}
                    >
                      {/* Number */}
                      <div 
                        className="text-center font-poppins break-words w-full text-[28px] lg:text-[48px] leading-[28px] lg:leading-[48px]"
                        style={{
                          color: '#1B3C74',
                          fontWeight: 600,
                        }}
                      >
                        {card.number}
                      </div>
                      
                      {/* Label */}
                      <div 
                        className="flex flex-col justify-center flex-shrink-0 text-center font-inter break-words w-full text-sm lg:text-lg leading-5 lg:leading-7"
                        style={{
                          minHeight: '21px',
                          height: 'auto',
                          color: '#77829D',
                          fontWeight: 500,
                        }}
                      >
                        {card.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Text block */}
        <div className="flex flex-col items-center lg:items-start gap-6 w-full lg:flex-1 min-w-0" style={{ maxWidth: '555px' }}>
          {/* Text 1: Uppercase */}
          <div 
            className="flex flex-col justify-center self-stretch font-inter uppercase break-words"
            style={{
              minHeight: '18px',
              color: '#FFBF2A',
              fontSize: 'clamp(12px, 2vw, 16px)',
              fontWeight: 600,
              lineHeight: '18px',
            }}
          >
            ĐẶT LỊCH DỄ DÀNG – TIẾP NHẬN NHANH CHÓNG – KHÁM ĐÚNG BÁC SĨ
          </div>

          {/* Text 2: Large title */}
          <div 
            className="flex flex-col justify-center font-inter break-words"
            style={{
              width: '100%',
              minHeight: '65px',
              color: '#1B3C74',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 600,
              lineHeight: '67px',
            }}
          >
            Lịch khám theo yêu cầu
          </div>

          {/* Text 3: Description */}
          <div 
            className="font-inter break-words"
            style={{
              width: '100%',
              maxWidth: '531.17px',
              color: '#77829D',
              fontSize: '17px',
              fontWeight: 500,
              lineHeight: '240%',
            }}
          >
            <ul className="list-none space-y-2 m-0 p-0">
              {appointmentFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 flex-shrink-0">•</span>
                  <span className="flex-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Doctor Team Section */}
      <section className="w-full max-w-[1200px] px-2 sm:px-4 md:px-8">
        <div className="flex flex-col items-start w-full" style={{ gap: '8px' }}>
          {/* Subtitle */}
          <div 
            className="flex flex-col justify-center self-stretch font-inter uppercase break-words"
            style={{
              minHeight: '18px',
              color: '#FFBF2A',
              fontSize: 'clamp(12px, 2vw, 16px)',
              fontWeight: 600,
              lineHeight: '18px',
            }}
          >
            ĐẶT LỊCH DỄ DÀNG – TIẾP NHẬN NHANH CHÓNG – KHÁM ĐÚNG BÁC SĨ
          </div>

          {/* Main Title */}
          <h2 
            className="font-inter break-words"
            style={{
              width: '100%',
              maxWidth: '468.97px',
              minHeight: '65.5px',
              color: '#1B3C74',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 600,
              lineHeight: '67px',
            }}
          >
            Đội ngũ bác sĩ
          </h2>

          {/* Swiper */}
          <div className="w-full mt-6">
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet swiper-pagination-bullet-landing2',
                bulletActiveClass: 'swiper-pagination-bullet-active swiper-pagination-bullet-active-landing2',
              }}
              spaceBetween={0}
              slidesPerView={'auto'}
              loop={false}
              className="px-2 md:px-4"
            >
              {doctors.map((doctor, idx) => (
                <SwiperSlide key={idx} className="!w-auto mr-[15px] last:mr-0">
                  <div className="flex w-[380px] flex-col items-start gap-[10px]">
                    <div 
                      className="flex flex-col items-start gap-[10px] rounded-[30px] self-stretch" 
                      style={{ 
                        padding: '35px 30px',
                        background: 'rgba(251, 247, 210, 0.30)',
                        minHeight: '600px'
                      }}
                    >
                      <div className="flex flex-col items-center gap-[15px] flex-1 w-full">
                      {/* Image wrapper with fixed box to avoid CLS */}
                      <div className="flex justify-center items-center w-full" style={{ height: '320px', minHeight: '320px' }}>
                        <div className="relative" style={{ width: '320px', height: '320px' }}>
                          <Image 
                            src={doctor.image} 
                            alt={doctor.name} 
                            fill 
                            className="object-contain rounded-full" 
                            sizes="320px"
                            loading={idx < 2 ? "eager" : "lazy"}
                          />
                        </div>
                      </div>

                      {/* Text block */}
                      <div className="flex flex-col items-center gap-[18px] self-stretch">
                        {/* Name and Specialty */}
                        <div className="flex flex-col items-start gap-2 self-stretch">
                          {/* Name */}
                          <div 
                            className="self-stretch text-center font-inter break-words"
                            style={{
                              color: '#2677BC',
                              fontSize: 'clamp(24px, 3vw, 32px)',
                              fontWeight: 700,
                              lineHeight: 'normal',
                            }}
                          >
                            {doctor.name}
                          </div>
                          {/* Specialty */}
                          <div 
                            className="self-stretch text-center font-inter break-words"
                            style={{
                              color: '#FA843A',
                              fontSize: 'clamp(18px, 2.5vw, 24px)',
                              fontWeight: 400,
                              lineHeight: 'normal',
                            }}
                          >
                            {doctor.specialty}
                          </div>
                        </div>

                        {/* Description */}
                        <div 
                          className="flex-1 text-center font-inter break-words self-stretch"
                          style={{
                            color: '#5B5B5B',
                            fontSize: 'clamp(14px, 2vw, 18px)',
                            fontWeight: 400,
                            lineHeight: 'normal',
                          }}
                        >
                          {doctor.description}
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="w-full max-w-[1200px] px-2 sm:px-4 md:px-8">
        <div className="flex flex-col items-start w-full" style={{ gap: '8px' }}>
          {/* Subtitle */}
          <div 
            className="flex flex-col justify-center self-stretch font-inter uppercase break-words"
            style={{
              minHeight: '18px',
              color: '#FFBF2A',
              fontSize: 'clamp(12px, 2vw, 16px)',
              fontWeight: 600,
              lineHeight: '18px',
            }}
          >
            ĐẶT LỊCH DỄ DÀNG – TIẾP NHẬN NHANH CHÓNG – KHÁM ĐÚNG BÁC SĨ
          </div>

          {/* Main Title */}
          <h2 
            className="font-inter break-words"
            style={{
              width: '100%',
              maxWidth: '468.97px',
              minHeight: '65.5px',
              color: '#1B3C74',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 600,
              lineHeight: '67px',
            }}
          >
            Tin tức
          </h2>

          {/* Swiper */}
          <div className="w-full mt-6">
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet swiper-pagination-bullet-landing2',
                bulletActiveClass: 'swiper-pagination-bullet-active swiper-pagination-bullet-active-landing2',
              }}
              spaceBetween={0}
              slidesPerView={'auto'}
              loop={false}
              className="px-2 md:px-4"
            >
              {newsItems.map((news, idx) => (
                <SwiperSlide key={idx} className="!w-auto mr-[15px] last:mr-0">
                  <div className="flex flex-col items-start w-full" style={{ maxWidth: '390px', minWidth: '209.072px' }}>
                    <div 
                      className="flex flex-col items-start self-stretch rounded-[12.866px] w-full" 
                      style={{ 
                        background: '#FAFDFF',
                        boxShadow: '0 40.206px 40.206px -40.206px rgba(0, 0, 0, 0.10)',
                      }}
                    >
                      {/* Image wrapper with fixed box to avoid CLS */}
                      <div className="relative w-full overflow-hidden rounded-t-[12.866px]" style={{ height: '200px', minHeight: '200px', aspectRatio: '390 / 200' }}>
                        <Image 
                          src={news.image} 
                          alt={news.title} 
                          fill 
                          className="object-cover" 
                          sizes="(max-width: 390px) 100vw, 390px"
                          loading={idx < 2 ? "eager" : "lazy"}
                        />
                      </div>

                      {/* Text block */}
                      <div className="flex flex-col items-start gap-2 px-4 py-3 w-full">
                        {/* Title */}
                        <div 
                          className="font-inter break-words self-stretch"
                          style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                            overflow: 'hidden',
                            color: '#072831',
                            textOverflow: 'ellipsis',
                            fontSize: 'clamp(16px, 2vw, 18px)',
                            fontWeight: 500,
                            lineHeight: '150%',
                          }}
                        >
                          {news.title}
                        </div>

                        {/* Description */}
                        <div 
                          className="font-inter break-words"
                          style={{
                            display: '-webkit-box',
                            width: '257.32px',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                            color: '#09333F',
                            textOverflow: 'ellipsis',
                            fontSize: '12px',
                            fontWeight: 400,
                            lineHeight: '150%',
                          }}
                        >
                          {news.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Hospital contact card */}
      <HospitalContactCard hospitalName={config.name} />
    </div>
  );
}
