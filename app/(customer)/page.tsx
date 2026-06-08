import { HeroSection } from "./_components/HeroSection";
import { FeaturedCategories } from "./_components/FeaturedCategories";
import { FeaturedProducts } from "./_components/FeaturedProducts";
import { LookbookSection } from "./_components/LookbookSection";
import { WhyChooseUs } from "./_components/WhyChooseUs";
import { getFeaturedProducts, getAllCategories, getActiveBanners } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredProducts, categories, banners] = await Promise.all([
    getFeaturedProducts(8),
    getAllCategories(),
    getActiveBanners(),
  ]);

  const featuredCategories = categories.filter((c) => c.isFeatured).slice(0, 8);
  const heroBanner = banners[0];

  return (
    <>
      <HeroSection banner={heroBanner} />
      <FeaturedCategories categories={featuredCategories} />
      <FeaturedProducts products={featuredProducts} />
      <LookbookSection />
      <WhyChooseUs />
    </>
  );
}
