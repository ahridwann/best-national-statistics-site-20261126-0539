// NusaStats entry runner (Node 22, standard library only).
//
// What this program does: it takes the site in app/ beside this file and
// the screenshots in screenshots/, copies both into the output directory,
// and writes dossier.json there — the summary the judge reads (screenshots,
// first-load files and bytes, and the source), built with the vendored
// make.fun library in vendor/makefun-frontend.ts. That vendor file must
// stay byte-for-byte as shipped: the scorer requires dossier.json to be
// exactly what its own copy of the library writes.
//
// How to run it locally (outside the grader's container, where the output
// directory is /output):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The site itself is plain static files — index.html, CSS and ES modules
// under app/ — with no build step and nothing fetched over the network.

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

// Directory this file lives in (the entry root), and where to hand in.
const entryRoot = fileURLToPath(new URL(".", import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Copy one folder if it exists, creating the destination first.
function copyFolder(name) {
  const from = join(entryRoot, name);
  if (!existsSync(from)) return;
  const to = join(outputDir, name);
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
}

mkdirSync(outputDir, { recursive: true });
copyFolder("app");
copyFolder("screenshots");

// The caps come from the competition's gate (reference/gate.json). Only
// text_max_bytes shapes the dossier bytes; the others refuse an entry the
// scorer would refuse anyway: more than 4 screenshots, or one over
// 256 KiB; more than 993 files and directories in app/, or more than
// 16 MiB of app files. app/ counts beside the output's own 1000-entry
// cap, its screenshots/ and dossier.json.
const dossierBytes = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, "dossier.json"), dossierBytes);
console.log(`Wrote ${join(outputDir, "dossier.json")} (${dossierBytes.length} bytes).`);
