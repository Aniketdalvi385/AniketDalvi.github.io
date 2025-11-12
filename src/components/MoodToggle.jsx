import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMood } from "../contexts/MoodContext";

const MoodToggle = () => {
	const { mood, toggleMood } = useMood();

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}
			className="fixed bottom-6 right-6 z-50"
		>
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={toggleMood}
				className="group relative overflow-hidden rounded-full px-4 py-3 sm:px-6 sm:py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
				aria-label="Toggle mood"
			>
				<AnimatePresence mode="wait">
					{mood === "business" ? (
						<motion.span
							key="casual"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.2 }}
							className="flex items-center gap-2 text-xs sm:text-sm font-semibold bg-gradient-to-r from-red-500 via-orange-500 to-orange-400 bg-clip-text text-transparent"
						>
							<span className="text-lg">🎨</span>
							<span className="hidden sm:inline">
								Mentally Casual
							</span>
							<span className="sm:hidden">Casual</span>
						</motion.span>
					) : (
						<motion.span
							key="business"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.2 }}
							className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200"
						>
							<span className="text-lg">💼</span>
							<span className="hidden sm:inline">
								Business Casual
							</span>
							<span className="sm:hidden">Business</span>
						</motion.span>
					)}
				</AnimatePresence>

				{mood === "business" && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="absolute inset-0 -z-10 blur-lg bg-gradient-to-r from-red-500/20 via-orange-500/20 to-orange-400/20 rounded-full"
					/>
				)}
			</motion.button>
		</motion.div>
	);
};

export default MoodToggle;
