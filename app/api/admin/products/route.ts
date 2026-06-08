import { NextRequest, NextResponse } from "next/server";
import { parseSession } from "@/lib/auth";
import { getProducts, createProduct } from "@/lib/actions";
import { productSchema } from "@/lib/validations";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const { searchParams } = req.nextUrl;
  const result = await getProducts({
    search: searchParams.get("search") || undefined,
    categoryId: searchParams.get("categoryId") || undefined,
    brandId: searchParams.get("brandId") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    sort: (searchParams.get("sort") as any) || "newest",
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  });

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  try {
    const body = await req.json();
    const data = productSchema.parse(body);

    const images = body.images as string[] | undefined;
    const product = await createProduct({ ...data, images });
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: error.errors ? error.errors[0].message : "Failed to create product" },
      { status: 400 }
    );
  }
}
