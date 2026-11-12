/**
 * Test Suite: Free Pattern Delivery & Marketing Automation
 * CozyStitches
 */

const http = require('http');

async function runTests() {
  console.log('🧪 Starting Free Pattern Integration Tests...\n');
  let passed = 0;
  let failed = 0;

  // Import app dynamically
  const { default: app } = await import('../server/app.js');

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  async function request(method, path, body = null, headers = {}) {
    return new Promise((resolve, reject) => {
      const u = new URL(path, baseUrl);
      const req = http.request(u, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          let json = null;
          try { json = JSON.parse(data); } catch (e) {}
          resolve({ status: res.statusCode, headers: res.headers, body: json, text: data });
        });
      });
      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  }

  function assert(desc, condition) {
    if (condition) {
      console.log(`  ✅ PASS: ${desc}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${desc}`);
      failed++;
    }
  }

  try {
    // 1. Valid email WITH marketing consent
    console.log('Test 1: Valid email with marketing consent');
    const res1 = await request('POST', '/api/free-pattern', {
      email: 'crafter.jane@example.com',
      marketingConsent: true
    });
    assert('Returns HTTP 200', res1.status === 200);
    assert('Returns success: true', res1.body?.success === true);
    assert('Returns downloadUrl', typeof res1.body?.downloadUrl === 'string');
    assert('Marketing subscription recorded', res1.body?.marketingSubscribed === true);

    const validDownloadUrl = res1.body?.downloadUrl;

    // 2. Valid email WITHOUT marketing consent
    console.log('\nTest 2: Valid email WITHOUT marketing consent');
    const res2 = await request('POST', '/api/free-pattern', {
      email: 'crafter.bob@example.com',
      marketingConsent: false
    });
    assert('Returns HTTP 200', res2.status === 200);
    assert('Returns success: true', res2.body?.success === true);
    assert('Marketing subscription is false', res2.body?.marketingSubscribed === false);

    // 3. Invalid email format
    console.log('\nTest 3: Invalid email format');
    const res3 = await request('POST', '/api/free-pattern', {
      email: 'invalid-email-format',
      marketingConsent: false
    });
    assert('Rejects invalid email with HTTP 400', res3.status === 400);
    assert('Returns success: false', res3.body?.success === false);

    // 4. Honeypot Bot Sinkhole
    console.log('\nTest 4: Honeypot bot protection');
    const res4 = await request('POST', '/api/free-pattern', {
      email: 'spambot@example.com',
      hp: 'http://spam-site.ru',
      marketingConsent: true
    });
    assert('Returns HTTP 200 for honeypot bot trap', res4.status === 200);
    assert('Does not return real downloadUrl for bot', !res4.body?.downloadUrl);

    // 5. Test Download Stream via Token
    console.log('\nTest 5: Download token PDF streaming');
    const tokenPath = new URL(validDownloadUrl).pathname;
    const res5 = await request('GET', tokenPath);
    assert('Returns HTTP 200 for valid token', res5.status === 200);
    assert('Content-Type is application/pdf', res5.headers['content-type'] === 'application/pdf');
    assert('Content-Disposition specifies attachment', res5.headers['content-disposition'].includes('attachment'));
    assert('PDF file content starts with %PDF', res5.text.startsWith('%PDF'));

    // 6. Test Tampered / Invalid Token
    console.log('\nTest 6: Invalid / Tampered download token');
    const res6 = await request('GET', '/api/free-pattern/download/tampered.token.here');
    assert('Rejects tampered token with HTTP 400', res6.status === 400);

    // 7. Test Expired Token
    console.log('\nTest 7: Expired download token');
    const { createFreebieToken } = await import('../server/services/token.js');
    const expiredToken = createFreebieToken('expired@example.com', -1); // expired 1 hour ago
    const res7 = await request('GET', `/api/free-pattern/download/${expiredToken}`);
    assert('Returns HTTP 410 Gone for expired token', res7.status === 410);
    assert('Returns helpful recovery HTML', res7.text.includes('Download Link Expired'));

    // 8. Test Unsubscribe Endpoint
    console.log('\nTest 8: GDPR Unsubscribe endpoint');
    const res8 = await request('POST', '/api/free-pattern/unsubscribe', {
      email: 'crafter.jane@example.com'
    });
    assert('Returns HTTP 200 on unsubscribe', res8.status === 200);
    assert('Returns success: true', res8.body?.success === true);

    // 9. Verify Existing Product Pages and Sitemap
    console.log('\nTest 9: Verification of existing routes');
    const sitemapRes = await request('GET', '/sitemap.xml');
    assert('Sitemap returns HTTP 200', sitemapRes.status === 200);

    const prod1Res = await request('GET', '/product/1');
    assert('Product 1 returns HTTP 200', prod1Res.status === 200);

    const prod3Res = await request('GET', '/product/3');
    assert('Product 3 returns HTTP 200', prod3Res.status === 200);

    const prod404Res = await request('GET', '/product/999');
    assert('Invalid Product 999 returns HTTP 404', prod404Res.status === 404);

  } finally {
    server.close();
  }

  console.log(`\n========================================`);
  console.log(`Test Results: ${passed} passed, ${failed} failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
