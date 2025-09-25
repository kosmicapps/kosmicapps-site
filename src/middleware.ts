import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { addSecurityHeaders } from '@/lib/security-middleware';

export function middleware(request: NextRequest) {
  // Only apply to admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login') &&
      !request.nextUrl.pathname.startsWith('/api/admin')) {
    
    const sessionToken = request.cookies.get('admin-session')?.value;
    
    if (!sessionToken) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Validate session token
    try {
      const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
      
      // Check if session is valid (not expired)
      const loginTime = new Date(sessionData.loginTime);
      const now = new Date();
      const sessionAge = now.getTime() - loginTime.getTime();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (sessionAge > maxAge) {
        // Session expired, redirect to login
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('admin-session');
        return response;
      }

      // Session is valid, allow access with security headers
      const response = NextResponse.next();
      return addSecurityHeaders(response);

    } catch (error) {
      // Invalid session token, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin-session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
