/**
 * CozyStitches Blog Posts Data
 * 
 * Simple, maintainable data source for all blog articles.
 * To publish a new article:
 * 1. Add a new object with unique id and slug
 * 2. Run 'npm run build' to generate static HTML, sitemap & SEO metadata
 */

export const blogPosts = [
  {
    id: 1,
    slug: "free-shooting-star-crochet-pattern-keychain",
    title: "Free Shooting Star Crochet Pattern: Make a Cute Keychain",
    seoTitle: "Free Shooting Star Crochet Pattern: Make a Cute Keychain | CozyStitches",
    description: "Learn how to crochet a cute shooting star keychain with this beginner-friendly free pattern. Includes step-by-step instructions, pastel rainbow tail guide, and free PDF download.",
    publishedAt: "2026-11-15T12:00:00Z",
    updatedAt: "2026-11-15T12:00:00Z",
    author: {
      name: "CozyStitches Studio",
      role: "Amigurumi Designer & Pattern Creator",
      avatar: "/cozy-stitches-brand-logo.svg",
      url: "https://www.shopcozystitches.com"
    },
    category: "Free Patterns",
    difficulty: "Easy / Advanced Beginner",
    readingTime: "5 min read",
    primaryImage: "/images/products/shooting-star/star-1.png",
    images: [
      "/images/products/shooting-star/star-1.png",
      "/images/products/shooting-star/star-2.jpg",
      "/images/products/shooting-star/star-3.png"
    ],
    featured: true,
    tags: ["Free Pattern", "Shooting Star", "Amigurumi", "Beginner Crochet", "Keychain"],
    excerpt: "Brighten your everyday keys or backpack with this sweet, pastel shooting star keychain! Featuring a smiling embroidered face and cascading pastel rainbow ribbons, this free pattern works up quickly using basic stitches.",
    
    // Pattern Quick Specs (strictly verified from pattern-2-shooting-star-keychain.pdf)
    specs: {
      skillLevel: "Advanced Beginner",
      finishedSize: "Approx. 8 cm (star) + pastel rainbow ribbons",
      hookSize: "3.0 mm crochet hook",
      yarnType: "8/6 cotton yarn (yellow, pink, lilac, aqua green & black)",
      terms: "US Crochet Terms",
      pdfPages: "6 pages with full-color process photos",
      targetProductId: 2
    },

    // Materials List (verified from pattern)
    materials: [
      "8/6 cotton yarn in Pastel Yellow (main star body)",
      "8/6 cotton yarn in Lilac, Pink, and Aqua Green (for the rainbow ribbons)",
      "Small strand of black embroidery floss or yarn (for facial expression)",
      "3.0 mm ergonomic crochet hook",
      "Two 6 mm plastic safety eyes",
      "Tapestry / yarn needle with large eye",
      "Stitch marker and sharp scissors",
      "Cold silicone craft glue (or fabric glue) for attaching rainbow ribbons",
      "Silver metal split keychain ring with chain"
    ],

    // Abbreviations (verified US terms)
    abbreviations: [
      { code: "MR", meaning: "Magic Ring (adjustable ring)" },
      { code: "ch", meaning: "Chain" },
      { code: "sl st", meaning: "Slip Stitch" },
      { code: "sc", meaning: "Single Crochet" },
      { code: "inc", meaning: "Single Crochet Increase (2 sc in one stitch)" },
      { code: "dec", meaning: "Invisible Single Crochet Decrease" }
    ],

    // Content Outline & Steps
    sections: [
      {
        heading: "Why You Will Love Making This Shooting Star",
        content: `Whether you are searching for a quick weekend crochet project, a delightful handmade stocking stuffer, or your first small amigurumi project, this **Shooting Star Keychain** is a joyful make. 

Unlike plush 3D amigurumi that require dense fiberfill stuffing, this star is constructed from two flat circular panels joined together around the perimeter to form five crisp, well-defined points. The cascading pastel rainbow tail adds a magical, whimsical touch that looks stunning clipped onto backpacks, project bags, or keyrings.`
      },
      {
        heading: "Pattern Overview & Construction Notes",
        content: `Before picking up your hook, keep these designer tips in mind:
- **Tension:** Keep your single crochet stitches firm and even so the star maintains its neat geometric silhouette without curling.
- **Continuous Rounds:** The central circles are crocheted in continuous spirals without joining with a slip stitch at the end of each round. Use a stitch marker to keep track of your first stitch.
- **Safety Eyes:** If making this keychain for a baby or toddler, consider embroidering French knots or sleepy crescent eyes instead of using plastic safety eyes.`
      },
      {
        heading: "Step 1: The Star Body (Make 2 in Yellow Yarn)",
        content: `The star starts with two identical 20-stitch circular motifs:

- **Round 1:** Start with yellow yarn. Work 5 sc into a Magic Ring [5].
- **Round 2:** Work 5 increases around (2 sc into every stitch) [10].
- **Round 3:** Repeat (1 sc, 1 inc) 5 times [15].
- **Round 4:** Work 1 sc, 1 inc, then repeat (2 sc, 1 inc) 4 times, ending with 1 sc [20].

*Finishing:* On the first circle, fasten off and weave in the tail. On the second circle, **do not cut the working yarn**, as you will use it directly to join both panels and form the five star points.`
      },
      {
        heading: "Step 2: Crocheting the Five Star Points",
        content: `Place both star circles with their **wrong sides facing each other** (so the clean right sides are visible on the front and back):

1. **First Point:** Work 4 sc through the edge of the second circle, then continue with 4 sc through the edge of the first circle [8 stitches total in the small point round].
2. **Shaping the Tip:** On the next round, work 4 sc followed by 2 invisible decreases [6]. Fasten off, leaving a tail of yarn, thread onto a needle, and weave through the front loops to pull the tip tightly closed.
3. **Remaining Points:** Repeat this process for the remaining four points around the perimeter (8 sc round, followed by 4 sc and 2 dec).
4. **No Stuffing Needed:** Keep the star unpadded for a crisp, flat keychain profile that slides easily in and out of pockets. Weave all loose ends neatly into the center.`
      },
      {
        heading: "Step 3: Crafting the Pastel Rainbow Tail",
        content: `The signature feature of this shooting star is its cheerful trailing tail ribbons, worked in three pastel hues:

- **Lilac Ribbon:** Ch 10. Starting in the 2nd chain from hook, work 6 sc and 1 sl st. Fasten off.
- **Pink Ribbon:** Join pink yarn in the 3rd stitch from the back edge; make 6 sc and 1 sl st. Turn, ch 1, work 1 sl st and 5 sc. Fasten off.
- **Aqua Green Ribbon:** Join aqua green in the 3rd stitch from the back edge; make 4 sc and 1 sl st. Turn, ch 1, work 1 sl st and 3 sc. Fasten off and weave in all yarn ends.`
      },
      {
        heading: "Step 4: Facial Embroidery & Final Assembly",
        content: `1. **The Smile:** With black embroidery thread or thin yarn, stitch a gentle U-shaped curve centered between rounds 1 and 2 of the front star face.
2. **Safety Eyes:** Position the 6 mm safety eyes exactly one stitch away on either side of the smile and snap the washer backs securely in place.
3. **Optional Blush:** Lightly dab pink textile marker or cosmetic blush under the eyes for an adorable kawaii glow.
4. **Attaching the Tail:** Secure the three-tiered pastel rainbow tail to the lower back of the star using a small dab of cold craft silicone or needle stitching.
5. **Keychain Hardware:** Fasten a metal jump ring and split keychain loop through the uppermost star point.`
      }
    ],

    // Related shop products to cross-promote
    relatedProducts: [2, 6, 5, 1],
    
    // Call-to-action block configuration
    cta: {
      title: "Download the Complete Printable PDF (100% Free)",
      subtitle: "Prefer a printer-friendly, ad-free digital PDF with full-color close-up assembly photos?",
      buttonText: "Download Free Pattern PDF",
      buttonLink: "/#freebie",
      note: "Instant automatic email delivery. No purchase or credit card required."
    }
  }
];

export const blogCategories = [
  { key: "all", label: "All Articles" },
  { key: "Free Patterns", label: "Free Patterns" },
  { key: "Amigurumi Guides", label: "Amigurumi Guides" },
  { key: "Crochet Tips", label: "Crochet Tips" }
];

export function getBlogPostBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = String(slug).toLowerCase().trim();
  return blogPosts.find(post => post.slug.toLowerCase() === cleanSlug) || null;
}
