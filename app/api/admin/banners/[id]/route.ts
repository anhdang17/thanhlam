import { NextRequest, NextResponse } from "next/server";
import { parseSession } from "@/lib/auth";
import { updateBanner, deleteBanner } from "@/lib/actions";
import { bannerSchema } from "@/lib/validations";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const data = bannerSchema.partial().parse(body);
    const banner = await updateBanner(id, data);
    return NextResponse.json(banner);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.errors ? error.errors[0].message : "Failed to update banner" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const { id } = await params;
  await deleteBanner(id);
  return NextResponse.json({ success: true });
}
