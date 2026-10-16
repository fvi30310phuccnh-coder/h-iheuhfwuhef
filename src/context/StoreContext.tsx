import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, ProductVariant, Coupon, Review } from '../types/store';
import { INITIAL_PRODUCTS, AVAILABLE_COUPONS } from '../data/products';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  recentOrder: Order | null;
  setRecentOrder: (order: Order | null) => void;
  
  // Actions
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  createOrder: (orderDetails: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedDelivery'>) => Order;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date' | 'verifiedPurchase'>) => void;
  
  // Calculation getters
  cartCount: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  
  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 1500000;
const STANDARD_SHIPPING_FEE = 40000;

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('minh_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('minh_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('minh_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('minh_orders');
    if (saved) return JSON.parse(saved);
    // Provide a sample completed order so user can immediately test order tracking!
    return [
      {
        id: 'MC-2026-8812',
        customerName: 'Hoàng Anh Tuấn',
        phone: '0908123456',
        email: 'anhtuan.hoang@gmail.com',
        city: 'Thành phố Hồ Chí Minh',
        district: 'Quận 1',
        address: '124 Nguyễn Du, Phường Bến Nghé',
        notes: 'Giao giờ hành chính, gọi trước 15 phút',
        items: [
          {
            productId: 'mc-02',
            productName: 'Bộ Ấm Trà Gốm Nung Mộc Đen Nhám',
            variantName: 'Đen nhám khoáng thạch',
            price: 890000,
            quantity: 1,
            image: '/src/assets/images/product_tea_set_1792141700444.jpg'
          }
        ],
        subtotal: 890000,
        discount: 0,
        shippingFee: 40000,
        total: 930000,
        paymentMethod: 'cod',
        status: 'shipping',
        createdAt: '15/10/2026 14:30',
        estimatedDelivery: '17/10/2026'
      }
    ];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [recentOrder, setRecentOrder] = useState<Order | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('minh_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('minh_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('minh_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('minh_products', JSON.stringify(products));
  }, [products]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    const chosenVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
    const cartItemId = `${product.id}-${chosenVariant ? chosenVariant.id : 'default'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: cartItemId, product, quantity, selectedVariant: chosenVariant }];
    });

    showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Đã bỏ sản phẩm khỏi danh sách yêu thích');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Đã thêm vào danh sách yêu thích');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.minOrder && subtotal < appliedCoupon.minOrder) return 0;
    if (appliedCoupon.discountPercent) {
      return Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    }
    if (appliedCoupon.discountAmount) {
      return Math.min(appliedCoupon.discountAmount, subtotal);
    }
    return 0;
  };

  const discount = calculateDiscount();
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || (appliedCoupon?.code === 'FREESHIP') || subtotal === 0
    ? 0
    : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' };
    }
    if (found.minOrder && subtotal < found.minOrder) {
      return {
        success: false,
        message: `Đơn hàng tối thiểu để áp dụng mã là ${found.minOrder.toLocaleString('vi-VN')} ₫.`,
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Áp dụng thành công mã ${cleanCode}!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const createOrder = (orderDetails: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedDelivery'>) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `MC-2026-${randomSuffix}`;
    const now = new Date();
    const createdDateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Estimated delivery in 2-3 days
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 2);
    const estDeliveryStr = `${estDate.getDate().toString().padStart(2, '0')}/${(estDate.getMonth() + 1).toString().padStart(2, '0')}/${estDate.getFullYear()}`;

    const newOrder: Order = {
      ...orderDetails,
      id: newOrderId,
      status: 'pending',
      createdAt: createdDateStr,
      estimatedDelivery: estDeliveryStr,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setRecentOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);

    return newOrder;
  };

  const addReview = (productId: string, reviewInput: Omit<Review, 'id' | 'date' | 'verifiedPurchase'>) => {
    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      ...reviewInput,
      date: dateStr,
      verifiedPurchase: true,
    };

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          const updatedReviews = [newReview, ...prod.reviews];
          const avgRating = (
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
          ).toFixed(1);
          return {
            ...prod,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: parseFloat(avgRating),
          };
        }
        return prod;
      })
    );

    // Also update selectedProduct if open
    setSelectedProduct((prev) => {
      if (prev && prev.id === productId) {
        const updatedReviews = [newReview, ...prev.reviews];
        const avgRating = (
          updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
        ).toFixed(1);
        return {
          ...prev,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: parseFloat(avgRating),
        };
      }
      return prev;
    });

    showToast('Cảm ơn bạn! Đánh giá đã được ghi nhận.');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        sortBy,
        setSortBy,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        recentOrder,
        setRecentOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        createOrder,
        addReview,
        cartCount,
        subtotal,
        discount,
        shippingFee,
        total,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const formatVND = (amount: number) => {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
};
