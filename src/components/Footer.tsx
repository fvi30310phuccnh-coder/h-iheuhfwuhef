import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { showToast, setIsOrderTrackingOpen } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribed(true);
    showToast('Cảm ơn bạn! Đã đăng ký nhận bản tin thành công.');
    setEmail('');
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-serif-display text-2xl font-bold tracking-tight text-white">
              MINH & CO.
            </h2>
            <p className="text-stone-400 leading-relaxed max-w-sm">
              Cửa hàng trực tuyến tuyển chọn nội thất tối giản, gốm nung thủ công và vật dụng phong cách sống hướng tới sự tĩnh tại và trường tồn.
            </p>

            <div className="pt-2">
              <span className="block font-semibold text-white mb-2">Đăng ký nhận ưu đãi & câu chuyện mới</span>
              <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                <div className="relative flex-1">
                  <Mail className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-900 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-stone-600"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-100 hover:bg-white text-stone-900 font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  <span>{subscribed ? 'Đã gửi' : 'Đăng ký'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white uppercase tracking-wider text-[11px]">Danh mục</h3>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#catalog" className="hover:text-white transition-colors">Ghế & Bàn trà gỗ sồi</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Gốm nung men tro</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Đèn chao đồng thau</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Tinh dầu khuếch tán</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Bộ sưu tập Mùa Thu</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white uppercase tracking-wider text-[11px]">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => setIsOrderTrackingOpen(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Tra cứu tiến độ bưu kiện
                </button>
              </li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Chính sách đổi trả 14 ngày</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Bảo hành kết cấu 24 tháng</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Hướng dẫn thanh toán VietQR</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Quy trình đóng gói chống sốc</span></li>
            </ul>
          </div>

          {/* Showroom & Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white uppercase tracking-wider text-[11px]">Không gian trưng bày</h3>
            <div className="space-y-2 text-stone-400 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-300 block">TP. Hồ Chí Minh:</strong>
                  <span>88 Đồng Khởi, Phường Bến Nghé, Quận 1</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-300 block">Hà Nội:</strong>
                  <span>42 Tràng Tiền, Quận Hoàn Kiếm</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-stone-300">
                <Phone className="w-3.5 h-3.5 text-stone-500" />
                <span>Hotline: 1900 8920 (8:30 - 21:00)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500">
          <p>© 2026 MINH & CO. Tất cả quyền được bảo lưu. Giấy phép ĐKKD số 0318928492.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Chính sách bảo mật</span>
            <span>·</span>
            <span>Điều khoản dịch vụ</span>
            <span>·</span>
            <span>Bán buôn & Dự án B2B</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
