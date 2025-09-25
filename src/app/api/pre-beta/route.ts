import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { securityMiddleware, validateFormSecurity, addSecurityHeaders } from '@/lib/security-middleware';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Apply security middleware
    const securityCheck = securityMiddleware(request);
    if (securityCheck) return securityCheck;

    const body = await request.json();
    const { name, email, socialMedia, appSelection, comments } = body;

    // Validate required fields
    if (!name || !email || !appSelection) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Enhanced security validation
    const securityValidation = validateFormSecurity(request, { name, email, socialMedia, appSelection, comments });
    if (!securityValidation.isValid) {
      return securityValidation.response!;
    }

    // Use sanitized data
    const sanitizedData = securityValidation.sanitizedData!;

    // Get app details for the email
    const { apps } = await import('@/data/apps');
    const selectedApp = apps.find(app => app.slug === sanitizedData.appSelection);

    // Send confirmation email
    const emailResult = await resend.emails.send({
      from: 'Kosmic Apps <hello@kosmicapps.com>',
      to: [sanitizedData.email],
      subject: `Welcome to ${selectedApp?.name || 'Pre-Beta'} - You're In! 🚀`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Pre-Beta</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #0B0C10 0%, #1a1a2e 50%, #16213e 100%); }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 40px 0; }
            .logo { width: 60px; height: 60px; background: linear-gradient(135deg, #5A4DFF, #FF4D9D); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold; }
            .title { color: white; font-size: 32px; font-weight: bold; margin: 0 0 10px; }
            .subtitle { color: #a0a0a0; font-size: 18px; margin: 0; }
            .content { background: rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 40px; margin: 20px 0; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }
            .app-highlight { background: linear-gradient(135deg, #5A4DFF, #FF4D9D); padding: 20px; border-radius: 15px; margin: 20px 0; text-align: center; }
            .app-name { color: white; font-size: 24px; font-weight: bold; margin: 0 0 10px; }
            .app-hook { color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0; }
            .next-steps { margin: 30px 0; }
            .step { display: flex; align-items: center; margin: 15px 0; color: white; }
            .step-icon { width: 40px; height: 40px; background: linear-gradient(135deg, #5A4DFF, #FF4D9D); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; color: white; font-weight: bold; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #5A4DFF, #FF4D9D); color: white; padding: 15px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; color: #a0a0a0; font-size: 14px; margin-top: 40px; }
            .social-links { margin: 20px 0; }
            .social-link { color: #5A4DFF; text-decoration: none; margin: 0 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">K</div>
              <h1 class="title">Welcome to the Future! 🚀</h1>
              <p class="subtitle">You're now part of our exclusive pre-beta community</p>
            </div>

            <div class="content">
              <p style="color: white; font-size: 18px; margin: 0 0 20px;">Hi ${sanitizedData.name},</p>
              
              <p style="color: #e0e0e0; line-height: 1.6; margin: 0 0 20px;">
                Welcome to the Kosmic Apps pre-beta program! We're thrilled to have you join our community of early adopters who are helping shape the future of accessible technology.
              </p>

              ${selectedApp ? `
              <div class="app-highlight">
                <div class="app-name">${selectedApp.name}</div>
                <p class="app-hook">${selectedApp.hook}</p>
              </div>
              ` : ''}

              <div class="next-steps">
                <h3 style="color: white; font-size: 20px; margin: 0 0 20px;">What happens next?</h3>
                
                <div class="step">
                  <div class="step-icon">1</div>
                  <div>
                    <strong>Email Confirmation</strong><br>
                    <span style="color: #a0a0a0;">You'll receive this welcome email (you're reading it now!)</span>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-icon">2</div>
                  <div>
                    <strong>Early Access Notification</strong><br>
                    <span style="color: #a0a0a0;">We'll email you when ${selectedApp?.name || 'the app'} is ready for beta testing</span>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-icon">3</div>
                  <div>
                    <strong>Exclusive Updates</strong><br>
                    <span style="color: #a0a0a0;">Behind-the-scenes development news and progress updates</span>
                  </div>
                </div>
              </div>

              <p style="color: #e0e0e0; line-height: 1.6; margin: 20px 0;">
                As a pre-beta tester, you'll have the unique opportunity to influence the development of our tools and help us create technology that truly serves the neurodivergent community.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://kosmicapps.com/apps" class="cta-button">Explore Our Apps</a>
              </div>

              ${sanitizedData.socialMedia ? `
              <p style="color: #e0e0e0; margin: 20px 0;">
                <strong>Social Media:</strong> ${sanitizedData.socialMedia}
              </p>
              ` : ''}

              ${sanitizedData.comments ? `
              <p style="color: #e0e0e0; margin: 20px 0;">
                <strong>Your Comments:</strong> ${sanitizedData.comments}
              </p>
              ` : ''}
            </div>

            <div class="footer">
              <p>Thanks for joining our mission to make technology more accessible!</p>
              <div class="social-links">
                <a href="https://kosmicapps.com" class="social-link">Website</a>
                <a href="mailto:hello@kosmicapps.com" class="social-link">Contact</a>
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #666;">
                This email was sent to ${sanitizedData.email} because you signed up for our pre-beta program.
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
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    // Also send internal notification to admin
    await resend.emails.send({
      from: 'Kosmic Apps <hello@kosmicapps.com>',
      to: ['kosmicapps@gmail.com'],
      subject: `New Pre-Beta Signup: ${name} - ${selectedApp?.name || 'Unknown App'}`,
      html: `
        <h2>New Pre-Beta Signup</h2>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Social Media:</strong> ${sanitizedData.socialMedia || 'Not provided'}</p>
        <p><strong>Selected App:</strong> ${selectedApp?.name || 'Unknown'}</p>
        <p><strong>Comments:</strong> ${sanitizedData.comments || 'None'}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    });

    const response = NextResponse.json({ success: true });
    return addSecurityHeaders(response);

  } catch (error) {
    console.error('Pre-beta signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
