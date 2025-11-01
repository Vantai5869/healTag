'use client';
import type { HospitalVariantConfig } from "@/lib/hospitals";

export default function HospitalLanding3({ config }: { config: HospitalVariantConfig }) {
  return (
    <div className="min-h-screen bg-[#FAFBFE] pt-6 md:pt-[50px] pb-[100px] px-2 sm:px-4 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-[#3A8EF6] to-[#6F3AFA] bg-clip-text text-transparent mb-4">
            Welcome Landing Page 3
          </h1>
          <p className="text-lg md:text-xl text-[#6C87AE] text-center">
            {config.name}
          </p>
        </div>
      </div>
    </div>
  );
}

