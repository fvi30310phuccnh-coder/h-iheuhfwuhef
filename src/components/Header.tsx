import React from 'react';
import { ShoppingBag, Heart, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeaderProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection }) => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsOrderTrackingOpen,
    setActiveCategory,
  } = useStore();

  const handleNavClick = (category: string, elementId?: string) => {
    setActiveCategory(category);
    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (onNavigateSection) {
      onNavigateSection('catalog');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element Brand Zone */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif-display text-2xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
        >
          MINH & CO.
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleNavClick('all', 'catalog')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Tất cả sản phẩm
          </button>
          <button
            onClick={() => handleNavClick('furniture', 'catalog')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Nội thất & Đèn
          </button>
          <button
            onClick={() => handleNavClick('ceramics', 'catalog')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Gốm sứ & Trà
          </button>
          <button
            onClick={() => handleNavClick('fragrance', 'catalog')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Mùi hương
          </button>
          <button
            onClick={() => setIsOrderTrackingOpen(true)}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Tra cứu đơn</span>
          </button>
        </nav>

        {/* Zone 3: Primary action cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Danh sách yêu thích"
            className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-colors cursor-pointer"
            title="Sản phẩm yêu thích"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 text-stone-50 text-[10px] font-semibold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button with live count */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Giỏ hàng</span>
            <span className="ml-1 px-1.5 py-0.2 bg-stone-700 text-stone-100 rounded text-xs font-semibold tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
