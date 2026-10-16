import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useStore, formatVND } from '../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    products,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
  } = useStore();

  if (!isWishlistOpen) return null;

  const favoriteProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 border-l border-stone-200 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <h2 className="font-serif-display text-lg font-semibold text-stone-900">
                Sản phẩm yêu thích
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                ({favoriteProducts.length})
              </span>
            </div>
            
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Đóng danh sách yêu thích"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-200">
            {favoriteProducts.length === 0 ? (
              <div className="py-20 text-center text-stone-500 space-y-3">
                <Heart className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-sm">Bạn chưa lưu sản phẩm nào vào mục yêu thích.</p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors cursor-pointer"
                >
                  Khám phá ngay
                </button>
              </div>
            ) : (
              favoriteProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                  <div
                    className="w-20 h-20 bg-stone-200 rounded-lg overflow-hidden shrink-0 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsWishlistOpen(false);
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h2
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsWishlistOpen(false);
                          }}
                          className="text-xs font-semibold text-stone-900 line-clamp-1 hover:underline cursor-pointer"
                        >
                          {product.name}
                        </h2>
                        
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          aria-label="Bỏ thích"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs font-semibold text-stone-900 mt-1 tabular-nums">
                        {formatVND(product.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product, 1);
                      }}
                      className="mt-2 w-full py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Thêm vào giỏ</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {favoriteProducts.length > 0 && (
            <div className="p-4 border-t border-stone-200 bg-white">
              <button
                onClick={() => {
                  favoriteProducts.forEach((p) => addToCart(p, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm tất cả vào giỏ hàng</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
