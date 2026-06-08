"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/shared/ui/button";

interface HeroSectionProps {
  banner?: {
    title: string;
    subtitle?: string | null;
    image: string;
    link?: string | null;
    linkText?: string | null;
  };
}

export function HeroSection({ banner }: HeroSectionProps) {
  const src = banner?.image || "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1920&q=80";
  const title = banner?.title || "Phong cách nam tính hiện đại";
  const subtitle = banner?.subtitle || "Bộ sưu tập thời trang nam cao cấp 2026";
  const link = banner?.link || "/products";
  const linkText = banner?.linkText || "Khám phá ngay";

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={src}
          alt="Fashion background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 border border-accent/30 rounded-full text-accent text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Bộ sưu tập mới 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {title}
            <br />
            <span className="text-accent">{subtitle}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href={link}>
              <Button size="xl" className="gap-2">
                {linkText}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/lookbook">
              <Button size="xl" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white">
                Xem Lookbook
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-8 md:gap-12 mt-12 pt-8 border-t border-white/10"
          >
            {[
              { value: "500+", label: "Sản phẩm" },
              { value: "50+", label: "Thương hiệu" },
              { value: "8K+", label: "Khách hàng" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
