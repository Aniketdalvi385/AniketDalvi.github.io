import React from "react";
import { Link } from "react-scroll";
import RotatingText from "./RotatingText";
import GradientText from "./GradientText";
import { motion } from "framer-motion";
import ShapeBlur from "./ShapeBlur";
import GradientButton from "./GradientButton";
import { useMood } from "../contexts/MoodContext";

const Home = () => {
	const { mood } = useMood();
	const isPro = mood === "business";

	const proRoles = [
		"Full-Stack Developer",
		"Frontend Engineer — React / Next.js",
		"Backend Engineer — FastAPI / Node.js",
		"AI Engineer — RAG & LLMs",
		"Dashboard & Analytics Builder",
		"API & Integrations Specialist",
		"Database & Data Pipeline Engineer",
		"UI/UX-Focused Developer",
	];

	const unproRoles = [
		"Full-Stack Problem Wrangler",
		"Frontend Magician (CSS: I bend it)",
		"Backend Wizard — FastAPI Therapy Included",
		"AI Tinkerer — I Ask LLMs for Forgiveness",
		"Dashboard Whisperer (graphs > feelings)",
		"No-code Mischief Maker",
		"API Butler (I serve requests)",
		"Data Janitor & Pipeline Mechanic",
		"Polite UI Designer (sometimes reckless)",
	];

	const roles = isPro ? proRoles : unproRoles;

	const proSubtitle =
		"Shipping production-grade web apps and AI systems — from UI to data";
	const unproSubtitle =
		"I ship features, fix regressions at 2AM, and occasionally make the console cry.";

	const proBlurb = `I build reliable, production systems that connect clean frontends with robust backends and intelligent AI. Over the last 2 years I’ve shipped features like AI-driven dashboards, RAG chatbots, a no-code flow designer, and an Outlook/PDF templating system. My stack includes React, Next.js, TypeScript, Flask, FastAPI, LangChain/OpenAI integrations, and cloud deployments on AWS & Azure. I focus on performance, maintainability, and measurable impact.`;

	const unproBlurb = `I cobble together frontends, backends, and improbable AI contraptions that actually ship. My toolkit: React, a little bit of reckless TypeScript, Flask-Fu, FastAPI duct tape, and many cups of coffee. Recent wins: dashboards that impress humans, chatbots that sometimes tell the truth, and an templating system that survived production and Outlooks hicups. I prefer measurable impact and low-level panic management.`;

	// const proImpact =
	// 	"Example impact: improved API throughput by 30% and reduced dashboard load times by ~25%.";
	// const unproImpact =
	// 	"Impact: made APIs faster (30%) and dashboards noticeably less annoying (~25%). Also fewer angry Slack messages.";

	const proCTA = "View Portfolio";
	const unproCTA = "Peek the Chaos";
	const downloadCTA = "Download Resume";

	return (
		<div
			name="Home"
			className="h-screen w-full bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden"
		>
			{/* ShapeBlur Background */}
			<div className="absolute right-0 top-0 -top-32 w-1/2 h-full opacity-10 pointer-events-none dark:opacity-70">
				<ShapeBlur
					variation={0}
					pixelRatioProp={
						typeof window !== "undefined"
							? window.devicePixelRatio || 1
							: 1
					}
					shapeSize={1.2}
					roundness={0}
					borderSize={0.05}
					circleSize={0.5}
					circleEdge={1}
				/>
			</div>

			<div className="max-w-screen-lg mx-auto flex flex-col items-start justify-center h-full px-4 relative z-10 pt-16 sm:pt-20 md:pt-24">
				<div className="flex flex-col justify-center h-full">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-4xl sm:text-7xl font-bold text-gray-800 dark:text-white">
							{isPro ? "I am a" : "Who am I? (short answer: )"}
						</h2>

						<div className="min-h-[120px] sm:min-h-[140px] flex items-center">
							<RotatingText
								texts={roles}
								mainClassName="text-4xl sm:text-7xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
								elementLevelClassName="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
								staggerFrom="last"
								initial={{ y: "100%" }}
								animate={{ y: 0 }}
								exit={{ y: "-120%" }}
								// slower rotation for readability
								staggerDuration={0.03}
								splitLevelClassName="overflow-hidden"
								transition={{
									type: "spring",
									damping: 40,
									stiffness: 250,
								}}
								rotationInterval={isPro ? 4000 : 4500} // a touch slower for unprofessional so lines read
							/>
						</div>
					</motion.div>

					<div className="relative">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="mt-4 absolute"
						>
							<GradientText
								colors={["#3b82f6", "#10b981", "#6366f1"]}
								animationSpeed={3}
								className="text-xl sm:text-2xl font-bold"
							>
								{isPro ? proSubtitle : unproSubtitle}
							</GradientText>
						</motion.div>
					</div>

					<div className="relative mt-16">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="relative z-10"
						>
							<div className="max-w-md bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200/20 dark:border-gray-700/20">
								<p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base">
									{isPro ? proBlurb : unproBlurb}
								</p>
								{/* <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
									{isPro ? proImpact : unproImpact}
								</p> */}
							</div>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="mt-8 flex gap-4"
					>
						<Link to="Portfolio" smooth duration={500}>
							<GradientButton className="text-lg">
								{isPro ? proCTA : unproCTA}
							</GradientButton>
						</Link>

						<a
							href={
								isPro
									? "https://drive.google.com/drive/folders/10AedTnYZnBg-3deR2XxeYRyGZ0gFFDMD?usp=sharing"
									: "https://drive.google.com/drive/folders/10AedTnYZnBg-3deR2XxeYRyGZ0gFFDMD?usp=sharing"
							}
							target="_blank"
							rel="noopener noreferrer"
						>
							<GradientButton className="text-lg bg-gradient-to-r from-gray-800 to-gray-600 py-[0.6rem]">
								{downloadCTA}
							</GradientButton>
						</a>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.8 }}
						className="mt-4"
					>
						<p className="text-xs text-gray-500 dark:text-gray-400">
							{isPro
								? "Available for full-time and remote roles — open to hybrid & full remote."
								: "Open to full-time, remote, and chaotic collabs. Remote or caffeinated onsite."}
						</p>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Home;
