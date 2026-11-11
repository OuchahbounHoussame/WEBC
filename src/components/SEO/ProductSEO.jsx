import { useEffect } from 'react';

export const SITE_URL = 'https://www.shopcozystitches.com';

/**
 * Generates unified SEO metadata and Schema.org Product JSON-LD
 * used both for client-side dynamic head updates and static prerendering.
 */
export function getProductSEOMetadata(product) {
  if (!product) return null;

  let seoTitle = `${product.name} Crochet Pattern | CozyStitches`;
  let seoDescription = product.description;

  if (product.id === 1) {
    seoTitle = `Space Crewmate Amigurumi Crochet Pattern | CozyStitches`;
    seoDescription = `Crochet your own space crewmate with this 6-page digital PDF amigurumi pattern. Includes US terms, step-by-step photos, backpack, visor & highlight details.`;
  } else if (product.id === 2) {
    seoTitle = `Shooting Star Keychain Crochet Pattern | CozyStitches`;
    seoDescription = `Create a cute pastel shooting star keychain with this 6-page digital PDF crochet pattern. Includes US terms, photo tutorial, and rainbow tail assembly.`;
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
      "price": Number(product.price).toFixed(2),
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "CozyStitches",
        "url": SITE_URL
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0.00",
          "currency": "USD"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": ["US", "GB", "CA", "AU", "EU"],
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 7,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    ...(product.reviews ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": (product.stars || 5).toFixed(1),
        "reviewCount": String(product.reviews),
        "bestRating": "5",
        "worstRating": "1"
      }
    } : {})
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

    const previousTitle = document.title;
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

    // Canonical
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

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.seoTitle);
    setMeta('twitter:description', meta.seoDescription);
    setMeta('twitter:image', meta.imageUrl);

    // JSON-LD
    let script = document.getElementById('product-schema-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'product-schema-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(meta.jsonLd, null, 2);

    return () => {
      document.title = previousTitle;
      const scriptToRemove = document.getElementById('product-schema-jsonld');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [product]);

  return null;
}
