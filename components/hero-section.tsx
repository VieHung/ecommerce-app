'use client'

import { ArrowRight, Camera, Tent, Music } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 via-orange-50 to-white border border-orange-100 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        {/* Text content */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Nền tảng cho thuê #1 cho sinh viên
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-600 leading-tight text-balance">
            Thuê dễ dàng,
            <br />
            Tiết kiệm tối đa
          </h1>
          <p className="mt-2 text-gray-600 text-sm md:text-base leading-relaxed">
            Đồ dùng chất lượng — Giá sinh viên
          </p>
          <button className="mt-4 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-md shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300">
            Thuê ngay
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Stats row */}
          <div className="mt-5 flex items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">500+</p>
              <p className="text-xs text-gray-500">Sản phẩm</p>
            </div>
            <div className="w-px h-8 bg-orange-100" />
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">2.4k</p>
              <p className="text-xs text-gray-500">Sinh viên</p>
            </div>
            <div className="w-px h-8 bg-orange-100" />
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">4.9★</p>
              <p className="text-xs text-gray-500">Đánh giá</p>
            </div>
          </div>
        </div>

        {/* Visual collage */}
        <div className="shrink-0 hidden sm:flex flex-col gap-2 items-end">
          <div className="flex gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-md border-2 border-white rotate-3 hover:rotate-0 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80"
                alt="Camera cho thuê"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-md border-2 border-white -rotate-2 hover:rotate-0 transition-transform duration-300 mt-3">
              <img
                src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&q=80"
                alt="Loa Bluetooth cho thuê"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex gap-2 -mt-2">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-md border-2 border-white rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200&q=80"
                alt="Lều cắm trại cho thuê"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-md border-2 border-white -rotate-3 hover:rotate-0 transition-transform duration-300 -mt-2">
              <img
                src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&q=80"
                alt="Máy chiếu cho thuê"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Floating icons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-30">
            <Camera className="w-4 h-4 text-orange-400" />
            <Tent className="w-4 h-4 text-orange-400" />
            <Music className="w-4 h-4 text-orange-400" />
          </div>
        </div>
      </div>
    </section>
  )
}
