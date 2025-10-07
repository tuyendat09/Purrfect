import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PublicUser } from "./shared/types/User";

const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API;

const sessionCache = new Map<
  string,
  { valid: boolean; user?: PublicUser; time: number }
>();
const CACHE_TTL = 10 * 1000;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("sid")?.value;

  if (!token && pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (token) {
    const now = Date.now();
    const cached = sessionCache.get(token);

    if (cached && now - cached.time < CACHE_TTL) {
      if (!cached.valid) {
        const res = NextResponse.redirect(new URL("/auth", request.url));
        res.cookies.delete("sid");
        return res;
      }

      if (pathname === "/auth" && cached.user) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      if (cached.user && cached.user.username == null) {
        return NextResponse.redirect(new URL("/claim-username", request.url));
      }

      return NextResponse.next();
    }

    let verifyRes = await fetch(`${DOMAIN_API}/api/auth/verify-token`, {
      method: "POST",
      headers: {
        Cookie: `sid=${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

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
        const res = NextResponse.redirect(new URL("/auth", request.url));
        res.cookies.delete("sid");
        sessionCache.set(token, { valid: false, time: now });
        return res;
      }

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

    if (!data?.user) {
      const res = NextResponse.redirect(new URL("/auth", request.url));
      res.cookies.delete("sid");
      sessionCache.set(token, { valid: false, time: now });
      return res;
    }

    sessionCache.set(token, { valid: true, user: data.user, time: now });

    if (pathname === "/auth" && data.user) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (data.user && data.user.username == null) {
      return NextResponse.redirect(new URL("/claim-username", request.url));
    }
  }

  return NextResponse.next();
}

// ✅ Matcher áp dụng cho tất cả route cần bảo vệ
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
