import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Khuyến mãi" className="bg-stone-900 text-stone-200 text-xs px-4 py-2 flex items-center justify-between border-b border-stone-800">
      <div className="mx-auto flex items-center gap-2 font-medium tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
        <span>Miễn phí giao hàng toàn quốc cho đơn từ 1.500.000 ₫ · Giao nhanh 24h tại TP.HCM & Hà Nội</span>
        <span className="hidden sm:inline text-stone-400">· Mã giảm 10%: <strong className="text-amber-300 font-semibold">MINH10</strong></span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 text-stone-400 hover:text-white transition-colors"
        aria-label="Đóng thông báo"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
