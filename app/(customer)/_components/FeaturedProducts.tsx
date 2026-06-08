"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/shared/ProductCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared/ui/button";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number | null;
  originalPrice: number | null;
  image: string | null;
  category?: { name: string } | null;
  brand?: { name: string } | null;
  isFeatured: boolean;
}

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
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
          {products.map((product, index) => (
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
