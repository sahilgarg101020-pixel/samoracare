import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import './index.css';

/**
 * The legal pages are submitted to carriers for A2P campaign vetting, and some
 * of what fetches them does not run JavaScript. Rendered as an SPA route they
 * would arrive as an empty div, so these two are baked into real HTML files at
 * build time. The client bundle still boots and takes over as normal.
 */
export const ROUTES = [
  {
    path: '/privacy-policy',
    title: 'Privacy Policy — SamoraCare',
    description:
      'How Samora AI, Inc. collects, uses, and shares information submitted through samoracare.com, including mobile numbers and SMS consent.',
    element: <PrivacyPolicy />,
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions — SamoraCare',
    description:
      'Terms for using samoracare.com and the SamoraCare Benefits Updates text messaging program, including message frequency, rates, and how to opt out.',
    element: <TermsAndConditions />,
  },
];

export function render(path: string, element: React.ReactNode): string {
  return renderToString(<StaticRouter location={path}>{element}</StaticRouter>);
}
