import React from "react";
import { Link } from "react-scroll";
import RotatingText from "./RotatingText";
import GradientText from "./GradientText";
import { motion } from "framer-motion";
import ShapeBlur from "./ShapeBlur";
import GradientButton from "./GradientButton";

const Home = () => {
	const roles = [
		"Full Stack Developer",
		"Frontend Developer",
		"Backend Engineer",
		"Programmer",
		"Mortal Human being",
		"React Developer",
		"UI/UX Developer",
		"API Developer",
		"Database Engineer",
		"AI Enthusiast",
	];

	return (
		<div
			name="Home"
			className="h-screen w-full bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden"
		>
			{/* ShapeBlur Background - adjusted for responsive design */}
			<div className="absolute right-0 top-0 sm:top-0 -top-32 w-1/2 h-full opacity-10 pointer-events-none dark:opacity-70 opacity-30">
				<ShapeBlur
					variation={0}
					pixelRatioProp={window.devicePixelRatio || 1}
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
							I am a
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
								staggerDuration={0.025}
								splitLevelClassName="overflow-hidden"
								transition={{
									type: "spring",
									damping: 30,
									stiffness: 400,
								}}
								rotationInterval={2000}
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
								Building Modern Web Solutions
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
									Experienced Full Stack Developer with 2
									years of expertise in building modern web
									applications. Specializing in React,
									Next.js, Flask, FastAPI, and API
									development, with a strong focus on creating
									intuitive user interfaces and robust backend
									solutions. Currently working on AI-powered
									analytics tools, automated reporting
									systems, and database management.
								</p>
							</div>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="mt-8"
					>
						<Link to="Portfolio" smooth duration={500}>
							<GradientButton className="text-xl">
								Portfolio
							</GradientButton>
						</Link>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Home;
