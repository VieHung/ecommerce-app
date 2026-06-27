'use client'

import { useState } from 'react'
import { ArrowLeft, Trash2, Star, Check, Building2, Smartphone } from 'lucide-react'
import type { CartItem } from '@/lib/data'
import { formatPrice } from '@/lib/data'

interface CartViewProps {
  items: CartItem[]
  onBack: () => void
  onRemoveItem: (productId: number) => void
}

const PAYMENT_METHODS = [
  {
    id: 'momo',
    label: 'Ví MoMo',
    description: 'Thanh toán nhanh qua ví MoMo',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    icon: Smartphone,
    iconColor: '#ae2070',
  },
  {
    id: 'bank',
    label: 'Chuyển khoản ngân hàng',
    description: 'Hỗ trợ tất cả ngân hàng tại VN',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: Building2,
    iconColor: '#1d4ed8',
  },
  {
    id: 'zalopay',
    label: 'ZaloPay',
    description: 'Thanh toán qua ứng dụng ZaloPay',
    color: 'text-blue-500',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    icon: Smartphone,
    iconColor: '#0ea5e9',
  },
]

const STEPS = ['Chọn đồ', 'Thanh toán', 'Đánh giá']

export function CartView({ items, onBack, onRemoveItem }: CartViewProps) {
  const [selectedPayment, setSelectedPayment] = useState('momo')
  const [paid, setPaid] = useState(false)

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity * item.days, 0)
  const serviceFee = Math.round(subtotal * 0.15)
  const deposit = items.reduce((acc, item) => acc + item.product.deposit * item.quantity, 0)
  const total = subtotal + serviceFee + deposit

  if (paid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h2>
          <p className="text-gray-500 text-sm mb-6">Đơn thuê của bạn đã được xác nhận. Người cho thuê sẽ liên hệ sớm.</p>
          <button
            onClick={onBack}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-orange-50 text-gray-600 hover:text-orange-500 transition-colors"
            aria-label="Quay lại"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-gray-900">Chi tiết đơn thuê</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
        {/* Progress Stepper */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            {STEPS.map((step, i) => {
              const isActive = i === 1
              const isDone = i === 0
              return (
                <div key={step} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                        ${isDone ? 'bg-green-500 text-white' : isActive ? 'bg-orange-500 text-white ring-4 ring-orange-100' : 'bg-gray-100 text-gray-400'}`}
                    >
                      {isDone ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    <span
                      className={`text-[11px] mt-1 font-medium whitespace-nowrap ${
                        isActive ? 'text-orange-500' : isDone ? 'text-green-500' : 'text-gray-400'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-0.5 w-full mb-5 ${i === 0 ? 'bg-green-300' : 'bg-gray-200'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Cart items */}
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500">Giỏ hàng trống. Hãy thêm sản phẩm!</p>
            <button
              onClick={onBack}
              className="mt-4 text-orange-500 font-semibold text-sm hover:underline"
            >
              Khám phá sản phẩm &rarr;
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => {
              const itemTotal = item.product.price * item.quantity * item.days
              const today = new Date()
              const endDate = new Date(today)
              endDate.setDate(today.getDate() + item.days)
              const fmt = (d: Date) =>
                d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })

              return (
                <div key={item.product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-orange-500 font-bold text-sm mt-0.5">
                        {formatPrice(item.product.price)}/ngày
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {fmt(today)} → {fmt(endDate)} • {item.days} ngày • SL: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Thành tiền</span>
                    <span className="font-bold text-gray-900">{formatPrice(itemTotal)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Pricing Breakdown */}
        {items.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Tóm tắt đơn hàng</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tạm tính</span>
                <span className="font-medium text-gray-800">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phí dịch vụ (15%)</span>
                <span className="font-medium text-gray-800">{formatPrice(serviceFee)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-700">+ Tiền cọc sản phẩm thuê</span>
                <span className="font-bold text-gray-900">{formatPrice(deposit)}</span>
              </div>
              <div className="my-2 border-t border-dashed border-gray-200" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Tổng cộng</span>
                <span className="text-xl font-bold text-orange-600">{formatPrice(total)}</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Tiền cọc sẽ được hoàn lại sau khi bạn trả sản phẩm.
              </p>
            </div>
          </div>
        )}

        {/* Payment Methods */}
        {items.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Phương thức thanh toán</h3>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon
                const isSelected = selectedPayment === method.id
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200
                      ${isSelected ? `${method.bgColor} ${method.borderColor}` : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-white shadow-sm' : 'bg-white'}`}>
                      <Icon className="w-5 h-5" style={{ color: method.iconColor }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-semibold ${isSelected ? method.color : 'text-gray-700'}`}>
                        {method.label}
                      </p>
                      <p className="text-xs text-gray-400">{method.description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-300 bg-white'}`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Landlord info card */}
        {items.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-3 font-medium">Thông tin người cho thuê</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                <span className="text-orange-600 font-bold text-lg">MA</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Minh Anh</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 opacity-80" />
                  <span className="text-xs text-gray-500 ml-1">4.8 • 89 lượt thuê</span>
                </div>
              </div>
              <div className="ml-auto">
                <span className="text-xs bg-green-50 text-green-600 font-semibold px-2.5 py-1 rounded-full border border-green-100">
                  Uy tín
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom CTA */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 p-4 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setPaid(true)}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-300"
            >
              Thanh toán {formatPrice(total)}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
