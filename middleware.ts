import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const pathname = request.nextUrl.pathname;

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  const isProtectedRoute =
    !isAuthRoute; // everything except auth pages

  // 1. If NOT logged in → block protected routes
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. If logged in → block auth pages ONLY
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
