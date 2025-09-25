import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // In a real application, you'd want to add authentication/authorization here
    // For now, we'll allow access to the admin endpoints
    
    const { data: signups, error } = await supabase
      .from('signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching signups:', error);
      return NextResponse.json(
        { error: 'Failed to fetch signups' },
        { status: 500 }
      );
    }

    return NextResponse.json(signups);

  } catch (error) {
    console.error('Admin signups API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
