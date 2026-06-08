import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const AUTH_COOKIE = "thanhlam_admin_auth";

export interface AdminSession {
  username: string;
  loggedInAt: string;
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createSession(): string {
  const session: AdminSession = {
    username: ADMIN_USERNAME,
    loggedInAt: new Date().toISOString(),
  };
  return Buffer.from(JSON.stringify(session)).toString("base64");
}

export function parseSession(token: string): AdminSession | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    return JSON.parse(decoded) as AdminSession;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return parseSession(token);
}

export async function requireAuth(): Promise<NextResponse | null> {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
  }
  return null;
}

export function setAuthCookie(token: string): { name: string; value: string; options: Record<string, unknown> } {
  return {
    name: AUTH_COOKIE,
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    },
  };
}

export function clearAuthCookie(): { name: string; value: string; options: Record<string, unknown> } {
  return {
    name: AUTH_COOKIE,
    value: "",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 0,
      path: "/",
    },
  };
}

export function isProtectedRoute(pathname: string): boolean {
  return pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
}
