'use client';

import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // In production, this would load your analytics script
    // For now, we'll just log that analytics would be loaded
    if (process.env.NODE_ENV === 'production') {
      console.log('Analytics script would be loaded here');
      // Example: gtag('config', 'GA_MEASUREMENT_ID');
    }
  }, []);

  return null;
}
