import React from "react";
import SectionWrapper from "./ui/SectionWrapper";
import { cn } from "../lib/utils";
import { InfiniteScroll } from "./ui/InfiniteScroll";
import java from "../assets/java.png";
import javascript from "../assets/javascript.png";
import python from "../assets/python.png";
import typescript from "../assets/typescript.png";
import reactImage from "../assets/react.png";
import nextjs from "../assets/nextjs.png";
import nestjs from "../assets/nestjs.png";
import html from "../assets/html.png";
import css from "../assets/css.png";
import tailwind from "../assets/tailwind.png";
import bootstrap from "../assets/bootstrap.png";
import github from "../assets/github.png";
import docker from "../assets/docker.png";
import mongoDB from "../assets/mongoDB.png";
import flask from "../assets/flask.webp";
import fastapi from "../assets/fastapi.png";
import aws from "../assets/aws.png";

const TechCard = ({ src, title, style }) => {
	return (
		<div
			className={cn(
				"group relative h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border p-2 sm:p-3 md:p-4 transition-all duration-300",
				"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
				"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
				"hover:shadow-[0_0_1rem_-0.25rem_#646cff] dark:hover:shadow-[0_0_1rem_-0.25rem_#818cf8]"
			)}
		>
			<div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 h-full">
				<img
					src={src}
					alt={title}
					className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain transition-transform duration-300 group-hover:scale-110"
				/>
				<p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-medium dark:text-white absolute bottom-1 sm:bottom-2 md:bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					{title}
				</p>
			</div>
		</div>
	);
};

const TechStack = () => {
	const tech = [
		{
			id: 1,
			src: javascript,
			title: "JavaScript",
			style: "shadow-yellow-500",
			link: "https://www.javascript.com/",
		},
		{
			id: 2,
			src: typescript,
			title: "TypeScript",
			style: "shadow-blue-500",
			link: "https://www.typescriptlang.org/",
		},
		{
			id: 3,
			src: python,
			title: "Python",
			style: "shadow-blue-400",
			link: "https://www.python.org/",
		},
		{
			id: 4,
			src: java,
			title: "Java",
			style: "shadow-orange-400",
			link: "https://www.java.com/en/",
		},
		{
			id: 5,
			src: reactImage,
			title: "React",
			style: "shadow-sky-500",
			link: "https://react.dev/",
		},
		{
			id: 6,
			src: nextjs,
			title: "Next.js",
			style: "shadow-white",
			link: "https://nextjs.org/",
		},
		{
			id: 7,
			src: flask,
			title: "Flask",
			style: "shadow-gray-400",
			link: "https://flask.palletsprojects.com/",
		},
		{
			id: 8,
			src: fastapi,
			title: "FastAPI",
			style: "shadow-teal-500",
			link: "https://fastapi.tiangolo.com/",
		},
		{
			id: 9,
			src: nestjs,
			title: "NestJS",
			style: "shadow-red-400",
			link: "https://nestjs.com/",
		},
		{
			id: 10,
			src: html,
			title: "HTML",
			style: "shadow-orange-500",
			link: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics",
		},
		{
			id: 11,
			src: css,
			title: "CSS",
			style: "shadow-blue-500",
			link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
		},
		{
			id: 12,
			src: tailwind,
			title: "Tailwind",
			style: "shadow-teal-400",
			link: "https://tailwindcss.com/",
		},
		{
			id: 13,
			src: bootstrap,
			title: "Bootstrap",
			style: "shadow-fuchsia-700",
			link: "https://getbootstrap.com/",
		},
		{
			id: 14,
			src: mongoDB,
			title: "MongoDB",
			style: "shadow-green-400",
			link: "https://www.mongodb.com/",
		},
		{
			id: 15,
			src: aws,
			title: "AWS",
			style: "shadow-orange-300",
			link: "https://aws.amazon.com/",
		},
		{
			id: 16,
			src: docker,
			title: "Docker",
			style: "shadow-sky-400",
			link: "https://www.docker.com/",
		},
		{
			id: 17,
			src: github,
			title: "GitHub",
			style: "shadow-gray-400",
			link: "https://github.com/",
		},
	];

	const firstRow = tech.slice(0, Math.ceil(tech.length / 2));
	const secondRow = tech.slice(Math.ceil(tech.length / 2));

	return (
		<SectionWrapper
			name="Tech-Stack"
			className="bg-white dark:bg-black transition-colors duration-300"
		>
			<div className="w-full max-w-screen-lg mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
				<div className="pb-4 sm:pb-6 md:pb-8">
					<p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold inline border-b-4 border-gray-500">
						Technical Expertise
					</p>
					<p className="py-3 sm:py-4 md:py-6 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">
						The technologies I've mastered throughout my
						professional journey. From frontend frameworks to
						backend development and cloud services, I bring a
						diverse and practical skill set to every project.
					</p>
				</div>

				<div className="relative space-y-6 sm:space-y-8 md:space-y-10">
					<div className="-mx-2 sm:-mx-4">
						<div className="relative">
							<div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] sm:w-[15%] md:w-1/4 bg-gradient-to-r from-white dark:from-black z-10" />
							<div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] sm:w-[15%] md:w-1/4 bg-gradient-to-l from-white dark:from-black z-10" />

							<InfiniteScroll
								direction="left"
								speed="slow"
								className="py-3 sm:py-4 md:py-5 lg:py-6"
							>
								{firstRow.map((item) => (
									<TechCard key={item.id} {...item} />
								))}
							</InfiniteScroll>

							<InfiniteScroll
								direction="right"
								speed="slow"
								className="py-3 sm:py-4 md:py-5 lg:py-6"
							>
								{secondRow.map((item) => (
									<TechCard key={item.id} {...item} />
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
										Frontend Development:
									</span>{" "}
									Expert in React and Next.js with strong
									TypeScript integration. Skilled in creating
									responsive interfaces using Tailwind CSS and
									implementing complex UI components with
									modern animation libraries.
								</p>
								<p>
									<span className="font-medium text-gray-900 dark:text-white">
										Backend Development:
									</span>{" "}
									Proficient in Python-based frameworks
									(Flask, FastAPI) and Node.js ecosystems
									(NestJS). Experienced in building RESTful
									APIs, implementing authentication systems,
									and integrating with third-party services.
								</p>
								<p>
									<span className="font-medium text-gray-900 dark:text-white">
										Database & Cloud:
									</span>{" "}
									Skilled in MongoDB database design, cluster
									setup, and optimization. Familiar with AWS
									services for deployment, storage, and AI
									integration. Experienced with Docker
									containerization for consistent development
									and deployment environments.
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
