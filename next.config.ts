import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Deployed on Cloudflare Workers via OpenNext (@opennextjs/cloudflare).
// Server-side rendering is enabled, so `output: 'export'` must NOT be set.
// Locale routing (/ -> /en) is handled by src/middleware.ts at the edge.
const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
