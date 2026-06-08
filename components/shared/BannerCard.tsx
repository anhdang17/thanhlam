"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerCardProps {
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  linkText?: string;
  className?: string;
}

export function BannerCard({
  title,
  subtitle,
  image,
  link,
  linkText = "Xem ngay",
  className,
}: BannerCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className={cn("group relative overflow-hidden rounded-xl", className)}
    >
      <div className="relative aspect-[16/7] md:aspect-[21/7] bg-card">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-12 max-w-xl">
            {subtitle && (
              <p className="text-xs md:text-sm font-medium text-accent uppercase tracking-widest mb-2">
                {subtitle}
              </p>
            )}
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
              {title}
            </h2>
            {link && (
              <Link
                href={link}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-md transition-colors"
              >
                {linkText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
