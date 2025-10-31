'use client';

import { useLandingStore } from '@/store/landingStore';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export function PreviewPanel() {
  const { config } = useLandingStore();
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    // In a real app, you'd construct the preview URL
    // For now, we'll use the hospital landing page
    const baseUrl = window.location.origin;
    setPreviewUrl(`${baseUrl}/vi/hospitals/preview`);
  }, []);

  const handleOpenPreview = () => {
    window.open(previewUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Preview Landing Page</h2>
        <p className="text-sm text-gray-600 mb-6">
          Xem trước landing page với các cấu hình hiện tại. Nhấn nút bên dưới để mở trong tab mới.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Cấu hình hiện tại:</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Sections enabled: </span>
                <span className="font-medium">
                  {config.sections.filter((s) => s.enabled).length} / {config.sections.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Primary Color: </span>
                <span
                  className="font-medium inline-block w-4 h-4 rounded align-middle mr-2"
                  style={{ backgroundColor: config.theme.primaryColor }}
                />
                <span className="font-mono">{config.theme.primaryColor}</span>
              </div>
              <div>
                <span className="text-gray-600">Gradient: </span>
                <span className="font-mono text-xs">
                  {config.theme.gradientFrom} → {config.theme.gradientTo}
                </span>
              </div>
            </div>
          </div>

          <Button onClick={handleOpenPreview} className="w-full sm:w-auto">
            <ExternalLink className="w-4 h-4 mr-2" />
            Mở Preview trong tab mới
          </Button>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Lưu ý:</strong> Preview sẽ hiển thị landing page với tất cả các cấu hình bạn đã thay đổi.
              Thứ tự sections, component variants, và màu sắc sẽ được áp dụng ngay lập tức.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
