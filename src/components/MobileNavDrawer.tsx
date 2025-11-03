"use client";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";

const menu = [
  { label: "Trang chủ", href: "/" },
  { label: "Cơ sở y tế", href: "/hospitals" },
  { label: "Dịch vụ y tế", href: "/services" },
  { label: "Bác sĩ", href: "/doctors" },
  { label: "Đặt lịch khám", href: "/booking" },
  { label: "Liên hệ", href: "/contact" },
  { label: "Trợ lý AI", href: "/assistant" },
];

// Dùng mock info, thay bằng real data khi cần
const user = {
  name: "NGUYỄN HOA MAI",
  avatar: "/imgs/avatar.png",
};

export default function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale?.toString() || "en";
  const isEN = locale === "en";
  const nextLocale = isEN ? "vi" : "en";
  const label = isEN ? "ENG" : "VIE";
  function handleLangSwitch() {
    const segments = pathname.split("/");
    if (segments.length > 1) segments[1] = nextLocale;
    router.replace(segments.join("/"));
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open navigation"
          className="flex items-center justify-center h-10 w-10 rounded-full border border-transparent bg-[#007BFF] text-white hover:bg-[#026ae0] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 w-full max-w-sm sm:max-w-md flex flex-col bg-gradient-to-b from-[#007BFF] to-[#51C1FF] text-white">
        <SheetHeader className="px-4 py-2">
          <SheetTitle className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/60 bg-white/10 flex-shrink-0">
              <Image src={user.avatar} alt="Avatar" width={36} height={36} />
            </div>
            <span className="text-white/95 font-medium text-base truncate">{user.name}</span>
          </SheetTitle>
        </SheetHeader>
        {/* Divider line */}
        <div className="h-px bg-white/20 mx-4"></div>
        <nav className="flex-1 overflow-y-auto px-0 flex flex-col mt-1">
          {menu.map((item) => (
            <div key={item.href} className="px-0">
              <Link
                href={item.href}
                className="block px-4 py-3 font-medium text-base text-white/95 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 hover:bg-white/10 transition"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
              <div className="h-px bg-white/12 mx-4"></div>
            </div>
          ))}
          {/* Mobile language switcher placed at bottom of drawer (mobile only) */}
          <div className="mt-4 mb-3 flex flex-row w-full justify-center">
            <button
              type="button"
              onClick={handleLangSwitch}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white/95 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition"
              aria-label="Chuyển ngôn ngữ"
            >
              <Globe className="h-5 w-5" />
              <span className="text-xs font-semibold tracking-wide uppercase">{label}</span>
            </button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
