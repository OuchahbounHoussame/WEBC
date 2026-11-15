import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Import real products data and blog posts
const productsModule = await import('../src/data/products.js');
const products = productsModule.products || [];

const blogModule = await import('../src/data/blogPosts.js');
const blogPosts = blogModule.blogPosts || [];

const SITE_URL = 'https://www.shopcozystitches.com';
const TODAY = new Date().toISOString().split('T')[0];

console.log(`[SEO Generator] Starting SEO generation for ${products.length} products and ${blogPosts.length} blog posts...`);

// ── 1. Helper for Product SEO Metadata ────────────────────────
function getProductSEO(product) {
  let seoTitle = `${product.name} Crochet Pattern | CozyStitches`;
  let seoDescription = product.description;

  if (product.id === 1) {
    seoTitle = `Kroha Bunny Plush & Keychain Crochet Pattern | CozyStitches`;
    seoDescription = `Crochet your own sweet Kroha Bunny with this 17-page digital PDF pattern. Includes instructions for 9 cm keychain & 17 cm plush toy with step-by-step photos in US terms.`;
  } else if (product.id === 2) {
    seoTitle = `Free Shooting Star Keychain Crochet Pattern PDF | CozyStitches`;
    seoDescription = `Download the free Shooting Star Keychain crochet pattern PDF. Includes step-by-step photos, US terms, and pastel rainbow tail assembly. Instant email delivery.`;
  } else if (product.id === 3) {
    seoTitle = `Crochet Glasses Holder PDF Pattern | CozyStitches`;
    seoDescription = `Create adorable crochet glasses holders with this downloadable PDF pattern. Explore step-by-step instructions and start your next crochet project.`;
  } else if (product.id === 4) {
    seoTitle = `Graduate Doll Amigurumi Crochet Pattern | CozyStitches`;
    seoDescription = `Handmade graduation keepsake amigurumi doll pattern. 11-page digital PDF tutorial with cap, gold tassel, gown, diploma scroll and floral bouquet in US terms.`;
  } else if (product.id === 5) {
    seoTitle = `Plush Santa Claus Doll Crochet Pattern | CozyStitches`;
    seoDescription = `Crochet an adorable 27 cm plush Santa Claus doll with this 18-page digital PDF pattern. Features slouchy Santa hat, loop-stitch beard, fluffy cuffs, and 10 video links in US terms.`;
  } else if (product.id === 6) {
    seoTitle = `Christmas Collection 5-in-1 Amigurumi Crochet Pattern PDF | CozyStitches`;
    seoDescription = `Complete 48-page Christmas amigurumi pattern bundle. Includes 5 designs: Grinch, Little Dragon, Gingerbread Doll, Snowman, and Elf with step-by-step photos and 8 video tutorials.`;
  }

  const canonicalUrl = `${SITE_URL}/product/${product.id}`;
  const imageUrl = product.primaryImage.startsWith('http')
    ? product.primaryImage
    : `${SITE_URL}${product.primaryImage}`;

  const allImages = (product.images && product.images.length > 0)
    ? product.images.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`))
    : [imageUrl];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "headline": seoTitle,
    "image": allImages,
    "description": seoDescription,
    "sku": `COZY-PATTERN-00${product.id}`,
    "mpn": `COZY-${product.id}`,
    "category": "Crafts & Hobbies > Crochet & Knitting > Crochet Patterns",
    "brand": {
      "@type": "Brand",
      "name": "CozyStitches"
    },
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "USD",
      "price": (product.id === 2 || product.isFree) ? "0.00" : Number(product.price).toFixed(2),
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": (product.id === 2 || product.isFree) ? "https://schema.org/InStock" : (product.soldOut ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"),
      "seller": {
        "@type": "Organization",
        "name": "CozyStitches",
        "url": SITE_URL
      }
    }
  };

  return {
    seoTitle,
    seoDescription,
    canonicalUrl,
    imageUrl,
    allImages,
    jsonLd
  };
}

// ── 2. Generate XML Sitemap ───────────────────────────────────
function generateSitemap() {
  const urlEntries = [
    `  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`,
    `  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`
  ];

  // Product URLs
  for (const product of products) {
    const seo = getProductSEO(product);
    urlEntries.push(`  <url>
    <loc>${seo.canonicalUrl}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${seo.imageUrl}</image:loc>
      <image:title><![CDATA[${product.name} Crochet Pattern PDF]]></image:title>
      <image:caption><![CDATA[${seo.seoDescription}]]></image:caption>
    </image:image>
  </url>`);
  }

  // Blog Article URLs
  for (const post of blogPosts) {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    const postImg = post.primaryImage.startsWith('http') ? post.primaryImage : `${SITE_URL}${post.primaryImage}`;
    const pubDate = post.publishedAt ? post.publishedAt.split('T')[0] : TODAY;
    urlEntries.push(`  <url>
    <loc>${postUrl}</loc>
    <lastmod>${pubDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${postImg}</image:loc>
      <image:title><![CDATA[${post.title}]]></image:title>
      <image:caption><![CDATA[${post.description}]]></image:caption>
    </image:image>
  </url>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.join('\n')}
</urlset>`;
}

// ── 3. Generate robots.txt ────────────────────────────────────
function generateRobots() {
  return `# robots.txt for Cozy Stitches
# Website: https://www.shopcozystitches.com/

User-agent: *
Allow: /
Allow: /product/
Allow: /blog
Allow: /blog/
Allow: /images/
Allow: /patterns/
Allow: /assets/
Allow: /favicon.svg
Allow: /logo.svg

# Disallow private checkout, admin area, internal APIs, and storage
Disallow: /checkout/
Disallow: /checkout
Disallow: /admin
Disallow: /admin/
Disallow: /api/
Disallow: /server/
Disallow: /storage/

# Sitemap & Host
Host: ${SITE_URL}
Sitemap: ${SITE_URL}/sitemap.xml
`;
}

// ── 4. Generate 404.html ──────────────────────────────────────
function generate404Html() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404: Page Not Found | CozyStitches</title>
  <meta name="robots" content="noindex, follow" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #faf4f8;
      color: #482750;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      background: #ffffff;
      border: 1px solid #ebd9ea;
      border-radius: 24px;
      box-shadow: 0 12px 36px rgba(115, 60, 118, 0.08);
      max-width: 520px;
      width: 100%;
      padding: 48px 32px;
      text-align: center;
    }
    .icon { font-size: 56px; margin-bottom: 16px; }
    h1 {
      font-family: Georgia, serif;
      font-size: 28px;
      color: #482750;
      margin-bottom: 12px;
    }
    p {
      color: #7f6885;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 28px;
    }
    a.btn {
      display: inline-block;
      background: #be6c87;
      color: #ffffff;
      font-weight: 700;
      font-size: 15px;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 50px;
      box-shadow: 0 6px 20px rgba(190, 108, 135, 0.3);
      transition: background 0.2s ease;
      margin: 4px;
    }
    a.btn:hover { background: #ab5772; }
    a.btn-outline {
      background: transparent;
      color: #be6c87;
      border: 2px solid #be6c87;
      box-shadow: none;
    }
    a.btn-outline:hover {
      background: #fee6ea;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🧶</div>
    <h1>404 — Page Not Found</h1>
    <p>We couldn't find the crochet page or pattern you're looking for. Browse our patterns or visit the crochet blog.</p>
    <div>
      <a href="/" class="btn">&larr; Return to Patterns</a>
      <a href="/blog" class="btn btn-outline">Read Crochet Blog</a>
    </div>
  </div>
</body>
</html>`;
}

// ── 5. Helper to replace head tags cleanly ─────────────────────
function injectSEOHead(templateHtml, { title, description, canonicalUrl, ogType, ogImage, ogImageAlt, extraTags = '', jsonLd }) {
  let html = templateHtml;

  // 1. Remove generic title, description, and canonical
  html = html.replace(/<title>[\s\S]*?<\/title>/, '');
  html = html.replace(/<meta name="description"[^>]*>\s*/g, '');
  html = html.replace(/<link rel="canonical"[^>]*>\s*/g, '');

  // 2. Strip homepage OG and Twitter tags
  html = html.replace(/<!-- Open Graph \/ Facebook -->[\s\S]*?<!-- Pinterest Domain Verification -->/, '<!-- Pinterest Domain Verification -->');
  html = html.replace(/<meta property="og:[^>]*>\s*/g, '');
  html = html.replace(/<meta name="twitter:[^>]*>\s*/g, '');
  html = html.replace(/<meta property="product:[^>]*>\s*/g, '');
  html = html.replace(/<meta property="article:[^>]*>\s*/g, '');

  const headReplacements = `
    <title>${title}</title>
    <meta name="description" content="${description.replace(/"/g, '&quot;')}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${ogType || 'website'}" />
    <meta property="og:site_name" content="CozyStitches" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:alt" content="${(ogImageAlt || title).replace(/"/g, '&quot;')}" />
    ${extraTags}

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${ogImage}" />

    <!-- Structured Data (Schema.org) -->
    <script type="application/ld+json">
    ${JSON.stringify(jsonLd, null, 2)}
    </script>
  `;

  return html.replace('</head>', `${headReplacements}\n  </head>`);
}

// ── 6. Prerender Product Pages ────────────────────────────────
function prerenderProductPages(templateHtml) {
  for (const product of products) {
    const seo = getProductSEO(product);

    const materialsHtml = (product.materials || [])
      .map((m) => `<li>${m}</li>`)
      .join('');
    const sectionsHtml = (product.sections || [])
      .map((s) => `<li>${s}</li>`)
      .join('');

    // Internal links to related patterns + blog tutorial
    const otherProducts = products.filter((p) => p.id !== product.id);
    const relatedHtml = otherProducts
      .map(
        (rel) => `
        <li style="margin-bottom: 8px;">
          <a href="/product/${rel.id}" style="color: #be6c87; font-weight: 600; text-decoration: none;">
            ${rel.name} Crochet Pattern (PDF) — $${Number(rel.price).toFixed(2)}
          </a>
        </li>
      `
      )
      .join('');

    // If this is the Free Shooting Star (id: 2), link to the blog article guide
    const blogGuideLink = product.id === 2 ? `
      <div style="margin-top: 16px; padding: 14px 18px; background: #fee6ea; border-radius: 12px; border-left: 4px solid #be6c87;">
        <strong>📖 Step-by-Step Tutorial:</strong> Read our complete free guide on
        <a href="/blog/free-shooting-star-crochet-pattern-keychain" style="color: #be6c87; font-weight: 700; text-decoration: underline;">
          How to Crochet the Shooting Star Keychain
        </a> with stitch tips, color codes, and photo walk-through.
      </div>
    ` : '';

    const semanticContent = `
      <div class="pdp-container prerendered-static" style="max-width: 1100px; margin: 0 auto; padding: 24px 16px;">
        <nav aria-label="Breadcrumb" style="font-size: 13px; margin-bottom: 20px; color: #7f6885;">
          <a href="/" style="color: #be6c87; text-decoration: none;">Home</a> &gt;
          <a href="/#products" style="color: #be6c87; text-decoration: none;">Patterns</a> &gt;
          <span>${product.name}</span>
        </nav>
        <article style="display: flex; flex-wrap: wrap; gap: 40px;">
          <div style="flex: 1 1 420px; text-align: center;">
            <img src="${product.primaryImage}" alt="${product.name} handmade crochet amigurumi pattern PDF" width="480" height="480" style="max-width: 100%; height: auto; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.06);" />
          </div>
          <div style="flex: 1 1 450px;">
            <div style="display: inline-block; background: #fee6ea; color: #be6c87; padding: 4px 12px; border-radius: 50px; font-size: 12px; font-weight: 700; text-transform: uppercase;">
              ${product.skill} • Digital Pattern PDF
            </div>
            <h1 style="font-size: 32px; color: #482750; margin: 12px 0 8px;">${product.name}</h1>
            <div style="font-size: 14px; color: #7f6885; margin: 8px 0 14px;">
              📄 Instant Download PDF &bull; 🪡 ${product.terms || 'US Terms'} &bull; 📐 ${product.hook || '3.0 mm'} Hook
            </div>
            ${product.id === 2 || product.isFree ? `
            <div style="font-size: 26px; font-weight: 800; color: #059669; margin-bottom: 16px;">
              100% FREE PDF
            </div>` : `
            <div style="font-size: 26px; font-weight: 800; color: #be6c87; margin-bottom: 16px;">
              ${Number(product.price).toFixed(2)} USD
            </div>`}
            <p style="font-size: 15px; line-height: 1.6; color: #554458;">${product.description}</p>
            ${blogGuideLink}
            <div style="background: #fdf8fa; border: 1px solid #f2e1ea; border-radius: 12px; padding: 16px; margin: 20px 0;">
              <p style="margin: 4px 0;"><strong>📄 File Format:</strong> Instant Download PDF (${product.pages || 6} pages with step photos)</p>
              <p style="margin: 4px 0;"><strong>🪡 Recommended Hook:</strong> ${product.hook || '3.0 mm'}</p>
              <p style="margin: 4px 0;"><strong>📐 Language &amp; Terms:</strong> ${product.terms || 'US Terms'}</p>
              <p style="margin: 4px 0;"><strong>🔒 Delivery:</strong> Immediate access + email backup</p>
            </div>
            ${materialsHtml ? `<div style="margin-top: 20px;"><h3 style="color: #482750; font-size: 16px;">Materials Required:</h3><ul style="color: #554458; line-height: 1.6;">${materialsHtml}</ul></div>` : ''}
            ${sectionsHtml ? `<div style="margin-top: 20px;"><h3 style="color: #482750; font-size: 16px;">Pattern Sections:</h3><ul style="color: #554458; line-height: 1.6;">${sectionsHtml}</ul></div>` : ''}
            ${(() => {
              if (product.id === 2 || product.isFree) {
                return `<div style="margin-top: 28px;">
                  <a href="/#freebie" style="display: inline-block; background: #059669; color: #ffffff; padding: 14px 28px; border-radius: 50px; font-weight: 700; text-decoration: none; font-size: 15px; box-shadow: 0 4px 14px rgba(5,150,105,0.3);">
                    Get Free PDF Pattern
                  </a>
                </div>`;
              }
              if (product.soldOut) {
                return `<div style="margin-top: 28px;">
                  <span style="display: inline-block; background: #e0d5e2; color: #7f6885; padding: 14px 28px; border-radius: 50px; font-weight: 700; font-size: 15px;">
                    Sold Out — Restocking Soon
                  </span>
                </div>`;
              }
              const directCheckout = product.buyUrl || `/checkout/${product.id}`;
              return `<div style="margin-top: 28px;">
                <a href="${directCheckout}" style="display: inline-block; background: #be6c87; color: #ffffff; padding: 14px 28px; border-radius: 50px; font-weight: 700; text-decoration: none; font-size: 15px;">
                  Instant Checkout — $${Number(product.price).toFixed(2)}
                </a>
              </div>`;
            })()}
            <div style="margin-top: 36px; padding-top: 24px; border-top: 1px solid #ebd9ea;">
              <h3 style="color: #482750; font-size: 18px; margin-bottom: 12px;">More Amigurumi &amp; Crochet Patterns</h3>
              <ul style="padding-left: 20px;">
                ${relatedHtml}
              </ul>
            </div>
          </div>
        </article>
      </div>
    `;

    const extraTags = `
    <meta property="product:price:amount" content="${Number(product.price).toFixed(2)}" />
    <meta property="product:price:currency" content="USD" />
    `;

    let productHtml = injectSEOHead(templateHtml, {
      title: seo.seoTitle,
      description: seo.seoDescription,
      canonicalUrl: seo.canonicalUrl,
      ogType: 'product',
      ogImage: seo.imageUrl,
      ogImageAlt: `${product.name} Crochet Pattern PDF`,
      extraTags,
      jsonLd: seo.jsonLd
    });

    productHtml = productHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${semanticContent}</div>`
    );

    // Save into dist/product/:id/index.html and dist/product/:id.html
    const idDir = path.join(rootDir, 'dist', 'product', String(product.id));
    fs.mkdirSync(idDir, { recursive: true });
    fs.writeFileSync(path.join(idDir, 'index.html'), productHtml, 'utf8');
    fs.writeFileSync(path.join(rootDir, 'dist', 'product', `${product.id}.html`), productHtml, 'utf8');

    if (product.slug) {
      const slugDir = path.join(rootDir, 'dist', 'product', product.slug);
      fs.mkdirSync(slugDir, { recursive: true });
      fs.writeFileSync(path.join(slugDir, 'index.html'), productHtml, 'utf8');
      fs.writeFileSync(path.join(rootDir, 'dist', 'product', `${product.slug}.html`), productHtml, 'utf8');
    }

    console.log(`✓ Prerendered /product/${product.id} (${product.name})`);
  }
}

// ── 7. Prerender Blog Pages ───────────────────────────────────
function prerenderBlogPages(templateHtml) {
  // A. /blog Index Page
  const blogIndexTitle = "Crochet Blog & Free Amigurumi Tutorials | CozyStitches";
  const blogIndexDesc = "Explore free crochet patterns, amigurumi tutorials, beginner stitch guides, and crafty tips from CozyStitches Studio.";
  const blogIndexCanonical = `${SITE_URL}/blog`;
  const blogIndexImg = `${SITE_URL}/images/products/shooting-star/star-1.png`;

  const indexJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "CozyStitches Crochet Blog",
    "description": blogIndexDesc,
    "url": blogIndexCanonical,
    "publisher": {
      "@type": "Organization",
      "name": "CozyStitches",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/cozy-stitches-brand-logo.svg`
      }
    },
    "blogPost": blogPosts.map((p) => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "url": `${SITE_URL}/blog/${p.slug}`,
      "datePublished": p.publishedAt,
      "author": {
        "@type": "Organization",
        "name": p.author?.name || "CozyStitches Studio"
      }
    }))
  };

  const blogPostsListHtml = blogPosts.map((post) => `
    <article style="background: #ffffff; border: 1px solid #ebd9ea; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(72,39,80,0.06); margin-bottom: 24px;">
      <a href="/blog/${post.slug}" style="text-decoration: none; color: inherit; display: block;">
        <img src="${post.primaryImage}" alt="${post.title}" style="width: 100%; height: 260px; object-fit: cover;" />
        <div style="padding: 24px;">
          <div style="display: flex; gap: 8px; margin-bottom: 10px;">
            <span style="background: #fee6ea; color: #be6c87; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 50px; text-transform: uppercase;">
              ${post.category}
            </span>
            <span style="color: #7f6885; font-size: 12px; align-self: center;">
              ${post.readingTime} &bull; ${post.publishedAt ? post.publishedAt.split('T')[0] : TODAY}
            </span>
          </div>
          <h2 style="font-size: 22px; color: #482750; margin: 0 0 10px; font-family: Georgia, serif;">${post.title}</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #554458; margin-bottom: 16px;">${post.excerpt || post.description}</p>
          <span style="color: #be6c87; font-weight: 700; font-size: 14px; display: inline-flex; align-items: center; gap: 6px;">
            Read Free Tutorial &rarr;
          </span>
        </div>
      </a>
    </article>
  `).join('');

  const blogIndexSemantic = `
    <div class="blog-index-container prerendered-static" style="max-width: 1040px; margin: 0 auto; padding: 40px 16px;">
      <header style="text-align: center; margin-bottom: 40px;">
        <span style="display: inline-block; background: #fee6ea; color: #be6c87; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
          CozyStitches Knowledge Base
        </span>
        <h1 style="font-size: 38px; color: #482750; font-family: Georgia, serif; margin: 0 0 14px;">Crochet Tutorials &amp; Free Guides</h1>
        <p style="font-size: 16px; color: #7f6885; max-width: 640px; margin: 0 auto 24px; line-height: 1.6;">
          Free downloadable crochet patterns, beginner amigurumi stitch walkthroughs, and assembly tips to help you crochet with confidence.
        </p>
      </header>
      <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;">
        ${blogPostsListHtml}
      </section>
      <section style="margin-top: 50px; background: linear-gradient(135deg, #fdf4f8, #fee6ea); border: 1px solid #ebd9ea; border-radius: 24px; padding: 36px 24px; text-align: center;">
        <h2 style="font-size: 24px; color: #482750; font-family: Georgia, serif; margin-bottom: 8px;">Want the Complete Free Shooting Star PDF?</h2>
        <p style="font-size: 15px; color: #7f6885; max-width: 520px; margin: 0 auto 20px; line-height: 1.6;">
          Get our 6-page printable guide with high-resolution stitch photos, color placement charts, and printable notes sent instantly to your inbox.
        </p>
        <a href="/#freebie" style="display: inline-block; background: #be6c87; color: #ffffff; padding: 14px 32px; border-radius: 50px; font-weight: 700; text-decoration: none; font-size: 15px; box-shadow: 0 4px 16px rgba(190,108,135,0.3);">
          Download Free PDF Pattern &rarr;
        </a>
      </section>
    </div>
  `;

  let blogIndexHtml = injectSEOHead(templateHtml, {
    title: blogIndexTitle,
    description: blogIndexDesc,
    canonicalUrl: blogIndexCanonical,
    ogType: 'website',
    ogImage: blogIndexImg,
    ogImageAlt: 'CozyStitches Crochet Blog & Tutorials',
    jsonLd: indexJsonLd
  });

  blogIndexHtml = blogIndexHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${blogIndexSemantic}</div>`
  );

  const blogDir = path.join(rootDir, 'dist', 'blog');
  fs.mkdirSync(blogDir, { recursive: true });
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogIndexHtml, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'dist', 'blog.html'), blogIndexHtml, 'utf8');
  console.log('✓ Prerendered /blog (Blog Index)');

  // B. Individual /blog/:slug Articles
  for (const post of blogPosts) {
    const postCanonical = `${SITE_URL}/blog/${post.slug}`;
    const postCoverImg = post.primaryImage.startsWith('http') ? post.primaryImage : `${SITE_URL}${post.primaryImage}`;

    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postCanonical
      },
      "headline": post.title,
      "description": post.description,
      "image": [postCoverImg],
      "datePublished": post.publishedAt,
      "dateModified": post.updatedAt || post.publishedAt,
      "author": {
        "@type": "Organization",
        "name": post.author?.name || "CozyStitches Studio"
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
          "item": postCanonical
        }
      ]
    };

    const compositeJsonLd = {
      "@context": "https://schema.org",
      "@graph": [articleJsonLd, breadcrumbsJsonLd]
    };

    const extraArticleTags = `
    <meta property="article:published_time" content="${post.publishedAt}" />
    <meta property="article:modified_time" content="${post.updatedAt || post.publishedAt}" />
    <meta property="article:author" content="${post.author?.name || 'CozyStitches'}" />
    <meta property="article:section" content="${post.category}" />
    ${(post.tags || []).map((k) => `<meta property="article:tag" content="${k}" />`).join('\n    ')}
    `;

    // Semantic article body
    const materialsLi = (post.materials || []).map((m) => `<li>${m}</li>`).join('');
    const abbrevTr = (post.abbreviations || []).map((a) => `
      <tr>
        <td style="padding: 8px 12px; border: 1px solid #f2e1ea; font-weight: 700; color: #be6c87;">${a.code}</td>
        <td style="padding: 8px 12px; border: 1px solid #f2e1ea; color: #554458;">${a.meaning}</td>
      </tr>
    `).join('');

    const sectionsHtml = (post.sections || []).map((sec) => `
      <section style="margin: 36px 0;">
        <h2 style="font-size: 24px; color: #482750; font-family: Georgia, serif; margin-bottom: 12px; border-bottom: 2px solid #fee6ea; padding-bottom: 8px;">
          ${sec.heading}
        </h2>
        <div style="font-size: 16px; line-height: 1.7; color: #423046;">
          ${sec.content.replace(/\n\n/g, '<br/><br/>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}
        </div>
      </section>
    `).join('');

    // Cross-promotion links to shop products
    const relatedProducts = products.filter((p) => (post.relatedProducts || []).includes(p.id));
    const relatedProductsHtml = relatedProducts.map((p) => `
      <div style="background: #ffffff; border: 1px solid #ebd9ea; border-radius: 16px; padding: 16px; display: flex; gap: 16px; align-items: center; margin-bottom: 14px;">
        <img src="${p.primaryImage}" alt="${p.name}" width="80" height="80" style="border-radius: 12px; object-fit: cover;" />
        <div style="flex: 1;">
          <h4 style="margin: 0 0 4px; font-size: 16px; color: #482750;">${p.name}</h4>
          <p style="margin: 0 0 6px; font-size: 13px; color: #7f6885;">${p.skill} &bull; ${p.pages || 6}-page digital pattern PDF</p>
          <a href="/product/${p.id}" style="color: #be6c87; font-weight: 700; font-size: 13px; text-decoration: none;">
            View Pattern ($${Number(p.price).toFixed(2)}) &rarr;
          </a>
        </div>
      </div>
    `).join('');

    const articleSemantic = `
      <div class="blog-post-container prerendered-static" style="max-width: 860px; margin: 0 auto; padding: 32px 16px;">
        <nav aria-label="Breadcrumb" style="font-size: 13px; margin-bottom: 20px; color: #7f6885;">
          <a href="/" style="color: #be6c87; text-decoration: none;">Home</a> &gt;
          <a href="/blog" style="color: #be6c87; text-decoration: none;">Blog</a> &gt;
          <span>${post.title}</span>
        </nav>
        <article>
          <header style="margin-bottom: 28px;">
            <div style="display: flex; gap: 8px; margin-bottom: 12px;">
              <span style="background: #fee6ea; color: #be6c87; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 50px; text-transform: uppercase;">
                ${post.category}
              </span>
              <span style="color: #7f6885; font-size: 13px; align-self: center;">
                ${post.readingTime} &bull; Published ${post.publishedAt ? post.publishedAt.split('T')[0] : TODAY}
              </span>
            </div>
            <h1 style="font-size: 34px; line-height: 1.25; color: #482750; font-family: Georgia, serif; margin: 0 0 16px;">
              ${post.title}
            </h1>
            <p style="font-size: 17px; line-height: 1.6; color: #554458;">
              ${post.excerpt || post.description}
            </p>
            <div style="margin-top: 14px; font-size: 14px; color: #7f6885;">
              By <strong>${post.author?.name || 'CozyStitches Studio'}</strong> &bull; ${post.author?.role || 'Designer'}
            </div>
          </header>

          <figure style="margin: 0 0 32px; text-align: center;">
            <img src="${post.primaryImage}" alt="${post.title}" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 20px; box-shadow: 0 8px 30px rgba(72,39,80,0.08);" />
            <figcaption style="font-size: 13px; color: #7f6885; margin-top: 8px; font-style: italic;">
              ${post.title}
            </figcaption>
          </figure>

          <!-- Quick Specs Box -->
          ${post.specs ? `
          <div style="background: #fdf8fa; border: 1px solid #ebd9ea; border-radius: 16px; padding: 20px; margin-bottom: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; text-align: center;">
            <div>
              <div style="font-size: 12px; color: #7f6885; text-transform: uppercase; font-weight: 600;">Skill Level</div>
              <div style="font-size: 16px; font-weight: 700; color: #482750; margin-top: 4px;">${post.specs.skillLevel}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: #7f6885; text-transform: uppercase; font-weight: 600;">Hook Size</div>
              <div style="font-size: 16px; font-weight: 700; color: #482750; margin-top: 4px;">${post.specs.hookSize}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: #7f6885; text-transform: uppercase; font-weight: 600;">Finished Size</div>
              <div style="font-size: 16px; font-weight: 700; color: #482750; margin-top: 4px;">${post.specs.finishedSize}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: #7f6885; text-transform: uppercase; font-weight: 600;">Terms Used</div>
              <div style="font-size: 16px; font-weight: 700; color: #482750; margin-top: 4px;">${post.specs.terms}</div>
            </div>
          </div>
          ` : ''}

          <!-- Materials & Abbreviations -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 36px;">
            <div style="background: #ffffff; border: 1px solid #ebd9ea; border-radius: 16px; padding: 20px;">
              <h3 style="color: #482750; font-size: 18px; margin-top: 0; margin-bottom: 12px;">🧶 Materials Needed</h3>
              <ul style="color: #554458; line-height: 1.6; padding-left: 20px;">
                ${materialsLi}
              </ul>
            </div>
            <div style="background: #ffffff; border: 1px solid #ebd9ea; border-radius: 16px; padding: 20px;">
              <h3 style="color: #482750; font-size: 18px; margin-top: 0; margin-bottom: 12px;">📐 Abbreviations</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tbody>
                  ${abbrevTr}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Content Sections -->
          <div class="blog-body-sections">
            ${sectionsHtml}
          </div>

          <!-- Freebie Call to Action -->
          <div style="margin: 48px 0; background: linear-gradient(135deg, #fdf4f8, #fee6ea); border: 2px dashed #be6c87; border-radius: 20px; padding: 32px; text-align: center;">
            <div style="font-size: 32px; margin-bottom: 8px;">🎁</div>
            <h3 style="font-size: 24px; color: #482750; font-family: Georgia, serif; margin: 0 0 10px;">
              Get the Free 6-Page Printable PDF Guide
            </h3>
            <p style="font-size: 15px; color: #554458; max-width: 540px; margin: 0 auto 20px; line-height: 1.6;">
              Prefer a clean printable version with large photo diagrams and step-by-step assembly guides? Enter your email on our homepage to get instant free access.
            </p>
            <a href="/#freebie" style="display: inline-block; background: #059669; color: #ffffff; padding: 14px 32px; border-radius: 50px; font-weight: 700; text-decoration: none; font-size: 15px; box-shadow: 0 4px 14px rgba(5,150,105,0.3);">
              Get the Free PDF Pattern &rarr;
            </a>
          </div>

          <!-- Related Patterns / Cross Sell -->
          ${relatedProductsHtml ? `
          <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #ebd9ea;">
            <h3 style="color: #482750; font-size: 22px; font-family: Georgia, serif; margin-bottom: 16px;">
              More Cute Crochet Patterns You'll Love
            </h3>
            <p style="font-size: 14px; color: #7f6885; margin-bottom: 18px;">
              Explore our full collection of beginner-friendly amigurumi and holiday crochet patterns:
            </p>
            <div>
              ${relatedProductsHtml}
            </div>
            <div style="margin-top: 16px; text-align: center;">
              <a href="/#products" style="color: #be6c87; font-weight: 700; text-decoration: underline;">
                Browse All 6 Patterns &rarr;
              </a>
            </div>
          </div>
          ` : ''}
        </article>
      </div>
    `;

    let postHtml = injectSEOHead(templateHtml, {
      title: post.seoTitle || `${post.title} | CozyStitches Blog`,
      description: post.description,
      canonicalUrl: postCanonical,
      ogType: 'article',
      ogImage: postCoverImg,
      ogImageAlt: post.title,
      extraTags: extraArticleTags,
      jsonLd: compositeJsonLd
    });

    postHtml = postHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${articleSemantic}</div>`
    );

    const postDir = path.join(rootDir, 'dist', 'blog', post.slug);
    fs.mkdirSync(postDir, { recursive: true });
    fs.writeFileSync(path.join(postDir, 'index.html'), postHtml, 'utf8');
    fs.writeFileSync(path.join(rootDir, 'dist', 'blog', `${post.slug}.html`), postHtml, 'utf8');
    console.log(`✓ Prerendered /blog/${post.slug} (${post.title})`);
  }
}

// ── Execute Pipeline ──────────────────────────────────────────
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

// 1. Generate sitemap.xml
const sitemapXml = generateSitemap();
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
}
console.log('✓ sitemap.xml generated with products and blog posts');

// 2. Generate robots.txt
const robotsTxt = generateRobots();
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
}
console.log('✓ robots.txt generated and configured');

// 3. Generate 404.html
const notFoundHtml = generate404Html();
fs.writeFileSync(path.join(publicDir, '404.html'), notFoundHtml, 'utf8');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf8');
}
console.log('✓ 404.html generated for HTTP 404 responses');

// 4. Prerender product and blog pages if dist exists
const distIndex = path.join(distDir, 'index.html');
if (fs.existsSync(distIndex)) {
  const templateHtml = fs.readFileSync(distIndex, 'utf8');
  prerenderProductPages(templateHtml);
  prerenderBlogPages(templateHtml);
} else {
  console.warn('! dist/index.html not found, prerender skipped (will run post-build).');
}

console.log('[SEO Generator] Completed successfully! 🎉');
