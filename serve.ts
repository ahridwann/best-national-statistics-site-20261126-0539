// NusaStats local server (Node 22, standard library only).
// Serves the site in app/ on http://localhost:8080 — nothing else.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = resolve(fileURLToPath(new URL(".", import.meta.url)), "app");
const port = 8080;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = createServer(async (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  const rel = normalize(urlPath === "/" ? "index.html" : urlPath.replace(/^\//, ""));
  const file = join(appDir, rel);
  if (!file.startsWith(appDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  try {
    const bytes = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(bytes);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(port, () => console.log(`NusaStats at http://localhost:${port}`));
