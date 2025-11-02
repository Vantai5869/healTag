import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getHospitalConfigBySlug, getAllHospitalSlugs } from "@/lib/hospitals";
import BookingPage from "@/components/pages/BookingPage";

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

