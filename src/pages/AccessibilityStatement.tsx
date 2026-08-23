import LegalPage, { LegalSection } from '../components/LegalPage';

const SUPPORT_EMAIL = 'team@samoracare.com';
const PHONE_TEL = '+12537665260';
const PHONE_DISPLAY = '(253) 766-5260';

export default function AccessibilityStatement() {
  return (
    <LegalPage
      title="Accessibility Statement"
      intro="SamoraCare is disability owned and led. An inaccessible website would put us out of step with the people we exist to serve, so we treat accessibility as part of the work rather than a checklist at the end."
      effectiveDate="August 23, 2026"
    >
      <LegalSection heading="Our commitment">
        <p>
          This website, samoracare.com, is operated by <strong>Samora AI, Inc.</strong> Many of us on
          this team live with disabilities, and we build with the assumption that our visitors do
          too. We aim to meet the{' '}
          <a
            href="https://www.w3.org/WAI/WCAG22/quickref/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Web Content Accessibility Guidelines (WCAG) 2.2, Level AA
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Conformance status">
        <p>
          <strong>We describe this site as partially conformant with WCAG 2.2 Level AA.</strong>{' '}
          Partially conformant means most of the site meets the standard, but we have not completed
          an independent third-party audit and cannot yet claim full conformance. We would rather
          tell you that plainly than display a badge we have not earned.
        </p>
      </LegalSection>

      <LegalSection heading="What we have done">
        <p>Specific measures currently in place across the site:</p>
        <ul>
          <li>
            A skip link on every page so keyboard and switch users can reach the main content
            without tabbing through the navigation.
          </li>
          <li>
            Semantic landmarks and a single, descriptive first-level heading on each page, so screen
            reader users can orient themselves and jump between regions.
          </li>
          <li>
            Visible focus outlines on every link, button, and form field, so it is always clear
            where keyboard focus is.
          </li>
          <li>
            The eligibility screener uses real radio buttons inside a labelled group, real labels
            tied to every input, and announces its progress to screen readers as you move through
            the steps.
          </li>
          <li>
            Form errors are announced when they appear, tied to the field they belong to, and
            described in words rather than by color alone.
          </li>
          <li>
            The questions and answers section works from the keyboard and reports its open or
            closed state to assistive technology.
          </li>
          <li>
            Text and interface colors are checked against the contrast the standard requires. Where
            our brand violet is too light to carry body text, a darker tint is used instead.
          </li>
          <li>
            Animation is kept minimal and slows down for visitors who ask their system to reduce
            motion.
          </li>
          <li>
            Pages are rendered on the server, so content is available before, and without,
            JavaScript.
          </li>
          <li>
            Phone calls are never required. You can ask us to reach you by text or email instead,
            and that is what we will do.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Known limitations">
        <p>
          We would rather name these than let you discover them. We are working on all of them:
        </p>
        <ul>
          <li>
            No independent accessibility audit has been carried out yet. Our testing so far is
            internal.
          </li>
          <li>
            Booking a call hands you over to Cal.com, a third-party scheduling service whose
            accessibility we do not control. If that page gives you any trouble, call us on{' '}
            <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a> and we will book it for you.
          </li>
          <li>
            Some decorative illustrations on the home page show what the product looks like rather
            than conveying information. They are not described in detail, because doing so would add
            noise for screen reader users without adding meaning.
          </li>
          <li>
            The site has not been tested against every combination of browser and assistive
            technology. Reports of specific pairings that fail are especially useful to us.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Tell us about a barrier">
        <p>
          If any part of this site blocks you, we want to hear about it, and we will help you
          complete whatever you were trying to do in the meantime. There is no wrong way to report
          it, and you do not need to know the technical name for the problem.
        </p>
        <ul>
          <li>
            Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </li>
          <li>
            Call <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
          </li>
        </ul>
        <p>
          We aim to reply within two business days. If you tell us what you were trying to do, which
          page you were on, and what device or assistive technology you were using, that helps us
          reproduce it faster, but none of it is required.
        </p>
      </LegalSection>

      <LegalSection heading="Alternatives if the site is not working for you">
        <p>
          You never have to use this website to get help from us. Everything the eligibility
          screener does can be done over the phone with an advocate, at{' '}
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>. We will read you the questions, record
          your answers, and send anything you need in whatever format works for you.
        </p>
      </LegalSection>

      <LegalSection heading="Assessment approach">
        <p>
          Samora AI, Inc. assessed this site by internal review, using keyboard-only navigation,
          screen reader testing, and automated contrast and markup checks. We update this statement
          when the site changes or when we learn something new about how it behaves. The effective
          date above shows the current version.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
