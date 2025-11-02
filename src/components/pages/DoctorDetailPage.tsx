'use client';
import Image from "next/image";
import type { HospitalVariantConfig } from "@/lib/hospitals";
import type { Doctor } from "@/lib/doctors";
import HospitalTitleBar from "./HospitalTitleBar";
import { Star, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

// Helper function to get gradient colors based on variant
// Sử dụng cùng màu hardcode như các landing pages
function getGradientColors(variant?: 1 | 2 | 3) {
  switch (variant) {
    case 2:
      // Landing page variant 2: Vàng cam (giống HospitalLanding2)
      return { from: '#FFBF2A', to: '#FA843A' };
    case 3:
      // Landing page variant 3: Xanh lá (giống HospitalLanding3)
      return { from: '#10B981', to: '#059669' };
    case 1:
    default:
      // Landing page variant 1: Xanh dương (giống HospitalLanding)
      return { from: '#3A8EF6', to: '#6F3AFA' };
  }
}

// Helper function to get button gradient colors based on variant
function getButtonGradientColors(variant?: 1 | 2 | 3) {
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

interface DoctorDetailPageProps {
  doctor: Doctor;
  hospitalConfig: HospitalVariantConfig;
}

export default function DoctorDetailPage({ doctor, hospitalConfig }: DoctorDetailPageProps) {
  // Lấy màu gradient theo variant - giống hệt với header của landing page
  const gradient = getGradientColors(hospitalConfig.landingPageVariant);
  const buttonGradient = getButtonGradientColors(hospitalConfig.landingPageVariant);
  
  // Rating mặc định nếu chưa có
  const rating = (doctor as any).rating || 4;
  const maxRating = 5;

  return (
    <div className="min-h-screen bg-[#FAFBFE] pt-6 md:pt-[50px] pb-[100px] px-2 sm:px-4 md:px-8">
      <div className="mx-auto max-w-[1200px] w-full overflow-x-hidden">
        {/* Header section - sử dụng màu gradient từ landing page */}
        <HospitalTitleBar 
          hospitalName={hospitalConfig.name}
          gradientFrom={gradient.from}
          gradientTo={gradient.to}
        />

        {/* Doctor Info Section */}
        <div className="flex flex-col lg:flex-row w-full max-w-full mt-8 lg:mt-[32px]">
          {/* Left Block: Image and Text Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-6 sm:gap-8 lg:gap-[35px] w-full lg:flex-1">
            {/* Doctor Image */}
            <div className="relative flex-shrink-0 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]">
              <Image 
                src={doctor.image} 
                alt={doctor.name} 
                fill 
                className="object-cover rounded-full" 
                sizes="(max-width: 640px) 120px, 150px"
                priority
              />
            </div>

            {/* Text Information */}
            <div className="flex-shrink-0 flex flex-col w-full sm:w-auto max-w-[712px] min-w-0 min-h-[117px]">
              {/* Name */}
              <div className="font-inter font-bold text-center sm:text-left self-stretch text-[#022E61] text-[clamp(20px,4vw,30px)] leading-normal">
                {doctor.name}
              </div>

              {/* Specialty */}
              <div className="font-inter text-center sm:text-left mt-1 self-stretch text-[#022E61] text-[clamp(14px,2.5vw,16px)] font-normal leading-normal">
                <span 
                  className="bg-clip-text [-webkit-text-fill-color:transparent] [background-clip:text]"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${buttonGradient.from} 0%, ${buttonGradient.to} 100%)`
                  }}
                >
                  Chuyên khoa
                </span>
                {' : '}
                {doctor.specialty}
              </div>

              {/* Experience */}
              {doctor.experience && (
                <div className="font-inter mt-2 sm:mt-[8px] self-stretch w-full max-w-[692px] text-[#022E61] text-[clamp(14px,2.5vw,16px)] font-normal leading-6">
                  • Kinh nghiệm: {doctor.experience} {doctor.description?.includes('năm') ? '' : 'trong lĩnh vực điều trị các bệnh lý cơ – xương - khớp'}
                </div>
              )}

              {/* Work Unit */}
              <div className="font-inter mt-1 sm:mt-1 self-stretch w-full max-w-[692px] text-[#022E61] text-[clamp(14px,2.5vw,16px)] font-normal leading-6">
                • Đơn vị công tác: {doctor.department || doctor.specialty} – {hospitalConfig.name}
              </div>
            </div>
          </div>

          {/* Right Block: Rating and Button */}
          <div className="flex flex-col items-center lg:items-end mt-6 lg:mt-0 lg:flex-shrink-0 gap-[17px]">
            {/* Rating */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxRating }).map((_, index) => (
                <Star
                  key={index}
                  className={index < rating ? "fill-[#FFD700] text-[#FFD700]" : "text-[#D3D3D3]"}
                  size={20}
                />
              ))}
              <span className="font-inter text-base ml-1">{rating}/{maxRating}</span>
            </div>

            {/* Book Appointment Button */}
            <button
              className="flex justify-center items-center rounded-lg text-white font-inter font-bold transition-opacity hover:opacity-90 w-full lg:w-[199px] max-w-[199px] h-[51px] text-[clamp(15px,2.5vw,17px)] leading-8 tracking-[-0.6px]"
              style={{
                backgroundImage: `linear-gradient(90deg, ${buttonGradient.from} 0%, ${buttonGradient.to} 100%)`
              }}
            >
              Đặt lịch khám
            </button>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full max-w-full my-6 h-px opacity-50 bg-[#AEB0D0]" />

        {/* Education and Training Section */}
        <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-0 max-w-full justify-between items-start">
          {/* Left Column: Education */}
          <div className="flex flex-col w-full lg:flex-1">
            {/* Title */}
            <div 
              className="font-inter font-semibold mb-4 self-stretch text-[#022E61] text-lg leading-normal"
            >
              Học vấn
            </div>

            {/* Subtitle */}
            <div 
              className="font-inter font-semibold mb-3 self-stretch flex flex-col justify-center h-[30px] text-base leading-[30px]"
              style={{
                color: gradient.to
              }}
            >
              Đại học:
            </div>

            {/* List Items */}
            {doctor.education && doctor.education.length > 0 && (
              <ul className="list-none p-0 m-0 space-y-2">
                {doctor.education.map((edu, index) => (
                  <li 
                    key={index}
                    className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6"
                  >
                    <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                    <span className="flex-1">{edu}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Column: Training */}
          <div className="flex flex-col w-full lg:flex-1">
            {/* Title */}
            <div 
              className="font-inter font-semibold mb-4 self-stretch text-[#022E61] text-lg leading-normal"
            >
              Training
            </div>

            {/* Subtitle */}
            <div 
              className="font-inter font-semibold mb-3 self-stretch flex flex-col justify-center h-[30px] text-base leading-[30px]"
              style={{
                color: gradient.to
              }}
            >
              Thành viên các hiệp hội chuyên môn:
            </div>

            {/* List Items */}
            {doctor.training && doctor.training.length > 0 ? (
              <ul className="list-none p-0 m-0 space-y-2">
                {doctor.training.map((item, index) => (
                  <li 
                    key={index}
                    className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6"
                  >
                    <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="list-none p-0 m-0 space-y-2">
                <li className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6">
                  <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                  <span className="flex-1">Hiệp hội Chấn thương chỉnh hình Việt Nam (VOSA)</span>
                </li>
                <li className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6">
                  <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                  <span className="flex-1">Hiệp hội Y học Thể thao Châu Á</span>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full max-w-full my-6 h-px opacity-50 bg-[#AEB0D0]" />

        {/* Expertise Section */}
        <div className="flex flex-col w-full max-w-full">
          {/* Title */}
          <div className="font-inter font-semibold mb-6 w-full text-[#022E61] text-lg leading-normal">
            Chuyên môn
          </div>

          {/* Divider Line */}
          <div className="w-full h-px opacity-50 bg-[#AEB0D0] mb-6" />

          {/* Three Columns */}
          <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-0 justify-between items-start">
            {/* Column 1: Hospital Links */}
            <div className="flex flex-col w-full lg:flex-1">
              {/* Subtitle */}
              <div 
                className="font-inter font-semibold mb-3 self-stretch flex flex-col justify-center h-[30px] text-base leading-[30px]"
                style={{
                  color: gradient.to
                }}
              >
                Liên kết bệnh viện:
              </div>

              {/* List Items */}
              {doctor.hospitalLinks && doctor.hospitalLinks.length > 0 ? (
                <ul className="list-none p-0 m-0 space-y-2">
                  {doctor.hospitalLinks.map((item, index) => (
                    <li 
                      key={index}
                      className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6"
                    >
                      <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="list-none p-0 m-0 space-y-2">
                  <li className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6">
                    <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                    <span className="flex-1">Bệnh viện Christus Spohn South</span>
                  </li>
                  <li className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6">
                    <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                    <span className="flex-1">Trung tâm Y tế Khu vực Doctor's</span>
                  </li>
                </ul>
              )}
            </div>

            {/* Column 2: Professional Links */}
            <div className="flex flex-col w-full lg:flex-1">
              {/* Subtitle */}
              <div 
                className="font-inter font-semibold mb-3 self-stretch flex flex-col justify-center h-[30px] text-base leading-[30px]"
                style={{
                  color: gradient.to
                }}
              >
                Liên kết nghề nghiệp:
              </div>

              {/* List Items */}
              {doctor.professionalLinks && doctor.professionalLinks.length > 0 ? (
                <ul className="list-none p-0 m-0 space-y-2">
                  {doctor.professionalLinks.map((item, index) => (
                    <li 
                      key={index}
                      className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6"
                    >
                      <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="list-none p-0 m-0 space-y-2">
                  <li className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6">
                    <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                    <span className="flex-1">Hiệp hội Y học Hạt Nueces</span>
                  </li>
                  <li className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6">
                    <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                    <span className="flex-1">Hiệp hội Y khoa Texas</span>
                  </li>
                </ul>
              )}
            </div>

            {/* Column 3: Teaching Links */}
            <div className="flex flex-col w-full lg:flex-1">
              {/* Subtitle */}
              <div 
                className="font-inter font-semibold mb-3 self-stretch flex flex-col justify-center h-[30px] text-base leading-[30px]"
                style={{
                  color: gradient.to
                }}
              >
                Liên kết đội ngũ – giảng dạy:
              </div>

              {/* List Items */}
              {doctor.teachingLinks && doctor.teachingLinks.length > 0 ? (
                <ul className="list-none p-0 m-0 space-y-2">
                  {doctor.teachingLinks.map((item, index) => (
                    <li 
                      key={index}
                      className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6"
                    >
                      <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="list-none p-0 m-0 space-y-2">
                  <li className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6">
                    <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                    <span className="flex-1">Đội thể thao Corpus Christi Hooks</span>
                  </li>
                  <li className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6">
                    <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                    <span className="flex-1">Đại học Texas A&M – Cơ sở Corpus Christi</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full max-w-full my-6 h-px opacity-50 bg-[#AEB0D0]" />

        {/* About Doctor Section */}
        <div className="flex flex-col w-full max-w-full">
          {/* Title */}
          <div className="font-inter font-bold mb-6 w-full text-[#022E61] text-[30px] leading-normal">
            Về bác sĩ {doctor.name}
          </div>

          {/* Motto */}
          {doctor.motto && (
            <div className="font-inter mb-6 w-full text-[#022E61] text-base font-normal leading-6">
              {doctor.motto}
            </div>
          )}

          {/* Subtitle */}
          <div className="font-inter mb-3 w-full text-[#022E61] text-base font-normal leading-6">
            Bác sĩ chuyên sâu trong:
          </div>

          {/* Specialties List */}
          {doctor.specialties && doctor.specialties.length > 0 ? (
            <ul className="list-none p-0 m-0 space-y-2">
              {doctor.specialties.map((item, index) => (
                <li 
                  key={index}
                  className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6"
                >
                  <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="list-none p-0 m-0 space-y-2">
              <li className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6">
                <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                <span className="flex-1">Phẫu thuật thay khớp háng, khớp gối</span>
              </li>
              <li className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6">
                <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                <span className="flex-1">Điều trị chấn thương thể thao, rách dây chằng</span>
              </li>
              <li className="font-inter flex self-stretch text-[#022E61] text-base font-normal leading-6">
                <span className="mr-2 flex-shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full bg-[#022E61] self-start" />
                <span className="flex-1">Phẫu thuật nội soi khớp vai, khớp gối</span>
              </li>
            </ul>
          )}
        </div>

        {/* Divider Line */}
        <div className="w-full max-w-full my-6 h-px opacity-50 bg-[#AEB0D0]" />

        {/* Certificates Section */}
        <div className="flex flex-col w-full max-w-full">
          {/* Title */}
          <div className="font-inter font-bold mb-6 w-full text-[#022E61] text-lg leading-normal">
            Chứng chỉ
          </div>

          {/* Certificates Grid */}
          <div className="flex flex-row gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {doctor.certificates && doctor.certificates.length > 0 ? (
              doctor.certificates.map((cert, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[225px] h-[172px] rounded-[6px] border border-[#3E3E3E] bg-[#FAFCFE] flex items-center justify-center p-[23px]"
                >
                  <div
                    className="flex-shrink-0 w-[178px] h-[139px]"
                    style={{
                      backgroundImage: `url(${cert})`,
                      backgroundPosition: '-1.676px -3.729px',
                      backgroundSize: '103.578% 103.659%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: 'lightgray'
                    }}
                  />
                </div>
              ))
            ) : (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[225px] h-[172px] rounded-[6px] border border-[#3E3E3E] bg-[#FAFCFE] flex items-center justify-center p-[23px]"
                  >
                    <div
                      className="flex-shrink-0 w-[178px] h-[139px]"
                      style={{
                        backgroundImage: 'url(/imgs/chungchi.png)',
                        backgroundPosition: '-1.676px -3.729px',
                        backgroundSize: '103.578% 103.659%',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'lightgray'
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full max-w-full my-6 h-px opacity-50 bg-[#AEB0D0]" />

        {/* Contact Section */}
        <div className="flex flex-col w-full max-w-full">
          {/* Title */}
          <div className="font-inter font-bold mb-6 w-full text-[#022E61] text-lg leading-normal">
            Liên hệ
          </div>

          {/* Contact Details and Social Media */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0 w-full">
            {/* Contact Details */}
            <div className="flex flex-col gap-4">
              {doctor.email && (
                <div className="flex items-center gap-3">
                  <Mail size={20} style={{ color: gradient.to }} />
                  <span className="font-inter text-base font-normal text-gray-600">
                    {doctor.email}
                  </span>
                </div>
              )}
              {doctor.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={20} style={{ color: gradient.to }} />
                  <span className="font-inter text-base font-normal text-gray-600">
                    {doctor.phone}
                  </span>
                </div>
              )}
              {!doctor.email && !doctor.phone && (
                <>
                  <div className="flex items-center gap-3">
                    <Mail size={20} style={{ color: gradient.to }} />
                    <span className="font-inter text-base font-normal text-gray-600">
                      hoainam@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} style={{ color: gradient.to }} />
                    <span className="font-inter text-base font-normal text-gray-600">
                      +0 123 456 7890
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {doctor.socialMedia?.facebook && (
                <a
                  href={doctor.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Facebook size={20} />
                </a>
              )}
              {doctor.socialMedia?.twitter && (
                <a
                  href={doctor.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Twitter size={20} />
                </a>
              )}
              {doctor.socialMedia?.linkedin && (
                <a
                  href={doctor.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#0A66C2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {doctor.socialMedia?.instagram && (
                <a
                  href={doctor.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Instagram size={20} />
                </a>
              )}
              {!doctor.socialMedia && (
                <>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-[#0A66C2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  >
                    <Instagram size={20} />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
