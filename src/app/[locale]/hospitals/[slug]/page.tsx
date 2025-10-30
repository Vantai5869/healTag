import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import HospitalLanding from "@/components/pages/HospitalLanding";
import { getAllHospitalSlugs, getHospitalConfigBySlug } from "@/lib/hospitals";

export default async function HospitalLandingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const config = getHospitalConfigBySlug(slug);
  if (!config) {
    notFound();
  }

  return <HospitalLanding config={config} />;
}

export function generateStaticParams() {
  const slugs = getAllHospitalSlugs();
  return slugs.map((slug) => ({ slug }));
}


