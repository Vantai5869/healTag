"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { HospitalVariantConfig } from "@/lib/hospitals";
import { getColorClasses } from "@/lib/colors";

interface HospitalLandingProps {
  config: HospitalVariantConfig;
}

export default function HospitalLanding({ config }: HospitalLandingProps) {
  const t = useTranslations(config.i18nKey);

  const primary = getColorClasses(config.themeColor);
  const accent = getColorClasses(config.accent ?? config.themeColor);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className={cn("w-full")}
        style={
          config.heroGradient
            ? {
                backgroundImage: `linear-gradient(180deg, ${config.heroGradient.from}, ${config.heroGradient.to}00), linear-gradient(180deg, transparent, transparent)`
              }
            : undefined
        }
      >
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className={cn("grid items-center gap-8", config.layout === "compact" ? "md:grid-cols-3" : "md:grid-cols-2")}> 
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                {t("title", { name: config.name })}
              </h1>
              <p className="mt-4 text-muted-foreground">
                {t("subtitle")}
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#booking">
                  <Button
                    className={cn("text-white rounded-xl shadow-sm border-0")}
                    style={
                      config.buttonGradient
                        ? { backgroundImage: `linear-gradient(90deg, ${config.buttonGradient.from}, ${config.buttonGradient.to})` }
                        : undefined
                    }
                  > 
                    {t("ctaPrimary")}
                  </Button>
                </a>
                <a href="#services">
                  <Button variant="outline" className={cn("rounded-xl", accent.border, accent.text)}>
                    {t("ctaSecondary")}
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative h-56 md:h-72 lg:h-80">
              {config.heroImage && (
                <Image
                  src={config.heroImage}
                  alt={config.name}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{t("services.title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("services.subtitle")}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card key={idx} className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{t(`services.items.${idx + 1}.title`)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t(`services.items.${idx + 1}.desc`)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="mx-auto max-w-6xl px-4 pb-16">
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="tracking-tight">{t("booking.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-4" onSubmit={(e) => e.preventDefault()}>
              <div className="md:col-span-1">
                <Input placeholder={t("booking.namePlaceholder")} aria-label={t("booking.nameAria") as string} />
              </div>
              <div className="md:col-span-1">
                <Input type="tel" placeholder={t("booking.phonePlaceholder")} aria-label={t("booking.phoneAria") as string} />
              </div>
              <div className="md:col-span-1">
                <Input type="date" aria-label={t("booking.dateAria") as string} />
              </div>
              <div className="md:col-span-1">
                <Select>
                  <SelectTrigger aria-label={t("booking.departmentAria") as string}>
                    <SelectValue placeholder={t("booking.departmentPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">{t("booking.departments.general")}</SelectItem>
                    <SelectItem value="cardio">{t("booking.departments.cardio")}</SelectItem>
                    <SelectItem value="pediatrics">{t("booking.departments.pediatrics")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-4">
                <Button className={cn(primary.buttonBg, primary.buttonHover, "text-white rounded-xl")}> 
                  {t("booking.submit")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}


