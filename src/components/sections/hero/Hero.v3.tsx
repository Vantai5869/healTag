import Image from "next/image";
import type { HeroProps } from "./Hero.base";

// Hero variant 3: Diagonal split with curved mask and subtle stripe overlay
export default function HeroV3({ config, theme }: HeroProps) {
  const gradientFrom = theme?.gradientFrom || '#3A8EF6';
  const gradientTo = theme?.gradientTo || '#6F3AFA';

  return (
    <section className="relative mt-8">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: text */}
        <div className="md:col-span-6 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200 mb-4">
            <span className="text-xs">{config.name}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-[#0B1A37]">
            Sức khỏe tốt bắt đầu từ hành động hôm nay
          </h1>
          <p className="mt-4 max-w-[600px] text-[#5B6B87] text-sm md:text-base">
            Dịch vụ y tế toàn diện, công nghệ hiện đại, quy trình đặt lịch tối giản. Chúng tôi luôn sẵn sàng hỗ trợ bạn.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              className="px-5 py-3 rounded-lg font-semibold text-white cursor-pointer"
              style={{ background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
            >
              Đặt lịch khám
            </button>
          </div>
        </div>

        {/* Right: diagonal image card */}
        <div className="md:col-span-6 order-1 md:order-2">
          <div className="relative h-[340px] md:h-[420px]">
            {/* Diagonal background with theme gradient */}
            <div
              className="absolute inset-0 rounded-[28px]"
              style={{ background: `linear-gradient(120deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
            />
            {/* Curved masked image */}
            <div
              className="absolute inset-0 overflow-hidden rounded-[28px]"
              style={{
                clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)',
              }}
            >
              <Image src="/imgs/doctor-banner.png" alt="Doctors" fill className="object-cover" />
              {/* Stripe overlay for depth, follows theme */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 6px, transparent 6px, transparent 12px)`,
                }}
              />
            </div>
            {/* Foreground small card */}
            <div className="absolute right-4 bottom-4 bg-white rounded-xl shadow-lg px-4 py-3">
              <div className="text-xs text-[#5B6B87]">Tổng đài hỗ trợ</div>
              <div className="text-lg font-bold" style={{ color: gradientTo }}>1900 123 456</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


