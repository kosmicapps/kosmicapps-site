import { NextRequest, NextResponse } from 'next/server';
import { 
  generateBrowserFingerprint, 
  getClientIP, 
  checkRateLimit,
  recordFailedAttempt,
  clearRateLimit,
  isKeyExpired
} from '@/lib/admin-security';
import { accessKeyStore } from '@/lib/access-key-store';
import { securityMiddleware, validateFormSecurity, addSecurityHeaders } from '@/lib/security-middleware';

export async function POST(request: NextRequest) {
  try {
    // Apply security middleware
    const securityCheck = securityMiddleware(request);
    if (securityCheck) return securityCheck;

    const body = await request.json();
    const { username, email, accessKey } = body;

    // Validate required fields
    if (!username || !email || !accessKey) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Enhanced security validation
    const securityValidation = validateFormSecurity(request, { username, email, accessKey });
    if (!securityValidation.isValid) {
      return securityValidation.response!;
    }

    // Use sanitized data
    const sanitizedUsername = securityValidation.sanitizedData!.username;
    const sanitizedEmail = securityValidation.sanitizedData!.email;
    const sanitizedAccessKey = securityValidation.sanitizedData!.accessKey;

    // Check rate limiting
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    const fingerprint = generateBrowserFingerprint(userAgent, clientIP);
    
    const rateLimit = checkRateLimit(fingerprint);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many failed attempts. Access temporarily blocked.',
          rateLimitInfo: {
            attempts: rateLimit.attempts,
            isBlocked: true,
            timeRemaining: rateLimit.timeRemaining
          }
        },
        { status: 429 }
      );
    }

    // Check if access key exists
    const storedKeyData = accessKeyStore.get(sanitizedEmail);
    console.log('Login attempt:', {
      email: sanitizedEmail,
      username: sanitizedUsername,
      accessKey: sanitizedAccessKey,
      storedKeyData: storedKeyData ? 'exists' : 'not found',
      storedUsername: storedKeyData?.username,
      storedEmail: storedKeyData?.email,
      storedKey: storedKeyData?.key
    });
    
    if (!storedKeyData) {
      console.log('No stored key data found for email:', sanitizedEmail);
      recordFailedAttempt(fingerprint);
      return NextResponse.json(
        { 
          error: 'Invalid access key. Please request a new one.',
          rateLimitInfo: {
            attempts: rateLimit.attempts + 1,
            isBlocked: rateLimit.attempts + 1 >= 4,
            timeRemaining: 0
          }
        },
        { status: 401 }
      );
    }

    // Check if key is expired
    if (isKeyExpired(storedKeyData.createdAt)) {
      accessKeyStore.delete(sanitizedEmail);
      recordFailedAttempt(fingerprint);
      return NextResponse.json(
        { 
          error: 'Access key has expired. Please request a new one.',
          rateLimitInfo: {
            attempts: rateLimit.attempts + 1,
            isBlocked: rateLimit.attempts + 1 >= 4,
            timeRemaining: 0
          }
        },
        { status: 401 }
      );
    }

    // Validate credentials
    const usernameMatch = storedKeyData.username === sanitizedUsername;
    const emailMatch = storedKeyData.email === sanitizedEmail;
    const keyMatch = storedKeyData.key === sanitizedAccessKey;
    
    console.log('Credential validation:', {
      usernameMatch,
      emailMatch,
      keyMatch,
      storedUsername: storedKeyData.username,
      inputUsername: sanitizedUsername,
      storedEmail: storedKeyData.email,
      inputEmail: sanitizedEmail,
      storedKey: storedKeyData.key,
      inputKey: sanitizedAccessKey
    });
    
    if (!usernameMatch || !emailMatch || !keyMatch) {
      console.log('Credentials do not match');
      recordFailedAttempt(fingerprint);
      return NextResponse.json(
        { 
          error: 'Invalid credentials. Please check your username, email, and access key.',
          rateLimitInfo: {
            attempts: rateLimit.attempts + 1,
            isBlocked: rateLimit.attempts + 1 >= 4,
            timeRemaining: 0
          }
        },
        { status: 401 }
      );
    }

    // Additional username validation
    const authorizedUsername = process.env.ACCESS_USERNAME;
    if (!authorizedUsername) {
      console.error('ACCESS_USERNAME environment variable not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (sanitizedUsername.toLowerCase() !== authorizedUsername.toLowerCase()) {
      recordFailedAttempt(fingerprint);
      return NextResponse.json(
        { 
          error: 'Unauthorized username',
          rateLimitInfo: {
            attempts: rateLimit.attempts + 1,
            isBlocked: rateLimit.attempts + 1 >= 4,
            timeRemaining: 0
          }
        },
        { status: 403 }
      );
    }

    // Successful login - clear rate limit and access key
    clearRateLimit(fingerprint);
    accessKeyStore.delete(sanitizedEmail);

    // Create session token (in production, use JWT or secure session management)
    const sessionToken = Buffer.from(JSON.stringify({
      username: sanitizedUsername,
      email: sanitizedEmail,
      loginTime: new Date().toISOString(),
      fingerprint: fingerprint
    })).toString('base64');

    // Set session cookie
    const response = NextResponse.json({ 
      success: true, 
      message: 'Login successful' 
    });

    response.cookies.set('admin-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    });

    return addSecurityHeaders(response);

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
