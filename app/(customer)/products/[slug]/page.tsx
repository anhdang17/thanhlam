"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Share2, Eye } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Separator } from "@/components/shared/ui/separator";
import { formatPrice } from "@/lib/utils";

const product = {
  id: "1",
  slug: "giay-nike-air-max-90",
  name: "Giày Nike Air Max 90",
  price: 3500000,
  originalPrice: 4200000,
  description: `Giày Nike Air Max 90 là một trong những đôi giày thể thao mang tính biểu tượng nhất của Nike. Với thiết kế kinh điển, đệm AIR có thể nhìn thấy được và upper bằng da tổng hợp, đôi giày này mang lại sự thoải mái tối đa cho người đi.\n\n**Thông số kỹ thuật:**\n- Chất liệu: Da tổng hợp, lưới\n- Đệm: Air Max\n- Đế: Cao su bền\n- Màu sắc: Trắng/Đen/Đỏ\n- Size: 39 - 44\n\nPhù hợp cho cả đi dạo và các hoạt động thể thao nhẹ.`,
  material: "Da tổng hợp, lưới",
  color: "Trắng/Đen/Đỏ",
  size: "39 - 44",
  category: "Giày",
  brand: "Nike",
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
  ],
};

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.originalPrice!) * 100) : 0;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <a href="/" className="hover:text-accent transition-colors">Trang chủ</a>
          <ChevronRight className="w-4 h-4" />
          <a href="/products" className="hover:text-accent transition-colors">Sản phẩm</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-xl overflow-hidden bg-card border border-border"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {hasDiscount && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-md">
                  -{discountPercent}%
                </span>
              )}
            </motion.div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    i === selectedImage ? "border-accent" : "border-border hover:border-accent/50"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="100px" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-accent uppercase tracking-wider mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">{product.name}</h1>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-accent">{formatPrice(product.price)}</span>
                {hasDiscount && (
                  <span className="text-xl text-text-secondary line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              {[
                { label: "Chất liệu", value: product.material },
                { label: "Màu sắc", value: product.color },
                { label: "Size", value: product.size },
                { label: "Danh mục", value: product.category },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-sm text-text-secondary w-28">{item.label}:</span>
                  <span className="text-sm font-medium text-text">{item.value}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full gap-2">
                Liên hệ đặt hàng
              </Button>
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-green-400" /> Hàng chính hãng</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-green-400" /> Bảo hành 6 tháng</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-green-400" /> Đổi trả 7 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
