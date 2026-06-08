"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/shared/ui/button";

const lookbooks = [
  {
    id: 1,
    title: "Urban Style",
    subtitle: "Phong cách đô thị",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    link: "/lookbook",
  },
  {
    id: 2,
    title: "Business Look",
    subtitle: "Phong cách lịch lãm",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    link: "/lookbook",
  },
  {
    id: 3,
    title: "Weekend Vibes",
    subtitle: "Cuối tuần thoải mái",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    link: "/lookbook",
  },
];

export function LookbookSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
            Lookbook
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Bộ sưu tập thời trang
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Cập nhật xu hướng thời trang nam mới nhất. Khám phá phong cách của riêng bạn.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lookbooks.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link href={item.link} className="group block">
                <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-card">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs font-medium text-accent uppercase tracking-widest mb-2">
                      {item.subtitle}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-sm text-white/80 group-hover:text-accent transition-colors">
                      Khám phá
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/lookbook">
            <Button variant="outline" size="lg" className="gap-2">
              Xem Lookbook
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
