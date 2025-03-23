import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { motion } from "framer-motion";
import GradientText from "./GradientText";

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			return savedTheme;
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	});

	const links = [
		{ id: 1, link: "Home" },
		{ id: 2, link: "About" },
		{ id: 3, link: "Portfolio" },
		{ id: 4, link: "Tech-Stack" },
		{ id: 5, link: "Contact" },
	];

	useEffect(() => {
		localStorage.setItem("theme", theme);
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
			className="fixed top-0 z-50 w-[100vw] bg-gradient-to-r from-white via-white to-gray-100 dark:from-black dark:via-black dark:to-gray-900 shadow-lg transition-colors duration-300"
		>
			<div className="w-full max-w-screen-lg mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
				<div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
					{/* Logo/Name */}
					<motion.div
						whileHover={{ scale: 1.05 }}
						className="flex-shrink-0"
					>
						<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-signature">
							<GradientText
								colors={["#06b6d4", "#3b82f6"]}
								animationSpeed={3}
								className="font-signature"
							>
								Aniket Dalvi
							</GradientText>
						</h1>
					</motion.div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-4 lg:space-x-6">
						{links.map(({ id, link }) => (
							<motion.div
								key={id}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link
									to={link}
									smooth
									duration={500}
									className="cursor-pointer text-sm lg:text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
								>
									{link}
								</Link>
							</motion.div>
						))}

						{/* Theme Toggle Button */}
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							onClick={toggleTheme}
							className="p-1.5 sm:p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
							aria-label="Toggle theme"
						>
							{theme === "light" ? (
								<BsMoonStars className="text-gray-700 dark:text-gray-200 text-base sm:text-lg" />
							) : (
								<BsSun className="text-gray-700 dark:text-gray-200 text-base sm:text-lg" />
							)}
						</motion.button>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center space-x-2">
						<motion.button
							whileTap={{ scale: 0.95 }}
							onClick={toggleTheme}
							className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
						>
							{theme === "light" ? (
								<BsMoonStars className="text-gray-700 dark:text-gray-200 text-sm" />
							) : (
								<BsSun className="text-gray-700 dark:text-gray-200 text-sm" />
							)}
						</motion.button>

						<button
							onClick={() => setNav(!nav)}
							className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
						>
							{nav ? (
								<FaTimes
									size={16}
									className="text-gray-700 dark:text-gray-200"
								/>
							) : (
								<FaBars
									size={16}
									className="text-gray-700 dark:text-gray-200"
								/>
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{nav && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="md:hidden"
					>
						<div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
							{links.map(({ id, link }) => (
								<Link
									key={id}
									to={link}
									smooth
									duration={500}
									onClick={() => setNav(false)}
									className="block px-2 py-1.5 rounded-md text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
								>
									{link}
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</div>
		</motion.nav>
	);
};

export default Navbar;
