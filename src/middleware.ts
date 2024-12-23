import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const url = req.nextUrl.clone();

  if (!token) {
    if (!url.pathname.startsWith("/auth/login")) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  if (token && url.pathname.startsWith("/auth/login")) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (token && url.pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (!token && !url.pathname.startsWith("/dashboard") && !url.pathname.startsWith("/auth/login")) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
