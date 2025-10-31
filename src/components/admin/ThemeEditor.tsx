'use client';

import { useLandingStore } from '@/store/landingStore';
import { useState } from 'react';

export function ThemeEditor() {
  const { config, updateTheme } = useLandingStore();
  const [localTheme, setLocalTheme] = useState(config.theme);

  const handleColorChange = (field: 'primaryColor' | 'gradientFrom' | 'gradientTo', value: string) => {
    const newTheme = { ...localTheme, [field]: value };
    setLocalTheme(newTheme);
    updateTheme(newTheme);
  };

  const presetColors = [
    { name: 'Blue', primary: '#3A8EF6', from: '#3A8EF6', to: '#6F3AFA' },
    { name: 'Purple', primary: '#8B5CF6', from: '#8B5CF6', to: '#EC4899' },
    { name: 'Green', primary: '#10B981', from: '#10B981', to: '#059669' },
    { name: 'Orange', primary: '#F59E0B', from: '#F59E0B', to: '#EF4444' },
    { name: 'Pink', primary: '#EC4899', from: '#EC4899', to: '#8B5CF6' },
    { name: 'Teal', primary: '#14B8A6', from: '#14B8A6', to: '#0D9488' },
  ];

  const applyPreset = (preset: typeof presetColors[0]) => {
    const newTheme = {
      primaryColor: preset.primary,
      gradientFrom: preset.from,
      gradientTo: preset.to,
    };
    setLocalTheme(newTheme);
    updateTheme(newTheme);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Màu sắc chủ đạo</h2>
        <p className="text-sm text-gray-600 mb-6">
          Thay đổi màu sắc chủ đạo của landing page. Các màu này sẽ được áp dụng cho các gradient và buttons.
        </p>

        {/* Color Pickers */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Màu chính (Primary Color)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={localTheme.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={localTheme.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="#3A8EF6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gradient - Màu bắt đầu (From)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={localTheme.gradientFrom}
                onChange={(e) => handleColorChange('gradientFrom', e.target.value)}
                className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={localTheme.gradientFrom}
                onChange={(e) => handleColorChange('gradientFrom', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="#3A8EF6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gradient - Màu kết thúc (To)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={localTheme.gradientTo}
                onChange={(e) => handleColorChange('gradientTo', e.target.value)}
                className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={localTheme.gradientTo}
                onChange={(e) => handleColorChange('gradientTo', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="#6F3AFA"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preset Colors */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Màu sắc có sẵn</h3>
        <p className="text-sm text-gray-600 mb-4">
          Chọn một trong các bộ màu có sẵn để áp dụng nhanh:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {presetColors.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded"
                  style={{
                    background: `linear-gradient(to right, ${preset.from}, ${preset.to})`,
                  }}
                />
                <span className="font-medium text-sm">{preset.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <div className="space-y-3">
          <div
            className="h-20 rounded-lg flex items-center justify-center text-white font-semibold"
            style={{
              background: `linear-gradient(to right, ${localTheme.gradientFrom}, ${localTheme.gradientTo})`,
            }}
          >
            Gradient Preview
          </div>
          <button
            className="px-6 py-3 rounded-lg text-white font-semibold"
            style={{ backgroundColor: localTheme.primaryColor }}
          >
            Button Preview
          </button>
        </div>
      </div>
    </div>
  );
}

