import Image from "next/image";
import type { SectionComponentProps } from "@/lib/componentRegistry";

// Hero variant 2: full-bleed background with overlay and side CTA panel
export default function HeroSectionV2({ config, theme }: SectionComponentProps) {
  const gradientFrom = theme?.gradientFrom || '#3A8EF6';
  const gradientTo = theme?.gradientTo || '#6F3AFA';

  return (
    <section className="relative mt-8 overflow-hidden rounded-2xl">
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0">
        <Image src="/imgs/doctor-banner.png" alt="Hero background" fill priority className="object-cover" />
        <div
          className="absolute inset-0 opacity-85"
          style={{ background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`, mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-12 md:px-10 md:py-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-8">
          <div className="md:col-span-7 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 ring-1 ring-white/20 backdrop-blur-sm mb-4">
              <span className="text-xs">{config.name}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight">
              Chăm sóc sức khỏe toàn diện cho gia đình bạn
            </h1>
            <p className="mt-4 max-w-[640px] text-white/85 text-sm md:text-base">
              Đặt lịch nhanh, đội ngũ chuyên gia tận tâm, công nghệ hiện đại. Luôn đồng hành cùng bạn 24/7.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="px-5 py-3 rounded-lg font-semibold text-[#0B1A37] bg-white hover:bg-white/95 transition cursor-pointer">
                Đặt lịch ngay
              </button>
              <button className="px-5 py-3 rounded-lg font-semibold border border-white/60 text-white hover:bg-white/10 transition cursor-pointer">
                Xem dịch vụ
              </button>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-xl bg-white/90 p-5 md:p-6 shadow-lg backdrop-blur-sm">
              <div className="font-semibold text-[#0B1A37] mb-2">Tổng đài hỗ trợ</div>
              <div className="text-2xl font-bold" style={{ color: gradientTo }}>1900 123 456</div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'Bác sĩ', value: '250+' },
                  { label: 'Chuyên khoa', value: '40+' },
                  { label: 'Ca khám/ngày', value: '1k+' },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-[#F3F6FF] p-3">
                    <div className="text-lg font-bold" style={{ color: gradientTo }}>{s.value}</div>
                    <div className="text-[11px] text-[#5B6B87] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


