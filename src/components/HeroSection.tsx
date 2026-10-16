import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Hero Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest font-semibold text-stone-500">
              Bộ Sưu Tập Mùa Thu 2026
            </div>
            
            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Nghệ thuật kiến tạo không gian sống an tĩnh
            </h1>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Tuyển tập những tác phẩm nội thất gỗ sồi mộc mạc, gốm nung men tro và ánh sáng ấm áp. Từng chi tiết được chắt lọc để mang lại sự cân bằng và thư thái thuần khiết cho tổ ấm của bạn.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <span>Khám phá bộ sưu tập</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href="#craftsmanship"
                className="inline-flex items-center px-5 py-3.5 text-sm font-medium text-stone-700 hover:text-stone-950 transition-colors"
              >
                Triết lý chế tác
              </a>
            </div>
          </div>

          {/* Right Column: High-Fidelity Campaign Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[4/3] shadow-md bg-stone-200">
              <img
                src="/src/assets/images/hero_living_space_1792141700212.jpg"
                alt="Không gian phòng khách tối giản với ghế gỗ sồi và bàn đá travertine"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex justify-between items-center pointer-events-none">
                <span className="font-medium">Hasle Lounge Chair & Travertine Coffee Table</span>
                <span className="text-stone-300">Minh & Co. Studio</span>
              </div>
            </div>
          </div>

        </div>

        {/* Claim-to-Proof Adjacency: 4-Column Trust Strip below hero */}
        <div className="mt-14 pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-900">100% Tự Nhiên</h2>
              <p className="text-xs text-stone-500 mt-0.5">Gỗ sồi Bắc Mỹ chuẩn FSC & men gốm khoáng sạch</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Giao Hàng Chống Sốc</h2>
              <p className="text-xs text-stone-500 mt-0.5">Bọc xốp định hình 3 lớp, bảo hiểm rủi ro 100%</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-900">14 Ngày Đổi Trả</h2>
              <p className="text-xs text-stone-500 mt-0.5">Đổi trả tận nơi không tính phí nếu chưa ưng ý</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Bảo Hành 2 Năm</h2>
              <p className="text-xs text-stone-500 mt-0.5">Cam kết hỗ trợ bảo dưỡng mộc trọn đời</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
