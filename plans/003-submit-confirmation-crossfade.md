# 003 — Cross-fade the form → confirmation swap

**Repo:** AniketDalvi.github.io · **Commit:** `c8b7ae8` · **Severity:** MEDIUM
**Category:** Missed opportunity — rare, earned moment
**Status:** DONE — applied with two deviations: `.sent` carries one transition
declaration rather than the two the plan listed, and a `setTimeout(reveal, 120)`
fail-safe backs the double-rAF (rAF is throttled to zero in a background tab,
which would otherwise leave the card permanently at opacity 0).

## Problem

On a successful submit, `showSent()` at `src/components/Contact.astro:509` flips
two `[hidden]` attributes:

```js
	const showSent = () => {
		form?.setAttribute("hidden", "");
		sent?.removeAttribute("hidden");
	};
```

The form vanishes and the confirmation card appears in the same frame. Per
AUDIT.md's frequency table, a successful contact submit is a *rare / first-time*
event — the category that can carry delight. Right now it has none, and the
instant swap reads as a page glitch rather than an acknowledgement.

Note both elements are governed by an explicit rule (added because
`form { display: flex }` outranks the UA `[hidden] { display: none }`):

```css
	form[hidden],
	.sent[hidden] {
		display: none;
	}
```

`display: none` cannot transition, so the swap must be driven by a different
attribute.

## Fix

Asymmetric cross-fade — the form leaves quickly (system response), the card
arrives with a little more time and a slight scale (the earned moment). Per
AUDIT.md, never animate from `scale(0)`; start at `0.97`.

### Step 1 — replace the `[hidden]` override in `src/components/Contact.astro`

Replace exactly:

```css
	form[hidden],
	.sent[hidden] {
		display: none;
	}
```

with:

```css
	/* `display` still does the hiding — a bare `display: flex` on <form> outranks
	   the UA sheet's [hidden] rule, so this must stay. The *animation* is driven
	   by [data-swap] instead, because display cannot transition. */
	form[hidden],
	.sent[hidden] {
		display: none;
	}

	form,
	.sent {
		transition: opacity 0.15s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
	}
	/* Leaving: quick, no scale — a system response should snap. */
	form[data-swap-out] {
		opacity: 0;
		transform: translateY(-4px);
	}
	/* Arriving: longer, with a slight rise and scale. Starts at 0.97, never 0 —
	   nothing in the real world appears from nothing. */
	.sent[data-swap-in] {
		opacity: 0;
		transform: translateY(8px) scale(0.97);
	}
	.sent {
		transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}
```

### Step 2 — sequence it in `showSent()` at `src/components/Contact.astro:509`

Replace:

```js
	const showSent = () => {
		form?.setAttribute("hidden", "");
		sent?.removeAttribute("hidden");
	};
```

with:

```js
	const showSent = () => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduce || !form || !sent) {
			form?.setAttribute("hidden", "");
			sent?.removeAttribute("hidden");
			return;
		}

		// Fade the form out, then swap and let the card rise in. The card is
		// un-hidden in its entry state first, so the browser has a frame to paint
		// it before the attribute that animates it is removed — without that
		// double rAF the transition is skipped and the card simply appears.
		form.setAttribute("data-swap-out", "");
		window.setTimeout(() => {
			form.setAttribute("hidden", "");
			sent.setAttribute("data-swap-in", "");
			sent.removeAttribute("hidden");
			requestAnimationFrame(() =>
				requestAnimationFrame(() => sent.removeAttribute("data-swap-in"))
			);
		}, 150);
	};
```

### Step 3 — reset on "Send another"

The `again` click handler (`src/components/Contact.astro`, near the end of the
script) must clear the new attributes or a second submit will animate wrongly.
Add to that handler, alongside the existing resets:

```js
		form?.removeAttribute("data-swap-out");
		sent?.removeAttribute("data-swap-in");
```

## Scope boundaries

- Do **not** remove the `form[hidden] / .sent[hidden] { display: none }` rule.
  It is load-bearing; without it the form stays visible after submit.
- Do **not** animate the `mailto:` fallback path differently — it calls the same
  `showSent()`.
- Do **not** add a spring or bounce; this site's only overshoot is `.send`.
- Touch only `src/components/Contact.astro`.

## Verification

1. `npm run build` — 0 errors, 0 warnings, 0 hints.
2. Feel-check in a real browser with a valid submission. Expected: form fades and
   lifts slightly over 150ms, then the card rises and settles over 300ms. Total
   ~450ms, which is acceptable here because it is a rare event, not pointer
   feedback.
3. Click "Send another", then submit again. The second run must animate
   identically — if the card appears instantly, step 3 was missed.
4. **Failure path must be unaffected:** block the network (DevTools offline) and
   submit. The error should appear and the form must stay visible with the
   button re-enabled. `showSent()` is not called on failure.
5. Reduced motion: instant swap, no animation, no timing delay.
