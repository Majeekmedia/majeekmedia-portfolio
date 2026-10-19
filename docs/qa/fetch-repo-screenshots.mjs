/**
 * Pull the real screenshots out of the owner's GitHub repos.
 *
 * WHY THIS EXISTS
 * The owner explicitly does not want screenshots of live sites (the previous
 * ones were captured by tooling and were unreliable). These are the app authors'
 * OWN captures, committed alongside the code, taken at a verified phone
 * viewport. That makes them the authoritative source.
 *
 * Source paths, confirmed from each repo's git tree:
 *   notes-app     docs/screenshots/01..07-*.png
 *   weather-app   docs/screenshots/01..06-*.png
 *
 * Downloaded into assets-source/projects/<slug>/, which is NOT deployed. The
 * optimize-images.mjs pipeline then produces the WebP derivatives that ship.
 *
 * Run: node docs/qa/fetch-repo-screenshots.mjs
 */
import { mkdir, writeFile, stat } from "node:fs/promises";
import { join } from "node:path";

const BRANCH = "main";

const SOURCES = [
  {
    slug: "notes-app",
    repo: "Majeekmedia/notes-app",
    files: [
      "01-notes-list.png",
      "02-search-and-filter.png",
      "03-actions-menu.png",
      "04-note-editor.png",
      "05-empty-state.png",
      "06-note-not-found.png",
      "07-dark-mode.png",
    ],
  },
  {
    slug: "weather-app",
    repo: "Majeekmedia/weather-app",
    files: [
      "01-today.png",
      "02-daily-forecast.png",
      "03-locations.png",
      "04-settings.png",
      "05-empty-state.png",
      "06-today-light.png",
    ],
  },
];

const kb = (n) => Math.round((n / 1024) * 10) / 10;

async function main() {
  let total = 0;
  let count = 0;

  for (const source of SOURCES) {
    const dir = join("assets-source", "projects", source.slug);
    await mkdir(dir, { recursive: true });

    console.log(`\n${source.slug}  (${source.repo})`);

    for (const file of source.files) {
      const url = `https://raw.githubusercontent.com/${source.repo}/${BRANCH}/docs/screenshots/${file}`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.log(`  SKIP  ${file}  (HTTP ${res.status})`);
          continue;
        }
        const buf = Buffer.from(await res.arrayBuffer());
        const out = join(dir, file);
        await writeFile(out, buf);
        total += buf.length;
        count++;
        console.log(`  ok    ${file.padEnd(30)} ${kb(buf.length)} KB`);
      } catch (error) {
        console.log(`  FAIL  ${file}  ${String(error).slice(0, 60)}`);
      }
    }
  }

  console.log(`\n${count} screenshots downloaded, ${kb(total)} KB total.`);
  console.log(`Saved to assets-source/projects/ (not deployed).`);
  console.log(`\nNext: node docs/qa/optimize-images.mjs`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
