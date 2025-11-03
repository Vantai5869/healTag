import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { jsonLdScriptProps } from "react-schemaorg";
import { WebSite } from "schema-dts";
import { Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "swiper/css";
import "swiper/css/pagination";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Extract domain to a constant to avoid repetition
const DOMAIN = "https://heal-tag.vercel.app";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Metadata" });
  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          {...jsonLdScriptProps<WebSite>({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: t("title"),
            description: t("description"),
            url: DOMAIN,
            inLanguage: locale,
          })}
        />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

const locales = ["en", "vi"] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: DOMAIN,
      siteName: "HealTAG",
      images: [
        {
          url: `${DOMAIN}/og-image.png?v=2`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${DOMAIN}/og-image.png?v=2`],
    },
    alternates: {
      canonical: DOMAIN,
      languages: {
        en: `${DOMAIN}/en`,
        vi: `${DOMAIN}/vi`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
