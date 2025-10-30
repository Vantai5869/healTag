"use client";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MobileLangSwitcher from "@/components/MobileLangSwitcher";

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
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open navigation"
          className="flex items-center justify-center h-10 w-10 rounded-full border border-transparent hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 w-full max-w-sm sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <span className="font-bold text-lg tracking-tight">Menu</span>
          </SheetTitle>
        </SheetHeader>
        {/* User info area */}
        <div className="flex flex-col items-center justify-center mt-6 mb-6">
          <div className="h-12 w-12 overflow-hidden rounded-full ring-1 ring-black/5 mb-2">
            <Image src={user.avatar} alt="Avatar" width={48} height={48} />
          </div>
          <p className="font-semibold text-base tracking-tight text-center text-gray-900">{user.name}</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-6 flex flex-col gap-3">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-4 py-3 font-medium text-lg focus:bg-slate-100 hover:bg-slate-50 transition"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {/* Mobile language switcher placed at bottom of drawer (mobile only) */}
          <div className="mt-8 flex flex-row w-full justify-center">
            <MobileLangSwitcher />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
