import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const UNSPLASH_BASE = "https://images.unsplash.com";

const brands = [
  { name: "Nike", slug: "nike", description: "Thương hiệu thể thao hàng đầu thế giới", isFeatured: true },
  { name: "Adidas", slug: "adidas", description: "Thương hiệu thể thao đến từ Đức", isFeatured: true },
  { name: "Puma", slug: "puma", description: "Thương hiệu thể thao cao cấp", isFeatured: false },
  { name: "New Balance", slug: "new-balance", description: "Giày thể thao comfort", isFeatured: true },
  { name: "Converse", slug: "converse", description: "Icon thời trang đường phố", isFeatured: true },
  { name: "Biti's", slug: "bitis", description: "Thương hiệu Việt Nam", isFeatured: true },
  { name: "Casio", slug: "casio", description: "Đồng hồ & Phụ kiện Nhật Bản", isFeatured: false },
  { name: "Samsonite", slug: "samsonite", description: "Vali & Balo cao cấp", isFeatured: false },
  { name: "Reuzel", slug: "reuzel", description: "Gôm xịt tóc nam cao cấp", isFeatured: false },
  { name: "Wacom", slug: "wacom", description: "Bút stylus chuyên nghiệp", isFeatured: false },
  { name: "Thanh Lam", slug: "thanh-lam", description: "Thương hiệu riêng", isFeatured: true },
  { name: "Mont Blanc", slug: "mont-blanc", description: "Dụng cụ viết cao cấp", isFeatured: false },
];

const categories = [
  {
    name: "Giày",
    slug: "giay",
    description: "Các loại giày nam: giày da, giày thể thao, giày sneaker",
    isFeatured: true,
    image: `${UNSPLASH_BASE}/photo-1542291026-7eec264c27ff?w=800&q=80`,
    subCategories: [
      { name: "Giày da", slug: "giay-da" },
      { name: "Giày thể thao", slug: "giay-the-thao" },
      { name: "Sneaker", slug: "sneaker" },
    ],
  },
  {
    name: "Dép",
    slug: "dep",
    description: "Dép tông, dép xỏ ngón, dép quai ngang",
    isFeatured: true,
    image: `${UNSPLASH_BASE}/photo-1603487742131-4160ec999306?w=800&q=80`,
    subCategories: [
      { name: "Dép tông", slug: "dep-tong" },
      { name: "Dép xỏ ngón", slug: "dep-xo-ngon" },
      { name: "Dép quai ngang", slug: "dep-quai-ngang" },
      { name: "Dép Biti's", slug: "dep-bitis" },
    ],
  },
  {
    name: "Balo",
    slug: "balo",
    description: "Balo laptop, balo du lịch, balo thể thao",
    isFeatured: true,
    image: `${UNSPLASH_BASE}/photo-1553062407-98eeb64c6a62?w=800&q=80`,
    subCategories: [
      { name: "Balo laptop", slug: "balo-laptop" },
      { name: "Balo du lịch", slug: "balo-du-lich" },
      { name: "Balo thể thao", slug: "balo-the-thao" },
    ],
  },
  {
    name: "Vali",
    slug: "vali",
    description: "Vali xách tay, vali du lịch các loại",
    isFeatured: false,
    image: `${UNSPLASH_BASE}/photo-1565026057447-bc90a3dceb87?w=800&q=80`,
    subCategories: [
      { name: "Vali xách tay", slug: "vali-xach-tay" },
      { name: "Vali du lịch", slug: "vali-du-lich" },
      { name: "Vali nhựa", slug: "vali-nhua" },
    ],
  },
  {
    name: "Phụ kiện",
    slug: "phu-kien",
    description: "Đồng hồ, trang sức, phụ kiện thời trang",
    isFeatured: true,
    image: `${UNSPLASH_BASE}/photo-1523170335258-f5ed11844a49?w=800&q=80`,
    subCategories: [
      { name: "Đồng hồ", slug: "dong-ho" },
      { name: "Thắt lưng", slug: "that-lung" },
      { name: "Cà vạt", slug: "ca-vat" },
    ],
  },
  {
    name: "Chăm sóc cá nhân",
    slug: "cham-soc-ca-nhan",
    description: "Gôm xịt tóc, dầu gội nam, máy cạo râu",
    isFeatured: false,
    image: `${UNSPLASH_BASE}/photo-1621607512214-68297480165e?w=800&q=80`,
    subCategories: [
      { name: "Gôm xịt tóc", slug: "gom-xit-toc" },
      { name: "Dầu gội nam", slug: "dau-goi-nam" },
      { name: "Máy cạo râu", slug: "may-cao-rau" },
    ],
  },
  {
    name: "Trang sức nam",
    slug: "trang-suc",
    description: "Khuyên tai, dây chuyền, nhẫn, vòng tay",
    isFeatured: false,
    image: `${UNSPLASH_BASE}/photo-1611085583191-a3b181a88401?w=800&q=80`,
    subCategories: [
      { name: "Khuyên tai", slug: "khuyen-tai" },
      { name: "Dây chuyền", slug: "day-chuyen" },
      { name: "Nhẫn", slug: "nhan" },
      { name: "Vòng tay", slug: "vong-tay" },
    ],
  },
  {
    name: "Thắt lưng",
    slug: "that-lung",
    description: "Thắt lưng da, thắt lưng công sở, thắt lưng casual",
    isFeatured: false,
    image: `${UNSPLASH_BASE}/photo-1624222247344-550fb60583dc?w=800&q=80`,
    subCategories: [
      { name: "Thắt lưng da", slug: "that-lung-da" },
      { name: "Thắt lưng công sở", slug: "that-lung-cong-so" },
    ],
  },
];

const products = [
  // Giày
  { name: "Giày Nike Air Max 90", slug: "giay-nike-air-max-90", price: 3500000, originalPrice: 4200000, description: "Giày Nike Air Max 90 với đệm AIR có thể nhìn thấy được. Thiết kế kinh điển, phù hợp cho cả đi dạo và thể thao nhẹ.", material: "Da tổng hợp, lưới", color: "Trắng/Đen/Đỏ", size: "39-44", isFeatured: true, categorySlug: "giay", brandSlug: "nike" },
  { name: "Giày Adidas Ultraboost 23", slug: "giay-adidas-ultraboost-23", price: 4800000, description: "Adidas Ultraboost 23 với công nghệ Boost cho cảm giác êm ái tuyệt đối. Upper Primeknit ôm sát chân.", material: "Primeknit, Boost", color: "Đen", size: "39-44", isFeatured: true, categorySlug: "giay", brandSlug: "adidas" },
  { name: "Giày Puma Suede Classic", slug: "giay-puma-suede-classic", price: 2100000, description: "Giày Puma Suede Classic XXI với upper da lộn cao cấp. Biểu tượng Puma nổi tiếng.", material: "Da lộn", color: "Navy/Trắng", size: "39-44", isFeatured: false, categorySlug: "giay", brandSlug: "puma" },
  { name: "Giày New Balance 574", slug: "giay-new-balance-574", price: 2800000, description: "New Balance 574 - đôi giày mang tính biểu tượng với ENCAP midsole.", material: "Da, lưới", color: "Xám/Đỏ", size: "39-44", isFeatured: true, categorySlug: "giay", brandSlug: "new-balance" },
  { name: "Giày Converse Chuck Taylor All Star", slug: "giay-converse-chuck-taylor", price: 1600000, description: "Chuck Taylor All Star - biểu tượng văn hoá đường phố thế giới.", material: "Vải canvas", color: "Trắng/Đen", size: "39-44", isFeatured: true, categorySlug: "giay", brandSlug: "converse" },
  { name: "Giày Nike Air Jordan 1 Retro High", slug: "giay-nike-air-jordan-1-retro-high", price: 5200000, originalPrice: 5800000, description: "Nike Air Jordan 1 Retro High OG - huyền thoại bóng rổ trở thành sneaker văn hoá.", material: "Da", color: "Chicago Red/White/Black", size: "40-44", isFeatured: true, categorySlug: "giay", brandSlug: "nike" },

  // Dép
  { name: "Dép Biti's Hunter Classic", slug: "dep-bitis-hunter-classic", price: 450000, description: "Dép Biti's Hunter Classic - sản phẩm Việt Nam được yêu thích nhất.", material: "Cao su", color: "Đen/Nâu", size: "38-44", isFeatured: true, categorySlug: "dep", brandSlug: "bitis" },
  { name: "Dép tông gỗ cao cấp", slug: "dep-tong-go-cao-cap", price: 280000, description: "Dép tông gỗ tự nhiên, thoáng khí, phù hợp mùa hè nóng bức.", material: "Gỗ tự nhiên", color: "Nâu gỗ", size: "39-44", isFeatured: false, categorySlug: "dep", brandSlug: "thanh-lam" },
  { name: "Dép xỏ ngón Adidas Adilette", slug: "dep-xo-ngon-adidas-adilette", price: 890000, description: "Dép xỏ ngón Adidas Adilette - êm ái, phù hợp cho cả bể bơi và đi dạo.", material: "Synthetic", color: "Đen/Trắng", size: "39-46", isFeatured: false, categorySlug: "dep", brandSlug: "adidas" },
  { name: "Dép Nike Benassi JDI", slug: "dep-nike-benassi-jdi", price: 650000, description: "Dép Nike Benassi JDI với dây đeo co giãn và đế foam êm ái.", material: "Foam", color: "Đen", size: "39-45", isFeatured: false, categorySlug: "dep", brandSlug: "nike" },

  // Balo
  { name: "Balo Laptop Pro 15 inch", slug: "balo-laptop-pro-15-inch", price: 890000, originalPrice: 1200000, description: "Balo laptop chống sốc 15 inch với nhiều ngăn, chất liệu vải cordura bền bỉ.", material: "Cordura 600D", color: "Đen/Xám", size: "15 inch", isFeatured: true, categorySlug: "balo", brandSlug: "thanh-lam" },
  { name: "Balo du lịch 30L", slug: "balo-du-lich-30l", price: 1450000, description: "Balo du lịch đa năng 30L với hệ thống chống sốc và thoáng khí.", material: "Polyester", color: "Xanh navy", size: "30L", isFeatured: false, categorySlug: "balo", brandSlug: "samsonite" },
  { name: "Balo Nike Brasilia", slug: "balo-nike-brasilia", price: 780000, description: "Balo Nike Brasilia 10L - nhỏ gọn, tiện dụng cho gym và thể thao.", material: "Polyester", color: "Đen", size: "10L", isFeatured: false, categorySlug: "balo", brandSlug: "nike" },

  // Vali
  { name: "Vali Du Lịch Nhựa ABS 24 inch", slug: "vali-du-lich-nhua-abs-24-inch", price: 1800000, originalPrice: 2200000, description: "Vali du lịch nhựa ABS cao cấp, chống va đập, có ổ khóa TSA.", material: "ABS nhựa", color: "Đen/Đỏ/Navy", size: "24 inch", isFeatured: true, categorySlug: "vali", brandSlug: "samsonite" },
  { name: "Vali xách tay 20 inch", slug: "vali-xach-tay-20-inch", price: 1350000, description: "Vali xách tay hãng bay, size 20 inch, nhẹ và bền.", material: "Polycarbonate", color: "Xám bạc", size: "20 inch", isFeatured: false, categorySlug: "vali", brandSlug: "samsonite" },

  // Phụ kiện
  { name: "Đồng Hồ Casio Edifice", slug: "dong-ho-casio-edifice", price: 3500000, description: "Đồng hồ Casio Edifice EQB-500 với kết nối Bluetooth và thiết kế nam tính.", material: "Thép không gỉ", color: "Bạc/Đen", size: "One size", isFeatured: true, categorySlug: "phu-kien", brandSlug: "casio" },
  { name: "Thắt Lưng Da Bò Cao Cấp", slug: "that-lung-da-bo-cao-cap", price: 650000, description: "Thắt lưng da bò nguyên miếng, đai da thật, khóa kim loại cao cấp.", material: "Da bò nguyên miếng", color: "Đen/Nâu", size: "110cm", isFeatured: false, categorySlug: "phu-kien", brandSlug: "thanh-lam" },
  { name: "Thắt Lưng Công Sở Da Ý", slug: "that-lung-cong-so-da-y", price: 950000, description: "Thắt lưng công sở da Ý nhập khẩu, thiết kế thanh lịch.", material: "Da Ý", color: "Đen", size: "115cm", isFeatured: false, categorySlug: "phu-kien", brandSlug: "thanh-lam" },

  // Chăm sóc cá nhân
  { name: "Gôm Xịt Tóc Reuzel Pomade", slug: "gom-xit-toc-reuzel-pomade", price: 350000, description: "Gôm xịt tóc Reuzel Matte Pomade - giữ nếp tóc suốt ngày dài.", material: "Clay", color: "Nâu", size: "100ml", isFeatured: false, categorySlug: "cham-soc-ca-nhan", brandSlug: "reuzel" },
  { name: "Dầu Gội Nam Old Spice", slug: "dau-goi-nam-old-spice", price: 180000, description: "Dầu gội Old Spice Champion - sạch sâu, hương thơm nam tính.", material: "Dung dịch", color: "Xanh", size: "400ml", isFeatured: false, categorySlug: "cham-soc-ca-nhan", brandSlug: "thanh-lam" },
  { name: "Máy Cạo Râu Philips OneBlade", slug: "may-cao-rau-philips-oneblade", price: 890000, description: "Máy cạo râu Philips OneBlade - cạo sát, không kích ứng da.", material: "Nhựa + Thép", color: "Đen/Xanh", size: "One size", isFeatured: false, categorySlug: "cham-soc-ca-nhan", brandSlug: "thanh-lam" },

  // Trang sức
  { name: "Vòng tay da nam cao cấp", slug: "vong-tay-da-nam-cao-cap", price: 250000, description: "Vòng tay da nam đính khóa bạc, phong cách casual.", material: "Da tổng hợp", color: "Đen/Brown", size: "Adjustable", isFeatured: false, categorySlug: "trang-suc", brandSlug: "thanh-lam" },
  { name: "Dây chuyền nam thập giá", slug: "day-chuyen-nam-thap-gia", price: 450000, description: "Dây chuyền nam mạ vàng 18K với mặt thập giá tinh tế.", material: "Thép không gỉ mạ vàng", color: "Vàng", size: "55cm", isFeatured: false, categorySlug: "trang-suc", brandSlug: "thanh-lam" },
  { name: "Nhẫn nam titanium", slug: "nhan-nam-titanium", price: 550000, description: "Nhẫn nam titanium cao cấp, chống gỉ, nhẹ và bền.", material: "Titanium", color: "Bạc", size: "7-12", isFeatured: false, categorySlug: "trang-suc", brandSlug: "thanh-lam" },
];

const productImages: Record<string, string[]> = {
  "giay-nike-air-max-90": [
    `${UNSPLASH_BASE}/photo-1542291026-7eec264c27ff?w=800&q=80`,
    `${UNSPLASH_BASE}/photo-1549298916-b41d501d3772?w=800&q=80`,
    `${UNSPLASH_BASE}/photo-1539185441755-769473a23570?w=800&q=80`,
  ],
  "giay-adidas-ultraboost-23": [
    `${UNSPLASH_BASE}/photo-1608231387042-66d1773070a5?w=800&q=80`,
    `${UNSPLASH_BASE}/photo-1600269452121-4f2416e55c28?w=800&q=80`,
  ],
};

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.contact.deleteMany();
  console.log("✅ Cleared existing data");

  // Create brands
  const createdBrands: Record<string, { id: string }> = {};
  for (const brand of brands) {
    const b = await prisma.brand.create({ data: brand });
    createdBrands[brand.slug] = b;
  }
  console.log(`✅ Created ${brands.length} brands`);

  // Create categories with subcategories
  const createdCategories: Record<string, { id: string }> = {};
  for (const cat of categories) {
    const { subCategories, ...catData } = cat;
    const c = await prisma.category.create({ data: catData });
    createdCategories[cat.slug] = c;

    for (const sub of subCategories) {
      await prisma.subCategory.create({
        data: { ...sub, categoryId: c.id },
      });
    }
    console.log(`  - Created category "${cat.name}" with ${subCategories.length} subcategories`);
  }
  console.log(`✅ Created ${categories.length} categories`);

  // Create products
  for (const prod of products) {
    const { categorySlug, brandSlug, ...prodData } = prod;
    const category = createdCategories[categorySlug];
    const brand = createdBrands[brandSlug];

    const p = await prisma.product.create({
      data: {
        ...prodData,
        categoryId: category.id,
        brandId: brand.id,
      },
    });

    const images = productImages[prod.slug] || [`${UNSPLASH_BASE}/photo-1542291026-7eec264c27ff?w=800&q=80`];
    for (let i = 0; i < images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: p.id,
          url: images[i],
          isPrimary: i === 0,
          sortOrder: i,
        },
      });
    }
  }
  console.log(`✅ Created ${products.length} products`);

  // Create banners
  const bannerData = [
    {
      title: "Bộ sưu tập giày mới 2026",
      subtitle: "Nike xem ngay",
      image: `${UNSPLASH_BASE}/photo-1542291026-7eec264c27ff?w=1920&q=80`,
      link: "/products",
      linkText: "Mua ngay",
      position: 1,
      isActive: true,
    },
    {
      title: "Sale up to 50%",
      subtitle: "Khuyến mãi lớn",
      image: `${UNSPLASH_BASE}/photo-1490578474895-699cd4e2cf59?w=1920&q=80`,
      link: "/products",
      linkText: "Xem ngay",
      position: 2,
      isActive: true,
    },
    {
      title: "Lookbook mùa hè",
      subtitle: "Xu hướng 2026",
      image: `${UNSPLASH_BASE}/photo-1507003211169-0a1dd7228f2d?w=1920&q=80`,
      link: "/lookbook",
      linkText: "Khám phá",
      position: 3,
      isActive: true,
    },
  ];

  for (const banner of bannerData) {
    await prisma.banner.create({ data: banner });
  }
  console.log(`✅ Created ${bannerData.length} banners`);

  // Create sample contact
  await prisma.contact.create({
    data: {
      name: "Nguyễn Văn Demo",
      email: "demo@thanhlamshop.vn",
      phone: "0909123456",
      subject: "Tin nhắn mẫu",
      message: "Chào cửa hàng, tôi muốn biết thêm về các sản phẩm giày Nike hiện có.",
    },
  });

  console.log("\n🎉 Seed completed successfully!");
  console.log(`   - ${brands.length} brands`);
  console.log(`   - ${categories.length} categories`);
  console.log(`   - ${products.length} products`);
  console.log(`   - ${bannerData.length} banners`);
  console.log(`   - 1 sample contact`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
