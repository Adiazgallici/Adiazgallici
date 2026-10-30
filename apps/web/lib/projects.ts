export type Project = {
  slug: string;
  name: string;
  category:
    "Products" | "Built for Lessio & Co" | "Client work" | "Small tools";
  number: string;
  year: string;
  headline: string;
  description: string;
  url: string;
  urlLabel: string;
  stack: string[];
  problem: string;
  built: string[];
  context: string;
  /** First month in real use, as YYYY-MM. */
  liveSince: string;
  /** Evidence of real use, not of effort. The headline goes on the map and the card. */
  proof: { headline: string; detail: string[] };
  color: string;
  caption: string;
  metric?: string;
  /** Address shown in the screenshot's browser bar, when it differs from the link. */
  screenHost?: string;
  /** Plain-language status shown on the model card. */
  status: string;
  /** One real example of what goes in and what comes out. */
  io: { input: string; output: string; inputIsCode?: boolean; outputIsCode?: boolean };
  /** Position on the home map: x = built for us (0) to built for others (1), y = how much AI it uses (0 to 1). */
  map: { x: number; y: number };
};
const projectData: Project[] = [
  {
    slug: "vindue",
    name: "Vindue",
    category: "Products",
    number: "01",
    year: "2026",
    headline: "A product photo. A whole gallery.",
    description:
      "AI product photography for marketplace sellers. From a product brief to a complete, consistent image gallery.",
    url: "https://vindue.com.ar",
    urlLabel: "Try Vindue",
    stack: [
      "Next.js 16",
      "React 19",
      "OpenAI",
      "Google Gemini",
      "Redis",
      "Vercel Blob",
      "sharp",
      "Clerk",
    ],
    problem:
      "We import products and sell them online, and every new product needs a full, consistent gallery before it can go live: the hero, the details, the dimensions, the product in use. I needed that for Lessio & Co, every time a new shipment arrived.",
    built: [
      "A reusable product brief with reference photos and brand guidelines.",
      "An editable shot planner with 14 image archetypes and batches of up to 10 images.",
      "Per-image adjustments, retries, version history and marketplace export.",
    ],
    context:
      "Lessio & Co was the first test case. What started as a tool for our own listings became a product for other sellers. The screenshots show the app itself, running locally with a real product and the ten images Vindue generated for it. The public landing page was designed by someone else, so it isn’t shown here.",
    liveSince: "2026-02",
    proof: {
      headline: "Live since February 2026",
      detail: ["Turns one product brief into a full 10-image listing gallery.", "Built on our own Mercado Libre listings first, now open to other sellers."],
    },
    color: "#ece7dd",
    caption: "The Vindue app with a real gallery it generated for a kids’ activity table · captured October 24, 2026",
    metric: "14 shot archetypes",
    screenHost: "app.vindue.com.ar",
    status: "Live, open to other sellers",
    io: {
      input: "One product brief, a few reference photos and the brand guidelines",
      output: "A complete listing gallery: hero, details, dimensions and the product in use, ready to upload",
    },
    map: { x: 0.72, y: 0.94 },
  },
  {
    slug: "partidito",
    name: "Partidito",
    category: "Products",
    number: "02",
    year: "2026",
    headline: "Better teams. Better Wednesday nights.",
    description:
      "Less arguing in the group chat. More football. Organize matches, balance teams with AI and let the group rate the players.",
    url: "https://www.partidito.com.ar",
    urlLabel: "Visit Partidito",
    stack: ["Next.js 16", "React 19", "Drizzle", "Turso", "NextAuth", "OpenAI"],
    problem:
      "Amateur football runs on group chats, memory and a lot of opinions. Picking balanced teams and keeping track of results should not be another job.",
    built: [
      "Separate spaces for different football groups, with their own players and matches.",
      "AI-assisted team balancing using player ratings and positions.",
      "Public standings and rating polls shared through a WhatsApp link.",
    ],
    context:
      "Built around the rituals of amateur football: getting everyone together, picking sides and arguing about who played best.",
    liveSince: "2026-01",
    proof: {
      headline: "57 teams, 505 players, 97 matches",
      detail: ["Teams created by amateur football groups, not by me. 25 of them have already played at least one match.", "Counted from Partidito’s public team directory."],
    },
    color: "#e0e8db",
    caption: "Setting up a match: sixteen invented players picked, ready for the AI to balance the teams · captured October 24, 2026",
    metric: "Built for the group chat",
    status: "Live",
    io: {
      input: "Tonight’s players, their ratings and the positions they like",
      output: "Two balanced teams, then the result and the updated standings",
    },
    map: { x: 0.9, y: 0.62 },
  },
  {
    slug: "isclaude-2x",
    name: "isclaude-2x",
    category: "Small tools",
    number: "06",
    year: "2026",
    headline: "One small itch. One npm package.",
    description:
      "A Claude Code statusline built for the March 2026 usage promotion. Published on npm, with a minimal view and a full dashboard.",
    url: "https://www.npmjs.com/package/isclaude-2x",
    urlLabel: "View on npm",
    stack: ["Shell", "jq", "npm", "Claude Code"],
    problem:
      "During the March 2026 Claude usage promotion, I wanted to see the current usage window and the next transition without leaving the terminal.",
    built: [
      "A minimal statusline with model, context usage and transition countdown.",
      "A full dashboard with a daily timeline and usage limits.",
      "A package distributed through npm with a single install command.",
    ],
    context:
      "A small open-source utility for a time-bound promotion, which ran March 13–28, 2026. The promotion is over, but the package is still on npm.",
    liveSince: "2026-03",
    proof: {
      headline: "553 npm downloads in a year",
      detail: ["8 GitHub stars and 1 fork."],
    },
    color: "#e5e3f0",
    caption: "Public GitHub README · captured October 21, 2026",
    metric: "553 npm downloads / year",
    status: "Published on npm, promotion ended",
    io: {
      input: "npx isclaude-2x",
      output: "Opus 4.6 │ 39% │ ⚡ 2x ~ 1x 9:00am (5h12m)",
      inputIsCode: true,
      outputIsCode: true,
    },
    map: { x: 0.84, y: 0.2 },
  },
  {
    slug: "lessio-stock",
    name: "Lessio Stock",
    category: "Built for Lessio & Co",
    number: "05",
    year: "2025–26",
    headline: "The other side of the storefront.",
    description:
      "The internal system behind our import business: purchase orders from China, stock at home and in Mercado Libre FULL, sales, shipments and costs.",
    url: "https://lessioco.com.ar",
    urlLabel: "Visit the sign-in page",
    stack: [
      "Next.js 16",
      "React 19",
      "Prisma",
      "PostgreSQL",
      "Mercado Libre API",
      "Web Push",
    ],
    problem:
      "We import products from China and sell them on Mercado Libre and our own channels. That means tracking orders on their way, stock at home and in the FULL warehouse, every sale, shipment and landed cost. Spreadsheets only take you so far.",
    built: [
      "Separate inventory for our own warehouse and Mercado Libre FULL, plus import orders still in transit.",
      "Marketplace order synchronization, shipments, stock loans and supplies.",
      "Restock suggestions for the next import, landed costs, auditing, push notifications and an AI chat interface.",
    ],
    context:
      "An internal tool for Lessio & Co, where I’m co-founder and CTO. Access is restricted, so the screenshots come from a local copy of the app filled with invented demo products. No real customer, financial or SKU data is shown.",
    liveSince: "2026-01",
    proof: {
      headline: "7,170 Mercado Libre orders synced",
      detail: ["In daily use by our team since January 2026.", "Connected directly to the Mercado Libre API: orders, FULL warehouse stock and promotions.", "More than 52,000 stock movements logged, 21 shipments to FULL and 60 import orders tracked."],
    },
    color: "#e8e3d9",
    caption: "The real app, running with invented demo data · captured October 24, 2026",
    metric: "Built for our daily operations",
    status: "In daily use, private",
    io: {
      input: "A Mercado Libre order for one unit from the FULL warehouse",
      output: "FULL stock down by one, the sale’s cost recorded, an audit entry and a restock check",
    },
    map: { x: 0.06, y: 0.36 },
  },
  {
    slug: "lessio-store",
    name: "Lessio & Co",
    category: "Built for Lessio & Co",
    number: "04",
    year: "2026",
    headline: "Our brand. Our storefront.",
    description:
      "A mobile-first storefront for the products we import. Owning the shopping experience, content and data, one step at a time.",
    url: "https://lessioandco.com.ar",
    urlLabel: "Explore the storefront",
    stack: [
      "Next.js 16",
      "React 19",
      "Prisma",
      "Neon",
      "Playwright",
      "Lighthouse",
    ],
    problem:
      "I wanted more control over how people discover our products on a phone, how we tell their story and what we learn from the experience.",
    built: [
      "A mobile-first product catalog with categories, search and product variants.",
      "A custom cart and checkout, developed as a gradual transition from Tiendanube.",
      "Automated browser and accessibility checks, with a Lighthouse performance budget.",
    ],
    context:
      "A storefront in active development, alongside the existing business. It runs alongside our current store while we finish payments and shipping.",
    liveSince: "2026-09",
    proof: {
      headline: "Online since September 2026",
      detail: ["Our own storefront, taking over from Tiendanube step by step."],
    },
    color: "#eee3d7",
    caption: "The new storefront · captured October 24, 2026",
    metric: "Mobile comes first",
    status: "Online, in active development",
    io: {
      input: "A parent on a phone, looking for a gift",
      output: "A store we own: categories, search, product variants and a checkout",
    },
    map: { x: 0.14, y: 0.1 },
  },
  {
    slug: "passadore",
    name: "Inmobiliaria Passadore",
    category: "Client work",
    number: "03",
    year: "2025–26",
    headline: "Semantic property search. In everyday language.",
    description:
      "AI-powered property search for Inmobiliaria Passadore. Describe what you want in your own words; the system understands your intent and finds matching listings.",
    url: "https://www.inmobiliariapassadore.com.ar",
    urlLabel: "Visit Inmobiliaria Passadore",
    stack: [
      "Next.js 14",
      "React 18",
      "OpenAI",
      "Prisma",
      "PostgreSQL",
      "GVAmax",
    ],
    problem:
      "People describe the home they want in their own words: a neighborhood, a budget, a “depto.” Traditional filters make them translate that into a form.",
    built: [
      "AI interpretation of search intent, Argentine expressions, neighborhoods and budgets, translated into structured property filters.",
      "Property listings and detail pages connected to the GVAmax CRM.",
      "Contact flows through WhatsApp and email.",
    ],
    context:
      "Client work for Inmobiliaria Passadore in Córdoba. An OpenAI language model interprets the meaning of a request and translates it into structured filters over CRM-backed listings.",
    liveSince: "2025-11",
    proof: {
      headline: "In production since November 2025",
      detail: ["Answers searches on the agency’s public website.", "Listings come straight from the agency’s CRM."],
    },
    color: "#e6e4e1",
    caption: "Public agency website · captured October 21, 2026",
    metric: "AI-powered semantic search",
    status: "Delivered to the client",
    io: {
      input: "“depto en Nueva Córdoba hasta 300 lucas”",
      output: '{ type: "apartment", zone: "Nueva Córdoba", maxPrice: 300000, currency: "ARS" }',
      outputIsCode: true,
    },
    map: { x: 0.97, y: 0.82 },
  },
];
const order = [
  "vindue",
  "partidito",
  "passadore",
  "lessio-store",
  "lessio-stock",
  "isclaude-2x",
];
export const projects: Project[] = order.map((slug) =>
  projectData.find((project) => project.slug === slug)!,
);
/** Usage numbers were counted on this date. */
export const snapshotDate = "October 24, 2026";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export function formatMonth(yyyyMm: string) {
  const [y, m] = yyyyMm.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}
export function monthsLive(yyyyMm: string, now = new Date(2026, 9, 24)) {
  const [y, m] = yyyyMm.split("-").map(Number);
  return Math.max(1, (now.getFullYear() - y) * 12 + now.getMonth() + 1 - m);
}
export const firstLive = [...projects].sort((a, b) => a.liveSince.localeCompare(b.liveSince))[0];
