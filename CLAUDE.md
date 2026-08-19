# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at localhost:4321
npm run build     # astro check (typecheck) + static build to dist/
npm run preview   # serve dist/ locally
```

`build` runs `astro check` first, so a type error fails the build. There is no test suite and no separate lint step — `astro check` covers types and template diagnostics across `.astro` files.

## Deployment

Repo name `AniketDalvi.github.io` means GitHub Pages serves from the domain root, so `astro.config.mjs` sets `site` but needs no `base`. `.github/workflows/deploy.yml` builds on push to `main` and publishes `dist/` via `actions/deploy-pages`. **This requires Pages → Source set to "GitHub Actions"** in repo settings; the older "deploy from branch" mode cannot run the Astro build.

`build.format: "file"` emits `/about.html` rather than `/about/index.html`.

## Architecture

Astro static site, migrated from Create React App in 2026. The migration was deliberate: the content is static and the interactivity is a handful of DOM listeners, so the site ships **zero JS bundles** — every script is inlined into the HTML. Keep it that way. Adding a UI framework for a component that could be a `<script>` tag would forfeit the main reason this stack was chosen.

### Content lives in one module

`src/data/site.ts` is the single source of truth for all page copy — projects, stats, experience, skills, ticker words, contact details. Components import from it and never inline copy. Edit content there, not in `.astro` files.

### Writing is a content collection

Long-form posts live in `src/content/writing/*.mdx`, typed by `src/content.config.ts`. `blog.html` and `paper.html` at the repo root were the design references and have now been ported; they are still unbuilt and unlinked, and should not be edited as though they were live.

- `src/data/writing.ts` bridges the collection to the `Post` shape the listing components already consumed — `getPosts()` for the homepage teaser, `getFeatured()` for the /writing hero and its remainder. The old hand-written `POSTS`/`FEATURED` arrays in `site.ts` are gone; only the `Post` *type* remains there.
- Publishing is one step: add an `.mdx` file. Both listings and the route derive from it.
- `featured: true` picks the /writing lead. Exactly one entry should set it; `getFeatured()` falls back to the newest post so the hero is never empty.
- Sorting uses the ISO `published` field, not the free-form `date` display string.
- `kind` is presentation, not routing: `paper` gets the wider 68ch measure and the numbered-section apparatus, `post` gets 64ch and a looser rhythm.

`src/pages/writing/[...slug].astro` renders both through `src/layouts/Article.astro`. Note `/writing.html` (the index) and the `/writing/` directory coexist fine under `build.format: "file"`.

**Article body styles are `is:global`, namespaced under `.prose`.** MDX compiles separately and never carries the layout's `[data-astro-cid-…]` attribute, so scoped selectors cannot reach rendered markdown. Two traps that follow:

- Centre the measure on `.prose` itself, **not** on `.prose > *`. Per-child `margin-inline: auto` silently fails for anything that sets its own `display` (h2 and the lists are flex) or its own `max-width`, which left headings, lists and tables hanging outside the text column while paragraphs looked fine.
- Elements that break out wider (`.bleed`, `.tbl-wrap`, `.comp-grid`) set their inline margins in that break-out rule. A later `margin: … 0` or `margin: … auto` shorthand on the same element **resets them** — use `margin-block` for those. Same shorthand-reset family as the `font:`/`font-variant-numeric` hazard.

Tables keep their borders. They are the documented exception to "lines are rationed": a table without rules is unreadable, and it is a contained object rather than page structure.

**Code blocks use Shiki's `css-variables` theme** (`astro.config.mjs`). The default `github-dark` stamps an inline `background-color:#24292e` on every `<pre>` — a cold blue-grey that fights the warm palette and ignores the light theme. `css-variables` emits `var()` references instead, resolved by the `--astro-code-*` tokens defined on `.prose`. The `background` on `.prose pre` needs `!important` because Shiki writes its own into the inline `style` attribute, which a normal declaration cannot outrank.

**Figures are capped by height, not just width.** `.bleed` sizes by width alone, which suits the landscape charts but stretched the portrait pipeline diagrams (1024×1535, 1122×1402) to ~1500px tall — nearly twice the viewport, so they could not be seen whole. `.prose figure img` therefore sets `max-height: min(78vh, 720px)` with `width: auto`, letting an over-tall image shrink back along its aspect ratio. Keep `width: auto` alongside it; without it the height cap distorts rather than scales.

### Theming: one axis, three states

A single light/dark axis, deliberately simpler than the CRA version's two-axis mood/theme system.

- `src/components/ThemeScript.astro` is a **blocking inline script in `<head>`**. It stamps `data-theme` before first paint to prevent a flash of the wrong palette. It must stay synchronous and dependency-free.
- `localStorage["ad_theme"]` holds an explicit choice. When absent, no attribute is stamped and `prefers-color-scheme` decides.
- `src/styles/global.css` defines the light palette on bare `:root`, then redefines dark tokens twice: under `@media (prefers-color-scheme: dark)` guarded by `:not([data-theme="light"])`, and under `:root[data-theme="dark"]`. Both are needed so the toggle wins in *either* direction against the OS preference.

Never give a color its only definition inside a media query or `[data-theme]` block.

### Spatial intent — do not "optimise"

The site is meant to read as **rich and expansive**. The generous vertical space is deliberate, not slack:

- Hero `min-height: calc(100vh - 150px)` with the headline vertically centred.
- Metrics cells `min-height: clamp(280px, 38vw, 500px)`, figure and caption at opposite ends of an open slab.
- Wide gutters (`--gutter`) framing every section.

**Section padding is load-bearing** — these are the design's values, and they are what separates content now that the dividing lines are gone:

| Section | Padding |
| --- | --- |
| Work, About, Experience, Writing | `clamp(72px, 8vw, 128px)` |
| Statement, Contact (the big breaths) | `clamp(112px, 13vw, 208px)` |
| Section heads (`padding-bottom`) | `clamp(28px, 3vw, 42px)` |

These were once cut to roughly half (`clamp(50px, 6vw, 90px)`) and the page immediately read as cramped and grid-like — which is what made row borders feel necessary in the first place. A tighter-pacing audit will flag all of this as dead space. The openness *is* the design. Prose measures are capped at the generous end of the readable range (72ch, not 65ch) for the same reason.

### Styling conventions

Design tokens (`--bg`, `--fg`, `--mut`, `--line`, `--card`, `--faint`, `--accent`, `--panel*`) live in `global.css`; everything else uses Astro's scoped `<style>` blocks. There is no Tailwind — it was removed with CRA.

`--panel` intentionally **inverts** between themes: a near-black slab on light, a near-white slab on dark. The metrics panel is the only consumer.

`--err` needs its per-theme value: the light red (`#c0392b`) measures only 3.38:1 on the dark `--card` it renders against, so dark redefines it to `#e8705f` (6.06:1). Shadows use `--sh` / `--sh-lift`, warm-tinted rather than pure black to sit on the warm ground.

### The monogram

`Monogram.astro` fills what was empty space at the top of the hero's right column. It rasterises a rounded slab with "AD" and two diagonal slashes knocked out, samples the opaque pixels into ~17k particles, and runs a physics loop: particles part around the cursor (a teardrop-shaped pocket that drags a tail) and ripple outward on click.

Canvas rather than SVG — it is per-particle physics on thousands of points, a paint job rather than a DOM one. Four things to preserve:

- **It waits for `document.fonts.ready`.** The mark is a rasterised glyph; initialising before "Clash Display" loads bakes the fallback face into the sampled points permanently.
- **The letter size is measured, not assumed.** `LETTER_SCALE` is a *height* ratio, but whether "AD" fits is a *width* question and face-specific. The design was tuned against Space Grotesk; Clash Display sets wider and the same ratio overflowed the slab and clipped the D. The code measures and shrinks to `size * 0.74` instead of hard-coding a second constant.
- **`prefers-reduced-motion` draws the mark once, statically,** and never starts the rAF loop. The hint line is hidden on coarse pointers, where "move over the mark" is meaningless.
- **Ink comes from the live `--fg` token** and a MutationObserver on `data-theme` re-rasterises, so the mark follows the theme toggle.

Note the rAF loop keeps the page permanently busy, so headless Chrome never reaches a quiescent state and screenshots hang. Capture with `--force-prefers-reduced-motion`, which takes the static path.

### Motion budget

Hover and state feedback runs at **0.2s on `cubic-bezier(0.16, 1, 0.3, 1)`** — the same out-curve the reveals use. Don't reach for the bare `ease` keyword on interactive feedback: it is `cubic-bezier(.25,.1,.25,1)`, whose ease-*in* ramp delays the first frame, which is exactly the moment the pointer is watching. These were 0.32s `ease` and read as lag.

Durations above 300ms are reserved for things that are not pointer feedback, and each is deliberate:

| Motion | Duration |
| --- | --- |
| Theme crossfade (body, nav, panel, contact) | `0.5s` — one page-wide event, not a control |
| Scroll reveals | `0.8s` + 70ms stagger |
| Metrics curtain | `0.9s` clip-path |
| Page veils | `0.7–0.82s` |

`.send` is the one **asymmetric** transition: an overshoot spring (`cubic-bezier(0.34, 1.56, 0.64, 1)`) on the `:hover` rule going in, a plain `0.15s ease-out` on the resting rule coming back. Putting the spring on the base rule makes the button wobble on release.

### Touch hover states

Component hover rules compile to `.row[data-astro-cid-…]:hover`, which **ties** the specificity of a bare `.row:hover` override and wins on source order. The `@media not all and (hover: hover)` block in `global.css` therefore needs `!important` on every declaration — without it the block parses fine, matches, and silently does nothing.

Two further traps in that block:

- Use the `background-color` **longhand**. The minifier compiles `background: transparent` down to `background: 0px 0px`, reading the keyword as a position and dropping the colour entirely. (Same family of bug as the `font:` shorthand resetting `font-variant-numeric`.)
- Elements with a resting fill (`.back` is `--card`, `.send` is `--fg`) must restate it rather than being lumped in with the reset-to-transparent group, or the tap strips their background.

Layout token: `--gutter` for page padding — the only horizontal inset. The tickers run full-bleed. There is no `--rail`; it went with the vertical rails once nothing was left to align to.

### Lines are rationed — match the design

The design draws **no dividing lines at all**. No vertical rails, no rules on either ticker, no hero column divider, no row separators in Work/Writing/Experience, no section hairlines, no nav underline, no footer rule. All of these existed at some point in the Astro port and were removed to match.

The rule: **a border is only for a contained object's own edge, never to divide the page.** What legitimately keeps one:

- The AD monogram box (`.mark`, `.loader__mark`)
- Pill outlines — `.chip`, the theme toggle, `.send`, `.again`
- Form fields and the `.sent` confirmation card
- The metrics panel and its internal cell borders

Everything else separates by **whitespace**. That only works at the design's spacing, which is why the section padding below is load-bearing rather than decorative — if you tighten it, the rows collapse into each other and a divider starts to feel necessary. Don't add one; restore the padding.

The tickers are **full-bleed** (`Ticker.astro` sets no horizontal margin). They previously inset to a `--rail` token so they lined up with the fixed vertical rails; once those were gone the inset had nothing to align to and read as an arbitrary margin, so both it and the now-unused token were removed. A ticker that stops short of the viewport edge is a regression.

### Paper grain

`.grain` in `Base.astro` is a fixed fractal-noise SVG tile (data URI, 180px) at `z-index: 1` — under the nav (50) and every overlay. It `multiply`s at `opacity .05` on light and `screen`s at `.045` on dark, defined outside any media query and then redefined twice like the colour tokens so an explicit light choice still wins.

It is what keeps the large flat fields from reading as dead ink, and it matters more now that the dividing lines are gone. Both blend modes are required: `multiply` alone turns to visible dirt on a dark ground.

### Motion

`[data-reveal]` elements start hidden and get `.in` from an IntersectionObserver in `Base.astro`. Any element can opt in by adding the attribute. When the observer is unavailable or `prefers-reduced-motion` is set, everything is shown immediately rather than staying invisible — preserve that fallback.

> **Never wrap a long article body in `[data-reveal]`.** The observer's `threshold: 0.12` is unreachable for an element taller than the root band: at a 900px viewport only ~828px is ever inside it, so a 26,000px article caps its `intersectionRatio` at ~0.03, the callback never fires, and the whole body stays at `opacity: 0` permanently. This is arithmetic, not a race — waiting or scrolling never fixes it. `Article.astro` therefore reveals nothing at the `.prose` level; its content is always visible.
>
> The observer passes `threshold: [0, 0.12]` as a backstop so a tall element still reveals on the `0` entry ("any pixel intersects"). Keep both values: dropping `0` reintroduces the invisible-content bug for any oversized block; dropping `0.12` makes normal blocks reveal the instant their top edge appears.

Note that IntersectionObserver does not fire at all in headless Chrome under `--virtual-time-budget`, so a reveal that looks broken there may be fine in a real browser. Verify with `--force-prefers-reduced-motion` (which takes the non-observer path) or check that the element does not depend on the observer at all.

`[data-reveal-group]` is the same observer applied to a **container**: it reveals as one unit and its direct children arrive in a 70ms stagger, indexed by a `--i` custom property that JS stamps on each child. Use it for repeated rows (work, experience, post lists) so a section reads as one entrance rather than N scattered ones; use bare `[data-reveal]` for one-off blocks.

The stagger uses `animation`, **not** `transition`, deliberately. Row children carry their own hover `transition` in component-scoped rules whose `[data-astro-cid-…]` selectors outrank a bare descendant selector — a transition-based stagger silently loses the specificity fight and every delay computes to `0s`. `animation` and `transition` are independent properties, so the entrance and the hover feedback coexist.

Beware the same class of bug with shorthands: a `font:` shorthand resets `font-variant-numeric`, and the CSS minifier may reorder it *after* your longhand. Rules that need tabular figures (`.cell__num`, `.dates`, `.row__date`, `.row__read`, `.row__idx`) therefore set `font-family`/`font-weight`/`font-size` as longhands. Don't "tidy" them back into a shorthand.

`Metrics.astro` uses a different pattern worth understanding: it applies `data-armed` from JS *before* observing, and the clip-path curtain CSS is scoped to `.panel[data-armed]`. Without JS the panel renders fully visible. Don't move those hidden styles out of the `[data-armed]` guard or the panel becomes invisible when JS fails.

Tickers scroll a **doubled** word list (`buildLoop`) so the `mq` keyframe's `-50%` translate lands exactly one copy over, making the loop seamless.

### Contact form

Static host, so there is no backend. `Contact.astro` posts to `PUBLIC_FORM_ENDPOINT` (e.g. Formspree) when that env var is set, and otherwise falls back to opening a pre-filled `mailto:` draft. Validation is client-side only.

### Navigation

`Nav.astro` decides link shape from `Astro.url.pathname`, **not** from a prop — an earlier version derived it from `homeHref` and every page concluded it was the homepage, emitting bare `#work` anchors that silently did nothing off-homepage. Two gotchas the `norm()` helper handles: `build.format: "file"` makes the pathname `/index.html` at build time, and trailing slashes vary.

- On the homepage: bare anchors (`#work`) so clicks smooth-scroll.
- Elsewhere: home-relative (`/#work`) so they navigate then land on the section.
- Sections with their own route go in the `ROUTES` map and always link there, getting `aria-current="page"`.

A scroll-spy IntersectionObserver adds `aria-current` to the anchor for the section in view, styled with an underline. Its `rootMargin: "-68px 0px -55% 0px"` defines a band below the nav; the topmost visible section wins so overlapping sections don't flicker.

### Scroll behavior

Two distinct mechanisms, deliberately kept separate:

**Nav smooth scroll** (`Base.astro`) — a delegated click handler on `a[href^="#"]` calling `scrollIntoView({behavior: "smooth"})`. The 68px nav clearance comes from `scroll-margin-top` in `global.css`, not from manual offset maths. The design instead hijacked the wheel globally with a RAF lerp loop; that was dropped because it adds input latency and fights trackpad conventions. Native scrolling is untouched.

**Overscroll navigation** — two *different* components, because the design treats the two directions differently. Both accumulate wheel delta past a page edge, decay at 0.88/frame when you stop pushing, and only `preventDefault` at the edge. Both are disabled under `prefers-reduced-motion` and on coarse pointers.

- **Forward** (`OverscrollLink.astro`, homepage → `/writing`): a full-width block in normal flow at the **bottom** of the page, carrying its own progress bar and percentage. Threshold **780**. Its veil enters from below (`translateY(101%)`).
- **Back** (`BackOverscroll.astro`, `/writing` → `/`): the gesture UI is a **floating pill** — `position: fixed`, `top: 70px`, centered, `opacity: 0` until the gesture starts. It is *not* part of page flow. Threshold **700**. Separately, an ordinary `.back` link sits at the bottom of the page as a visible affordance; it is not the gesture target.

  Its veil serves **two moments with one element**: it covers on load and lifts (naming the page you arrived on, via `veilLabel`/`veilTitle`), then drops back down when leaving (naming the destination, via `exitLabel`/`exitTitle`, swapped in by `goPrev` just before the drop). Both label pairs are required — with only one, leaving the page flashes that page's own name as if you were arriving there again.

Anything tagged `[data-prev]` (nav links, the `.back` block) exits through the back veil while keeping its own href.

> `overflow-x: hidden` must stay on `html`, **not** `body`. On `body` it makes body the scroll container, which silently breaks `scrollIntoView({behavior: "smooth"})` — the nav links stop scrolling with no error.

Note that headless Chrome does not animate smooth scrolling at all (`behavior: "smooth"` is a no-op there while `"auto"` works), so verify nav scrolling with `--force-prefers-reduced-motion` or in a real browser.

### Preloader

`Preloader.astro` (homepage only) — the design's count-up: `000`→`100` eased over 1500ms, blinking `LOADING`, fill bar, then a wipe upward. Shown **once per session** via `sessionStorage["ad_loaded"]`, and skipped entirely under `prefers-reduced-motion`.

**The decision of whether to run lives in `ThemeScript.astro`, not here.** That is a blocking inline script in `<head>`; Astro's `<script>` is a deferred module, so deciding in the component means the loader markup paints and is then hidden a frame later — a visible flash on every repeat visit. The head script instead stamps `html[data-preload]` and claims the `sessionStorage` slot before first paint, and `.loader` defaults to `display: none` unless that attribute is present. Keep the two in sync: the flag is the contract between them.

It locks scrolling while counting, which makes it the one component that can strand the page. Four guards, none of which should be removed:

- `html { overflow: hidden }` is set by the head script (so the lock is effective from frame one) and released in `finish()`. Note it is on `documentElement`, not `body`.
- A `setTimeout(finish, DURATION + 600)` fail-safe, because `requestAnimationFrame` is throttled in background tabs — without it a backgrounded first load leaves the page permanently unscrollable.
- A `finished` flag so the rAF path and the fail-safe cannot both run the teardown.
- A `<noscript>` block hiding the loader, so a no-JS visitor never sees a permanent overlay.
