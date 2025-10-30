'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HomeFooter() {
  const t = useTranslations('Home.Footer');
  return (
    <footer className="w-full bg-gradient-to-r from-[#007BFF] to-[#178AE6] mt-[64px] px-4 sm:px-6 min-h-[170px]">
      <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row items-center justify-between py-5 xl:py-0 gap-6 xl:gap-0">
        {/* Left illustration (SVG) */}
        <div className="flex-shrink-0 flex items-center justify-center xl:justify-start w-full xl:w-auto xl:max-w-[400px] mb-4 xl:mb-0">
          <img src="/svgs/footer-img1.svg" alt="Footer Illustration" className="w-full max-w-[320px] object-contain" />
        </div>
        {/* Middle: Text and button */}
        <div className="flex flex-col items-center xl:items-start text-white flex-1 px-0 xl:px-4">
          <div className="text-lg md:text-2xl xl:text-3xl font-semibold leading-snug text-center xl:text-left mb-5" style={{textShadow:"0 2px 16px #007bff22"}}>
            {t('main')}
          </div>
          <button className="flex items-center justify-center bg-white bg-opacity-10 border border-white border-opacity-40 rounded-xl px-6 py-3 mb-2 font-bold text-base text-white cursor-pointer hover:bg-opacity-20 transition">
            {t('button')}
          </button>
          <div className="text-xs md:text-sm text-white opacity-80 text-center xl:text-left tracking-wide">
            {t('sub')}
          </div>
        </div>
        {/* Right: Logo & copyright */}
        <div className="flex flex-col items-center pt-7 xl:pt-0 xl:items-end gap-2 w-full xl:w-auto">
          <Image src="/svgs/Logo.svg" alt="HealTAG" width={120} height={40} className="mb-2" />
          <span className="text-xs text-white opacity-80">© 2024 Healinify. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
