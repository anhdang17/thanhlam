import { NextRequest, NextResponse } from "next/server";
import { parseSession } from "@/lib/auth";
import { getBanners, createBanner } from "@/lib/actions";
import { bannerSchema } from "@/lib/validations";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const banners = await getBanners();
  return NextResponse.json(banners);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  try {
    const body = await req.json();
    const data = bannerSchema.parse(body);
    const banner = await createBanner(data);
    return NextResponse.json(banner, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.errors ? error.errors[0].message : "Failed to create banner" },
      { status: 400 }
    );
  }
}
