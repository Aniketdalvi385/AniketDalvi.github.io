import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
// Import zod directly: the `z` re-export from astro:content is deprecated.
import { z } from "zod";

/**
 * Long-form writing. Replaces the hand-maintained POSTS array that used to live
 * in `site.ts` — the homepage teaser and the /writing index both derive from
 * this collection now, so adding an .mdx file is the only step to publish.
 *
 * `kind` drives presentation, not routing: a "paper" gets the numbered-section
 * apparatus (abstract, tables, figure captions), a "post" gets the narrower
 * measure and looser rhythm of a blog read.
 */
const writing = defineCollection({
	loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		/** Shown under the title on the article, and as the list excerpt. */
		subtitle: z.string(),
		/** Display form, e.g. "2026 · 03". Sorting uses `published`. */
		date: z.string(),
		/** ISO date — the actual sort key, so display strings stay free-form. */
		published: z.coerce.date(),
		read: z.string(),
		tag: z.string(),
		kind: z.enum(["paper", "post"]).default("post"),
		/** Lead entry on /writing. Exactly one entry should set this. */
		featured: z.boolean().default(false),
		/**
		 * Explicit position in listings, ascending. These pieces form an argument
		 * — the narrative, then the pattern it produced, then the full research —
		 * which is not the order they were published in. Entries without it fall
		 * back to `published` descending.
		 */
		order: z.number().optional(),
		/** Optional eyebrow above the title; falls back to a kind-derived label. */
		eyebrow: z.string().optional(),
		/** Extra byline chips, e.g. a repo link. */
		links: z
			.array(z.object({ label: z.string(), href: z.string() }))
			.default([]),
		/** Italic standfirst under the byline. */
		standfirst: z.string().optional(),
	}),
});

export const collections = { writing };
