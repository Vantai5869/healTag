'use client';

import { useLandingStore } from '@/store/landingStore';
import { Button } from '@/components/ui/button';
import type { ComponentVariant } from '@/lib/landingConfig';

interface ComponentSelectorProps {
  sectionId: string;
  sectionType: string;
}

const AVAILABLE_VARIANTS: ComponentVariant[] = ['default', 'variant1', 'variant2', 'variant3'];

const VARIANT_LABELS: Record<ComponentVariant, string> = {
  default: 'Mặc định',
  variant1: 'Biến thể 1',
  variant2: 'Biến thể 2',
  variant3: 'Biến thể 3',
};

export function ComponentSelector({ sectionId }: ComponentSelectorProps) {
  const { config, updateSection } = useLandingStore();
  const section = config.sections.find((s) => s.id === sectionId);

  if (!section) return null;

  const handleVariantChange = (variant: ComponentVariant) => {
    updateSection(sectionId, { componentVariant: variant });
  };

  return (
    <div>
      <h4 className="font-medium text-sm text-gray-700 mb-3">Chọn Component Variant</h4>
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_VARIANTS.map((variant) => (
          <Button
            key={variant}
            variant={section.componentVariant === variant ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleVariantChange(variant)}
            className={
              section.componentVariant === variant
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }
          >
            {VARIANT_LABELS[variant]}
          </Button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Lưu ý: Các variant khác nhau sẽ sử dụng component khác nhau nhưng giữ nguyên chức năng
      </p>
    </div>
  );
}

