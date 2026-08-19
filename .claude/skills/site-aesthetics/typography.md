# Typography

Contents: [Choosing faces](#choosing-faces) · [Pairings](#pairings-that-work) · [Scale](#the-scale) · [Line-height](#line-height) · [Tracking](#tracking) · [Measure](#measure-and-alignment) · [Weight and hierarchy](#weight-and-hierarchy) · [Details](#details-that-separate-set-from-typed) · [Diagnosing](#diagnosing-bad-type)

Typography is the highest-leverage category because text is most of what a user looks at. A page with excellent type and mediocre colour looks designed; the reverse looks unfinished.

## Choosing faces

Two roles, two faces:

- **Display** — headlines, the hero, section openers. This is where personality lives. Used at 32px and up, and used sparingly. A face with strong character at 64px can be unusable at 16px; that's fine, that's not its job.
- **Body** — everything read in sequence. Needs a real weight range (at least 400/500/600), good hinting at small sizes, and no distracting characters. Boring here is correct.
- **Utility (optional third)** — mono for data, code, IDs, timestamps, tabular columns. Only include it if the page actually has those.

Rules of thumb:

- Contrast the two faces on a real axis — serif vs sans, or high-contrast vs low-contrast, or narrow vs normal width. Two similar sans faces read as a mistake rather than a pairing.
- If the display face is doing the heavy lifting, the body face should be near-invisible. Two characterful faces fight.
- Variable fonts are worth it when you need 3+ weights or optical sizing; one file, and you can use weights like 460 that sit between the static cuts.
- Check the numerals before committing. Many display faces have short or oldstyle figures that break in data-heavy contexts.
- Self-host or subset. A face that arrives 400ms late causes a layout shift that undoes the craft. `font-display: swap` with a metrics-matched fallback (`size-adjust`, `ascent-override`) removes the jump.

## Pairings that work

Free / open-source, safe to self-host, with the register each implies:

| Display | Body | Register |
| --- | --- | --- |
| Instrument Serif | Inter Tight | Editorial, modern-literary |
| Fraunces (opt. `SOFT`/`WONK` axes) | Newsreader or Public Sans | Warm, crafted, human |
| Bricolage Grotesque | Geist Sans | Contemporary tech, slightly odd |
| Playfair Display | Source Sans 3 | Traditional luxury (careful — very used) |
| Space Grotesk | IBM Plex Sans | Technical, engineering |
| Libre Caslon Display | Libre Franklin | Institutional, trustworthy |
| Archivo Expanded | Archivo | Confident, single-family system |
| Gambetta | Satoshi | Elegant, boutique |
| DM Serif Display | DM Sans | Clean commercial default (competent, unsurprising) |
| Söhne / Untitled Sans (licensed) | same family | Swiss-neutral, high-end SaaS |

For industrial, financial, or B2B contexts: a slightly condensed grotesque for display plus a neutral sans for body reads authoritative without looking like a startup. Add a mono for figures.

For mono: JetBrains Mono (wide, legible), Geist Mono (tight, modern), IBM Plex Mono (neutral), Berkeley Mono (licensed, characterful).

Avoid as *defaults*: Inter for both roles, Poppins (geometric circles fatigue fast at length), Montserrat headlines, Roboto anything, Lato, and any face you'd pick without looking at the brief.

## The scale

Pick one ratio and generate from a base. Six steps covers almost everything; add a seventh only for a genuine hero.

**Dense UI / dashboards — 1.2 (minor third), base 16:**

```css
--text-xs:   12.8px;  /* 0.8rem  — captions, table meta */
--text-sm:   14px;    /* labels, secondary */
--text-base: 16px;    /* body */
--text-lg:   19px;    /* lead paragraph, card titles */
--text-xl:   23px;    /* section headings */
--text-2xl:  28px;    /* page title */
--text-3xl:  33px;    /* rare */
```

**Marketing / editorial — 1.333 (perfect fourth), base 17–18:**

```css
--text-sm:   13.5px;
--text-base: 18px;
--text-lg:   24px;
--text-xl:   32px;
--text-2xl:  43px;
--text-3xl:  57px;
--text-hero: 76px;
```

Notes:

- Hero sizes should be fluid: `font-size: clamp(40px, 7vw, 76px)`. A fixed 76px headline wraps badly on a phone and looks timid on a 27" monitor.
- Two sizes that differ by 1–2px are perceived as an error, not a level. If two things are different, make them clearly different.
- The scale is a set of allowed values. Anything outside it needs a reason you can state.

## Line-height

Line-height falls as size rises — the eye needs proportionally less help returning to the start of a short, large line.

| Size | Line-height |
| --- | --- |
| 12–14px | 1.4–1.5 |
| 16–18px (body) | 1.5–1.6 |
| 20–28px | 1.3–1.4 |
| 32–48px | 1.15–1.25 |
| 56px+ | 1.0–1.1 |

The single most common typographic bug on the web is a 48px headline inheriting `line-height: 1.5` from the body rule. It makes the headline look like three unrelated lines.

Longer measures need more leading; short measures (under ~45ch) can go tighter. Dark mode wants a touch more leading than light because light text on dark blooms optically.

## Tracking

| Context | Letter-spacing |
| --- | --- |
| Display, 32–48px | `-0.015em` |
| Display, 56px+ | `-0.02em` to `-0.035em` |
| Body 16–18px | `0` (the designer already did this) |
| Small text 12–13px | `+0.005em` to `+0.01em` |
| Uppercase labels / eyebrows | `+0.06em` to `+0.1em` |
| Mono / tabular data | `0`, never negative |

Never letter-space lowercase running text. Uppercase text without added tracking looks cramped because the face was spaced for mixed case.

If the face has an optical size axis (`opsz`), use it instead of manual tracking — it adjusts stroke contrast and spacing together.

## Measure and alignment

- 60–75 characters per line for body text; 45–60 for large type. `max-width: 65ch` on the text container. Percentage widths break the moment the viewport changes.
- Sidebars, captions, and table cells can go narrower; nothing should exceed ~80ch.
- Left-align anything read in sequence. Centred paragraphs make every line start in a new place, which costs the reader on every return.
- Justified text needs hyphenation to avoid rivers: `text-align: justify; hyphens: auto;` — and even then, only for long-form print-like layouts.
- `text-wrap: balance` on headings (evens out the last line), `text-wrap: pretty` on paragraphs (prevents orphans). Cheap, high-impact, and widely supported now.

## Weight and hierarchy

- Build hierarchy from size, weight, and space. Reach for colour last — hierarchy that only exists in hue disappears in grayscale and for low-vision users.
- Use weight steps of 200+: 400 vs 600, not 500 vs 600. Adjacent weights look like a rendering inconsistency.
- Bold body text at small sizes fills in and gets harder to read. Prefer a size bump or a colour step for small-label emphasis.
- Never use more than three weights in a system. Regular, medium (or semibold), and one display weight.
- De-emphasise instead of emphasising: if the "important" thing isn't standing out, dim its neighbours.

## Details that separate set from typed

```css
:root { font-synthesis: none; }               /* no faked bold/italic */
body  { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
.tabular { font-variant-numeric: tabular-nums; }  /* numbers in columns, counters, timers */
.prose { hanging-punctuation: first last; }        /* quotes hang outside the measure */
.headline { font-feature-settings: "ss01" 1; }     /* stylistic sets are often the good part */
```

- Real punctuation: `—` for em dashes, `–` for ranges, curly quotes, `×` not `x`, `′″` for feet/inches. Straight quotes in a headline undercut everything else on the page.
- Ligatures on for display, off for mono and for anything users might copy (like IDs).
- Numbers that update in place (timers, prices, counters) must be tabular or the layout jitters.
- Small caps for acronyms in running text if the face has real ones (`font-variant-caps: all-small-caps`) — synthesised small caps look wrong.
- Set `::selection` to a tinted brand colour; the browser default blue clashes with every palette.

## Diagnosing bad type

Symptom → likely cause:

- "Looks cheap" → single face, default weights, no tracking on display sizes.
- "Looks cramped" → line-height too low at body size, or measure too short with too much leading.
- "Hard to read" → measure over 80ch, or grey text under 4.5:1, or 14px body.
- "Looks inconsistent" → too many near-identical sizes; count them.
- "Headline doesn't land" → inherited line-height, no negative tracking, or competing with a badge/eyebrow above it.
- "Feels generic" → the pairing is one of the three defaults; change the display face and nothing else, then look again.
