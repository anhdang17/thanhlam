import { NextRequest, NextResponse } from "next/server";
import { parseSession } from "@/lib/auth";
import { getContacts, markContactAsRead, deleteContact } from "@/lib/actions";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const contacts = await getContacts();
  return NextResponse.json(contacts);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const { id } = await params;
  const contact = await markContactAsRead(id);
  return NextResponse.json(contact);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("thanhlam_admin_auth")?.value;
  if (!token || !parseSession(token)) return unauthorized();

  const { id } = await params;
  await deleteContact(id);
  return NextResponse.json({ success: true });
}
