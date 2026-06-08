import type { Metadata } from "next";
import { getProducts } from "@/lib/actions";
import { AdminProductsClient } from "./AdminProductsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sản phẩm",
};

export default async function AdminProductsPage() {
  const { products } = await getProducts({ limit: 100 });

  return <AdminProductsClient initialProducts={products as any} />;
}
