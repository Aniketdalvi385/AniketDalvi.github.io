import React from "react";
import pdfMagic from "../assets/portfolio/pdfMagic.png";
import taskUp from "../assets/portfolio/taskUp.png";
import webMagic from "../assets/portfolio/webMagic.png";
import cortex from "../assets/portfolio/cortex.png";
import globalbiz from "../assets/portfolio/globalbiz.png";
import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import { MagicCard } from "./ui/MagicCard";
import { useTheme } from "next-themes";
import { useMood } from "../contexts/MoodContext";

const animationVariant = {
	initial: { opacity: 0, y: 100 },
	final: (index) => ({
		opacity: 1,
		y: 0,
		transition: { delay: 0.15 * index },
	}),
};

const Portfolio = () => {
	const { theme } = useTheme();
	const { mood } = useMood();
	const isBusiness = mood === "business";

	const portfolios = [
		{
			id: 1,
			src: taskUp,
			name: "TaskUp",
			proDesc:
				"A production-ready task management SPA with authentication, smart filters, and REST APIs — focused on performance and UX.",
			unproDesc:
				"A task app I built because the internet needed another to-do list (this one actually sorts your procrastination).",
			codeLink: "https://github.com/Aniketdalvi385/TaskUp",
			visitLink: null,
			technologies: ["React", "Tailwind", "Flask", "MongoDB"],
			tags: ["Frontend", "Backend"],
		},
		{
			id: 2,
			src: webMagic,
			name: "WebMagic",
			proDesc:
				"AI-assisted toolkit that indexes and analyzes websites using OpenAI to extract summaries and structured insights.",
			unproDesc:
				"A little wizard that pokes websites and asks the internet what it thinks — uses OpenAI to gossip about pages.",
			codeLink: "https://github.com/Aniketdalvi385/WebMagic",
			visitLink: null,
			technologies: ["Python", "Flask", "OpenAI"],
			tags: ["AI", "Backend"],
		},
		{
			id: 3,
			src: pdfMagic,
			name: "PDF Magic",
			proDesc:
				"Streamlit app that parses PDFs and plain text, builds embeddings and enables interactive Q&A over documents using LLMs.",
			unproDesc:
				"Made PDFs slightly less evil: embed, index, and ask them questions until they behave.",
			codeLink: "https://github.com/Aniketdalvi385/PDF-and-.TXT-Magic",
			visitLink: null,
			technologies: ["Python", "Streamlit", "LangChain", "Embeddings"],
			tags: ["AI", "Data"],
		},
		{
			id: 4,
			src: globalbiz,
			name: "GlobalBiz",
			proDesc:
				"Enterprise market-intelligence platform — I contributed to backend architecture, RBAC, API design and templating systems.",
			unproDesc:
				"Enterprise-grade market intel — I helped build the backend plumbing, RBAC, and the templates that keep execs calm.",
			codeLink: null,
			visitLink: "https://globalbiz.agrknowledgeai.com/",
			technologies: ["Flask", "FastAPI", "MongoDB", "AWS"],
			tags: ["Backend", "Enterprise"],
		},
		{
			id: 5,
			src: cortex,
			name: "Cortex360",
			proDesc:
				"AI automation platform with a no-code workflow builder, MCP-driven dashboards and an enterprise RAG chatbot for document intelligence.",
			unproDesc:
				"Cortex360 — the AI platform where no-code meets actual results: workflows, dashboards, and chatbots that read your docs.",
			codeLink: null,
			visitLink: "https://www.agrknowledgeai.com/",
			technologies: ["React", "FastAPI", "LangChain", "Pinecone"],
			tags: ["AI", "Full Stack"],
		},
	];

	const codeLabel = isBusiness ? "View Code" : "Peek Code";
	const privateLabel = isBusiness
		? "Code (private)"
		: "Code (private — sorry!)";
	const visitLabel = isBusiness ? "Visit Site" : "Open Playground";

	return (
		<SectionWrapper
			name="Portfolio"
			className="bg-white dark:bg-black transition-colors duration-300"
		>
			<div className="pb-8">
				<p className="text-4xl font-bold inline border-b-4 border-gray-500">
					Portfolio
				</p>
				<p className="py-6 text-gray-700 dark:text-gray-300 max-w-3xl">
					{isBusiness
						? "A selection of projects spanning frontend, backend and AI integrations — including enterprise platforms (GlobalBiz, Cortex360) and open-source work. Click a card for code or the live product where available."
						: "Projects, experiments, and the things I broke and then patched. Hover a card, click a button, judge my decisions — your call."}
				</p>
			</div>

			<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-8 sm:px-0">
				{portfolios.map(
					({
						id,
						src,
						name,
						proDesc,
						unproDesc,
						codeLink,
						visitLink,
						technologies = [],
						tags = [],
					}) => (
						<motion.div
							key={id}
							variants={animationVariant}
							initial="initial"
							whileInView="final"
							viewport={{ once: true }}
							custom={id}
						>
							<MagicCard
								gradientColor={
									theme === "dark" ? "#262626" : "#D9D9D955"
								}
								className="h-full"
							>
								<div className="space-y-4 h-full flex flex-col">
									<div className="relative aspect-video overflow-hidden rounded-lg">
										<img
											src={src}
											alt={`${name} screenshot`}
											className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
											loading="lazy"
										/>
									</div>

									<div className="space-y-2">
										<h3 className="text-xl font-bold text-gray-900 dark:text-white">
											{name}
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-300">
											{isBusiness ? proDesc : unproDesc}
										</p>

										<div className="flex flex-wrap gap-2 items-center mt-2">
											{technologies.map((tech) => (
												<span
													key={tech}
													className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
													aria-hidden
												>
													{tech}
												</span>
											))}

											{tags.length > 0 && (
												<div className="flex gap-2 ml-1">
													{tags.map((tag) => (
														<span
															key={tag}
															className="px-2 py-1 text-xs rounded-full bg-cyan-50 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200"
														>
															{tag}
														</span>
													))}
												</div>
											)}
										</div>
									</div>

									<div className="flex gap-4 pt-4 mt-auto">
										{codeLink ? (
											<a
												href={codeLink}
												target="_blank"
												rel="noreferrer"
												className="flex-1 px-4 py-2 text-sm text-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
												aria-label={`${codeLabel} for ${name}`}
											>
												{codeLabel}
											</a>
										) : (
											<button
												className="flex-1 px-4 py-2 text-sm text-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
												disabled
												title={
													isBusiness
														? "Code not public"
														: "Code not public — corporate secret"
												}
												aria-hidden
											>
												{privateLabel}
											</button>
										)}

										{visitLink ? (
											<a
												href={visitLink}
												target="_blank"
												rel="noreferrer"
												className="flex-1 px-4 py-2 text-sm text-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-95 transition duration-200"
												aria-label={`${visitLabel} for ${name}`}
											>
												{visitLabel}
											</a>
										) : (
											<span className="flex-1" />
										)}
									</div>
								</div>
							</MagicCard>
						</motion.div>
					)
				)}
			</div>
		</SectionWrapper>
	);
};

export default Portfolio;
