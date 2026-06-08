import type { Metadata } from "next";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Users, Award, Heart } from "lucide-react";
import { Separator } from "@/components/shared/ui/separator";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Tìm hiểu về THANH LÂM STORE - địa chỉ uy tín về thời trang nam cao cấp tại Việt Nam.",
};

const stats = [
  { value: "8+", label: "Năm kinh nghiệm" },
  { value: "500+", label: "Sản phẩm" },
  { value: "50+", label: "Thương hiệu" },
  { value: "8,000+", label: "Khách hàng" },
];

const values = [
  { icon: CheckCircle, title: "Chất lượng", desc: "Mọi sản phẩm đều qua kiểm tra chất lượng nghiêm ngặt trước khi đến tay khách hàng." },
  { icon: Users, title: "Khách hàng là trung tâm", desc: "Luôn lắng nghe và thấu hiểu nhu cầu của khách hàng để mang đến trải nghiệm tốt nhất." },
  { icon: Award, title: "Cam kết", desc: "100% sản phẩm chính hãng. Hoàn tiền nếu phát hiện hàng giả, hàng kém chất lượng." },
  { icon: Heart, title: "Đam mê", desc: "Chúng tôi không chỉ bán hàng mà còn truyền cảm hứng về phong cách sống nam tính hiện đại." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1920&q=80"
          alt="About"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Về chúng tôi</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Story */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-6">Câu chuyện THANH LÂM STORE</h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Khởi nguồn từ niềm đam mê thời trang và mong muốn mang đến cho nam giới Việt Nam những sản phẩm thời trang nam cao cấp với giá thành hợp lý, THANH LÂM STORE được thành lập với triết lý: <strong className="text-text">"Phong cách không chỉ là quần áo, mà là cách bạn sống."</strong>
            </p>
            <p>
              Trải qua hơn 8 năm phát triển, chúng tôi đã trở thành điểm đến tin cậy của hàng nghìn khách hàng, từ sinh viên đến doanh nhân, từ những chàng trai mới bước vào đời đến những quý ông lịch lãm.
            </p>
            <p>
              Tại THANH LÂM STORE, mỗi sản phẩm đều được tuyển chọn kỹ lưỡng, đảm bảo về chất lượng, kiểu dáng và sự phù hợp với xu hướng thời trang hiện đại.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-card rounded-xl border border-border">
                <p className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-16" />

        {/* Values */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-6">Giá trị cốt lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-6 bg-card rounded-xl border border-border hover:border-accent/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{value.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
