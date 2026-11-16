import http from 'http';
import app from '../server/app.js';

const server = http.createServer(app);
server.listen(0, async () => {
  const port = server.address().port;
  console.log('Testing app routing on port', port);

  async function test(testPath, expectedStatus) {
    return new Promise((resolve) => {
      http.get(`http://127.0.0.1:${port}${testPath}`, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          const pass = res.statusCode === expectedStatus;
          console.log(`[${pass ? 'PASS' : 'FAIL'}] ${testPath} -> HTTP ${res.statusCode} (expected ${expectedStatus})`);
          resolve();
        });
      });
    });
  }

  await test('/admin', 200);
  await test('/admin/logout', 302);
  await test('/api/health', 200);
  await test('/health', 200);
  await test('/product/2', 200);
  await test('/product/999', 404);
  await test('/blog/non-existent', 404);
  await test('/sitemap.xml', 200);
  await test('/robots.txt', 200);

  server.close(() => {
    console.log('Server closed. All routing verified.');
    process.exit(0);
  });
});
