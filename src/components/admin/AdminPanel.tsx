'use client';

import { useLandingStore } from '@/store/landingStore';
import { SectionList } from './SectionList';
import { ThemeEditor } from './ThemeEditor';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Settings } from 'lucide-react';
import ComponentGallery from './ComponentGallery';

export default function AdminPanel() {
  const { config, resetConfig } = useLandingStore();
  const [activeTab, setActiveTab] = useState<'sections' | 'theme'>('sections');
  const [mounted, setMounted] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  // Avoid hydration mismatches due to localStorage-backed store and dnd-kit SSR
  useEffect(() => {
    setMounted(true);
    if (config.sections.length > 0) {
      setSelectedSectionId(config.sections.sort((a, b) => a.order - b.order)[0].id);
    }
  }, [config.sections]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin - Customize Landing Page</h1>
              <p className="text-sm text-gray-500 mt-1">
                Quản lý sections, components và màu sắc của landing page
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  if (confirm('Bạn có chắc muốn reset về cấu hình mặc định?')) {
                    resetConfig();
                  }
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('sections')}
              className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'sections'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Sections & Components
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'theme'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Theme & Colors
            </button>
            {/* Preview tab removed */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'sections' && (
          <div className="grid grid-cols-1 lg:[grid-template-columns:30%_70%] gap-6">
            <div>
              <SectionList selectedSectionId={selectedSectionId} onSelectSection={setSelectedSectionId} />
            </div>
            <div>
              <div className="bg-white rounded-lg shadow p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Thư viện Component</h2>
                <ComponentGallery selectedSectionId={selectedSectionId} />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'theme' && <ThemeEditor />}
      </div>
    </div>
  );
}

