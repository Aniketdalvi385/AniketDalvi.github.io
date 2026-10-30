// Single source of truth for page content. Mirrors renderVals() from the
// Design Compiler source so copy edits happen in one place.

export interface Stat {
	v: string;
	k: string;
}

export interface Project {
	idx: string;
	name: string;
	kind: string;
	stack: string;
	desc: string;
	/** Omitted for client/internal work that has no public URL — the row then
		renders as a static block rather than a dead link. */
	href?: string | null;
}

export interface Experience {
	dates: string;
	company: string;
	meta: string;
	role: string;
	points: string[];
}

export interface Post {
	date: string;
	/** The article's own headline — short, as it renders on the piece itself. */
	title: string;
	/**
	 * Headline for listings. A short title that reads fine above its own body
	 * ("Deterministic-First") can be too thin in a list beside longer ones, so
	 * listings show "title: subtitle" while the article page keeps them split.
	 * Falls back to `title` when the two are the same.
	 */
	listTitle: string;
	tag: string;
	href: string;
	excerpt?: string;
	read?: string;
}

export const SITE = {
	name: "Aniket Dalvi",
	initials: "AD",
	role: "Applied AI Engineer",
	title: "Aniket Dalvi — Applied AI Engineer",
	description:
		"Applied AI engineer shipping production LLM systems, RAG pipelines, and full-stack platforms. I measure what I build and publish the results.",
	year: 2026,
} as const;

// WRITING sits second by design, not in document order: it is the only entry
// that leaves the page for its own route, and it is the work most worth
// surfacing early. The anchors below it still resolve to on-page sections, so
// the scroll-spy in Nav.astro is unaffected by the ordering.
export const NAV = [
	{ label: "WORK", id: "work" },
	{ label: "WRITING", id: "writing" },
	{ label: "ABOUT", id: "about" },
	{ label: "EXPERIENCE", id: "experience" },
	{ label: "CONTACT", id: "contact" },
] as const;

export const STATS: Stat[] = [
	{ v: "96%", k: "setup time removed per publication" },
	{ v: "58", k: "newsletters running in production" },
	{ v: "~90%", k: "daily publishing effort removed" },
	{ v: "5,000+", k: "daily subscribers served" },
];

export const SKILL_WORDS = [
	"Python",
	"FastAPI",
	"React · Next.js",
	"TypeScript",
	"LangChain · RAG",
	"MCP",
	"Ollama · Local LLMs",
	"Azure AI Search",
	"Vector DBs",
	"Azure",
	"AWS",
	"Docker · CI/CD",
	"Rust",
	"MongoDB · Postgres",
];

export const METRIC_WORDS = [
	"1 month → 1 day",
	"~90% analyst effort removed",
	"58 newsletters",
	"zero-downtime releases",
	"5,000+ daily subscribers",
	"12 sector verticals",
	"100+ sources monitored",
	"2 hrs → 15 min",
];

export const PROJECTS: Project[] = [
	{
		idx: "01",
		name: "GiTrust - Agentic Git CLI",
		kind: "OPEN SOURCE",
		stack: "Rust · Kev-0.8B (fine-tuned) · git2",
		desc: "Natural-language Git CLI running a local 0.8B decision model on 8GB consumer hardware. Measured both candidate classifiers on a 44-case set and found each one misrouting destructive requests: the LLM sending \"throw away my changes\" to a hard reset, the embedding router silently squashing three commits. Rebuilt so a deterministic gate owns every destructive decision and the model never reaches it. 8 failures to 0 across two releases.",
		href: "https://github.com/aniketdalvi385/gitrust",
	},
	{
		idx: "02",
		name: "Mining Intelligence Platform",
		kind: "CLIENT WORK · NOT PUBLIC",
		stack: "FastAPI · React · Azure AI Search · Azure Databricks · MongoDB",
		desc: "AI newsletter platform for an enterprise mining and metals operator. Monitors a dedicated mailbox, ingests industry publications and attachments, indexes them into Azure AI Search, and generates structured newsletters on configurable cadences through a drag-and-drop template builder. Owned end to end: architecture, frontend, backend, auth, permissions, testing.",
		href: null,
	},
	{
		idx: "03",
		name: "GlobalBiz",
		kind: "PRODUCTION",
		stack: "FastAPI · Jinja · HubSpot API · MongoDB · AWS",
		desc: "Editorial intelligence platform monitoring 100+ premium and open sources, running them through dedup, impact scoring and AI summarization into brand-styled briefings across 12 sector verticals. I built the config-driven template engine at the delivery layer: it decouples design from content so a new publication is a configuration rather than an engineering project, and renders pixel-perfect across Outlook and PDF.",
		href: "https://globalbiz.agrknowledgeai.com/",
	},
	{
		idx: "04",
		name: "HubSpot Automation Tool",
		kind: "INTERNAL · ACTIVE",
		stack: "Python · FastAPI · HubSpot API · React",
		desc: "Publishing automation for a 10-person analyst team running 58 newsletters. Upload a document, pick a pod, and it syncs email campaigns and landing pages per configuration. Cut per-pod effort from ~2 hours to 10–15 minutes. Still adding pods and features.",
		href: null,
	},
	{
		idx: "05",
		// PROTOTYPE, not PRODUCTION. The other four cards claim production; this
		// one has not shipped, and saying so is the point.
		kind: "PROTOTYPE · NOT PUBLIC",
		name: "Internal AI Analytics Platform",
		stack: "Python · FastAPI · MCP · React · MongoDB",
		desc: "Working prototype of an internal AI analytics platform. Implemented Model Context Protocol integrations across Redis and Valkey, and wrote a small MCP server for MongoDB. Built a database-integrated RAG chatbot answering natural-language queries with charts, tables, and structured insights, and an organisation-level document RAG bot with OCR across multiple document types.",
		href: null,
	},
];

export const SKILLS = [
	"Python",
	"TypeScript",
	"Node.js",
	"Rust",
	"React / Next.js",
	"FastAPI · Flask · NestJS",
	"LangChain",
	"MCP",
	"Ollama · Local LLMs",
	"Evals",
	"RAG Pipelines",
	"Azure AI Search",
	"Weaviate · Pinecone",
	"Azure",
	"AWS",
	"Docker · CI/CD",
	"MongoDB · Postgres · Redis · Valkey",
];

export const ABOUT_FACTS = [
	{ k: "BASED", v: "Mumbai, India" },
	{ k: "OPEN TO", v: "Remote · Relocation" },
	{ k: "DOMAINS", v: "Mining & Metals · Pharma · Industrial" },
	{ k: "LANGUAGES", v: "EN · HI · MR · DE" },
	{ k: "EDUCATION", v: "BSc CS · 8.14<br>ICLES Motilal Jhunjhunwala College, Vashi, Navi Mumbai" },
];

export const EXPERIENCE: Experience[] = [
	{
		dates: "APR 2024 — PRESENT",
		company: "AGR Knowledge Services",
		meta: "AI products & internal platforms · team of 3–4 · Mumbai",
		role: "Software Engineer",
		points: [
			"Own systems end to end across the AI product line: architecture, implementation, testing, and deployment. Work across a team of three to four, typically as the engineer accountable for a given platform.",
			"Run delivery end to end after the build: client handover, hypercare, production monitoring, and analyst onboarding. Work directly with client stakeholders to diagnose issues in live systems, and with their security and infrastructure teams on configuration and hardening.",
			"Built the config-driven template engine behind the editorial intelligence product line, decoupling design from content so a new publication is a configuration change rather than an engineering project. Cut setup from roughly a month to a day.",
			"Designed and delivered an end-to-end AI newsletter system for an enterprise mining and metals operator: ingestion pipeline, Azure AI Search indexing, template builder, auth, permissions, and the testing framework. Live in production, Phase 2 in planning.",
			"Built the working prototype of an internal AI analytics platform: MCP integrations across Redis and Valkey, a small MCP server for MongoDB, and RAG interfaces over both databases and documents.",
			"Automated the daily publishing workflow for a 10-person analyst team running 58 newsletters, cutting per-pod effort from about two hours to fifteen minutes.",
		],
	},
	{
		dates: "SEP 2023 — FEB 2024",
		company: "Code-B",
		meta: "Product studio · AI prototypes for enterprise clients · Mumbai",
		role: "Software Engineer",
		points: [
			"First AI work, in a studio shipping fast prototypes: LLM applications taken from brief to working demo in weeks, across healthcare, document search, and industrial analytics.",
			"Built PharmaChat, an OpenAI-powered chatbot for context-aware doctor and patient interaction, behind a secure FastAPI service layer.",
			"Built a document Q&A application in Streamlit using vector embeddings for semantic search over uploaded files.",
			"Designed FastAPI endpoints for multi-model orchestration and real-time inference, and analytics APIs for an industrial equipment dashboard.",
		],
	},
];

// FEATURED/POSTS now live in the `writing` content collection — see
// src/data/writing.ts for the accessors. The Post type stays here because the
// listing components type against it.

/** Ticker words on /writing. */
export const WRITING_TICKER = [
	"Systems",
	"RAG",
	"LLM tooling",
	"Automation",
	"Rust",
	"FastAPI",
	"Production notes",
	"Trade-offs",
];

export const CONTACT = {
	email: "aniketdalvi385@gmail.com",
	phone: "+91 94041 93260",
	phoneHref: "tel:+919404193260",
	linkedin: "https://linkedin.com/in/aniket-dalvi385",
	github: "https://github.com/aniketdalvi385",
	resume: "https://drive.google.com/file/d/1kFnIwQ66xeQLsSSeer9UQ28Xq-GpjMoG/view",
} as const;

/**
 * Tickers scroll a doubled list so the `mq` keyframe's -50% translate lands
 * exactly one copy over, making the loop seamless.
 */
export function buildLoop(words: string[], separator: string) {
	const one = words.flatMap((w) => [
		{ w, muted: false },
		{ w: separator, muted: true },
	]);
	return [...one, ...one];
}
