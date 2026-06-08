"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Headphones, RefreshCw } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Chất lượng đảm bảo",
    description: "100% sản phẩm chính hãng từ các thương hiệu uy tín. Cam kết hoàn tiền nếu phát hiện hàng giả.",
  },
  {
    icon: Truck,
    title: "Giao hàng nhanh chóng",
    description: "Giao hàng trong 24-48h nội thành. Miễn phí vận chuyển cho đơn hàng từ 500K.",
  },
  {
    icon: Headphones,
    title: "Tư vấn tận tâm",
    description: "Đội ngũ tư vấn chuyên nghiệp, hỗ trợ 24/7 qua điện thoại và chat trực tuyến.",
  },
  {
    icon: RefreshCw,
    title: "Đổi trả dễ dàng",
    description: "Chính sách đổi trả trong 7 ngày nếu sản phẩm không vừa ý. Thủ tục đơn giản, nhanh chóng.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-background-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
            Tại sao chọn chúng tôi
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text">
            Cam kết của THANH LÂM STORE
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 bg-card rounded-xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-accent"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <reason.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-base font-semibold text-text mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
