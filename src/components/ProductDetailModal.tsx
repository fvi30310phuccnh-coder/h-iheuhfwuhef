import React, { useState } from 'react';
import { X, Star, Heart, Check, Truck, ShieldCheck, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { Product, ProductVariant } from '../types/store';
import { useStore, formatVND } from '../context/StoreContext';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen, addReview } = useStore();
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'care' | 'reviews'>('desc');
  const [imageError, setImageError] = useState(false);

  // New review form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    onClose();
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    setIsSubmittingReview(true);
    addReview(product.id, {
      author: reviewAuthor.trim(),
      rating: reviewRating,
      title: reviewTitle.trim() || 'Sản phẩm tuyệt vời',
      comment: reviewComment.trim(),
    });

    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    setIsSubmittingReview(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
      
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative bg-stone-50 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng xem chi tiết"
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-stone-600 hover:text-stone-950 rounded-full shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8">
          
          {/* Left Column: Product Imagery */}
          <div className="md:col-span-6 p-4 sm:p-6 bg-stone-100/60 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 shadow-xs">
              {!imageError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-500 text-sm">
                  {product.name}
                </div>
              )}
              {product.tag && (
                <div className="absolute top-3 left-3 bg-stone-900/85 text-stone-100 text-xs font-medium px-2.5 py-1 rounded">
                  {product.tag}
                </div>
              )}
            </div>

            {/* Quick Guarantees Box */}
            <div className="mt-4 p-3.5 bg-white/90 rounded-xl border border-stone-200/80 space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-stone-800 shrink-0" />
                <span>Giao hàng toàn quốc · Kiểm tra trước khi thanh toán</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-800 shrink-0" />
                <span>Bảo hành chính hãng 24 tháng kết cấu & nguồn gốc</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span className="uppercase tracking-wider font-semibold text-stone-700">
                  {product.categoryLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>{product.origin}</span>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1 text-stone-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount} đánh giá)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-serif-display text-2xl sm:text-3xl font-semibold text-stone-900 leading-snug">
                {product.name}
              </h1>
              <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                {product.subtitle}
              </p>

              {/* Pricing */}
              <div className="mt-4 flex items-baseline gap-3 pb-4 border-b border-stone-200">
                <span className="text-2xl font-bold text-stone-950 tabular-nums">
                  {formatVND(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    {formatVND(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-medium ml-auto flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Còn {product.stockCount} sản phẩm sẵn sàng giao
                </span>
              </div>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Tùy chọn: <span className="font-normal normal-case text-stone-900">{selectedVariant?.name}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => {
                      const isSelected = selectedVariant?.id === variant.id;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                              : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          {variant.colorHex && (
                            <span
                              className="w-3 h-3 rounded-full border border-black/20"
                              style={{ backgroundColor: variant.colorHex }}
                            />
                          )}
                          <span>{variant.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Số lượng:
                </span>
                <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-stone-600 hover:text-stone-950 disabled:opacity-30 cursor-pointer"
                    aria-label="Giảm số lượng"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 py-1 text-sm font-semibold text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    disabled={quantity >= product.stockCount}
                    className="p-2 text-stone-600 hover:text-stone-950 disabled:opacity-30 cursor-pointer"
                    aria-label="Tăng số lượng"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-white border border-stone-900 text-stone-900 hover:bg-stone-100 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm vào giỏ hàng</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Mua ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Thêm vào danh sách yêu thích"
                  className={`p-3 rounded-lg border transition-colors cursor-pointer flex items-center justify-center ${
                    isFavorite
                      ? 'border-rose-200 bg-rose-50 text-rose-600'
                      : 'border-stone-300 bg-white text-stone-700 hover:text-stone-950'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Section: Tabs for Details, Specs, Care, Reviews */}
        <div className="p-6 sm:p-8 border-t border-stone-200 bg-white">
          <div className="flex border-b border-stone-200 gap-6 text-sm font-medium overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'desc'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Mô tả chi tiết & Câu chuyện
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Thông số kỹ thuật
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'care'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Hướng dẫn bảo quản
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Đánh giá ({product.reviews.length})
            </button>
          </div>

          <div className="pt-6">
            {/* Description Tab */}
            {activeTab === 'desc' && (
              <div className="space-y-4 max-w-2xl text-sm text-stone-600 leading-relaxed">
                <p>{product.description}</p>
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-800 mb-1">
                    Triết lý chế tác
                  </h2>
                  <p className="text-stone-600 italic">{product.story}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div>
                    <span className="font-semibold text-stone-800">Kích thước: </span>
                    <span>{product.dimensions}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-800">Vật liệu: </span>
                    <span>{product.materials}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Specs Tab */}
            {activeTab === 'specs' && (
              <div className="max-w-xl">
                <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-stone-50/50">
                  {product.specs.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex justify-between text-xs">
                      <span className="font-medium text-stone-500">{item.label}</span>
                      <span className="font-semibold text-stone-900 text-right tabular-nums">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Care Tab */}
            {activeTab === 'care' && (
              <ul className="space-y-2.5 max-w-xl text-sm text-stone-600 list-disc list-inside">
                {product.careInstructions.map((instruction, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {instruction}
                  </li>
                ))}
              </ul>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Review list */}
                <div className="space-y-4">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200/80">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-900">{rev.author}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[11px] text-emerald-700 font-medium">· Đã mua hàng</span>
                          )}
                        </div>
                        <span className="text-stone-400 tabular-nums">{rev.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= rev.rating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>

                      <h2 className="text-sm font-medium text-stone-900">{rev.title}</h2>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Form to submit review */}
                <div className="p-5 bg-stone-100 rounded-xl border border-stone-200">
                  <h2 className="text-sm font-semibold text-stone-900 mb-3">
                    Gửi đánh giá của bạn
                  </h2>
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Họ và tên của bạn *
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          placeholder="Ví dụ: Nguyễn Văn An"
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Mức độ hài lòng *
                        </label>
                        <div className="flex items-center gap-1 pt-1">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              type="button"
                              key={num}
                              onClick={() => setReviewRating(num)}
                              className="p-1 cursor-pointer"
                              aria-label={`Đánh giá ${num} sao`}
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  num <= reviewRating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Tiêu đề nhận xét
                      </label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="Tóm tắt cảm nhận ngắn gọn"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Nội dung chia sẻ *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Hãy chia sẻ trải nghiệm về chất lượng sản phẩm, độ hoàn thiện, quy cách đóng gói..."
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="px-5 py-2.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                    >
                      Gửi đánh giá ngay
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
