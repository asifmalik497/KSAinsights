import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Private Lightweight View Tracker
 * Silently records page and article visits for the private SEO dashboard.
 * Completely invisible to public visitors (renders null).
 * Includes session deduplication to avoid counting consecutive refreshes.
 */
export const ViewTracker: React.FC = () => {
  const location = useLocation();
  const lastTrackedPath = useRef<string>('');

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Prevent double-counting the exact same path immediately
    if (lastTrackedPath.current === currentPath) return;
    lastTrackedPath.current = currentPath;

    // Check session storage to avoid spamming counts on repeated re-renders
    const sessionKey = `view_tracked_${currentPath}`;
    const alreadyTrackedInSession = sessionStorage.getItem(sessionKey);
    
    // Non-blocking fire-and-forget ping to private analytics API
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const language = navigator.language || '';

      fetch('/api/analytics/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: currentPath,
          title: document.title || currentPath,
          referrer: document.referrer || (alreadyTrackedInSession ? 'Session' : 'Direct'),
          timeZone,
          language
        })
      })
      .then(() => {
        sessionStorage.setItem(sessionKey, 'true');
      })
      .catch(() => {
        // Silent failure so it never disturbs user experience
      });
    } catch {
      // Ignore
    }
  }, [location.pathname]);

  return null;
};
