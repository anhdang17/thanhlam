import type { Metadata } from "next";
import { getBanners } from "@/lib/actions";
import { AdminBannersClient } from "./AdminBannersClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Banners",
};

export default async function AdminBannersPage() {
  const banners = await getBanners();
  return <AdminBannersClient initialBanners={banners as any} />;
}
