import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Zap, 
  CheckCircle2, 
  Star, 
  DownloadCloud, 
  FileText, 
  Sparkles, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import Logo from '../Logo/Logo';
import './CheckoutPage.css';

export default function CheckoutPage({ product, onBack }) {
  const [activeMethod, setActiveMethod] = useState('lemon'); // 'lemon' (cards/apple pay/paypal)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  // Lemon Squeezy direct checkout URL (with overlay fallback)
  const checkoutUrl = product.buyUrl || `https://cozystitchescrochet.lemonsqueezy.com/checkout/buy/7147a938-7a50-40f1-b2ff-5a78dca1e315`;

  const handleOpenLemonOverlay = (e) => {
    e.preventDefault();
    if (window.LemonSqueezy && window.LemonSqueezy.Url) {
      window.LemonSqueezy.Url.Open(checkoutUrl);
    } else {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <div className="co-page-wrapper">
      {/* Top Secure Header */}
      <header className="co-header">
        <div className="co-header-inner">
          <button className="co-back-link" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Store</span>
          </button>

          <div className="co-logo-center" onClick={onBack} role="button" tabIndex={0}>
            <Logo size={34} variant="dark" />
          </div>

          <div className="co-secure-badge">
            <Lock size={14} color="#10b981" />
            <span>256-bit SSL Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main 2-Column Checkout Layout */}
      <main className="co-container">
        <div className="co-grid">
          
          {/* Left Column: Checkout Details & Action Box */}
          <div className="co-form-column">
            <div className="co-step-card">
              <div className="co-step-header">
                <span className="co-step-num">1</span>
                <div>
                  <h3>Express Payment Options</h3>
                  <p>Choose your preferred secure payment method below</p>
                </div>
              </div>

              {/* Lemon Squeezy Embedded Secure Gate */}
              <div className="co-payment-methods">
                <div className="co-gate-box">
                  <div className="co-gate-top">
                    <div className="co-pill-recom">Recommended for US &amp; Global</div>
                    <h4>Credit / Debit Card, Apple Pay, Google Pay &amp; PayPal</h4>
                    <p className="co-gate-desc">
                      Fast 1-click checkout powered by Lemon Squeezy (Merchant of Record). All major credit/debit cards accepted.
                    </p>
                  </div>

                  <div className="co-card-logos">
                    <span className="co-badge-apple"> Pay</span>
                    <span className="co-badge-gpay">G Pay</span>
                    <span className="co-badge-visa">VISA</span>
                    <span className="co-badge-mc">Mastercard</span>
                    <span className="co-badge-pp">PayPal</span>
                  </div>

                  {/* Primary Instant Checkout Action */}
                  <a
                    href={checkoutUrl}
                    onClick={handleOpenLemonOverlay}
                    className="co-btn-checkout btn-primary"
                  >
                    <Lock size={18} />
                    <span>Pay ${product.price.toFixed(2)} &amp; Download Pattern</span>
                  </a>

                  <div className="co-security-note">
                    <ShieldCheck size={15} color="#10b981" />
                    <span>Bank-grade 256-bit encryption. Your payment info is 100% secure.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Delivery Guarantee Card */}
            <div className="co-delivery-box">
              <div className="co-deliv-header">
                <Zap size={20} color="#e8829b" />
                <h4>How you will receive your pattern:</h4>
              </div>
              <ul className="co-deliv-steps">
                <li>
                  <span className="co-deliv-dot">1</span>
                  <span><strong>Instant Download:</strong> A direct download button appears on your screen the moment payment finishes.</span>
                </li>
                <li>
                  <span className="co-deliv-dot">2</span>
                  <span><strong>Email Backup:</strong> We also email your high-resolution PDF and purchase receipt immediately.</span>
                </li>
                <li>
                  <span className="co-deliv-dot">3</span>
                  <span><strong>Lifetime Access:</strong> You can re-download this pattern anytime forever using your email address.</span>
                </li>
              </ul>
            </div>

            {/* Trust Reviews Mini Slider */}
            <div className="co-mini-review">
              <div className="co-mr-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#f5a623" color="#f5a623" />
                ))}
              </div>
              <p>
                "The pattern is super easy to follow with high quality photos for each step. Downloaded in literally 5 seconds!"
              </p>
              <span className="co-mr-author">— Verified Crafter from California, US</span>
            </div>
          </div>

          {/* Right Column: Order Summary Card (Shopify Style Sticky) */}
          <div className="co-summary-column">
            <div className="co-summary-card">
              <h3 className="co-sum-title">Order Summary</h3>

              {/* Product Preview Row */}
              <div className="co-prod-row">
                <div className="co-prod-thumb" style={{ background: '#ffffff' }}>
                  <img src={product.primaryImage} alt={product.name} />
                  <span className="co-thumb-badge">PDF</span>
                </div>

                <div className="co-prod-info">
                  <h4>{product.name}</h4>
                  <p className="co-prod-cat">Digital Amigurumi Pattern ({product.terms || 'US Terms'})</p>
                  <div className="co-prod-tags">
                    <span><FileText size={12} /> {product.pages || 6} Pages</span>
                    <span><Zap size={12} /> Instant PDF</span>
                  </div>
                </div>

                <div className="co-prod-price-col">
                  {product.originalPrice && (
                    <span className="co-price-orig">${product.originalPrice.toFixed(2)}</span>
                  )}
                  <span className="co-price-final">${product.price.toFixed(2)}</span>
                </div>
              </div>

              {/* What's included checklist */}
              <div className="co-included-block">
                <h5>What's included in this download:</h5>
                <ul className="co-inc-list">
                  <li>
                    <CheckCircle2 size={15} color="#10b981" />
                    <span>Official {product.pages || 6}-Page Full Color PDF Pattern</span>
                  </li>
                  <li>
                    <CheckCircle2 size={15} color="#10b981" />
                    <span>Detailed Step-by-Step Photos for Assembly</span>
                  </li>
                  <li>
                    <CheckCircle2 size={15} color="#10b981" />
                    <span>Complete Materials, Yarn &amp; Hook Specifications</span>
                  </li>
                  <li>
                    <CheckCircle2 size={15} color="#10b981" />
                    <span>Print-Ready for both A4 &amp; US Letter Paper</span>
                  </li>
                  <li>
                    <CheckCircle2 size={15} color="#10b981" />
                    <span>Lifetime Re-download Access</span>
                  </li>
                </ul>
              </div>

              {/* Cost Calculations */}
              <div className="co-calc-table">
                <div className="co-calc-row">
                  <span>Regular Price</span>
                  <span className="co-strikethrough">${(product.originalPrice || product.price + 3).toFixed(2)}</span>
                </div>

                {discountPercent && (
                  <div className="co-calc-row co-discount-row">
                    <span>Special Promotional Discount ({discountPercent}% OFF)</span>
                    <span className="co-disc-val">-${((product.originalPrice || 0) - product.price).toFixed(2)}</span>
                  </div>
                )}

                <div className="co-calc-row">
                  <span>Shipping &amp; Handling</span>
                  <span className="co-free-text">FREE (Digital Delivery)</span>
                </div>

                <div className="co-calc-divider" />

                <div className="co-calc-row co-total-row">
                  <div>
                    <strong>Total Due Today</strong>
                    <span className="co-currency-sub">USD (All taxes included)</span>
                  </div>
                  <strong className="co-total-amount">${product.price.toFixed(2)}</strong>
                </div>
              </div>

              {/* Money Back Guarantee Badge */}
              <div className="co-guarantee-pill">
                <ShieldCheck size={18} color="#be6c87" />
                <div>
                  <strong>Satisfaction Guarantee</strong>
                  <p>Corrupted file or missing page? We re-send or refund within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
