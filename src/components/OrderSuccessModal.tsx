import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, ArrowRight, Package, Truck, QrCode } from 'lucide-react';
import { useStore, formatVND } from '../context/StoreContext';

export const OrderSuccessModal: React.FC = () => {
  const { recentOrder, setRecentOrder, setIsOrderTrackingOpen } = useStore();
  const [copied, setCopied] = useState(false);

  if (!recentOrder) return null;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(recentOrder.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrackOrder = () => {
    setRecentOrder(null);
    setIsOrderTrackingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-center">
        
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="font-serif-display text-2xl font-bold text-stone-900">
          Đặt Hàng Thành Công!
        </h2>
        
        <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
          Cảm ơn bạn <strong className="text-stone-900">{recentOrder.customerName}</strong>. Đơn hàng của bạn đã được tiếp nhận và chuẩn bị đóng gói.
        </p>

        {/* Order Code Box */}
        <div className="mt-5 p-4 bg-stone-50 rounded-xl border border-stone-200/90 text-left space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500 font-medium">Mã đơn hàng:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-stone-900">{recentOrder.id}</span>
              <button
                onClick={handleCopyOrderId}
                className="p-1 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                title="Sao chép mã"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500 font-medium">Dự kiến giao hàng:</span>
            <span className="font-semibold text-stone-900 tabular-nums">{recentOrder.estimatedDelivery}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500 font-medium">Địa chỉ giao:</span>
            <span className="text-stone-800 text-right max-w-[220px] truncate">
              {recentOrder.address}, {recentOrder.district}, {recentOrder.city}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-200">
            <span className="text-stone-500 font-medium">Tổng thanh toán:</span>
            <span className="font-bold text-stone-950 tabular-nums">{formatVND(recentOrder.total)}</span>
          </div>
        </div>

        {/* VietQR Instructions if chosen */}
        {recentOrder.paymentMethod === 'vietqr' && (
          <div className="mt-4 p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-left text-xs text-stone-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-amber-900">
              <QrCode className="w-4 h-4 text-amber-800" />
              <span>Chuyển khoản thanh toán VietQR</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Vui lòng chuyển khoản số tiền <strong>{formatVND(recentOrder.total)}</strong> vào tài khoản Vietcombank: <code>1029384756</code> với nội dung: <strong>{recentOrder.id}</strong>.
            </p>
          </div>
        )}

        {/* Delivery Timeline Preview */}
        <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500 px-2">
          <div className="flex flex-col items-center gap-1 text-emerald-700 font-medium">
            <Check className="w-4 h-4" />
            <span>Đã nhận đơn</span>
          </div>
          <span className="h-0.5 w-12 bg-stone-200" />
          <div className="flex flex-col items-center gap-1 text-stone-400">
            <Package className="w-4 h-4" />
            <span>Đóng gói</span>
          </div>
          <span className="h-0.5 w-12 bg-stone-200" />
          <div className="flex flex-col items-center gap-1 text-stone-400">
            <Truck className="w-4 h-4" />
            <span>Vận chuyển</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2">
          <button
            onClick={handleTrackOrder}
            className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Theo dõi hành trình đơn hàng</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setRecentOrder(null)}
            className="w-full py-2.5 px-4 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            Tiếp tục mua sắm
          </button>
        </div>

      </div>
    </div>
  );
};
