import React, { useState } from 'react';
import { Heart, Plus, Eye, Star } from 'lucide-react';
import { Product } from '../types/store';
import { useStore, formatVND } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [imageError, setImageError] = useState(false);
  const isFavorite = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col bg-stone-50 border border-stone-200/90 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      
      {/* 1. Image Container (takes ~68% of visual presence) */}
      <div className="relative aspect-[4/3] bg-stone-200/60 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-stone-200 text-stone-600">
            <span className="text-xs uppercase tracking-wider font-medium">{product.categoryLabel}</span>
            <span className="text-sm font-semibold text-center mt-1">{product.name}</span>
          </div>
        )}

        {/* Quiet Tag (Top Left - single subtle text tag, NOT a pill badge sandwich) */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] font-medium px-2 py-0.5 rounded">
            {product.tag}
          </div>
        )}

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorite ? 'Bỏ thích' : 'Thêm vào yêu thích'}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all cursor-pointer ${
            isFavorite
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:text-stone-950 hover:bg-white shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 bg-white/95 backdrop-blur-sm hover:bg-white text-stone-900 text-xs font-medium py-2 px-3 rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem chi tiết</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            aria-label="Thêm nhanh vào giỏ"
            title="Thêm vào giỏ"
            className="bg-stone-900 hover:bg-stone-800 text-white p-2 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Clean Metadata & Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata with · separator */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
            <span className="uppercase tracking-wider font-medium text-[11px] text-stone-600">
              {product.categoryLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span className="font-semibold text-stone-700">{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </span>
          </div>

          {/* Product Name */}
          <h2
            onClick={() => setSelectedProduct(product)}
            className="font-medium text-stone-900 text-sm line-clamp-1 hover:text-stone-700 transition-colors cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h2>

          <p className="text-xs text-stone-500 line-clamp-1 mt-1">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Action Footer */}
        <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-stone-900 text-sm tabular-nums">
              {formatVND(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                {formatVND(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="text-xs font-medium text-stone-900 hover:text-stone-600 underline underline-offset-4 transition-colors cursor-pointer"
          >
            + Giỏ hàng
          </button>
        </div>

      </div>

    </div>
  );
};
