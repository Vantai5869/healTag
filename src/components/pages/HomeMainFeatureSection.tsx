'use client';
import { useTranslations } from 'next-intl';

const SERVICE_IMAGES = {
  specialist: "/svgs/home3-img2.svg",
  test: "/svgs/home3-img3.svg",
  package: "/svgs/home3-img4.svg",
  vaccine: "/svgs/home3-img5.svg",
  consult: "/svgs/home3-img6.svg",
  reminder: "/svgs/home3-img7.svg"
};

export default function HomeMainFeatureSection() {
  const t = useTranslations('Home.MainFeatureSection');
  const services = [
    'specialist',
    'test',
    'package',
    'vaccine',
    'consult',
    'reminder',
  ];

  // Only paint gradient for HealTAG-care, rest is normal color
  const introTitle = t('introTitle');
  // Regex or manual for this demo (matching 'HealTAG-care')
  const mainBrand = 'HealTAG-care';
  const titleParts = introTitle.includes(mainBrand)
    ? [mainBrand, introTitle.replace(mainBrand, '').trimStart()]
    : [introTitle];

  return (
    <section className="w-full bg-white mt-[83px] px-4 sm:px-6">
      <div className="mx-auto flex flex-col items-center px-0">
        <h2
          className="align-stretch text-center font-bold mb-10 mx-auto bg-gradient-to-r from-[#007BFF] to-[#51C1FFBF] bg-clip-text text-transparent"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 41,
            fontWeight: 700,
            lineHeight: '140%',
            letterSpacing: '-1.64px',
            maxWidth: 800,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('title')}
        </h2>
        <div className="w-full xl:w-[1200px] mx-auto flex flex-col xl:flex-row justify-between items-center gap-8">
          {/* Left - big intro card */}
          <div
            className="flex flex-col items-start gap-6 p-[16px_16px_24px_18px] rounded-[17px] border border-[rgba(81,193,255,0.3)] bg-[rgba(255,255,255,0.40)] backdrop-blur-[5px] min-h-0 h-auto w-full max-w-[400px] mx-auto xl:mx-0"
            style={{ borderWidth: 0.5 }}
          >
            {/* Top illustration: wide, full-width style */}
            <img src="/svgs/home3-img1.svg" className="w-full h-auto mb-3" alt="intro-illustration" />
            {/* Text block for intro */}
            <div className="flex flex-col items-start gap-3 w-full">
              <span className="font-medium text-[24px] leading-[130%] tracking-[-1.44px] text-[#333]" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="bg-gradient-to-r from-[#007BFF] to-[#51C1FF4D] bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}>HealTAG-care </span>{titleParts[1] ? titleParts[1] : ''}
              </span>
              <span className="text-[14px] font-normal leading-[140%] tracking-[-0.84px] text-[#333]/80 w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t('introDetail')}
              </span>
            </div>
          </div>
          {/* Right - grid of service cards */}
          <div className="flex-1 min-w-0 grid grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((key) => {
              const imgSrc = SERVICE_IMAGES[key as keyof typeof SERVICE_IMAGES];
              return (
                <div
                  key={key}
                  className="flex flex-col items-start gap-4 p-4 rounded-[16px] border border-white border-opacity-50 bg-[rgba(255,255,255,0.10)] shadow-xl backdrop-blur-[10px] transition"
                  style={{ boxShadow: '1px 2px 30px 0 rgba(0,0,0,0.10)' }}
                >
                  <img src={imgSrc} alt={key} className="w-full h-auto mb-2" />
                  <div className="flex flex-col items-start gap-2 w-full break-words">
                    <div
                      className="font-semibold text-[16px] leading-[140%] tracking-[-0.96px] text-[#333] mb-0"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {t(`services.${key}.title`)}
                    </div>
                    <div
                      className="align-stretch text-[#333] text-[12px] font-normal leading-[140%] tracking-[-0.72px]"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {t(`services.${key}.desc`)}
                    </div>
                  </div>
                  <button
                    className="mt-auto flex justify-center items-center px-3 py-1.5 rounded-full border border-[#007BFF] bg-[rgba(255,255,255,0.15)] backdrop-blur-[10px] cursor-pointer"
                    style={{ borderWidth: 0.5 }}
                  >
                    <span
                      className="text-[#007BFF] text-[10px] font-normal leading-[140%] tracking-[-0.6px]"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {t(`services.${key}.cta`)}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
