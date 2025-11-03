import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getHospitalConfigBySlug, getAllHospitalSlugs } from "@/lib/hospitals";

// Lazy load BookingPage để tối ưu bundle size
const BookingPage = dynamic(() => import("@/components/pages/BookingPage"), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-[#FAFBFE]" />
});

export default async function BookingPageRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const hospitalConfig = getHospitalConfigBySlug(slug);
  if (!hospitalConfig) {
    notFound();
  }

  return <BookingPage hospitalConfig={hospitalConfig} />;
}

export function generateStaticParams() {
  const hospitalSlugs = getAllHospitalSlugs();

  return hospitalSlugs.map((slug) => ({ slug }));
}

