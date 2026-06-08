import { notFound } from "next/navigation";
import { getProductById, getCategories, getBrands } from "@/lib/actions";
import { ProductFormClient } from "../../ProductFormClient";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories, brands] = await Promise.all([
    getProductById(id),
    getCategories(),
    getBrands(),
  ]);

  if (!product) notFound();

  return (
    <ProductFormClient
      categories={categories}
      brands={brands}
      initialData={product as any}
    />
  );
}
