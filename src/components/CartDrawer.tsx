import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Truck, Check } from 'lucide-react';
import { useStore, formatVND } from '../context/StoreContext';

const FREE_SHIPPING_THRESHOLD = 1500000;

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shippingFee,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    setSelectedProduct,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput.trim());
    if (res.success) {
      setCouponFeedback({ type: 'success', text: res.message });
      setCouponInput('');
    } else {
      setCouponFeedback({ type: 'error', text: res.message });
    }
  };

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 border-l border-stone-200 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif-display text-lg font-semibold text-stone-900">
                Giỏ hàng của bạn
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                ({cart.reduce((sum, item) => sum + item.quantity, 0)} món)
              </span>
            </div>
            
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-stone-100 border-b border-stone-200 text-xs">
            <div className="flex items-center justify-between font-medium mb-1.5">
              <span className="flex items-center gap-1.5 text-stone-700">
                <Truck className="w-3.5 h-3.5" />
                {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Đã đủ điều kiện miễn phí vận chuyển!
                  </span>
                ) : (
                  <span>
                    Mua thêm <strong className="text-stone-950 font-bold tabular-nums">{formatVND(remainingForFreeShipping)}</strong> để được FreeShip
                  </span>
                )}
              </span>
              <span className="text-stone-500 tabular-nums">{progressPercent}%</span>
            </div>
            
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-stone-900 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-200">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-stone-500 space-y-3">
                <p className="text-sm">Giỏ hàng của bạn đang trống.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors cursor-pointer"
                >
                  Tiếp tục xem sản phẩm
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                  <div
                    className="w-20 h-20 bg-stone-200 rounded-lg overflow-hidden shrink-0 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(item.product);
                      setIsCartOpen(false);
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h2
                          onClick={() => {
                            setSelectedProduct(item.product);
                            setIsCartOpen(false);
                          }}
                          className="text-xs font-semibold text-stone-900 line-clamp-1 hover:underline cursor-pointer"
                        >
                          {item.product.name}
                        </h2>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Tùy chọn: {item.selectedVariant.name}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-300 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                          aria-label="Giảm"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                          aria-label="Tăng"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-stone-900 tabular-nums">
                        {formatVND(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-white space-y-4">
              
              {/* Promo code field */}
              <div>
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Mã giảm giá (ví dụ: MINH10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                    >
                      Áp dụng
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                    <span className="font-medium">
                      Mã <strong>{appliedCoupon.code}</strong>: {appliedCoupon.description}
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-emerald-950 underline font-medium cursor-pointer"
                    >
                      Bỏ mã
                    </button>
                  </div>
                )}

                {couponFeedback && (
                  <p
                    className={`text-[11px] mt-1.5 ${
                      couponFeedback.type === 'success' ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {couponFeedback.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span className="font-medium text-stone-900 tabular-nums">{formatVND(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Giảm giá</span>
                    <span className="tabular-nums">- {formatVND(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="font-medium text-stone-900 tabular-nums">
                    {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Tổng thanh toán</span>
                  <span className="tabular-nums">{formatVND(total)}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Tiến hành đặt hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
