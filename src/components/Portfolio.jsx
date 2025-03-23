import React from "react";
import pdfMagic from "../assets/portfolio/pdfMagic.png";
import taskUp from "../assets/portfolio/taskUp.png";
import textEditor from "../assets/portfolio/textEditor.png";
import webMagic from "../assets/portfolio/webMagic.png";
import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import { MagicCard } from "./ui/MagicCard";
import { useTheme } from "next-themes";

const animationVariant = {
	initial: {
		opacity: 0,
		y: 100,
	},
	final: (index) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.3 * (index / 3),
		},
	}),
};

const Portfolio = () => {
	const { theme } = useTheme();
	const portfolios = [
		{
			id: 1,
			src: taskUp,
			name: "TaskUp",
			description:
				"A modern task management application built with React and Node.js",
			codeLink: "https://github.com/Aniketdalvi385/TaskUp",
			technologies: ["React", "Node.js", "MongoDB"],
		},
		{
			id: 2,
			src: textEditor,
			name: "Retro Text Editor",
			description:
				"A Java-based text editor with retro styling and modern features",
			codeLink:
				"https://github.com/Aniketdalvi385/Java-Projects/tree/main/TextEditorProject1",
			technologies: ["Java", "Swing"],
		},
		{
			id: 3,
			src: webMagic,
			name: "WebMagic",
			description: "A web development toolkit for modern applications",
			codeLink: "https://github.com/Aniketdalvi385/WebMagic",
			technologies: ["HTML", "CSS", "JavaScript"],
		},
		{
			id: 4,
			src: pdfMagic,
			name: "PDF Magic",
			description: "PDF and text file manipulation utility",
			codeLink: "https://github.com/Aniketdalvi385/PDF-and-.TXT-Magic",
			technologies: ["Python", "PyPDF2"],
		},
	];

	return (
		<SectionWrapper
			name="Portfolio"
			className="bg-white dark:bg-black transition-colors duration-300"
		>
			<div className="pb-8">
				<p className="text-4xl font-bold inline border-b-4 border-gray-500">
					Portfolio
				</p>
				<p className="py-6 text-gray-700 dark:text-gray-300">
					Explore my collection of projects that showcase my passion
					for innovation and problem-solving. Each project represents
					a unique challenge tackled with creativity and technical
					expertise.
				</p>
			</div>

			<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
				{portfolios.map(
					({
						id,
						src,
						name,
						description,
						codeLink,
						visitLink,
						technologies = [],
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
								<div className="space-y-4">
									<div className="relative aspect-video overflow-hidden rounded-lg">
										<img
											src={src}
											alt={name}
											className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
										/>
									</div>

									<div className="space-y-2">
										<h3 className="text-xl font-bold text-gray-900 dark:text-white">
											{name}
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-300">
											{description}
										</p>
										<div className="flex flex-wrap gap-2">
											{technologies.map((tech) => (
												<span
													key={tech}
													className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
												>
													{tech}
												</span>
											))}
										</div>
									</div>

									<div className="flex gap-4 pt-4">
										<a
											href={codeLink}
											target="_blank"
											rel="noreferrer"
											className="flex-1 px-4 py-2 text-sm text-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
										>
											View Code
										</a>
										{visitLink && (
											<a
												href={visitLink}
												target="_blank"
												rel="noreferrer"
												className="flex-1 px-4 py-2 text-sm text-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
											>
												Visit Site
											</a>
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
