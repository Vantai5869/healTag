'use client';

import { useMemo } from 'react';
import { useLandingStore } from '@/store/landingStore';
import type { ComponentVariant, SectionType } from '@/lib/landingConfig';
import { Button } from '@/components/ui/button';
import { getSectionComponent, getVariantKeys, getVariantLabel } from '@/lib/componentRegistry';
import { hospitalBySlug } from '@/lib/hospitals';

const VARIANT_LABEL: Record<ComponentVariant, string> = {
  default: 'Mặc định',
  variant1: 'Biến thể 1',
  variant2: 'Biến thể 2',
  variant3: 'Biến thể 3',
};

const SECTION_LABEL: Record<SectionType, string> = {
  header: 'Header',
  hero: 'Hero',
  services: 'Dịch vụ',
  departments: 'Chuyên khoa',
  doctors: 'Bác sĩ',
  news: 'Tin tức',
};

export default function ComponentGallery({ selectedSectionId }: { selectedSectionId: string | null }) {
  const { config, updateSection } = useLandingStore();
  const section = useMemo(() => config.sections.find(s => s.id === selectedSectionId) || null, [config.sections, selectedSectionId]);

  if (!section) {
    return (
      <div className="text-sm text-gray-500 p-4">Chọn một section bên trái để thay thế component.</div>
    );
  }

  const variants: ComponentVariant[] = getVariantKeys(section.type as SectionType);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">Biến thể của: <span className="text-gray-700">{SECTION_LABEL[section.type as SectionType]}</span></h4>
        <div className="flex flex-wrap gap-2">
          {variants.map(v => (
            <Button
              key={v}
              size="sm"
              variant={section.componentVariant === v ? 'default' : 'outline'}
              onClick={() => updateSection(section.id, { componentVariant: v })}
            >
              {getVariantLabel(section.type as SectionType, v)}
            </Button>
          ))}
        </div>
      </div>

      {/* Preview ngay dưới phần chọn biến thể */}
      <div className="border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <div className="font-semibold">Preview</div>
          <div className="text-xs text-gray-500">Hiển thị theo biến thể đã chọn</div>
        </div>
        <div className="p-4">
          {(() => {
            const Comp = getSectionComponent(section.type as any, section.componentVariant as any);
            const sampleConfig = hospitalBySlug['bach-mai'];
            return (
              <div className="mx-auto max-w-[1200px]">
                <Comp config={sampleConfig} theme={{
                  primaryColor: config.theme.primaryColor,
                  gradientFrom: config.theme.gradientFrom,
                  gradientTo: config.theme.gradientTo,
                }} variant={section.componentVariant as any} />
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}


