/**
 * CozyStitches Google AdSense Verification Test Suite
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
  console.log('🧪 Starting Google AdSense Verification Test Suite...\n');

  const EXPECTED_PUB_ID = 'ca-pub-9316374239252068';
  const EXPECTED_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${EXPECTED_PUB_ID}`;

  // ── 1. Source index.html Verification ───────────────────────
  console.log('Test Group 1: Source index.html Audit');
  const sourceIndexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

  assert(sourceIndexHtml.includes(EXPECTED_SRC), 'Source index.html includes correct AdSense script URL with Publisher ID');
  assert(sourceIndexHtml.includes('crossorigin="anonymous"'), 'Source index.html includes crossorigin="anonymous"');
  assert(sourceIndexHtml.includes('async'), 'Source index.html includes async attribute');

  const headMatch = sourceIndexHtml.match(/<head>([\s\S]*?)<\/head>/);
  assert(headMatch && headMatch[1].includes(EXPECTED_SRC), 'AdSense script is inside <head> tags in index.html');

  const sourceScriptOccurrences = (sourceIndexHtml.match(new RegExp(EXPECTED_PUB_ID, 'g')) || []).length;
  assert(sourceScriptOccurrences === 1, `Exactly 1 AdSense script occurrence in source index.html (no duplicates, found ${sourceScriptOccurrences})`);

  // ── 2. Production Built HTML Audit ──────────────────────────
  console.log('\nTest Group 2: Production dist/index.html Audit');
  const distIndexPath = path.join(distDir, 'index.html');
  assert(fs.existsSync(distIndexPath), 'dist/index.html exists');

  const distIndexHtml = fs.readFileSync(distIndexPath, 'utf8');
  assert(distIndexHtml.includes(EXPECTED_SRC), 'dist/index.html includes correct AdSense script URL');
  assert(distIndexHtml.includes('crossorigin="anonymous"'), 'dist/index.html includes crossorigin="anonymous"');
  assert(distIndexHtml.includes('async'), 'dist/index.html includes async attribute');

  const distOccurrences = (distIndexHtml.match(new RegExp(EXPECTED_PUB_ID, 'g')) || []).length;
  assert(distOccurrences === 1, `Exactly 1 AdSense occurrence in dist/index.html (no duplicates, found ${distOccurrences})`);

  // ── 3. Prerendered Product & Blog Pages Audit ───────────────
  console.log('\nTest Group 3: Prerendered Pages SEO Preservation Audit');
  const prerenderedFiles = [
    'product/1/index.html',
    'product/2/index.html',
    'product/3/index.html',
    'product/4/index.html',
    'product/5/index.html',
    'product/6/index.html',
    'patterns/christmas-holly-car-hanging-crochet-pattern/index.html',
    'blog/index.html',
    'blog/free-shooting-star-crochet-pattern-keychain/index.html'
  ];

  for (const relFile of prerenderedFiles) {
    const fullPath = path.join(distDir, relFile);
    assert(fs.existsSync(fullPath), `${relFile} exists`);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const hasSrc = content.includes(EXPECTED_SRC);
      const hasAnon = content.includes('crossorigin="anonymous"');
      const count = (content.match(new RegExp(EXPECTED_PUB_ID, 'g')) || []).length;

      assert(hasSrc, `${relFile} preserved AdSense script`);
      assert(hasAnon, `${relFile} preserved crossorigin="anonymous"`);
      assert(count === 1, `${relFile} has exactly 1 AdSense script (no duplicates, found ${count})`);
    }
  }

  // ── 4. Live Server Endpoints Verification ───────────────────
  console.log('\nTest Group 4: Live HTTP Server Endpoint Responses');
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
    const resHome = await fetchUrl('/');
    assert(resHome.status === 200, 'GET / returns HTTP 200');
    assert(resHome.body.includes(EXPECTED_SRC), 'GET / response body contains AdSense script');

    const resProd6 = await fetchUrl('/product/6');
    assert(resProd6.status === 200, 'GET /product/6 returns HTTP 200');
    assert(resProd6.body.includes(EXPECTED_SRC), 'GET /product/6 response body contains AdSense script');

    const resBlog = await fetchUrl('/blog');
    assert(resBlog.status === 200, 'GET /blog returns HTTP 200');
    assert(resBlog.body.includes(EXPECTED_SRC), 'GET /blog response body contains AdSense script');

    const resArticle = await fetchUrl('/blog/free-shooting-star-crochet-pattern-keychain');
    assert(resArticle.status === 200, 'GET /blog/:slug returns HTTP 200');
    assert(resArticle.body.includes(EXPECTED_SRC), 'GET /blog/:slug response body contains AdSense script');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }

  // ── Summary ────────────────────────────────────────────────
  console.log('\n========================================');
  console.log(`AdSense Test Results: ${passed} passed, ${failed} failed`);
  console.log('========================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
