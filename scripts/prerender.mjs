import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const serverDir = join(root, "dist-server");

const { renderRoute, routePaths, notFoundPath, buildPublicFiles } = await import(join(serverDir, "entry-server.js"));
const template = await readFile(join(distDir, "index.html"), "utf8");

function htmlFileFor(path) {
  if (path === "/") return "index.html";
  if (path === notFoundPath) return "404.html";
  return `${path.slice(1)}.html`;
}

async function emit(relativePath, contents) {
  const target = join(distDir, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents);
  return relativePath;
}

const written = [];

for (const path of [...routePaths, notFoundPath]) {
  const { head, html } = renderRoute(path);
  const page = template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
  written.push(await emit(htmlFileFor(path), page));
}

for (const [file, contents] of Object.entries(buildPublicFiles())) {
  written.push(await emit(file, contents));
}

await rm(serverDir, { recursive: true, force: true });
console.log(`Prerendered ${written.length} files: ${written.join(", ")}`);
