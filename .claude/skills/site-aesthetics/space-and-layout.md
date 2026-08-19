# Space and Layout

Contents: [Spacing scale](#the-spacing-scale) · [Proximity](#proximity-does-the-grouping) · [Padding](#padding-and-density) · [Page structure](#page-structure) · [Grid](#grid-and-alignment) · [Optical alignment](#optical-alignment) · [Pacing](#pacing-and-rhythm) · [Responsive](#responsive-behaviour) · [Diagnosing](#diagnosing-bad-spacing)

Spacing is the second-highest-leverage category and the one people most often try to fix element by element. It's a scale problem.

## The spacing scale

One scale, 4px base, non-linear at the top:

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  24px;
--space-6:  32px;
--space-7:  48px;
--space-8:  64px;
--space-9:  96px;
--space-10: 128px;
```

- The gaps widen as values grow because a 4px difference matters at 8px and is invisible at 96px.
- Anything off-scale (13px, 22px, 70px) is the leading cause of "something feels slightly wrong". Snap it.
- 4px base suits most UI. An 8px base is cleaner for dense product surfaces; a 6px base suits editorial layouts with larger type. Pick one and never mix.
- Small-value spacing (4–12px) is for within-component relationships; 48px+ is for page-level separation. If a component is using 64px internal padding, it's probably actually a section.

## Proximity does the grouping

The single most useful spacing rule: **space within a group must be visibly smaller than the space around it** — roughly half or less.

```
Label            ← 4px  →  Value          (within: tight)
                 ← 24px →                 (between fields: 6× tighter relationship broken)
Label            ← 4px  →  Value
                 ← 48px →                 (between sections)
```

When this is right, you can delete most dividers, boxes, and background tints — the eye already groups correctly. When it's wrong, no amount of borders will fix the confusion, and adding them is what makes interfaces look cluttered.

Check the ratio explicitly during an audit: measure gap-within and gap-between for every group on the page. If they're equal, or inverted, that's the finding.

## Padding and density

- Padding should be proportional to the element: a button at 14px text takes ~10px/16px padding; a card at 16px body takes 20–24px; a page section takes 64–128px.
- Horizontal padding usually exceeds vertical on interactive elements (buttons, inputs, pills) — roughly 1.5–2×. Equal padding makes buttons look stubby.
- Optical centring: text sits slightly high in a box because of descender space. For a single line of text in a tall container, shaving 1–2px off the bottom padding often looks more centred than mathematical equality. Same for an icon next to text — align to cap height, not bounding box.
- Density tiers are legitimate: a data table can run at 8px vertical padding while the marketing page runs at 96px section spacing. Both should come from the same scale.
- Touch targets: 44×44px minimum, regardless of how small the visual element is. Use padding or a pseudo-element, not a bigger icon.

## Page structure

- Content container: 1200–1280px for standard marketing, 1440px+ only if the design uses the width for something. Reading columns cap at 65ch regardless of container width.
- Full-bleed elements (images, coloured bands) against a constrained text column create the rhythm that makes a long page readable.
- Vertical section spacing should differ by role, not be uniform: hero to first section can be tight (the hero already has breathing room), major section breaks get the largest value, sub-sections within a section get one step down. `py-20` on everything is the tell.
- Give the page an outer margin that survives on mobile: `padding-inline: clamp(16px, 5vw, 64px)`.

## Grid and alignment

- A 12-column grid is a coordination tool, not a look. Its value is that unrelated components land on the same edges.
- **A consistent left edge is the cheapest way to look composed.** Headings, body, buttons, and images that share an alignment line read as designed even if nothing else is special.
- Don't centre everything. Centre short display text (a hero headline, a section eyebrow, a call to action). Left-align anything read in sequence: paragraphs, lists, forms, tables, cards with body copy.
- Asymmetry is a tool: a 7/5 split reads more confident than 6/6, and an offset headline creates tension a centred one can't. But asymmetry needs a reason and a repeated pattern, or it looks accidental.
- Cards in a grid should share a height (`align-items: stretch`) and an internal baseline for their titles, or the row looks ragged.
- Align to the grid *or* deliberately break it — one element crossing the column boundary is a signature; three is noise.

## Optical alignment

Mathematical alignment often looks wrong. Nudge:

- Icons and bullets hang slightly outside the text edge (`margin-left: -0.15em` or a negative-indent list) so the *text* edge stays straight.
- Opening quote marks hang outside the measure (`hanging-punctuation: first last`, or a negative text-indent as fallback).
- Round shapes (circles, pill buttons) need ~2–5% more size than square ones to appear equal in weight.
- A right-aligned column of numbers aligns on the decimal, not the glyph edge — `tabular-nums` plus `text-align: right`.
- Text next to a large icon aligns to the icon's optical centre, which is usually not its bounding-box centre.

## Pacing and rhythm

A page should breathe unevenly. Uniform spacing produces a wall of equally-weighted content, which is why so many landing pages feel long and forgettable.

- Alternate dense and open: a tight three-column spec table after a wide-open hero, then generous space again.
- Change the container width between sections — a narrow testimonial after a wide feature grid resets the eye.
- Every section shouldn't have the same internal structure (eyebrow / heading / paragraph / three cards). Vary the shape by content.
- Use one long scroll of consistent rhythm only when the content really is a sequence of equivalent items (a catalogue, a changelog).

## Responsive behaviour

Most aesthetic collapse happens between 320 and 640px:

- Reduce the spacing scale at small widths, don't keep 96px section padding on a phone: `padding-block: clamp(48px, 10vw, 96px)`.
- Type scales down non-uniformly — display sizes shrink a lot, body barely at all. `clamp()` per step.
- Three columns → one column, not three squeezed columns. Cards with 8px of internal padding on mobile look broken.
- Check that the left edge alignment survives; container padding often eats it.
- Test 320px, 390px, 768px, 1280px, 1920px. The last one matters: many layouts have no `max-width` and stretch into unreadability on a wide monitor.

## Diagnosing bad spacing

- "Cluttered" → group spacing equals inter-group spacing; the design is compensating with borders and boxes.
- "Empty / unfinished" → large gaps with no alignment structure; whitespace without an edge to hold it.
- "Slightly off" → off-scale values; count distinct spacing values in the CSS.
- "Long and boring" → uniform section padding and identical section structure.
- "Doesn't feel premium" → insufficient outer margin and section spacing. Cheap layouts are almost always too tight at the page level and too loose at the component level.
- "Broken on mobile" → fixed pixel padding and non-fluid type.
