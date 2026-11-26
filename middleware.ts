import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(request: Request) {
  const cookie = request.headers.get("cookie");
  const token = cookie?.split("admin_session=")[1]?.split(";")[0];

  const isLoginPage = request.url.includes("/admin/login");

  // Si pas de token et pas sur la page de login -> redirection vers login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Si token invalide et pas sur la page de login -> redirection vers login
  if (token && !isLoginPage) {
    const session = await verifySession(token);
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Si token valide et sur la page de login -> redirection vers admin
  if (token && isLoginPage) {
    const session = await verifySession(token);
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};