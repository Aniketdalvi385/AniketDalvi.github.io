import React from "react";
import SectionWrapper from "./ui/SectionWrapper";
import { MagicCard } from "./ui/MagicCard";
import { useMood } from "../contexts/MoodContext";

const About = () => {
	const { mood } = useMood();
	const isBusiness = mood === "business";

	const heading = isBusiness ? "About Me" : "About Me (aka The Lore)";
	const sub = isBusiness
		? "A look at my journey, the problems I love solving, and the tools I use to turn ideas into reliable, scalable products."
		: "How I accidentally turned engineering into a habit, what I break and fix, and the weird little tools I rely on to keep features alive.";

	const profJourney = (
		<>
			<p>
				I'm a <strong>Full Stack Developer</strong> with 2 years of
				experience building production-grade web applications and
				AI-driven platforms. I started in frontend development (React &
				Next.js) and quickly expanded into backend systems and
				automation.
			</p>
			<p>
				At <strong>AGR Knowledge</strong>, I contributed to{" "}
				<a
					href="https://www.agrknowledgeai.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-cyan-500 underline"
				>
					Cortex360
				</a>{" "}
				and{" "}
				<a
					href="https://globalbiz.agrknowledgeai.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-cyan-500 underline"
				>
					GlobalBiz
				</a>
				, designing workflow automation, AI-integrated dashboards, and
				robust data systems. I enjoy combining UI, logic, and AI to make
				complex user problems simple.
			</p>
		</>
	);

	const unproJourney = (
		<>
			<p>
				Full-stack tinkerer who started with shiny UIs and ended up
				owning the backend. I ship features, wrestle with production
				surprises, and occasionally bribe the CI server with coffee.
			</p>
			<p>
				At AGR Knowledge I worked on{" "}
				<a
					href="https://www.agrknowledgeai.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-cyan-500 underline"
				>
					Cortex360
				</a>{" "}
				and{" "}
				<a
					href="https://globalbiz.agrknowledgeai.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-cyan-500 underline"
				>
					GlobalBiz
				</a>
				— built automation, dashboards, and AI toys that sometimes
				behave like adults. My favorite bug is the one that taught me
				observability.
			</p>
		</>
	);

	const profSkills = (
		<>
			<p>
				I specialize in building scalable, AI-ready systems from the
				ground up — with a focus on clean code, modular architecture,
				and measurable performance improvements.
			</p>
			<ul className="list-disc list-inside space-y-1 pl-2">
				<li>
					<strong>Frontend:</strong> React, Next.js, TypeScript,
					Tailwind, Framer Motion, Chart.js
				</li>
				<li>
					<strong>Backend:</strong> FastAPI (primary), Flask, Node.js,
					Nest.js, REST APIs, RAG Integrations
				</li>
				<li>
					<strong>AI & Data:</strong> LangChain, OpenAI APIs, Vector
					DBs, OCR & embedding pipelines
				</li>
				<li>
					<strong>DevOps:</strong> AWS (EC2, S3, Lambda), Azure AI,
					Docker, CI/CD pipelines
				</li>
				<li>
					<strong>Architecture:</strong> RBAC, microservices, modular
					design, observability, security
				</li>
			</ul>
		</>
	);

	const unproSkills = (
		<>
			<p>
				Tech stack: whatever gets the job done quickly and reliably.
				Prefer FastAPI for fast, testable APIs and React for things that
				need to look good without collapsing.
			</p>
			<ul className="list-disc list-inside space-y-1 pl-2">
				<li>
					<strong>Frontend:</strong> React / Next.js, TypeScript,
					Tailwind — I love well-scoped components
				</li>
				<li>
					<strong>Backend:</strong> FastAPI-first, some Flask-Fu,
					Node.js when the problem screams for it
				</li>
				<li>
					<strong>AI & Data:</strong> LangChain, OpenAI, vector
					databases, document OCR pipelines
				</li>
				<li>
					<strong>Ops:</strong> AWS & Azure, Docker, CI/CD — and a few
					questionable automation scripts
				</li>
				<li>
					<strong>Other:</strong> RBAC, microservices patterns, async
					processing and monitoring (logs are life)
				</li>
			</ul>
		</>
	);

	const profCurrent = (
		<>
			<p>
				At AGR Knowledge, I’ve led backend and AI integration efforts
				for enterprise tooling. My work includes:
			</p>
			<ul className="list-disc list-inside space-y-1 pl-2">
				<li>
					Implementing <strong>RAG-based AI chatbots</strong> for
					document intelligence and dashboard Q&A.
				</li>
				<li>
					Building <strong>dynamic reporting templates</strong>{" "}
					(PDF/HTML) for automated newsletters and analytics.
				</li>
				<li>
					Designing <strong>no-code workflow builders</strong> that
					enable non-technical users to automate pipelines visually.
				</li>
			</ul>
			<p>
				These efforts improved API performance by ~30%, reduced
				dashboard load times by ~25%, and automated routine reporting —
				all while keeping codebases maintainable.
			</p>
		</>
	);

	const unproCurrent = (
		<>
			<p>
				What I actually do at work (short version): make AI and
				dashboards behave and stop paging people at 2AM.
			</p>
			<ul className="list-disc list-inside space-y-1 pl-2">
				<li>
					Hooked up RAG chatbots to company docs so people can ask the
					PDF instead of emailing you.
				</li>
				<li>
					Built templating & export pipelines (PDF / Outlook HTML) so
					automated reports don’t look like ransom notes.
				</li>
				<li>
					Built no-code flow designers so non-developers can automate
					tasks — fewer meetings, more results.
				</li>
			</ul>
			<p>
				Outcome: faster APIs, fewer angry Slack pings, and enough
				automation to justify my caffeine habit.
			</p>
		</>
	);

	return (
		<SectionWrapper
			name="About"
			className="bg-white dark:bg-black transition-colors duration-300"
		>
			<div className="w-full max-w-screen-lg mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
				<div className="pb-4 sm:pb-6 md:pb-8">
					<p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold inline border-b-4 border-gray-500">
						{heading}
					</p>
					<p className="py-3 sm:py-4 md:py-6 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">
						{sub}
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{/* Journey */}
					<MagicCard className="h-full">
						<div className="p-4 sm:p-6">
							<h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white">
								{isBusiness
									? "Professional Journey"
									: "Career Shenanigans"}
							</h3>
							<div className="space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
								{isBusiness ? profJourney : unproJourney}
							</div>
						</div>
					</MagicCard>

					{/* Skills */}
					<MagicCard className="h-full">
						<div className="p-4 sm:p-6">
							<h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white">
								{isBusiness
									? "Skills & Expertise"
									: "Skills & Superpowers"}
							</h3>
							<div className="space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
								{isBusiness ? profSkills : unproSkills}
							</div>
						</div>
					</MagicCard>

					{/* Current Work & Achievements */}
					<MagicCard className="h-full md:col-span-2">
						<div className="p-4 sm:p-6">
							<h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white">
								{isBusiness
									? "Current Work & Achievements"
									: "Current Work & Achievements (real talk)"}
							</h3>
							<div className="space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
								{isBusiness ? profCurrent : unproCurrent}
							</div>
						</div>
					</MagicCard>
				</div>
			</div>
		</SectionWrapper>
	);
};

export default About;
