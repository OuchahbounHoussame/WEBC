const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const sharp = require('sharp');

function decodeAscii85(str) {
  // Remove ~> at the end if present, and remove whitespace
  str = str.replace(/~>$/, '').replace(/\s+/g, '');
  const out = [];
  let i = 0;
  while (i < str.length) {
    if (str[i] === 'z') {
      out.push(0, 0, 0, 0);
      i++;
      continue;
    }
    const chunk = str.substring(i, i + 5);
    const len = chunk.length;
    let val = 0;
    for (let j = 0; j < 5; j++) {
      val *= 85;
      if (j < len) {
        val += chunk.charCodeAt(j) - 33;
      } else {
        val += 84; // pad with 'u'
      }
    }
    const b0 = (val >>> 24) & 0xff;
    const b1 = (val >>> 16) & 0xff;
    const b2 = (val >>> 8) & 0xff;
    const b3 = val & 0xff;
    const bytes = [b0, b1, b2, b3];
    for (let k = 0; k < len - 1; k++) {
      out.push(bytes[k]);
    }
    i += 5;
  }
  return Buffer.from(out);
}

async function extract() {
  const pdfPath = 'C:/Users/oucha/.gemini/antigravity/brain/3631ed3b-b892-4baf-8788-c9ceabb8ea44/.user_uploaded/media_1795462167903_de52f3bb.pdf';
  const buf = fs.readFileSync(pdfPath);
  const outDir = 'C:/Users/oucha/Documents/antigravity/busy-darwin/crochet-store-react/public/images/products/christmas-holly';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let pos = 0;
  let imgIndex = 0;

  while (true) {
    pos = buf.indexOf(Buffer.from('/Subtype /Image'), pos);
    if (pos === -1) break;

    const objStart = buf.lastIndexOf(Buffer.from('obj'), pos);
    const streamMarker1 = buf.indexOf(Buffer.from('stream\r\n'), pos);
    const streamMarker2 = buf.indexOf(Buffer.from('stream\n'), pos);

    let streamStart = -1;
    if (streamMarker1 !== -1 && (streamMarker2 === -1 || streamMarker1 < streamMarker2)) {
      streamStart = streamMarker1 + 8;
    } else if (streamMarker2 !== -1) {
      streamStart = streamMarker2 + 7;
    }

    const streamEnd = buf.indexOf(Buffer.from('endstream'), streamStart);
    const dictStr = buf.toString('latin1', Math.max(0, objStart - 10), streamStart);

    const widthMatch = dictStr.match(/\/Width\s+(\d+)/);
    const heightMatch = dictStr.match(/\/Height\s+(\d+)/);
    const colorSpaceMatch = dictStr.match(/\/ColorSpace\s*\/([A-Za-z0-9]+)/);

    const width = widthMatch ? parseInt(widthMatch[1], 10) : null;
    const height = heightMatch ? parseInt(heightMatch[1], 10) : null;
    const colorSpace = colorSpaceMatch ? colorSpaceMatch[1] : 'DeviceRGB';

    console.log(`Image ${imgIndex}: ${width}x${height}, CS: ${colorSpace}`);

    const rawAscii = buf.toString('latin1', streamStart, streamEnd);
    const binaryAfterA85 = decodeAscii85(rawAscii);
    console.log(`  ASCII85 decoded length: ${binaryAfterA85.length}`);

    const decompressed = zlib.inflateSync(binaryAfterA85);
    console.log(`  Decompressed length: ${decompressed.length}`);

    const channels = colorSpace === 'DeviceGray' ? 1 : 3;
    const expectedLength = width * height * channels;

    if (decompressed.length >= expectedLength) {
      const imgBuffer = decompressed.subarray(0, expectedLength);
      const filename = `holly_${imgIndex}.webp`;
      await sharp(imgBuffer, {
        raw: {
          width: width,
          height: height,
          channels: channels
        }
      })
      .webp({ quality: 88 })
      .toFile(path.join(outDir, filename));

      console.log(`  Successfully wrote ${filename}!`);
    }

    imgIndex++;
    pos += 15;
  }
  console.log('All images extracted and converted to WebP successfully!');
}

extract().catch(console.error);
