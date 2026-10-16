import React, { useState } from 'react';
import { X, Search, PackageCheck, Truck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useStore, formatVND } from '../context/StoreContext';
import { Order } from '../types/store';

export const OrderTrackingModal: React.FC = () => {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen, orders } = useStore();
  const [searchInput, setSearchInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOrderTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toLowerCase();
    if (!query) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === query ||
        o.phone.toLowerCase() === query ||
        o.email.toLowerCase() === query
    );

    if (found) {
      setSearchedOrder(found);
      setErrorMessage('');
    } else {
      setErrorMessage('Không tìm thấy đơn hàng phù hợp với thông tin tra cứu.');
      setSearchedOrder(null);
    }
  };

  const getStatusStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'processing':
        return 1;
      case 'shipping':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 0;
    }
  };

  const steps = [
    { title: 'Tiếp nhận đơn', desc: 'Đã lưu hệ thống', icon: Clock },
    { title: 'Đóng gói chuẩn', desc: 'Kiểm tra & bọc xốp 3 lớp', icon: PackageCheck },
    { title: 'Đang vận chuyển', desc: 'Đang giao tận nơi', icon: Truck },
    { title: 'Giao thành công', desc: 'Đã nhận & đồng kiểm', icon: CheckCircle2 },
  ];

  const currentStep = searchedOrder ? getStatusStepIndex(searchedOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={() => setIsOrderTrackingOpen(false)} />

      {/* Main Container */}
      <div className="relative bg-stone-50 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 z-10 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <h2 className="font-serif-display text-xl font-bold text-stone-900">
              Tra Cứu Tiến Độ Đơn Hàng
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Nhập mã đơn hàng hoặc số điện thoại để theo dõi lộ trình bưu kiện
            </p>
          </div>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="p-2 text-stone-500 hover:text-stone-950 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Đóng tra cứu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Nhập mã đơn (ví dụ: MC-2026-8812) hoặc Số điện thoại"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            Tra cứu
          </button>
        </form>

        {/* Error message */}
        {errorMessage && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Order Details Result */}
        {searchedOrder && (
          <div className="mt-6 space-y-6">
            
            {/* Top Info Banner */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Mã vận đơn</span>
                <p className="font-mono text-base font-bold text-stone-900">{searchedOrder.id}</p>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Thời gian tạo</span>
                <p className="text-xs text-stone-700 tabular-nums">{searchedOrder.createdAt}</p>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Dự kiến giao</span>
                <p className="text-xs font-semibold text-emerald-700 tabular-nums">{searchedOrder.estimatedDelivery}</p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="p-5 bg-white rounded-xl border border-stone-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-6">
                Tiến độ vận chuyển trực tiếp
              </h2>

              <div className="relative flex justify-between">
                {/* Connecting Line */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-stone-200 -z-0">
                  <div
                    className="h-full bg-stone-900 transition-all duration-500"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                {steps.map((step, idx) => {
                  const isDone = idx <= currentStep;
                  const isCurrent = idx === currentStep;
                  const StepIcon = step.icon;

                  return (
                    <div key={idx} className="relative z-10 flex flex-col items-center text-center max-w-[100px]">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isDone
                            ? 'bg-stone-900 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-400 border border-stone-300'
                        } ${isCurrent ? 'ring-4 ring-stone-200' : ''}`}
                      >
                        <StepIcon className="w-4 h-4" />
                      </div>
                      <span className={`text-[11px] mt-2 font-medium leading-tight ${isDone ? 'text-stone-900' : 'text-stone-400'}`}>
                        {step.title}
                      </span>
                      <span className="text-[10px] text-stone-400 mt-0.5 leading-tight hidden sm:block">
                        {step.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recipient & Package Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Recipient */}
              <div className="p-4 bg-stone-100/70 rounded-xl border border-stone-200/80 text-xs space-y-1.5">
                <span className="font-semibold text-stone-900 block mb-1">Thông tin giao nhận</span>
                <p><span className="text-stone-500">Người nhận:</span> {searchedOrder.customerName}</p>
                <p><span className="text-stone-500">Số điện thoại:</span> {searchedOrder.phone}</p>
                <p><span className="text-stone-500">Địa chỉ:</span> {searchedOrder.address}, {searchedOrder.district}, {searchedOrder.city}</p>
                {searchedOrder.notes && (
                  <p><span className="text-stone-500">Ghi chú:</span> {searchedOrder.notes}</p>
                )}
              </div>

              {/* Payment status */}
              <div className="p-4 bg-stone-100/70 rounded-xl border border-stone-200/80 text-xs space-y-1.5">
                <span className="font-semibold text-stone-900 block mb-1">Hình thức thanh toán</span>
                <p>
                  <span className="text-stone-500">Phương thức:</span>{' '}
                  {searchedOrder.paymentMethod === 'cod'
                    ? 'Thanh toán khi nhận hàng (COD)'
                    : searchedOrder.paymentMethod === 'vietqr'
                    ? 'Chuyển khoản VietQR'
                    : 'Thẻ quốc tế Visa/Mastercard'}
                </p>
                <p>
                  <span className="text-stone-500">Tổng tiền:</span>{' '}
                  <strong className="text-stone-900 font-bold tabular-nums">{formatVND(searchedOrder.total)}</strong>
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="p-4 bg-white rounded-xl border border-stone-200">
              <span className="text-xs font-semibold text-stone-900 block mb-3">Kiện hàng chi tiết</span>
              <div className="divide-y divide-stone-100">
                {searchedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded bg-stone-200"
                      />
                      <div>
                        <p className="font-medium text-stone-900">{item.productName}</p>
                        {item.variantName && (
                          <p className="text-[11px] text-stone-500">{item.variantName}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-stone-900 tabular-nums">
                        {item.quantity} × {formatVND(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
