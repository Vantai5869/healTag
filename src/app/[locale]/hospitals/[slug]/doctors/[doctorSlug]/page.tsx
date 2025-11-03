import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getHospitalConfigBySlug, getAllHospitalSlugs } from "@/lib/hospitals";
import { getDoctorBySlug, getAllDoctorSlugs } from "@/lib/doctors";

// Lazy load DoctorDetailPage để tối ưu bundle size
const DoctorDetailPage = dynamic(() => import("@/components/pages/DoctorDetailPage"), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-[#FAFBFE]" />
});

export default async function DoctorDetailPageRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string; doctorSlug: string }>;
}) {
  const { locale, slug, doctorSlug } = await params;
  setRequestLocale(locale);

  const hospitalConfig = getHospitalConfigBySlug(slug);
  if (!hospitalConfig) {
    notFound();
  }

  const doctor = getDoctorBySlug(doctorSlug);
  if (!doctor) {
    notFound();
  }

  return <DoctorDetailPage doctor={doctor} hospitalConfig={hospitalConfig} />;
}

export function generateStaticParams() {
  const doctorSlugs = getAllDoctorSlugs();
  const hospitalSlugs = getAllHospitalSlugs();
  
  const params: Array<{ slug: string; doctorSlug: string }> = [];
  hospitalSlugs.forEach((slug) => {
    doctorSlugs.forEach((doctorSlug) => {
      params.push({ slug, doctorSlug });
    });
  });
  
  return params;
}

