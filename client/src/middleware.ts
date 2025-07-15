import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("sid")?.value;

  if (pathname === "/auth" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth"],
};
