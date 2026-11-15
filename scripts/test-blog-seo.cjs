/**
 * CozyStitches Blog & Technical SEO Verification Suite
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('🧪 Starting Blog & SEO Technical Verification Suite...\n');

  // ── 1. Static Prerendered Files Existence ───────────────────
  console.log('Test Group 1: Static Prerender Output Files');
  const blogIndexPath = path.join(distDir, 'blog', 'index.html');
  const articlePath = path.join(distDir, 'blog', 'free-shooting-star-crochet-pattern-keychain', 'index.html');
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  const robotsPath = path.join(distDir, 'robots.txt');

  assert(fs.existsSync(blogIndexPath), 'dist/blog/index.html exists');
  assert(fs.existsSync(articlePath), 'dist/blog/free-shooting-star-crochet-pattern-keychain/index.html exists');
  assert(fs.existsSync(sitemapPath), 'dist/sitemap.xml exists');
  assert(fs.existsSync(robotsPath), 'dist/robots.txt exists');

  // ── 2. Blog Index HTML SEO & Content Audit ─────────────────
  console.log('\nTest Group 2: Blog Index HTML SEO Audit');
  const blogIndexHtml = fs.readFileSync(blogIndexPath, 'utf8');

  assert(blogIndexHtml.includes('<title>Crochet Blog &amp; Free Amigurumi Tutorials | CozyStitches</title>') ||
         blogIndexHtml.includes('<title>Crochet Blog & Free Amigurumi Tutorials | CozyStitches</title>'), 'Blog index has unique SEO title');
  assert(blogIndexHtml.includes('<link rel="canonical" href="https://www.shopcozystitches.com/blog" />'), 'Blog index has canonical tag to /blog');
  assert(blogIndexHtml.includes('property="og:type" content="website"'), 'Blog index has og:type website');
  assert(blogIndexHtml.includes('"@type": "Blog"'), 'Blog index has Schema.org Blog structured data');
  assert(blogIndexHtml.includes('Free Shooting Star Crochet Pattern: Make a Cute Keychain'), 'Blog index lists first article title');
  assert(blogIndexHtml.includes('/blog/free-shooting-star-crochet-pattern-keychain'), 'Blog index links to first article slug');
  assert(blogIndexHtml.includes('href="/#freebie"'), 'Blog index links to freebie landing section');

  // ── 3. Shooting Star Article HTML SEO & Pattern Integrity ──
  console.log('\nTest Group 3: Shooting Star Article Verification');
  const articleHtml = fs.readFileSync(articlePath, 'utf8');

  assert(articleHtml.includes('Free Shooting Star Crochet Pattern: Make a Cute Keychain'), 'Article page has accurate title');
  assert(articleHtml.includes('<link rel="canonical" href="https://www.shopcozystitches.com/blog/free-shooting-star-crochet-pattern-keychain" />'), 'Article has unique canonical tag');
  assert(articleHtml.includes('property="og:type" content="article"'), 'Article has og:type article');
  assert(articleHtml.includes('"@type": "BlogPosting"'), 'Article includes Schema.org BlogPosting markup');
  assert(articleHtml.includes('"@type": "BreadcrumbList"'), 'Article includes Schema.org BreadcrumbList markup');

  // Verified pattern details (strict no-invention requirement)
  assert(articleHtml.includes('3.0 mm'), 'Pattern specifies 3.0 mm hook (verified)');
  assert(articleHtml.includes('8/6 cotton yarn'), 'Pattern specifies 8/6 cotton yarn (verified)');
  assert(articleHtml.includes('6 mm'), 'Pattern specifies 6 mm safety eyes (verified)');
  assert(articleHtml.includes('Round 1:</b>') || articleHtml.includes('Round 1:</strong>') || articleHtml.includes('Work 5 sc into a Magic Ring'), 'Includes verified stitch counts for circles');
  assert(articleHtml.includes('Lilac') && articleHtml.includes('Pink') && articleHtml.includes('Aqua Green'), 'Includes verified ribbon color specifications');
  assert(articleHtml.includes('cold') || articleHtml.includes('silicone') || articleHtml.includes('craft glue'), 'Mentions verified cold silicone assembly note');

  // Internal linking & conversion paths
  assert(articleHtml.includes('href="/#freebie"'), 'Article contains prominent CTA link to free pattern PDF (/#freebie)');
  assert(articleHtml.includes('/product/2'), 'Article cross-promotes product 2 (Shooting Star)');
  assert(articleHtml.includes('/product/6'), 'Article cross-promotes product 6 (Christmas Collection)');
  assert(articleHtml.includes('href="/blog"'), 'Article contains breadcrumb navigation back to /blog');

  // ── 4. Sitemap & Robots Audit ──────────────────────────────
  console.log('\nTest Group 4: Sitemap & Robots.txt Verification');
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const robotsTxt = fs.readFileSync(robotsPath, 'utf8');

  assert(sitemapXml.includes('<loc>https://www.shopcozystitches.com/blog</loc>'), 'Sitemap includes /blog');
  assert(sitemapXml.includes('<loc>https://www.shopcozystitches.com/blog/free-shooting-star-crochet-pattern-keychain</loc>'), 'Sitemap includes article URL');
  assert(sitemapXml.includes('<image:loc>'), 'Sitemap contains image SEO tags for rich snippets');
  assert(robotsTxt.includes('Allow: /blog'), 'robots.txt explicitly allows /blog');
  assert(robotsTxt.includes('Allow: /blog/'), 'robots.txt explicitly allows /blog/');

  // ── 5. Product 2 Tutorial Link & Product 6 Ordering ────────
  console.log('\nTest Group 5: Product Page Internal Linking & Catalog Ordering');
  const product2Path = path.join(distDir, 'product', '2', 'index.html');
  const product2Html = fs.readFileSync(product2Path, 'utf8');
  assert(product2Html.includes('/blog/free-shooting-star-crochet-pattern-keychain'), 'Product 2 page has contextual internal link to its blog tutorial');

  const productsModule = await import('../src/data/products.js');
  const products = productsModule.products;
  assert(products[0].id === 6, 'Product 6 (Christmas Collection 5-in-1) is Position 1 in catalog');
  assert(products[1].id === 5, 'Product 5 (Plush Santa Claus) is Position 2 in catalog');
  assert(products.length === 6, 'All 6 products are present and cleanly defined');

  // ── 6. Live HTTP Server Responses (Express) ────────────────
  console.log('\nTest Group 6: Live HTTP Server Endpoint Responses');
  const appModule = await import('../server/app.js');
  const app = appModule.default;

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;

  function fetchUrl(pathname) {
    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}${pathname}`, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
      }).on('error', reject);
    });
  }

  try {
    const resBlog = await fetchUrl('/blog');
    assert(resBlog.status === 200, 'GET /blog returns HTTP 200');
    assert(resBlog.headers['content-type'].includes('text/html'), 'GET /blog returns text/html');
    assert(resBlog.body.includes('Crochet Tutorials &amp; Free Guides') || resBlog.body.includes('Crochet Tutorials & Free Guides'), 'GET /blog body contains prerendered content');

    const resArticle = await fetchUrl('/blog/free-shooting-star-crochet-pattern-keychain');
    assert(resArticle.status === 200, 'GET /blog/:slug returns HTTP 200');
    assert(resArticle.body.includes('Free Shooting Star Crochet Pattern'), 'GET /blog/:slug body contains prerendered article content');

    const resInvalidBlog = await fetchUrl('/blog/non-existent-crochet-slug');
    assert(resInvalidBlog.status === 404, 'GET /blog/non-existent returns true HTTP 404');

    const resProd6 = await fetchUrl('/product/6');
    assert(resProd6.status === 200, 'GET /product/6 returns HTTP 200');

    const resProd2 = await fetchUrl('/product/2');
    assert(resProd2.status === 200, 'GET /product/2 returns HTTP 200');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }

  // ── Summary ────────────────────────────────────────────────
  console.log('\n========================================');
  console.log(`Blog & SEO Test Results: ${passed} passed, ${failed} failed`);
  console.log('========================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
