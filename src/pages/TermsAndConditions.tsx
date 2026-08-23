import { Link } from 'react-router-dom';
import LegalPage, { LegalSection } from '../components/LegalPage';

const SUPPORT_EMAIL = 'team@samoracare.com';

export default function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms and Conditions"
      intro="Please read these terms before using this website, submitting information through the eligibility screener, or joining our text messaging program."
      effectiveDate="August 14, 2026"
    >
      <LegalSection heading="Who we are">
        <p>
          This website, samoracare.com, is operated by <strong>Samora AI, Inc.</strong> ("SamoraCare",
          "we", "us"). SamoraCare is a disability benefits service. We are a private company and are
          not affiliated with, endorsed by, or sponsored by the Social Security Administration or any
          other government agency.
        </p>
      </LegalSection>

      <LegalSection heading="Text messaging program">
        <dl className="legal-dl">
          <div>
            <dt>Program name</dt>
            <dd>SamoraCare Benefits Updates</dd>
          </div>
          <div>
            <dt>What it is</dt>
            <dd>
              Text messages from a SamoraCare advocate about your disability benefits inquiry:
              confirming we received your details, arranging a time to speak, asking for documents we
              need, and updating you on the progress of your claim. It is not a marketing program
              and we do not send promotional offers.
            </dd>
          </div>
          <div>
            <dt>How to join</dt>
            <dd>
              By checking the consent box on either the eligibility screener at{' '}
              <Link to="/get-started">samoracare.com/get-started</Link> or the pre-qualification
              form at <Link to="/register">samoracare.com/register</Link>, and giving us your mobile
              number. Consent is not a condition of any purchase, and you do not have to agree to
              texts in order to use the screener or receive help from us.
            </dd>
          </div>
          <div>
            <dt>Message frequency</dt>
            <dd>Up to 4 messages per month.</dd>
          </div>
          <div>
            <dt>Cost</dt>
            <dd>
              <strong>Message and data rates may apply.</strong> We do not charge you for the
              messages, but your mobile carrier may, depending on your plan.
            </dd>
          </div>
          <div>
            <dt>Support</dt>
            <dd>
              Reply <strong>HELP</strong> to any message, or email{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            </dd>
          </div>
        </dl>

        <div className="legal-callout">
          <p>
            <strong>
              To stop receiving text messages, reply STOP to any message from us at any time.
            </strong>{' '}
            You will receive a single confirmation that you have been unsubscribed, and we will not
            send you any further texts unless you opt in again.
          </p>
          <p>
            <strong>
              For help, reply HELP to any message, or email {SUPPORT_EMAIL}.
            </strong>
          </p>
        </div>

        <p>
          Carriers are not liable for delayed or undelivered messages. Message delivery depends on
          your carrier and your device, and we cannot guarantee that every message will arrive.
        </p>
        <p>
          We handle your mobile number and your consent as described in our{' '}
          <Link to="/privacy-policy">Privacy Policy</Link>.{' '}
          <strong>
            No mobile information will be shared with third parties or affiliates for marketing or
            promotional purposes.
          </strong>
        </p>
      </LegalSection>

      <LegalSection heading="Use of this website">
        <p>
          This website provides general information and an eligibility screening tool related to
          disability benefits. You agree to use it only for lawful purposes, and to give accurate
          information when you submit a form. Please do not submit information about someone else
          unless you are entitled to do so on their behalf.
        </p>
      </LegalSection>

      <LegalSection heading="No legal, medical, or financial advice">
        <p>
          Everything on this website is provided for general informational purposes only. It is not
          legal, medical, financial, or other professional advice, and you should not rely on it as a
          substitute for advice from a qualified professional who knows your situation.
        </p>
      </LegalSection>

      <LegalSection heading="No attorney-client relationship">
        <p>
          Using this website, completing the screener, or exchanging messages with us does not create
          an attorney-client relationship. Any attorney-client relationship would require a separate
          written agreement with an attorney.
        </p>
      </LegalSection>

      <LegalSection heading="No guarantee of benefits or outcome">
        <p>
          Screening results are preliminary and informational. We do not guarantee that you will
          qualify for benefits, that we will take on your case, that you will obtain representation,
          or that any government agency or benefits program will approve your claim or reach any
          particular result. Outcomes vary with individual circumstances.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party support">
        <p>
          If you ask us for assistance, the information you submit may be reviewed by or shared with
          service providers, advocates, representatives, or other partners who help respond to your
          request, as described in our <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          The design, text, graphics, logos, and other materials on this website are owned by or
          licensed to Samora AI, Inc. and may not be copied, reproduced, or reused except as
          permitted by law or with our written permission.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Samora AI, Inc. is not liable for any indirect,
          incidental, consequential, special, or punitive damages arising out of or relating to your
          use of this website or the text messaging program. Nothing in these terms limits any
          liability that cannot lawfully be limited.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          We may update these Terms and Conditions from time to time. The effective date above shows
          when the current version was posted. Continuing to use the website after a change means you
          accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          Samora AI, Inc.
          <br />
          Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
