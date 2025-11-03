'use client';

import Image from "next/image";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileNavDrawer from "@/components/MobileNavDrawer";
import MobileLangSwitcher from "@/components/MobileLangSwitcher";
import NotificationDropdown from "@/components/NotificationDropdown";
import { useTranslations } from 'next-intl';
import { SAMPLE_HOSPITALS } from '@/lib/hospitalSamples';
import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from '@/i18n/navigation';

// Lazy load các component nặng để tối ưu initial load
const HospitalsStyledSection = dynamic(
  () => import("@/components/pages/home/HospitalsStyledSection"),
  { ssr: true }
);

const HomeMainFeatureSection = dynamic(
  () => import("@/components/pages/HomeMainFeatureSection"),
  { ssr: true }
);

const HomeFooter = dynamic(
  () => import("@/components/pages/HomeFooter"),
  { ssr: true }
);

export default function HomeIndex() {
  const tNav = useTranslations('Navigation');
  const tForm = useTranslations('Form');
  const tHome = useTranslations('Home');
  const tUser = useTranslations('User');

  const [searchValue, setSearchValue] = useState('');
  const [showSuggest, setShowSuggest] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // helper classes for input width anim
  const inputAnimWidthClass = `transition-all duration-300 w-full xl:w-[${isInputFocused ? 360 : 250}px]`;
  const btnAnimWidthClass = `transition-all duration-300 items-center justify-center rounded-[8px] text-white cursor-pointer ${isInputFocused ? 'xl:w-[64px]' : 'xl:w-[180px]'} w-full xl:flex-none flex`;

  // Logic filter
  const filtered = SAMPLE_HOSPITALS.filter(h => {
    const matchName = !searchValue || h.name.toLowerCase().includes(searchValue.trim().toLowerCase());
    return matchName;
  }).slice(0, 10);

  useEffect(() => {
      if (!showSuggest) return;
      function handleClick(e: MouseEvent) {
        if (!resultRef.current) return;
        if (!inputRef.current) return;
        if (!resultRef.current.contains(e.target as Node) && !inputRef.current.contains(e.target as Node)) {
          setShowSuggest(false);
        }
      }
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
  }, [showSuggest]);

  return (
    <div className="">
      {/* Banner/Hero with gradient background */}
      <div className="w-full bg-gradient-to-t from-[#007BFF] to-white">
        <div className="mx-auto flex w-full max-w-[1512px] flex-col items-center gap-8 sm:gap-10 lg:gap-12 pt-6 pb-8 sm:py-[50px] px-4 sm:px-6 lg:px-8">
          <div className="flex w-full max-w-[1294px] flex-col items-center gap-10 lg:gap-20">
            <div className="flex w-full max-w-[1294px] items-center justify-between rounded-full bg-white/15 px-3 sm:px-4 py-2 shadow-[0_4px_14px_0_rgba(0,0,0,0.09)] backdrop-blur-[15px] relative">
              <Link href="/" className="flex-shrink-0 z-10 relative flex items-center">
                {/* Using img for SVG to avoid Next.js Image warnings */}
                <img 
                  src="/svgs/Logo.svg" 
                  alt={tNav('logoAlt')} 
                  style={{ height: "40px", width: "auto", objectFit: "contain", display: "block" }}
                />
              </Link>
              <div className="hidden lg:flex flex-col items-start rounded-[33px] bg-white/45 p-[4px] backdrop-blur-[5px]">
                <nav className="flex items-center gap-6 rounded-full px-4 py-2">
                  {[
                    tNav('home'),
                    tNav('medicalFacilities'),
                    tNav('medicalServices'),
                    tNav('doctors'),
                    tNav('bookAppointment'),
                    tNav('contact'),
                    tNav('aiAssistant'),
                  ].map((label) => (
                    <span key={label} className="font-semibold text-[16px] leading-tight tracking-[-0.64px] text-transparent bg-clip-text cursor-pointer whitespace-nowrap px-1" style={{ backgroundImage: "linear-gradient(90deg, #007BFF 0%, #4DBFFF 100%)" }}>
                      {label}
                    </span>
                  ))}
                </nav>
              </div>
              {/* Desktop: User profile with dropdown */}
              <div className="hidden lg:flex items-center gap-4">
                <MobileLangSwitcher />
                <NotificationDropdown />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 outline-none cursor-pointer" aria-label="User menu">
                      <span className="font-semibold text-[16px] leading-none tracking-[-0.64px] text-transparent bg-clip-text truncate max-w-[150px]" style={{ backgroundImage: "linear-gradient(90deg, #007BFF 0%, #4DBFFF 100%)" }}>
                        NGUYỄN HOA MAI
                      </span>
                      <div className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-black/5">
                        <Image src="/imgs/avatar.png" alt={tNav('avatarAlt')} width={32} height={32} />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">NGUYỄN HOA MAI</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {/* Optional: User email or role can be added here */}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => console.log('logout action')}>
                      {tUser('logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {/* Mobile: always show bell + hamburger at right side */}
              <div className="flex flex-row items-center gap-x-6 lg:hidden">
                <NotificationDropdown />
                <MobileNavDrawer />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-8 lg:gap-12 w-full max-w-[1294px]">
              <div className="flex w-full max-w-[770px] flex-col items-start justify-center gap-6 sm:gap-8 lg:gap-12 order-1 md:order-1 md:col-span-7">
                <div className="flex w-full max-w-[28rem] md:max-w-[32rem] flex-col items-start gap-4">
                  <h1 className="font-black leading-[120%] tracking-[-0.46px] text-3xl sm:text-4xl lg:text-5xl">
                    <span className="text-black">{tHome('searchTitlePart1')}</span>
                    <br />
                    <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #1D4ED8 0%, #4DBFFF 100%)" }}>{tHome('searchTitlePart2')}</span>
                  </h1>
                  <p className="self-stretch text-black/60 font-medium leading-[120%] tracking-[-0.117px] text-sm sm:text-base">
                    {tHome('searchDescription')}
                  </p>
                </div>
                {/* Image shown above the form when stacked (mobile) */}
                <div className="relative block md:hidden mt-4 w-full">
                  {/* Using img for SVG to avoid Next.js Image warnings */}
                  <img 
                    src="/svgs/banner-art.svg" 
                    alt={tHome('bannerAlt')} 
                    style={{ width: "100%", height: "auto", maxWidth: "480px", margin: "0 auto", display: "block" }}
                    loading="lazy"
                  />
                </div>
                {/* Inline form with the left block on md+ */}
                <div className="flex w-full flex-col gap-3 md:flex-row md:flex-wrap md:items-center xl:flex-nowrap xl:items-center rounded-[10px] bg-white px-3 py-3 sm:py-4" style={{ boxShadow: "0 54px 53px -23px rgba(22, 28, 45, 0.50)" }}>
                  <div className="flex h-[50px] w-full md:flex-1 md:min-w-[250px] items-center justify-center rounded-[8px] bg-white/0">
                    <div className="relative w-full [&>button]:box-border [&>button]:h-[50px] [&>button]:w-full [&>button]:rounded-lg [&>button]:border [&>button]:border-black/10 [&>button]:bg-white [&>button]:px-4 [&>button]:py-0 [&>button]:text-sm [&>button]:leading-none [&>button]:text-black/80">
                      <Select>
                        <SelectTrigger className="!box-border !h-[50px] !w-full !px-4 !py-0" style={{ boxSizing: "border-box", height: "50px" }}>
                          <SelectValue placeholder={tForm('areaPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hn">{tForm('hanoi')}</SelectItem>
                          <SelectItem value="hcm">{tForm('hcmc')}</SelectItem>
                          <SelectItem value="dn">{tForm('danang')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <Input
                      ref={inputRef}
                      className={`box-border h-[50px] rounded-lg border border-black/10 bg-white px-4 py-0 text-sm leading-none placeholder:text-black/60 ${inputAnimWidthClass}`}
                      placeholder={tForm('hospitalNamePlaceholder')}
                      aria-label={tForm('hospitalNamePlaceholder')}
                      value={searchValue}
                      onChange={e => { setSearchValue(e.target.value); setShowSuggest(true); }}
                      onFocus={() => { setShowSuggest(true); setIsInputFocused(true); }}
                      onBlur={() => setIsInputFocused(false)}
                      spellCheck={false}
                    />
                    {showSuggest && (filtered.length > 0 || !!searchValue) && (
                      <div ref={resultRef} className="absolute z-20 left-0 right-0 mt-1 w-full rounded-xl bg-white shadow-xl border border-slate-200 max-h-80 overflow-y-auto min-w-0">
                        {filtered.length === 0 ? (
                          <div className="p-4 text-sm text-slate-500 text-center">Không tìm thấy bệnh viện phù hợp.</div>
                        ) : (
                          filtered.map(hospital => (
                            <Link 
                              key={hospital.id} 
                              href={`/hospitals/${hospital.slug}`}
                              prefetch={true}
                              className="flex items-center px-4 py-2 gap-3 hover:bg-slate-50 transition cursor-pointer"
                            >
                              <Image 
                                src={hospital.logo ?? "/svgs/Logo.svg"} 
                                alt={hospital.name} 
                                width={32}
                                height={32}
                                className="h-8 w-8 rounded-full object-contain border border-slate-100" 
                                loading="lazy"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="font-semibold text-sm text-slate-700 truncate">{hospital.name}</div>
                                <div className="text-xs text-slate-500 truncate">{hospital.address}</div>
                              </div>
                              <div className="ml-2 px-2 py-1 text-xs rounded bg-[#007BFF] text-white font-semibold cursor-pointer">Xem chi tiết</div>
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    className={btnAnimWidthClass + " h-[50px] px-3"}
                    style={{ backgroundImage: "linear-gradient(90deg, #51C0FF 0%, #007BFF 100%)" }}
                  >
                    {isInputFocused ? (
                      <Search className="w-6 h-6" />
                    ) : (
                      <span className="text-center font-bold leading-[32px] tracking-[-0.6px] text-base">{tForm('searchButton')}</span>
                    )}
                  </button>
                </div>
              </div>
              <div className="relative hidden md:flex items-center justify-center mt-6 md:mt-0 order-2 md:order-2 md:col-span-5">
                {/* Using img for SVG to avoid Next.js Image warnings */}
                <img 
                  src="/svgs/banner-art.svg" 
                  alt={tHome('bannerAlt')} 
                  style={{ width: "100%", height: "auto", maxWidth: "480px", display: "block" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hospitals List - new styled block with Swiper */}
      <HospitalsStyledSection />
      <HomeMainFeatureSection />
      <HomeFooter />
    </div>
  );
}
