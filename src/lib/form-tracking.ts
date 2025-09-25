import { useCallback, useEffect, useRef } from 'react';

interface FormTrackingData {
  sessionId: string;
  eventType: string;
  fieldName?: string;
  email?: string;
  name?: string;
  appSelection?: string;
}

// Generate a unique session ID
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create session ID
const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('form_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('form_session_id', sessionId);
  }
  return sessionId;
};

// Track form interaction
const trackFormInteraction = async (data: FormTrackingData) => {
  try {
    await fetch('/api/track-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }),
    });
  } catch (error) {
    console.error('Error tracking form interaction:', error);
    // Don't throw - tracking shouldn't break the user experience
  }
};

// Custom hook for form tracking
export const useFormTracking = () => {
  const sessionId = useRef<string>('');
  const hasTrackedPageVisit = useRef<boolean>(false);
  const formStartTime = useRef<number>(0);
  const lastActivityTime = useRef<number>(0);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionId.current = getSessionId();
      
      // Track page visit
      if (!hasTrackedPageVisit.current) {
        trackFormInteraction({
          sessionId: sessionId.current,
          eventType: 'page_visit'
        });
        hasTrackedPageVisit.current = true;
      }

      // Track form abandonment after inactivity
      const trackAbandonment = () => {
        const now = Date.now();
        if (formStartTime.current > 0 && now - lastActivityTime.current > 30000) { // 30 seconds of inactivity
          trackFormInteraction({
            sessionId: sessionId.current,
            eventType: 'form_abandon'
          });
        }
      };

      // Reset inactivity timer
      const resetInactivityTimer = () => {
        lastActivityTime.current = Date.now();
        if (inactivityTimer.current) {
          clearTimeout(inactivityTimer.current);
        }
        inactivityTimer.current = setTimeout(trackAbandonment, 30000);
      };

      // Track user activity
      const handleActivity = () => {
        resetInactivityTimer();
      };

      document.addEventListener('mousemove', handleActivity);
      document.addEventListener('keypress', handleActivity);
      document.addEventListener('click', handleActivity);

      return () => {
        document.removeEventListener('mousemove', handleActivity);
        document.removeEventListener('keypress', handleActivity);
        document.removeEventListener('click', handleActivity);
        if (inactivityTimer.current) {
          clearTimeout(inactivityTimer.current);
        }
      };
    }
  }, []);

  // Track field interactions
  const trackFieldFocus = useCallback((fieldName: string, formData?: any) => {
    if (sessionId.current) {
      // Mark form start when user first interacts
      if (formStartTime.current === 0) {
        formStartTime.current = Date.now();
        trackFormInteraction({
          sessionId: sessionId.current,
          eventType: 'field_focus',
          fieldName: 'name', // This indicates form start
          name: formData?.name,
          email: formData?.email,
          appSelection: formData?.appSelection
        });
      }

      trackFormInteraction({
        sessionId: sessionId.current,
        eventType: 'field_focus',
        fieldName,
        name: formData?.name,
        email: formData?.email,
        appSelection: formData?.appSelection
      });
    }
  }, []);

  const trackFieldBlur = useCallback((fieldName: string, formData?: any) => {
    if (sessionId.current) {
      trackFormInteraction({
        sessionId: sessionId.current,
        eventType: 'field_blur',
        fieldName,
        name: formData?.name,
        email: formData?.email,
        appSelection: formData?.appSelection
      });
    }
  }, []);

  const trackFormSubmit = useCallback((formData: any) => {
    if (sessionId.current) {
      trackFormInteraction({
        sessionId: sessionId.current,
        eventType: 'form_submit',
        name: formData.name,
        email: formData.email,
        appSelection: formData.appSelection
      });
    }
  }, []);

  return {
    trackFieldFocus,
    trackFieldBlur,
    trackFormSubmit
  };
};
