import { NextRequest, NextResponse } from "next/server";
import { parseSession } from "@/lib/auth";
import { getAllBrands, updateBrand, deleteBrand } from "@/lib/actions";
import { brandSchema } from "@/lib/validations";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const brands = await getAllBrands();
  return NextResponse.json(brands);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const data = brandSchema.partial().parse(body);
    const brand = await updateBrand(id, data);
    return NextResponse.json(brand);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.errors ? error.errors[0].message : "Failed to update brand" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const { id } = await params;
  await deleteBrand(id);
  return NextResponse.json({ success: true });
}
