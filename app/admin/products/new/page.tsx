import { getCategories, getBrands } from "@/lib/actions";
import { ProductFormClient } from "../ProductFormClient";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([
    getCategories(),
    getBrands(),
  ]);

  return <ProductFormClient categories={categories} brands={brands} />;
}
