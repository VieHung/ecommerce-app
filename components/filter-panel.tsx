'use client'

import { useState } from 'react'
import { LOCATIONS, PRICE_MIN, PRICE_MAX, formatPrice } from '@/lib/data'

interface FilterPanelProps {
  maxPrice: number
  location: string
  onApply: (maxPrice: number, location: string) => void
}

export function FilterPanel({ maxPrice, location, onApply }: FilterPanelProps) {
  const [draftPrice, setDraftPrice] = useState(maxPrice)
  const [draftLocation, setDraftLocation] = useState(location)

  return (
    <div className="pb-4">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Lọc nâng cao</h3>

        {/* Price slider */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-gray-600">Mức giá tối đa</label>
            <span className="text-xs font-bold text-orange-600">{formatPrice(draftPrice)}/ngày</span>
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10000}
            value={draftPrice}
            onChange={(e) => setDraftPrice(Number(e.target.value))}
            className="w-full accent-orange-500 cursor-pointer"
            aria-label="Mức giá tối đa"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>{formatPrice(PRICE_MIN)}</span>
            <span>{formatPrice(PRICE_MAX)}</span>
          </div>
        </div>

        {/* Location chips */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-600 mb-2">Khu vực</label>
          <div className="flex flex-wrap gap-2">
            {LOCATIONS.map((loc) => {
              const active = draftLocation === loc
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setDraftLocation(loc)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    active
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                  }`}
                >
                  {loc}
                </button>
              )
            })}
          </div>
        </div>

        {/* Apply */}
        <button
          type="button"
          onClick={() => onApply(draftPrice, draftLocation)}
          className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-200 transition-colors"
        >
          Áp dụng
        </button>
      </div>
    </div>
  )
}
