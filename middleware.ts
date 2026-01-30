import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the user hits the dashboard root, send them to payments
  if (pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/client/payments', request.url));
  }

  return NextResponse.next();
}

// This ensures the middleware only runs on the dashboard path
export const config = {
  matcher: ['/dashboard/:path*'],
};