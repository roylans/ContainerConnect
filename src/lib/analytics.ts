// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = (import.meta as any).env.GA_MEASUREMENT_ID;

// Initialize gtag if not already defined
export const initGoogleAnalytics = () => {
  if (typeof window !== 'undefined' && !window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    if (GA_MEASUREMENT_ID) {
      window.gtag('config', GA_MEASUREMENT_ID);
    }
  }
};

// Track page views
export const trackPageView = (page_title: string, page_location?: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title,
      page_location: page_location || window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (form_name: string, success: boolean = true) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', success ? 'form_submit' : 'form_error', {
      event_category: 'engagement',
      event_label: form_name,
      value: success ? 1 : 0,
    });

    // Also track as conversion for successful submissions
    if (success) {
      window.gtag('event', 'generate_lead', {
        currency: 'EUR',
        value: 25.0,
        event_category: 'conversion',
        event_label: form_name,
      });
    }
  }
};

// Track user interactions
export const trackUserInteraction = (element: string, action: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'user_interaction',
      event_label: `${element}_${action}`,
    });
  }
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      event_label: `${percentage}%`,
      value: percentage,
    });
  }
};