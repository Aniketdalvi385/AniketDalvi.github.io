# Depth, Materials, and Finish

Contents: [Separation](#one-separation-strategy-per-surface) · [Shadows](#shadows) · [Borders](#borders) · [Radii](#radii) · [Surfaces](#surfaces-and-materials) · [Imagery](#imagery) · [Icons](#icons) · [Finish checklist](#the-finish-checklist) · [Diagnosing](#diagnosing)

Depth communicates layering. Finish is the set of small correctnesses that make a page feel maintained rather than shipped. This is where the word "premium" actually cashes out.

## One separation strategy per surface

There are three ways to separate a surface from its background:

1. **Border** — a hairline edge. Flat, precise, technical. Good for dense UI, tables, data.
2. **Shadow** — implies the surface floats. Good for transient things: menus, popovers, modals, drag states.
3. **Background shift** — the surface is a different lightness. Quiet, works well for large regions and in dark mode.

Pick one per surface type and be consistent. A card with a border *and* a shadow *and* a lighter background is the single most common cause of a busy, cheap-looking interface. The exception is a deliberate two-part treatment — hairline border plus a very soft shadow — which reads well when both are subtle and used everywhere.

A useful convention: static content uses borders or background shift; anything that appears over other content uses shadow.

## Shadows

Real shadows are diffuse, tinted, and multi-layered. A single large black blur is the giveaway.

```css
:root {
  /* tint with the neutral hue, never pure black */
  --shadow-color: 240 6% 12%;

  --shadow-sm:
    0 1px 2px  hsl(var(--shadow-color) / 0.05),
    0 1px 1px  hsl(var(--shadow-color) / 0.04);

  --shadow-md:
    0 1px 2px  hsl(var(--shadow-color) / 0.04),
    0 4px 8px  -2px hsl(var(--shadow-color) / 0.05),
    0 12px 20px -6px hsl(var(--shadow-color) / 0.05);

  --shadow-lg:
    0 1px 2px  hsl(var(--shadow-color) / 0.04),
    0 8px 16px -4px hsl(var(--shadow-color) / 0.06),
    0 24px 40px -12px hsl(var(--shadow-color) / 0.08);
}
```

Rules:

- 2–3 layers, each with a larger y-offset, larger blur, and *lower or equal* alpha than the last. The tight layer gives the contact edge; the wide layer gives the ambient falloff.
- Total alpha stays low — under ~0.12 combined for resting elements. If you can clearly see the shadow, it's too strong.
- Tint the shadow with the neutral hue. Pure `rgba(0,0,0,x)` desaturates whatever is beneath it and reads as a grey smudge.
- Elevation should be a small closed set: resting (none or `sm`), raised (`md`), overlay (`lg`). Three is enough; six is a system nobody follows.
- Light comes from above: y-offset positive, x-offset zero. Consistency of light direction across the page matters more than the exact values.
- A 1px inset top highlight (`inset 0 1px 0 rgba(255,255,255,.06)`) on dark surfaces makes buttons look physical. Use sparingly and only if the design is going for tactility.
- Coloured shadows under coloured elements (a button casting a faint version of its own hue) look intentional; the same button with a black shadow looks stuck on.
- In dark mode shadows barely register. Switch to surface lightness plus a hairline border for elevation.

## Borders

- Use semi-transparent rather than fixed colours: `rgba(0,0,0,.08)` in light mode, `rgba(255,255,255,.08)` in dark. These survive over any background; a fixed `#E5E7EB` breaks the moment the surface behind it changes.
- Dividers should be lighter than component borders — roughly half the alpha. Full-strength `1px solid` rules everywhere makes a page look like a spreadsheet.
- Sub-pixel borders on high-DPI displays: `0.5px` renders crisply on 2× and reads more refined for hairlines.
- Prefer `box-shadow: inset 0 0 0 1px <colour>` over `border` when the border shouldn't affect layout or when you need it to sit inside a radius cleanly.
- Focus rings are borders with a job: `outline: 2px solid var(--accent); outline-offset: 2px;` on `:focus-visible`. The offset is what makes it look designed rather than accidental.

## Radii

```css
--radius-sm: 6px;    /* inputs, small buttons, badges */
--radius-md: 10px;   /* buttons, small cards */
--radius-lg: 16px;   /* cards, panels */
--radius-xl: 24px;   /* modals, hero surfaces, images */
--radius-full: 999px;
```

- **Concentric radii: inner = outer − padding.** A 16px card with 8px padding needs a 8px inner radius. Equal radii on nested elements makes the corners look wrong in a way people notice without being able to name.
- Radius should scale with element size. 4px on a 400px card looks unfinished; 24px on a 32px button looks like a pill by accident.
- Pick a radius *personality* and commit: near-zero (technical, editorial, serious), moderate 8–12px (neutral, modern), large 20px+ (friendly, consumer, soft). Mixing sharp and very round in one interface reads as indecision.
- `rounded-2xl` on everything is a slop tell largely because it's applied uniformly rather than because 16px is wrong.

## Surfaces and materials

- Layer surfaces by lightness, and keep the number of layers to three: page → surface → raised surface.
- Backdrop blur (`backdrop-filter: blur(12px) saturate(180%)`) works when there's genuinely something behind it worth showing through, and needs a semi-opaque background behind the blur or the text loses contrast. A blurred nav over a plain white page is decoration pretending to be material.
- Subtle grain or noise (an SVG `feTurbulence` overlay at 2–4% opacity) removes the plastic flatness of large flat colour fields — particularly effective on dark backgrounds and on gradients.
- Texture, if used, belongs on one surface type only. Grain on every card is a filter, not a material.

## Imagery

- Consistent aspect ratios across a set (`aspect-ratio: 16/9` or `4/3` plus `object-fit: cover`) matter more than the ratio chosen. Mixed ratios in a grid look like a data problem.
- Add a faint inset border to images on light backgrounds (`inset 0 0 0 1px rgba(0,0,0,.06)`) so white-background images don't bleed into the page.
- Treat images so they belong to the palette: a slight desaturation, a duotone, or a consistent colour grade unifies stock photography that otherwise fights the design.
- Serve modern formats (AVIF/WebP) with explicit `width`/`height` or `aspect-ratio` to prevent layout shift — a page that jumps while loading undoes the craft.
- Generic imagery is a slop tell of its own: 3D blobs, gradient meshes, isometric illustrations, and abstract "AI" visuals. Content-specific imagery — the actual product, the actual place, the actual data — outperforms all of it.
- Screenshots need a frame treatment (subtle border, radius, shadow) or they look pasted in. Crop to the interesting part rather than showing the whole window.

## Icons

- One family. Mixing Lucide with Heroicons with Font Awesome is visible immediately, mostly through inconsistent stroke weight and corner treatment.
- Match stroke width to type weight: 1.5px stroke at 20–24px icon size pairs with 400–500 text; 2px reads bold.
- Optical sizing: align icon to the text's cap height, not its line box, and expect to nudge 1px.
- Icons in filled rounded squares next to every feature heading is a template pattern. If the icons aren't carrying meaning, remove them.
- Emoji as iconography is a tell. Use it only where the register genuinely calls for informality.

## The finish checklist

These take minutes and are what separates a maintained site from a demo:

- `:focus-visible` styles on every interactive element, using the accent, with `outline-offset`.
- `::selection` colour set to a tinted brand colour.
- Hover states gated: `@media (hover: hover) and (pointer: fine)`.
- Active/pressed feedback on buttons (`transform: scale(0.98)`), so the UI feels responsive.
- Empty states designed: an explanation and a next action, not "No data".
- Loading states designed: skeletons that match the real layout's shape, or nothing at all — never a centred spinner on a full page if the layout is known.
- Error states in the interface's voice, saying what to do next.
- Disabled states that read as disabled without failing contrast entirely.
- Real favicon (SVG + 180px PNG) and a real OG image — the link preview is part of the design and is often the first thing anyone sees.
- Scrollbars styled if the design is dark or distinctive (`scrollbar-width: thin; scrollbar-color:`).
- Cursors correct: `pointer` on actions, `text` on text, `not-allowed` on disabled, `grab` on draggables.
- `prefers-reduced-motion` respected.
- Text remains selectable; don't `user-select: none` on content.
- Print stylesheet if the page is a report or invoice.

## Diagnosing

- "Busy / cheap" → border + shadow + background shift on the same surface; full-strength dividers everywhere.
- "Flat / lifeless" → no elevation strategy at all, everything on one plane, no surface layering.
- "Corners look wrong" → equal nested radii, or radius not scaled to element size.
- "Feels like a template" → uniform `rounded-2xl shadow-lg`, icon-in-rounded-square cards, generic illustration.
- "Unfinished" → missing focus styles, unstyled empty states, default selection blue, no favicon.
- "Images look pasted in" → mixed aspect ratios, no border on light images, no colour treatment.
