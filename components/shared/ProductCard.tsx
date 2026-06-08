"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number | string | null;
  originalPrice?: number | string | null;
  image: string | null;
  category?: string | { name: string } | null;
  brand?: string | { name: string } | null;
  isFeatured?: boolean;
  className?: string;
}

export function ProductCard({
  slug,
  name,
  price,
  originalPrice,
  image,
  category,
  brand,
  isFeatured,
  className,
}: ProductCardProps) {
  const hasDiscount =
    originalPrice && price && Number(originalPrice) > Number(price);
  const discountPercent = hasDiscount
    ? Math.round((1 - Number(price) / Number(originalPrice)) * 100)
    : 0;

  const categoryName = typeof category === "string" ? category : category?.name;
  const brandName = typeof brand === "string" ? brand : brand?.name;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn("group", className)}
    >
      <Link href={`/products/${slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {isFeatured && (
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-accent text-white rounded">
                  Nổi bật
                </span>
              )}
              {hasDiscount && (
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-red-500 text-white rounded">
                  -{discountPercent}%
                </span>
              )}
            </div>

            {/* Quick view */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm text-primary rounded-md py-2 text-xs font-medium">
                <Eye className="w-3.5 h-3.5" />
                Xem chi tiết
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            {(categoryName || brandName) && (
              <p className="text-[11px] font-medium text-accent uppercase tracking-wider mb-1">
                {brandName || categoryName}
              </p>
            )}
            <h3 className="text-sm font-medium text-text line-clamp-2 leading-snug mb-2 group-hover:text-accent transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-accent">
                {formatPrice(price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-text-secondary line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
