import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { BannerFormClient } from "../../BannerFormClient";

export const dynamic = "force-dynamic";

export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const banner = await db.banner.findUnique({ where: { id } });
  if (!banner) notFound();
  return <BannerFormClient initialData={banner as any} />;
}
