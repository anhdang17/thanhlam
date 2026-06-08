import { NextRequest, NextResponse } from "next/server";
import { parseSession } from "@/lib/auth";
import { getAllCategories, updateCategory, deleteCategory } from "@/lib/actions";
import { categorySchema } from "@/lib/validations";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const categories = await getAllCategories();
  return NextResponse.json(categories);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const data = categorySchema.partial().parse(body);
    const category = await updateCategory(id, data);
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.errors ? error.errors[0].message : "Failed to update category" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const { id } = await params;
  await deleteCategory(id);
  return NextResponse.json({ success: true });
}
