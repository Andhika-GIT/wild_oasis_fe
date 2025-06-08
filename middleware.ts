import { NextResponse, NextRequest } from "next/server";
import { verifyAuth } from "@/lib/helper";

export async function middleware(request: NextRequest) {
  const jwt_token = request.cookies.get("access_token")?.value;
  const protectedPaths = ["/account"];
  const authPaths = ["/login", "/sign-up"]

  const verifiedToken = jwt_token && (await verifyAuth(jwt_token));

  if (!verifiedToken) {
    if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (verifiedToken) {
    if (authPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/profile", "/login", "/sign-up", "/account" , "/account/:path*"],
};