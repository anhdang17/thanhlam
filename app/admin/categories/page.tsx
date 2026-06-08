import type { Metadata } from "next";
import { getAllCategories } from "@/lib/actions";
import { AdminCategoriesClient } from "./AdminCategoriesClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Danh mục",
};

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();
  return <AdminCategoriesClient initialCategories={categories as any} />;
}
