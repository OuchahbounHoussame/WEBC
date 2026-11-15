import { Calendar, Clock, User, ArrowLeft, DownloadCloud, Sparkles, CheckCircle2 } from 'lucide-react';
import { BlogPostSEO } from './BlogSEO';
import { products } from '../../data/products';
import './Blog.css';

export default function BlogPostPage({
  post,
  onBackToBlog,
  onHomeClick,
  onOpenProduct,
  onFreebieClick
}) {
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
              />
              <div>
                <strong style={{ color: '#482750', display: 'block', fontSize: '0.92rem' }}>
                  {post.author?.name}
                </strong>
                <span style={{ fontSize: '0.78rem', color: '#8f7a93' }}>
                  {post.author?.role}
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

        {/* Hero Image */}
        <div className="article-hero-image-wrap">
          <img
            src={post.primaryImage}
            alt={post.imageAlt || post.title}
            className="article-hero-image"
          />
          <p className="article-image-caption">
            Handmade with CozyStitches 8/6 cotton yarn in Pastel Yellow and rainbow trailing ribbons.
          </p>
        </div>

        {/* Quick Project Specs */}
        {post.specs && (
          <aside className="article-specs-card" aria-label="Pattern Specifications">
            <div className="article-specs-title">
              <Sparkles size={16} color="#be6c87" />
              <span>Project Overview at a Glance</span>
            </div>
            <div className="article-specs-grid">
              <div className="article-spec-item">
                <strong>Skill Level:</strong> {post.specs.skillLevel}
              </div>
              <div className="article-spec-item">
                <strong>Finished Size:</strong> {post.specs.finishedSize}
              </div>
              <div className="article-spec-item">
                <strong>Hook Size:</strong> {post.specs.hookSize}
              </div>
              <div className="article-spec-item">
                <strong>Terminology:</strong> {post.specs.terms}
              </div>
              <div className="article-spec-item">
                <strong>Format:</strong> Free Online + Printable PDF
              </div>
              <div className="article-spec-item">
                <strong>PDF Guide:</strong> {post.specs.pdfPages}
              </div>
            </div>
          </aside>
        )}

        {/* Materials Required */}
        {post.materials && post.materials.length > 0 && (
          <section className="article-materials-box" aria-label="Materials needed">
            <h3 style={{ color: '#482750', fontSize: '1.25rem', marginTop: 0, marginBottom: '14px' }}>
              Materials You Will Need
            </h3>
            <ul style={{ margin: '0 0 0 18px', padding: 0 }}>
              {post.materials.map((mat, i) => (
                <li key={i} style={{ marginBottom: '8px', color: '#482750' }}>
                  {mat}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Abbreviations Table */}
        {post.abbreviations && post.abbreviations.length > 0 && (
          <section aria-label="Abbreviations">
            <h3 style={{ color: '#482750', fontSize: '1.25rem', marginBottom: '8px' }}>
              Crochet Abbreviations (US Terms)
            </h3>
            <table className="article-abbrev-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Abbreviation</th>
                  <th>Technique / Meaning</th>
                </tr>
              </thead>
              <tbody>
                {post.abbreviations.map((abbr, i) => (
                  <tr key={i}>
                    <td><strong style={{ color: '#be6c87' }}>{abbr.code}</strong></td>
                    <td>{abbr.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Article Body Sections */}
        <article className="article-body">
          {post.sections?.map((sec, idx) => (
            <section key={idx} style={{ marginBottom: '32px' }}>
              <h2>{sec.heading}</h2>
              <div
                style={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{
                  __html: sec.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                }}
              />
            </section>
          ))}
        </article>

        {/* High-Converting Download CTA Card */}
        {post.cta && (
          <section className="article-cta-box" aria-label="Download free pattern">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 700, fontSize: '0.85rem', marginBottom: '10px' }}>
              <CheckCircle2 size={16} />
              <span>OFFICIAL 100% FREE PDF DOWNLOAD</span>
            </div>
            <h3>{post.cta.title}</h3>
            <p>{post.cta.subtitle}</p>
            <button
              className="article-cta-btn"
              onClick={() => {
                if (onFreebieClick) {
                  onFreebieClick();
                } else {
                  const el = document.getElementById('freebie');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.href = '/#freebie';
                }
              }}
            >
              <DownloadCloud size={18} />
              <span>{post.cta.buttonText}</span>
            </button>
            <p className="article-cta-note">{post.cta.note}</p>
          </section>
        )}

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <section className="article-related-products" aria-label="More crochet patterns">
            <h3 className="article-related-title">Explore More CozyStitches Patterns</h3>
            <div className="article-related-grid">
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
                >
                  <img
                    src={p.primaryImage}
                    alt={`${p.name} crochet pattern PDF`}
                    loading="lazy"
                  />
                  <h4>{p.name}</h4>
                  <span className="article-related-price">
                    {p.isFree || p.id === 2 ? '100% Free' : `$${Number(p.price).toFixed(2)}`}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #ebd9ea' }}>
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
