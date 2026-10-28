import { useState } from 'react';
import {
  X,
  Check,
  ShoppingBag,
  DownloadCloud,
  Sparkles,
  Printer,
  BookOpen,
  Info,
  CheckCircle2
} from 'lucide-react';
import { ProductIcon } from '../Icons/CrochetIcons';
import './PatternModal.css';

export default function PatternModal({ product, onClose, onAddToCart }) {
  const [activeTab, setActiveTab] = useState(product?.patternGuide ? 'guide' : 'overview');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!product) return null;

  const handlePrintDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
    // Open system print dialog (which allows saving as PDF or printing directly)
    window.print();
  };

  return (
    <div className="pm-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="pm-title">
      <div className="pm-card" onClick={(e) => e.stopPropagation()}>
        <button className="pm-close" onClick={onClose} aria-label="Close pattern preview">
          <X size={20} />
        </button>

        <div className="pm-grid">
          {/* Left / Top: Visual banner */}
          <div className="pm-visual" style={{ background: product.color || '#fee6ea' }}>
            <div className="pm-icon-wrap">
              <ProductIcon iconKey={product.iconKey} size={130} />
            </div>
            <div className="pm-instant-tag">
              <Sparkles size={13} />
              <span>Instant PDF Download</span>
            </div>

            {/* Quick action buttons on visual side */}
            <div className="pm-side-actions">
              <button className="pm-print-btn" onClick={handlePrintDownload}>
                <Printer size={15} />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>

          {/* Right / Body: Details & Interactive Guide */}
          <div className="pm-details">
            <div className="pm-badges">
              <span className="pm-badge-type">{product.badge}</span>
              <span className={`skill-pill skill-${product.skill}`}>{product.skill}</span>
              {product.bestseller && (
                <span className="pm-badge-hot">Bestseller</span>
              )}
            </div>

            <h3 id="pm-title" className="pm-title">{product.name}</h3>
            <p className="pm-desc">{product.description}</p>

            {/* Tabs (Guide vs Overview) */}
            {product.patternGuide && (
              <div className="pm-tabs-bar">
                <button
                  className={`pm-tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
                  onClick={() => setActiveTab('guide')}
                >
                  <BookOpen size={15} />
                  <span>Pattern Instructions</span>
                </button>
                <button
                  className={`pm-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <Info size={15} />
                  <span>Materials &amp; Specs</span>
                </button>
              </div>
            )}

            {/* TAB 1: INTERACTIVE PATTERN GUIDE */}
            {activeTab === 'guide' && product.patternGuide && (
              <div className="pm-guide-container">
                {/* Abbreviations Box */}
                {product.patternGuide.abbreviations && (
                  <div className="pm-abbr-box">
                    <span className="pm-abbr-title">Abbreviations (US Terms):</span>
                    <div className="pm-abbr-list">
                      {product.patternGuide.abbreviations.map((ab, i) => (
                        <span key={i} className="pm-abbr-tag">
                          <strong>{ab.code}</strong>: {ab.meaning}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Steps & Rounds */}
                <div className="pm-steps-list">
                  {product.patternGuide.steps.map((step, idx) => (
                    <div key={idx} className="pm-step-block">
                      <h4 className="pm-step-title">{step.title}</h4>
                      {step.note && <p className="pm-step-note">{step.note}</p>}

                      {step.rounds && (
                        <div className="pm-rounds-grid">
                          {step.rounds.map((r, ri) => (
                            <div key={ri} className="pm-round-row">
                              <span className="pm-round-dot" />
                              <code>{r}</code>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.outline && <p className="pm-step-highlight">{step.outline}</p>}
                      {step.highlight && <p className="pm-step-highlight">{step.highlight}</p>}

                      {step.points && (
                        <ol className="pm-points-list">
                          {step.points.map((pt, pi) => (
                            <li key={pi}>{pt}</li>
                          ))}
                        </ol>
                      )}

                      {step.finishing && (
                        <p className="pm-step-finishing">
                          <strong>Finishing:</strong> {step.finishing}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: OVERVIEW & SPECS */}
            {(activeTab === 'overview' || !product.patternGuide) && (
              <>
                {/* Quick Specs */}
                <div className="pm-specs">
                  {product.size && (
                    <div className="pm-spec-item">
                      <span className="spec-label">Finished Size</span>
                      <span className="spec-val">{product.size}</span>
                    </div>
                  )}
                  {product.hook && (
                    <div className="pm-spec-item">
                      <span className="spec-label">Hook Size</span>
                      <span className="spec-val">{product.hook}</span>
                    </div>
                  )}
                  <div className="pm-spec-item">
                    <span className="spec-label">Format</span>
                    <span className="spec-val">{product.pages ? `${product.pages} Pages PDF` : 'Digital PDF'}</span>
                  </div>
                  <div className="pm-spec-item">
                    <span className="spec-label">Language / Terms</span>
                    <span className="spec-val">{product.terms}</span>
                  </div>
                </div>

                {/* Materials List */}
                {product.materials && product.materials.length > 0 && (
                  <div className="pm-section">
                    <h4 className="pm-subhead">Materials Needed:</h4>
                    <ul className="pm-materials-list">
                      {product.materials.map((m, i) => (
                        <li key={i}>
                          <Check size={14} className="pm-check" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Sections / Outline */}
                {product.sections && (
                  <div className="pm-section">
                    <h4 className="pm-subhead">What&apos;s Inside This PDF:</h4>
                    <div className="pm-sections-pills">
                      {product.sections.map((sec, i) => (
                        <span key={i} className="pm-sec-pill">
                          <CheckCircle2 size={12} />
                          <span>{sec}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guarantee Callout */}
                <div className="pm-guarantee">
                  <DownloadCloud size={18} className="pm-guar-icon" />
                  <div>
                    <strong>Immediate Access After Checkout</strong>
                    <p>Delivered directly to your email + printable A4/Letter size.</p>
                  </div>
                </div>
              </>
            )}

            {/* Modal Footer / Purchase Action */}
            <div className="pm-footer">
              <div className="pm-price-block">
                {product.originalPrice && (
                  <span className="pm-original">\${product.originalPrice.toFixed(2)}</span>
                )}
                <span className="pm-price">\${product.price.toFixed(2)}</span>
              </div>

              <div className="pm-footer-buttons">
                <button
                  className="btn btn-outline-dark pm-print-action-btn"
                  onClick={handlePrintDownload}
                  title="Print or save as PDF"
                >
                  <Printer size={16} />
                  <span>{downloadSuccess ? 'Downloaded!' : 'Save PDF'}</span>
                </button>

                <button
                  className="btn btn-primary pm-buy-btn"
                  onClick={() => {
                    onAddToCart(product);
                  }}
                >
                  <ShoppingBag size={17} />
                  <span>Add to Cart &amp; Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
