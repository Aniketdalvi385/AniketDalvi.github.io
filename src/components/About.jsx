import React from "react";
import SectionWrapper from "./ui/SectionWrapper";
import { MagicCard } from "./ui/MagicCard";

const About = () => {
	return (
		<SectionWrapper
			name="About"
			className="bg-white dark:bg-black transition-colors duration-300"
		>
			<div className="w-full max-w-screen-lg mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
				<div className="pb-4 sm:pb-6 md:pb-8">
					<p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold inline border-b-4 border-gray-500">
						About Me
					</p>
					<p className="py-3 sm:py-4 md:py-6 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">
						My journey in software development and what drives me to
						create innovative solutions.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					<MagicCard className="h-full">
						<div className="p-4 sm:p-6">
							<h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white">
								Professional Journey
							</h3>
							<div className="space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
								<p>
									I'm a Full Stack Developer with 2 years of
									professional experience in the software
									industry. My journey began with frontend
									development, which quickly expanded to
									encompass full-stack capabilities as I took
									on more complex projects.
								</p>
								<p>
									In my previous role, I specialized in
									building responsive dashboards and web
									applications using React, Next.js, and
									NestJS. Currently, I'm working at a
									product-based company developing AI-powered
									tools for automated newsletter generation,
									competitor analysis, and industry research
									using Flask, React, and FastAPI.
								</p>
							</div>
						</div>
					</MagicCard>

					<MagicCard className="h-full">
						<div className="p-4 sm:p-6">
							<h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white">
								Skills & Expertise
							</h3>
							<div className="space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
								<p>
									While frontend development is my primary
									strength, I'm proficient across the entire
									development stack:
								</p>
								<ul className="list-disc list-inside space-y-1 pl-2">
									<li>
										Frontend: React, Next.js, HTML5, CSS3,
										Tailwind
									</li>
									<li>
										Backend: Flask, FastAPI, NestJS, Node.js
									</li>
									<li>
										Database: MongoDB, AWS database services
									</li>
									<li>
										DevOps: AWS, Docker, CI/CD pipelines
									</li>
									<li>
										Architecture: RBAC, microservices, API
										design, Application Security
									</li>
								</ul>
							</div>
						</div>
					</MagicCard>

					<MagicCard className="h-full md:col-span-2">
						<div className="p-4 sm:p-6">
							<h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white">
								Current Work & Achievements
							</h3>
							<div className="space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
								<p>
									In my current role, I've led several key
									initiatives including implementing
									role-based access control, creating
									customizable output templates with
									PDF/HTML/email export capabilities, and
									developing comprehensive report saving
									workflows.
								</p>
								<p>
									I've also integrated various third-party
									services like HubSpot and AWS Nova for
									content summarization and validation. My
									responsibilities extend to database
									operations, including cluster setup, user
									accessibility management, and ensuring
									frontend availability. I take pride in
									creating solutions that are both technically
									robust and user-friendly.
								</p>
							</div>
						</div>
					</MagicCard>
				</div>
			</div>
		</SectionWrapper>
	);
};

export default About;
