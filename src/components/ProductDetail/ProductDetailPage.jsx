import { useState, useEffect } from 'react';
import {
  Star,
  Zap,
  FileText,
  DownloadCloud,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Check,
  ShoppingBag,
  Sparkles,
  Lock,
  Printer,
  Layers,
  Heart,
  Scissors
} from 'lucide-react';
import { ProductIcon } from '../Icons/CrochetIcons';
import './ProductDetailPage.css';

export default function ProductDetailPage({ product, onAddToCart, onBuyNow, onBackToStore }) {
  const images = (product.images && product.images.length > 0)
    ? product.images
    : [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'materials' | 'stitches' | 'reviews'

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="pdp-container">
      {/* Top Breadcrumb Bar */}
      <div className="pdp-breadcrumb-wrap">
        <button className="pdp-back-btn" onClick={onBackToStore}>
          <ArrowLeft size={16} />
          <span>Back to All Patterns</span>
        </button>

        <div className="pdp-breadcrumb">
          <span onClick={onBackToStore} style={{ cursor: 'pointer' }}>Home</span>
          <span className="pdp-bc-sep">/</span>
          <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
          <span className="pdp-bc-sep">/</span>
          <span className="pdp-bc-current">{product.name}</span>
        </div>

        <button className="pdp-share-btn" onClick={handleCopyLink} title="Copy direct link to this product">
          {copied ? <Check size={15} color="#10b981" /> : <Share2 size={15} />}
          <span>{copied ? 'Link Copied!' : 'Share Product'}</span>
        </button>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="pdp-main-grid">
        {/* Left: Gallery */}
        <div className="pdp-gallery-column">
          <div className="pdp-showcase-box" style={{ background: '#ffffff', border: '1px solid #f1e4f4' }}>
            {images.length > 0 ? (
              <img
                src={images[activeImageIndex]}
                alt={`${product.name} showcase photo ${activeImageIndex + 1}`}
                className="pdp-main-image"
              />
            ) : (
              <div className="pdp-vector-stage">
                <ProductIcon iconKey={product.iconKey} size={220} />
              </div>
            )}

            {/* Floating badges */}
            <div className="pdp-badge-floating">
              <Zap size={13} />
              <span>Instant PDF</span>
            </div>

            {discountPercent && (
              <div className="pdp-sale-floating">
                SAVE {discountPercent}%
              </div>
            )}
          </div>

          {/* Thumbnails strip (Only real photos, no vector art) */}
          {images.length > 1 && (
            <div className="pdp-thumbs-strip">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  className={`pdp-thumb-item ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                  title={`View Photo ${idx + 1}`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}

          {images.length > 1 && (
            <p className="pdp-gallery-hint">
              📸 Click any photo thumbnail to inspect details &amp; finished doll
            </p>
          )}
        </div>

        {/* Right: Buy Box & Product Metadata */}
        <div className="pdp-details-column">
          <div className="pdp-meta-row">
            <span className={`skill-pill skill-${product.skill}`}>
              <span className="skill-dot" />
              <span>{product.skill}</span>
            </span>
            <span className="pdp-badge-tag">{product.badge || 'Digital Pattern'}</span>
            <span className="pdp-terms-badge">{product.terms || 'US Terms'}</span>
          </div>

          <h1 className="pdp-title">{product.name}</h1>

          {/* Reviews & Social Proof */}
          <div className="pdp-rating-row">
            <div className="pdp-stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="#f5a623"
                  color="#f5a623"
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="pdp-rating-score">5.0</span>
            <span className="pdp-review-count">({product.reviews || 94} crafter reviews)</span>
            <span className="pdp-dot">•</span>
            <span className="pdp-downloads-count">
              <DownloadCloud size={14} />
              <span>{product.downloads || '600+'} downloads</span>
            </span>
          </div>

          {/* Pricing Row */}
          <div className="pdp-price-box">
            <div className="pdp-price-wrap">
              <span className="pdp-current-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="pdp-original-price">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {discountPercent && (
              <span className="pdp-savings-tag">You save {discountPercent}% today!</span>
            )}
          </div>

          <p className="pdp-short-desc">{product.description}</p>

          {/* Key Quick Facts */}
          <div className="pdp-quick-facts">
            <div className="pdp-qf-item">
              <FileText size={16} className="pdp-qf-icon" />
              <div>
                <strong>{product.pages || 11} Pages</strong>
                <span>Color PDF Guide</span>
              </div>
            </div>
            <div className="pdp-qf-item">
              <Scissors size={16} className="pdp-qf-icon" />
              <div>
                <strong>Hook: {product.hook || '2.0 - 2.2 mm'}</strong>
                <span>Standard Sizes</span>
              </div>
            </div>
            <div className="pdp-qf-item">
              <Printer size={16} className="pdp-qf-icon" />
              <div>
                <strong>Print-Ready</strong>
                <span>A4 &amp; US Letter</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pdp-cta-cluster">
            <button
              className="pdp-btn-add-bag btn btn-primary"
              onClick={handleAdd}
            >
              {added ? (
                <>
                  <Check size={18} />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Add to Bag — ${product.price.toFixed(2)}</span>
                </>
              )}
            </button>

            {onBuyNow && (
              <button
                className="pdp-btn-buy-now btn"
                onClick={() => onBuyNow(product)}
              >
                <Zap size={18} />
                <span>Instant Checkout</span>
              </button>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="pdp-trust-card">
            <div className="pdp-trust-item">
              <CheckCircle2 size={16} color="#10b981" />
              <span><strong>Instant delivery:</strong> Download link + PDF delivered directly to your inbox.</span>
            </div>
            <div className="pdp-trust-item">
              <Lock size={16} color="#733c76" />
              <span><strong>Lifetime access:</strong> Request a fresh link anytime with your email.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Deep Pattern Specifications */}
      <div className="pdp-tabs-section">
        <div className="pdp-tabs-header">
          <button
            className={`pdp-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Layers size={16} />
            <span>Pattern Overview</span>
          </button>

          {product.materials && (
            <button
              className={`pdp-tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
              onClick={() => setActiveTab('materials')}
            >
              <Scissors size={16} />
              <span>Materials &amp; Hooks ({product.materials.length})</span>
            </button>
          )}

          {product.patternGuide && (
            <button
              className={`pdp-tab-btn ${activeTab === 'stitches' ? 'active' : ''}`}
              onClick={() => setActiveTab('stitches')}
            >
              <FileText size={16} />
              <span>Step-by-Step Guide</span>
            </button>
          )}

          <button
            className={`pdp-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <Heart size={16} />
            <span>Crafter Reviews (5.0 ★)</span>
          </button>
        </div>

        <div className="pdp-tab-content">
          {activeTab === 'overview' && (
            <div className="pdp-panel-overview">
              <div className="pdp-info-grid">
                <div className="pdp-info-card">
                  <h4>📏 Finished Dimensions</h4>
                  <p>{product.size || '18 cm body, 20 cm with cap'}</p>
                </div>
                <div className="pdp-info-card">
                  <h4>🧶 Recommended Yarn</h4>
                  <p>Cotton sport/DK weight with smooth stitch definition</p>
                </div>
                <div className="pdp-info-card">
                  <h4>🪡 Skill Level</h4>
                  <p><strong>{product.skill}</strong> — false X-stitch and wire insertion techniques explained with photos</p>
                </div>
                <div className="pdp-info-card">
                  <h4>📑 PDF Structure</h4>
                  <p>{product.pages} pages with full color photography and printable instructions</p>
                </div>
              </div>

              {product.sections && (
                <div className="pdp-sections-box">
                  <h4>Chapters Included in this Pattern:</h4>
                  <ul className="pdp-sections-list">
                    {product.sections.map((sec, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="pdp-sec-check" />
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'materials' && product.materials && (
            <div className="pdp-panel-materials">
              <h4>Required Materials &amp; Tools</h4>
              <ul className="pdp-materials-list">
                {product.materials.map((mat, i) => (
                  <li key={i}>
                    <span className="pdp-mat-bullet">•</span>
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'stitches' && product.patternGuide && (
            <div className="pdp-panel-stitches">
              {product.patternGuide.abbreviations && (
                <div className="pdp-abbrev-block">
                  <h4>Stitch Abbreviations (US Terms)</h4>
                  <div className="pdp-abbrev-chips">
                    {product.patternGuide.abbreviations.map((a, i) => (
                      <span key={i} className="pdp-abbrev-chip">
                        <strong>{a.code}</strong>: {a.meaning}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.patternGuide.steps && (
                <div className="pdp-steps-block">
                  <h4>Step-by-Step Pattern Roadmap</h4>
                  <div className="pdp-roadmap">
                    {product.patternGuide.steps.map((st, i) => (
                      <div key={i} className="pdp-step-card">
                        <h5>{st.title}</h5>
                        {st.note && <p className="pdp-step-note">💡 {st.note}</p>}
                        {st.rounds && (
                          <ul className="pdp-rounds-list">
                            {st.rounds.slice(0, 4).map((r, rIdx) => (
                              <li key={rIdx}>{r}</li>
                            ))}
                            {st.rounds.length > 4 && (
                              <li className="pdp-more-rounds">
                                + {st.rounds.length - 4} more rounds detailed in the downloadable PDF...
                              </li>
                            )}
                          </ul>
                        )}
                        {st.points && (
                          <ul className="pdp-rounds-list">
                            {st.points.map((pt, pIdx) => (
                              <li key={pIdx}>{pt}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="pdp-panel-reviews">
              <div className="pdp-reviews-summary">
                <div className="pdp-rev-score-box">
                  <div className="pdp-rev-big-num">5.0</div>
                  <div className="pdp-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="#f5a623" color="#f5a623" />
                    ))}
                  </div>
                  <span>Based on {product.reviews || 94} verified purchases</span>
                </div>
              </div>

              <div className="pdp-reviews-cards">
                <div className="pdp-review-bubble">
                  <div className="pdp-rb-header">
                    <strong>Maria S.</strong>
                    <span className="pdp-verified">Verified Buyer</span>
                  </div>
                  <p>
                    "The photos in this pattern made the hair placement and graduation cap so effortless! I made one for my daughter's graduation and it brought tears to her eyes. Absolute perfection!"
                  </p>
                </div>
                <div className="pdp-review-bubble">
                  <div className="pdp-rb-header">
                    <strong>Elena K.</strong>
                    <span className="pdp-verified">Verified Buyer</span>
                  </div>
                  <p>
                    "Clear stitch explanations, high quality pictures, and the wire insertion technique was explained step-by-step. Very happy with this pattern!"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
