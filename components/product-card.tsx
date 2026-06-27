'use client'

import { useState } from 'react'
import { Star, MapPin, Heart, Eye } from 'lucide-react'
import type { Product } from '@/lib/data'
import { formatPrice } from '@/lib/data'

interface ProductCardProps {
  product: Product
  onViewDetail: (product: Product) => void
}

export function ProductCard({ product, onViewDetail }: ProductCardProps) {
  const [liked, setLiked] = useState(false)

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      onClick={() => onViewDetail(product)}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Heart button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setLiked(!liked)
          }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95
            ${liked ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-400'}`}
          aria-label={liked ? 'Bỏ yêu thích' : 'Yêu thích'}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-2">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-lg font-bold text-orange-500">{formatPrice(product.price)}</span>
          <span className="text-xs text-gray-400">/{product.unit}</span>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="font-medium text-gray-700">{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
          <div className="flex items-center gap-1 max-w-[120px]">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{product.location.split(',')[0]}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onViewDetail(product)
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-50 hover:bg-orange-500 text-orange-500 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200 border border-orange-100 hover:border-orange-500"
        >
          <Eye className="w-4 h-4" />
          Xem chi tiết
        </button>
      </div>
    </article>
  )
}
