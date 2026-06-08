import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { BrandFormClient } from "../../BrandFormClient";

export const dynamic = "force-dynamic";

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brand = await db.brand.findUnique({ where: { id } });
  if (!brand) notFound();
  return <BrandFormClient initialData={brand as any} />;
}
