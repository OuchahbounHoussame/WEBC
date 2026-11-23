const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = 'C:/Users/oucha/Documents/antigravity/busy-darwin/crochet-store-react/public/images/products/christmas-holly';

// Order requested by user:
// 1. media_1795463632902_d25edf2a.jpg (The exact one chosen in screenshot to be first!)
// 2. media_1795463601364_2aabf550.jpg (Macro stitches)
// 3. media_1795463624814_27be05d6.jpg (Loop and upper half)
// 4. media_1795463662943_adcf6a5a.jpg (Angled hanging view)
// 5. media_1795463599716_e8407d6f.jpg (Alternate studio view)

const imagesToProcess = [
  {
    src: 'C:/Users/oucha/.gemini/antigravity/brain/3631ed3b-b892-4baf-8788-c9ceabb8ea44/.user_uploaded/media_1795463632902_d25edf2a.jpg',
    dest: 'holly-hero.webp',
    label: '1. Primary Hero Image (Chosen by User)'
  },
  {
    src: 'C:/Users/oucha/.gemini/antigravity/brain/3631ed3b-b892-4baf-8788-c9ceabb8ea44/.user_uploaded/media_1795463601364_2aabf550.jpg',
    dest: 'holly-detail-stitches.webp',
    label: '2. Macro Close-Up Stitches'
  },
  {
    src: 'C:/Users/oucha/.gemini/antigravity/brain/3631ed3b-b892-4baf-8788-c9ceabb8ea44/.user_uploaded/media_1795463624814_27be05d6.jpg',
    dest: 'holly-hanging-loop.webp',
    label: '3. Upper Loop Detail'
  },
  {
    src: 'C:/Users/oucha/.gemini/antigravity/brain/3631ed3b-b892-4baf-8788-c9ceabb8ea44/.user_uploaded/media_1795463662943_adcf6a5a.jpg',
    dest: 'holly-angled-view.webp',
    label: '4. Angled Studio View'
  },
  {
    src: 'C:/Users/oucha/.gemini/antigravity/brain/3631ed3b-b892-4baf-8788-c9ceabb8ea44/.user_uploaded/media_1795463599716_e8407d6f.jpg',
    dest: 'holly-studio-view.webp',
    label: '5. Alternate Studio View'
  }
];

async function run() {
  // Clean all existing files in targetDir
  const existingFiles = fs.readdirSync(targetDir);
  for (const f of existingFiles) {
    fs.unlinkSync(path.join(targetDir, f));
  }
  console.log('Cleaned old directory contents.');

  for (const item of imagesToProcess) {
    const destPath = path.join(targetDir, item.dest);
    const info = await sharp(item.src)
      .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 88, effort: 6 })
      .toFile(destPath);
    console.log(`✓ Processed ${item.dest} (${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB) - ${item.label}`);
  }
  console.log('Done!');
}

run().catch(console.error);
