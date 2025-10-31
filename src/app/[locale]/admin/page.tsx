import AdminPanel from "@/components/admin/AdminPanel";
import type { Metadata } from 'next';

export default function AdminPage() {
  // Client page: locale is already provided by the layout/provider
  return <AdminPanel />;
}

// Avoid SEO/indexing and neutralize social previews for the admin area
export const metadata: Metadata = {
  title: 'Admin - HealTAG',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Admin - HealTAG',
    description: 'Administrative console',
  },
};

