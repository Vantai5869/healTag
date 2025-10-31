'use client';

import { useLandingStore } from '@/store/landingStore';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Settings2 } from 'lucide-react';
import { ComponentSelector } from './ComponentSelector';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const SECTION_LABELS: Record<string, string> = {
  header: 'Header',
  hero: 'Hero Section',
  services: 'Dịch vụ',
  departments: 'Chuyên khoa',
  doctors: 'Đội ngũ bác sĩ',
  news: 'Tin tức',
};

export function SectionList({ selectedSectionId, onSelectSection }: { selectedSectionId: string | null; onSelectSection: (id: string) => void; }) {
  const { config, reorderSections, toggleSection } = useLandingStore();
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortedSections = [...config.sections].sort((a, b) => a.order - b.order);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sortedSections.findIndex((s) => s.id === active.id);
      const newIndex = sortedSections.findIndex((s) => s.id === over.id);

      const newOrder = arrayMove(sortedSections, oldIndex, newIndex).map((s) => s.id);
      reorderSections(newOrder);
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Sắp xếp Sections</h2>
        <p className="text-sm text-gray-600 mb-6">
          Kéo thả các sections để thay đổi thứ tự hiển thị trên landing page
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedSections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {sortedSections.map((section) => (
                <SortableSectionItem
                  key={section.id}
                  section={section}
                  isEditing={editingSection === section.id}
                  isSelected={selectedSectionId === section.id}
                  onToggleEdit={() =>
                    setEditingSection(editingSection === section.id ? null : section.id)
                  }
                  onToggleEnabled={() => toggleSection(section.id)}
                  onSelect={() => onSelectSection(section.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

interface SortableSectionItemProps {
  section: { id: string; type: string; enabled: boolean; componentVariant: string };
  isEditing: boolean;
  isSelected: boolean;
  onToggleEdit: () => void;
  onToggleEnabled: () => void;
  onSelect: () => void;
}

function SortableSectionItem({
  section,
  isEditing,
  isSelected,
  onToggleEdit,
  onToggleEnabled,
  onSelect,
}: SortableSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`bg-gray-50 rounded-lg border-2 p-4 cursor-pointer ${
        isDragging ? 'border-blue-500' : isSelected ? 'border-blue-400' : 'border-gray-200'
      } ${!section.enabled ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-medium text-gray-900">
              {SECTION_LABELS[section.type] || section.type}
            </h3>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
              {section.componentVariant}
            </span>
            {!section.enabled && (
              <span className="text-xs text-gray-500 bg-red-100 text-red-700 px-2 py-1 rounded">
                Đã tắt
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleEnabled}
            title={section.enabled ? 'Ẩn section' : 'Hiện section'}
          >
            {section.enabled ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggleEdit}>
            <Settings2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isEditing && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <ComponentSelector sectionId={section.id} sectionType={section.type} />
        </div>
      )}
    </div>
  );
}

