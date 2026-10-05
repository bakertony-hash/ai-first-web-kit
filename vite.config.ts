import react from "@vitejs/plugin-react";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "vitest/config";
import type { Plugin } from "vite";
import middleware, { config as middlewareConfig } from "./middleware";

type Redirect = { source: string; destination: string };

/**
 * Makes `vite preview` answer like the Vercel deployment: vercel.json redirects,
 * clean URLs, the routing middleware's Markdown negotiation and headers, and a 404 page.
 * Used only by the local verifier and CI; production routing lives in vercel.json and middleware.ts.
 */
function previewParity(): Plugin {
  const redirects: Redirect[] = JSON.parse(readFileSync("vercel.json", "utf8")).redirects ?? [];

  return {
    name: "preview-parity",
    configurePreviewServer(server) {
      const outDir = join(server.config.root, server.config.build.outDir);

      server.middlewares.use((req, res, nextHandler) => {
        const url = new URL(req.url ?? "/", "http://preview.local");
        const { pathname } = url;

        const redirect = redirects.find((item) => item.source === pathname);
        const trimmed = pathname.length > 1 && pathname.endsWith("/") ? pathname.replace(/\/+$/, "") : null;
        if (redirect || trimmed) {
          res.writeHead(308, { Location: redirect?.destination ?? trimmed! }).end();
          return;
        }

        let rewriteTo: string | null = null;
        if (middlewareConfig.matcher.includes(pathname)) {
          const decision = middleware(new Request(url, { headers: { accept: req.headers.accept ?? "" } }));
          decision.headers.forEach((value, key) => {
            if (!key.startsWith("x-middleware")) res.setHeader(key, value);
          });
          rewriteTo = decision.headers.get("x-middleware-rewrite");
        }

        const target = rewriteTo ? new URL(rewriteTo).pathname : pathname;
        const file = target === "/" ? "/index.html" : /\.[a-z]+$/.test(target) ? target : `${target}.html`;

        if (!existsSync(join(outDir, file))) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(readFileSync(join(outDir, "404.html")));
          return;
        }

        req.url = file;
        nextHandler();
      });
    }
  };
}

export default defineConfig({
  appType: "mpa",
  plugins: [react(), previewParity()],
  server: {
    allowedHosts: ["host.docker.internal"]
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts"
  }
});
