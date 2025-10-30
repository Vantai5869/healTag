export interface MiniHospital {
  id: string;
  name: string;
  address: string;
  logo?: string;
}

export const SAMPLE_HOSPITALS: MiniHospital[] = [
  { id: "1", name: "Bệnh viện Bạch Mai", address: "78 Giải Phóng, Đống Đa, Hà Nội", logo: "/svgs/Logo.svg" },
  { id: "2", name: "Bệnh viện Việt Đức", address: "40 Tràng Thi, Hoàn Kiếm, Hà Nội", logo: "/svgs/Logo.svg" },
  { id: "3", name: "BV TW Quân đội 108", address: "1 Trần Hưng Đạo, Hai Bà Trưng, Hà Nội", logo: "/svgs/Logo.svg" },
  { id: "4", name: "Bệnh viện Chợ Rẫy", address: "201B Nguyễn Chí Thanh, Q.5, TP.HCM", logo: "/svgs/Logo.svg" },
  { id: "5", name: "Bệnh viện Từ Dũ", address: "284 Cống Quỳnh, Q.1, TP.HCM", logo: "/svgs/Logo.svg" },
  { id: "6", name: "Bệnh viện 115", address: "527 Sư Vạn Hạnh, Q.10, TP.HCM", logo: "/svgs/Logo.svg" },
  { id: "7", name: "Bệnh viện Hữu Nghị", address: "1 Trần Khánh Dư, Hai Bà Trưng, Hà Nội", logo: "/svgs/Logo.svg" },
  { id: "8", name: "Bệnh viện Nhi Đồng 1", address: "341 Sư Vạn Hạnh, Q.10, TP.HCM", logo: "/svgs/Logo.svg" },
];
