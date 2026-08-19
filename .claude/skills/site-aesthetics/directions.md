# Aesthetic Directions

Contents: [How to choose](#how-to-choose-a-direction) · [The brief](#write-the-four-line-brief) · [Directions](#directions) · [Calibration](#calibration-what-not-to-default-to) · [Signature elements](#signature-elements)

Use these as calibration and as complete, coherent examples of what a token system looks like when someone decided. Don't hand one back as the answer to a brief — derive from the subject, then check the result against these to make sure it's internally consistent.

## How to choose a direction

Three questions, in order:

1. **What is the subject's world made of?** A mining intelligence platform lives among steel, ore, charts, engineering drawings, safety signage. A children's clinic lives among crayon, felt, rounded corners, primary colour. The materials, artefacts, and vernacular of the subject are where distinctive choices come from — and the reason two products in the same category can look completely different.
2. **What does the audience need to feel in the first second?** Trust, excitement, calm, precision, warmth, urgency. One word. It settles the contrast level, the palette temperature, and the type register.
3. **What's the page's single job?** Book a demo, read an article, monitor a system, buy a thing. Everything else on the page ranks below this, and the visual budget follows.

Then pick a direction that serves all three, and take one real aesthetic risk you can justify.

## Write the four-line brief

Before writing any code, state these four things and show them to the user:

```
PALETTE   4–6 named hexes, with roles
TYPE      display / body / (utility), with the axis of contrast between them
LAYOUT    one sentence + a rough ASCII wireframe
SIGNATURE the one element this page is remembered by
```

Then apply the test: **would I have produced this for any other brief in this category?** If yes, revise that line and say what changed. This one step prevents most generic output.

## Directions

### 1. Technical Authority
For B2B, industrial, data, financial. Reads precise and credible, not exciting.

```
Palette   ink #12151C · slate #3A4252 · paper #F7F8FA · rule #DCE0E7 · signal #0B62D6
Type      Display: Archivo Expanded 600 · Body: Archivo 400/500 · Utility: IBM Plex Mono
Radius    4px / 6px    Shadow: none — borders only
Layout    Left-aligned, 12-col grid visible in the alignment, dense data tables,
          generous section spacing but tight component spacing
Signature Real data as the hero — a live chart or a table, not an abstract graphic
```
Notes: mono for every figure and label. Hairline rules do all separation. The accent appears only on the primary action and on active data series. Uppercase tracked eyebrows above section headings work here.

### 2. Editorial Modern
For content, research, thought leadership, agencies.

```
Palette   ink #1A1A1A · warm paper #FAF9F6 · muted #6E6A63 · rule #E3DFD7 · accent #A6352B
Type      Display: Instrument Serif (or Fraunces) · Body: Inter Tight 400 · Utility: none
Radius    0px         Shadow: none
Layout    Single 65ch reading column, full-bleed images breaking out, wide margins,
          drop caps or hanging quotes, asymmetric title page
Signature Typographic — an oversized headline set tight with real punctuation
```
Notes: the whole direction lives or dies on the type. Big size jumps (a 76px headline over 18px body), generous leading in the column, hanging punctuation, no boxes at all.

### 3. Soft Product
For consumer SaaS, onboarding-heavy products, anything friendly.

```
Palette   ink #1C1B22 · surface #FFFFFF · page #F6F5F9 · border rgba(28,27,34,.08)
          accent #5B4BE8 with wash color-mix(accent 10%, transparent)
Type      Display: Bricolage Grotesque 600 · Body: Geist Sans 400/500
Radius    10px / 16px / 24px    Shadow: 3-layer, very soft, tinted 240°
Layout    Centred hero (short), left-aligned everything after, cards with generous
          padding, one accent-washed section to break the rhythm
Signature One well-crafted interactive component sitting in the hero
```
Notes: this is the closest to the default modern SaaS look, so the discipline is in restraint — one accent, three radii, no gradient, no orbs, and the signature component doing the work.

### 4. Dark Instrument
For dashboards, monitoring, developer tools, trading.

```
Palette   base oklch(15% .01 260) · surface oklch(19% .012 260) · raised oklch(23% .014 260)
          text oklch(93% .005 260) · muted oklch(66% .01 260) · accent oklch(72% .16 155)
Type      Display: Space Grotesk 500 · Body: Inter 400 · Utility: JetBrains Mono
Radius    6px / 8px    Elevation: surface lightness + rgba(255,255,255,.07) hairline
Layout    Dense, panel-based, persistent left rail, tabular data everywhere,
          minimal chrome so the data is the visual interest
Signature The data density itself — many numbers, all legible, nothing shouting
```
Notes: `tabular-nums` mandatory. Accent reserved for live/positive states. Body text one weight lighter than the light-mode equivalent. Shadows off.

### 5. Material Warmth
For craft brands, food, physical products, hospitality, sustainability.

```
Palette   bark #2B2118 · clay #B5643C · sand #E8DCC8 · cream #FBF7EF · moss #5C6B4A
Type      Display: Gambetta 500 · Body: Satoshi 400 · Utility: none
Radius    2px on structure, organic shapes in imagery    Shadow: soft, warm-tinted
Layout    Editorial-ish but image-led, generous margins, off-grid photography,
          text overlapping image edges
Signature Photography treatment — a consistent warm grade across every image
```
Notes: watch the calibration warning below — warm cream plus terracotta is currently a default. Push the palette somewhere specific to the subject (a particular clay, a particular grain) and let the type carry more of the identity.

### 6. Structural Brutalist
For portfolios, culture, music, deliberately non-corporate products.

```
Palette   black #000000 · white #FFFFFF · one loud accent (chosen from the subject)
Type      Display: Archivo Black or a licensed grotesque, very large · Body: same family
Radius    0px         Shadow: none, or hard offset (4px 4px 0 black)
Layout    Visible grid, thick rules, oversized type running to the edges,
          intentional density, no centring
Signature Scale — type at a size that would be a mistake anywhere else
```
Notes: only works with real commitment. Half-brutalist looks broken. Accessibility still applies: focus rings, contrast, reduced motion.

## Calibration: what not to default to

These are all legitimate when the brief calls for them, and all currently produced regardless of brief:

- Cream `#F4F1EA` background + high-contrast serif display + terracotta `#D97757` accent.
- Near-black background + one acid accent (`#C4F82A`, `#FF4D00`) + tight sans.
- Broadsheet: hairline rules, zero radius, dense newspaper columns.
- Indigo/violet gradient headline, `#6366F1` accent, gradient blur orbs behind a centred hero.
- Inter everywhere + `rounded-2xl shadow-lg` + three icon cards + `py-20` sections.

If a design lands on one of these without the brief asking, that's a default, not a decision — change the axis the brief left free.

## Signature elements

The one thing a page is remembered by. It should encode something true about the subject rather than decorate:

- Real data rendered well — a live chart, a table, a counter with actual numbers.
- A single interactive demo of the actual product in the hero.
- A typographic moment: one headline set at a scale and tightness nothing else on the web has.
- A structural device that carries meaning — a timeline where the order matters, numbering where there's a real sequence, a comparison where the comparison is the point.
- A material treatment applied consistently: a photographic grade, a grain, a print-like registration.
- One controlled break of the grid, in one place.

What doesn't count as a signature: gradient orbs, a glassmorphism nav, an animated blob, a badge pill above the headline, or an icon grid. Those are decoration in the shape of a signature.

Spend the boldness in exactly one place, and keep everything around it disciplined. Then remove one thing before shipping.
