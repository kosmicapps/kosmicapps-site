import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const envVars = {
      ACCESS_USERNAME: process.env.ACCESS_USERNAME ? 'SET' : 'NOT SET',
      ACCESS_EMAIL: process.env.ACCESS_EMAIL ? 'SET' : 'NOT SET',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
      RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET' : 'NOT SET'
    };

    return NextResponse.json({
      environment: envVars,
      message: 'Environment variables status'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check environment variables' },
      { status: 500 }
    );
  }
}
