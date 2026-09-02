// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// Repo is <user>.github.io, so the site is served from the domain root and
// needs no `base` path. `site` powers absolute URLs in canonical tags/sitemaps.
//
// The host is resolved at build time rather than hardcoded, because this repo
// deploys to more than one place. Netlify injects:
//   URL              - the site's own production URL (the apex we want)
//   DEPLOY_PRIME_URL - the URL of *this* deploy
//
// CONTEXT is what decides between them. On a production build Netlify still
// sets DEPLOY_PRIME_URL, and it carries the branch prefix — so preferring it
// unconditionally canonicalised the live site to
// `https://main--aniket-dalvi.netlify.app`, a branch-deploy host. That splits
// SEO signal between two hostnames serving identical content. Production must
// use URL; only previews and branch deploys should self-canonicalise, so their
// pages do not tell crawlers to index production instead.
//
// `process.env`, not `import.meta.env`: Astro does not expose arbitrary build
// environment variables through `import.meta.env` in this config file — the
// lookups silently return undefined and the fallback always wins, which looks
// correct locally while shipping the wrong host. Verified by building with
// these vars set and reading the emitted <link rel="canonical">. Reading
// `process.env` needs @types/node, which is a devDependency for this reason.
const site =
  (process.env.CONTEXT === "production"
    ? process.env.URL
    : process.env.DEPLOY_PRIME_URL || process.env.URL) ||
  "https://aniketdalvi.github.io";

export default defineConfig({
  site,

  build: {
      // Emit /about.html rather than /about/index.html — friendlier on Pages.
      format: "file",
	},

  vite: {
    server: {
      // Vite blocks requests whose Host header it does not recognise, so a
      // tunnelled URL (ngrok, Cloudflare, etc.) is rejected with "Blocked
      // request" before the site ever renders. Scoped to the tunnel providers
      // rather than `true`, which would disable the check for any host — that
      // protection exists to stop DNS-rebinding attacks against the dev server.
      // Dev-only: `astro preview` and the built site are unaffected.
      allowedHosts: [".ngrok-free.app", ".ngrok.io", ".trycloudflare.com"],
    },
    build: {
      // Keep every script inlined into the HTML. Astro externalises scripts past
      // ~4KB by default, which the monogram's particle loop crosses; raising the
      // limit preserves the site's zero-JS-bundle property, and at this size an
      // extra request costs more than the bytes do.
      assetsInlineLimit: 16384,
    },
  },

  integrations: [mdx()],

  markdown: {
    // Shiki's default `github-dark` theme stamps an inline
    // `background-color:#24292e` on every <pre> — a cold blue-grey that fights
    // the warm palette and ignores the light theme entirely. `css-variables`
    // emits var() references instead, so the code blocks inherit our tokens and
    // follow the light/dark toggle like everything else.
    shikiConfig: { theme: "css-variables" },
  },
});