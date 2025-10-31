import { Ambulance, Building2, FlaskConical, Pill, Stethoscope } from "lucide-react";
import type { SectionComponentProps } from "@/lib/componentRegistry";

export default function ServicesSection({ theme }: SectionComponentProps) {
  const primaryColor = theme?.primaryColor || '#3A8EF6';

  return (
    <section className="mt-16">
      <div className="mx-auto w-full max-w-[1200px] flex flex-col items-center gap-[31px] rounded-lg bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.10)] p-6">
        <h3 className="self-stretch text-center text-[#102851] font-inter text-[20px] font-medium leading-none tracking-[0.4px]">
          Dịch vụ chúng tôi cung cấp
        </h3>
        <div className="grid w-full [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))] gap-4 md:gap-6">
          {[
            { label: "Bác sĩ", icon: <Stethoscope className="h-12 w-12" style={{ color: primaryColor }} /> },
            { label: "Phòng nghiên cứu", icon: <FlaskConical className="h-12 w-12" style={{ color: primaryColor }} /> },
            { label: "Phòng khám", icon: <Building2 className="h-12 w-12" style={{ color: primaryColor }} /> },
            { label: "Thuốc", icon: <Pill className="h-12 w-12" style={{ color: primaryColor }} /> },
            { label: "Xe cứu thương", icon: <Ambulance className="h-12 w-12" style={{ color: primaryColor }} /> },
          ].map((item) => (
            <div key={item.label} className="flex h-[140px] sm:h-[153px] flex-col items-center justify-center rounded-xl bg-[#F6F9FF]">
              {item.icon}
              <span className="mt-4 text-center text-[#ABB6C7] font-inter text-[18px] font-normal leading-none tracking-[0.36px]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

