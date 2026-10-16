export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'furniture' | 'ceramics' | 'lighting' | 'fragrance' | 'workspace';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage?: string;
  tag?: string;
  description: string;
  story: string;
  dimensions: string;
  materials: string;
  origin: string;
  inStock: boolean;
  stockCount: number;
  variants?: ProductVariant[];
  specs: { label: string; value: string }[];
  careInstructions: string[];
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item id = `${productId}-${variantId || 'default'}`
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variantName?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'cod' | 'vietqr' | 'card';
  status: 'pending' | 'processing' | 'shipping' | 'delivered';
  createdAt: string;
  estimatedDelivery: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  description: string;
  minOrder?: number;
}
