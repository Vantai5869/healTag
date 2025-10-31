import Image from "next/image";
import type { HeroProps } from "./Hero.base";

export default function HeroDefault({ config, theme }: HeroProps) {
  const gradientFrom = theme?.gradientFrom || '#3A8EF6';
  const gradientTo = theme?.gradientTo || '#6F3AFA';

  return (
    <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-between mt-8 gap-4 md:gap-10">
      {/* Left image */}
      <div className="w-full max-w-[487px] mb-6 md:mb-0">
        <Image src="/imgs/doctor-banner.png" alt="Doctor Banner" width={487} height={612} priority style={{ width: '100%', height: 'auto' }} />
      </div>
      {/* Right content */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8 md:gap-10 w-full md:w-auto">
        {/* Text block */}
        <div className="flex flex-col gap-4 w-full max-w-[666px]">
          <h1 
            className="font-inter font-bold text-[2rem] md:text-[40px] leading-normal bg-clip-text text-transparent w-full"
            style={{
              backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
            }}
          >
            Chào mừng đến với trang bệnh viện!
          </h1>
          <p className="font-poppins text-[#6C87AE] text-[15.4px] font-medium max-w-[655px] mx-auto md:mx-0 w-full">
            Mô tả ngắn về bệnh viện, dịch vụ, sứ mệnh, thông điệp và cam kết phục vụ sức khỏe cộng đồng.
          </p>
        </div>
        {/* Button block */}
        <button 
          className="flex items-center gap-2.5 px-7 py-4 rounded-full shadow-lg mx-auto md:mx-0"
          style={{ background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})` }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-white font-inter text-[17px] font-bold leading-8 tracking-[-0.6px]">Đặt lịch khám ngay</span>
        </button>
      </div>
    </div>
  );
}


