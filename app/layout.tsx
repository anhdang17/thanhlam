import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Toaster } from "@/components/shared/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "THANH LÂM STORE | Thời Trang Nam Cao Cấp",
    template: "%s | THANH LÂM STORE",
  },
  description:
    "Chuyên cung cấp các sản phẩm thời trang nam cao cấp: giày, dép, balo, vali, phụ kiện. Chất lượng - Uy tín - Tận tâm.",
  keywords: ["thời trang nam", "giày nam", "balo nam", "vali nam", "phụ kiện nam", "thanh lam store"],
  authors: [{ name: "THANH LÂM STORE" }],
  creator: "THANH LÂM STORE",
  icons: {
    icon: [{ url: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/493265605_1121960836612873_6860252367510119265_n.jpg?stp=dst-jpg_tt6&cstp=mx1422x1422&ctp=s1422x1422&_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=t6nol4hYVYIQ7kNvwG8pcq0&_nc_oc=AdquBvtOxoqJW7NHc_R2ZehxhVf_TSZpgk96iBAcU7rQ1fbNYoLuDsAYzr_nqIRmXww&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=OsQkcfvAuoIGfJMI598HAQ&_nc_ss=7b2a8&oh=00_Af9MWmWAzHhbPPTrzx7RmwpVHUVg3MM9aePF5mtD_lurjA&oe=6A2C8822" }],
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "THANH LÂM STORE",
    title: "THANH LÂM STORE | Thời Trang Nam Cao Cấp",
    description:
      "Chuyên cung cấp các sản phẩm thời trang nam cao cấp: giày, dép, balo, vali, phụ kiện.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "THANH LÂM STORE | Thời Trang Nam Cao Cấp",
    description:
      "Chuyên cung cấp các sản phẩm thời trang nam cao cấp: giày, dép, balo, vali, phụ kiện.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
