# 001 — Animate the nav scroll-spy underline

**Repo:** AniketDalvi.github.io · **Commit:** `c8b7ae8` · **Severity:** HIGH
**Category:** Missed opportunity — high-frequency state change
**Status:** DONE — applied, build clean, end-states verified

## Problem

`src/components/Nav.astro:122` draws the current-section underline with a
pseudo-element that only exists while the attribute is set:

```css
.nav-link[aria-current]::after {
	content: "";
	position: absolute;
	left: 0;
	right: 0;
	bottom: -6px;
	height: 1px;
	background: var(--fg);
}
```

A scroll-spy `IntersectionObserver` (`src/components/Nav.astro:219-227`) adds and
removes `aria-current` continuously as the reader scrolls the homepage. Because
the `::after` is *created and destroyed* rather than restyled, there is nothing
to transition — the underline flickers between links instead of moving.

This is the most frequently triggered state change on the site: it fires on
ordinary scrolling, not on a deliberate interaction.

## Fix

Render the `::after` on **every** `.nav-link` and animate `transform: scaleX()`.
A pseudo-element that always exists can transition; one that appears with the
attribute cannot.

Use `transform`, never `width` — width is a layout property (AUDIT.md,
Performance) and would trigger layout on every scroll tick.

### Step 1 — replace the rule at `src/components/Nav.astro:122`

Replace exactly this block:

```css
	.nav-link[aria-current]::after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: -6px;
		height: 1px;
		background: var(--fg);
	}
```

with:

```css
	/* Drawn on every link, not just the current one: a pseudo-element that is
	   created and destroyed with the attribute has nothing to transition, so the
	   underline flickered between sections as the scroll-spy moved. Always
	   present, collapsed to scaleX(0), it can animate. scaleX rather than width
	   because width is a layout property and this fires on every scroll tick. */
	.nav-link::after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: -6px;
		height: 1px;
		background: var(--fg);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.nav-link[aria-current]::after {
		transform: scaleX(1);
	}
```

### Step 2 — reduced motion

`src/components/Nav.astro` has no `prefers-reduced-motion` block. Add one at the
end of the component's `<style>` block:

```css
	@media (prefers-reduced-motion: reduce) {
		.nav-link::after {
			transition: none;
		}
	}
```

The underline still appears and disappears — only the sweep is dropped. Per
AUDIT.md, reduced motion means gentler, not absent.

## Scope boundaries

- Do **not** change the IntersectionObserver, its `rootMargin`, or `paint()`.
- Do **not** touch `.nav-link`'s existing `color` transition on line 112.
- Do **not** convert this to a "sliding pill" that moves one element between
  links; that needs JS position tracking and is out of scope.
- Touch only `src/components/Nav.astro`.

## Verification

1. `npm run build` — must report 0 errors, 0 warnings, 0 hints.
2. Confirm the emitted CSS contains both rules. Astro splits CSS: check the
   inline `<style>` blocks in `dist/index.html` **as well as**
   `dist/_astro/*.css` — a rule can be in either.
   ```bash
   python3 -c "
   import re
   h=open('dist/index.html').read()
   css=''.join(re.findall(r'<style>(.*?)</style>',h,re.S))
   print([re.sub(r'\[data-astro-cid-[a-z0-9]*\]','',m) for m in re.findall(r'\.nav-link[^{]*::after\{[^}]*\}',css)])"
   ```
   Expect two rules: one with `transform:scaleX(0)` + transition, one with
   `scaleX(1)`.
3. **Feel-check in a real browser** (not headless — headless Chrome does not
   animate CSS transitions under `--virtual-time-budget`): scroll the homepage
   slowly through Work → About → Experience. The underline should sweep in from
   the left of each link. Scroll fast: it should look continuous, not strobing.
4. Set OS reduced-motion and repeat — the underline should snap, not sweep, and
   must still be visible on the current section.
