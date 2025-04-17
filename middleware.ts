import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/",
  "/setup(.*)",
  "/servers(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // ✅ Await protection (will redirect or throw if unauthenticated)
  }

  return NextResponse.next(); // ✅ Return a valid response either way
});

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\..*).*)",
  ],
};
