import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseSession, isProtectedRoute } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if it's a protected route
  if (isProtectedRoute(pathname)) {
    const token = req.cookies.get("thanhlam_admin_auth")?.value;
    const session = token ? parseSession(token) : null;

    if (!session) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
