import { redirect } from 'next/navigation';

// This page only renders when the app is built statically (output: 'export')
// For dynamic deployments, the middleware will intercept requests to `/`
// and redirect to the default locale (e.g. `/en`).
// English is served first: it is the site's primary language (see i18n/routing.ts).
export default function RootPage() {
  redirect('/en');
}