import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { ironOptions } from "./lib/config";

export async function middleware(req) {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, ironOptions);

  const publicPages = ["/", "/signup", "/api/signup", "/api/login", "/api/verify-recaptcha"];
  if (publicPages.includes(req.nextUrl.pathname)) {
    return res;
  }

  if (!session?.user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/dash", "/workouts", "/messages", "/profile", "/api/:path*"],
};
