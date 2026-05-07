import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const session = await getSession();

  if (!session && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
