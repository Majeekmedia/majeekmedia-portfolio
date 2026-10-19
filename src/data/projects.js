/**
 * PROJECT DATA — single source of truth for all project presentation.
 *
 * Rules, from the brief and CONTENT_GAPS.md:
 *
 *  1. NO INVENTED CONTENT. No client names, testimonials, user counts, revenue or
 *     screenshots that were not supplied. Missing values are `null` and the UI
 *     renders nothing rather than a fabrication.
 *
 *  2. `outcome` figures are CLIENT-REPORTED, not independently verified.
 *     `outcomeIsReported: true` makes the UI label them as such (decision D2).
 *
 *  3. `status` distinguishes completed / active / in-progress.
 *
 *  4. `challenge` / `solution` describe a real technical problem. Only populated
 *     where the source documentation records one.
 *
 * SOURCES FOR EVERY CLAIM BELOW
 *   VHM:          repo README (read in full) + 6 product screenshots supplied by
 *                 the owner. Live at community.vhm.ng.
 *   Majeek Weather: github.com/Majeekmedia/weather-app README, read in full.
 *   Majeek Notes:   github.com/Majeekmedia/notes-app README, read in full.
 *   UniTrade:       originally supplied by the owner.
 */

/**
 * status:      "completed" | "active" | "in-progress"
 * discipline:  "web" | "mobile"
 */
export const projects = [
  {
    index: "01",
    slug: "vhm-community-platform",
    title: "VHM Community Management Platform",
    category: "Multi-tenant SaaS",
    discipline: "web",
    status: "active",
    statusLabel: "Live",
    summary:
      "A multi-tenant platform for residential community and estate management: automated levy and rent collection through Paystack, property-derived memberships, visitor access codes, maintenance workflows and estate elections.",
    // One line for the index and the homepage. Purpose-written, because the
    // first sentence of `summary` is a fragment rather than a description.
    excerpt:
      "Multi-tenant estate and community management: automated levy collection, six role-based portals and Paystack payouts, live at community.vhm.ng.",
    problem:
      "Estate administration in Nigeria runs on spreadsheets, WhatsApp groups and manual reconciliation. Nobody has a shared record of who owes what, capital projects have no visible funding progress, and access control at the gate is a paper book.",
    challenge:
      "A platform serving estates, landlords, tenants, agents, staff and household members cannot decide access from a role field. The same person is a landlord in one community and a tenant in another, and a flat can change hands. Getting this wrong leaks one estate's financial data into another's.",
    solution:
      "Identity and authorisation are separate concerns. `auth.users` and `profiles` hold identity; a `memberships` table holds authorisation and the active community context; `resident_relationships` holds household context. Property-level access is derived from real tenancy relationships rather than from a stored role, and every table enforces isolation through Row-Level Security at the PostgreSQL layer, so a mis-scoped query returns nothing instead of someone else's data.",
    features: [
      "Six role-based portals: super admin, community admin, landlord, tenant, agent and staff",
      "Single identity with Active Membership switching between communities and roles",
      "Three-tier property hierarchy: compound, structure, space",
      "Automated levy creation with rent and dues collection through Paystack",
      "Split payments with configurable fee absorption and dual receiver wallets",
      "Automated payouts to verified Nigerian bank accounts via Paystack Transfers",
      "Visitor access codes as time-bounded OTP or QR passes",
      "Vehicle tags for perimeter gate clearance",
      "KYC verification for residents, agents and estate onboarding",
      "Maintenance ticketing with work orders and staff assignment",
      "Estate elections with quorum, secret ballots and certified results",
      "Community notices, discussion forums and real-time notifications",
      "Resident marketplace and verified agent property listings",
      "Row-Level Security on every table enforcing tenant and role isolation",
    ],
    role: [
      "Platform architecture and system design",
      "Monorepo setup across web, mobile and shared packages",
      "Database schema, RLS policy design and migrations",
      "Payments and payout integration",
      "Interface design and implementation across all portals",
    ],
    outcome: null,
    outcomeIsReported: false,
    tech: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Expo",
      "React Native",
      "Supabase",
      "PostgreSQL",
      "Row-Level Security",
      "Paystack",
      "Tailwind CSS",
      "Turborepo",
    ],
    link: { href: "https://community.vhm.ng", label: "View platform" },
    images: [
      {
        src: "/projects/vhm/admin_dashboard.png",
        alt: "Community admin dashboard showing occupancy rate, community population, revenue collected and collection rate",
      },
      {
        src: "/projects/vhm/landlord_dashboard.png",
        alt: "Landlord portal showing property portfolio status, tenant dues owed, community levies and wallet balance",
      },
      {
        src: "/projects/vhm/tenant_dashboard.png",
        alt: "Tenant portal showing total outstanding, overdue bills, visitor access and maintenance summary",
      },
      {
        src: "/projects/vhm/admin_mobile.png",
        alt: "Community admin dashboard on mobile with occupancy, population and revenue metrics",
      },
      {
        src: "/projects/vhm/landlord_mobile.png",
        alt: "Landlord dashboard on mobile with quick actions to add a property, invite a tenant and create a payment request",
      },
      {
        src: "/projects/vhm/tenant_mobile.png",
        alt: "Tenant dashboard on mobile showing residence details and active resident status",
      },
    ],
    note: "Proprietary software owned by Village Headmaster Technologies Limited.",
  },

  {
    index: "02",
    slug: "majeek-weather",
    title: "Majeek Weather",
    category: "Multi-provider app",
    discipline: "mobile",
    status: "completed",
    statusLabel: "Completed",
    summary:
      "A multi-provider weather app for Expo. It runs on two very different weather APIs behind one adapter, which forced the real problem: the two providers do not agree on what a forecast is.",
    excerpt:
      "A weather app that runs on two different forecasting APIs at once, and declares what each one can honestly provide rather than pretending they are identical.",
    problem:
      "Most weather apps are welded to a single API. Supporting a second provider is usually treated as swapping a base URL, which breaks the moment the two disagree about forecast horizon, time step, condition codes and geocoding.",
    challenge:
      "The disagreements are real, not cosmetic. Open-Meteo gives 7 days at hourly steps using WMO condition codes and has no reverse geocoding. OpenWeatherMap gives 5 days at 3-hour steps using its own condition-ID domain and does support reverse geocoding. A tidy abstraction that hid those differences would have been a lie the interface then had to work around.",
    solution:
      "The adapters declare their limits instead of pretending to be interchangeable. Each publishes a ProviderCapabilities object the interface reads, so with OpenWeatherMap active the app shows 5 days and labels the strip 3-hourly rather than fabricating two more days. Every screen consumes one normalised domain model, so no provider payload ever reaches the UI and adding a third provider stays a contained change.",
    features: [
      "Current conditions with feels-like, humidity, wind, pressure and cloud cover",
      "Next 24 hours rendered in the location's own timezone",
      "Multi-day forecast with a range bar drawn on one shared scale, so a mild day and a hot day look different",
      "Sunrise and sunset where the provider actually supplies them",
      "City search with geocoding, and device GPS with every permission outcome handled",
      "Saved locations persisted locally, with pull to refresh",
      "Offline cache that always states how old the forecast is",
      "Runtime provider switching with per-provider capability disclosure",
    ],
    role: ["Sole developer", "Architecture, provider adapters and interface"],
    outcome: null,
    outcomeIsReported: false,
    tech: [
      "React Native",
      "Expo SDK 57",
      "TypeScript",
      "Expo Router",
      "TanStack Query",
      "react-native-svg",
    ],
    link: { href: "https://github.com/Majeekmedia/weather-app", label: "View repository" },
    images: [
      {
        src: "/projects/weather-app/01-today.png",
        alt: "Current conditions screen with a sky gradient chosen from the live weather condition",
      },
      {
        src: "/projects/weather-app/02-daily-forecast.png",
        alt: "Multi-day forecast list with temperature range bars on a shared scale",
      },
      {
        src: "/projects/weather-app/06-today-light.png",
        alt: "Current conditions in light mode",
      },
      {
        src: "/projects/weather-app/03-locations.png",
        alt: "Saved locations and city search",
      },
      {
        src: "/projects/weather-app/04-settings.png",
        alt: "Settings screen stating each provider's real capabilities",
      },
      {
        src: "/projects/weather-app/05-empty-state.png",
        alt: "First-run empty state",
      },
    ],
    note: "MIT licensed. Weather data belongs to Open-Meteo and OpenWeatherMap, used under their terms with attribution shown in the app.",
  },

  {
    index: "03",
    slug: "majeek-notes",
    title: "Majeek Notes",
    category: "Offline-first app",
    discipline: "mobile",
    excerpt:
      "An offline-first notes app with search, tags, pinning and bulk editing. Everything stays on the device, and nothing leaves the phone.",
    problem:
      "The goal was to demonstrate navigation, forms, list rendering and local persistence properly rather than to compete with a full note-taking product, so every feature had to earn its place against that goal.",
    challenge:
      "Debounced autosave loses the final keystrokes if the user leaves immediately. And data fields do get added after a first release. Getting either wrong means silent data loss in an app whose entire promise is that your notes are safe.",
    solution:
      "Saves are debounced at 400ms with an explicit flush on unmount, so pending edits are written before leaving. Stored data is normalised on read, which back-fills fields added later without changing the storage key. Bumping that key would have made every existing note vanish, which is far worse than a one-line migration.",
    features: [
      "Create, edit and delete notes",
      "Search across titles, bodies and tags",
      "Tags with a chip editor and autocomplete, plus rename and delete across every note that uses them",
      "Bulk selection for multi-pin, multi-tag and multi-delete",
      "Pinning that deliberately leaves the updated timestamp alone",
      "Sorting by last edited, date created or title",
      "Two-screen flow using Expo Router file-based navigation",
      "Autosave with a debounce plus a flush on exit",
      "Light and dark mode following the system setting",
      "Labelled buttons and rows for screen readers, with real empty states",
    ],
    role: ["Sole developer", "Architecture, interface and persistence"],
    outcome: null,
    outcomeIsReported: false,
    tech: [
      "React Native",
      "Expo SDK 57",
      "TypeScript",
      "Expo Router",
      "AsyncStorage",
      "React 19",
    ],
    link: { href: "https://github.com/Majeekmedia/notes-app", label: "View repository" },
    images: [
      {
        src: "/projects/notes-app/01-notes-list.png",
        alt: "Notes list with pinned notes held above the rest",
      },
      {
        src: "/projects/notes-app/02-search-and-filter.png",
        alt: "Search across notes with tag filtering",
      },
      {
        src: "/projects/notes-app/07-dark-mode.png",
        alt: "Notes list in dark mode",
      },
      {
        src: "/projects/notes-app/04-note-editor.png",
        alt: "Note editor",
      },
      {
        src: "/projects/notes-app/03-actions-menu.png",
        alt: "Long-press actions menu offering pin and delete",
      },
      {
        src: "/projects/notes-app/05-empty-state.png",
        alt: "Empty state with a clear call to action",
      },
    ],
    note: "MIT licensed. Storage is AsyncStorage, which is unencrypted: fine for notes, unsuitable for secrets.",
  },

  {
    index: "04",
    slug: "crypto-exchange",
    title: "Crypto Exchange Platform",
    category: "Functional MVP",
    discipline: "web",
    status: "completed",
    statusLabel: "Completed",
    summary:
      "A trading interface built to exchange-grade conventions: live market data, order placement, wallet views, a KYC review workflow and a full administrative control panel.",
    excerpt:
      "An exchange-grade trading interface with live market data, order execution, KYC review workflows and a full administrative control panel.",
    problem:
      "A credible exchange interface has to represent order state, balances and market data accurately at every moment, and give administrators a review path for identity verification without blocking the trading view.",
    challenge: null,
    solution: null,
    features: [
      "Email and password authentication with session management",
      "KYC workflow with document upload, review queue and admin approval",
      "Portfolio overview with profit and loss tracking",
      "Wallet interface with deposit and withdrawal flows",
      "Administrator-managed coin listing module",
      "Buy and sell order execution with transaction history",
      "Live market data with price charts and indicators",
      "Administrative panel for users, KYC submissions and coin management",
    ],
    role: [
      "Full-stack development",
      "Trading interface implementation",
      "Real-time data integration",
      "Administrative system architecture",
    ],
    outcome: null,
    outcomeIsReported: false,
    tech: ["React", "Vite", "Tailwind CSS", "Supabase", "Node.js"],
    link: { href: "https://unitradeupdated.netlify.app/", label: "View build" },
    images: [
      {
        src: "/projects/unitrade/dashboard1.png",
        alt: "Trading dashboard with market data and order panel",
      },
      { src: "/projects/unitrade/home1.png", alt: "Exchange landing view" },
      {
        src: "/projects/unitrade/dashboard2.png",
        alt: "Portfolio and holdings view",
      },
      { src: "/projects/unitrade/dashboard3.png", alt: "KYC verification workflow" },
      { src: "/projects/unitrade/dashboard4.png", alt: "Administrative control panel" },
    ],
    // Honesty disclosure, required by the brief. Made MORE prominent, not less.
    note: "Trading is simulated. There is no real blockchain execution and no live funds involved.",
  },
];

/** Projects removed at the owner's request. Kept as a record, not rendered. */
export const removedProjects = [
  {
    title: "Music Career Management Platform (MajeekHub)",
    reason:
      "Removed by owner. Was the only SaaS project; the SaaS capability statement covers that ground instead.",
  },
  {
    title: "Majeek Media Portfolio Website",
    reason:
      "Removed. It is the site being viewed, and its screenshot depicted the retired design.",
  },
];

/** Grouped for the homepage sequence. */
export const webProjects = projects.filter((p) => p.discipline === "web");
export const mobileProjects = projects.filter((p) => p.discipline === "mobile");
export const saasProjects = projects.filter((p) =>
  p.category.toLowerCase().includes("saas")
);

/**
 * Resolve a project by its URL slug.
 *
 * Returns undefined for an unknown slug so the route can render a not-found state
 * rather than an empty page.
 */
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

/**
 * The projects immediately before and after a given slug, in presentation order.
 * Used to put real next/previous navigation at the bottom of a project page so a
 * visitor can keep reading instead of going back to the index.
 */
export function getProjectNeighbours(slug) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: null, next: null };
  return {
    previous: i > 0 ? projects[i - 1] : null,
    next: i < projects.length - 1 ? projects[i + 1] : null,
  };
}

/**
 * A short excerpt for an index listing: the first sentence only.
 *
 * The full `summary` runs to several lines, which is right on a project page and
 * wrong in an index where four of them means a very long scroll before you see
 * the second project at all.
 */
export function projectExcerpt(project) {
  if (!project) return "";
  // Prefer the purpose-written excerpt.
  if (project.excerpt) return project.excerpt;

  // Fall back to the first sentence of the summary, guarding against the case
  // where a summary has no terminal punctuation.
  if (!project.summary) return "";
  const firstSentence = project.summary.split(/(?<=[.!?])\s+/)[0];
  return firstSentence.endsWith(".") ? firstSentence : `${firstSentence}.`;
}

/** Display label for a project's discipline, used by index filters. */
export const disciplineLabel = {
  web: "Web platform",
  mobile: "Mobile app",
};

/**
 * Category and discipline as a single readable line.
 *
 * Printing both unconditionally produced "Mobile App / Mobile app", which says
 * the same thing twice. The discipline is only appended when it adds information
 * the category does not already carry.
 */
export function projectMeta(project) {
  if (!project) return "";
  const category = project.category ?? "";
  const discipline = disciplineLabel[project.discipline] ?? project.discipline;

  /*
   * Only append the discipline when it adds information.
   *
   * Two things can make it redundant, and the first version checked neither:
   *   - the category already names the discipline ("Mobile App")
   *   - the category already ends in a device/app word, so adding "Mobile app"
   *     produces "Multi-provider app / Mobile app", which says app twice.
   */
  const lowerCategory = category.toLowerCase();
  const disciplineWords = project.discipline === "mobile"
    ? ["mobile", "app", "ios", "android"]
    : ["web", "platform", "site", "dashboard"];

  if (disciplineWords.some((word) => lowerCategory.includes(word))) return category;

  return category ? `${category} / ${discipline}` : discipline;
}

/** Engineering capability list. Every item is evidenced by the work above. */
export const capabilities = [
  {
    group: "Web platforms",
    items: ["React", "Next.js", "Vite", "TypeScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    group: "Mobile",
    items: ["React Native", "Expo", "Expo Router", "NativeWind", "react-native-svg"],
  },
  {
    group: "Backend",
    items: ["PHP", "Node.js", "REST APIs", "Authentication", "Edge Functions"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "Supabase", "MySQL", "Row-Level Security", "Schema design"],
  },
  {
    group: "Payments",
    items: ["Paystack", "Stripe", "Split payments", "Webhooks", "Payout APIs"],
  },
  {
    group: "Delivery",
    items: ["Git", "Turborepo", "Vercel", "Netlify", "Cloudflare", "VPS deployment"],
  },
];

/**
 * Development process. Specific to how this work is done.
 * No "Stage 1 / Stage 2" labels: the verb carries the name.
 */
export const process = [
  {
    index: "01",
    title: "Scope",
    body: "Work out what the product actually has to do, who uses it, and what can wait. Written down and agreed before any code exists.",
  },
  {
    index: "02",
    title: "Architect",
    body: "Data model first, because it is the decision that is expensive to change later. Then the API surface, then the interface structure.",
  },
  {
    index: "03",
    title: "Build",
    body: "Vertical slices that work end to end, reviewed as they land. You see progress in the product rather than in a status report.",
  },
  {
    index: "04",
    title: "Harden",
    body: "Access control, validation, error states, empty states and loading states. Where most prototypes stop and most production incidents begin.",
  },
  {
    index: "05",
    title: "Ship",
    body: "Deployed, monitored, documented, with a handover that makes the system someone else's maintainable codebase rather than a black box.",
  },
];
