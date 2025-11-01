import Image from "next/image";

interface HospitalTitleBarProps {
  hospitalName: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function HospitalTitleBar({ 
  hospitalName, 
  gradientFrom, 
  gradientTo 
}: HospitalTitleBarProps) {
  return (
    <div 
      className="flex items-center w-full pr-0 rounded-lg backdrop-blur-[5px] p-4 gap-[34px]"
      style={{ 
        background: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)` 
      }}
    >
      <div className="flex items-center gap-x-3">
        <Image 
          src="/svgs/benhvien-logo.svg" 
          alt="Hospital Logo" 
          width={50} 
          height={50} 
          priority 
          sizes="50px" 
        />
        <span className="text-white font-inter text-2xl sm:text-3xl font-bold leading-tight tracking-tight -ml-[2px]">
          {hospitalName}
        </span>
      </div>
      <div className="ml-auto">
        <Image 
          src="/svgs/history-list.svg" 
          alt="History Icon" 
          width={80} 
          height={63} 
          className="w-auto h-auto" 
          priority 
          sizes="80px" 
        />
      </div>
    </div>
  );
}

