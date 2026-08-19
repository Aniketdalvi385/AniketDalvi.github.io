# 004 — Tokenise the easing curves

**Repo:** AniketDalvi.github.io · **Commit:** `c8b7ae8` · **Severity:** MEDIUM
**Category:** Cohesion & tokens
**Status:** DONE — 49 literals replaced across 12 files (45 out / 3 veil / 1
spring; the count grew from 38 because plans 001-003 added new curves, which is
why this plan was ordered last). Verified: zero remaining literals outside the
token definitions, all three tokens resolve at runtime, and a declaration-set
diff of the built CSS shows no semantic change.

## Problem

The site has a consistent motion language but no tokens for it. Every curve is
written as a literal, 42 times across 12 files:

| Curve | Role | Occurrences |
| --- | --- | --- |
| `cubic-bezier(0.16, 1, 0.3, 1)` | standard out-curve, all pointer feedback and reveals | **38** |
| `cubic-bezier(0.76, 0, 0.24, 1)` | page veils and the loader wipe | **3** |
| `cubic-bezier(0.34, 1.56, 0.64, 1)` | `.send` overshoot, deliberately one-off | **1** |

Per-file counts:

```
styles/global.css            out=4
components/Work.astro        out=6
components/Preloader.astro   veil=1
components/About.astro       out=2
components/OverscrollLink    out=2  veil=1
components/BackOverscroll    veil=1
components/Contact.astro     out=5  spring=1
components/Metrics.astro     out=3
components/Writing.astro     out=3
components/Nav.astro         out=2
layouts/Article.astro        out=5
pages/writing.astro          out=6
```

`global.css` already tokenises colour, type and spacing (`--fg`, `--t-body`,
`--gutter`) but stops short of motion. The drift this invites is not
hypothetical: a prior review found eight hover rules that had fallen back to the
bare `ease` keyword while the rest of the site used the custom curve.

## Fix

Add motion tokens beside the existing ones and replace the literals. This is a
**mechanical, zero-behaviour-change refactor** — every computed value must be
byte-identical afterwards.

### Step 1 — define the tokens in `src/styles/global.css`

Add at the end of the `:root { … }` block that already holds `--gutter` and the
type scale (around `src/styles/global.css:65`), before the closing brace:

```css
	/* Motion. Three curves cover the whole site:
	   --ease-out   the standard out-curve for pointer feedback and reveals.
	   --ease-veil  a symmetric ease-in-out, correct for full-page transitions
	                (the veils and the loader wipe) where the element travels
	                across the viewport rather than responding to a pointer.
	   --ease-spring a single deliberate overshoot, used only by .send on hover.
	   Durations are not tokenised: they are per-component decisions documented
	   in CLAUDE.md's motion budget, not a scale. */
	--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
	--ease-veil: cubic-bezier(0.76, 0, 0.24, 1);
	--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Step 2 — replace every literal

In each of the 12 files listed above, replace:

- `cubic-bezier(0.16, 1, 0.3, 1)` → `var(--ease-out)`
- `cubic-bezier(0.76, 0, 0.24, 1)` → `var(--ease-veil)`
- `cubic-bezier(0.34, 1.56, 0.64, 1)` → `var(--ease-spring)`

A safe sweep, run from the repo root:

```bash
grep -rl 'cubic-bezier' src/ | while read -r f; do
  perl -pi -e 's/cubic-bezier\(0\.16, 1, 0\.3, 1\)/var(--ease-out)/g;
               s/cubic-bezier\(0\.76, 0, 0\.24, 1\)/var(--ease-veil)/g;
               s/cubic-bezier\(0\.34, 1\.56, 0\.64, 1\)/var(--ease-spring)/g' "$f"
done
```

### Step 3 — check for stragglers

```bash
grep -rn 'cubic-bezier' src/ | grep -v -- '--ease-'
```

Expect **only** the three token definitions in `global.css`. Any other hit is a
curve this plan did not account for — report it rather than converting it
blindly.

## Scope boundaries

- **Do not change any duration, delay, or curve value.** This refactor must be
  visually identical. If a curve looks wrong, that is a separate finding.
- Do **not** tokenise durations. They are deliberately per-component; CLAUDE.md
  documents the budget and the reasoning.
- Do **not** touch the `@keyframes` definitions (`mq`, `blink`, `reveal-in`).
- Do **not** add tokens for curves that do not currently exist.

## Verification

1. `npm run build` — 0 errors, 0 warnings, 0 hints.
2. **Prove nothing changed.** Before the refactor, capture the built CSS with
   curves normalised; after, capture again and diff:
   ```bash
   # run BEFORE the edit
   npm run build >/dev/null 2>&1
   cat dist/_astro/*.css > /tmp/before.css
   python3 -c "
   import re,glob
   h=open('dist/index.html').read()
   open('/tmp/before.css','a').write(''.join(re.findall(r'<style>(.*?)</style>',h,re.S)))"

   # run AFTER the edit, then:
   npm run build >/dev/null 2>&1
   cat dist/_astro/*.css > /tmp/after.css
   python3 -c "
   import re,glob
   h=open('dist/index.html').read()
   open('/tmp/after.css','a').write(''.join(re.findall(r'<style>(.*?)</style>',h,re.S)))"

   # normalise var() back to literals and compare
   python3 - <<'EOF'
   import re
   sub = {'var(--ease-out)':'cubic-bezier(.16,1,.3,1)',
          'var(--ease-veil)':'cubic-bezier(.76,0,.24,1)',
          'var(--ease-spring)':'cubic-bezier(.34,1.56,.64,1)'}
   def norm(p):
       s=open(p).read()
       for k,v in sub.items(): s=s.replace(k,v)
       return re.sub(r'\s+','',s)
   a,b=norm('/tmp/before.css'),norm('/tmp/after.css')
   print('IDENTICAL' if a==b else f'DIFFERS by {abs(len(a)-len(b))} chars')
   EOF
   ```
   Note the minifier writes curves without leading zeros (`.16` not `0.16`), so
   compare against that form.
3. Spot-check one hover in a real browser (a Work row) — it must feel exactly as
   before. If anything changed, the refactor was not mechanical.
