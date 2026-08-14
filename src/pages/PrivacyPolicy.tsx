import { Link } from 'react-router-dom';
import LegalPage, { LegalSection } from '../components/LegalPage';

const SUPPORT_EMAIL = 'team@samoracare.com';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Samora AI, Inc. respects your privacy and handles the information you submit through this website with care. This policy explains what we collect, how we use it, and who it is and is not shared with."
      effectiveDate="August 14, 2026"
    >
      <LegalSection heading="Who we are">
        <p>
          This website, samoracare.com, is operated by <strong>Samora AI, Inc.</strong> ("SamoraCare",
          "we", "us"). SamoraCare is a disability benefits service. We are a private company and are
          not affiliated with, endorsed by, or sponsored by the Social Security Administration or any
          other government agency.
        </p>
        <p>
          You can reach us about anything in this policy at{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Information we collect">
        <h3 className="legal-h3">Information you give us</h3>
        <p>When you complete the eligibility screener, we collect what you choose to enter:</p>
        <ul>
          <li>Your first and last name</li>
          <li>Your email address</li>
          <li>Your phone number, if you provide one</li>
          <li>Whether you have applied for Social Security Disability before</li>
          <li>The health conditions you are dealing with, described in your own words</li>
          <li>Whether you are currently seeing doctors for those conditions</li>
          <li>When you were last able to work, and the kind of work you did</li>
          <li>
            Whether you agreed to receive text messages from us, so that we have a record of your
            choice
          </li>
        </ul>
        <p>
          If you book a call with us, that scheduling is handled by our booking provider, and you
          give your details to them directly under their own privacy policy.
        </p>

        <h3 className="legal-h3">Information collected automatically</h3>
        <p>
          Our hosting provider records standard technical information when you visit, such as your IP
          address, the pages requested, the time of the request, and basic browser and device
          information. This is used to serve the site, keep it secure, and understand aggregate
          traffic. We do not use advertising cookies or third-party tracking pixels on this site.
        </p>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <ul>
          <li>To review whether you may be eligible for disability benefits</li>
          <li>To contact you about your inquiry, by phone, text, or email, in the way you prefer</li>
          <li>To help you prepare, file, and follow up on a benefits claim, if you ask us to</li>
          <li>To send you text messages about your claim, if you agreed to receive them</li>
          <li>To operate, secure, and improve this website</li>
          <li>To meet legal, regulatory, and record-keeping obligations</li>
        </ul>
        <p>
          We do not use the information you submit to build advertising profiles, and we do not use
          it for automated decision-making that produces legal effects about you.
        </p>
      </LegalSection>

      <LegalSection heading="Text messaging and your mobile number">
        <div className="legal-callout">
          <p>
            <strong>
              No mobile information will be shared with third parties or affiliates for marketing or
              promotional purposes.
            </strong>{' '}
            Your phone number and the fact that you consented to receive text messages are never
            sold, rented, or shared with anyone for their own marketing. Text messaging originator
            opt-in data and consent are not shared with any third party, except for the messaging
            providers we use strictly to deliver the messages you asked for.
          </p>
        </div>
        <p>
          You can stop receiving text messages at any time by replying <strong>STOP</strong>. Full
          details of the messaging program are in our{' '}
          <Link to="/terms-and-conditions">Terms and Conditions</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="How information is shared">
        <p>
          <strong>We do not sell your personal information</strong>, and we do not share it with
          third parties for their own marketing purposes. We share it only in these situations:
        </p>
        <ul>
          <li>
            <strong>Service providers acting for us.</strong> We use vendors to host the site, store
            submissions, deliver messages, and route your inquiry to the right person. They may only
            process your information on our instructions and for the purposes described here, not for
            their own purposes.
          </li>
          <li>
            <strong>People working on your claim.</strong> If you ask us to help with a claim, your
            information may be reviewed by advocates, representatives, or other partners who are
            working on your matter. This is how we deliver the service, not a marketing arrangement.
          </li>
          <li>
            <strong>Legal reasons.</strong> Where required by law, court order, or regulator, or
            where necessary to protect the rights, safety, or security of you, us, or others.
          </li>
          <li>
            <strong>Business transfer.</strong> If the business is sold or reorganized, information
            may transfer with it, subject to this policy.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Health and other sensitive information">
        <p>
          The screener asks about health conditions, medical treatment, and disability-related
          circumstances. You decide how much to share, and you should submit only what you are
          comfortable providing for an eligibility review. We treat this information as confidential
          and limit access to the people who need it to help you.
        </p>
        <p>
          SamoraCare is not a healthcare provider and, in most cases, is not a HIPAA covered entity.
          Information you send us through this website is protected by this policy rather than by
          HIPAA.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it, and how we protect it">
        <p>
          We keep your information for as long as reasonably necessary for the purposes set out
          above, and to meet our legal and record-keeping obligations, after which it is deleted or
          anonymized. We use reasonable administrative, technical, and organizational safeguards to
          protect it. No website or method of transmission is completely secure, so we cannot
          guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices and rights">
        <ul>
          <li>
            <strong>Stop text messages.</strong> Reply <strong>STOP</strong> to any message from us.
          </li>
          <li>
            <strong>Stop emails.</strong> Use the unsubscribe link, or email us.
          </li>
          <li>
            <strong>Access, correct, or delete.</strong> Ask us for a copy of the information we hold
            about you, ask us to correct it, or ask us to delete it.
          </li>
          <li>
            <strong>Withdraw consent.</strong> Where we rely on your consent, you can withdraw it at
            any time, without affecting anything done beforehand.
          </li>
        </ul>
        <p>
          To exercise any of these, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We
          may need to verify your identity before we act, and we will not treat you differently for
          exercising your rights. Depending on where you live, you may have additional rights under
          state privacy law.
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>
          This website is not intended for children under 13, and we do not knowingly collect
          personal information from them. If you believe a child has given us information, email us
          and we will delete it.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy from time to time. The effective date above shows when the
          current version was posted. If we make a material change to how we handle your information,
          we will take reasonable steps to let you know.
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
