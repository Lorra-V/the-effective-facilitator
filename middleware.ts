import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    // Public self-serve entry mints a launch token, then /launch creates the session.
    // /get-started is outside this matcher, so this cannot loop.
    return NextResponse.redirect(new URL("/get-started", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/paths", "/paths/:path*"],
};
