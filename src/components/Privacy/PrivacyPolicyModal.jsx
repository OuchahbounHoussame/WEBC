import { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import './PrivacyPolicyModal.css';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="privacy-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="privacy-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="privacy-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="#be6c87" />
            <h3 id="privacy-modal-title">CozyStitches Privacy Policy</h3>
          </div>
          <button
            className="privacy-modal-close"
            onClick={onClose}
            aria-label="Close privacy policy"
          >
            <X size={20} />
          </button>
        </div>

        <div className="privacy-modal-body">
          <p>
            <strong>Last updated:</strong> November 2026
          </p>
          <p>
            CozyStitches (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates <strong>https://www.shopcozystitches.com</strong>. We are committed to protecting your personal data and respecting your privacy rights under the EU/UK General Data Protection Regulation (GDPR) and applicable privacy laws.
          </p>

          <h4>1. What Data We Collect</h4>
          <ul>
            <li><strong>Email Address:</strong> Provided voluntarily when requesting a free digital pattern, making an inquiry, or subscribing to pattern updates.</li>
            <li><strong>Consent Metadata:</strong> Timestamp of opt-in, consent notice version, and source URL when you choose to join our marketing list.</li>
            <li><strong>Technical &amp; Download Logs:</strong> Temporary download token verification, request timestamp, and anonymized access logs to prevent link sharing and service abuse.</li>
          </ul>

          <h4>2. Purpose &amp; Legal Basis</h4>
          <ul>
            <li><strong>Delivering Your Free Pattern (Contract/Requested Service - Art. 6(1)(b) GDPR):</strong> We use your email to generate your secure download link and send the PDF directly to your inbox.</li>
            <li><strong>Optional Marketing Updates (Consent - Art. 6(1)(a) GDPR):</strong> If and only if you explicitly check the optional marketing checkbox, we will send you occasional crochet tips, tutorials, and new pattern releases. Marketing consent is strictly optional.</li>
          </ul>

          <h4>3. Third-Party Service Providers (Data Processors)</h4>
          <ul>
            <li><strong>Brevo (Sendinblue SAS, France/EU):</strong> Our email automation provider used for transactional pattern delivery and permission-based marketing subscriptions. Brevo complies with European data protection regulations.</li>
            <li><strong>Vercel Inc. (USA):</strong> Hosts our web application and serverless infrastructure with strict data processing safeguards.</li>
            <li><strong>Fourthwall:</strong> Processes e-commerce purchases when buying paid patterns via our secure Fourthwall storefront.</li>
          </ul>

          <h4>4. Data Retention</h4>
          <p>
            Transactional pattern delivery logs are retained for 90 days for support and security verification. If you opt into our newsletter, your email is kept until you unsubscribe or request deletion.
          </p>

          <h4>5. Your Privacy Rights</h4>
          <p>Under GDPR and international privacy regulations, you have the right to:</p>
          <ul>
            <li><strong>Access &amp; Portability:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Withdraw Consent / Unsubscribe:</strong> Every promotional email includes an instant one-click unsubscribe link. You can also withdraw consent at any time without affecting your free pattern access.</li>
            <li><strong>Erasure (&quot;Right to be Forgotten&quot;):</strong> Request the permanent deletion of your email address from our records.</li>
          </ul>

          <h4>6. Contact Us</h4>
          <p>
            To exercise any of your privacy rights, please email our privacy team at <strong>hello@shopcozystitches.com</strong>. We respond to all verified requests within 30 days.
          </p>
        </div>

        <div className="privacy-modal-footer">
          <button
            className="btn btn-primary"
            style={{ borderRadius: '50px', padding: '10px 24px' }}
            onClick={onClose}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
