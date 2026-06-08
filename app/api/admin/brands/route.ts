import { NextRequest, NextResponse } from "next/server";
import { parseSession } from "@/lib/auth";
import { getBrands, createBrand } from "@/lib/actions";
import { brandSchema } from "@/lib/validations";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const brands = await getBrands();
  return NextResponse.json(brands);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  try {
    const body = await req.json();
    const data = brandSchema.parse(body);
    const brand = await createBrand(data);
    return NextResponse.json(brand, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.errors ? error.errors[0].message : "Failed to create brand" },
      { status: 400 }
    );
  }
}
