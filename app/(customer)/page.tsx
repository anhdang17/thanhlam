import type { Metadata } from "next";
import { HeroSection } from "./_components/HeroSection";
import { FeaturedCategories } from "./_components/FeaturedCategories";
import { FeaturedProducts } from "./_components/FeaturedProducts";
import { LookbookSection } from "./_components/LookbookSection";
import { WhyChooseUs } from "./_components/WhyChooseUs";

export const metadata: Metadata = {
  title: "THANH LÂM STORE | Thời Trang Nam Cao Cấp",
  description:
    "Chuyên cung cấp các sản phẩm thời trang nam cao cấp: giày, dép, balo, vali, phụ kiện. Chất lượng - Uy tín - Tận tâm phục vụ.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <LookbookSection />
      <WhyChooseUs />
    </>
  );
}
