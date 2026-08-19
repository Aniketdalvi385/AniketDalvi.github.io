# 002 — Give the form validation error an entrance

**Repo:** AniketDalvi.github.io · **Commit:** `c8b7ae8` · **Severity:** HIGH
**Category:** Missed opportunity — unacknowledged state change
**Status:** DONE — applied with one deviation: the `transition` shorthand was
replaced by longhands (`transition-property` / `-duration` / `-timing-function`
/ `-delay`) because the minifier compiled `visibility 0s linear 0s` down to
`visibility linear`, dropping both zeros and leaving the element `hidden` for
the whole fade-in. Computed values verified correct in-browser.

## Problem

The contact form's error message is a bare `[hidden]` toggle. Markup at
`src/components/Contact.astro:112`:

```html
<span class="error" id="formError" role="alert" hidden></span>
```

Style at `src/components/Contact.astro:330` — no transition at all:

```css
	.error {
		font: 500 var(--t-mono) "JetBrains Mono", monospace;
		color: var(--err);
	}
```

The JS flips `errorEl.hidden` at `src/components/Contact.astro:473` and `:490`.
The message therefore snaps into existence. This is the single moment the form
tells the visitor something is wrong, and it is the most abrupt thing on the
page — the error also shifts the submit button down as it appears, with no
transition to connect the two states.

## Fix

Fade and rise. `[hidden]` sets `display: none`, which cannot transition, so the
element must stay in the layer and be hidden by `opacity` + `visibility`.

### Step 1 — replace the rule at `src/components/Contact.astro:330`

```css
	/* Not driven by [hidden]: `display: none` cannot transition, so the message
	   stays in the layer and hides with opacity + visibility. `visibility`
	   rather than opacity alone keeps it out of the accessibility tree and off
	   the tab order while hidden. */
	.error {
		font: 500 var(--t-mono) "JetBrains Mono", monospace;
		color: var(--err);
		opacity: 0;
		visibility: hidden;
		transform: translateY(-4px);
		transition: opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
			visibility 0s linear 0.18s;
	}
	.error[data-shown] {
		opacity: 1;
		visibility: visible;
		transform: none;
		transition: opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
			visibility 0s linear 0s;
	}
```

The `visibility` delay is deliberate: 0s on the way in so it is immediately
available, delayed by the duration on the way out so the fade completes before
it leaves the tree.

### Step 2 — swap the JS from `hidden` to `data-shown`

At `src/components/Contact.astro:471-474`, currently:

```js
		if (errorEl) {
			errorEl.textContent = msg;
			errorEl.hidden = false;
		}
```

becomes:

```js
		if (errorEl) {
			errorEl.textContent = msg;
			errorEl.setAttribute("data-shown", "");
		}
```

At `src/components/Contact.astro:488-491`, currently:

```js
		if (errorEl) {
			errorEl.hidden = true;
			errorEl.textContent = "";
		}
```

becomes:

```js
		if (errorEl) {
			errorEl.removeAttribute("data-shown");
			// Text is left in place: clearing it mid-fade makes the message vanish
			// before the transition finishes. It is inert while visibility is
			// hidden, and every showError() overwrites it.
		}
```

### Step 3 — remove `hidden` from the markup

At `src/components/Contact.astro:112`, drop the `hidden` attribute (the CSS now
owns the hidden state):

```html
<span class="error" id="formError" role="alert"></span>
```

### Step 4 — reduced motion

Add to the existing `@media (prefers-reduced-motion: reduce)` block in
`src/components/Contact.astro`:

```css
		.error,
		.error[data-shown] {
			transition: opacity 0.18s linear, visibility 0s;
			transform: none;
		}
```

Keeps the fade (comprehension), drops the movement.

## Scope boundaries

- Do **not** change `role="alert"`, the `aria-invalid` / `aria-describedby`
  wiring, or any validation logic or message text.
- Do **not** animate the submit button's position shift.
- Touch only `src/components/Contact.astro`.

## Verification

1. `npm run build` — 0 errors, 0 warnings, 0 hints.
2. **The `role="alert"` announcement must survive.** Emptying and refilling
   `textContent` is what triggers a screen-reader announcement; step 2 keeps
   `showError` writing text on every call, so each new error still announces.
   Confirm `errorEl.textContent = msg` is still present in `showError`.
3. Feel-check in a real browser: submit the form empty. The message should fade
   and settle over ~180ms. Type in the field — it should fade out, not vanish.
4. Submit empty twice in a row with different errors (empty name, then bad
   email) — the second message must replace the first without flicker.
5. Reduced motion: message fades but does not move.
