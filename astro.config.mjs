// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// Repo is <user>.github.io, so the site is served from the domain root and
// needs no `base` path. `site` powers absolute URLs in canonical tags/sitemaps.
export default defineConfig({
  site: "https://aniketdalvi.github.io",

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