import React from "react";
import { cn } from "../../lib/utils";
import { useMood } from "../../contexts/MoodContext";

export const MagicCard = ({
	children,
	className,
	gradientColor = "rgba(217, 217, 217, 0.33)",
	darkGradientColor = "rgba(20, 20, 20, 0.3)",
}) => {
	const { mood } = useMood();
	const isCasual = mood === "casual";

	const businessHoverShadow = "#646cff";
	const businessDarkHoverShadow = "#818cf8";

	const casualHoverShadow = "#ff4444";
	const casualDarkHoverShadow = "#ff6b35";

	const hoverShadowColor = isCasual ? casualHoverShadow : businessHoverShadow;
	const darkHoverShadowColor = isCasual
		? casualDarkHoverShadow
		: businessDarkHoverShadow;

	return (
		<div
			className={cn(
				"relative h-full rounded-2xl p-px transition-all duration-300 overflow-hidden",
				"bg-white/50 dark:bg-white/5",
				isCasual
					? "before:absolute before:w-60 before:h-60 before:-left-20 before:-top-20 before:rounded-full before:blur-2xl before:pointer-events-none before:opacity-50 dark:before:opacity-30 before:bg-red-500/20 dark:before:bg-orange-500/10 after:absolute after:w-60 after:h-60 after:-right-20 after:-bottom-20 after:rounded-full after:blur-2xl after:pointer-events-none after:opacity-50 dark:after:opacity-30 after:bg-red-500/20 dark:after:bg-orange-500/10 hover:before:opacity-70 hover:before:bg-red-500/30 dark:hover:before:opacity-50 dark:hover:before:bg-orange-500/15 hover:after:opacity-70 hover:after:bg-red-500/30 dark:hover:after:opacity-50 dark:hover:after:bg-orange-500/15"
					: "before:absolute before:w-60 before:h-60 before:-left-20 before:-top-20 before:bg-white/20 dark:before:bg-white/2 before:rounded-full before:blur-2xl before:pointer-events-none before:opacity-50 dark:before:opacity-30 after:absolute after:w-60 after:h-60 after:-right-20 after:-bottom-20 after:bg-white/20 dark:after:bg-white/2 after:rounded-full after:blur-2xl after:pointer-events-none after:opacity-50 dark:after:opacity-30 hover:before:opacity-70 hover:before:bg-white/30 dark:hover:before:opacity-50 dark:hover:before:bg-white/3 hover:after:opacity-70 hover:after:bg-white/30 dark:hover:after:opacity-50 dark:hover:after:bg-white/3",
				className
			)}
			style={{
				"--hover-shadow-color": hoverShadowColor,
				"--dark-hover-shadow-color": darkHoverShadowColor,
			}}
			onMouseEnter={(e) => {
				const isDark =
					document.documentElement.classList.contains("dark");
				const shadowColor = isDark
					? darkHoverShadowColor
					: hoverShadowColor;
				e.currentTarget.style.boxShadow = `0 0 2rem -0.5rem ${shadowColor}`;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.boxShadow = "";
			}}
		>
			<div className="relative h-full rounded-2xl p-4 transition-colors duration-300">
				{/* Light mode background */}
				<div
					className="absolute inset-0 rounded-2xl dark:hidden"
					style={{
						background: `
							radial-gradient(150% 150% at 50% 50%, transparent 0%, ${gradientColor} 100%),
							linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))
						`,
					}}
				/>
				{/* Dark mode background */}
				<div
					className="absolute inset-0 rounded-2xl hidden dark:block"
					style={{
						background: `
							radial-gradient(150% 150% at 50% 50%, transparent 0%, ${darkGradientColor} 100%),
							linear-gradient(to bottom, rgba(0, 0, 0, 0.98), rgba(0, 0, 0, 0.96))
						`,
					}}
				/>
				<div className="relative z-10">{children}</div>
			</div>
		</div>
	);
};
