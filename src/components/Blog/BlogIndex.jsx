import { useState } from 'react';
import { Calendar, Clock, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { blogPosts, blogCategories } from '../../data/blogPosts';
import { BlogIndexSEO } from './BlogSEO';
import './Blog.css';

export default function BlogIndex({ onOpenPost, onHomeClick, onFreebieClick }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = blogPosts.filter((post) => {
    if (activeCategory === 'all') return true;
    return post.category === activeCategory;
  });

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  const handlePostClick = (e, slug) => {
    e.preventDefault();
    if (onOpenPost) {
      onOpenPost(slug);
    } else {
      window.location.href = `/blog/${slug}`;
    }
  };

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Nov 15, 2026';
    }
  };

  return (
    <div className="blog-container">
      <BlogIndexSEO />

      {/* Breadcrumbs */}
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
        <span className="current">Blog &amp; Tutorials</span>
      </nav>

      {/* Index Hero */}
      <header className="blog-index-hero">
        <div className="blog-pill">
          <BookOpen size={13} />
          <span>The CozyStitches Journal</span>
        </div>
        <h1>Free Crochet Patterns &amp; Amigurumi Guides</h1>
        <p>
          Step-by-step crochet tutorials, beginner stitch walkthroughs, and verified free PDF patterns 
          designed with love by the CozyStitches studio team.
        </p>
      </header>

      {/* Category Filter Pills */}
      <div className="blog-filters" role="tablist" aria-label="Blog categories">
        {blogCategories.map((cat) => (
          <button
            key={cat.key}
            className={`blog-filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.key)}
            role="tab"
            aria-selected={activeCategory === cat.key}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Featured Article Card */}
      {featuredPost && activeCategory === 'all' && (
        <article className="blog-featured-card">
          <div className="blog-featured-img-wrap">
            <span className="blog-featured-badge">
              <Sparkles size={13} />
              Featured Free Pattern
            </span>
            <img
              src={featuredPost.primaryImage}
              alt={featuredPost.title}
              className="blog-featured-img"
              loading="eager"
            />
          </div>
          <div className="blog-featured-content">
            <div className="blog-meta-row">
              <span className="blog-meta-item">
                <Calendar size={13} />
                {formatDate(featuredPost.publishedAt)}
              </span>
              <span className="blog-meta-item">
                <Clock size={13} />
                {featuredPost.readingTime}
              </span>
              <span className="blog-meta-item" style={{ color: '#be6c87', fontWeight: 700 }}>
                {featuredPost.category}
              </span>
            </div>
            <h2 className="blog-featured-title">
              <a
                href={`/blog/${featuredPost.slug}`}
                onClick={(e) => handlePostClick(e, featuredPost.slug)}
              >
                {featuredPost.title}
              </a>
            </h2>
            <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
            <a
              href={`/blog/${featuredPost.slug}`}
              className="blog-read-more-btn"
              onClick={(e) => handlePostClick(e, featuredPost.slug)}
            >
              <span>Read Tutorial &amp; Pattern</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </article>
      )}

      {/* All Posts Grid */}
      <div className="blog-grid">
        {filteredPosts.map((post) => (
          <article key={post.id} className="blog-card">
            <div className="blog-card-img-wrap">
              <img
                src={post.primaryImage}
                alt={post.title}
                className="blog-card-img"
                loading="lazy"
              />
            </div>
            <div className="blog-card-body">
              <div className="blog-meta-row">
                <span className="blog-meta-item">
                  <Calendar size={12} />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="blog-meta-item">
                  <Clock size={12} />
                  {post.readingTime}
                </span>
              </div>
              <h3 className="blog-card-title">
                <a
                  href={`/blog/${post.slug}`}
                  onClick={(e) => handlePostClick(e, post.slug)}
                >
                  {post.title}
                </a>
              </h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-card-footer">
                <span style={{ fontSize: '0.8rem', color: '#be6c87', fontWeight: 600 }}>
                  {post.difficulty}
                </span>
                <a
                  href={`/blog/${post.slug}`}
                  className="blog-card-link"
                  onClick={(e) => handlePostClick(e, post.slug)}
                >
                  <span>Read Guide</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Free Pattern Footer CTA */}
      <section className="article-cta-box" style={{ margin: '40px auto 0', maxWidth: '800px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
          <Sparkles size={14} />
          <span>FREE COMMUNITY PATTERN</span>
        </div>
        <h3>Looking for more free crochet goodies?</h3>
        <p>
          Download our complete, full-color Shooting Star Keychain PDF directly to your device. 
          Instant delivery, zero cost, completely beginner-friendly!
        </p>
        <button
          className="article-cta-btn"
          onClick={() => {
            if (onFreebieClick) onFreebieClick();
            else window.location.href = '/#freebie';
          }}
        >
          <span>Get Free PDF Pattern</span>
          <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
}
