import type { Metadata } from "next";
import { getAllBrands } from "@/lib/actions";
import { AdminBrandsClient } from "./AdminBrandsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thương hiệu",
};

export default async function AdminBrandsPage() {
  const brands = await getAllBrands();
  return <AdminBrandsClient initialBrands={brands as any} />;
}
