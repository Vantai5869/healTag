'use client';
import type { HospitalVariantConfig } from "@/lib/hospitals";
import { useLandingStore } from "@/store/landingStore";
import { getSectionComponent } from "@/lib/componentRegistry";
import { useEffect, useState } from 'react';
import { motion } from "motion/react";

export default function HospitalLanding({ config }: { config: HospitalVariantConfig }) {
  const { config: landingConfig } = useLandingStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sort sections by order and filter enabled ones
  const sortedSections = [...landingConfig.sections]
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  // Full-width sections that handle their own container
  const fullWidthSections = ['doctors', 'news'];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FAFBFE] pt-6 md:pt-[50px] pb-[100px] px-2 sm:px-4 md:px-8">
      {sortedSections.map((section) => {
        const SectionComponent = getSectionComponent(section.type, section.componentVariant);
        const isFullWidth = fullWidthSections.includes(section.type);
        
        if (isFullWidth) {
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <SectionComponent
                config={config}
                theme={landingConfig.theme}
                variant={section.componentVariant}
              />
            </motion.div>
          );
        }
        
        // Container sections
        return (
          <motion.div
            key={section.id}
            className="mx-auto max-w-[1200px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <SectionComponent
              config={config}
              theme={landingConfig.theme}
              variant={section.componentVariant}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
