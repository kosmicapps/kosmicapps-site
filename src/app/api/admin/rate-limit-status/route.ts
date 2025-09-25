import { NextRequest, NextResponse } from 'next/server';
import { 
  generateBrowserFingerprint, 
  getClientIP, 
  checkRateLimit 
} from '@/lib/admin-security';

export async function GET(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    const fingerprint = generateBrowserFingerprint(userAgent, clientIP);
    
    const rateLimit = checkRateLimit(fingerprint);
    
    return NextResponse.json({
      attempts: rateLimit.attempts,
      isBlocked: !rateLimit.allowed,
      timeRemaining: rateLimit.timeRemaining
    });

  } catch (error) {
    console.error('Rate limit status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
