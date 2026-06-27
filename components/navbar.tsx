'use client'

import { Search, ShoppingCart, SlidersHorizontal, ShoppingBag } from 'lucide-react'
import { FilterPanel } from '@/components/filter-panel'

interface NavbarProps {
  cartCount: number
  onCartOpen: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  filterOpen: boolean
  onToggleFilter: () => void
  filterActive: boolean
  maxPrice: number
  location: string
  onApplyFilter: (maxPrice: number, location: string) => void
}

export function Navbar({
  cartCount,
  onCartOpen,
  searchQuery,
  onSearchChange,
  filterOpen,
  onToggleFilter,
  filterActive,
  maxPrice,
  location,
  onApplyFilter,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight hidden sm:block">
              Student<span className="text-orange-500">Rent</span>
            </span>
          </div>

          {/* Search bar (desktop center) */}
          <div className="flex-1 max-w-xl mx-auto hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tìm kiếm đồ dùng bạn cần..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={onToggleFilter}
              aria-pressed={filterOpen}
              className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${
                filterOpen || filterActive
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                  : 'text-gray-500 hover:bg-orange-50 hover:text-orange-500'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              {filterActive && !filterOpen && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              )}
              <span className="sr-only">Bộ lọc</span>
            </button>

            <button
              onClick={onCartOpen}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Giỏ hàng</span>
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 cursor-pointer hover:bg-orange-200 transition-colors">
              <span className="text-orange-600 font-semibold text-sm">MA</span>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm kiếm đồ dùng bạn cần..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <FilterPanel
            maxPrice={maxPrice}
            location={location}
            onApply={onApplyFilter}
          />
        )}
      </div>
    </header>
  )
}
