import React from 'react';
import { Compass, Feather, Sparkles } from 'lucide-react';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-16 sm:py-24 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
            Triết Lý Chế Tác
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-snug">
            Khi vật liệu tự nhiên kể câu chuyện của sự an yên
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
            Chúng tôi tin rằng một ngôi nhà đẹp không đến từ sự phô trương hào nhoáng, mà khởi nguồn từ cảm giác bình yên trong từng xúc giác chạm vào vân gỗ sồi, men gốm rạn hay ánh sáng ấm cúng.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-2xl bg-stone-800/60 border border-stone-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-700/50 flex items-center justify-center text-amber-300">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-base text-white">01. Vật liệu nguyên bản bền vững</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              100% gỗ sồi trắng đạt chuẩn chứng nhận rừng trồng FSC, đá Travertine tự nhiên và đất sét cao lanh tinh khiết. Không dùng hóa chất công nghiệp độc hại hay phủ bóng nhân tạo.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-800/60 border border-stone-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-700/50 flex items-center justify-center text-amber-300">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-base text-white">02. Bàn tay nghệ nhân thủ công Việt</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Hợp tác mật thiết với các làng nghề truyền thống Bát Tràng, Hương Canh và xưởng mộc Bình Dương. Mỗi sản phẩm đều lưu giữ dấu ấn mộc mạc và công sức của người thợ thủ công.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-800/60 border border-stone-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-700/50 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-base text-white">03. Tối giản & Trường tồn với thời gian</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Từ bỏ những chi tiết rườm rà thừa thãi để tập trung vào công năng hữu dụng và đường nét thuần khiết. Đồ vật càng sử dụng lâu càng đẹp và nhuốm màu thời gian.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
