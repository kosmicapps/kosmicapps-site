// Analytics event types as defined in Phase 3
export type AnalyticsEvent = 
  | 'view_home'
  | 'click_cta_home'
  | 'view_apps_index'
  | 'filter_category'
  | 'click_app_download'
  | 'view_app_detail'
  | 'submit_press_form';

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean>;
}

// Placeholder analytics function - will be implemented in Phase 8
export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>) {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', event, properties);
  }
  
  // In production, this would send to your analytics service
  // Example: gtag('event', event, properties);
}

// Event tracking functions for common actions
export const analytics = {
  viewHome: () => trackEvent('view_home'),
  clickCtaHome: () => trackEvent('click_cta_home'),
  viewAppsIndex: () => trackEvent('view_apps_index'),
  filterCategory: (category: string) => trackEvent('filter_category', { category }),
  clickAppDownload: (appSlug: string) => trackEvent('click_app_download', { app_slug: appSlug }),
  viewAppDetail: (appSlug: string) => trackEvent('view_app_detail', { app_slug: appSlug }),
  submitPressForm: () => trackEvent('submit_press_form'),
};
