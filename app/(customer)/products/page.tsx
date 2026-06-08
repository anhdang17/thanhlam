import type { Metadata } from "next";
import { ProductsContent } from "./_components/ProductsContent";
import { PageLoader } from "@/components/shared/LoadingSpinner";
import { Suspense } from "react";
import { getProducts, getCategories, getBrands } from "@/lib/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Khám phá bộ sưu tập thời trang nam cao cấp: giày, dép, balo, vali, phụ kiện.",
};

export default async function ProductsPage() {
  const [{ products, total }, categories, brands] = await Promise.all([
    getProducts({ limit: 100 }),
    getCategories(),
    getBrands(),
  ]);

  return (
    <Suspense fallback={<PageLoader />}>
      <ProductsContent
        initialProducts={products as any}
        initialTotal={total}
        categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })) as any}
        brands={brands.map((b) => ({ id: b.id, name: b.name })) as any}
      />
    </Suspense>
  );
}
