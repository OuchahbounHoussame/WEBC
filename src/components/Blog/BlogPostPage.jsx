import { useState } from 'react';
import { Calendar, Clock, ArrowLeft, DownloadCloud, Sparkles, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import { track } from '@vercel/analytics';
import { BlogPostSEO } from './BlogSEO';
import { products } from '../../data/products';
import './Blog.css';

const SITE_URL = 'https://www.shopcozystitches.com';

export default function BlogPostPage({
  post,
  onBackToBlog,
  onHomeClick,
  onOpenProduct,
  onFreebieClick
}) {
  const [showAllPins, setShowAllPins] = useState(false);

  if (!post) {
    return (
      <div className="blog-container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>Article Not Found</h2>
        <p style={{ color: '#7f6885', margin: '16px 0 24px' }}>The tutorial you are looking for does not exist or has been moved.</p>
        <button
          className="blog-read-more-btn"
          onClick={() => {
            if (onBackToBlog) onBackToBlog();
            else window.location.href = '/blog';
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Blog</span>
        </button>
      </div>
    );
  }

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return 'November 15, 2026';
    }
  };

  // Find related products
  const relatedProducts = (post.relatedProducts || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  const handleDownloadClick = () => {
    try {
      track('blog_free_pattern_cta_clicked', { slug: post.slug, target: 'product_2' });
    } catch {
      // non-blocking analytics
    }
    if (onFreebieClick) {
      onFreebieClick();
    } else {
      window.location.href = '/product/2';
    }
  };

  const handlePinterestSave = (pin) => {
    try {
      track('pinterest_pin_save_clicked', { pin_id: pin.id, angle: pin.angle });
    } catch {
      // non-blocking
    }
  };

  return (
    <div className="blog-container">
      <BlogPostSEO post={post} />

      <div className="article-layout">
        {/* Breadcrumb Navigation */}
        <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onHomeClick) onHomeClick();
              else window.location.href = '/';
            }}
          >
            Home
          </a>
          <span className="separator">&gt;</span>
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              if (onBackToBlog) onBackToBlog();
              else window.location.href = '/blog';
            }}
          >
            Blog
          </a>
          <span className="separator">&gt;</span>
          <span className="current">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="article-header">
          <div className="article-category-badge">
            <Sparkles size={12} />
            <span>{post.category}</span>
          </div>
          <h1 className="article-title">{post.title}</h1>

          <div className="article-meta">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={post.author?.avatar || "/cozy-stitches-brand-logo.svg"}
                alt={post.author?.name}
                className="article-author-avatar"
                width="36"
                height="36"
              />
              <div>
                <strong style={{ color: '#482750', display: 'block', fontSize: '0.92rem' }}>
                  {post.author?.name || 'Cozy Stitches Studio'}
                </strong>
                <span style={{ fontSize: '0.78rem', color: '#8f7a93' }}>
                  {post.author?.role || 'Designer'}
                </span>
              </div>
            </div>

            <span className="blog-meta-item">
              <Calendar size={14} />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            <span className="blog-meta-item">
              <Clock size={14} />
              {post.readingTime}
            </span>
          </div>
        </header>

        {/* Opening Intro Paragraphs */}
        <div className="article-intro-block" style={{ fontSize: '1.12rem', lineHeight: 1.7, color: '#3d2544', marginBottom: '20px' }}>
          {post.intro ? (
            post.intro.map((para, i) => (
              <p
                key={i}
                style={{ marginBottom: '14px' }}
                dangerouslySetInnerHTML={{
                  __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }}
              />
            ))
          ) : (
            <p>{post.excerpt || post.description}</p>
          )}
        </div>

        {/* Compact Jump-Link Bar */}
        {post.jumpLinks && (
          <nav className="article-jump-links" aria-label="Jump to article section">
            <span style={{ fontWeight: 600, color: '#7f6885', marginRight: '6px' }}>Quick navigation:</span>
            {post.jumpLinks.map((jl, idx) => (
              <span key={idx}>
                <a href={jl.href} className="article-jump-link">
                  {jl.label}
                </a>
                {idx < post.jumpLinks.length - 1 && <span className="jump-sep"> · </span>}
              </span>
            ))}
          </nav>
        )}

        {/* Hero Image */}
        <figure className="article-hero-figure" style={{ margin: '28px 0 36px', textAlign: 'center' }}>
          <img
            src={post.primaryImage}
            alt={post.primaryImageAlt || post.title}
            className="article-hero-image"
            style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 8px 30px rgba(72,39,80,0.08)' }}
          />
          <figcaption className="article-image-caption" style={{ fontSize: '0.85rem', color: '#7f6885', marginTop: '10px', fontStyle: 'italic' }}>
            {post.primaryImageCaption || "Yellow crochet shooting star with a smiling face and pastel crocheted tail."}
          </figcaption>
        </figure>

        {/* Section: What you will make */}
        {post.overview && (
          <section className="article-section" style={{ marginBottom: '36px' }}>
            <h2>{post.overview.title}</h2>
            {post.overview.paragraphs.map((p, i) => (
              <p key={i} style={{ lineHeight: 1.7, color: '#423046', marginBottom: '14px', fontSize: '1.05rem' }}>
                {p}
              </p>
            ))}
          </section>
        )}

        {/* Section: Materials */}
        {post.materials && post.materials.length > 0 && (
          <section className="article-materials-box" aria-label="Materials needed" style={{ marginBottom: '36px' }}>
            <h2 style={{ color: '#482750', fontSize: '1.4rem', marginTop: 0, marginBottom: '16px' }}>
              Materials for your crochet star
            </h2>
            <ul style={{ margin: '0 0 16px 20px', padding: 0, lineHeight: 1.7, color: '#423046' }}>
              {post.materials.map((mat, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
                  {mat}
                </li>
              ))}
            </ul>
            {post.materialsNote && (
              <p style={{ fontSize: '0.92rem', color: '#7f6885', fontStyle: 'italic', margin: 0, borderTop: '1px solid #ebd9ea', paddingTop: '12px' }}>
                {post.materialsNote}
              </p>
            )}
          </section>
        )}

        {/* Section: US Abbreviations Table */}
        {post.abbreviations && post.abbreviations.length > 0 && (
          <section aria-label="Abbreviations" style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#482750', fontSize: '1.4rem', marginBottom: '12px' }}>
              US crochet abbreviations
            </h2>
            <table className="article-abbrev-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '14px' }}>
              <thead>
                <tr style={{ background: '#fdf4f8', borderBottom: '2px solid #ebd9ea' }}>
                  <th style={{ width: '28%', textAlign: 'left', padding: '10px 14px', color: '#482750', fontWeight: 700 }}>Abbreviation</th>
                  <th style={{ textAlign: 'left', padding: '10px 14px', color: '#482750', fontWeight: 700 }}>Meaning</th>
                </tr>
              </thead>
              <tbody>
                {post.abbreviations.map((abbr, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f2e1ea' }}>
                    <td style={{ padding: '9px 14px' }}><strong style={{ color: '#be6c87' }}>{abbr.code}</strong></td>
                    <td style={{ padding: '9px 14px', color: '#423046' }}>{abbr.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {post.abbreviationsNote && (
              <p style={{ fontSize: '0.92rem', color: '#7f6885', lineHeight: 1.6, margin: 0 }}>
                {post.abbreviationsNote}
              </p>
            )}
          </section>
        )}

        {/* Section: Free shooting star crochet pattern (Anchor: #shooting-star-pattern) */}
        <section id="shooting-star-pattern" className="article-pattern-section" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.85rem', color: '#482750', borderBottom: '2px solid #fee6ea', paddingBottom: '10px', marginBottom: '24px' }}>
            {post.patternTitle || "Free shooting star crochet pattern"}
          </h2>

          {post.steps?.map((step) => (
            <div key={step.number} className="article-step-block" style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '1.35rem', color: '#be6c87', marginBottom: '12px' }}>
                {step.heading}
              </h3>

              {step.subtext && (
                <p style={{ fontStyle: 'italic', color: '#7f6885', marginBottom: '12px' }}>
                  {step.subtext}
                </p>
              )}

              {/* Step 1 Rounds */}
              {step.rounds && (
                <div style={{ background: '#ffffff', border: '1px solid #ebd9ea', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px' }}>
                  {step.rounds.map((rnd, rIdx) => (
                    <div
                      key={rIdx}
                      style={{ padding: '4px 0', fontSize: '1.02rem', lineHeight: 1.6, color: '#3d2544' }}
                      dangerouslySetInnerHTML={{
                        __html: rnd.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Step Instructions */}
              {step.instructions && (
                <div style={{ lineHeight: 1.7, color: '#3d2544', fontSize: '1.02rem', marginBottom: '16px' }}>
                  {step.instructions.map((inst, iIdx) => (
                    <p key={iIdx} style={{ marginBottom: '10px' }}>
                      {inst}
                    </p>
                  ))}
                </div>
              )}

              {/* Step 3 Colors */}
              {step.colors && (
                <div style={{ marginBottom: '16px' }}>
                  {step.colors.map((c, cIdx) => (
                    <div
                      key={cIdx}
                      style={{ marginBottom: '12px', lineHeight: 1.7, color: '#3d2544', fontSize: '1.02rem' }}
                      dangerouslySetInnerHTML={{
                        __html: c.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Step Process Photo (Real from PDF) */}
              {step.image && (
                <figure style={{ margin: '18px 0', textAlign: 'center' }}>
                  <picture>
                    <source srcSet={step.image.src} type="image/webp" />
                    <img
                      src={step.image.fallback || step.image.src}
                      alt={step.image.alt}
                      style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', border: '1px solid #ebd9ea', boxShadow: '0 4px 18px rgba(72,39,80,0.06)' }}
                      loading="lazy"
                      width="971"
                      height="1100"
                    />
                  </picture>
                  {step.image.caption && (
                    <figcaption style={{ fontSize: '0.85rem', color: '#7f6885', marginTop: '6px', fontStyle: 'italic' }}>
                      {step.image.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {/* Step Notes */}
              {step.notes && (
                <div style={{ background: '#fdf8fa', borderLeft: '4px solid #be6c87', padding: '10px 16px', borderRadius: '0 8px 8px 0', marginTop: '12px', fontSize: '0.95rem', color: '#554458' }}>
                  {step.notes.map((n, nIdx) => (
                    <p key={nIdx} style={{ margin: '4px 0' }}>
                      {n}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Section: Tips for a neat amigurumi star */}
        {post.tips && post.tips.length > 0 && (
          <section className="article-tips-section" style={{ background: '#faf4f8', border: '1px solid #ebd9ea', borderRadius: '16px', padding: '24px', marginBottom: '48px' }}>
            <h2 style={{ color: '#482750', fontSize: '1.35rem', marginTop: 0, marginBottom: '16px' }}>
              Tips for a neat amigurumi star
            </h2>
            <div style={{ display: 'grid', gap: '14px' }}>
              {post.tips.map((tip, tIdx) => (
                <div key={tIdx} style={{ lineHeight: 1.6, color: '#3d2544' }}>
                  <strong style={{ color: '#be6c87', display: 'block', fontSize: '1.02rem', marginBottom: '2px' }}>
                    {tip.title}
                  </strong>
                  <span>{tip.text}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Download CTA (Anchor: #download-pattern) */}
        {post.downloadCta && (
          <section id="download-pattern" className="article-cta-box" aria-label="Download free pattern" style={{ margin: '48px 0', background: 'linear-gradient(135deg, #fdf4f8, #fee6ea)', border: '2px dashed #be6c87', borderRadius: '20px', padding: '36px 24px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 700, fontSize: '0.85rem', marginBottom: '10px' }}>
              <CheckCircle2 size={16} />
              <span>OFFICIAL 100% FREE PRINTABLE GUIDE</span>
            </div>
            <h2 style={{ fontSize: '1.65rem', color: '#482750', margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>
              {post.downloadCta.title}
            </h2>
            <p
              style={{ fontSize: '1.05rem', color: '#554458', maxWidth: '620px', margin: '0 auto 20px', lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{
                __html: post.downloadCta.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }}
            />
            <button
              className="article-cta-btn"
              onClick={handleDownloadClick}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#be6c87', color: '#ffffff', padding: '14px 32px', borderRadius: '50px', fontWeight: 700, fontSize: '1.02rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(190,108,135,0.3)', transition: 'background 0.2s' }}
            >
              <DownloadCloud size={18} />
              <span>{post.downloadCta.buttonText}</span>
            </button>
            <p className="article-cta-note" style={{ fontSize: '0.82rem', color: '#7f6885', marginTop: '12px' }}>
              {post.downloadCta.note}
            </p>
          </section>
        )}

        {/* Section: Frequently asked questions */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="article-faqs-section" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.6rem', color: '#482750', marginBottom: '20px', borderBottom: '2px solid #fee6ea', paddingBottom: '8px' }}>
              Frequently asked questions
            </h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {post.faqs.map((faq, fIdx) => (
                <div key={fIdx} style={{ background: '#ffffff', border: '1px solid #ebd9ea', borderRadius: '12px', padding: '18px 20px' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#482750', margin: '0 0 8px' }}>
                    {faq.question}
                  </h3>
                  <p style={{ margin: 0, lineHeight: 1.6, color: '#554458', fontSize: '0.98rem' }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Save this crochet project for later (Anchor: #save-for-later) */}
        {post.saveForLater && (
          <section id="save-for-later" className="article-save-for-later" style={{ marginBottom: '48px', paddingTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#be6c87', marginBottom: '8px' }}>
              <Bookmark size={20} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pinterest Inspiration</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#482750', margin: '0 0 14px', fontFamily: 'Georgia, serif' }}>
              {post.saveForLater.title}
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#423046', lineHeight: 1.7, marginBottom: '16px' }}>
              {post.saveForLater.intro}
            </p>

            <p style={{ fontSize: '0.98rem', color: '#554458', marginBottom: '24px' }}>
              For another project, explore the{' '}
              <a
                href="/product/1"
                style={{ color: '#be6c87', fontWeight: 700, textDecoration: 'underline' }}
                onClick={(e) => {
                  e.preventDefault();
                  const p1 = products.find((p) => p.id === 1);
                  if (onOpenProduct && p1) onOpenProduct(p1);
                  else window.location.href = '/product/1';
                }}
              >
                Kroha Bunny crochet pattern
              </a>{' '}
              or browse the{' '}
              <a
                href="/product/6"
                style={{ color: '#be6c87', fontWeight: 700, textDecoration: 'underline' }}
                onClick={(e) => {
                  e.preventDefault();
                  const p6 = products.find((p) => p.id === 6);
                  if (onOpenProduct && p6) onOpenProduct(p6);
                  else window.location.href = '/product/6';
                }}
              >
                Christmas crochet collection
              </a>.
            </p>

            {/* Featured Pin 1 */}
            {post.saveForLater.pins && post.saveForLater.pins[0] && (() => {
              const pin1 = post.saveForLater.pins[0];
              const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(canonicalUrl)}&media=${encodeURIComponent(SITE_URL + pin1.pngFile)}&description=${encodeURIComponent(pin1.description)}`;
              return (
                <div style={{ background: '#fdf8fa', border: '1px solid #ebd9ea', borderRadius: '16px', padding: '20px', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                  <div style={{ flex: '0 0 180px', maxWidth: '200px' }}>
                    <picture>
                      <source srcSet={pin1.webpFile} type="image/webp" />
                      <img
                        src={pin1.pngFile}
                        alt={pin1.alt}
                        width={pin1.width}
                        height={pin1.height}
                        style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block', boxShadow: '0 4px 14px rgba(72,39,80,0.08)' }}
                        loading="lazy"
                      />
                    </picture>
                  </div>
                  <div style={{ flex: '1 1 260px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#be6c87', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                      Featured Pin &bull; {pin1.board}
                    </div>
                    <h3 style={{ fontSize: '1.2rem', color: '#482750', margin: '0 0 8px' }}>
                      {pin1.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: '#554458', lineHeight: 1.6, marginBottom: '14px' }}>
                      {pin1.description}
                    </p>
                    <a
                      href={pinterestUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pinterest-save-btn"
                      onClick={() => handlePinterestSave(pin1)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#e60023', color: '#ffffff', padding: '10px 20px', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, fontSize: '0.92rem', boxShadow: '0 4px 12px rgba(230,0,35,0.25)' }}
                    >
                      <Bookmark size={15} />
                      <span>Save to Pinterest</span>
                      <ExternalLink size={13} style={{ opacity: 0.8 }} />
                    </a>
                  </div>
                </div>
              );
            })()}

            {/* Toggle / Expandable Gallery for Pins 2–6 */}
            {post.saveForLater.pins && post.saveForLater.pins.length > 1 && (
              <div>
                <div style={{ textAlign: 'center', margin: '16px 0 20px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAllPins(!showAllPins)}
                    style={{ background: '#ffffff', border: '1px solid #be6c87', color: '#be6c87', padding: '10px 24px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', fontSize: '0.92rem' }}
                  >
                    {showAllPins ? 'Hide Additional Pins ↑' : `View All 6 Pinterest Pins (${post.saveForLater.pins.length - 1} more) ↓`}
                  </button>
                </div>

                {showAllPins && (
                  <div className="pins-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
                    {post.saveForLater.pins.slice(1).map((pin) => {
                      const pUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(canonicalUrl)}&media=${encodeURIComponent(SITE_URL + pin.pngFile)}&description=${encodeURIComponent(pin.description)}`;
                      return (
                        <div key={pin.id} style={{ background: '#ffffff', border: '1px solid #ebd9ea', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                          <picture>
                            <source srcSet={pin.webpFile} type="image/webp" />
                            <img
                              src={pin.pngFile}
                              alt={pin.alt}
                              width={pin.width}
                              height={pin.height}
                              style={{ width: '100%', height: 'auto', display: 'block' }}
                              loading="lazy"
                            />
                          </picture>
                          <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                            <div>
                              <div style={{ fontSize: '0.75rem', color: '#be6c87', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                                {pin.angle}
                              </div>
                              <h4 style={{ fontSize: '0.95rem', color: '#482750', margin: '0 0 6px', lineHeight: 1.3 }}>
                                {pin.title}
                              </h4>
                              <p style={{ fontSize: '0.82rem', color: '#7f6885', lineHeight: 1.5, margin: '0 0 12px' }}>
                                {pin.description}
                              </p>
                            </div>
                            <a
                              href={pUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => handlePinterestSave(pin)}
                              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#e60023', color: '#ffffff', padding: '8px 14px', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}
                            >
                              <Bookmark size={13} />
                              <span>Save Pin</span>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Pattern Credit */}
            {post.saveForLater.credit && (
              <p style={{ fontSize: '0.85rem', color: '#8f7a93', fontStyle: 'italic', marginTop: '24px', borderTop: '1px solid #ebd9ea', paddingTop: '14px' }}>
                {post.saveForLater.credit}
              </p>
            )}
          </section>
        )}

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <section className="article-related-products" aria-label="More crochet patterns" style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid #ebd9ea' }}>
            <h3 className="article-related-title" style={{ color: '#482750', fontSize: '1.35rem', marginBottom: '16px' }}>
              Explore More Cozy Stitches Patterns
            </h3>
            <div className="article-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {relatedProducts.map((p) => (
                <a
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="article-related-card"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenProduct) onOpenProduct(p);
                    else window.location.href = `/product/${p.id}`;
                  }}
                  style={{ background: '#ffffff', border: '1px solid #ebd9ea', borderRadius: '12px', padding: '14px', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                >
                  <img
                    src={p.primaryImage}
                    alt={`${p.name} crochet pattern PDF`}
                    loading="lazy"
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }}
                  />
                  <h4 style={{ margin: '0 0 6px', fontSize: '1rem', color: '#482750' }}>{p.name}</h4>
                  <span className="article-related-price" style={{ color: '#be6c87', fontWeight: 700, fontSize: '0.92rem' }}>
                    {p.isFree || p.id === 2 ? '100% Free' : `$${Number(p.price).toFixed(2)}`}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #ebd9ea', flexWrap: 'wrap', gap: '12px' }}>
          <button
            className="blog-filter-btn"
            onClick={() => {
              if (onBackToBlog) onBackToBlog();
              else window.location.href = '/blog';
            }}
          >
            ← Back to All Articles
          </button>
          <a
            href="/"
            className="blog-filter-btn active"
            onClick={(e) => {
              e.preventDefault();
              if (onHomeClick) onHomeClick();
              else window.location.href = '/';
            }}
          >
            Visit Crochet Shop →
          </a>
        </div>
      </div>
    </div>
  );
}
