import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import GetStarted from './pages/GetStarted';
import Connect from './pages/Connect';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import { trackPageView } from './lib/analytics';

/**
 * The Meta base snippet in index.html already counted the page the visitor
 * landed on, so the first render is skipped here to avoid counting it twice.
 * Every route change after that needs reporting by hand.
 */
function PageViewTracker() {
  const { pathname } = useLocation();
  const landedOn = useRef(pathname);

  useEffect(() => {
    if (pathname === landedOn.current) return;
    landedOn.current = pathname;
    trackPageView();
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </BrowserRouter>
  );
}
