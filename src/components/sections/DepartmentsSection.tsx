import { Building2, Stethoscope, HeartPulse, ActivitySquare, FlaskConical, ShieldPlus } from "lucide-react";
import type { SectionComponentProps } from "@/lib/componentRegistry";

export default function DepartmentsSection({ theme }: SectionComponentProps) {
  const primaryColor = theme?.primaryColor || '#3A8EF6';

  return (
    <section className="mt-16">
      <div className="mx-auto w-full max-w-[1200px] flex flex-col items-center gap-[46px] rounded-none bg-[#EFF6FE] p-6">
        <h3 className="self-stretch text-center text-[#1B3C74] font-inter text-[32px] font-semibold leading-[67px] capitalize">
          Chuyên khoa nổi bật
        </h3>
        <div className="flex w-full flex-wrap items-start justify-center gap-6">
          {[
            { label: "Trung tâm cấp cứu A9", icon: <Building2 className="h-14 w-14" style={{ color: primaryColor }} /> },
            { label: "Trung tâm Phẫu thuật tiêu hoá", icon: <Stethoscope className="h-14 w-14" style={{ color: primaryColor }} /> },
            { label: "Trung tâm hô hấp", icon: <HeartPulse className="h-14 w-14" style={{ color: primaryColor }} /> },
            { label: "Trung tâm hồi sức tích cực", icon: <ActivitySquare className="h-14 w-14" style={{ color: primaryColor }} /> },
            { label: "Trung tâm huyết học và truyền máu", icon: <FlaskConical className="h-14 w-14" style={{ color: primaryColor }} /> },
            { label: "Trung tâm an toàn", icon: <ShieldPlus className="h-14 w-14" style={{ color: primaryColor }} /> },
            { label: "Trung tâm phẫu thuật", icon: <Building2 className="h-14 w-14" style={{ color: primaryColor }} /> },
            { label: "Trung tâm xương khớp", icon: <ActivitySquare className="h-14 w-14" style={{ color: primaryColor }} /> },
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
  );
}

