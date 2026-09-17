import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/middleware-helper";

export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch (error) {
    console.error("Middleware error:", error);
    // Don't block the request if Supabase is unreachable
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    /*
     * Only run middleware on admin routes.
     * Public pages don't need session refresh.
     */
    "/admin/:path*",
    "/admin-login",
  ],
};