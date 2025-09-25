import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Get form analytics data
    const { data: interactions, error } = await supabase
      .from('form_interactions')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching form analytics:', error);
      return NextResponse.json(
        { error: 'Failed to fetch form analytics' },
        { status: 500 }
      );
    }

    // Calculate analytics
    const analytics = {
      totalPageVisits: interactions.filter(i => i.event_type === 'page_visit').length,
      totalFormStarts: interactions.filter(i => i.event_type === 'field_focus' && i.field_name === 'name').length,
      totalFormAbandons: interactions.filter(i => i.event_type === 'form_abandon').length,
      totalFormSubmits: interactions.filter(i => i.event_type === 'form_submit').length,
      
      // Calculate conversion rates
      conversionRates: {
        visitToStart: 0,
        startToSubmit: 0,
        overallConversion: 0
      },
      
      // Field interaction analysis
      fieldInteractions: {
        name: interactions.filter(i => i.field_name === 'name').length,
        email: interactions.filter(i => i.field_name === 'email').length,
        socialMedia: interactions.filter(i => i.field_name === 'socialMedia').length,
        appSelection: interactions.filter(i => i.field_name === 'appSelection').length,
        comments: interactions.filter(i => i.field_name === 'comments').length
      },
      
      // App selection analytics
      appSelectionAnalytics: {} as Record<string, number>,
      
      // Recent interactions
      recentInteractions: interactions.slice(0, 20),
      
      // Abandonment analysis
      abandonmentPoints: {
        afterName: 0,
        afterEmail: 0,
        afterSocialMedia: 0,
        afterAppSelection: 0,
        afterComments: 0
      }
    };

    // Calculate conversion rates
    if (analytics.totalPageVisits > 0) {
      analytics.conversionRates.visitToStart = (analytics.totalFormStarts / analytics.totalPageVisits) * 100;
    }
    
    if (analytics.totalFormStarts > 0) {
      analytics.conversionRates.startToSubmit = (analytics.totalFormSubmits / analytics.totalFormStarts) * 100;
    }
    
    if (analytics.totalPageVisits > 0) {
      analytics.conversionRates.overallConversion = (analytics.totalFormSubmits / analytics.totalPageVisits) * 100;
    }

    // Calculate app selection analytics
    const appSelections = interactions.filter(i => i.app_selection).map(i => i.app_selection);
    appSelections.forEach(app => {
      if (typeof app === 'string') {
        analytics.appSelectionAnalytics[app] = (analytics.appSelectionAnalytics[app] || 0) + 1;
      }
    });

    // Calculate abandonment points (simplified analysis)
    const sessions = [...new Set(interactions.map(i => i.session_id))];
    sessions.forEach(sessionId => {
      const sessionInteractions = interactions.filter(i => i.session_id === sessionId);
      const hasSubmit = sessionInteractions.some(i => i.event_type === 'form_submit');
      
      if (!hasSubmit && sessionInteractions.length > 1) {
        // Find the last field interaction
        const fieldInteractions = sessionInteractions.filter(i => i.field_name);
        if (fieldInteractions.length > 0) {
          const lastField = fieldInteractions[fieldInteractions.length - 1].field_name;
          if (lastField) {
            const abandonmentKey = `after${lastField.charAt(0).toUpperCase() + lastField.slice(1)}` as keyof typeof analytics.abandonmentPoints;
            if (abandonmentKey in analytics.abandonmentPoints) {
              analytics.abandonmentPoints[abandonmentKey]++;
            }
          }
        }
      }
    });

    return NextResponse.json(analytics);

  } catch (error) {
    console.error('Form analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
