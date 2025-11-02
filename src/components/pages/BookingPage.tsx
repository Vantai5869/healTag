'use client';
import Image from "next/image";
import type { HospitalVariantConfig } from "@/lib/hospitals";
import HospitalTitleBar from "./HospitalTitleBar";
import { Check, Stethoscope, ChevronDown, Calendar, Clock } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";

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

interface BookingPageProps {
  hospitalConfig: HospitalVariantConfig;
}

export default function BookingPage({ hospitalConfig }: BookingPageProps) {
  // Step management
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  
  // Dropdown states
  const [openSpecialty, setOpenSpecialty] = useState(false);
  const [openExaminationType, setOpenExaminationType] = useState(false);
  const [openDoctor, setOpenDoctor] = useState(false);
  
  // Refs for dropdowns
  const specialtyRef = useRef<HTMLDivElement>(null);
  const examinationTypeRef = useRef<HTMLDivElement>(null);
  const doctorRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (specialtyRef.current && !specialtyRef.current.contains(event.target as Node)) {
        setOpenSpecialty(false);
      }
      if (examinationTypeRef.current && !examinationTypeRef.current.contains(event.target as Node)) {
        setOpenExaminationType(false);
      }
      if (doctorRef.current && !doctorRef.current.contains(event.target as Node)) {
        setOpenDoctor(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Fake data
  const specialties = ['Khoa cấp cứu', 'Khoa tim mạch', 'Khoa hô hấp', 'Khoa tiêu hoá', 'Khoa ngoại'];
  const examinationTypes = ['Khám thường', 'Khám theo yêu cầu', 'Tái khám'];
  const doctors = ['PGS Trần Hoài Nam', 'PGS Phạm Thu Hà', 'BS Nguyễn Minh Khoa', 'BS Lê Hồng Sơn'];
  
  // Generate dates (next 10 days) - memoized
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const dayOfWeek = daysOfWeek[date.getDay()];
      dates.push({
        value: `${day}/${month}`,
        label: `${day}/${month}`,
        dayOfWeek: dayOfWeek,
        fullDate: date
      });
    }
    return dates;
  }, []);
  
  // Generate time slots (from 7:00 to 17:30, every 15 minutes) - memoized
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 7; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        if (hour === 17 && minute > 30) break; // Stop at 17:30
        const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  }, []);
  
  // Form state - Step 1
  const [appointmentFor, setAppointmentFor] = useState<'self' | 'other'>('other');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedExaminationType, setSelectedExaminationType] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  // Form state - Step 2
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  
  // Form state - Step 3
  const [reason, setReason] = useState<string>('');
  
  // Validation for Step 1
  const isStep1Complete = 
    appointmentFor !== null &&
    selectedSpecialty !== '' &&
    selectedDate !== '' &&
    selectedTimeSlot !== null &&
    selectedTimeSlot !== '';
  
  // Validation for Step 2
  const isStep2Complete = 
    fullName.trim() !== '' &&
    email.trim() !== '' &&
    dateOfBirth.trim() !== '' &&
    phoneNumber.trim() !== '';
  
  const handleNextStep = () => {
    if (currentStep === 1 && isStep1Complete) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Complete) {
      setCurrentStep(3);
    }
  };
  
  // Format date and time for display in step 3
  const formatBookingDateTime = () => {
    if (!selectedDate || !selectedTimeSlot) return 'Chưa có thông tin';
    // Find the full date object from availableDates
    const dateObj = availableDates.find(d => d.value === selectedDate);
    if (!dateObj) return `${selectedTimeSlot} ${selectedDate}`;
    // Format: "10:30 22/10/2025"
    const year = dateObj.fullDate.getFullYear();
    return `${selectedTimeSlot} ${selectedDate}/${year}`;
  };
  
  const handleBookAppointment = () => {
    // TODO: Implement booking logic
    console.log('Booking appointment:', {
      appointmentFor,
      specialty: selectedSpecialty,
      examinationType: selectedExaminationType,
      doctor: selectedDoctor,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      fullName,
      email,
      dateOfBirth,
      phoneNumber,
      reason
    });
    alert('Đặt lịch thành công!');
  };

  // Guard clause - must be after all hooks
  if (!hospitalConfig) {
    return null;
  }
  
  // Lấy màu gradient theo variant - giống hệt với header của landing page
  const gradient = getGradientColors(hospitalConfig.landingPageVariant);

  return (
    <div className="min-h-screen bg-[#FAFBFE] pt-6 md:pt-[50px] pb-[100px] px-2 sm:px-4 md:px-8">
      <div className="mx-auto max-w-[1200px] w-full overflow-x-hidden">
        {/* Header section - sử dụng màu gradient từ landing page */}
        <HospitalTitleBar 
          hospitalName={hospitalConfig.name}
          gradientFrom={gradient.from}
          gradientTo={gradient.to}
        />

        {/* Logo and Title Section - Centered */}
        <div className="flex items-center justify-center gap-3 mt-[70px]">
          {/* Logo */}
          <Image 
            src="/svgs/benhvien-logo.svg" 
            alt="Hospital Logo" 
            width={50} 
            height={50} 
            priority 
            sizes="50px" 
          />
          
          {/* Text */}
          <div 
            className="font-inter font-bold"
            style={{
              color: gradient.to,
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '140%',
              letterSpacing: '-1.92px'
            }}
          >
            Đặt lịch khám
          </div>
        </div>

        {/* Progress Steps Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-4 lg:gap-4 mt-8">
          {/* Step 1: Completed or Active */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width: '36px',
                height: '36px',
                background: currentStep > 1 ? gradient.to : gradient.to,
                color: 'white'
              }}
            >
              {currentStep > 1 ? (
                <Check size={20} />
              ) : (
                <span className="font-inter font-bold text-base" style={{ fontSize: '16px' }}>1</span>
              )}
            </div>
            <div
              className="font-inter"
              style={{
                color: gradient.to,
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '-0.64px'
              }}
            >
              Đặt lịch khám chuyên khoa
            </div>
          </div>

          {/* Connecting Line 1 */}
          <div
            className="hidden lg:block flex-shrink-0"
            style={{
              width: '40px',
              height: '2px',
              background: gradient.to
            }}
          />

          {/* Step 2: Active or Completed */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0 font-inter font-bold"
              style={{
                width: '36px',
                height: '36px',
                background: currentStep >= 2 ? gradient.to : '#F9FAFB',
                color: currentStep >= 2 ? 'white' : gradient.to,
                border: currentStep < 2 ? '2px solid #E5E7EB' : 'none',
                fontSize: '16px'
              }}
            >
              {currentStep > 2 ? (
                <Check size={20} />
              ) : (
                <span>2</span>
              )}
            </div>
            <div
              className="font-inter"
              style={{
                color: currentStep >= 2 ? gradient.to : '#9CA3AF',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '-0.64px'
              }}
            >
              Nhập thông tin khách hàng
            </div>
          </div>

          {/* Connecting Line 2 */}
          <div
            className="hidden lg:block flex-shrink-0"
            style={{
              width: '40px',
              height: '2px',
              background: '#E5E7EB'
            }}
          />

          {/* Step 3: Active or Inactive */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0 font-inter font-bold border-2"
              style={{
                width: '36px',
                height: '36px',
                background: currentStep === 3 ? gradient.to : '#F9FAFB',
                borderColor: currentStep === 3 ? gradient.to : '#E5E7EB',
                color: currentStep === 3 ? 'white' : gradient.to,
                fontSize: '16px'
              }}
            >
              {currentStep > 3 ? (
                <Check size={20} />
              ) : (
                <span>3</span>
              )}
            </div>
            <div
              className="font-inter"
              style={{
                color: currentStep === 3 ? gradient.to : '#9CA3AF',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '-0.64px'
              }}
            >
              Xác nhận thông tin đặt lịch
            </div>
          </div>
        </div>

        {/* Step 1: Booking Form Section */}
        {currentStep === 1 && (
          <div className="mt-12 w-full max-w-full">
            {/* Form Title */}
            <div 
              className="font-inter font-bold mb-8 text-center"
              style={{
                color: gradient.to,
                fontSize: '32px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '140%',
                letterSpacing: '-1.92px'
              }}
            >
              Đặt lịch khám chuyên khoa
            </div>

          {/* Form Content */}
          <div className="flex flex-col gap-6 w-full max-w-full">
            {/* Row 1: Chọn người đặt lịch khám | Chọn chuyên khoa */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {/* Section 1: Chọn người đặt lịch khám */}
              <div className="flex flex-col gap-3">
                <label className="font-inter text-base font-medium text-[#022E61]">
                  Chọn người đặt lịch khám <span style={{ color: gradient.to }}>*</span>
                </label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="appointmentFor"
                      value="self"
                      checked={appointmentFor === 'self'}
                      onChange={(e) => setAppointmentFor(e.target.value as 'self' | 'other')}
                      className="w-5 h-5"
                      style={{ accentColor: gradient.to }}
                    />
                    <span className="font-inter text-base font-normal text-[#022E61]">
                      Đặt lịch cho bản thân
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="appointmentFor"
                      value="other"
                      checked={appointmentFor === 'other'}
                      onChange={(e) => setAppointmentFor(e.target.value as 'self' | 'other')}
                      className="w-5 h-5"
                      style={{ accentColor: gradient.to }}
                    />
                    <span className="font-inter text-base font-normal text-[#022E61]">
                      Đặt lịch hộ
                    </span>
                  </label>
                </div>
              </div>

              {/* Section 2: Chọn chuyên khoa */}
              <div className="flex flex-col gap-3">
                <label className="font-inter text-base font-medium text-[#022E61]">
                  Chọn chuyên khoa <span style={{ color: gradient.to }}>*</span>
                </label>
                <div className="relative" ref={specialtyRef}>
                  <div 
                    className="flex items-center gap-3 px-4 py-3 border rounded-lg bg-white cursor-pointer hover:border-[#D1D5DB] transition-colors"
                    style={{
                      borderColor: selectedSpecialty ? gradient.to : '#E5E7EB'
                    }}
                    onClick={() => {
                      setOpenSpecialty(!openSpecialty);
                      setOpenExaminationType(false);
                      setOpenDoctor(false);
                    }}
                  >
                    <Stethoscope size={20} style={{ color: gradient.to }} />
                    <span className="flex-1 font-inter text-base font-normal" style={{ color: selectedSpecialty ? '#022E61' : '#9CA3AF' }}>
                      {selectedSpecialty || 'Chọn thông tin'}
                    </span>
                    <ChevronDown 
                      size={20} 
                      className={`text-gray-400 transition-transform ${openSpecialty ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {openSpecialty && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg max-h-60 overflow-auto">
                      {specialties.map((specialty) => (
                        <div
                          key={specialty}
                          onClick={() => {
                            setSelectedSpecialty(specialty);
                            setOpenSpecialty(false);
                          }}
                          className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-inter text-base font-normal text-[#022E61] transition-colors first:rounded-t-lg last:rounded-b-lg"
                          style={{
                            backgroundColor: selectedSpecialty === specialty ? `${gradient.to}15` : 'transparent'
                          }}
                        >
                          {specialty}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Row 2: Chọn loại khám | Chọn bác sĩ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {/* Section 3: Chọn loại khám */}
              <div className="flex flex-col gap-3">
                <label className="font-inter text-base font-medium text-[#022E61]">
                  Chọn loại khám
                </label>
                <div className="relative" ref={examinationTypeRef}>
                  <div 
                    className="flex items-center gap-3 px-4 py-3 border rounded-lg bg-white cursor-pointer hover:border-[#D1D5DB] transition-colors"
                    style={{
                      borderColor: selectedExaminationType ? gradient.to : '#E5E7EB'
                    }}
                    onClick={() => {
                      setOpenExaminationType(!openExaminationType);
                      setOpenSpecialty(false);
                      setOpenDoctor(false);
                    }}
                  >
                    <Stethoscope size={20} style={{ color: gradient.to }} />
                    <span className="flex-1 font-inter text-base font-normal" style={{ color: selectedExaminationType ? '#022E61' : '#9CA3AF' }}>
                      {selectedExaminationType || 'Chọn thông tin'}
                    </span>
                    <ChevronDown 
                      size={20} 
                      className={`text-gray-400 transition-transform ${openExaminationType ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {openExaminationType && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg max-h-60 overflow-auto">
                      {examinationTypes.map((type) => (
                        <div
                          key={type}
                          onClick={() => {
                            setSelectedExaminationType(type);
                            setOpenExaminationType(false);
                          }}
                          className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-inter text-base font-normal text-[#022E61] transition-colors first:rounded-t-lg last:rounded-b-lg"
                          style={{
                            backgroundColor: selectedExaminationType === type ? `${gradient.to}15` : 'transparent'
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Section 4: Chọn bác sĩ */}
              <div className="flex flex-col gap-3">
                <label className="font-inter text-base font-medium text-[#022E61]">
                  Chọn bác sĩ
                </label>
                <div className="relative" ref={doctorRef}>
                  <div 
                    className="flex items-center gap-3 px-4 py-3 border rounded-lg bg-white cursor-pointer hover:border-[#D1D5DB] transition-colors"
                    style={{
                      borderColor: selectedDoctor ? gradient.to : '#E5E7EB'
                    }}
                    onClick={() => {
                      setOpenDoctor(!openDoctor);
                      setOpenSpecialty(false);
                      setOpenExaminationType(false);
                    }}
                  >
                    <Stethoscope size={20} style={{ color: gradient.to }} />
                    <span className="flex-1 font-inter text-base font-normal" style={{ color: selectedDoctor ? '#022E61' : '#9CA3AF' }}>
                      {selectedDoctor || 'Chọn thông tin'}
                    </span>
                    <ChevronDown 
                      size={20} 
                      className={`text-gray-400 transition-transform ${openDoctor ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {openDoctor && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg max-h-60 overflow-auto">
                      {doctors.map((doctor) => (
                        <div
                          key={doctor}
                          onClick={() => {
                            setSelectedDoctor(doctor);
                            setOpenDoctor(false);
                          }}
                          className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-inter text-base font-normal text-[#022E61] transition-colors first:rounded-t-lg last:rounded-b-lg"
                          style={{
                            backgroundColor: selectedDoctor === doctor ? `${gradient.to}15` : 'transparent'
                          }}
                        >
                          {doctor}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 5: Chọn lịch khám */}
            <div className="flex flex-col gap-3">
              <label className="font-inter text-base font-medium text-[#022E61]">
                Chọn lịch khám <span style={{ color: gradient.to }}>*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {availableDates.map((date) => (
                  <button
                    key={date.value}
                    type="button"
                    onClick={() => setSelectedDate(date.value)}
                    className="flex flex-col items-center justify-center px-4 py-3 rounded-lg border-2 transition-all cursor-pointer"
                    style={{
                      borderColor: gradient.to,
                      background: selectedDate === date.value ? gradient.to : 'white',
                      minWidth: '100px'
                    }}
                  >
                    <span
                      className="font-inter text-base font-medium"
                      style={{
                        color: selectedDate === date.value ? 'white' : gradient.to
                      }}
                    >
                      {date.label}
                    </span>
                    <span
                      className="font-inter text-sm font-normal mt-1"
                      style={{
                        color: selectedDate === date.value ? 'white' : gradient.to
                      }}
                    >
                      {date.dayOfWeek}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 6: Chọn khung giờ khám */}
            <div className="flex flex-col gap-3">
              <label className="font-inter text-base font-medium text-[#022E61]">
                Chọn khung giờ khám <span style={{ color: gradient.to }}>*</span>
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2">
                {timeSlots.map((timeSlot) => {
                  const isSelected = selectedTimeSlot === timeSlot;
                  
                  return (
                    <button
                      key={timeSlot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(timeSlot)}
                      className="px-2 sm:px-3 py-2 rounded-lg border-2 transition-all cursor-pointer text-center"
                      style={{
                        borderColor: gradient.to,
                        background: isSelected ? gradient.to : 'white',
                        color: isSelected ? 'white' : gradient.to
                      }}
                    >
                      <span className="font-inter text-xs sm:text-sm font-medium">
                        {timeSlot}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleNextStep}
                disabled={!isStep1Complete}
                className="px-8 py-3 rounded-lg text-white font-inter font-bold text-base transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: isStep1Complete 
                    ? `linear-gradient(90deg, ${gradient.from} 0%, ${gradient.to} 100%)`
                    : '#E5E7EB',
                  color: isStep1Complete ? 'white' : '#9CA3AF'
                }}
              >
                Tiếp theo
              </button>
            </div>
          </div>
          </div>
        )}

        {/* Step 2: Customer Information Form */}
        {currentStep === 2 && (
          <div className="mt-12 w-full max-w-full">
            {/* Form Title */}
            <div 
              className="font-inter font-bold mb-6 text-center"
              style={{
                color: gradient.to,
                fontSize: '32px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '140%',
                letterSpacing: '-1.92px'
              }}
            >
              Nhập thông tin khách hàng
            </div>

            {/* Section Header */}
            <div className="flex flex-col gap-2 mb-6">
              <div 
                className="font-inter font-semibold"
                style={{
                  color: gradient.to,
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal'
                }}
              >
                Thông tin khách hàng
              </div>
              <div 
                className="w-full h-px"
                style={{
                  background: gradient.to
                }}
              />
            </div>

            {/* Form Content */}
            <div className="flex flex-col gap-6 w-full max-w-full">
              {/* Grid 2 columns on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                {/* Field 1: Họ và tên */}
                <div className="flex flex-col gap-3">
                  <label className="font-inter text-base font-medium text-[#022E61]">
                    Họ và tên <span style={{ color: gradient.to }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nhập thông tin"
                    className="px-4 py-3 border border-[#E5E7EB] rounded-lg bg-white font-inter text-base font-normal text-[#022E61] placeholder-gray-500 focus:outline-none focus:border-[#D1D5DB] transition-colors"
                  />
                </div>

                {/* Field 2: Email */}
                <div className="flex flex-col gap-3">
                  <label className="font-inter text-base font-medium text-[#022E61]">
                    Email <span style={{ color: gradient.to }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập thông tin"
                    className="px-4 py-3 border border-[#E5E7EB] rounded-lg bg-white font-inter text-base font-normal text-[#022E61] placeholder-gray-500 focus:outline-none focus:border-[#D1D5DB] transition-colors"
                  />
                </div>

                {/* Field 3: Ngày sinh */}
                <div className="flex flex-col gap-3">
                  <label className="font-inter text-base font-medium text-[#022E61]">
                    Ngày sinh <span style={{ color: gradient.to }}>*</span>
                  </label>
                  <div className="relative">
                    <input
                      ref={dateInputRef}
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      placeholder="Nhập thông tin"
                      className="px-4 py-3 pr-10 border border-[#E5E7EB] rounded-lg bg-white font-inter text-base font-normal text-[#022E61] placeholder-gray-500 focus:outline-none focus:border-[#D1D5DB] transition-colors w-full [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                      style={{
                        color: dateOfBirth ? '#022E61' : '#9CA3AF'
                      }}
                    />
                    <Calendar 
                      size={20} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ color: gradient.to }}
                      onClick={() => dateInputRef.current?.showPicker?.() || dateInputRef.current?.click()}
                    />
                  </div>
                </div>

                {/* Field 4: Số điện thoại */}
                <div className="flex flex-col gap-3">
                  <label className="font-inter text-base font-medium text-[#022E61]">
                    Số điện thoại <span style={{ color: gradient.to }}>*</span>
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Nhập thông tin"
                    className="px-4 py-3 border border-[#E5E7EB] rounded-lg bg-white font-inter text-base font-normal text-[#022E61] placeholder-gray-500 focus:outline-none focus:border-[#D1D5DB] transition-colors"
                  />
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleNextStep}
                  disabled={!isStep2Complete}
                  className="px-8 py-3 rounded-lg text-white font-inter font-bold text-base transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: isStep2Complete 
                      ? `linear-gradient(90deg, ${gradient.from} 0%, ${gradient.to} 100%)`
                      : '#E5E7EB',
                    color: isStep2Complete ? 'white' : '#9CA3AF'
                  }}
                >
                  Tiếp theo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm Booking Information */}
        {currentStep === 3 && (
          <div className="mt-12 w-full max-w-full">
            {/* Form Title */}
            <div 
              className="font-inter font-bold mb-8 text-center"
              style={{
                color: gradient.to,
                fontSize: '32px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '140%',
                letterSpacing: '-1.92px'
              }}
            >
              Xác nhận thông tin đặt lịch
            </div>

            {/* Booking Details Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Card 1: Thời gian đặt lịch */}
              <div className="flex items-start gap-4 p-4 rounded-lg border border-[#E5E7EB] bg-white">
                <Clock size={24} style={{ color: gradient.to, flexShrink: 0 }} />
                <div className="flex flex-col gap-1">
                  <div 
                    className="font-inter font-semibold"
                    style={{
                      color: gradient.to,
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: 'normal'
                    }}
                  >
                    Thời gian đặt lịch
                  </div>
                  <div className="font-inter text-base font-normal text-[#022E61]">
                    {formatBookingDateTime()}
                  </div>
                </div>
              </div>

              {/* Card 2: Chuyên khoa */}
              <div className="flex items-start gap-4 p-4 rounded-lg border border-[#E5E7EB] bg-white">
                <Stethoscope size={24} style={{ color: gradient.to, flexShrink: 0 }} />
                <div className="flex flex-col gap-1">
                  <div 
                    className="font-inter font-semibold"
                    style={{
                      color: gradient.to,
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: 'normal'
                    }}
                  >
                    Chuyên khoa
                  </div>
                  <div className="font-inter text-base font-normal text-[#022E61]">
                    {selectedSpecialty || 'Chưa có thông tin'}
                  </div>
                </div>
              </div>
            </div>

            {/* Reason for Examination */}
            <div className="flex flex-col gap-3 mb-8">
              <label className="font-inter text-base font-medium text-[#022E61]">
                Lý do khám <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Mô tả triệu chứng"
                rows={6}
                className="px-4 py-3 border border-[#E5E7EB] rounded-lg bg-white font-inter text-base font-normal text-[#022E61] placeholder-gray-500 focus:outline-none focus:border-[#D1D5DB] transition-colors w-full resize-none"
              />
            </div>

            {/* Customer Information Section */}
            <div className="flex flex-col gap-2 mb-6">
              <div 
                className="font-inter font-semibold"
                style={{
                  color: gradient.to,
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal'
                }}
              >
                Thông tin khách hàng
              </div>
              <div 
                className="w-full h-px"
                style={{
                  background: gradient.to
                }}
              />
            </div>

            {/* Customer Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Left Column */}
              <div className="flex flex-col gap-4">
                {/* Họ và tên */}
                <div className="flex flex-col gap-1">
                  <div className="font-inter text-sm font-medium text-[#022E61]">
                    Họ và tên
                  </div>
                  <div className="font-inter text-base font-normal text-gray-600">
                    {fullName || 'Chưa có thông tin'}
                  </div>
                </div>

                {/* Ngày sinh */}
                <div className="flex flex-col gap-1">
                  <div className="font-inter text-sm font-medium text-[#022E61]">
                    Ngày sinh
                  </div>
                  <div className="font-inter text-base font-normal text-gray-600">
                    {dateOfBirth ? new Date(dateOfBirth).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Chưa có thông tin'}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-4">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <div className="font-inter text-sm font-medium text-[#022E61]">
                    Email
                  </div>
                  <div className="font-inter text-base font-normal text-gray-600">
                    {email || 'Chưa có thông tin'}
                  </div>
                </div>

                {/* Số điện thoại */}
                <div className="flex flex-col gap-1">
                  <div className="font-inter text-sm font-medium text-[#022E61]">
                    Số điện thoại
                  </div>
                  <div className="font-inter text-base font-normal text-gray-600">
                    {phoneNumber || 'Chưa có thông tin'}
                  </div>
                </div>
              </div>
            </div>

            {/* Book Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleBookAppointment}
                disabled={!reason.trim()}
                className="px-8 py-3 rounded-lg text-white font-inter font-bold text-base transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: reason.trim()
                    ? `linear-gradient(90deg, ${gradient.from} 0%, ${gradient.to} 100%)`
                    : '#E5E7EB',
                  color: reason.trim() ? 'white' : '#9CA3AF'
                }}
              >
                Đặt lịch
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

