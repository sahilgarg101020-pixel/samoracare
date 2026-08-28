import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import GetStarted from './pages/GetStarted';
import Connect from './pages/Connect';
import Register from './pages/Register';
import TalkToSomeone from './pages/TalkToSomeone';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import AccessibilityStatement from './pages/AccessibilityStatement';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
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
        <Route path="/register" element={<Register />} />
        <Route path="/talk-to-someone" element={<TalkToSomeone />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
