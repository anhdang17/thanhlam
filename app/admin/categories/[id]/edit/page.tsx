import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { CategoryFormClient } from "../../CategoryFormClient";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await db.category.findUnique({ where: { id } });
  if (!category) notFound();
  return <CategoryFormClient initialData={category as any} />;
}
