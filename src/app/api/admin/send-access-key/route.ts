import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { 
  generateAccessKey, 
  generateBrowserFingerprint, 
  getClientIP, 
  isValidEmail, 
  checkRateLimit 
} from '@/lib/admin-security';
import { securityMiddleware, validateFormSecurity, addSecurityHeaders } from '@/lib/security-middleware';
import { accessKeyStore } from '@/lib/access-key-store';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Apply security middleware
    const securityCheck = securityMiddleware(request);
    if (securityCheck) return securityCheck;

    const body = await request.json();
    const { username, email } = body;

    // Validate required fields
    if (!username || !email) {
      return NextResponse.json(
        { error: 'Username and email are required' },
        { status: 400 }
      );
    }

    // Enhanced security validation
    const securityValidation = validateFormSecurity(request, { username, email });
    if (!securityValidation.isValid) {
      return securityValidation.response!;
    }

    // Use sanitized data
    const sanitizedUsername = securityValidation.sanitizedData!.username;
    const sanitizedEmail = securityValidation.sanitizedData!.email;

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email matches the authorized email
    const authorizedEmail = process.env.ACCESS_EMAIL;
    if (!authorizedEmail) {
      console.error('ACCESS_EMAIL environment variable not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (sanitizedEmail.toLowerCase() !== authorizedEmail.toLowerCase()) {
      return NextResponse.json(
        { error: 'Unauthorized email address' },
        { status: 403 }
      );
    }

    // Check if username matches the authorized username
    const authorizedUsername = process.env.ACCESS_USERNAME;
    console.log('Username validation in send-access-key:', {
      sanitizedUsername,
      authorizedUsername,
      sanitizedLower: sanitizedUsername.toLowerCase(),
      authorizedLower: authorizedUsername?.toLowerCase(),
      match: sanitizedUsername.toLowerCase() === authorizedUsername?.toLowerCase()
    });
    
    if (!authorizedUsername) {
      console.error('ACCESS_USERNAME environment variable not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (sanitizedUsername.toLowerCase() !== authorizedUsername.toLowerCase()) {
      console.log('Username validation failed in send-access-key');
      return NextResponse.json(
        { error: 'Unauthorized username' },
        { status: 403 }
      );
    }

    // Check rate limiting
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    const fingerprint = generateBrowserFingerprint(userAgent, clientIP);
    
    const rateLimit = checkRateLimit(fingerprint);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many attempts. Please try again later.',
          rateLimitInfo: {
            attempts: rateLimit.attempts,
            isBlocked: true,
            timeRemaining: rateLimit.timeRemaining
          }
        },
        { status: 429 }
      );
    }

    // Generate access key
    const accessKey = generateAccessKey();
    const now = new Date().toISOString();

    // Store the access key
    const keyData = {
      key: accessKey,
      email: sanitizedEmail,
      username: sanitizedUsername,
      createdAt: now
    };
    
    console.log('Storing access key data:', keyData);
    accessKeyStore.set(sanitizedEmail, keyData);
    
    // Verify storage
    const stored = accessKeyStore.get(sanitizedEmail);
    console.log('Verification - stored data:', stored);

    // Send access key email
    const emailResult = await resend.emails.send({
      from: 'Kosmic Apps Admin <hello@kosmicapps.com>',
      to: [sanitizedEmail],
      subject: 'Admin Access Key - Kosmic Apps Dashboard',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Admin Access Key</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #0B0C10 0%, #1a1a2e 50%, #16213e 100%); }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 40px 0; }
            .logo { width: 60px; height: 60px; background: linear-gradient(135deg, #5A4DFF, #FF4D9D); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold; }
            .title { color: white; font-size: 32px; font-weight: bold; margin: 0 0 10px; }
            .subtitle { color: #a0a0a0; font-size: 18px; margin: 0; }
            .content { background: rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 40px; margin: 20px 0; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }
            .access-key { background: linear-gradient(135deg, #5A4DFF, #FF4D9D); padding: 20px; border-radius: 15px; margin: 20px 0; text-align: center; }
            .key-code { color: white; font-size: 24px; font-weight: bold; margin: 0 0 10px; font-family: 'Courier New', monospace; letter-spacing: 2px; }
            .key-label { color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0; }
            .instructions { margin: 30px 0; }
            .step { display: flex; align-items: center; margin: 15px 0; color: white; }
            .step-icon { width: 40px; height: 40px; background: linear-gradient(135deg, #5A4DFF, #FF4D9D); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; color: white; font-weight: bold; }
            .warning { background: rgba(255, 193, 7, 0.2); border: 1px solid rgba(255, 193, 7, 0.5); border-radius: 10px; padding: 15px; margin: 20px 0; }
            .warning-text { color: #ffc107; font-size: 14px; margin: 0; }
            .footer { text-align: center; color: #a0a0a0; font-size: 14px; margin-top: 40px; }
            .security-notice { background: rgba(255, 0, 0, 0.1); border: 1px solid rgba(255, 0, 0, 0.3); border-radius: 10px; padding: 15px; margin: 20px 0; }
            .security-text { color: #ff6b6b; font-size: 14px; margin: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">K</div>
              <h1 class="title">Admin Access Key</h1>
              <p class="subtitle">Secure access to Kosmic Apps dashboard</p>
            </div>

            <div class="content">
              <p style="color: white; font-size: 18px; margin: 0 0 20px;">Hello ${sanitizedUsername},</p>
              
              <p style="color: #e0e0e0; line-height: 1.6; margin: 0 0 20px;">
                You have requested access to the Kosmic Apps admin dashboard. Use the access key below to log in securely.
              </p>

              <div class="access-key">
                <div class="key-code">${accessKey}</div>
                <p class="key-label">Your Access Key</p>
              </div>

              <div class="instructions">
                <h3 style="color: white; font-size: 20px; margin: 0 0 20px;">How to use:</h3>
                
                <div class="step">
                  <div class="step-icon">1</div>
                  <div>
                    <strong>Copy the Access Key</strong><br>
                    <span style="color: #a0a0a0;">Copy the key above exactly as shown</span>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-icon">2</div>
                  <div>
                    <strong>Return to Login Page</strong><br>
                    <span style="color: #a0a0a0;">Go back to the admin login page</span>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-icon">3</div>
                  <div>
                    <strong>Enter Your Credentials</strong><br>
                    <span style="color: #a0a0a0;">Username: ${sanitizedUsername}, Email: ${sanitizedEmail}</span>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-icon">4</div>
                  <div>
                    <strong>Paste the Access Key</strong><br>
                    <span style="color: #a0a0a0;">Enter the key in the access key field</span>
                  </div>
                </div>
              </div>

              <div class="warning">
                <p class="warning-text">
                  <strong>⚠️ Important:</strong> This access key will expire in 2 minutes for security reasons.
                </p>
              </div>

              <div class="security-notice">
                <p class="security-text">
                  <strong>🔒 Security Notice:</strong> This email contains sensitive information. Do not share this access key with anyone. If you did not request this access, please ignore this email.
                </p>
              </div>
            </div>

            <div class="footer">
              <p>This access key was generated at ${new Date().toLocaleString()}</p>
              <p style="margin-top: 10px; font-size: 12px; color: #666;">
                If you have any questions, contact us at hello@kosmicapps.com
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (emailResult.error) {
      console.error('Email sending failed:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send access key email' },
        { status: 500 }
      );
    }

    const response = NextResponse.json({ 
      success: true, 
      message: 'Access key sent successfully' 
    });
    
    return addSecurityHeaders(response);

  } catch (error) {
    console.error('Send access key error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

