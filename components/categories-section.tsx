'use client'

import {
  Grid3X3,
  Camera,
  Music,
  Tent,
  Shirt,
  Monitor,
  Home,
  Activity,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'
import { CATEGORIES } from '@/lib/data'

const ICON_MAP: Record<string, LucideIcon> = {
  Grid3X3,
  Camera,
  Music,
  Tent,
  Shirt,
  Monitor,
  Home,
  Activity,
  BookOpen,
}

interface CategoriesSectionProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function CategoriesSection({ selectedCategory, onSelectCategory }: CategoriesSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900">Danh mục phổ biến</h2>
        <button className="text-sm text-orange-500 font-medium hover:text-orange-600 transition-colors">
          Xem tất cả &rsaquo;
        </button>
      </div>

      {/* Horizontal scroll row */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon] ?? Grid3X3
          const isSelected = selectedCategory === cat.label
          return (
            <button
              key={cat.label}
              onClick={() => onSelectCategory(cat.label)}
              className={`flex flex-col items-center gap-1.5 shrink-0 group transition-all duration-200 ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-200
                  ${isSelected
                    ? 'bg-orange-500 shadow-md shadow-orange-200'
                    : 'bg-white border border-gray-100 group-hover:bg-orange-50 group-hover:border-orange-200'
                  }`}
              >
                <Icon
                  className={`w-6 h-6 transition-colors ${isSelected ? 'text-white' : 'text-gray-500 group-hover:text-orange-500'}`}
                />
              </div>
              <span
                className={`text-[11px] font-medium whitespace-nowrap transition-colors ${
                  isSelected ? 'text-orange-600' : 'text-gray-500 group-hover:text-orange-500'
                }`}
              >
                {cat.label}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
