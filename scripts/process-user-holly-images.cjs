const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadedImages = [
  {
    src: 'C:/Users/oucha/.gemini/antigravity/brain/3631ed3b-b892-4baf-8788-c9ceabb8ea44/.user_uploaded/media_1795463599716_e8407d6f.jpg',
    dest: 'holly-hero.webp',
    label: 'Main Studio Hero View'
  },
  {
    src: 'C:/Users/oucha/.gemini/antigravity/brain/3631ed3b-b892-4baf-8788-c9ceabb8ea44/.user_uploaded/media_1795463601364_2aabf550.jpg',
    dest: 'holly-detail-stitches.webp',
    label: 'Macro Stitch & Texture Detail'
  },
  {
    src: 'C:/Users/oucha/.gemini/antigravity/brain/3631ed3b-b892-4baf-8788-c9ceabb8ea44/.user_uploaded/media_1795463624814_27be05d6.jpg',
    dest: 'holly-hanging-loop.webp',
    label: 'Hanging Loop & Upper Cluster Detail'
  },
  {
    src: 'C:/Users/oucha/.gemini/antigravity/brain/3631ed3b-b892-4baf-8788-c9ceabb8ea44/.user_uploaded/media_1795463632902_d25edf2a.jpg',
    dest: 'holly-full-view.webp',
    label: 'Full Hanging Display'
  },
  {
    src: 'C:/Users/oucha/.gemini/antigravity/brain/3631ed3b-b892-4baf-8788-c9ceabb8ea44/.user_uploaded/media_1795463662943_adcf6a5a.jpg',
    dest: 'holly-angled-view.webp',
    label: 'Angled Studio Hanging View'
  }
];

const targetDir = 'C:/Users/oucha/Documents/antigravity/busy-darwin/crochet-store-react/public/images/products/christmas-holly';

async function processImages() {
  console.log('Optimizing high-res uploaded images to WebP...');

  for (const img of uploadedImages) {
    if (!fs.existsSync(img.src)) {
      console.error(`Source not found: ${img.src}`);
      continue;
    }

    const meta = await sharp(img.src).metadata();
    console.log(`Original ${path.basename(img.src)}: ${meta.width}x${meta.height}, format: ${meta.format}`);

    const destPath = path.join(targetDir, img.dest);
    
    // Resize to max 1024x1024 to maintain crisp sharpness with minimal byte size
    const info = await sharp(img.src)
      .resize(1024, 1024, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 86, effort: 6 })
      .toFile(destPath);

    console.log(`  ✓ Saved ${img.dest} (${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB) - ${img.label}`);
  }

  console.log('All 5 high-res photos successfully converted and optimized!');
}

processImages().catch(console.error);
