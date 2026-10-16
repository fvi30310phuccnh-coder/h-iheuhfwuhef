import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, CreditCard, Banknote, ArrowRight } from 'lucide-react';
import { useStore, formatVND } from '../context/StoreContext';
import { VIETNAMESE_CITIES, DISTRICTS_BY_CITY } from '../data/products';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    shippingFee,
    total,
    createOrder,
    setIsCartOpen,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(VIETNAMESE_CITIES[0]);
  const [district, setDistrict] = useState(DISTRICTS_BY_CITY[VIETNAMESE_CITIES[0]]?.[0] || 'Quận 1');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const districts = DISTRICTS_BY_CITY[newCity];
    if (districts && districts.length > 0) {
      setDistrict(districts[0]);
    } else {
      setDistrict('Trung tâm thành phố');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      return;
    }

    setIsSubmitting(true);

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      variantName: item.selectedVariant?.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    }));

    setTimeout(() => {
      createOrder({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || 'khachhang@minhco.vn',
        city,
        district,
        address: address.trim(),
        notes: notes.trim(),
        items: orderItems,
        subtotal,
        discount,
        shippingFee,
        total,
        paymentMethod,
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={() => setIsCheckoutOpen(false)} />

      {/* Main Container */}
      <div className="relative bg-stone-50 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 z-10">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-white flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="font-serif-display text-xl font-bold text-stone-900">
              Xác Nhận & Thanh Toán Đơn Hàng
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Vui lòng điền thông tin để chúng tôi đóng gói và chuyển phát tận nơi
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-stone-500 hover:text-stone-950 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Đóng thanh toán"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x lg:divide-stone-200">
            
            {/* Left Column: Customer and Shipping Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              
              {/* Section 1: Customer Contact */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
                  <span>1. Thông tin người nhận</span>
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Họ và tên người nhận *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0912 345 678"
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Email nhận hóa đơn điện tử
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@vidu.com"
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
                  <span>2. Địa chỉ nhận hàng</span>
                </h2>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Tỉnh / Thành phố *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => handleCityChange(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                      >
                        {VIETNAMESE_CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Quận / Huyện *
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                      >
                        {(DISTRICTS_BY_CITY[city] || ['Quận trung tâm', 'Huyện ngoại thành']).map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Địa chỉ cụ thể (Số nhà, tên đường, tòa nhà...) *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Số 88 đường Đồng Khởi, Phường Bến Nghé"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Ghi chú thêm cho người giao hàng
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Giao giờ hành chính, gọi điện trước khi đến..."
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
                  <span>3. Phương thức thanh toán</span>
                </h2>

                <div className="space-y-2.5">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-stone-900 bg-white shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 text-stone-900 focus:ring-stone-900"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-medium text-xs text-stone-900">
                        <Banknote className="w-4 h-4 text-stone-700" />
                        <span>Thanh toán khi nhận hàng (COD)</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Kiểm tra sản phẩm tận tay trước khi thanh toán cho bưu tá
                      </p>
                    </div>
                  </label>

                  {/* VietQR */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'vietqr'
                        ? 'border-stone-900 bg-white shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'vietqr'}
                      onChange={() => setPaymentMethod('vietqr')}
                      className="mt-0.5 text-stone-900 focus:ring-stone-900"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-medium text-xs text-stone-900">
                        <QrCode className="w-4 h-4 text-stone-700" />
                        <span>Chuyển khoản VietQR (Xác nhận tự động 24/7)</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Quét mã QR qua mọi ứng dụng ngân hàng và ví điện tử không phí
                      </p>

                      {paymentMethod === 'vietqr' && (
                        <div className="mt-3 p-3 bg-stone-100 rounded-lg text-xs space-y-1 text-stone-700">
                          <p><strong>Ngân hàng:</strong> Vietcombank (Chi nhánh TP.HCM)</p>
                          <p><strong>Số tài khoản:</strong> <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-stone-300">1029384756</code></p>
                          <p><strong>Chủ tài khoản:</strong> CÔNG TY TNHH MINH & CO</p>
                          <p className="text-[11px] text-stone-500 italic">* Hệ thống sẽ tự động quét và xác nhận ngay khi bạn chuyển khoản.</p>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Card */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-stone-900 bg-white shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-0.5 text-stone-900 focus:ring-stone-900"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-medium text-xs text-stone-900">
                        <CreditCard className="w-4 h-4 text-stone-700" />
                        <span>Thẻ quốc tế (Visa / Mastercard / JCB)</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Mã hóa an toàn SSL 256-bit theo tiêu chuẩn quốc tế PCI-DSS
                      </p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary & Confirmation */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-stone-100/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Đơn hàng ({cart.length} sản phẩm)
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="text-xs text-stone-600 hover:text-stone-900 underline"
                  >
                    Chỉnh sửa
                  </button>
                </div>

                {/* Items preview */}
                <div className="py-4 space-y-3 max-h-60 overflow-y-auto divide-y divide-stone-200/60">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover rounded bg-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-stone-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-stone-500">
                          {item.selectedVariant?.name ? `${item.selectedVariant.name} · ` : ''}SL: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-stone-900 tabular-nums">
                        {formatVND(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="pt-4 border-t border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Tạm tính</span>
                    <span className="tabular-nums">{formatVND(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Ưu đãi giảm giá</span>
                      <span className="tabular-nums">- {formatVND(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Phí vận chuyển</span>
                    <span className="tabular-nums">
                      {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                    <span>Tổng tiền thanh toán</span>
                    <span className="tabular-nums">{formatVND(total)}</span>
                  </div>
                </div>

                {/* Security trust badge */}
                <div className="mt-5 p-3 bg-white rounded-lg border border-stone-200/80 flex items-center gap-2.5 text-xs text-stone-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Cam kết bảo mật 100% dữ liệu thanh toán & đổi trả miễn phí</span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-6 pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>{isSubmitting ? 'Đang khởi tạo đơn hàng...' : 'Xác nhận đặt hàng'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
