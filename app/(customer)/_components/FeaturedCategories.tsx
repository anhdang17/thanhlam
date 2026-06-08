"use client";

import { motion } from "framer-motion";
import { CategoryCard } from "@/components/shared/CategoryCard";

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
}

interface FeaturedCategoriesProps {
  categories: Category[];
}

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

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
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
            <motion.div key={cat.id} variants={itemVariants}>
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
