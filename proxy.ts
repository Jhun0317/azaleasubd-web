import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In Next.js 16, this function name must match the filename (proxy)
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Replicating your dashboard landing logic
  if (pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/client/payments', request.url));
  }

  return NextResponse.next();
}

// Keeping your matcher the same
export const config = {
  matcher: ['/dashboard/:path*'],
};