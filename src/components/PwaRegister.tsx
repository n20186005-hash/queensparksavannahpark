'use client';

import { useEffect } from 'react';

/**
 * Registers the service worker for PWA support.
 * Only runs on HTTPS (or localhost) to keep the app installable.
 */
export default function PwaRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const isSecure =
        window.location.protocol === 'https:' ||
        ['localhost', '127.0.0.1'].includes(window.location.hostname);
      if (isSecure) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          /* offline support is progressive - safe to ignore */
        });
      }
    }
  }, []);

  return null;
}
