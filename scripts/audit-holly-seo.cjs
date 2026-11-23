const fs = require('fs');

const html = fs.readFileSync('crochet-store-react/dist/patterns/christmas-holly-car-hanging-crochet-pattern/index.html', 'utf8');

console.log('=== CHRISTMAS HOLLY SEO AUDIT REPORT ===');

// 1. Title
const titleMatch = html.match(/<title>(.*?)<\/title>/);
const title = titleMatch ? titleMatch[1] : '';
console.log('1. Title:', title);
console.log('   Length:', title.length, 'characters (Target: 50-60)');

// 2. Meta description
const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
const desc = descMatch ? descMatch[1] : '';
console.log('2. Meta Description:', desc);
console.log('   Length:', desc.length, 'characters (Target: 140-155)');

// 3. Canonical
const canonMatch = html.match(/<link rel="canonical" href="([^"]*)"/);
console.log('3. Canonical URL:', canonMatch ? canonMatch[1] : 'MISSING');

// 4. H1
const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/g);
console.log('4. H1 Count:', h1Matches ? h1Matches.length : 0);
if (h1Matches) console.log('   H1 Text:', h1Matches[0].replace(/<[^>]+>/g, '').trim());

// 5. Semantic H2s
const h2Matches = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('5. Semantic H2 Sections:', h2Matches);

// 6. JSON-LD Schemas
const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (schemaMatch) {
  const json = JSON.parse(schemaMatch[1]);
  console.log('6. JSON-LD Context:', json['@context']);
  const types = (json['@graph'] || [json]).map(item => item['@type']);
  console.log('   Schema Types in Graph:', types);
} else {
  console.log('6. JSON-LD: MISSING');
}

// 7. OG & Twitter
const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/);
const ogDesc = html.match(/<meta property="og:description" content="([^"]*)"/);
const ogImg = html.match(/<meta property="og:image" content="([^"]*)"/);
const ogUrl = html.match(/<meta property="og:url" content="([^"]*)"/);
const twCard = html.match(/<meta name="twitter:card" content="([^"]*)"/);
console.log('7. Open Graph Title:', ogTitle ? ogTitle[1] : 'MISSING');
console.log('   Open Graph URL:', ogUrl ? ogUrl[1] : 'MISSING');
console.log('   Open Graph Image:', ogImg ? ogImg[1] : 'MISSING');
console.log('   Twitter Card:', twCard ? twCard[1] : 'MISSING');

// 8. Sitemap
const sitemap = fs.readFileSync('crochet-store-react/dist/sitemap.xml', 'utf8');
const inSitemap = sitemap.includes('https://www.shopcozystitches.com/patterns/christmas-holly-car-hanging-crochet-pattern');
console.log('8. In sitemap.xml:', inSitemap);

// 9. Connection to First Sales Page
const connectsToFirst = html.includes('Christmas Collection 5-in-1 Amigurumi');
console.log('9. Connects to First Sales Page (Product 6):', connectsToFirst);
