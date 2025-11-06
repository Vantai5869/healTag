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
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from '@/i18n/navigation';

// Lazy load các component nặng để tối ưu initial load
const HospitalsStyledSection = dynamic(
  () => import("@/components/pages/home/HospitalsStyledSection"),
  { ssr: true }
);

// const HomeMainFeatureSection = dynamic(
//   () => import("@/components/pages/HomeMainFeatureSection"),
//   { ssr: true }
// );

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
  const [isInputFocused, setIsInputFocused] = useState(false);

  const inputAnimWidthClass = `transition-all duration-300 w-full xl:w-[${isInputFocused ? 360 : 250}px]`;
  const btnAnimWidthClass = `transition-all duration-300 items-center justify-center rounded-[8px] text-white cursor-pointer ${isInputFocused ? 'xl:w-[64px]' : 'xl:w-[180px]'} w-full xl:flex-none flex`;

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
                      className={`box-border h-[50px] rounded-lg border border-black/10 bg-white px-4 py-0 text-base sm:text-sm leading-none placeholder:text-black/60 ${inputAnimWidthClass}`}
                      placeholder={tForm('hospitalNamePlaceholder')}
                      aria-label={tForm('hospitalNamePlaceholder')}
                      value={searchValue}
                      onChange={e => setSearchValue(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      spellCheck={false}
                    />
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
                <Image 
                  src="/svgs/banner-art.svg" 
                  alt={tHome('bannerAlt')} 
                  width={499}
                  height={339}
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 768px) 480px, 100vw"
                  style={{ width: "100%", height: "auto", maxWidth: "480px", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <HospitalsStyledSection searchValue={searchValue} />
      {/* <HomeMainFeatureSection /> */}
      <HomeFooter />
    </div>
  );
}
