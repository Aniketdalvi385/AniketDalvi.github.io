# 005 — Acknowledge the theme switch on the toggle dot

**Repo:** AniketDalvi.github.io · **Commit:** `c8b7ae8` · **Severity:** LOW
**Category:** Missed opportunity — polish
**Status:** DONE — uses `var(--ease-spring)` since plan 004 landed first.
Verified: scale targets 1.000 → 1.550 → 1.000, transition caught mid-flight at
1.31 by 100ms, reduced motion never sets the attribute, and the OS-preference
listener remains pulse-free.

## Problem

The theme toggle at `src/components/Nav.astro:58` is the one control on the site
whose entire job is to signal a binary state:

```html
<button class="toggle" id="themeToggle" type="button" aria-label="Toggle color theme">
	<span class="dot"></span><span id="themeLabel">Light</span>
</button>
```

Its indicator dot (`src/components/Nav.astro:152`) is inert:

```css
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--fg);
	}
```

On click, `sync()` swaps the label text and the page crossfades over 0.5s — but
the dot itself, the element a reader's eye is on when they press the button,
does not move at all. The control gives no feedback that the press registered;
only the page around it responds, and slower.

## Fix

A brief scale-pulse on the dot when the theme changes. This is a *rare*
interaction (AUDIT.md frequency table) so a small flourish is appropriate, but
it must stay under 300ms because it is still direct feedback on a press.

Use a transition driven by an attribute, not a keyframe: keyframes restart from
zero if the user toggles rapidly, whereas a transition retargets from the
current state (AUDIT.md, Interruptibility).

### Step 1 — extend `.dot` at `src/components/Nav.astro:152`

```css
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--fg);
		/* Feedback on the one control whose job is signalling state. Transition,
		   not a keyframe: a rapid double-toggle retargets from the current scale
		   instead of restarting, so the dot never jumps. */
		transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.toggle[data-switched] .dot {
		transform: scale(1.55);
	}
```

`cubic-bezier(0.34, 1.56, 0.64, 1)` is the site's existing overshoot curve,
already used by `.send` — do not invent a new one. (If plan 004 has landed, use
`var(--ease-spring)` instead of the literal.)

### Step 2 — stamp and clear the attribute in the click handler

At `src/components/Nav.astro:190`, the handler currently ends with `sync();`.
Add the pulse after it:

```js
	toggle?.addEventListener("click", () => {
		const next = current() === "dark" ? "light" : "dark";
		root.setAttribute("data-theme", next);
		try {
			localStorage.setItem("ad_theme", next);
		} catch (e) {
			/* private mode — theme resets next load */
		}
		sync();

		// Pulse the dot. Cleared on the next frame so the transition runs back
		// down to rest; a timeout matched to the duration would fight a rapid
		// second click, whereas retargeting from the current scale does not.
		if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			toggle.setAttribute("data-switched", "");
			window.setTimeout(() => toggle.removeAttribute("data-switched"), 180);
		}
	});
```

## Scope boundaries

- Do **not** animate the label text swap — a text crossfade at this size reads
  as a glitch, and the label is read, not watched.
- Do **not** change the 0.5s page-wide theme crossfade on `body`, `.nav`,
  `.panel` and `.contact`. That budget is documented in CLAUDE.md.
- Do **not** add motion to the OS-preference `change` listener at
  `src/components/Nav.astro:202` — that fires without a user press, and pulsing
  a control nobody touched is noise.
- Touch only `src/components/Nav.astro`.

## Verification

1. `npm run build` — 0 errors, 0 warnings, 0 hints.
2. Feel-check in a real browser: click the toggle. The dot should swell and
   settle within ~220ms, overlapping the start of the page crossfade rather than
   waiting for it.
3. Click the toggle rapidly five times. The dot must not stutter or jump — each
   press should retarget smoothly. If it snaps back to 1 before growing again,
   the attribute is being cleared too aggressively.
4. Reduced motion: no pulse at all, theme still switches, label still updates.
5. Confirm the OS-preference path is untouched: change the system theme while
   no explicit choice is stored — the page should recolour with no dot pulse.
