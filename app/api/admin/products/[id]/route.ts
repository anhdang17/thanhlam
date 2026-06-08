import { NextRequest, NextResponse } from "next/server";
import { parseSession } from "@/lib/auth";
import { getProductById, updateProduct, deleteProduct } from "@/lib/actions";
import { productSchema } from "@/lib/validations";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const data = productSchema.partial().parse(body);
    const images = body.images as string[] | undefined;
    const product = await updateProduct(id, { ...data, images });
    return NextResponse.json(product);
  } catch (error: any) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: error.errors ? error.errors[0].message : "Failed to update product" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const { id } = await params;
  await deleteProduct(id);
  return NextResponse.json({ success: true });
}
