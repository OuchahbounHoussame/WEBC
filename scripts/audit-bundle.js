import fs from 'fs';
import path from 'path';

function getDirSizeBreakdown(dir, options = {}) {
  let totalBytes = 0;
  const breakdown = {};

  function scan(current) {
    if (!fs.existsSync(current)) return;
    const items = fs.readdirSync(current, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(current, item.name);
      if (item.isDirectory()) {
        scan(fullPath);
      } else {
        const stat = fs.statSync(fullPath);
        totalBytes += stat.size;
        const ext = path.extname(item.name).toLowerCase() || 'no-ext';
        breakdown[ext] = (breakdown[ext] || 0) + stat.size;
      }
    }
  }

  scan(dir);
  return { totalBytes, breakdown };
}

console.log('=== VERCEL FUNCTION BUNDLE COMPONENT ANALYSIS ===\n');

// 1. dist/** breakdown
const distAnalysis = getDirSizeBreakdown('dist');
console.log(`1. dist/** Total Size: ${(distAnalysis.totalBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log('   By Extension:');
for (const [ext, bytes] of Object.entries(distAnalysis.breakdown).sort((a, b) => b[1] - a[1])) {
  console.log(`     ${ext.padEnd(10)}: ${(bytes / (1024 * 1024)).toFixed(2)} MB (${bytes} bytes)`);
}

// Check subdirectories in dist
console.log('   By Subdirectory:');
const distSubs = fs.readdirSync('dist', { withFileTypes: true });
for (const sub of distSubs) {
  const p = path.join('dist', sub.name);
  if (sub.isDirectory()) {
    const s = getDirSizeBreakdown(p);
    console.log(`     ${sub.name.padEnd(15)}: ${(s.totalBytes / (1024 * 1024)).toFixed(2)} MB`);
  } else {
    const stat = fs.statSync(p);
    console.log(`     ${sub.name.padEnd(15)}: ${(stat.size / 1024).toFixed(2)} KB`);
  }
}

// 2. server/** breakdown
console.log('\n2. server/** Total Size:');
const serverAnalysis = getDirSizeBreakdown('server');
console.log(`   Total Size: ${(serverAnalysis.totalBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log('   By Subdirectory / Component:');
const serverSubs = fs.readdirSync('server', { withFileTypes: true });
for (const sub of serverSubs) {
  const p = path.join('server', sub.name);
  if (sub.isDirectory()) {
    const s = getDirSizeBreakdown(p);
    console.log(`     ${sub.name.padEnd(15)}: ${(s.totalBytes / (1024 * 1024)).toFixed(2)} MB`);
    if (sub.name === 'storage') {
      const patternsDir = path.join(p, 'patterns');
      if (fs.existsSync(patternsDir)) {
        for (const pdf of fs.readdirSync(patternsDir)) {
          const pdfStat = fs.statSync(path.join(patternsDir, pdf));
          console.log(`       - ${pdf.padEnd(40)}: ${(pdfStat.size / (1024 * 1024)).toFixed(2)} MB`);
        }
      }
    }
  } else {
    const stat = fs.statSync(p);
    console.log(`     ${sub.name.padEnd(15)}: ${(stat.size / 1024).toFixed(2)} KB`);
  }
}

// 3. node_modules dependencies of the 4 packages
console.log('\n3. node_modules for Backend Packages:');
const directPackages = ['better-sqlite3', 'cors', 'express', 'resend'];

function getPackageAndDepsSize(pkgName, visited = new Set()) {
  if (visited.has(pkgName)) return 0;
  visited.add(pkgName);

  const pkgDir = path.join('node_modules', pkgName);
  if (!fs.existsSync(pkgDir)) return 0;

  const pkgSize = getDirSizeBreakdown(pkgDir).totalBytes;
  let total = pkgSize;

  const pkgJsonPath = path.join(pkgDir, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    try {
      const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      const deps = Object.keys(pkgJson.dependencies || {});
      for (const dep of deps) {
        total += getPackageAndDepsSize(dep, visited);
      }
    } catch {}
  }
  return total;
}

const visited = new Set();
for (const pkg of directPackages) {
  const size = getPackageAndDepsSize(pkg, visited);
  console.log(`   ${pkg.padEnd(20)}: ${(size / (1024 * 1024)).toFixed(2)} MB (including sub-dependencies)`);
}

let allDepBytes = 0;
for (const p of visited) {
  const dir = path.join('node_modules', p);
  if (fs.existsSync(dir)) {
    allDepBytes += getDirSizeBreakdown(dir).totalBytes;
  }
}
console.log(`   Total Server Runtime Dependencies: ${(allDepBytes / (1024 * 1024)).toFixed(2)} MB across ${visited.size} packages`);

// 4. Combined bundle footprint estimate
console.log('\n4. Summary of Bundled Components per Function (Current Setup):');
console.log(`   - dist/**:                  ${(distAnalysis.totalBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log(`   - server/**:                ${(serverAnalysis.totalBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log(`   - node_modules (traced):    ~${(allDepBytes / (1024 * 1024)).toFixed(2)} MB`);
const grandTotal = distAnalysis.totalBytes + serverAnalysis.totalBytes + allDepBytes;
console.log(`   --------------------------------------------------`);
console.log(`   ESTIMATED UNCOMPRESSED BUNDLE: ${(grandTotal / (1024 * 1024)).toFixed(2)} MB`);
