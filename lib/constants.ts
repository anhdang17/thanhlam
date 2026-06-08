import type { NavItem } from "@/types";

export const MAIN_NAV: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Giày", href: "/products?category=giay" },
  { label: "Dép", href: "/products?category=dep" },
  { label: "Chăm sóc cá nhân", href: "/products?category=cham-soc-ca-nhan" },
  { label: "Phụ kiện", href: "/products?category=phu-kien" },
  { label: "Balo", href: "/products?category=balo" },
  { label: "Vali", href: "/products?category=vali" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Liên hệ", href: "/contact" },
];

export const SITE_NAME = "THANH LÂM STORE";
export const SITE_DESCRIPTION =
  "Chuyên cung cấp các sản phẩm thời trang nam cao cấp: giày, dép, balo, vali, phụ kiện. Chất lượng - Uy tín - Tận tâm.";
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Sản phẩm", href: "/admin/products", icon: "Package" },
  { label: "Danh mục", href: "/admin/categories", icon: "Layers" },
  { label: "Thương hiệu", href: "/admin/brands", icon: "Tag" },
  { label: "Banners", href: "/admin/banners", icon: "Image" },
  { label: "Liên hệ", href: "/admin/contacts", icon: "MessageSquare" },
];
