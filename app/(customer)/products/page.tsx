import { Suspense } from "react";
import { ProductsContent } from "./_components/ProductsContent";
import { PageLoader } from "@/components/shared/LoadingSpinner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Khám phá bộ sưu tập thời trang nam cao cấp: giày, dép, balo, vali, phụ kiện.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ProductsContent />
    </Suspense>
  );
}
