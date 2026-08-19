---
name: site-aesthetics
description: Judges and improves how a website or app LOOKS — typography, colour, spacing, hierarchy, depth, and finish — and produces a prioritised fix list with concrete token-level changes. Use this skill whenever the user asks anything about visual design quality, including "make this look better", "why does my site look cheap / generic / AI-generated", "review my landing page design", "improve the typography / spacing / colours", "make it look more premium", "pick a palette or font pairing", "audit our design system", or when they share a screenshot, URL, or CSS/Tailwind code and want aesthetic feedback. Also use it proactively before building any new page, marketing site, dashboard, or UI component, so the visual decisions are made deliberately instead of defaulting. This skill is about aesthetics, not animation or implementation correctness — reach for it even when the user only says "it feels off" without naming a design term.
---

# Site Aesthetics

## Initial response

When this skill is invoked with no specific question, respond only with:

> Ready. Point me at a URL, screenshot, or the CSS/Tailwind for the page and I'll audit the aesthetics — or tell me what you're building and I'll set the visual direction before any code gets written.

Then stop. Don't dump principles unprompted.

## What this skill is for

Most interfaces aren't ugly because of one bad decision. They're ugly because nobody decided anything: the font is whatever the framework shipped, the greys are whatever the utility class offered, the spacing is whatever looked fine at the time. The result is coherent-ish, forgettable, and reads as generated.

The job here is to make the invisible decisions visible, then make them deliberately and consistently. Aesthetics is a system, not a coat of paint — so fixes belong in tokens (type scale, spacing scale, colour ramp, radius scale, shadow set), not in individual elements. A change made in one component and nowhere else makes the page *less* coherent, not more.

### Four principles that drive every judgement below

**Constraint reads as intent.** Two typefaces, six type sizes, one accent hue, one spacing scale. Every additional variant costs coherence and buys almost nothing. When something needs to stand out, remove competition rather than adding emphasis.

**Contrast is a budget.** A page has one focal point. If three things shout, none do. Spend size, weight, and colour where meaning actually lives, and let everything else recede — de-emphasising secondary content is nearly always better than boosting primary content.

**Defaults are the tell.** Anything you'd reach for on any page — Inter, `#6366F1`, `rounded-2xl shadow-lg`, three equal cards, centred everything — signals that no choice was made. Also treat the current crop of AI-design defaults as defaults: cream `#F4F1EA` + high-contrast serif + terracotta `#D97757`; near-black + one acid accent; broadsheet hairline rules with zero radius. All are legitimate *if the brief calls for them*, and never as a starting point.

**The subject supplies the vocabulary.** A steel-industry intelligence platform, a children's museum, and a hardware wallet should not share a look. Materials, artefacts, and language from the subject's world are where distinctive palettes and type pairings come from.

## Pick a mode

| Situation | Mode |
| --- | --- |
| Existing site/page/component, user wants it better | **Audit** — run the workflow below, output the review table |
| Nothing built yet, or a rebuild | **Direction** — set tokens first (see `references/directions.md`), then build |
| One narrow question ("is this grey too light?", "which font pairs with X?") | Answer it directly, cite the relevant rule, skip the ceremony |

## Audit workflow

Work in this order. Typography and spacing account for most of the perceived quality of a page; colour and depth are amplifiers. Fixing the accent colour on a page with a broken type scale is wasted effort.

**1. Look at it.** Take a screenshot if the environment allows (`playwright`/`puppeteer` for a URL, or ask the user for one). Judging aesthetics from code alone is guessing — a screenshot is worth 1000 tokens. Check mobile width too; most aesthetic collapse happens under 480px.

**2. Squint test.** Blur the screenshot (or defocus): what's still legible? That's the hierarchy the user actually perceives. If the intended primary action isn't the first thing that survives, hierarchy is broken and that's the headline finding.

**3. Grayscale test.** Desaturate it. Hierarchy that only exists in colour is fragile and inaccessible. If everything flattens into one mush, the page is leaning on hue to do a job that size, weight, and spacing should be doing.

**4. Inventory the tokens.** Count what's actually in use, because the count itself is usually the finding:

```bash
# distinct font sizes, colours, radii, shadows in a codebase
grep -rhoE 'font-size:[^;]+' src/ | sort -u | wc -l
grep -rhoE '#[0-9a-fA-F]{3,8}|(rgb|hsl|oklch)a?\([^)]+\)' src/ | sort | uniq -c | sort -rn | head -40
grep -rhoE 'border-radius:[^;]+' src/ | sort -u
grep -rhoE 'box-shadow:[^;]+' src/ | sort -u
# Tailwind equivalents
grep -rhoE '\b(text|font|gap|p|px|py|m|mt|space-[xy])-[a-z0-9.]+' src/ | sort | uniq -c | sort -rn | head -40
```

Healthy targets: ≤2 typefaces (+1 mono), ≤6 type sizes, ≤3 font weights, one accent hue plus a neutral ramp, ≤3 radii, ≤3 shadows, one spacing scale with no off-scale values.

**5. Measure the five things that are usually wrong.** Line length (should be 60–75 characters), body size (≥16px, 17–18px for reading-heavy pages), line-height on headings (should be 1.1–1.25, not the 1.5 inherited from body), spacing *between* groups vs *within* groups (between must be clearly larger), and text contrast (4.5:1 body, 3:1 for large text and UI edges).

**6. Name the single biggest lever.** One sentence, at the top of the output: the change that would move the page most. Usually "the type scale has 11 sizes and no clear step between them" or "everything is centred so there's no reading path", rarely "the blue is slightly off".

**7. Write the review.** Format below. Ordered by impact, capped at 8–12 rows — a 30-row audit doesn't get acted on. Then a short plan grouped into (a) token changes, (b) component changes, (c) optional polish.

## Review format (required)

Lead with the biggest lever in one sentence, then a markdown table. Never a list of "Before:" / "After:" lines — the table is what makes the diff scannable.

| Before | After | Why |
| --- | --- | --- |
| `font-family: Inter` for display + body | Display: `Instrument Serif`; body: `Inter Tight` | One face for everything gives the page no voice; a display face carries personality where it's seen most |
| 11 distinct font sizes | 6-step scale on a 1.25 ratio | Sizes that differ by 1–2px read as inconsistency, not hierarchy |
| `line-height: 1.5` on a 48px headline | `line-height: 1.1; letter-spacing: -0.02em` | Line-height must fall as size rises, or headlines look loose and unset |
| `color: #6B7280` on all secondary text | Two-step ramp: `#4B5563` labels, `#9CA3AF` metadata | One grey for everything collapses two levels of hierarchy into one |
| `box-shadow: 0 10px 15px rgba(0,0,0,.1)` | 3-layer shadow, hue-tinted, `rgba(23,23,35,.06/.04/.03)` | Single-layer black shadows read as a sticker; layered tinted ones read as light |
| `py-20` on every section | 96px / 64px / 128px by section role | Identical rhythm removes the pacing that tells a reader where they are |
| Full-width paragraph text | `max-width: 65ch` | Past ~80 characters the eye loses the line return |
| Card `rounded-xl` inside `rounded-xl` container | Outer `16px`, inner `10px` (outer − padding) | Concentric radii must differ or the nesting looks like a mistake |

Then:

**Plan** — 1. Tokens (do first, fixes many instances at once) 2. Components 3. Polish. Each item one line, with the file or token name where known.

## The rules, condensed

Enough to work from. Load the reference file when a category is the focus of the work — they carry the ramps, ratios, and copy-paste token sets.

### Typography — the highest-leverage category (`references/typography.md`)

- Two faces maximum: a characterful display face used sparingly, a quiet body face with a real range of weights. A mono face is a third only if data or code is on the page.
- Build a scale from a ratio (1.2 for dense UI, 1.25–1.333 for marketing) and cap it at ~6 steps. Sizes chosen ad hoc always drift.
- Line-height and size move in opposition: 1.5–1.6 at body size, 1.3 at ~24px, 1.1–1.2 at display sizes.
- Tighten letter-spacing on large type (`-0.01em` to `-0.03em` above 32px); open it up on small uppercase labels (`+0.06em`). Never letter-space lowercase body text.
- Line length 60–75 characters. `max-width: 65ch` is the fix, not a percentage.
- Hierarchy through weight and size, not colour. Two weights that differ by 200+ (400/600, not 500/600).
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs, `font-variant-numeric: tabular-nums` on anything that changes in place or sits in a column.

### Space and layout (`references/space-and-layout.md`)

- One spacing scale, 4px-based and non-linear: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Off-scale values are the most common source of "slightly wrong".
- Proximity carries grouping: space within a group must be visibly smaller than space around it — roughly half. Getting this right removes the need for most dividers and boxes.
- Whitespace is structure, not leftover. Dense sections next to open ones create pace; uniform padding everywhere creates a wall.
- Don't centre everything. Centre short display text; left-align anything read in sequence. A consistent left edge is what makes a page look composed.
- Optical over mathematical: icons, quote marks, and bullets need to hang slightly outside the text edge to *look* aligned.

### Colour (`references/color.md`)

- Neutrals are the design; the accent is punctuation. 60/30/10 at most for accent presence.
- Tint the neutral ramp with a trace of the brand hue rather than using pure grey — and avoid pure `#000` text on pure `#fff`.
- Build ramps in OKLCH so steps are perceptually even; a lightness ladder in hex always has a muddy middle.
- One accent hue with a light and a dark variant beats three competing accents. Semantic colours (success/warn/error) don't count as accents but must share the ramp's saturation character.
- Dark mode is not inverted light mode: surfaces get lighter with elevation, saturation drops, text sits near `#EDEDED` not white, and shadows stop working — separation comes from surface lightness and hairline borders.

### Depth, materials, and finish (`references/depth-and-detail.md`)

- Choose one separation strategy per surface type: border, shadow, or background shift. Using all three at once is the most common cause of a busy card.
- Shadows: 2–3 layers, increasing y-offset and blur, low alpha, tinted with the neutral's hue. A single big black blur reads as cheap.
- Semi-transparent borders (`rgba(0,0,0,.08)`) survive over any background; a fixed light grey doesn't.
- Concentric radii: inner = outer − padding. And radius should scale with element size — a 4px radius on a 400px card looks unfinished.
- Finish is where "premium" actually lives: `:focus-visible` rings, `::selection` colour, styled empty and loading states, consistent icon family and stroke width, real favicon and OG image, sensible cursors, and hover states that only fire on `(hover: hover)`.

### Direction and personality (`references/directions.md`)

Before building anything new, write down four things and state them to the user: **palette** (4–6 named hexes), **type** (display / body / utility), **layout concept** (one sentence + ASCII wireframe), **signature** (the one element the page is remembered by). Then check each against "would I have produced this for any other brief?" and revise what fails. The reference file has complete token sets for several coherent directions — use them as calibration, not as answers.

## Slop tells — check for these explicitly

Any three of these together and the page reads as generated regardless of how clean the code is:

Inter (or system-ui) for everything · indigo/violet gradient headline · gradient blur orbs behind a centred hero · badge pill saying "✨ Introducing" above the headline · three equal cards with a lucide icon in a rounded square · `rounded-2xl shadow-lg` on every surface · identical vertical padding on every section · everything centre-aligned · one grey for all secondary text · glassmorphism nav bar · emoji as iconography · full-bleed paragraph text · `transition: all` · no focus styles · unstyled empty states · zero content-specific imagery.

## Checklist

| Issue | Fix |
| --- | --- |
| More than 2 typefaces (+mono) | Cut to display + body |
| More than ~6 type sizes | Rebuild on one ratio |
| Body text under 16px | 16px minimum, 17–18px for reading |
| Heading inheriting body line-height | 1.1–1.25 with negative tracking |
| Paragraph wider than ~75ch | `max-width: 65ch` |
| Uniform grey for all secondary text | Two-step de-emphasis ramp |
| Pure black on pure white | Near-black tinted with the brand hue |
| Hex lightness ramp | Rebuild in OKLCH |
| Off-scale spacing values | Snap to the 4px scale |
| Group spacing ≥ inter-group spacing | Halve the inner gaps |
| Everything centred | Left-align sequential content |
| Border + shadow + bg shift on one card | Pick one |
| Single-layer black shadow | 2–3 tinted layers |
| Equal nested radii | Inner = outer − padding |
| Same padding on every section | Vary by section role |
| Two accent hues competing | One accent, two variants |
| Dark mode by inversion | Elevation by surface lightness |
| Mixed icon families or stroke widths | One family, one stroke width |
| No `:focus-visible`, no `::selection` | Add both, in the accent |
| Empty/loading/error states unstyled | Design all three |

## Reference files

- `references/typography.md` — scales, pairings that work, tracking tables, OpenType details
- `references/color.md` — OKLCH ramp construction, tinted neutrals, dark mode, semantic colours
- `references/space-and-layout.md` — spacing scale, proximity, grid, optical alignment, responsive collapse
- `references/depth-and-detail.md` — shadow recipes, borders, radii, finish checklist
- `references/directions.md` — complete token sets for coherent aesthetic directions, and how to choose one
