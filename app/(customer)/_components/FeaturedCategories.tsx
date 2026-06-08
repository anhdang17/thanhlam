"use client";

import { motion } from "framer-motion";
import { CategoryCard } from "@/components/shared/CategoryCard";

const categories = [
  {
    name: "Giày",
    slug: "giay",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  },
  {
    name: "Dép",
    slug: "dep",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80",
  },
  {
    name: "Balo",
    slug: "balo",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
  },
  {
    name: "Vali",
    slug: "vali",
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&q=80",
  },
  {
    name: "Phụ kiện",
    slug: "phu-kien",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
  },
  {
    name: "Chăm sóc cá nhân",
    slug: "cham-soc-ca-nhan",
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&q=80",
  },
  {
    name: "Trang sức",
    slug: "trang-suc",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80",
  },
  {
    name: "Thắt lưng",
    slug: "that-lung",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturedCategories() {
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
            Danh mục
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text">
            Khám phá theo phong cách
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {categories.map((cat) => (
            <motion.div key={cat.slug} variants={itemVariants}>
              <CategoryCard
                name={cat.name}
                slug={cat.slug}
                image={cat.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
