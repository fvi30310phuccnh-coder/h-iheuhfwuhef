import React, { useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const CatalogSection: React.FC = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  } = useStore();

  const categories = [
    { id: 'all', label: 'Tất cả sản phẩm' },
    { id: 'furniture', label: 'Nội Thất & Ghế' },
    { id: 'ceramics', label: 'Gốm Sứ & Trà Đạo' },
    { id: 'lighting', label: 'Đèn & Ánh Sáng' },
    { id: 'fragrance', label: 'Mùi Hương & Nến' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((prod) => {
        // Category match
        if (activeCategory !== 'all' && prod.category !== activeCategory) {
          return false;
        }
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = prod.name.toLowerCase().includes(q);
          const matchSub = prod.subtitle.toLowerCase().includes(q);
          const matchMat = prod.materials.toLowerCase().includes(q);
          const matchDesc = prod.description.toLowerCase().includes(q);
          if (!matchName && !matchSub && !matchMat && !matchDesc) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default featured
        return 0;
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Tuyển Tập Chọn Lọc
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
            Không Gian & Tác Phẩm
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Mỗi thiết kế là sự chắt lọc tinh tế giữa tính thực dụng và giá trị thủ công độc bản
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo tên, chất liệu gỗ, gốm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
              aria-label="Xóa tìm kiếm"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="py-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Interactive Filter Tabs (functional segmented buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-2xs'
                    : 'bg-stone-200/60 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center justify-between lg:justify-end gap-3 text-xs">
          <span className="text-stone-500 tabular-nums">
            Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm
          </span>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
            >
              <option value="featured">Nổi bật nhất</option>
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>

      </div>

      {/* Product Grid: 3-column desktop layout adhering to gap-6/gap-8 */}
      {filteredProducts.length === 0 ? (
        <div className="my-16 py-16 text-center bg-stone-100 rounded-2xl border border-stone-200 space-y-3">
          <p className="text-sm font-medium text-stone-700">
            Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại.
          </p>
          <p className="text-xs text-stone-500">
            Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục "Tất cả sản phẩm".
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-2 px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </section>
  );
};
