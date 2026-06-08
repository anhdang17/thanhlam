"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Tag,
  Image,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/ui/button";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Sản phẩm", href: "/admin/products", icon: Package },
  { label: "Danh mục", href: "/admin/categories", icon: Layers },
  { label: "Thương hiệu", href: "/admin/brands", icon: Tag },
  { label: "Banners", href: "/admin/banners", icon: Image },
  { label: "Liên hệ", href: "/admin/contacts", icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    const parts = pathname.replace("/admin/", "").split("/");
    const main = parts[0].replace(/-/g, " ");
    return main.charAt(0).toUpperCase() + main.slice(1);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/493265605_1121960836612873_6860252367510119265_n.jpg?stp=dst-jpg_tt6&cstp=mx1422x1422&ctp=s1422x1422&_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=t6nol4hYVYIQ7kNvwG8pcq0&_nc_oc=AdquBvtOxoqJW7NHc_R2ZehxhVf_TSZpgk96iBAcU7rQ1fbNYoLuDsAYzr_nqIRmXww&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=OsQkcfvAuoIGfJMI598HAQ&_nc_ss=7b2a8&oh=00_Af9MWmWAzHhbPPTrzx7RmwpVHUVg3MM9aePF5mtD_lurjA&oe=6A2C8822"
              alt="Thanh Lam Store"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          <p className="px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-2">
            Quản lý
          </p>
          {ADMIN_NAV.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-background-secondary hover:text-text"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-border space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-background-secondary hover:text-text transition-all"
          >
            <LogOut className="w-5 h-5" />
            Quay lại website
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-3 py-2.5 text-text-secondary hover:text-red-400 hover:bg-red-500/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-text capitalize">
            {getPageTitle()}
          </h1>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-text-secondary hover:text-red-400"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Đăng xuất
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
