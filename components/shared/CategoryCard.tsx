"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
  productCount?: number;
  className?: string;
}

export function CategoryCard({
  name,
  slug,
  image,
  productCount,
  className,
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn("group", className)}
    >
      <Link href={`/products?category=${slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-square bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300">
          <Image
            src={image || "/placeholder.jpg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-base font-semibold text-white mb-0.5 group-hover:text-accent transition-colors">
              {name}
            </h3>
            {productCount !== undefined && (
              <p className="text-xs text-white/70">{productCount} sản phẩm</p>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-lg transition-colors duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}
