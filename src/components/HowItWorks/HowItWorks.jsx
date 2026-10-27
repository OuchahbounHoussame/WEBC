import { Search, ShieldCheck, DownloadCloud, ArrowRight, Sparkles } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    icon: <Search size={32} />,
    title: 'Choose Your Pattern',
    desc: 'Browse our catalog and filter by skill level or category. Every listing shows page count, skill level, and file formats before you buy.',
    color: '#e8829b', // Pastel Pink
  },
  {
    num: '02',
    icon: <ShieldCheck size={32} />,
    title: 'Secure Checkout',
    desc: 'Pay safely with credit card, PayPal, or Apple Pay. Your transaction is fully encrypted. No account required — guest checkout available.',
    color: '#9d7dc5', // Pastel Lavender
  },
  {
    num: '03',
    icon: <DownloadCloud size={32} />,
    title: 'Instant Download',
    desc: 'Your PDF lands in your inbox within seconds and is also saved to your account. Access it on any device, anytime, forever.',
    color: '#54b895', // Pastel Mint
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section" id="how-it-works">
      <div className="section-header">
        <p className="section-label">Simple Process</p>
        <h2>How It Works</h2>
        <p className="section-desc">
          From browsing to crocheting in under 2 minutes. No waiting, no shipping, no hassle.
        </p>
      </div>

      <div className="steps-wrapper">
        {steps.map((step, i) => (
          <div key={step.num} className="step-card">
            <div className="step-num" style={{ background: step.color }}>
              {step.num}
            </div>
            <div className="step-vector-icon" style={{ color: step.color }}>
              {step.icon}
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            {i < steps.length - 1 && (
              <div className="step-connector" aria-hidden="true">
                <ArrowRight size={22} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="how-banner">
        <div className="how-banner-icon">
          <Sparkles size={28} />
        </div>
        <p>
          <strong>Fast &amp; Seamless:</strong> Most customers go from checkout to crocheting on their device in under <strong>60 seconds</strong>.
        </p>
      </div>
    </section>
  );
}
