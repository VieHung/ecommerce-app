export interface Product {
  id: number
  name: string
  price: number
  unit: string
  rating: number
  reviews: number
  location: string
  category: string
  image: string
  brand: string
  deposit: number
  description: string
}

export interface CartItem {
  product: Product
  quantity: number
  days: number
}

export interface Review {
  name: string
  initials: string
  rating: number
  text: string
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Máy ảnh Sony A6000',
    price: 150000,
    unit: 'ngày',
    rating: 4.9,
    reviews: 32,
    location: 'Cầu Giấy, Hà Nội',
    category: 'Máy ảnh',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    brand: 'Sony',
    deposit: 500000,
    description:
      'Máy ảnh mirrorless Sony A6000 với cảm biến APS-C 24.3MP, hệ thống lấy nét tự động nhanh với 179 điểm phase-detection. Phù hợp cho sinh viên nhiếp ảnh, vlog và chụp sự kiện.',
  },
  {
    id: 2,
    name: 'Loa Bluetooth JBL Charge 5',
    price: 60000,
    unit: 'ngày',
    rating: 4.7,
    reviews: 18,
    location: 'Đống Đa, Hà Nội',
    category: 'Âm thanh',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    brand: 'JBL',
    deposit: 300000,
    description:
      'Loa JBL Charge 5 chống nước IP67, thời lượng pin lên đến 20 giờ. Âm thanh mạnh mẽ, bass sâu — lý tưởng cho tiệc ngoài trời, cắm trại và các buổi tụ họp sinh viên.',
  },
  {
    id: 3,
    name: 'Lều cắm trại 2-4 người',
    price: 80000,
    unit: 'ngày',
    rating: 4.6,
    reviews: 27,
    location: 'Thanh Xuân, Hà Nội',
    category: 'Cắm trại',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    brand: 'Naturehike',
    deposit: 400000,
    description:
      'Lều cắm trại cao cấp dành cho 2-4 người, chất liệu chống nước, lắp ráp nhanh chóng. Kèm theo túi đựng gọn nhẹ — hoàn hảo cho các chuyến dã ngoại và trekking cuối tuần.',
  },
  {
    id: 4,
    name: 'Máy chiếu Epson EB-X05',
    price: 200000,
    unit: 'ngày',
    rating: 4.8,
    reviews: 21,
    location: 'Cầu Giấy, Hà Nội',
    category: 'Máy chiếu',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
    brand: 'Epson',
    deposit: 1000000,
    description:
      'Máy chiếu Epson EB-X05 độ sáng 3200 lumens, độ phân giải XGA, hỗ trợ HDMI và VGA. Thích hợp cho thuyết trình, chiếu phim nhóm và các sự kiện học thuật.',
  },
]

// Khu vực dùng cho bộ lọc nâng cao
export const LOCATIONS = ['Tất cả', 'Cầu Giấy', 'Đống Đa', 'Thanh Xuân']

// Giới hạn thanh trượt giá (đồng/ngày)
export const PRICE_MIN = 50000
export const PRICE_MAX = 1000000

// Đánh giá của người thuê trước (hiển thị ở phần chi tiết sản phẩm)
export const REVIEWS: Review[] = [
  {
    name: 'Nguyễn Văn An',
    initials: 'NA',
    rating: 5,
    text: 'Máy rất mới, dùng tốt! Chủ cho thuê thân thiện, sẽ thuê lại lần sau.',
  },
  {
    name: 'Trần Thị Bình',
    initials: 'TB',
    rating: 5,
    text: 'Giao đồ đúng giờ, đóng gói cẩn thận. Giá sinh viên rất hợp lý.',
  },
  {
    name: 'Lê Hoàng Cường',
    initials: 'LC',
    rating: 4,
    text: 'Sản phẩm đúng như mô tả, hoạt động ổn định trong suốt thời gian thuê.',
  },
]

export const CATEGORIES = [
  { label: 'Tất cả', icon: 'Grid3X3' },
  { label: 'Máy ảnh', icon: 'Camera' },
  { label: 'Âm thanh', icon: 'Music' },
  { label: 'Cắm trại', icon: 'Tent' },
  { label: 'Trang phục', icon: 'Shirt' },
  { label: 'Máy chiếu', icon: 'Monitor' },
  { label: 'Decor', icon: 'Home' },
  { label: 'Thể thao', icon: 'Activity' },
  { label: 'Học tập', icon: 'BookOpen' },
]

export function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ'
}
