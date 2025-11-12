import React from "react";
import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export const InfiniteScroll = ({
	children,
	direction = "left",
	speed = "normal",
	className,
}) => {
	const speeds = {
		slow: 50,
		normal: 35,
		fast: 20,
	};

	// Create duplicate content for seamless loop
	const content = React.Children.toArray(children);

	return (
		<div className={cn("overflow-hidden", className)}>
			<motion.div
				className="flex gap-4 w-fit"
				initial={{ x: direction === "left" ? 0 : "-50%" }}
				animate={{ x: direction === "left" ? "-50%" : 0 }}
				transition={{
					duration: speeds[speed],
					repeat: Infinity,
					repeatType: "loop",
					ease: "linear",
				}}
			>
				{/* First set */}
				<div className="flex gap-4 items-center shrink-0">
					{content}
				</div>
				{/* Duplicate set for seamless loop */}
				<div className="flex gap-4 items-center shrink-0">
					{content}
				</div>
			</motion.div>
		</div>
	);
};

// Demo
const TechCard = ({ name, icon }) => (
	<div className="bg-gray-800 rounded-lg p-6 min-w-[150px] flex flex-col items-center gap-3">
		<div className="text-4xl">{icon}</div>
		<div className="text-white font-medium">{name}</div>
	</div>
);

export default function Demo() {
	const techs = [
		{ name: "React", icon: "⚛️" },
		{ name: "TypeScript", icon: "📘" },
		{ name: "Python", icon: "🐍" },
		{ name: "Java", icon: "☕" },
		{ name: "Next.js", icon: "▲" },
		{ name: "Node.js", icon: "🟢" },
	];

	return (
		<div className="min-h-screen bg-black p-8">
			<div className="max-w-7xl mx-auto space-y-12">
				<h1 className="text-4xl font-bold text-white text-center mb-12">
					Infinite Scroll Carousel
				</h1>

				<div className="space-y-8">
					<div>
						<h2 className="text-xl text-white mb-4">
							Left (Normal Speed)
						</h2>
						<InfiniteScroll direction="left" speed="normal">
							{techs.map((tech, i) => (
								<TechCard key={i} {...tech} />
							))}
						</InfiniteScroll>
					</div>

					<div>
						<h2 className="text-xl text-white mb-4">
							Right (Fast Speed)
						</h2>
						<InfiniteScroll direction="right" speed="fast">
							{techs.map((tech, i) => (
								<TechCard key={i} {...tech} />
							))}
						</InfiniteScroll>
					</div>

					<div>
						<h2 className="text-xl text-white mb-4">
							Left (Slow Speed)
						</h2>
						<InfiniteScroll direction="left" speed="slow">
							{techs.map((tech, i) => (
								<TechCard key={i} {...tech} />
							))}
						</InfiniteScroll>
					</div>
				</div>
			</div>
		</div>
	);
}
