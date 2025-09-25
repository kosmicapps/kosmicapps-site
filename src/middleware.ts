import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { addSecurityHeaders } from '@/lib/security-middleware';

export function middleware(request: NextRequest) {
  // Only apply to admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login') &&
      !request.nextUrl.pathname.startsWith('/api/admin')) {
    
    const sessionToken = request.cookies.get('admin-session')?.value;
    
    console.log('Middleware check:', {
      path: request.nextUrl.pathname,
      hasSession: !!sessionToken,
      sessionValue: sessionToken ? 'exists' : 'none'
    });
    
    if (!sessionToken) {
      console.log('No session token, redirecting to login');
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Validate session token
    try {
      const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
      
      console.log('Session validation:', {
        username: sessionData.username,
        email: sessionData.email,
        loginTime: sessionData.loginTime
      });
      
      // Check if session is valid (not expired)
      const loginTime = new Date(sessionData.loginTime);
      const now = new Date();
      const sessionAge = now.getTime() - loginTime.getTime();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      
      console.log('Session age check:', {
        sessionAge: sessionAge,
        maxAge: maxAge,
        isExpired: sessionAge > maxAge
      });
      
      if (sessionAge > maxAge) {
        console.log('Session expired, redirecting to login');
        // Session expired, redirect to login
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('admin-session');
        return response;
      }

      console.log('Session valid, allowing access');
      // Session is valid, allow access with security headers
      const response = NextResponse.next();
      return addSecurityHeaders(response);

    } catch (error) {
      console.log('Invalid session token, redirecting to login:', error);
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
