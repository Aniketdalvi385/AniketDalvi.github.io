import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

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

	// Create multiple copies of children with unique keys
	const content = React.useMemo(() => {
		return Array(3)
			.fill(null)
			.map((_, index) =>
				React.Children.map(children, (child) =>
					React.cloneElement(child, {
						key: `${child.key}-copy-${index}`,
					})
				)
			)
			.flat();
	}, [children]);

	return (
		<div className={cn("overflow-hidden", className)}>
			<motion.div
				initial={{ x: direction === "left" ? "0%" : "-100%" }}
				animate={{ x: direction === "left" ? "-100%" : "0%" }}
				transition={{
					duration: speeds[speed],
					repeat: Infinity,
					repeatType: "loop",
					ease: "linear",
					repeatDelay: 0,
				}}
				className="flex gap-4 w-fit"
			>
				<div className="flex gap-4 items-center">{content}</div>
			</motion.div>
		</div>
	);
};
