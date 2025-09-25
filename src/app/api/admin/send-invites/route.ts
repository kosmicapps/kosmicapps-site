import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { app, inviteLink, emails } = body;

    // Validate required fields
    if (!app || !inviteLink || !emails || emails.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let emailsSent = 0;
    const failedEmails: string[] = [];

    // Send invites to each email
    for (const email of emails) {
      try {
        // Get user details (handle potential duplicates)
        const { data: users, error: userError } = await supabase
          .from('signups')
          .select('name, id')
          .eq('email', email);

        if (userError || !users || users.length === 0) {
          console.error(`User not found for email ${email}:`, userError);
          failedEmails.push(email);
          continue;
        }

        // Use the first user found (in case of duplicates)
        const user = users[0];

        // Send invite email
        const emailResult = await resend.emails.send({
          from: 'Kosmic Apps <hello@kosmicapps.com>',
          to: [email],
          subject: `You're Invited to ${app} Beta! 🎉`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Beta Invitation</title>
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
                  <h1 class="title">You're Invited! 🎉</h1>
                  <p class="subtitle">Your beta access is ready</p>
                </div>

                <div class="content">
                  <p style="color: white; font-size: 18px; margin: 0 0 20px;">Hi ${user.name},</p>
                  
                  <p style="color: #e0e0e0; line-height: 1.6; margin: 0 0 20px;">
                    Great news! You've been selected to participate in the beta testing of our latest app. 
                    Your feedback will be invaluable in helping us create the best possible experience.
                  </p>

                  <div class="app-highlight">
                    <div class="app-name">${app}</div>
                    <p class="app-hook">Your beta access is now live!</p>
                  </div>

                  <p style="color: #e0e0e0; line-height: 1.6; margin: 20px 0;">
                    Click the button below to access your beta version and start exploring. 
                    We can't wait to hear your thoughts and see how you use the app!
                  </p>

                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${inviteLink}" class="cta-button">Access Beta Now</a>
                  </div>

                  <p style="color: #e0e0e0; line-height: 1.6; margin: 20px 0;">
                    <strong>What to expect:</strong><br>
                    • Full access to all beta features<br>
                    • Regular updates and improvements<br>
                    • Direct line to our development team<br>
                    • Your feedback shapes the final product
                  </p>

                  <p style="color: #e0e0e0; line-height: 1.6; margin: 20px 0;">
                    If you have any questions or need help getting started, don't hesitate to reach out to us at 
                    <a href="mailto:hello@kosmicapps.com" style="color: #5A4DFF;">hello@kosmicapps.com</a>.
                  </p>
                </div>

                <div class="footer">
                  <p>Thank you for being part of our beta community!</p>
                  <div class="social-links">
                    <a href="https://kosmicapps.com" class="social-link">Website</a>
                    <a href="mailto:hello@kosmicapps.com" class="social-link">Contact</a>
                  </div>
                  <p style="margin-top: 20px; font-size: 12px; color: #666;">
                    This email was sent to ${email} because you signed up for our pre-beta program.
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        if (emailResult.error) {
          console.error(`Failed to send email to ${email}:`, emailResult.error);
          failedEmails.push(email);
        } else {
          emailsSent++;
          
          // Update all users with this email (handle duplicates)
          const updateResult = await supabase
            .from('signups')
            .update({ 
              email_sent: true, 
              email_sent_at: new Date().toISOString() 
            })
            .eq('email', email);
            
          console.log(`Updated email_sent for ${email}:`, updateResult);
        }
      } catch (error) {
        console.error(`Error processing email ${email}:`, error);
        failedEmails.push(email);
      }
    }

    return NextResponse.json({
      success: true,
      emailsSent,
      failedEmails,
      message: `${emailsSent} invites sent successfully`
    });

  } catch (error) {
    console.error('Send invites API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
