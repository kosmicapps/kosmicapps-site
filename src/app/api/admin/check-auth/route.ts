import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin-session')?.value;
    
    if (!sessionToken) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    // Decode and validate session token
    try {
      const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
      
      // Check if session is valid (not expired)
      const loginTime = new Date(sessionData.loginTime);
      const now = new Date();
      const sessionAge = now.getTime() - loginTime.getTime();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (sessionAge > maxAge) {
        return NextResponse.json(
          { authenticated: false },
          { status: 401 }
        );
      }

      return NextResponse.json({ 
        authenticated: true,
        user: {
          username: sessionData.username,
          email: sessionData.email
        }
      });

    } catch (error) {
      console.error('Session validation error:', error);
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
