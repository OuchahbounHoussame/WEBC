import { useEffect } from 'react';

const SITE_URL = 'https://www.shopcozystitches.com';

/**
 * Generates canonical SEO metadata and Schema.org JSON-LD for a single blog post
 */
export function getBlogPostSEOMetadata(post) {
  if (!post) return null;

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.primaryImage.startsWith('http')
    ? post.primaryImage
    : `${SITE_URL}${post.primaryImage}`;

  const allImages = (post.images && post.images.length > 0)
    ? post.images.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`))
    : [imageUrl];

  // Schema.org Article / BlogPosting markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": post.title,
    "description": post.metaDescription || post.description,
    "image": allImages,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": post.author?.name || "CozyStitches Studio",
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "CozyStitches",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/cozy-stitches-brand-logo.svg`
      }
    },
    "articleSection": post.category,
    "keywords": (post.tags || []).join(', ')
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${SITE_URL}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${SITE_URL}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": canonicalUrl
      }
    ]
  };

  return {
    seoTitle: post.seoTitle || `${post.title} | CozyStitches Blog`,
    seoDescription: post.metaDescription || post.description,
    canonicalUrl,
    imageUrl,
    allImages,
    jsonLd,
    breadcrumbsJsonLd
  };
}

/**
 * Generates canonical SEO metadata and Schema.org JSON-LD for the blog index (/blog)
 */
export function getBlogIndexSEOMetadata() {
  const canonicalUrl = `${SITE_URL}/blog`;
  const seoTitle = "Crochet Blog & Free Amigurumi Tutorials | CozyStitches";
  const seoDescription = "Explore free crochet patterns, amigurumi tutorials, beginner stitch guides, and crafty tips from CozyStitches Studio.";
  const imageUrl = `${SITE_URL}/images/products/shooting-star/star-1.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "CozyStitches Crochet Blog",
    "description": seoDescription,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "CozyStitches",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/cozy-stitches-brand-logo.svg`
      }
    }
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${SITE_URL}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": canonicalUrl
      }
    ]
  };

  return {
    seoTitle,
    seoDescription,
    canonicalUrl,
    imageUrl,
    jsonLd,
    breadcrumbsJsonLd
  };
}

/**
 * Client-side React hook to update DOM head tags for a single post
 */
export function BlogPostSEO({ post }) {
  useEffect(() => {
    if (!post) return;
    const meta = getBlogPostSEOMetadata(post);
    if (!meta) return;

    document.title = meta.seoTitle;

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', meta.seoDescription);

    // Canonical link tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', meta.canonicalUrl);

    // Open Graph
    setMeta('og:title', meta.seoTitle, true);
    setMeta('og:description', meta.seoDescription, true);
    setMeta('og:url', meta.canonicalUrl, true);
    setMeta('og:type', 'article', true);
    setMeta('og:image', meta.imageUrl, true);
    setMeta('og:site_name', 'CozyStitches', true);
    setMeta('article:published_time', post.publishedAt, true);
    setMeta('article:section', post.category, true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.seoTitle);
    setMeta('twitter:description', meta.seoDescription);
    setMeta('twitter:image', meta.imageUrl);

    // Schema Script
    let script = document.getElementById('blog-post-schema-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'blog-post-schema-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(meta.jsonLd);

    let breadcrumbsScript = document.getElementById('blog-breadcrumbs-schema-jsonld');
    if (!breadcrumbsScript) {
      breadcrumbsScript = document.createElement('script');
      breadcrumbsScript.id = 'blog-breadcrumbs-schema-jsonld';
      breadcrumbsScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbsScript);
    }
    breadcrumbsScript.textContent = JSON.stringify(meta.breadcrumbsJsonLd);

    return () => {
      // Cleanup script tags if navigating away
      const el1 = document.getElementById('blog-post-schema-jsonld');
      if (el1) el1.remove();
      const el2 = document.getElementById('blog-breadcrumbs-schema-jsonld');
      if (el2) el2.remove();
    };
  }, [post]);

  return null;
}

/**
 * Client-side React hook to update DOM head tags for /blog index
 */
export function BlogIndexSEO() {
  useEffect(() => {
    const meta = getBlogIndexSEOMetadata();

    document.title = meta.seoTitle;

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', meta.seoDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', meta.canonicalUrl);

    setMeta('og:title', meta.seoTitle, true);
    setMeta('og:description', meta.seoDescription, true);
    setMeta('og:url', meta.canonicalUrl, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', meta.imageUrl, true);
    setMeta('og:site_name', 'CozyStitches', true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.seoTitle);
    setMeta('twitter:description', meta.seoDescription);
    setMeta('twitter:image', meta.imageUrl);

    let script = document.getElementById('blog-index-schema-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'blog-index-schema-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(meta.jsonLd);

    let breadcrumbsScript = document.getElementById('blog-index-breadcrumbs-jsonld');
    if (!breadcrumbsScript) {
      breadcrumbsScript = document.createElement('script');
      breadcrumbsScript.id = 'blog-index-breadcrumbs-jsonld';
      breadcrumbsScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbsScript);
    }
    breadcrumbsScript.textContent = JSON.stringify(meta.breadcrumbsJsonLd);

    return () => {
      const el1 = document.getElementById('blog-index-schema-jsonld');
      if (el1) el1.remove();
      const el2 = document.getElementById('blog-index-breadcrumbs-jsonld');
      if (el2) el2.remove();
    };
  }, []);

  return null;
}
