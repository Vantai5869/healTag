'use client';
import Image from "next/image";
import type { HospitalVariantConfig } from "@/lib/hospitals";
import HospitalTitleBar from "./HospitalTitleBar";
import HospitalContactCard from "./HospitalContactCard";
import { Building2, ActivitySquare, HeartPulse, FlaskConical, Stethoscope, ArrowRight } from "lucide-react";
import { useState } from 'react';
import { Link } from "@/i18n/navigation";
import { generateDoctorSlug } from "@/lib/doctors";

export default function HospitalLanding3({ config }: { config: HospitalVariantConfig }) {
  const [activeNewsTab, setActiveNewsTab] = useState<'latest' | 'training' | 'common'>('latest');

  const newsByTab: Record<string, Array<{ title: string; description: string; image: string }>> = {
    latest: [
      { title: 'Tin tức y tế mới nhất về các phương pháp điều trị hiện đại', description: 'Cập nhật những thông tin mới nhất về các phương pháp điều trị và công nghệ y tế tiên tiến.', image: '/imgs/tintuc1-1.png' },
      { title: 'Hướng dẫn chăm sóc sức khỏe tại nhà hiệu quả', description: 'Những mẹo vặt và phương pháp chăm sóc sức khỏe đơn giản nhưng hiệu quả cho cả gia đình.', image: '/imgs/tintuc1-2.png' },
      { title: 'Chương trình khám sức khỏe miễn phí cho cộng đồng', description: 'Thông tin về các chương trình khám sức khỏe định kỳ và tư vấn miễn phí cho người dân.', image: '/imgs/tintuc1-3.png' },
      { title: 'Nghiên cứu mới về phòng chống bệnh tim mạch', description: 'Các nghiên cứu mới nhất về cách phòng chống và điều trị bệnh tim mạch hiệu quả.', image: '/imgs/tintuc1-1.png' },
      { title: 'Tầm quan trọng của việc khám sức khỏe định kỳ', description: 'Tại sao việc khám sức khỏe định kỳ là vô cùng quan trọng đối với mỗi người.', image: '/imgs/tintuc1-2.png' },
      { title: 'Công nghệ mới trong chẩn đoán và điều trị ung thư', description: 'Những tiến bộ công nghệ mới nhất trong việc chẩn đoán và điều trị bệnh ung thư.', image: '/imgs/tintuc1-3.png' },
      { title: 'Dinh dưỡng hợp lý cho trẻ em phát triển toàn diện', description: 'Chế độ dinh dưỡng phù hợp giúp trẻ em phát triển khỏe mạnh và toàn diện.', image: '/imgs/tintuc1-1.png' },
      { title: 'Phòng chống dịch bệnh mùa đông hiệu quả', description: 'Các biện pháp phòng chống dịch bệnh trong mùa đông để bảo vệ sức khỏe gia đình.', image: '/imgs/tintuc1-2.png' },
    ],
    training: [
      { title: 'Chương trình đào tạo y bác sĩ chuyên sâu', description: 'Các khóa đào tạo nâng cao kỹ năng cho đội ngũ y bác sĩ tại bệnh viện.', image: '/imgs/tintuc1-1.png' },
      { title: 'Hội thảo về kỹ thuật phẫu thuật hiện đại', description: 'Hội thảo chia sẻ kinh nghiệm và kỹ thuật phẫu thuật tiên tiến nhất.', image: '/imgs/tintuc1-2.png' },
      { title: 'Đào tạo chăm sóc bệnh nhân trong đại dịch', description: 'Chương trình đào tạo đặc biệt về chăm sóc bệnh nhân trong tình hình dịch bệnh.', image: '/imgs/tintuc1-3.png' },
      { title: 'Khóa học về quản lý chất lượng bệnh viện', description: 'Các khóa học nâng cao về quản lý và đảm bảo chất lượng dịch vụ y tế.', image: '/imgs/tintuc1-1.png' },
      { title: 'Chia sẻ kinh nghiệm điều trị các ca phức tạp', description: 'Các buổi chia sẻ kinh nghiệm về điều trị các trường hợp bệnh phức tạp.', image: '/imgs/tintuc1-2.png' },
      { title: 'Đào tạo sơ cấp cứu cho cộng đồng', description: 'Chương trình đào tạo kỹ năng sơ cấp cứu cho người dân trong cộng đồng.', image: '/imgs/tintuc1-3.png' },
      { title: 'Hội nghị khoa học y tế quốc tế', description: 'Tham dự và chia sẻ tại các hội nghị khoa học y tế quốc tế uy tín.', image: '/imgs/tintuc1-1.png' },
      { title: 'Nâng cao kỹ năng giao tiếp với bệnh nhân', description: 'Đào tạo kỹ năng giao tiếp và chăm sóc tinh thần cho bệnh nhân.', image: '/imgs/tintuc1-2.png' },
    ],
    common: [
      { title: 'Y học thường thức: Cách phòng bệnh cảm cúm', description: 'Những cách đơn giản và hiệu quả để phòng tránh bệnh cảm cúm trong mùa lạnh.', image: '/imgs/tintuc1-1.png' },
      { title: 'Chăm sóc sức khỏe trẻ em đúng cách', description: 'Hướng dẫn các bậc phụ huynh cách chăm sóc sức khỏe cho trẻ em một cách khoa học.', image: '/imgs/tintuc1-2.png' },
      { title: 'Dinh dưỡng cho người cao tuổi', description: 'Chế độ dinh dưỡng phù hợp giúp người cao tuổi duy trì sức khỏe tốt.', image: '/imgs/tintuc1-3.png' },
      { title: 'Tập thể dục đúng cách cho người bận rộn', description: 'Các bài tập đơn giản có thể thực hiện ngay tại nhà hoặc nơi làm việc.', image: '/imgs/tintuc1-1.png' },
      { title: 'Hiểu đúng về các loại thuốc thông thường', description: 'Hướng dẫn sử dụng các loại thuốc thông thường một cách an toàn và hiệu quả.', image: '/imgs/tintuc1-2.png' },
      { title: 'Phòng chống bệnh tim mạch từ sớm', description: 'Những thói quen tốt giúp phòng chống bệnh tim mạch ngay từ khi còn trẻ.', image: '/imgs/tintuc1-3.png' },
      { title: 'Chăm sóc da mùa hanh khô', description: 'Bí quyết chăm sóc da hiệu quả trong mùa hanh khô để luôn có làn da khỏe đẹp.', image: '/imgs/tintuc1-1.png' },
      { title: 'Sức khỏe tinh thần và cách quản lý stress', description: 'Các phương pháp hiệu quả để quản lý stress và duy trì sức khỏe tinh thần tốt.', image: '/imgs/tintuc1-2.png' },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAFBFE] pt-6 md:pt-[50px] pb-[100px] px-2 sm:px-4 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Header section */}
        <HospitalTitleBar 
          hospitalName={config.name}
          gradientFrom="#10B981"
          gradientTo="#059669"
        />

        {/* Section 2: Hero with Text Left and Image Right */}
        <section className="mt-8 md:mt-16">
          <div className="flex flex-col-reverse md:flex-row items-start gap-8 md:gap-0 w-full max-w-[1200px]">
            {/* Left: Text Content */}
            <div className="flex flex-col items-start w-full md:w-auto">
              {/* Title with gradient */}
              <div className="flex flex-col items-start gap-[46px] w-full md:max-w-[518px]">
                <h1 className="text-[#172048] font-inter text-[32px] sm:text-[40px] md:text-[54.818px] font-bold leading-normal">
                  Đơn vị tư vấn và{' '}
                  <span 
                    className="bg-gradient-to-r from-[#50DBBD] to-[#01744F] bg-clip-text text-transparent"
                    style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Tiêm chủng vắc xin
                  </span>
                  {' '}uy tín
          </h1>

                {/* Description */}
                <p className="text-[#C4C4C4] font-poppins text-[15.418px] font-medium leading-normal w-full md:max-w-[467px]">
                  Mô tả ngắn về bệnh viện, dịch vụ, sứ mệnh, thông điệp và cam kết phục vụ sức khỏe cộng đồng. Chuyên khoa cấp cứu, hồi sức, tim mạch, thần kinh, đột quỵ, ngộ độc. Đơn vị đào tạo và nghiên cứu. Cung cấp chương trình chăm sóc sức khỏe cộng đồng.
          </p>
        </div>

              {/* Button */}
              <button 
                className="mt-[38px] flex-shrink-0 rounded-[8px] shadow-lg flex items-center justify-center"
                style={{
                  width: '199px',
                  height: '51px',
                  background: 'linear-gradient(90deg, #00C191 0%, #00744F 100%)',
                }}
              >
                <span className="text-white text-center font-inter text-[17px] font-bold leading-[32px] tracking-[-0.6px]">
                  Đặt lịch khám
                </span>
              </button>

              {/* Statistics */}
              <div className="mt-[42px] flex justify-between items-start self-stretch md:inline-flex md:items-start md:gap-[46px] md:flex-wrap">
                <div className="flex flex-col items-start gap-[15px] w-[86.51px] md:min-w-[86.51px]">
                  <div className="h-[33.405px] self-stretch text-[#01744F] font-poppins text-[30.835px] font-bold leading-normal">
                    200+
                  </div>
                  <div className="self-stretch text-[#C4C4C4] font-poppins text-[15.418px] font-semibold leading-normal">
                    Bác sĩ đầu ngành
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[15px] w-[86.51px] md:min-w-[86.51px]">
                  <div className="h-[33.405px] self-stretch text-[#01744F] font-poppins text-[30.835px] font-bold leading-normal">
                    15K+
                  </div>
                  <div className="self-stretch text-[#C4C4C4] font-poppins text-[15.418px] font-semibold leading-normal">
                    Lượt đánh giá
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[15px] w-[86.51px] md:min-w-[86.51px]">
                  <div className="h-[33.405px] self-stretch text-[#01744F] font-poppins text-[30.835px] font-bold leading-normal">
                    50+
                  </div>
                  <div className="self-stretch text-[#C4C4C4] font-poppins text-[15.418px] font-semibold leading-normal">
                    Chuyên khoa
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="w-full md:flex-1 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[700px]">
                <Image 
                  src="/imgs/banner3-art.png" 
                  alt="Bác sĩ chuyên khoa" 
                  width={700}
                  height={875}
                  className="w-full h-auto object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, 700px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Specialties */}
        <section className="mt-[60px] md:mt-16">
          <div className="flex flex-col items-start gap-5 md:gap-[46px] w-full max-w-[1200px]">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-center self-stretch w-full gap-4 md:gap-0">
              {/* Title */}
              <h2 className="text-[#000] text-center md:text-left font-inter text-[24px] md:text-[40px] font-semibold leading-[48px] w-[275px] md:w-auto md:max-w-[428.718px] self-center md:self-start">
                Chuyên khoa nổi bật
              </h2>

              {/* View All Button - Desktop */}
              <button 
                className="hidden md:flex flex-shrink-0 rounded-[8px] shadow-lg items-center justify-center"
                style={{
                  width: '199px',
                  height: '51px',
                  background: 'linear-gradient(90deg, #00C191 0%, #00744F 100%)',
                }}
              >
                <span className="text-white text-center font-inter text-[17px] font-bold leading-[32px] tracking-[-0.6px]">
                  Xem tất cả
                </span>
              </button>
            </div>

            {/* Specialty Cards List */}
            <div className="md:mt-[46px] flex flex-wrap justify-center gap-4 w-full">
              {[
                { name: 'Trung tâm cấp cứu A9', icon: Building2 },
                { name: 'Trung tâm hồi sức tích cực', icon: ActivitySquare },
                { name: 'Trung tâm hô hấp', icon: HeartPulse },
                { name: 'Trung tâm huyết học và truyền máu', icon: FlaskConical },
                { name: 'Trung tâm Phẫu thuật tiêu hoá', icon: Stethoscope },
              ].map((specialty, index) => {
                const IconComponent = specialty.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 flex-shrink-0 rounded-[8px] border border-black/15 bg-white w-full md:w-[372px]"
                    style={{
                      height: '98px',
                      padding: '24px 16px',
                    }}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#FFF4E5]">
                      <IconComponent className="w-6 h-6 text-[#FA843A]" />
                    </div>

                    {/* Text */}
                    <span 
                      className="text-[#000] font-inter font-semibold flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[16px] md:text-[24px] leading-[24px] w-[231.438px] md:w-auto"
                    >
                      {specialty.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* View All Button - Mobile */}
            <button 
              className="md:hidden flex-shrink-0 rounded-[8px] shadow-lg flex items-center justify-center self-center"
              style={{
                width: '199px',
                height: '51px',
                background: 'linear-gradient(90deg, #00C191 0%, #00744F 100%)',
              }}
            >
              <span className="text-white text-center font-inter text-[17px] font-bold leading-[32px] tracking-[-0.6px]">
                Xem tất cả
              </span>
            </button>
          </div>
        </section>

        {/* Section 4: News */}
        <section className="mt-16">
          <div className="flex flex-col items-start gap-[46px] w-full max-w-[1200px]">
            {/* Header row */}
            <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h3 className="text-black font-inter text-[28px] sm:text-[32px] md:text-[40px] font-semibold leading-[38px] md:leading-[48px] whitespace-nowrap">Tin tức</h3>
              <div className="h-12 flex items-end justify-start md:justify-end gap-4 md:gap-[60px] w-full md:w-auto overflow-x-auto whitespace-nowrap">
                {[
                  { key: 'latest', label: 'Tin tức mới nhất' },
                  { key: 'training', label: 'Đào tạo, chỉ đạo' },
                  { key: 'common', label: 'Y học thường thức' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveNewsTab(tab.key as 'latest' | 'training' | 'common')}
                    className={`shrink-0 flex flex-col items-center justify-end text-center transition-colors ${activeNewsTab === tab.key ? 'text-[#3A8EF6]' : 'text-black/60'}`}
                    style={{ fontFamily: 'Lexend', fontWeight: 600, lineHeight: activeNewsTab === tab.key ? '26px' : undefined, fontSize: activeNewsTab === tab.key ? 18 : undefined }}
                  >
                    <span className="block text-[12px] leading-[15.416px] md:text-[18px] md:leading-[26px]">{tab.label}</span>
                    <span
                      className={`mt-2 hidden md:block h-[2px] w-[106.708px] ${activeNewsTab === tab.key ? 'bg-[#3A8EF6]' : 'bg-transparent'}`}
                      aria-hidden
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* News Cards List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {newsByTab[activeNewsTab].slice(0, 8).map((news, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start gap-4 p-4 rounded-[16px] border border-white/50 bg-[rgba(255,255,255,0.10)] backdrop-blur-[10px] transition"
                  style={{ boxShadow: '1px 2px 30px 0 rgba(0,0,0,0.10)' }}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                    <Image 
                      src={news.image} 
                      alt={news.title} 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading={index < 4 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Text block */}
                  <div className="flex flex-col items-start gap-2 w-full break-words">
                    <div
                      className="font-semibold text-[16px] leading-[140%] tracking-[-0.96px] text-[#333] mb-0"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {news.title}
                    </div>
                    <div
                      className="align-stretch text-[#333] text-[12px] font-normal leading-[140%] tracking-[-0.72px]"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {news.description}
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    className="mt-auto flex justify-center items-center px-3 py-1.5 rounded-full border border-[#007BFF] bg-[rgba(255,255,255,0.15)] backdrop-blur-[10px] cursor-pointer"
                    style={{ borderWidth: 0.5 }}
                  >
                    <span
                      className="text-[#007BFF] text-[10px] font-normal leading-[140%] tracking-[-0.6px]"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      Xem thêm
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Expert Team */}
        <section className="mt-16 w-full">
          <div className="flex flex-col items-center gap-[39px] self-stretch rounded-[32px] w-full max-w-[1200px] mx-auto overflow-visible py-12 bg-gradient-to-b from-[#00C191] to-[#017450]">
            {/* Title */}
            <h2 
              className="self-stretch text-center font-inter text-[24px] font-bold leading-[140%] tracking-[-0.96px] bg-gradient-to-r from-[#FFF] to-[rgba(238,238,238,0.75)] bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Đội ngũ chuyên gia
            </h2>

            {/* Expert Cards List */}
            <div className="inline-flex gap-4 overflow-x-auto overflow-y-visible w-full justify-start py-8" style={{ paddingLeft: '20px', paddingRight: '40px' }}>
              {[
                { name: 'BS Trần Mạnh Dũng', hospital: 'Bệnh viện Bạch Mai', image: '/imgs/bacsi1-1.png' },
                { name: 'BS Trần Mạnh Dũng', hospital: 'Bệnh viện Hoài Đức', image: '/imgs/bacsi1-2.png' },
                { name: 'BS Trần Mạnh Dũng', hospital: 'Bệnh viện E', image: '/imgs/bacsi1-3.png' },
                { name: 'BS Trần Mạnh Dũng', hospital: 'Bệnh viện Trung ương Quân đội', image: '/imgs/bacsi1-1.png' },
                { name: 'BS Trần Mạnh Dũng', hospital: 'Y học cổ truyền', image: '/imgs/bacsi1-2.png' },
              ].map((expert, index) => {
                const rotation = index % 2 === 0 ? '-4deg' : '4deg';
                return (
                <Link 
                  key={index}
                  href={`/hospitals/${config.slug}/doctors/${generateDoctorSlug(expert.name)}`}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <div
                  className="flex flex-col items-start gap-[7.58px] p-4 rounded-[15.161px] border border-white bg-white/10 flex-shrink-0 relative"
                  style={{
                    borderWidth: '0.948px',
                    boxShadow: '0 -1.895px 3.79px 0 rgba(0, 0, 0, 0.05), 0 1.895px 3.79px 0 rgba(0, 0, 0, 0.05)',
                    backdropFilter: 'blur(9.475564002990723px)',
                    transform: `rotate(${rotation})`,
                    zIndex: index + 1,
                  }}
                >
                  {/* Image */}
                  <div className="relative w-[205px] aspect-square overflow-hidden rounded-lg">
                    <Image 
                      src={expert.image} 
                      alt={expert.name} 
                      fill 
                      className="object-cover" 
                      sizes="205px"
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Info Block */}
                  <div 
                    className="flex justify-between items-center w-[205px] px-4 py-2 rounded-[8px] border border-white"
                    style={{
                      padding: '8px 16px',
                      borderWidth: '0.5px',
                      background: 'rgba(81, 255, 226, 0.30)',
                      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 -2px 4px 0 rgba(0, 0, 0, 0.05)',
                      backdropFilter: 'blur(9.475000381469727px)',
                    }}
                  >
                    {/* Text Info */}
                    <div className="flex flex-col items-start gap-[0.948px]">
                      <div 
                        className="text-white font-inter text-[15.161px] font-normal leading-normal"
                        style={{
                          letterSpacing: '-1.364px',
                        }}
                      >
                        {expert.name}
                      </div>
                      <div 
                        className="text-white/50 font-inter text-[9.476px] font-normal leading-normal"
                        style={{
                          letterSpacing: '-0.569px',
                        }}
                      >
                        {expert.hospital}
                      </div>
                    </div>

                    {/* Icon */}
                    <ArrowRight className="w-4 h-4 text-white flex-shrink-0" />
                  </div>
                </div>
                </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 6: Hospital Contact Card */}
        <section className="mt-16">
          <HospitalContactCard hospitalName={config.name} />
        </section>
      </div>
    </div>
  );
}

