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
          directPinUrl: "", // Paste your custom Pinterest Pin URL here when ready
    slug: "free-shooting-star-crochet-pattern-keychain",
    title: "Free Shooting Star Crochet Pattern: Cute Star Keychain",
    seoTitle: "Free Shooting Star Crochet Pattern | Cozy Stitches",
    metaDescription: "Crochet a smiling shooting star with a pastel tail. Get the free star keychain pattern, US stitch instructions and printable photo guide from Cozy Stitches.",
    description: "Crochet a smiling shooting star with a pastel tail. Get the free star keychain pattern, US stitch instructions and printable photo guide from Cozy Stitches.",
    publishedAt: "2026-11-15T12:00:00Z",
    updatedAt: "2026-11-15T22:30:00Z",
    author: {
      name: "Cozy Stitches Studio",
      role: "Amigurumi Designer & Pattern Creator",
      avatar: "/cozy-stitches-brand-logo.svg",
      url: "https://www.shopcozystitches.com"
    },
    category: "Free Patterns",
    difficulty: "Easy / Advanced Beginner",
    readingTime: "6 min read",
    primaryImage: "/images/products/shooting-star/star-1.jpg",
    primaryImageCaption: "Yellow crochet shooting star with a smiling face and pastel crocheted tail.",
    primaryImageAlt: "Yellow crochet shooting star with a smiling face and pastel crocheted tail.",
    images: [
      "/images/products/shooting-star/star-1.jpg",
      "/images/products/shooting-star/star-2.jpg",
      "/images/products/shooting-star/star-3.jpg",
      "/images/products/shooting-star/star-4.jpg"
    ],
    featured: true,
    tags: [
      "free shooting star crochet pattern",
      "crochet star keychain pattern",
      "amigurumi star pattern",
      "pastel crochet star",
      "shooting star crochet tutorial",
      "free printable crochet pattern"
    ],
    excerpt: "Make a cheerful little star with this free shooting star crochet pattern. The design combines a yellow crochet star, a smiling face and a stepped pastel tail.",
    
    // Jump-links
    jumpLinks: [
      { label: "Jump to the pattern", href: "#shooting-star-pattern" },
      { label: "Get the free PDF", href: "#download-pattern" },
      { label: "Save this crochet project", href: "#save-for-later" }
    ],

    // Intro paragraphs
    intro: [
      "Make a cheerful little star with this **free shooting star crochet pattern**. The design combines a yellow crochet star, a smiling face and a stepped pastel tail. Add your own keychain hardware to turn it into a crochet star keychain, or keep it as a small handmade charm.",
      "Below you will find the materials, US crochet abbreviations, written instructions and finishing tips. Prefer to crochet away from your screen? The printable English PDF includes photo guides for the star, tail and assembly."
    ],

    // Section 1: What you will make
    overview: {
      title: "What you will make",
      paragraphs: [
        "This shooting star starts with two small circles. You join sections of those circles to form five points, then add a separate three-color crochet tail. The main version is left unstuffed, giving the star a flatter shape.",
        "This is a small project for crocheters who already know how to work single crochet, increases and decreases. Joining the points and positioning the color changes require more attention than a basic flat circle. Read the whole pattern and keep the photo guide nearby before starting.",
        "The finished size depends on your yarn, hook and tension; use the materials below as a starting point rather than a guaranteed measurement."
      ]
    },

    // Section 2: Materials
    materials: [
      "Semi-thick 8/6 cotton yarn: approximately 10 g of yellow, plus small amounts of lilac, pink, aqua green and black.",
      "A 3 mm crochet hook.",
      "Yarn needle, stitch marker and scissors.",
      "Black yarn for an embroidered face. The photographed version uses plastic eyes; embroidery is an alternative for this flat design.",
      "Cold silicone craft glue, if using the original glued tail attachment, or matching yarn for a sewn attachment.",
      "Optional keychain ring and a suitable connecting loop or chain, supplied separately."
    ],
    materialsNote: "Keep the tail yarns a similar thickness to the yellow yarn so the pieces stay in proportion. A different yarn or hook can change both the size and the firmness of the fabric.",

    // Section 3: Abbreviations
    abbreviations: [
      { code: "MR", meaning: "Magic ring" },
      { code: "ch", meaning: "Chain" },
      { code: "sl st", meaning: "Slip stitch" },
      { code: "sc", meaning: "Single crochet" },
      { code: "inc", meaning: "Work 2 sc into the same stitch" },
      { code: "dec", meaning: "Work 2 stitches together as 1 sc" },
      { code: "R", meaning: "Round" }
    ],
    abbreviationsNote: "Numbers in brackets show the stitch count. Repeat instructions inside parentheses the number of times shown. Work the circles in a continuous spiral, marking the first stitch of each round.",

    // Section 4: Pattern Steps with Anchor #shooting-star-pattern
    patternAnchor: "shooting-star-pattern",
    patternTitle: "Free shooting star crochet pattern",
    steps: [
      {
        number: 1,
        heading: "1. Crochet two yellow circles",
        rounds: [
          "**R1:** Work 5 sc into a MR. **[5]**",
          "**R2:** Inc in each stitch around. **[10]**",
          "**R3:** (Sc, inc) × 5. **[15]**",
          "**R4:** Sc, inc, (2 sc, inc) × 4, sc. **[20]**"
        ],
        notes: [
          "Fasten off the first circle. Make a second circle in the same way, keeping the yarn attached after R4.",
          "Check that both circles have 20 stitches before joining. Each star point will use four stitches from each circle."
        ]
      },
      {
        number: 2,
        heading: "2. Form the five star points",
        subtext: "Place the circles with their wrong sides facing each other.",
        instructions: [
          "1. Work 4 sc along the second circle, then 4 sc along the first circle. These 8 stitches form the first round of one point.",
          "2. Around that point, work 4 sc and 2 dec. **[6]**",
          "3. Cut the yarn, leaving enough to close the tip with a yarn needle. Close the point and secure the end.",
          "4. Join yellow yarn beside the completed point, starting on the same side of the star. Repeat with the next four stitches of each circle.",
          "5. Continue until you have five points. Leave the star unstuffed and tuck the ends inside."
        ],
        notes: [
          "Use the PDF's star photo guide to check the direction of the join. If a small gap remains between points, close it neatly with matching yarn and a yarn needle."
        ],
        image: {
          src: "/images/blog/shooting-star/process/star-points-guide.webp",
          fallback: "/images/blog/shooting-star/process/star-points-guide.jpg",
          alt: "Crochet star points construction photo guide from the Cozy Stitches pattern PDF",
          caption: "Joining the circles into five points with continuous stitches and invisible tip decreases."
        }
      },
      {
        number: 3,
        heading: "3. Make the pastel shooting-star tail",
        subtext: "The tail is a separate, stepped piece of crochet. It is not made from loose ribbons. Use the tail photo guide to identify the starting edge before joining each new color.",
        colors: [
          {
            name: "Lilac",
            text: "**Lilac:** Ch 10. Starting in the second chain from the hook, work 6 sc and 1 sl st. Fasten off. This written sequence works into seven of the nine available chains; do not add extra stitches simply to reach the end."
          },
          {
            name: "Pink",
            text: "**Pink:** With the right side facing you, join pink yarn in the third stitch counted from the back end of the piece, as shown in the photo guide. Work 6 sc and 1 sl st. Turn. Ch 1, then work 1 sl st and 5 sc. Fasten off."
          },
          {
            name: "Aqua green",
            text: "**Aqua green:** With the right side facing you, join aqua green yarn in the third stitch counted from the back end. Work 4 sc and 1 sl st. Turn. Ch 1, then work 1 sl st and 3 sc. Fasten off and weave in the ends."
          }
        ],
        notes: [
          "Lay the tail flat before attaching it. The rows should form a stepped shape, with the shorter rows sitting above the longer one."
        ],
        image: {
          src: "/images/blog/shooting-star/process/tail-guide.webp",
          fallback: "/images/blog/shooting-star/process/tail-guide.jpg",
          alt: "Pastel crochet stepped tail progress guide from the Cozy Stitches pattern PDF",
          caption: "Stepped three-color crochet tail with Lilac, Pink, and Aqua Green rows worked from the back end."
        }
      },
      {
        number: 4,
        heading: "4. Add the face and attach the tail",
        instructions: [
          "Embroider a small U-shaped smile in black between rounds 1 and 2 on the front. Add embroidered eyes, leaving about one stitch between each eye and the mouth. Check the placement before securing the thread.",
          "The sample photographs show plastic eyes. If you choose backed safety eyes instead of embroidery, plan their position and attach the backs while the inside is still accessible, before closing the star. Do not try to add washers to a fully closed piece.",
          "Position the tail behind the star, toward one side, so the pastel steps remain visible. The original method uses cold silicone craft glue. Alternatively, sew the tail on with matching yarn, taking small stitches through the back of the star."
        ],
        image: {
          src: "/images/blog/shooting-star/process/assembly-guide.webp",
          fallback: "/images/blog/shooting-star/process/assembly-guide.jpg",
          alt: "Crochet shooting star facial embroidery and tail assembly guide",
          caption: "Facial placement between rounds 1 and 2, safety eyes backing, and tail attachment."
        }
      },
      {
        number: 5,
        heading: "5. Turn it into a crochet star keychain",
        instructions: [
          "For an optional keychain finish, add a securely stitched yarn loop at the top point and connect your chosen keychain hardware. Test the attachment with a gentle tug before using it on keys or a bag. The hardware is separate from the crochet pattern materials and is not included with the digital PDF."
        ]
      }
    ],

    // Section 5: Tips
    tips: [
      {
        title: "Count before you join.",
        text: "Twenty stitches on each circle divide into five groups of four. Correcting a missed increase now is easier than unpicking the points later."
      },
      {
        title: "Keep the same starting side.",
        text: "Joining each new point from the same side helps keep the construction consistent."
      },
      {
        title: "Check the tail against the photos.",
        text: "The color rows begin partway along the previous section. Treating every color as a full-length row changes the shape."
      },
      {
        title: "Try your colors together first.",
        text: "Yellow with lilac, pink and aqua gives the photographed pastel look. You can choose other colors in the same yarn thickness without changing the stitch instructions."
      }
    ],

    // Section 6: Download CTA with Anchor #download-pattern
    downloadCta: {
      id: "download-pattern",
      title: "Get the free printable crochet pattern",
      description: "Keep the instructions beside your yarn with the **Shooting Star English PDF**. The current Cozy Stitches edition contains **7 pages**, including materials, abbreviations, written instructions and photo guides.",
      buttonText: "Get the free Shooting Star pattern",
      buttonLink: "/product/2",
      targetProductId: 2,
      note: "This is a digital crochet pattern, not a finished keychain. Follow the instructions on the download page to access your copy."
    },

    // Section 7: FAQs
    faqs: [
      {
        question: "Is this shooting star crochet pattern free?",
        answer: "Yes. The written pattern on this page is free to read, and the Shooting Star listing offers the printable version as a free pattern."
      },
      {
        question: "Is this a beginner crochet project?",
        answer: "It is best approached once you are comfortable with single crochet, increases, decreases and working in the round. The point joins and stepped tail are the parts to follow slowly with the photos."
      },
      {
        question: "Does the crochet star need stuffing?",
        answer: "The main version shown in these instructions is left unstuffed. Its shape comes from the two joined circles and five points."
      },
      {
        question: "Can I change the pastel colors?",
        answer: "Yes. Keep the same stitch counts and use yarns of a similar thickness. The pictured combination is yellow, lilac, pink and aqua green."
      },
      {
        question: "What size will my star be?",
        answer: "Size varies with yarn, hook and tension. The supplied pattern does not establish a verified finished measurement, so measure your own sample if size matters for your project."
      },
      {
        question: "Can I make it without plastic eyes?",
        answer: "Yes. Embroider the eyes with black yarn. This also avoids needing access to the inside to attach eye backs."
      }
    ],

    // Section 8: Save this crochet project for later (#save-for-later)
    saveForLater: {
      id: "save-for-later",
      title: "Save this crochet project for later",
      intro: "Save a Shooting Star Pin to your crochet patterns board so you can find the instructions when you are ready to make it. Choose your pastel yarns, download the photo guide and start with the two little circles.",
      credit: "Original pattern: Bhindi.crochet. English edition and layout: Cozy Stitches, as credited in the supplied PDF.",
      pins: [
        {
          id: 1,
          directPinUrl: "", // Paste your custom Pinterest Pin URL here when ready
          angle: "Search intent",
          keyword: "free shooting star crochet pattern",
          title: "Free Shooting Star Crochet Pattern with a Pastel Tail",
          description: "Make a smiling yellow crochet star with a stepped pastel tail. Follow the free written pattern in US crochet terms and find the printable photo guide on Cozy Stitches. Open the tutorial to start your next crochet project.",
          alt: "Yellow crochet shooting star with a pastel tail on cream linen beneath a free crochet pattern headline.",
          board: "Free Crochet Patterns",
          pngFile: "/images/blog/shooting-star/pins/01-free-shooting-star.png",
          webpFile: "/images/blog/shooting-star/pins/01-free-shooting-star.webp",
          width: 1024,
          height: 1536
        },
        {
          id: 2,
          directPinUrl: "", // Paste your custom Pinterest Pin URL here when ready
          angle: "Handmade gift",
          keyword: "crochet star keychain pattern",
          title: "Crochet Star Keychain Pattern for a Handmade Gift",
          description: "Looking for a small handmade crochet gift? Make this cheerful shooting star and add your own keychain hardware if you like. Read the free pattern, gather your cotton yarn and follow the photo guide.",
          alt: "Yellow crochet shooting star with pink, mint and lilac tail styled beside a kraft tag on blush tissue.",
          board: "Crochet Gift Ideas",
          pngFile: "/images/blog/shooting-star/pins/02-crochet-gift.png",
          webpFile: "/images/blog/shooting-star/pins/02-crochet-gift.webp",
          width: 1024,
          height: 1536
        },
        {
          id: 3,
          directPinUrl: "", // Paste your custom Pinterest Pin URL here when ready
          angle: "Color and texture",
          keyword: "pastel crochet star",
          title: "Pastel Shooting Star Crochet Pattern — Free Tutorial",
          description: "Love pastel crochet projects? This yellow star has a smiling face and a stepped lilac, pink and aqua tail. Explore the free shooting star pattern and photo guide, then choose your own yarn colors.",
          alt: "Close view of a yellow crochet star and its stepped pastel tail with a Love Pastel Crochet headline.",
          board: "Colorful Crochet Projects",
          pngFile: "/images/blog/shooting-star/pins/03-pastel-tail.png",
          webpFile: "/images/blog/shooting-star/pins/03-pastel-tail.webp",
          width: 1024,
          height: 1536
        },
        {
          id: 4,
          directPinUrl: "", // Paste your custom Pinterest Pin URL here when ready
          angle: "Process confidence",
          keyword: "shooting star crochet tutorial",
          title: "Shooting Star Crochet Tutorial with a Photo Guide",
          description: "Crochet two circles, shape five points and add a colorful tail. The free shooting star pattern includes written US instructions, and the printable guide includes process photos. Read the tutorial and keep the photo guide beside your yarn.",
          alt: "Finished crochet shooting star with a small reference photograph of its tail in progress and a photo-guide headline.",
          board: "Crochet Tutorials",
          pngFile: "/images/blog/shooting-star/pins/04-photo-guide.png",
          webpFile: "/images/blog/shooting-star/pins/04-photo-guide.webp",
          width: 1024,
          height: 1536
        },
        {
          id: 5,
          directPinUrl: "", // Paste your custom Pinterest Pin URL here when ready
          angle: "Small crochet project",
          keyword: "amigurumi star pattern",
          title: "Free Amigurumi Star Pattern with a Smiling Face",
          description: "Add a little color to your crochet project list with this unstuffed shooting star. Follow the free amigurumi star pattern, embroider a smile and finish the pastel tail. Visit Cozy Stitches for the written instructions and printable guide.",
          alt: "Small yellow smiling crochet shooting star resting in a hand, with its pastel tail visible.",
          board: "Amigurumi Crochet Patterns",
          pngFile: "/images/blog/shooting-star/pins/05-amigurumi.png",
          webpFile: "/images/blog/shooting-star/pins/05-amigurumi.webp",
          width: 1024,
          height: 1536
        },
        {
          id: 6,
          directPinUrl: "", // Paste your custom Pinterest Pin URL here when ready
          angle: "Save for later",
          keyword: "free crochet star pattern",
          title: "Free Crochet Star Pattern to Save for Your Next Project",
          description: "Save this shooting star crochet pattern for your next making session. Gather yellow cotton yarn and pastel shades for the stepped tail, then follow the free written instructions on Cozy Stitches. The printable photo guide is linked in the article.",
          alt: "Yellow crochet shooting star arranged with pastel yarn and a crochet hook beneath a save-your-next-project headline.",
          board: "Free Crochet Patterns",
          pngFile: "/images/blog/shooting-star/pins/06-save-pattern.png",
          webpFile: "/images/blog/shooting-star/pins/06-save-pattern.webp",
          width: 1024,
          height: 1536
        }
      ]
    },

    // Related shop products to cross-promote
    relatedProducts: [2, 1, 6]
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
