'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Star,
  MapPin,
  ShoppingCart,
  Minus,
  Plus,
  X,
  CheckCircle,
  Tag,
  Package,
} from 'lucide-react'
import type { Product, CartItem } from '@/lib/data'
import { formatPrice, REVIEWS } from '@/lib/data'

interface ProductModalProps {
  product: Product | null
  open: boolean
  onClose: () => void
  onAddToCart: (item: CartItem) => void
}

export function ProductModal({ product, open, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [days, setDays] = useState(1)

  if (!product) return null

  const total = product.price * quantity * days

  const handleAddToCart = () => {
    onAddToCart({ product, quantity, days })
    onClose()
    setQuantity(1)
    setDays(1)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl p-0 overflow-hidden rounded-2xl border-0 shadow-2xl gap-0 [&>button]:hidden">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-sm text-white transition-colors"
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[92vh] md:max-h-[88vh] overflow-y-auto md:overflow-hidden">
          {/* Left: Image */}
          <div className="relative h-56 sm:h-72 md:h-full md:min-h-[480px] bg-gray-100 md:sticky md:top-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Rating pill overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-bold text-gray-800">{product.rating}</span>
              <span className="text-xs text-gray-500">({product.reviews} đánh giá)</span>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-md">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-medium text-gray-700">{product.location.split(',')[0]}</span>
            </div>
          </div>

          {/* Right: Details */}
          <div className="p-5 sm:p-6 lg:p-8 flex flex-col gap-4 lg:gap-5 overflow-y-auto md:max-h-[88vh]">
            {/* Title + Tags */}
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">{product.name}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-100">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Tình trạng tốt
                </span>
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                  <Tag className="w-3.5 h-3.5" />
                  Phù hợp sinh viên
                </span>
                <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-orange-100">
                  <Package className="w-3.5 h-3.5" />
                  {product.category}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl lg:text-3xl font-bold text-orange-500">{formatPrice(product.price)}</span>
              <span className="text-sm text-gray-400">/{product.unit}</span>
            </div>

            {/* Description */}
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{product.description}</p>

            {/* Specs table */}
            <div className="rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: 'Thương hiệu', value: product.brand },
                    { label: 'Tiền cọc', value: formatPrice(product.deposit) },
                    { label: 'Trạng thái', value: 'Có sẵn', highlight: true },
                    { label: 'Địa điểm', value: product.location },
                  ].map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-2.5 text-gray-500 font-medium w-1/3">{row.label}</td>
                      <td className={`px-4 py-2.5 font-semibold ${row.highlight ? 'text-green-600' : 'text-gray-800'}`}>
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reviews from previous renters */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-sm font-bold text-gray-900">Đánh giá từ người thuê trước</h3>
                <span className="text-xs text-gray-400">{REVIEWS.length} đánh giá</span>
              </div>
              <div className="space-y-2.5">
                {REVIEWS.map((review) => (
                  <div
                    key={review.name}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <span className="text-orange-600 font-bold text-xs">{review.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 leading-none">{review.name}</p>
                        <div className="flex items-center gap-0.5 mt-1.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${
                                s <= review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rental controls */}
            <div className="grid grid-cols-2 gap-3">
              {/* Quantity */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Số lượng</label>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors border border-gray-100"
                    aria-label="Giảm số lượng"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="flex-1 text-center font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors border border-gray-100"
                    aria-label="Tăng số lượng"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Days */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Số ngày thuê</label>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1">
                  <button
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors border border-gray-100"
                    aria-label="Giảm số ngày"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="flex-1 text-center font-bold text-gray-900">{days}</span>
                  <button
                    onClick={() => setDays(days + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors border border-gray-100"
                    aria-label="Tăng số ngày"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Price calculation */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <span>{formatPrice(product.price)} × {quantity} × {days} ngày</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Tổng tạm tính:</span>
                <span className="text-xl font-bold text-orange-600">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Add to cart CTA */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base rounded-xl shadow-lg shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-300"
            >
              <ShoppingCart className="w-5 h-5" />
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
