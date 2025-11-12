import React from "react";
import SectionWrapper from "./ui/SectionWrapper";
import { cn } from "../lib/utils";
import { InfiniteScroll } from "./ui/InfiniteScroll";
import { useMood } from "../contexts/MoodContext";

import javascript from "../assets/javascript.png";
import typescript from "../assets/typescript.png";
import python from "../assets/python.png";
import reactImage from "../assets/react.png";
import nextjs from "../assets/nextjs.png";
import flask from "../assets/flask.webp";
import fastapi from "../assets/fastapi.png";
import nodejs from "../assets/nodejs.png";
import postgres from "../assets/postgres.png";
import mongoDB from "../assets/mongoDB.png";
import redis from "../assets/redis.png";
import aws from "../assets/aws.png";
import azure from "../assets/azure.png";
import docker from "../assets/docker.png";
import openai from "../assets/openai.png";
import langchain from "../assets/langchain.png";
import github from "../assets/github.png";
import tailwind from "../assets/tailwind.png";
import bootstrap from "../assets/bootstrap.png";

const TechCard = ({ src, title, link, isCasual }) => {
	return (
		<a
			href={link || "#"}
			target={link ? "_blank" : undefined}
			rel={link ? "noreferrer" : undefined}
			className={cn(
				"group relative min-w-[120px] w-[120px] sm:min-w-[140px] sm:w-[140px] md:min-w-[160px] md:w-[160px] h-20 sm:h-24 md:h-28 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border p-2 transition-all duration-300",
				// Business mode colors
				!isCasual &&
					"border-gray-950/[.08] bg-gray-950/[.02] hover:bg-gray-950/[.05]",
				!isCasual &&
					"dark:border-gray-50/[.08] dark:bg-gray-50/[.04] dark:hover:bg-gray-50/[.08]",
				// Casual mode colors (red/orange)
				isCasual &&
					"border-red-500/20 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-100/70 dark:hover:bg-red-950/40",
				isCasual && "dark:border-red-500/30"
			)}
			onMouseEnter={(e) => {
				const isDark =
					document.documentElement.classList.contains("dark");
				let shadowColor;
				if (isCasual) {
					shadowColor = isDark
						? "rgba(139, 69, 19, 0.25)"
						: "rgba(255, 182, 193, 0.35)";
				} else {
					shadowColor = isDark
						? "rgba(129, 140, 248, 0.4)"
						: "rgba(100, 108, 255, 0.3)";
				}
				e.currentTarget.style.boxShadow = `0 0 2rem -0.5rem ${shadowColor}`;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.boxShadow = "";
			}}
			aria-label={title}
			title={title}
		>
			<div className="flex flex-col items-center justify-center gap-1 h-full">
				<img
					src={src}
					alt={title}
					className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:scale-110"
					loading="lazy"
				/>
				<p
					className={cn(
						"text-[10px] sm:text-xs md:text-sm font-medium text-center",
						isCasual
							? "text-red-900 dark:text-red-200"
							: "text-gray-900 dark:text-white"
					)}
				>
					{title}
				</p>
			</div>
		</a>
	);
};

const TechStack = () => {
	const { mood } = useMood();
	const isBusiness = mood === "business";
	const isCasual = mood === "casual";

	const primary = [
		{
			id: "fastapi",
			src: fastapi,
			title: "FastAPI",
			link: "https://fastapi.tiangolo.com",
		},
		{
			id: "python",
			src: python,
			title: "Python",
			link: "https://python.org",
		},
		{
			id: "flask",
			src: flask,
			title: "Flask",
			link: "https://flask.palletsprojects.com",
		},
		{
			id: "openai",
			src: openai,
			title: "OpenAI",
			link: "https://openai.com",
		},
		{
			id: "langchain",
			src: langchain,
			title: "LangChain",
			link: "https://langchain.com",
		},
		{
			id: "postgres",
			src: postgres,
			title: "PostgreSQL",
			link: "https://postgresql.org",
		},
		{
			id: "mongodb",
			src: mongoDB,
			title: "MongoDB",
			link: "https://mongodb.com",
		},
		{ id: "redis", src: redis, title: "Redis", link: "https://redis.io" },
		{ id: "aws", src: aws, title: "AWS", link: "https://aws.amazon.com" },
		{
			id: "azure",
			src: azure,
			title: "Azure AI",
			link: "https://azure.microsoft.com",
		},
		{
			id: "docker",
			src: docker,
			title: "Docker",
			link: "https://docker.com",
		},
	];

	const secondary = [
		{
			id: "javascript",
			src: javascript,
			title: "JavaScript",
			link: "https://javascript.com",
		},
		{
			id: "typescript",
			src: typescript,
			title: "TypeScript",
			link: "https://www.typescriptlang.org",
		},
		{
			id: "react",
			src: reactImage,
			title: "React",
			link: "https://react.dev",
		},
		{
			id: "nextjs",
			src: nextjs,
			title: "Next.js",
			link: "https://nextjs.org",
		},
		{
			id: "nodejs",
			src: nodejs,
			title: "Node.js",
			link: "https://nodejs.org",
		},
		{
			id: "tailwind",
			src: tailwind,
			title: "Tailwind",
			link: "https://tailwindcss.com",
		},
		{
			id: "bootstrap",
			src: bootstrap,
			title: "Bootstrap",
			link: "https://getbootstrap.com",
		},
		{
			id: "github",
			src: github,
			title: "GitHub",
			link: "https://github.com",
		},
	];

	const splitBalanced = (arr) => {
		const half = Math.ceil(arr.length / 2);
		return [arr.slice(0, half), arr.slice(half)];
	};

	const [pFirst, pSecond] = splitBalanced(primary);
	const [sFirst, sSecond] = splitBalanced(secondary);

	const heading = isBusiness ? "Technical Expertise" : "Tech I Break & Fix";
	const subtitle = isBusiness
		? "Core skills for backend & AI-first systems are prioritised here. Frontend and tooling experience are listed below."
		: "I favour FastAPI, Python, and AI stacks — but I’ll also lovingly abuse React and CSS when needed.";

	return (
		<SectionWrapper
			name="Tech-Stack"
			className="bg-white dark:bg-black transition-colors duration-300"
		>
			<div className="w-full max-w-screen-lg mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
				<div className="pb-4 sm:pb-6 md:pb-8">
					<p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold inline border-b-4 border-gray-500">
						{heading}
					</p>
					<p className="py-3 sm:py-4 md:py-6 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">
						{subtitle}
					</p>
				</div>

				<div className="relative space-y-6 sm:space-y-8 md:space-y-10">
					<div className="-mx-2 sm:-mx-4">
						<div className="relative">
							<div
								className={cn(
									"pointer-events-none absolute inset-y-0 left-0 w-[10%] sm:w-[12%] md:w-1/4 bg-gradient-to-r z-10",
									isCasual
										? "from-[#fafafa] dark:from-[#141414]"
										: "from-white dark:from-black"
								)}
							/>
							<div
								className={cn(
									"pointer-events-none absolute inset-y-0 right-0 w-[10%] sm:w-[12%] md:w-1/4 bg-gradient-to-l z-10",
									isCasual
										? "from-[#fafafa] dark:from-[#141414]"
										: "from-white dark:from-black"
								)}
							/>

							<InfiniteScroll
								direction="left"
								speed="slow"
								className="py-3 sm:py-4 md:py-5 lg:py-6"
							>
								{pFirst.map((t) => (
									<TechCard
										key={t.id}
										{...t}
										isCasual={isCasual}
									/>
								))}
							</InfiniteScroll>

							<InfiniteScroll
								direction="right"
								speed="slow"
								className="py-3 sm:py-4 md:py-5 lg:py-6"
							>
								{pSecond.map((t) => (
									<TechCard
										key={t.id}
										{...t}
										isCasual={isCasual}
									/>
								))}
							</InfiniteScroll>

							<InfiniteScroll
								direction="left"
								speed="normal"
								className="py-2 sm:py-3 md:py-4 lg:py-5"
							>
								{sFirst.map((t) => (
									<TechCard
										key={t.id}
										{...t}
										isCasual={isCasual}
									/>
								))}
							</InfiniteScroll>

							<InfiniteScroll
								direction="right"
								speed="normal"
								className="py-2 sm:py-3 md:py-4 lg:py-5"
							>
								{sSecond.map((t) => (
									<TechCard
										key={t.id}
										{...t}
										isCasual={isCasual}
									/>
								))}
							</InfiniteScroll>
						</div>
					</div>

					<div className="py-4 sm:py-6 md:py-8 text-center">
						<div className="max-w-3xl mx-auto space-y-4">
							<h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
								Full-Stack Development Expertise
							</h3>
							<div className="space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
								<p>
									<span className="font-medium text-gray-900 dark:text-white">
										Backend & AI:
									</span>{" "}
									FastAPI-first APIs, Python, LangChain/OpenAI
									stacks, embeddings, RAG, and DB design.
								</p>
								<p>
									<span className="font-medium text-gray-900 dark:text-white">
										Cloud & Infra:
									</span>{" "}
									AWS/Azure, Docker, CI/CD and
									observability/monitoring.
								</p>
								<p>
									<span className="font-medium text-gray-900 dark:text-white">
										Frontend:
									</span>{" "}
									React + Next.js, TypeScript and Tailwind for
									production UIs.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SectionWrapper>
	);
};

export default TechStack;
