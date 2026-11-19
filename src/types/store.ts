export type ProductCategory =
  | 'Earbuds'
  | 'Headphones'
  | 'Speakers'
  | 'Wireless Chargers'
  | 'Accessories';

export type ProductBadge = 'New' | 'Best Seller' | 'Sale';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: ProductBadge;
  featured?: boolean;
  bestSeller?: boolean;
  inStock: boolean;
  stockCount: number;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  colors: ProductColor[];
  features: string[];
  specs: ProductSpec[];
  reviews: ProductReview[];
  releaseOrder: number;
}

export interface CategoryTile {
  id: ProductCategory;
  title: string;
  description: string;
  bgColor: string;
  iconBg: string;
  iconColor: string;
  image: string;
}

export interface CartItem {
  productId: string;
  colorName: string;
  quantity: number;
}

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: 'cod';
  items: Array<{
    productId: string;
    name: string;
    colorName: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
}
