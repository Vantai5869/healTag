# HealTAG

> Cổng đặt lịch khám bệnh viện toàn quốc – tìm kiếm cơ sở y tế, xem thông tin và đặt lịch chính thống nhanh chóng.

## Tính năng chính

- Landing page bệnh viện tùy biến: thay đổi màu, sắp xếp section, chọn biến thể (variant)
- Tìm kiếm bệnh viện kèm gợi ý và nút “Đặt lịch ngay” theo từng bệnh viện
- i18n (vi/en) với `next-intl`
- UI sử dụng shadcn/ui, hỗ trợ dark mode
- Slider bác sĩ, danh sách dịch vụ, tin tức

## Phát triển

```bash
yarn
yarn dev
# mở http://localhost:3000
```

## Build & Deploy

```bash
yarn build
yarn start
```

## Cấu trúc thư mục rút gọn

```
public/                # asset tĩnh (og-image.png, imgs/...)
src/app/[locale]/      # App Router theo ngôn ngữ
src/components/        # components UI và sections
src/lib/               # logic, registry, cấu hình landing
src/i18n/              # routing & helpers i18n
```

## SEO & Preview
- Thay ảnh OG tại `public/og-image.png` (khuyến nghị 1200x630).
- Metadata đã dùng thương hiệu HealTAG; trang admin đã chặn index.

## Bản quyền
© HealTAG. Tất cả quyền được bảo lưu.
