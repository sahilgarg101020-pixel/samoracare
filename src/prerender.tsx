import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Landing from './pages/Landing';
import GetStarted from './pages/GetStarted';
import Connect from './pages/Connect';
import TalkToSomeone from './pages/TalkToSomeone';
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
    path: '/',
    title: 'Disability Benefits Help: SSDI, SSI & VA | SamoraCare',
    description:
      'SamoraCare helps you claim the SSDI, SSI, Workers\u2019 Comp and VA disability benefits you have already earned. Disability owned and led. Free 2-minute check.',
    element: <Landing />,
  },
  {
    path: '/get-started',
    title: 'Free Disability Benefits Eligibility Check | SamoraCare',
    description:
      'Answer a few short questions to see which disability benefits you may qualify for. Free, no obligation, and it takes about two minutes.',
    element: <GetStarted />,
  },
  {
    path: '/connect',
    title: 'Connect with SamoraCare',
    description:
      'Contact SamoraCare and optionally consent to receive text messages about your disability benefits inquiry.',
    element: <Connect />,
  },
  {
    path: '/talk-to-someone',
    title: 'Talk to someone — SamoraCare',
    description:
      'Book a 15-minute call with a SamoraCare benefits advocate, or call us on (253) 766-5260.',
    element: <TalkToSomeone />,
  },
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
