import { useEffect } from 'react';

export const SITE_URL = 'https://www.shopcozystitches.com';
const HOMEPAGE_TITLE = 'Cozy Stitches — Premium Handmade Crochet PDF Patterns';
const HOMEPAGE_DESC = 'Download charming, step-by-step crochet & amigurumi PDF patterns instantly. Clear instructions, full-color step photos, and beginner-friendly guides.';

/**
 * Generates verified SEO metadata and 100% genuine Schema.org Product JSON-LD.
 * Only real, published product data is included.
 * No fabricated ratings, unverified reviews, physical shipping, or inaccurate return policies.
 */
export function getProductSEOMetadata(product) {
  if (!product) return null;

  let seoTitle = `${product.name} Crochet Pattern | CozyStitches`;
  let seoDescription = product.description;

  if (product.id === 1) {
    seoTitle = `Space Crewmate Amigurumi Crochet Pattern | CozyStitches`;
    seoDescription = `Crochet your own space crewmate with this 6-page digital PDF amigurumi pattern. Includes US terms, step-by-step photos, backpack, visor & highlight details.`;
  } else if (product.id === 2) {
    seoTitle = `Free Shooting Star Keychain Crochet Pattern PDF | CozyStitches`;
    seoDescription = `Download the free Shooting Star Keychain crochet pattern PDF. Includes step-by-step photos, US terms, and pastel rainbow tail assembly. Instant email delivery.`;
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
      "price": (product.id === 2 || product.isFree) ? "0.00" : Number(product.price).toFixed(2),
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": (product.id === 2 || product.isFree) ? "https://schema.org/InStock" : (product.soldOut ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"),
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

export default function ProductSEO({ product }) {
  useEffect(() => {
    if (!product) return;
    const meta = getProductSEOMetadata(product);
    if (!meta) return;

    document.title = meta.seoTitle;

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard Meta
    setMeta('description', meta.seoDescription);

    // Canonical Tag (single element, never duplicates)
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', meta.canonicalUrl);

    // Open Graph
    setMeta('og:title', meta.seoTitle, true);
    setMeta('og:description', meta.seoDescription, true);
    setMeta('og:url', meta.canonicalUrl, true);
    setMeta('og:type', 'product', true);
    setMeta('og:image', meta.imageUrl, true);
    setMeta('og:site_name', 'CozyStitches', true);
    setMeta('product:price:amount', Number(product.price).toFixed(2), true);
    setMeta('product:price:currency', 'USD', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.seoTitle);
    setMeta('twitter:description', meta.seoDescription);
    setMeta('twitter:image', meta.imageUrl);

    // Product Schema JSON-LD
    let script = document.getElementById('product-schema-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'product-schema-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(meta.jsonLd, null, 2);

    return () => {
      // Cleanly restore homepage metadata when navigating away
      document.title = HOMEPAGE_TITLE;
      const scriptToRemove = document.getElementById('product-schema-jsonld');
      if (scriptToRemove) scriptToRemove.remove();

      let activeCanonical = document.querySelector('link[rel="canonical"]');
      if (activeCanonical) {
        activeCanonical.setAttribute('href', `${SITE_URL}/`);
      }
      let activeDesc = document.querySelector('meta[name="description"]');
      if (activeDesc) {
        activeDesc.setAttribute('content', HOMEPAGE_DESC);
      }
    };
  }, [product]);

  return null;
}
