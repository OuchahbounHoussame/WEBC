import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Import real products data
const productsModule = await import('../src/data/products.js');
const products = productsModule.products || [];

const SITE_URL = 'https://www.shopcozystitches.com';
const TODAY = new Date().toISOString().split('T')[0];

console.log(`[SEO Generator] Starting SEO generation for ${products.length} products...`);

// ── 1. Helper for Product SEO Metadata ────────────────────────
function getProductSEO(product) {
  let seoTitle = `${product.name} Crochet Pattern | CozyStitches`;
  let seoDescription = product.description;

  if (product.id === 1) {
    seoTitle = `Space Crewmate Amigurumi Crochet Pattern | CozyStitches`;
    seoDescription = `Crochet your own space crewmate with this 6-page digital PDF amigurumi pattern. Includes US terms, step-by-step photos, backpack, visor & highlight details.`;
  } else if (product.id === 2) {
    seoTitle = `Shooting Star Keychain Crochet Pattern | CozyStitches`;
    seoDescription = `Create a cute pastel shooting star keychain with this 6-page digital PDF crochet pattern. Includes US terms, photo tutorial, and rainbow tail assembly.`;
  } else if (product.id === 3) {
    seoTitle = `Crochet Glasses Holder PDF Pattern | CozyStitches`;
    seoDescription = `Create adorable crochet glasses holders with this downloadable PDF pattern. Explore step-by-step instructions and start your next crochet project.`;
  } else if (product.id === 4) {
    seoTitle = `Graduate Doll Amigurumi Crochet Pattern | CozyStitches`;
    seoDescription = `Handmade graduation keepsake amigurumi doll pattern. 11-page digital PDF tutorial with cap, gold tassel, gown, diploma scroll and floral bouquet in US terms.`;
  }

  const canonicalUrl = `${SITE_URL}/product/${product.id}`;
  const imageUrl = product.primaryImage.startsWith('http')
    ? product.primaryImage
    : `${SITE_URL}${product.primaryImage}`;

  const allImages = (product.images && product.images.length > 0)
    ? product.images.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`))
    : [imageUrl];

  // Strictly genuine Schema.org Product markup
  // Excludes unverified reviews/ratings and physical shipping/returns per digital goods guidelines
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
      "price": Number(product.price).toFixed(2),
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
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
  </url>`
  ];

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
  <title>404: Pattern Not Found | CozyStitches</title>
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
    }
    a.btn:hover { background: #ab5772; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🧶</div>
    <h1>404 — Pattern Not Found</h1>
    <p>We couldn't find the crochet pattern you're looking for. It may have been retired or the link might be out of date.</p>
    <a href="/" class="btn">&larr; Return to All Patterns</a>
  </div>
</body>
</html>`;
}

// ── 5. Prerender Product Pages ────────────────────────────────
function prerenderProductPages(templateHtml) {
  for (const product of products) {
    const seo = getProductSEO(product);

    // Build semantic fallback HTML that renders if JS is not executed (Googlebot WRS initial fetch)
    const materialsHtml = (product.materials || [])
      .map((m) => `<li>${m}</li>`)
      .join('');
    const sectionsHtml = (product.sections || [])
      .map((s) => `<li>${s}</li>`)
      .join('');

    // Internal links to related patterns
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
            <div style="font-size: 26px; font-weight: 800; color: #be6c87; margin-bottom: 16px;">
              ${Number(product.price).toFixed(2)} USD
            </div>
            <p style="font-size: 15px; line-height: 1.6; color: #554458;">${product.description}</p>
            <div style="background: #fdf8fa; border: 1px solid #f2e1ea; border-radius: 12px; padding: 16px; margin: 20px 0;">
              <p style="margin: 4px 0;"><strong>📄 File Format:</strong> Instant Download PDF (${product.pages || 6} pages with step photos)</p>
              <p style="margin: 4px 0;"><strong>🪡 Recommended Hook:</strong> ${product.hook || '3.0 mm'}</p>
              <p style="margin: 4px 0;"><strong>📐 Language &amp; Terms:</strong> ${product.terms || 'US Terms'}</p>
              <p style="margin: 4px 0;"><strong>🔒 Delivery:</strong> Immediate access + email backup</p>
            </div>
            ${materialsHtml ? `<div style="margin-top: 20px;"><h3 style="color: #482750; font-size: 16px;">Materials Required:</h3><ul style="color: #554458; line-height: 1.6;">${materialsHtml}</ul></div>` : ''}
            ${sectionsHtml ? `<div style="margin-top: 20px;"><h3 style="color: #482750; font-size: 16px;">Pattern Sections:</h3><ul style="color: #554458; line-height: 1.6;">${sectionsHtml}</ul></div>` : ''}
            ${(() => {
              const directCheckout = (product.id === 4 && product.buyUrl) ? product.buyUrl : `/checkout/${product.id}`;
              return `<div style="margin-top: 28px;">
                <a href="${directCheckout}" style="display: inline-block; background: #be6c87; color: #ffffff; padding: 14px 28px; border-radius: 50px; font-weight: 700; text-decoration: none; font-size: 15px;">
                  Instant Checkout — ${Number(product.price).toFixed(2)}
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

    // Construct custom <head> tags for this product
    const headReplacements = `
    <title>${seo.seoTitle}</title>
    <meta name="description" content="${seo.seoDescription.replace(/"/g, '&quot;')}" />
    <link rel="canonical" href="${seo.canonicalUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="product" />
    <meta property="og:site_name" content="CozyStitches" />
    <meta property="og:url" content="${seo.canonicalUrl}" />
    <meta property="og:title" content="${seo.seoTitle.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${seo.seoDescription.replace(/"/g, '&quot;')}" />
    <meta property="og:image" content="${seo.imageUrl}" />
    <meta property="og:image:alt" content="${product.name} Crochet Pattern PDF" />
    <meta property="product:price:amount" content="${Number(product.price).toFixed(2)}" />
    <meta property="product:price:currency" content="USD" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seo.seoTitle.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${seo.seoDescription.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${seo.imageUrl}" />

    <!-- Product Structured Data (Schema.org) -->
    <script type="application/ld+json" id="product-schema-jsonld">
    ${JSON.stringify(seo.jsonLd, null, 2)}
    </script>
    `;

    let productHtml = templateHtml;

    // 1. Remove generic title, description, and canonical
    productHtml = productHtml.replace(/<title>[\s\S]*?<\/title>/, '');
    productHtml = productHtml.replace(/<meta name="description"[^>]*>\s*/g, '');
    productHtml = productHtml.replace(/<link rel="canonical"[^>]*>\s*/g, '');

    // 2. STRIP ALL HOMEPAGE OPEN GRAPH & TWITTER TAGS TO PREVENT DUPLICATES
    productHtml = productHtml.replace(/<!-- Open Graph \/ Facebook -->[\s\S]*?<!-- Pinterest Domain Verification -->/, '<!-- Pinterest Domain Verification -->');
    productHtml = productHtml.replace(/<meta property="og:[^>]*>\s*/g, '');
    productHtml = productHtml.replace(/<meta name="twitter:[^>]*>\s*/g, '');
    productHtml = productHtml.replace(/<meta property="product:[^>]*>\s*/g, '');

    // 3. Insert unique product head tags before </head>
    productHtml = productHtml.replace('</head>', `${headReplacements}\n  </head>`);

    // Inject semantic content into <div id="root">
    productHtml = productHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${semanticContent}</div>`
    );

    // Save into dist/product/:id/index.html and dist/product/:id.html
    const idDir = path.join(rootDir, 'dist', 'product', String(product.id));
    fs.mkdirSync(idDir, { recursive: true });
    fs.writeFileSync(path.join(idDir, 'index.html'), productHtml, 'utf8');
    fs.writeFileSync(path.join(rootDir, 'dist', 'product', `${product.id}.html`), productHtml, 'utf8');

    // Also write slug alias with canonical pointing to /product/:id
    if (product.slug) {
      const slugDir = path.join(rootDir, 'dist', 'product', product.slug);
      fs.mkdirSync(slugDir, { recursive: true });
      fs.writeFileSync(path.join(slugDir, 'index.html'), productHtml, 'utf8');
      fs.writeFileSync(path.join(rootDir, 'dist', 'product', `${product.slug}.html`), productHtml, 'utf8');
    }

    console.log(`✓ Prerendered /product/${product.id} (${product.name})`);
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
console.log('✓ sitemap.xml generated with all products');

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

// 4. Prerender product pages if dist exists
const distIndex = path.join(distDir, 'index.html');
if (fs.existsSync(distIndex)) {
  const templateHtml = fs.readFileSync(distIndex, 'utf8');
  prerenderProductPages(templateHtml);
} else {
  console.warn('! dist/index.html not found, prerender skipped (will run post-build).');
}

console.log('[SEO Generator] Completed successfully! 🎉');
