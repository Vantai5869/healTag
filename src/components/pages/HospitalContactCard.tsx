'use client';
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

interface HospitalContactCardProps {
  hospitalName: string;
}

export default function HospitalContactCard({ hospitalName }: HospitalContactCardProps) {
  return (
    <section className="w-full max-w-[1200px] px-2 sm:px-4 md:px-8">
      <div className="shadow-[0_0_4px_0_rgba(0,0,0,0.10)] bg-white rounded-[12px] overflow-hidden p-4 sm:p-6 md:p-8">
        <div className="w-full flex flex-col md:flex-row items-stretch gap-4 sm:gap-6">
          {/* Left image */}
          <div className="w-full h-[250px] sm:h-[300px] md:w-[330.566px] md:h-[339.623px] shrink-0 rounded-[16px] sm:rounded-[22.642px] overflow-hidden relative">
            <Image
              src="/imgs/benh-vien-1.png"
              alt="Bệnh viện"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 330px"
              loading="lazy"
            />
          </div>
          {/* Right text */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 justify-center">
            <div 
              className="text-black/90 break-words leading-normal font-black" 
              style={{ 
                fontFamily: 'Lato', 
                fontSize: 'clamp(24px, 4vw, 36.226px)'
              }}
            >
              {hospitalName}
            </div>
            <div 
              className="flex flex-col gap-4 sm:gap-6 break-words text-black/87 leading-normal font-normal" 
              style={{ 
                fontFamily: 'Lato', 
                fontSize: 'clamp(16px, 3vw, 36.226px)'
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 sm:gap-y-3 gap-x-8 md:gap-x-12">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Phone className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#21C55D] flex-shrink-0" />
                  <span className="break-words" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                    0989989899
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <Mail className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#1D4ED8] flex-shrink-0" />
                  <span className="break-words" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                    bachmai@gmail.com
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <MapPin className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#EF2B67] mt-1 flex-shrink-0" />
                <span className="break-words flex-1" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                  78 Đường Giải Phóng, Phường Kim Liên, Thành phố Hà Nội
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

