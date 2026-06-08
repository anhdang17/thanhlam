"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/shared/ProductCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared/ui/button";

const featuredProducts = [
  {
    id: "1",
    slug: "giay-nike-air-max-90",
    name: "Giày Nike Air Max 90",
    price: 3500000,
    originalPrice: 4200000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    brand: "Nike",
    category: "Giày",
    isFeatured: true,
  },
  {
    id: "2",
    slug: "giay-adidas-ultraboost",
    name: "Giày Adidas Ultraboost 23",
    price: 4800000,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    brand: "Adidas",
    category: "Giày",
    isFeatured: true,
  },
  {
    id: "3",
    slug: "balo-laptop-pro",
    name: "Balo Laptop Pro 15 inch",
    price: 890000,
    originalPrice: 1200000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    brand: "Thanh Lam",
    category: "Balo",
    isFeatured: true,
  },
  {
    id: "4",
    slug: "dep-bitip-hunter",
    name: "Dép Biti's Hunter Classic",
    price: 450000,
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80",
    brand: "Biti's",
    category: "Dép",
    isFeatured: false,
  },
  {
    id: "5",
    slug: "vali-du-lich-nhua",
    name: "Vali Du Lịch Nhựa ABS 24 inch",
    price: 1800000,
    originalPrice: 2200000,
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&q=80",
    brand: "Samsonite",
    category: "Vali",
    isFeatured: true,
  },
  {
    id: "6",
    slug: "dong-ho-casio-edifice",
    name: "Đồng Hồ Casio Edifice",
    price: 3500000,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
    brand: "Casio",
    category: "Phụ kiện",
    isFeatured: true,
  },
  {
    id: "7",
    slug: "that-lung-da-cao-cap",
    name: "Thắt Lưng Da Bò Cao Cấp",
    price: 650000,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80",
    brand: "Thanh Lam",
    category: "Thắt lưng",
    isFeatured: false,
  },
  {
    id: "8",
    slug: "giay-converse-chuck-taylor",
    name: "Giày Converse Chuck Taylor All Star",
    price: 1600000,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80",
    brand: "Converse",
    category: "Giày",
    isFeatured: true,
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24 bg-background-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              Sản phẩm nổi bật
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text">
              Được yêu thích nhất
            </h2>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover transition-colors">
            Xem tất cả
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/products">
            <Button variant="outline" size="lg" className="gap-2">
              Xem tất cả sản phẩm
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
