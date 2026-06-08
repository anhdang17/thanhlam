import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Separator } from "@/components/shared/ui/separator";
import { SITE_NAME } from "@/lib/constants";

const footerLinks = {
  products: [
    { label: "Giày", href: "/products?category=giay" },
    { label: "Dép", href: "/products?category=dep" },
    { label: "Balo & Vali", href: "/products?category=balo" },
    { label: "Phụ kiện", href: "/products?category=phu-kien" },
    { label: "Chăm sóc cá nhân", href: "/products?category=cham-soc-ca-nhan" },
  ],
  about: [
    { label: "Giới thiệu", href: "/about" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "Liên hệ", href: "/contact" },
  ],
  support: [
    { label: "Chính sách đổi trả", href: "/chinh-sach-doi-tra" },
    { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
    { label: "Hướng dẫn mua hàng", href: "/huong-dan" },
  ],
};

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Youtube", href: "#", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-primary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img
                src="https://res.cloudinary.com/dv6kefwup/image/upload/v1749480604/Thanhlam/logo-thanh-lam.png"
                alt={SITE_NAME}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Chuyên cung cấp các sản phẩm thời trang nam cao cấp. Cam kết chất lượng - Uy tín - Tận tâm phục vụ.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Sản phẩm
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Về chúng tôi
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Liên hệ
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>123 Đường ABC, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:0909123456" className="hover:text-accent transition-colors">
                  0909 123 456
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:contact@thanhlamshop.vn" className="hover:text-accent transition-colors">
                  contact@thanhlamshop.vn
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>8:00 - 21:00 (T2 - CN)</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-text-secondary/60">Developed by</span>
            <span className="text-xs text-accent font-medium">THANH LÂM STORE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
