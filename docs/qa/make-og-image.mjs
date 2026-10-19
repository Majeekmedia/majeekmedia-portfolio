/**
 * Generate the Open Graph share card.
 *
 * WHY THIS IS GENERATED RATHER THAN WAITED FOR
 *
 * The site has always pointed `og:image` at `/og-image.png`, and that file has
 * never existed. Every share on LinkedIn, X, WhatsApp or Slack therefore rendered
 * as a bare text link with no card, which is the worst possible outcome for a
 * portfolio whose whole job is to be looked at.
 *
 * The owner is supplying a designed card eventually (CONTENT_GAPS.md D4). Until
 * then this produces a real, on-brand 1200x630 card so shares are not broken in
 * the meantime. It is clearly a generated fallback, not a pretend design asset:
 * it uses the site's own type, palette and name, and nothing invented.
 *
 * Run: node docs/qa/make-og-image.mjs
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const W = 1200;
const H = 630;
const BG = "#0e1116";
const TEXT = "#f0eee8";
const MUTED = "#9a9a9a";
const ACCENT = "#6ba4fa";

/*
 * Text is laid out as an SVG and composited, because sharp cannot typeset. The
 * font stack falls back to whatever sans-serif the host has, which is acceptable
 * for a share card: it is a static raster, not page text, so there is no font
 * loading cost and no FOUT.
 */
const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <!-- Accent rule, top left. Echoes the site's drawn section rules. -->
  <rect x="80" y="96" width="72" height="3" fill="${ACCENT}"/>

  <!-- Name: the searchable entity, set large. -->
  <text x="80" y="196"
        font-family="Archivo, Helvetica, Arial, sans-serif"
        font-size="72" font-weight="800" letter-spacing="-2"
        fill="${TEXT}">Preye Tekenah</text>

  <!-- Brand + role. -->
  <text x="80" y="248"
        font-family="Archivo, Helvetica, Arial, sans-serif"
        font-size="28" font-weight="500" letter-spacing="1"
        fill="${ACCENT}">Majeek Media  ·  Software Engineer</text>

  <!-- Positioning line. -->
  <text x="80" y="336"
        font-family="Archivo, Helvetica, Arial, sans-serif"
        font-size="34" font-weight="400"
        fill="${MUTED}">Full-stack engineer building web platforms,</text>
  <text x="80" y="382"
        font-family="Archivo, Helvetica, Arial, sans-serif"
        font-size="34" font-weight="400"
        fill="${MUTED}">mobile applications and SaaS products.</text>

  <!-- Stack line, mono-ish. -->
  <text x="80" y="470"
        font-family="'JetBrains Mono', 'Courier New', monospace"
        font-size="20" letter-spacing="0.5"
        fill="${MUTED}">React · Next.js · React Native · Expo · PHP · Node.js · Supabase</text>

  <!-- Bottom rule and domain. -->
  <rect x="80" y="516" width="${W - 160}" height="1" fill="#262d38"/>
  <text x="80" y="562"
        font-family="'JetBrains Mono', 'Courier New', monospace"
        font-size="22" letter-spacing="0.5"
        fill="${TEXT}">majeekmedia.com</text>
  <text x="${W - 80}" y="562" text-anchor="end"
        font-family="'JetBrains Mono', 'Courier New', monospace"
        font-size="18"
        fill="${MUTED}">Nigeria · Remote</text>
</svg>
`;

const buffer = await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile("public/og-image.png", buffer);

console.log(`Wrote public/og-image.png  ${W}x${H}  ${Math.round(buffer.length / 1024)} KB`);
console.log("Referenced by og:image and twitter:image on every route.");
