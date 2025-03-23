import React from "react";
import { cn } from "../../lib/utils";

export const MagicCard = ({
	children,
	className,
	gradientColor = "rgba(217, 217, 217, 0.33)",
}) => {
	return (
		<div
			className={cn(
				"relative h-full rounded-2xl p-px transition-all duration-300",
				"hover:shadow-[0_0_2rem_-0.5rem_#646cff] dark:hover:shadow-[0_0_2rem_-0.5rem_#818cf8]",
				"before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 before:bg-white/30 dark:before:bg-white/5 before:rounded-full before:blur-3xl before:pointer-events-none",
				"after:absolute after:w-80 after:h-80 after:-right-40 after:-bottom-40 after:bg-white/30 dark:after:bg-white/5 after:rounded-full after:blur-3xl after:pointer-events-none",
				"hover:before:bg-white/40 dark:hover:before:bg-white/10",
				"hover:after:bg-white/40 dark:hover:after:bg-white/10",
				className
			)}
		>
			<div
				className="relative h-full bg-gradient-to-b from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-900/80 rounded-2xl p-4 transition-colors duration-300"
				style={{
					background: `radial-gradient(150% 150% at 50% 50%, transparent 0%, ${gradientColor} 100%)`,
				}}
			>
				{children}
			</div>
		</div>
	);
};
