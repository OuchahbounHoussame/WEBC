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
    primaryImage: "/images/blog/shooting-star/process/authentic-shooting-star-hero.jpg",
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
    inlinePinCallouts: [
      "Planning your next crochet session? Pin this free shooting star pattern to your Pinterest board so you don't lose it!",
      "Love this stepped pastel color combination? Pin this tutorial to your colorful crochet ideas board!",
      "Save this cute star keychain pattern to your Pinterest board for your next quick handmade gift!"
    ],
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
          directPinUrl: "https://www.pinterest.com/pin/1082552830404493209/",
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
          directPinUrl: "https://www.pinterest.com/pin/1082552830404493070/",
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
          directPinUrl: "https://www.pinterest.com/pin/1082552830404493288/",
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
  },
  {
    id: 2,
    directPinUrl: "", // Paste your custom Pinterest Pin URL here when ready
    slug: "free-crochet-gingerbread-man-ornament-pattern",
    title: "Free Crochet Gingerbread Man Ornament Pattern: Mini Christmas Amigurumi",
    seoTitle: "Free Crochet Gingerbread Man Ornament Pattern | Cozy Stitches",
    metaDescription: "Crochet a cute mini gingerbread man Christmas ornament with scalloped white icing and colorful sprinkles. Free pattern, US stitch instructions & printable guide.",
    description: "Crochet a cute mini gingerbread man Christmas ornament with scalloped white icing and colorful sprinkles. Free pattern, US stitch instructions & printable guide.",
    publishedAt: "2026-11-18T12:00:00Z",
    updatedAt: "2026-11-18T14:30:00Z",
    author: {
      name: "Cozy Stitches Studio",
      role: "Amigurumi Designer & Pattern Creator",
      avatar: "/cozy-stitches-brand-logo.svg",
      url: "https://www.shopcozystitches.com"
    },
    category: "Free Patterns",
    difficulty: "Easy / Beginner Friendly",
    readingTime: "5 min read",
    primaryImage: "/images/blog/gingerbread-man/process/gingerbread-ornament-hero.jpg",
    primaryImageCaption: "Handmade crochet gingerbread man ornament with scalloped icing, colorful embroidered sprinkles, and rustic hanging loop.",
    primaryImageAlt: "Cute crochet gingerbread man Christmas ornament with white icing cap and red buttons on a clean white background.",
    images: [
      "/images/blog/gingerbread-man/process/gingerbread-ornament-hero.jpg",
      "/images/blog/gingerbread-man/process/gingerbread-tree-ornament.jpg",
      "/images/blog/gingerbread-man/process/gingerbread-duo-holiday.jpg",
      "/images/blog/gingerbread-man/process/gingerbread-macro-detail.jpg"
    ],
    featured: true,
    tags: [
      "free crochet gingerbread man pattern",
      "crochet christmas ornament free pattern",
      "mini gingerbread amigurumi",
      "crochet holiday ornament",
      "diy crochet gift",
      "free printable crochet pattern"
    ],
    excerpt: "Add handmade warmth to your holiday tree with this free crochet gingerbread man ornament pattern. Features scalloped white icing, colorful sprinkles, and a rustic hanging loop.",

    // Jump-links
    jumpLinks: [
      { label: "Jump to the pattern", href: "#gingerbread-pattern" },
      { label: "Get the free PDF", href: "#download-pattern" },
      { label: "Save this crochet project", href: "#save-for-later" }
    ],

    // Intro paragraphs
    intro: [
      "Add sweet handmade charm to your holiday tree with this **free crochet gingerbread man ornament pattern**. Crocheted in warm golden-tan cotton yarn, this mini amigurumi features a delicious scalloped white icing cap, rainbow embroidered sprinkles, cute pink cheeks, and festive red buttons.",
      "Measuring approximately 9–10 cm (3.5–4 inches) tall, it's the perfect quick afternoon project to hang on your Christmas tree, tie onto gift packages, or turn into a holiday keychain. Below you'll find the complete materials list, US abbreviations, step-by-step written instructions, and holiday finishing tips."
    ],

    // Section 1: Overview
    overview: {
      title: "What you will make",
      paragraphs: [
        "This mini gingerbread ornament is designed for speed and simplicity. You start by making two identical small legs, join them together with a short chain bridge to form the body and round head in one continuous piece, and then attach chubby little arms.",
        "To give your gingerbread man authentic bakery charm, we crown the head with a scalloped white icing cap worked with gentle wave stitches, embroidered rainbow sprinkles, and two cheerful red tummy buttons. Finally, a loop of natural jute twine turns your little gingerbread man into an instant heirloom Christmas tree ornament.",
        "This project takes under 1 hour from start to finish, making it an ideal last-minute holiday gift or tree-decorating craft."
      ]
    },

    // Section 2: Materials
    materialsTitle: "Materials for your gingerbread ornament",
    materials: [
      "DK or Sport-weight cotton-acrylic yarn (such as YarnArt Jeans or similar): approx. 20 g of Golden-Tan / Camel Brown, plus small amounts of Crisp White for icing, and bright Red, Mint Green, and Yellow for sprinkles and buttons.",
      "A 2.0 mm or 2.25 mm crochet hook (choose a hook size small enough to ensure tight, seamless stitches without stuffing showing through).",
      "Two 6 mm black safety eyes (or black embroidery floss if preferred).",
      "Small handful of lightweight polyester fiberfill (stuff firmly for a plump, round shape).",
      "Tapestry needle with a blunt tip, scissors, and a stitch marker.",
      "Approx. 15 cm (6 inches) of rustic jute twine or ribbon for the hanging loop (or a 25 mm keychain ring if making a bag charm)."
    ],
    materialsNote: "For best results, use a firm cotton or cotton-blend yarn. It gives the stitches clean definition and ensures the scalloped icing sits crisply on top of the head.",

    // Section 3: Abbreviations
    abbreviations: [
      { code: "MR", meaning: "Magic ring" },
      { code: "ch", meaning: "Chain stitch" },
      { code: "sl st", meaning: "Slip stitch" },
      { code: "sc", meaning: "Single crochet (US terms)" },
      { code: "hdc", meaning: "Half double crochet" },
      { code: "dc", meaning: "Double crochet" },
      { code: "inc", meaning: "Work 2 sc into the same stitch (increase)" },
      { code: "dec", meaning: "Work 2 stitches together as invisible decrease" },
      { code: "BLO", meaning: "Back loop only" },
      { code: "FLO", meaning: "Front loop only" }
    ],
    abbreviationsNote: "Numbers in parentheses [like (18)] indicate the total stitch count at the end of each round. Work in continuous spiral rounds without joining with a slip stitch, unless specifically noted.",

    // Section 4: Pattern Steps
    patternAnchor: "gingerbread-pattern",
    patternTitle: "Free crochet gingerbread man ornament pattern",
    inlinePinCallouts: [
      "Planning your holiday making list? Pin this free gingerbread ornament pattern to your Christmas crochet board so you have it ready!",
      "Love the scalloped icing cap detail? Pin this photo tutorial to your holiday amigurumi board!",
      "Save this mini gingerbread ornament pattern to Pinterest for an easy handmade stocking stuffer idea!"
    ],
    steps: [
      {
        number: 1,
        heading: "Step 1: Legs & Seamless Body Join",
        subtext: "Start with golden-tan yarn. We make two legs and connect them to crochet the body upward.",
        rounds: [
          "<strong>First Leg:</strong>",
          "R1: In golden-tan yarn, 6 sc in MR [6]",
          "R2: (inc) x 6 [12]",
          "R3–R5 (3 rounds): sc in each st around [12]. Fasten off first leg, leaving a short tail.",
          "<strong>Second Leg:</strong>",
          "Repeat R1–R5 for second leg, but <strong>do not fasten off</strong>. We will continue directly into the body.",
          "<strong>Joining Legs to form Body:</strong>",
          "R6: Ch 2 from second leg, join to first leg with 1 sc. Work 11 sc around first leg, work 2 sc in chain bridge, work 12 sc around second leg, work 2 sc in other side of chain bridge [28]",
          "R7: (13 sc, inc) x 2 [30]",
          "R8–R11 (4 rounds): sc in each st around [30]",
          "R12 (Shaping Tummy): (3 sc, dec) x 6 [24]",
          "R13: sc in each st around [24]",
          "R14 (Shaping Chest): (2 sc, dec) x 6 [18]",
          "R15: (sc, dec) x 6 [12]. Lightly stuff the legs and lower tummy with fiberfill."
        ],
        instructions: [
          "Keep your tension consistent so the joined bridge between the legs sits flat and upright.",
          "Stuff the legs firmly using the blunt end of a pencil or chopstick so the gingerbread man stands with plump shape."
        ],
        image: {
          src: "/images/blog/gingerbread-man/process/body-join-guide-1.webp",
          fallback: "/images/blog/gingerbread-man/process/body-join-guide-1.jpg",
          alt: "Connecting legs to form gingerbread body",
          caption: "Join the legs with a chain bridge and continue working the body upward in one seamless piece."
        }
      },
      {
        number: 2,
        heading: "Step 2: Head & Facial Shaping",
        subtext: "Continue directly from the neck in golden-tan yarn — no sewing required between head and body!",
        rounds: [
          "R16 (Expanding into Head): (inc) x 12 [24]",
          "R17: (3 sc, inc) x 6 [30]",
          "R18: (4 sc, inc) x 6 [36]",
          "R19–R23 (5 rounds): sc in each st around [36]",
          "<strong>Safety Eyes Placement:</strong> Insert 6 mm safety eyes between R21 and R22, spaced approx. 6 stitches apart.",
          "R24: (4 sc, dec) x 6 [30]",
          "R25: (3 sc, dec) x 6 [24]",
          "R26: (2 sc, dec) x 6 [18]. Stuff head and neck firmly. Pay attention to the neck junction so the head stays sturdy.",
          "R27: (sc, dec) x 6 [12]",
          "R28: (dec) x 6 [6]. Fasten off, weave tail through remaining 6 front loops, pull tight to close, and hide yarn tail inside."
        ],
        instructions: [
          "With black embroidery floss or thin black yarn, embroider a friendly curved smile centered between the eyes on R20.",
          "With pink yarn or diluted pastel blush, add two gentle blush marks just beneath the outer corners of the eyes for signature amigurumi cuteness."
        ],
        image: {
          src: "/images/blog/gingerbread-man/process/authentic-gingerbread-hero.webp",
          fallback: "/images/blog/gingerbread-man/process/authentic-gingerbread-hero.jpg",
          alt: "Gingerbread head and facial embroidery",
          caption: "Insert safety eyes and embroider a cheerful smile and rosy cheeks."
        }
      },
      {
        number: 3,
        heading: "Step 3: Little Outstretched Arms (Make 2)",
        subtext: "Crochet two chubby arms in golden-tan yarn.",
        rounds: [
          "R1: 6 sc in MR [6]",
          "R2: (sc, inc) x 3 [9]",
          "R3–R7 (5 rounds): sc in each st around [9]",
          "Stuff only the lower third of the arms lightly. Flatten the top opening and work 4 sc across both layers to seal.",
          "Fasten off, leaving a 20 cm tail for sewing."
        ],
        instructions: [
          "Sew the arms to the sides of the body just below the neck (at R14–R15), angled slightly downward or cheerfully outstretched.",
          "With white yarn, embroider 2–3 zigzag or wave stitches around each wrist to mimic sweet piped royal icing cuffs."
        ]
      },
      {
        number: 4,
        heading: "Step 4: Scalloped White Icing Cap & Sprinkles",
        subtext: "This delicious decorative frosting cap gives your gingerbread man his signature bakery look!",
        rounds: [
          "With crisp white yarn:",
          "R1: 6 sc in MR [6]",
          "R2: (inc) x 6 [12]",
          "R3: (sc, inc) x 6 [18]",
          "R4: (2 sc, inc) x 6 [24]",
          "R5: (3 sc, inc) x 6 [30]",
          "R6 (Scalloped Drip Border): *(sl st in next st, skip 1 st, 5 dc in next st, skip 1 st)* repeat 6 times around to form 6 scalloped icing drips. Sl st into first st to finish.",
          "Fasten off, leaving a long tail for stitching down."
        ],
        instructions: [
          "Before sewing the icing cap to the head, use red, mint green, and yellow yarn to embroider tiny straight sprinkle stitches across the white cap.",
          "Pin the icing cap slightly tilted or centered atop the head, then neatly stitch the scalloped points down with white yarn.",
          "On the tummy, embroider two small round red buttons (or satin stitch discs) at R9 and R12."
        ],
        image: {
          src: "/images/blog/gingerbread-man/process/icing-guide-1.webp",
          fallback: "/images/blog/gingerbread-man/process/icing-guide-1.jpg",
          alt: "Scalloped white icing cap with sprinkles",
          caption: "Embroider multicolored sprinkles on the white frosting cap before stitching it to the head."
        }
      },
      {
        number: 5,
        heading: "Step 5: Ornament Hanging Loop or Keychain Assembly",
        subtext: "Turn your mini gingerbread man into a tree ornament or keepsake bag charm.",
        instructions: [
          "<strong>For a Christmas Tree Ornament:</strong> Cut a 15 cm (6 inch) piece of rustic jute twine or festive red satin ribbon. Fold it in half, thread the loop through the center-top of the white icing cap using your tapestry needle, knot the ends securely inside, and pull tight.",
          "<strong>For a Keychain or Backpack Charm:</strong> Attach a 25 mm split ring with a short 3-link chain to the top of the head using a reinforced stitch and matching yarn.",
          "Your mini crochet gingerbread man ornament is ready to bring holiday joy to your home or brighten someone's Christmas stocking!"
        ]
      }
    ],

    // Section 5: Finishing Tips
    tipsTitle: "Tips for a neat holiday gingerbread ornament",
    tips: [
      {
        title: "Keep your stitches firm and tight",
        text: "Amigurumi requires tight tension so that the white polyester stuffing doesn't peek through the golden-tan stitches. If you notice any gaps, drop down one hook size (e.g. from 2.5 mm to 2.0 mm)."
      },
      {
        title: "Embroider sprinkles before sewing down the cap",
        text: "It is much easier to secure the yarn tails on the underside of the white icing cap before it is sewn to the head. Knot the threads on the wrong side where they will be permanently hidden."
      },
      {
        title: "Reinforce the hanging loop",
        text: "When attaching twine or ribbon to the top of the head, pass through both the white icing layer and the underlying golden-tan head stitches so that hanging weight is distributed evenly."
      },
      {
        title: "Explore the matching Christmas Collection",
        text: "Want to create a full holiday tree set? Check out the complete 5-in-1 Christmas Collection featuring the Santa Claus, Grinch, Holiday Snowman, Little Dragon, and larger Gingerbread Doll."
      }
    ],

    // Section 6: Download CTA
    downloadCta: {
      id: "download-pattern",
      title: "Download the Free Gingerbread Ornament Printable PDF",
      description: "Prefer a clean, printable PDF to keep in your project bag? Get the full **free printable photo tutorial** with round-by-round checklists and stitch guides delivered straight to your email.",
      buttonText: "Get My Free Printable PDF",
      buttonLink: "/product/6",
      note: "Instant free delivery • Printable PDF with step photos • US crochet terms"
    },

    // Section 7: FAQs
    faqs: [
      {
        question: "How long does it take to crochet this gingerbread ornament?",
        answer: "Most crocheters can complete this mini gingerbread man in about 45 to 60 minutes. The seamless legs-to-head construction minimizes sewing, making it one of the quickest holiday amigurumi projects."
      },
      {
        question: "Can I use plush / chenille velvet yarn instead of cotton?",
        answer: "Yes! If you use plush chenille yarn (like Himalaya Dolphin Baby or Wolans Bunny Baby) with a 4.0 mm hook, the pattern will turn into a larger, cuddly 20 cm plush gingerbread doll rather than a tree ornament."
      },
      {
        question: "Is this pattern suitable for beginners?",
        answer: "Yes. The pattern uses standard single crochet stitches, simple increases and decreases, and basic scallop wave stitches for the icing. We provide round-by-round stitch counts to keep you on track."
      },
      {
        question: "How do I care for and wash my crochet ornaments?",
        answer: "For cotton ornaments, gently spot clean with cold water and mild soap. Lay flat to air dry. Do not machine wash or tumble dry to preserve the facial embroidery and icing shape."
      }
    ],

    // Section 8: Save for Later & Pinterest Pins
    saveForLater: {
      id: "save-for-later",
      title: "Save this Gingerbread Ornament Pattern to Pinterest",
      intro: "Planning your holiday crafting schedule? Save this free gingerbread crochet pattern to your Christmas Crochet, Holiday Crafts, or Amigurumi Pinterest boards so you have it ready when holiday decorating begins!",
      relatedText: "Looking for more festive projects? Pair your gingerbread man with our <a href=\"/product/6\" style=\"color: #be6c87; font-weight: 700; text-decoration: underline;\">Christmas Collection 5-in-1 Amigurumi Bundle</a> or explore the <a href=\"/product/5\" style=\"color: #be6c87; font-weight: 700; text-decoration: underline;\">Plush Santa Claus Doll Pattern</a>.",
      pins: [
        {
          id: 1,
          directPinUrl: "",
          angle: "Hero Frontal Flatlay",
          keyword: "crochet gingerbread man free pattern",
          title: "Free Crochet Gingerbread Man Ornament Pattern",
          description: "Crochet an adorable mini gingerbread man Christmas ornament with scalloped white icing and colorful sprinkles. Free pattern, round-by-round US instructions & printable PDF on Cozy Stitches.",
          alt: "Cute handmade crochet gingerbread man Christmas tree ornament with white icing cap and rainbow sprinkles.",
          board: "Christmas Crochet Patterns",
          pngFile: "/images/blog/gingerbread-man/pins/01-gingerbread-hero.png",
          webpFile: "/images/blog/gingerbread-man/pins/01-gingerbread-hero.webp",
          width: 1024,
          height: 1536
        },
        {
          id: 2,
          directPinUrl: "",
          angle: "Tree Ornament & Holiday Decor",
          keyword: "crochet christmas ornaments free",
          title: "DIY Crochet Gingerbread Tree Ornament — Free Pattern",
          description: "Add handmade warmth to your Christmas tree with this mini amigurumi gingerbread ornament. Fast 45-minute project with hanging twine loop. Visit Cozy Stitches for the free written pattern.",
          alt: "Handmade crochet gingerbread man hanging as a festive Christmas tree ornament.",
          board: "Crochet Christmas Ornaments",
          pngFile: "/images/blog/gingerbread-man/pins/02-tree-ornament.png",
          webpFile: "/images/blog/gingerbread-man/pins/02-tree-ornament.webp",
          width: 1024,
          height: 1536
        },
        {
          id: 3,
          directPinUrl: "",
          angle: "Craft Details",
          keyword: "mini gingerbread amigurumi",
          title: "Gingerbread Crochet Pattern — Distinctive Amigurumi Details",
          description: "Enjoy the characterful details: scalloped icing, embroidered sprinkles, rosy cheeks and red buttons. Free pattern and original instructional photos on Cozy Stitches.",
          alt: "Crochet gingerbread man ornament shown step by step with distinctive amigurumi details.",
          board: "Crochet Tutorials & Patterns",
          pngFile: "/images/blog/gingerbread-man/pins/03-craft-details.png",
          webpFile: "/images/blog/gingerbread-man/pins/03-craft-details.webp",
          width: 1024,
          height: 1536
        },
        {
          id: 4,
          directPinUrl: "",
          angle: "Photo Guidance",
          keyword: "crochet gingerbread pattern",
          title: "Gingerbread Crochet Pattern — With Original Step Photos",
          description: "Follow written rounds alongside original progress photos while making your gingerbread. Free pattern and printable guide on Cozy Stitches.",
          alt: "Macro close-up of crochet gingerbread man icing cap, colorful sprinkles, and cheerful face.",
          board: "Free Crochet Patterns",
          pngFile: "/images/blog/gingerbread-man/pins/04-photo-guide.png",
          webpFile: "/images/blog/gingerbread-man/pins/04-photo-guide.webp",
          width: 1024,
          height: 1536
        },
        {
          id: 5,
          directPinUrl: "",
          angle: "Included Features",
          keyword: "quick holiday crochet gift",
          title: "Gingerbread Crochet Pattern — Explore the Included Features",
          description: "Looking for an easy, quick handmade Christmas gift? Crochet this sweet mini gingerbread man ornament with scalloped icing and embroidered sprinkles. Free pattern on Cozy Stitches.",
          alt: "Mini crochet gingerbread man keychain idea for handmade holiday gift giving.",
          board: "Handmade Holiday Gifts",
          pngFile: "/images/blog/gingerbread-man/pins/05-included-features.png",
          webpFile: "/images/blog/gingerbread-man/pins/05-included-features.webp",
          width: 1024,
          height: 1536
        },
        {
          id: 6,
          directPinUrl: "",
          angle: "Seasonal Inspiration",
          keyword: "crochet christmas collection",
          title: "Gingerbread Crochet Pattern — Handmade Holiday Inspiration",
          description: "Add a handmade touch to your Christmas display with this crochet project. Save this pin to your holiday boards and grab the free pattern on Cozy Stitches.",
          alt: "Festive amigurumi: crochet gingerbread man in a warm holiday seasonal composition.",
          board: "Holiday Amigurumi Patterns",
          pngFile: "/images/blog/gingerbread-man/pins/06-seasonal-inspiration.png",
          webpFile: "/images/blog/gingerbread-man/pins/06-seasonal-inspiration.webp",
          width: 1024,
          height: 1536
        }
      ],
      credit: "Pattern design and photography © CozyStitches. Free for personal making and small batch gift giving. Feel free to link to this page!"
    },

    // Cross-promote relevant products (Christmas Collection & Santa Doll)
    relatedProducts: [6, 5, 1]
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
