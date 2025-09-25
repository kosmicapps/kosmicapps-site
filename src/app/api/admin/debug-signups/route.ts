import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data: signups, error } = await supabase
      .from('signups')
      .select('id, name, email, app, email_sent, email_sent_at, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching signups for debug:', error);
      return NextResponse.json(
        { error: 'Failed to fetch signups', details: error },
        { status: 500 }
      );
    }

    // Calculate stats
    const stats = {
      total: signups.length,
      emailsSent: signups.filter(s => s.email_sent).length,
      emailsWaiting: signups.filter(s => !s.email_sent).length,
      byApp: signups.reduce((acc, signup) => {
        acc[signup.app] = (acc[signup.app] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      emailsSentByApp: signups
        .filter(s => s.email_sent)
        .reduce((acc, signup) => {
          acc[signup.app] = (acc[signup.app] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
    };

    return NextResponse.json({
      signups,
      stats
    });

  } catch (error) {
    console.error('Debug signups API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
