import { getCollection } from "astro:content";
import type { Post } from "./site";

/**
 * Bridges the `writing` content collection to the shape the listing components
 * already consume, so Writing.astro and /writing render real entries without
 * knowing about collections. Replaces the hand-written POSTS array.
 */
function toPost(entry: Awaited<ReturnType<typeof getCollection>>[number]): Post {
	const d = entry.data as {
		date: string;
		title: string;
		tag: string;
		read: string;
		subtitle: string;
		excerpt?: string;
	};
	// Listings show "title: subtitle" only for titles short enough to need the
	// help. Concatenating unconditionally would push the two already-long
	// headlines past any sensible measure, so the threshold does the choosing —
	// the article page always renders the two split, as the source intends.
	const LIST_TITLE_MIN = 28;
	const listTitle =
		d.title.length < LIST_TITLE_MIN && d.subtitle
			? `${d.title}: ${d.subtitle}`
			: d.title;

	return {
		date: d.date,
		title: d.title,
		listTitle,
		tag: d.tag,
		read: d.read,
		href: `/writing/${entry.id}`,
		// `excerpt` when the entry defines one, else the subtitle. Needed because
		// `listTitle` above already appends the subtitle for short titles, so
		// defaulting the description to the subtitle printed the same sentence
		// twice in the card — headline and description, verbatim.
		excerpt: d.excerpt ?? d.subtitle,
	};
}

/**
 * Listing order: an explicit `order` wins, ascending, so a sequence that makes
 * an argument can differ from the order things were written. Entries without it
 * sort newest-first behind those that have it.
 */
function byOrderThenDate(
	a: Awaited<ReturnType<typeof getCollection>>[number],
	b: Awaited<ReturnType<typeof getCollection>>[number]
) {
	const ao = (a.data as { order?: number }).order;
	const bo = (b.data as { order?: number }).order;
	if (ao !== undefined && bo !== undefined) return ao - bo;
	if (ao !== undefined) return -1;
	if (bo !== undefined) return 1;
	return (
		(b.data as { published: Date }).published.getTime() -
		(a.data as { published: Date }).published.getTime()
	);
}

/** Every entry in listing order. */
export async function getPosts(): Promise<Post[]> {
	const entries = await getCollection("writing");
	return entries.sort(byOrderThenDate).map(toPost);
}

/**
 * The lead entry on /writing and its remainder. Falls back to the newest post
 * when nothing is flagged `featured`, so the page never renders an empty hero.
 */
export async function getFeatured(): Promise<{
	featured: Post | null;
	rest: Post[];
}> {
	const entries = await getCollection("writing");
	const sorted = entries.sort(byOrderThenDate);
	const idx = sorted.findIndex(
		(e) => (e.data as { featured: boolean }).featured
	);
	const pick = idx >= 0 ? idx : 0;
	if (!sorted.length) return { featured: null, rest: [] };
	return {
		featured: toPost(sorted[pick]),
		rest: sorted.filter((_, i) => i !== pick).map(toPost),
	};
}
