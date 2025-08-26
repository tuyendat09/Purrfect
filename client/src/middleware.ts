import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("sid")?.value;

  // Nếu không có token → redirect về /auth (trừ trang /auth)
  if (!token && pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (token) {
    const verifyRes = await fetch(`${DOMAIN_API}/api/auth/`, {
      method: "GET",
      headers: {
        Cookie: `sid=${token}`, // gửi cookie thủ công
        Accept: "application/json",
      },
      cache: "no-store", // không cache
    });

    if (!verifyRes.ok) {
      // Token invalid → clear cookie và redirect về /auth
      const res = NextResponse.redirect(new URL("/auth", request.url));
      res.cookies.delete("sid");
      return res;
    }

    const data = await verifyRes.json();

    // Nếu đang ở /auth mà user đã login → redirect về /
    if (pathname === "/auth" && data.success && data.user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth"],
};
