'use client';
import type { HospitalVariantConfig } from "@/lib/hospitals";
import HospitalTitleBar from "./HospitalTitleBar";

// Helper function to get gradient colors based on variant
function getGradientColors(variant?: 1 | 2 | 3, heroGradient?: { from: string; to: string }) {
  if (heroGradient) {
    return heroGradient;
  }
  
  switch (variant) {
    case 2:
      return { from: '#FFBF2A', to: '#FA843A' };
    case 3:
      return { from: '#10B981', to: '#059669' };
    case 1:
    default:
      return { from: '#3A8EF6', to: '#6F3AFA' };
  }
}

export default function DoctorPage({ config }: { config: HospitalVariantConfig }) {
  const gradient = getGradientColors(config.landingPageVariant, config.heroGradient);

  return (
    <div className="min-h-screen bg-[#FAFBFE] pt-6 md:pt-[50px] pb-[100px] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Header section - Shared component */}
        <HospitalTitleBar 
          hospitalName={config.name}
          gradientFrom={gradient.from}
          gradientTo={gradient.to}
        />

        {/* Main Content */}
        <div className="flex flex-col items-start gap-8 w-full max-w-[1200px]">
          {/* Page content will go here */}
        </div>
      </div>
    </div>
  );
}

