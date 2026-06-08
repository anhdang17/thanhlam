import { NextRequest, NextResponse } from "next/server";
import { parseSession } from "@/lib/auth";
import { getCategories, createCategory } from "@/lib/actions";
import { categorySchema } from "@/lib/validations";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const categories = await getCategories();
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  try {
    const body = await req.json();
    const data = categorySchema.parse(body);
    const category = await createCategory(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.errors ? error.errors[0].message : "Failed to create category" },
      { status: 400 }
    );
  }
}
