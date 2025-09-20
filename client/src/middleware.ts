import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("sid")?.value;

  // Nếu không có token → redirect về /auth (trừ khi đang ở /auth)
  if (!token && pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (token) {
    let verifyRes = await fetch(`${DOMAIN_API}/api/auth/`, {
      method: "GET",
      headers: {
        Cookie: `sid=${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    // Nếu bị 401 → gọi refresh token
    if (verifyRes.status === 401) {
      const refreshRes = await fetch(`${DOMAIN_API}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
          Cookie: `sid=${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!refreshRes.ok) {
        // Refresh fail → clear cookie & redirect /auth
        const res = NextResponse.redirect(new URL("/auth", request.url));
        res.cookies.delete("sid");
        return res;
      }

      // Refresh success → gọi lại verify
      verifyRes = await fetch(`${DOMAIN_API}/api/auth/`, {
        method: "GET",
        headers: {
          Cookie: `sid=${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      });
    }

    const data = await verifyRes.json();

    if (!data.user) {
      // Token invalid sau khi refresh → clear cookie & redirect
      const res = NextResponse.redirect(new URL("/auth", request.url));
      res.cookies.delete("sid");
      return res;
    }

    // Nếu đang ở /auth mà user đã login → redirect về /
    if (pathname === "/auth" && data.success && data.user) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Nếu user chưa có username → redirect claim username
    if (data.user && data.user.username == null) {
      return NextResponse.redirect(new URL("/claim-username", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth"],
};
