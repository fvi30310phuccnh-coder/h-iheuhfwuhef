import { Product, Coupon } from '../types/store';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'mc-01',
    name: 'Ghế Tựa Gỗ Sồi Bắc Âu Hasle',
    subtitle: 'Khung gỗ sồi tự nhiên với đệm dây đan thủ công',
    category: 'furniture',
    categoryLabel: 'Nội Thất & Đèn',
    price: 3850000,
    originalPrice: 4200000,
    rating: 4.9,
    reviewCount: 38,
    image: '/src/assets/images/product_oak_chair_1792141745792.jpg',
    tag: 'Bán chạy',
    description: 'Chiếc ghế mang đậm tinh thần Wabi-sabi và tối giản Bắc Âu. Khung ghế được gia công từ gỗ sồi trắng Bắc Mỹ tuyển chọn loại A, bề mặt được mài mịn mượt và phủ dầu thực vật tự nhiên không độc hại. Phần mặt ngồi đan thủ công từ sợi cói dệt chịu lực cao, tạo cảm giác êm ái thoáng khí suốt 4 mùa.',
    story: 'Được chế tác qua 18 bước thủ công bởi các nghệ nhân mộc lành nghề tại xưởng thủ công Bình Dương, mỗi chiếc ghế lưu giữ trọn vẹn những đường vân gỗ độc bản tự nhiên.',
    dimensions: 'Cao 76cm × Rộng 58cm × Sâu 54cm (Chiều cao mặt ngồi: 44cm)',
    materials: 'Gỗ sồi trắng Bắc Mỹ (FSC Certified), Sợi đan giấy Kraft bện tự nhiên',
    origin: 'Chế tác thủ công tại Việt Nam',
    inStock: true,
    stockCount: 14,
    variants: [
      { id: 'v-oak-nat', name: 'Gỗ sồi tự nhiên', colorHex: '#d8b589', inStock: true },
      { id: 'v-oak-wal', name: 'Gỗ sồi nhuộm óc chó', colorHex: '#5e4330', inStock: true },
    ],
    specs: [
      { label: 'Chất liệu khung', value: 'Gỗ sồi trắng Bắc Mỹ nguyên khối' },
      { label: 'Bề mặt hoàn thiện', value: 'Dầu khoáng thảo mộc hữu cơ Osmo' },
      { label: 'Tải trọng tối đa', value: '140 kg' },
      { label: 'Trọng lượng', value: '6.8 kg' },
      { label: 'Thời gian bảo hành', value: '24 tháng kết cấu khung' },
    ],
    careInstructions: [
      'Lau nhẹ bằng khăn cotton mềm hơi ẩm, tránh dùng hóa chất tẩy rửa mạnh.',
      'Tránh để sản phẩm tiếp xúc trực tiếp dưới ánh nắng gay gắt kéo dài.',
      'Nên quét dầu dưỡng gỗ 6 tháng một lần để duy trì độ bóng và sắc thái ấm áp.'
    ],
    reviews: [
      {
        id: 'rev-01',
        author: 'Nguyễn Hoàng Long (Kiến trúc sư, TP.HCM)',
        rating: 5,
        date: '12/10/2026',
        title: 'Độ hoàn thiện vượt mong đợi',
        comment: 'Khung gỗ sồi mịn bóng không một dằm nhỏ, đệm cói đan rất chắc chắn và ngồi êm ái không hề bị võng. Xứng đáng với từng đồng.',
        verifiedPurchase: true,
      },
      {
        id: 'rev-02',
        author: 'Trần Mai Phương (Hà Nội)',
        rating: 5,
        date: '05/10/2026',
        title: 'Màu gỗ ấm và đóng gói cực kỳ cẩn thận',
        comment: 'Shop đóng gói thùng xốp 3 lớp chống va đập. Mở ra thơm mùi dầu gỗ tự nhiên rất thích.',
        verifiedPurchase: true,
      }
    ]
  },
  {
    id: 'mc-02',
    name: 'Bộ Ấm Trà Gốm Nung Mộc Đen Nhám',
    subtitle: '1 ấm trà nung nhiệt cao kèm 2 chén uống trà',
    category: 'ceramics',
    categoryLabel: 'Gốm Sứ & Trà Đạo',
    price: 890000,
    originalPrice: 1050000,
    rating: 5.0,
    reviewCount: 64,
    image: '/src/assets/images/product_tea_set_1792141700444.jpg',
    tag: 'Nổi bật',
    description: 'Bộ ấm trà thủ công với lớp men đen nhám khoáng thạch, được nung ở nhiệt độ 1.280°C giúp giữ nhiệt trà lâu và làm dịu nước. Miệng ấm được tiện khéo léo giúp dòng chảy êm mượt, không nhỏ giọt thừa. Tay cầm thiết kế công thái học dễ dàng thao tác rót.',
    story: 'Lấy cảm hứng từ triết lý thưởng trà truyền thống phương Đông, bộ ấm trà tạo nên không gian tĩnh tại cho những buổi sáng tĩnh tâm hay trò chuyện thân mật.',
    dimensions: 'Ấm: 450ml (14cm × 9.5cm) · Chén: 70ml (6cm × 5.2cm)',
    materials: 'Đất sét cao lanh tự nhiên pha khoáng thạch đen',
    origin: 'Làng gốm Bát Tràng, Hà Nội',
    inStock: true,
    stockCount: 22,
    variants: [
      { id: 'v-tea-black', name: 'Đen nhám khoáng thạch', colorHex: '#27272a', inStock: true },
      { id: 'v-tea-clay', name: 'Đất nung mộc mạc', colorHex: '#854d0e', inStock: true },
    ],
    specs: [
      { label: 'Dung tích ấm', value: '450 ml (pha được 4-5 chén)' },
      { label: 'Nhiệt độ nung', value: '1.280°C' },
      { label: 'Khả năng chịu nhiệt', value: 'Chịu sốc nhiệt từ 0°C đến 150°C' },
      { label: 'Lưới lọc trà', value: 'Lưới gốm tổ ong đa lỗ bên trong' },
      { label: 'Quy cách đóng gói', value: 'Hộp quà lót mút bọc vải đũi cao cấp' }
    ],
    careInstructions: [
      'Tráng nước sôi sạch trước lần sử dụng đầu tiên.',
      'Chỉ rửa bằng nước ấm, không dùng xà phòng tẩy rửa có mùi thơm nồng.',
      'Để ráo tự nhiên ở nơi khô thoáng sau khi dùng.'
    ],
    reviews: [
      {
        id: 'rev-03',
        author: 'Phạm Đức Anh (Đà Nẵng)',
        rating: 5,
        date: '08/10/2026',
        title: 'Ấm ngắt dòng cực chuẩn, men gốm mịn',
        comment: 'Dòng nước rót tròn, ngắt giọt dứt khoát không bị rớt nước ra bàn trà. Men đen mờ cầm rất êm tay.',
        verifiedPurchase: true,
      }
    ]
  },
  {
    id: 'mc-03',
    name: 'Đèn Bàn Chân Gỗ Óc Chó Chao Đồng Thau',
    subtitle: 'Đèn đọc sách & trang trí với công tắc dimmer ánh sáng ấm',
    category: 'lighting',
    categoryLabel: 'Nội Thất & Đèn',
    price: 1950000,
    originalPrice: 2300000,
    rating: 4.8,
    reviewCount: 42,
    image: '/src/assets/images/product_desk_lamp_1792141700074.jpg',
    tag: 'Thiết kế mới',
    description: 'Sự kết hợp hài hòa giữa khối chân gỗ óc chó nguyên khối được tiện cong mềm mại và chao đèn bằng đồng thau phay xước cao cấp. Đèn phát ra ánh sáng vàng dịu 2.700K chống mỏi mắt khi làm việc buổi tối và đọc sách.',
    story: 'Thiết kế tối giản mang lại sự ấm áp tĩnh lặng cho góc làm việc hoặc đầu giường ngủ.',
    dimensions: 'Cao 46cm × Đường kính chao 24cm (Đường kính chân 12cm)',
    materials: 'Đồng thau nguyên tấm chải xước, Gỗ óc chó Bắc Mỹ nguyên khối',
    origin: 'Thiết kế & gia công tại TP.HCM',
    inStock: true,
    stockCount: 9,
    variants: [
      { id: 'v-lamp-brass', name: 'Đồng thau vàng ấm', colorHex: '#ca8a04', inStock: true },
      { id: 'v-lamp-black', name: 'Đồng sơn đen mờ', colorHex: '#18181b', inStock: true }
    ],
    specs: [
      { label: 'Đui bóng', value: 'Chuẩn E27 tiêu chuẩn (Kèm bóng LED Edison 6W)' },
      { label: 'Nhiệt độ màu', value: '2.700K (Vàng ấm thư giãn)' },
      { label: 'Dây dẫn điện', value: 'Dây bọc sợi dù cao cấp dài 1.8m kèm công tắc xoay' },
      { label: 'Điện áp sử dụng', value: '220V - 50Hz' }
    ],
    careInstructions: [
      'Lau chùi bằng khăn khô mềm, không xịt trực tiếp dung môi lên chao đồng.',
      'Rút phích cắm trước khi vệ sinh hoặc thay bóng đèn.'
    ],
    reviews: [
      {
        id: 'rev-04',
        author: 'Lê Thanh Thảo (Quận 3, TP.HCM)',
        rating: 5,
        date: '02/10/2026',
        title: 'Ánh sáng rất ấm cúng và sang trọng',
        comment: 'Đặt lên bàn làm việc nhìn rất tinh tế, ánh sáng dịu mắt không gây chói. Chất liệu đồng thau cầm nặng tay.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'mc-04',
    name: 'Tinh Dầu Khuếch Tán Gỗ Sồi & Hổ Phách Smoked Oak',
    subtitle: 'Hương thơm tự nhiên thư giãn với que mây tán hương',
    category: 'fragrance',
    categoryLabel: 'Mùi Hương & Trà',
    price: 680000,
    originalPrice: 750000,
    rating: 4.9,
    reviewCount: 95,
    image: '/src/assets/images/product_diffuser_1792141699941.jpg',
    tag: 'Được yêu thích',
    description: 'Nốt hương trầm ấm kết hợp giữa gỗ sồi hun khói, nhựa hổ phách cổ thụ và thoảng hương bạch đàn tươi mát. Bình thủy tinh màu hổ phách hun khói bảo vệ tinh dầu khỏi ánh sáng mặt trời, đi kèm 8 que mây tự nhiên dẫn hương êm dịu.',
    story: 'Tạo dựng một ốc đảo yên bình ngay trong phòng ngủ hoặc phòng khách sau những giờ làm việc căng thẳng.',
    dimensions: 'Dung tích 200ml (Sử dụng liên tục từ 3 - 4 tháng)',
    materials: 'Tinh dầu thơm tự nhiên chưng cất, cồn mía hữu cơ, que mây tự nhiên',
    origin: 'Chiết xuất & đóng chai tại Đà Lạt',
    inStock: true,
    stockCount: 35,
    variants: [
      { id: 'v-frag-oak', name: 'Smoked Oak & Amber (Gỗ sồi hun khói)', colorHex: '#78350f', inStock: true },
      { id: 'v-frag-pine', name: 'Dalat Pine & Moss (Rừng thông Đà Lạt)', colorHex: '#14532d', inStock: true },
      { id: 'v-frag-tea', name: 'White Tea & Cedar (Trà trắng & Tuyết tùng)', colorHex: '#a1a1aa', inStock: true }
    ],
    specs: [
      { label: 'Dung tích', value: '200 ml' },
      { label: 'Diện tích tỏa hương', value: '20 - 35 m²' },
      { label: 'Thời gian tỏa hương', value: '90 - 120 ngày' },
      { label: 'Thành phần que', value: '8 que mây xốp tự nhiên 25cm' }
    ],
    careInstructions: [
      'Đảo đầu que mây 1 lần mỗi tuần để hương thơm lan tỏa đều đặn.',
      'Đặt ở nơi có luồng không khí lưu thông nhẹ, tránh ánh nắng trực tiếp hoặc trước quạt gió mạnh.'
    ],
    reviews: [
      {
        id: 'rev-05',
        author: 'Vũ Minh Trang (Hà Nội)',
        rating: 5,
        date: '14/10/2026',
        title: 'Mùi hương rất đằm và không hề nồng gắt',
        comment: 'Hương thơm tự nhiên như bước vào một căn villa gỗ giữa rừng thông. Ai đến nhà chơi cũng hỏi mua ở đâu.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'mc-05',
    name: 'Bình Gốm Cổ Men Thô Wabi-Sabi Nham Thạch',
    subtitle: 'Tác phẩm điêu khắc thủ công trưng bày hoa khô & nhánh cây',
    category: 'ceramics',
    categoryLabel: 'Gốm Sứ & Trà Đạo',
    price: 1250000,
    originalPrice: 1450000,
    rating: 5.0,
    reviewCount: 29,
    image: '/src/assets/images/product_ceramic_vase_1792141745359.jpg',
    tag: 'Độc bản',
    description: 'Mỗi chiếc bình là một tác phẩm nghệ thuật độc bản với bề mặt rạn thô ráp tự nhiên, tái hiện vẻ đẹp mộc mạc phong hóa qua thời gian. Men nham thạch nướng củi tự nhiên tạo nên những biến chuyển màu sắc từ xám tro đến nâu đất ấm.',
    story: 'Tôn vinh sự bất toàn và vẻ đẹp chân thật của đất nung truyền thống theo tinh thần Wabi-sabi Nhật Bản.',
    dimensions: 'Cao 28cm × Đường kính miệng 10cm × Đường kính bụng 19cm',
    materials: 'Đất phù sa pha cát thô, men tro củi tự nhiên',
    origin: 'Làng nghề gốm cổ truyền Hương Canh',
    inStock: true,
    stockCount: 7,
    variants: [
      { id: 'v-vase-ash', name: 'Men tro nham thạch xám', colorHex: '#71717a', inStock: true },
      { id: 'v-vase-ochre', name: 'Đất nung phong hóa nâu', colorHex: '#78350f', inStock: true }
    ],
    specs: [
      { label: 'Kỹ thuật chế tác', value: 'Vuốt tay thủ công 100% trên bàn xoay' },
      { label: 'Phương pháp nung', value: 'Lò củi củi truyền thống 3 ngày đêm' },
      { label: 'Trọng lượng', value: '2.4 kg' },
      { label: 'Tính năng', value: 'Thích hợp cắm cành khô, lau sậy hoặc trưng bày tĩnh' }
    ],
    careInstructions: [
      'Vệ sinh bằng chổi cọ mềm hoặc khăn khô.',
      'Không dùng cọ sắt kim loại gây xước men đá.'
    ],
    reviews: [
      {
        id: 'rev-06',
        author: 'Đặng Quốc Huy (Nha Trang)',
        rating: 5,
        date: '10/10/2026',
        title: 'Chất liệu thô mộc tuyệt đẹp',
        comment: 'Cắm nhánh cành khô để góc phòng khách tạo chiều sâu thẩm mỹ rất khác biệt.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'mc-06',
    name: 'Bàn Trà Đá Travertine Chân Nguyên Khối',
    subtitle: 'Bàn sofa đá tự nhiên nhập khẩu phong cách kiến trúc',
    category: 'furniture',
    categoryLabel: 'Nội Thất & Đèn',
    price: 6450000,
    originalPrice: 7200000,
    rating: 4.9,
    reviewCount: 19,
    image: '/src/assets/images/hero_living_space_1792141700212.jpg',
    tag: 'Phiên bản giới hạn',
    description: 'Mặt bàn bằng đá Travertine tự nhiên với những đường rỗ vân đá cổ điển được giữ nguyên bản mộc mạc. Chân bàn bằng đá travertine khối đối xứng tạo sự vững chãi và vẻ đẹp uy nghi tĩnh lặng cho phòng khách hiện đại.',
    story: 'Khối đá được khai thác tự nhiên với tuổi đời hàng triệu năm, mang vẻ đẹp vượt thời gian vào từng không gian sống.',
    dimensions: 'Dài 110cm × Rộng 60cm × Cao 36cm (Dày mặt đá 3cm)',
    materials: 'Đá Travertine tự nhiên nguyên khối màu kem cát',
    origin: 'Gia công & hoàn thiện tại TP.HCM',
    inStock: true,
    stockCount: 5,
    specs: [
      { label: 'Chất liệu', value: 'Đá Travertine tự nhiên tuyển chọn' },
      { label: 'Bề mặt', value: 'Chà mờ tự nhiên chống bám ố Nano' },
      { label: 'Trọng lượng', value: '45 kg' },
      { label: 'Giao hàng', value: 'Đội ngũ chuyên nghiệp giao tận nơi & lắp đặt miễn phí' }
    ],
    careInstructions: [
      'Lau ngay vết nước trà hoặc cà phê bằng khăn ẩm mềm.',
      'Dùng đế lót ly cốc để bảo vệ bề mặt đá hoàn hảo nhất.'
    ],
    reviews: [
      {
        id: 'rev-07',
        author: 'Bùi Lan Chi (Vinhomes Grand Park, TP.HCM)',
        rating: 5,
        date: '28/09/2026',
        title: 'Đẹp như trong tạp chí Architectural Digest',
        comment: 'Bàn rất đầm, vân đá thật sự đẳng cấp. Đội vận chuyển bê lên tận căn hộ và kê gọn gàng.',
        verifiedPurchase: true
      }
    ]
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'MINH10',
    discountPercent: 10,
    description: 'Giảm 10% cho đơn hàng đầu tiên',
    minOrder: 1000000,
  },
  {
    code: 'GIAM200K',
    discountAmount: 200000,
    description: 'Giảm ngay 200.000 ₫ cho đơn từ 2.000.000 ₫',
    minOrder: 2000000,
  },
  {
    code: 'FREESHIP',
    discountAmount: 40000,
    description: 'Miễn phí giao hàng toàn quốc',
    minOrder: 500000,
  }
];

export const VIETNAMESE_CITIES = [
  'Thành phố Hồ Chí Minh',
  'Thủ đô Hà Nội',
  'Thành phố Đà Nẵng',
  'Thành phố Hải Phòng',
  'Thành phố Cần Thơ',
  'Tỉnh Bình Dương',
  'Tỉnh Đồng Nai',
  'Tỉnh Bà Rịa - Vũng Tàu',
  'Tỉnh Thừa Thiên Huế',
  'Tỉnh Lâm Đồng (Đà Lạt)',
  'Tỉnh Khánh Hòa (Nha Trang)',
  'Tỉnh Quảng Nam (Hội An)'
];

export const DISTRICTS_BY_CITY: Record<string, string[]> = {
  'Thành phố Hồ Chí Minh': [
    'Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 7', 'Quận 10', 'Thành phố Thủ Đức', 'Quận Bình Thạnh', 'Quận Phú Nhuận', 'Quận Tân Bình'
  ],
  'Thủ đô Hà Nội': [
    'Quận Hoàn Kiếm', 'Quận Ba Đình', 'Quận Đống Đa', 'Quận Hai Bà Trưng', 'Quận Cầu Giấy', 'Quận Tây Hồ', 'Quận Thanh Xuân', 'Quận Nam Từ Liêm'
  ],
  'Thành phố Đà Nẵng': [
    'Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn', 'Quận Cẩm Lệ'
  ]
};
