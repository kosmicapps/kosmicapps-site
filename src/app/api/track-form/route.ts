import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      sessionId, 
      eventType, 
      fieldName, 
      email, 
      name, 
      appSelection,
      userAgent,
      referrer 
    } = body;

    // Validate required fields
    if (!sessionId || !eventType) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId and eventType' },
        { status: 400 }
      );
    }

    // Insert form interaction
    const { data, error } = await supabase
      .from('form_interactions')
      .insert([
        {
          session_id: sessionId,
          email: email || null,
          name: name || null,
          event_type: eventType,
          field_name: fieldName || null,
          app_selection: appSelection || null,
          user_agent: userAgent || null,
          referrer: referrer || null
        }
      ])
      .select();

    if (error) {
      console.error('Form tracking error:', error);
      return NextResponse.json(
        { error: 'Failed to track form interaction' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Form interaction tracked successfully' 
    });

  } catch (error) {
    console.error('Form tracking API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
