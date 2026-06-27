'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { CategoriesSection } from '@/components/categories-section'
import { ProductGrid } from '@/components/product-grid'
import { ProductModal } from '@/components/product-modal'
import { CartView } from '@/components/cart-view'
import { PRODUCTS } from '@/lib/data'
import type { Product, CartItem } from '@/lib/data'

export default function HomePage() {
  // View state
  const [view, setView] = useState<'home' | 'cart'>('home')

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')

  // Modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Derived: filtered products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === 'Tất cả' || p.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.product.id === newItem.product.id)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
          days: newItem.days,
        }
        return updated
      }
      return [...prev, newItem]
    })
  }

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId))
  }

  // Cart view
  if (view === 'cart') {
    return (
      <CartView
        items={cartItems}
        onBack={() => setView('home')}
        onRemoveItem={handleRemoveItem}
      />
    )
  }

  // Home view
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setView('cart')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Hero */}
        <HeroSection />

        {/* Categories */}
        <CategoriesSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} onViewDetail={handleViewDetail} />
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedProduct(null)
        }}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}
