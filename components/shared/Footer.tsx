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
  { label: "Facebook", href: "https://www.facebook.com/thanhlamstore.vn", icon: Facebook },
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
                src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/493265605_1121960836612873_6860252367510119265_n.jpg?stp=dst-jpg_tt6&cstp=mx1422x1422&ctp=s1422x1422&_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=t6nol4hYVYIQ7kNvwG8pcq0&_nc_oc=AdquBvtOxoqJW7NHc_R2ZehxhVf_TSZpgk96iBAcU7rQ1fbNYoLuDsAYzr_nqIRmXww&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=OsQkcfvAuoIGfJMI598HAQ&_nc_ss=7b2a8&oh=00_Af9MWmWAzHhbPPTrzx7RmwpVHUVg3MM9aePF5mtD_lurjA&oe=6A2C8822"
                alt={SITE_NAME}
                className="h-12 w-auto"
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
                <span>Chợ Cảnh Dương, Hòa Trạch, Quảng Trị</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:0948688470" className="hover:text-accent transition-colors">
                  094 868 84 70
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:thanhlamstorevn@gmail.com" className="hover:text-accent transition-colors">
                  thanhlamstorevn@gmail.com
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
