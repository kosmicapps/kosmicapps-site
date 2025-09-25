import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { securityMiddleware, validateFormSecurity, addSecurityHeaders } from '@/lib/security-middleware';

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

    // Get app details
    const { apps } = await import('@/data/apps');
    const selectedApp = apps.find(app => app.slug === sanitizedData.appSelection);

    // Save to Supabase database (only after successful signup process)
    const { data: signupData, error: dbError } = await supabase
      .from('signups')
      .insert([
        {
          name: sanitizedData.name,
          email: sanitizedData.email,
          app: selectedApp?.name || sanitizedData.appSelection,
          social_media: sanitizedData.socialMedia || null,
          comments: sanitizedData.comments || null
        }
      ])
      .select();

    if (dbError) {
      console.error('Database insertion failed:', dbError);
      return NextResponse.json(
        { error: 'Failed to save signup data' },
        { status: 500 }
      );
    }

    const response = NextResponse.json({ 
      success: true, 
      message: 'Signup confirmed and saved to database' 
    });
    
    return addSecurityHeaders(response);

  } catch (error) {
    console.error('Pre-beta confirmation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
