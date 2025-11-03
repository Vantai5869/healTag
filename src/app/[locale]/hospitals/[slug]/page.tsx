import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getAllHospitalSlugs, getHospitalConfigBySlug } from "@/lib/hospitals";

// Lazy load các hospital landing pages để tối ưu bundle size
const HospitalLanding = dynamic(() => import("@/components/pages/HospitalLanding"), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-[#FAFBFE]" />
});

const HospitalLanding2 = dynamic(() => import("@/components/pages/HospitalLanding2"), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-[#FAFBFE]" />
});

const HospitalLanding3 = dynamic(() => import("@/components/pages/HospitalLanding3"), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-[#FAFBFE]" />
});

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

  // In the future, landingPageVariant will be determined by API call
  // For now, use the variant from config (defaults to 1 if not specified)
  const variant = config.landingPageVariant ?? 1;

  switch (variant) {
    case 2:
      return <HospitalLanding2 config={config} />;
    case 3:
      return <HospitalLanding3 config={config} />;
    case 1:
    default:
  return <HospitalLanding config={config} />;
  }
}

export function generateStaticParams() {
  const slugs = getAllHospitalSlugs();
  return slugs.map((slug) => ({ slug }));
}


