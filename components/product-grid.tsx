'use client'

import { ChevronDown, MapPin } from 'lucide-react'
import type { Product } from '@/lib/data'
import { ProductCard } from './product-card'

interface ProductGridProps {
  products: Product[]
  onViewDetail: (product: Product) => void
}

export function ProductGrid({ products, onViewDetail }: ProductGridProps) {
  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">Gợi ý cho bạn</h2>
        <div className="flex items-center gap-2">
          {/* Sort dropdown */}
          <button className="flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:border-orange-300 hover:text-orange-600 transition-colors">
            <span>Mới nhất</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {/* Location filter */}
          <button className="hidden sm:flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:border-orange-300 hover:text-orange-600 transition-colors">
            <MapPin className="w-3.5 h-3.5" />
            <span>Hà Nội</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onViewDetail={onViewDetail} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-gray-500 text-sm">Không tìm thấy sản phẩm phù hợp.</p>
          <p className="text-gray-400 text-xs mt-1">Hãy thử tìm kiếm với từ khóa khác.</p>
        </div>
      )}
    </section>
  )
}
