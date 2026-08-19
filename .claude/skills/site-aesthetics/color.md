# Colour

Contents: [Structure of a palette](#structure-of-a-palette) · [Neutrals](#neutrals-are-the-design) · [OKLCH ramps](#building-ramps-in-oklch) · [Accent](#the-accent) · [Semantic colours](#semantic-colours) · [Dark mode](#dark-mode) · [Contrast](#contrast) · [Gradients](#gradients-and-tinting) · [Diagnosing](#diagnosing-bad-colour)

## Structure of a palette

A complete palette is smaller than people expect:

1. A **neutral ramp** — 10–12 steps from near-white to near-black, tinted with a trace of the brand hue. This is 90% of the pixels.
2. One **accent hue** with a base, a hover/active variant, and a low-alpha wash for backgrounds and focus rings.
3. Optionally one **secondary hue** used for a single purpose only (charts, a specific badge type) — not as a second accent.
4. Four **semantic** colours: success, warning, danger, info — sharing the saturation character of the accent.

That's it. Every additional hue costs coherence. If a page needs six hues, it's usually a data-visualisation problem, and those get their own ordered categorical scale.

## Neutrals are the design

Pure grey (`#808080` and friends) is what a computer picks. Tint the ramp toward the brand hue by a small amount — chroma 0.005–0.02 in OKLCH — and the whole page feels considered without anyone being able to say why. Warm tint (toward orange/yellow) reads human, editorial, approachable; cool tint (toward blue) reads technical, clinical, precise.

Also:

- Don't put `#000` on `#fff`. The contrast is harsher than paper and causes halation, especially on OLED. Use `#16181D`-ish on `#FCFCFD`-ish, both carrying the tint.
- Backgrounds: a page background slightly off-white with cards at pure white reads as "surface above surface" and needs no border. Or invert it — white page, tinted cards. Pick one direction and hold it.
- Secondary text needs *two* levels, not one: a mid-dark step for labels and a lighter step for metadata. Collapsing both into a single grey is the most common flattening of hierarchy.

## Building ramps in OKLCH

Hex lightness ladders always have a muddy middle because sRGB isn't perceptually uniform. OKLCH separates lightness, chroma, and hue, so an even L progression looks even.

```css
:root {
  --hue: 250;            /* brand hue, degrees */
  --tint: 0.012;         /* neutral chroma — keep tiny */

  --n-50:  oklch(98.5% var(--tint) var(--hue));
  --n-100: oklch(96.5% var(--tint) var(--hue));
  --n-200: oklch(92%   var(--tint) var(--hue));
  --n-300: oklch(86%   var(--tint) var(--hue));
  --n-400: oklch(72%   var(--tint) var(--hue));
  --n-500: oklch(60%   var(--tint) var(--hue));
  --n-600: oklch(50%   var(--tint) var(--hue));
  --n-700: oklch(40%   var(--tint) var(--hue));
  --n-800: oklch(30%   var(--tint) var(--hue));
  --n-900: oklch(22%   var(--tint) var(--hue));
  --n-950: oklch(15%   var(--tint) var(--hue));
}
```

Notes on building a *chromatic* ramp (the accent's ladder):

- Chroma must peak in the middle and fall off at both ends. Holding chroma constant while dropping lightness produces steps that look dirty at the dark end and neon at the light end. Roughly: `C` at 0.03 near L 97%, 0.16–0.20 at L 55–65%, 0.08 at L 25%.
- Shift hue slightly along the ramp to mimic how pigments behave — reds warm toward orange as they lighten, blues cool toward violet as they darken. 5–15° over the full ramp is plenty.
- Wrap wide-gamut values with a fallback if you support older browsers: `@supports (color: oklch(0% 0 0))`, or let a build step emit hex fallbacks.
- `color-mix()` covers most one-off needs without new tokens: `color-mix(in oklab, var(--accent) 12%, transparent)` for a wash, `color-mix(in oklab, var(--accent) 85%, black)` for a pressed state.

## The accent

- Presence budget: roughly 60% neutral surface, 30% neutral text/structure, 10% accent. If the accent is on every button, badge, link, icon, and border, it stops signalling anything.
- Reserve the saturated accent for the single primary action per view. Secondary actions get a neutral or ghost treatment.
- Derive hover/active from the base rather than hand-picking: hover darkens ~6% L (light mode) or lightens ~6% (dark mode); active goes a further 4% plus the press scale.
- Avoid `#6366F1`, `#3B82F6`, `#8B5CF6` and the rest of the framework-default indigo/violet range unless the brand actually owns that hue. Also currently overused: `#D97757` terracotta, acid `#C4F82A` green.
- Test the accent against the neutral ramp at every step it will touch. A hue that sings on white can vanish on `--n-100`.

## Semantic colours

- Green/amber/red/blue, but *matched to the palette's character*: if the accent is muted and desaturated, a full-saturation `#22C55E` success green will look pasted in.
- Never rely on hue alone to communicate state. Pair with an icon or text — 8% of men can't separate your red from your green.
- Use the low-alpha wash for the background and the dark step for the text: `background: color-mix(in oklab, var(--danger) 10%, transparent); color: var(--danger-700)`. Full-saturation fills with white text are for destructive buttons only.

## Dark mode

Dark mode is a separate design, not `filter: invert()`.

- **Elevation reverses.** In light mode, higher surfaces are lighter and shadows do the separating. In dark mode, shadows are nearly invisible — higher surfaces get lighter (L 15% → 19% → 23%) and hairline borders (`rgba(255,255,255,.07)`) carry the edges.
- **Reduce saturation.** Bright chroma vibrates against dark backgrounds. Drop accent chroma by 15–25% and raise lightness so it stays readable.
- **Don't use pure white text.** L ~93% (`#EDEDEF`) for primary, ~70% for secondary, ~52% for tertiary. Pure white on near-black blooms and causes eye strain.
- **Don't use pure black background** either, except for OLED-first designs — `oklch(15% 0.01 var(--hue))` gives room for surfaces below the base layer.
- **Increase leading slightly** (about 0.05) and consider one weight lighter for body text; light-on-dark text renders optically bolder.
- Images and illustrations often need a dark-mode variant, or at minimum a slight opacity reduction (`filter: brightness(.9)`) so they don't glare.

## Contrast

- 4.5:1 for body text, 3:1 for text 24px+ or 19px+ bold, 3:1 for meaningful UI boundaries and focus indicators.
- Placeholder text and disabled states are the usual failures. Disabled can go below 4.5:1 only if the state is also communicated non-visually.
- Contrast on *coloured* surfaces has to be checked separately — white text on a mid-saturation accent frequently fails.
- APCA (the WCAG 3 candidate) models thin light text on dark better than the current ratio maths; if a dark theme passes 4.5:1 but still looks weak, APCA will tell you why.

## Gradients and tinting

- Interpolate in `oklab`, not sRGB, to avoid the grey dead zone in the middle: `linear-gradient(in oklab, ...)`.
- Multi-stop with an eased midpoint beats two stops. A gradient from `--accent-500` to `--accent-600` — barely visible — adds depth; a gradient from purple to pink adds a 2021 timestamp.
- Radial washes behind content should be very low contrast (2–4% lightness difference). If the blur orbs are legible as shapes, they're too strong.
- A trace of the brand hue mixed into every surface, border, and shadow is what makes a palette feel like one palette.

## Diagnosing bad colour

- "Looks cheap" → pure greys, pure black text, single-layer black shadows, full-saturation accent everywhere.
- "Looks muddy" → constant chroma down the ramp, or a gradient interpolated in sRGB.
- "Too busy" → more than one accent hue, or accent used on more than ~10% of the surface.
- "Flat" → only one neutral step for all secondary text; no elevation strategy.
- "Dark mode looks broken" → inverted palette, shadows doing elevation, pure white text, unchanged saturation.
- "Doesn't feel like the brand" → neutrals untinted; the brand hue only appears in buttons.
