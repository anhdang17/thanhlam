"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const collections = [
  {
    id: 1,
    title: "Urban Edge",
    subtitle: "Đường phố đậm chất riêng",
    description: "Bộ sưu tập dành cho những chàng trai yêu thích phong cách đô thị, cá tính và năng động.",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=600&q=80",
    ],
  },
  {
    id: 2,
    title: "Executive Style",
    subtitle: "Lịch lãm trong từng chi tiết",
    description: "Dành cho những quý ông hiện đại, tự tin trong mọi hoàn cảnh từ văn phòng đến sự kiện quan trọng.",
    images: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&q=80",
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
    ],
  },
  {
    id: 3,
    title: "Weekend Relax",
    subtitle: "Thoải mái cuối tuần",
    description: "Phong cách gần gũi, thoải mái cho những ngày nghỉ ngơi, dạo phố cùng bạn bè và gia đình.",
    images: [
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=600&q=80",
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&q=80",
    ],
  },
];

export function LookbookContent() {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-background-secondary/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Lookbook</h1>
          <p className="text-text-secondary">Khám phá phong cách thời trang nam đa dạng</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-20">
        {collections.map((collection) => (
          <section key={collection.id} className="scroll-mt-24">
            <div className="mb-8">
              <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
                {collection.subtitle}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">{collection.title}</h2>
              <p className="text-text-secondary max-w-xl">{collection.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {collection.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative overflow-hidden rounded-xl bg-card ${
                    i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${collection.title} ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
