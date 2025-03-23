import React, { useEffect, useState } from "react";

const ThemeSelector = () => {
	const [theme, setTheme] = useState("default");

	useEffect(() => {
		// Get saved theme from localStorage or use default
		const savedTheme = localStorage.getItem("theme") || "default";
		setTheme(savedTheme);
		document.documentElement.setAttribute("data-theme", savedTheme);
	}, []);

	const handleThemeChange = (e) => {
		const newTheme = e.target.value;
		setTheme(newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return (
		<div className="dropdown dropdown-end">
			<div tabIndex={0} role="button" className="btn btn-ghost m-1">
				Theme
				<svg
					width="12px"
					height="12px"
					className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 2048 2048"
				>
					<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
				</svg>
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content bg-base-300 rounded-box z-50 w-52 p-2 shadow-2xl"
			>
				<li>
					<input
						type="radio"
						name="theme-dropdown"
						className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
						aria-label="Default"
						value="default"
						checked={theme === "default"}
						onChange={handleThemeChange}
					/>
				</li>
				<li>
					<input
						type="radio"
						name="theme-dropdown"
						className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
						aria-label="Retro"
						value="retro"
						checked={theme === "retro"}
						onChange={handleThemeChange}
					/>
				</li>
				<li>
					<input
						type="radio"
						name="theme-dropdown"
						className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
						aria-label="Cyberpunk"
						value="cyberpunk"
						checked={theme === "cyberpunk"}
						onChange={handleThemeChange}
					/>
				</li>
				<li>
					<input
						type="radio"
						name="theme-dropdown"
						className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
						aria-label="Valentine"
						value="valentine"
						checked={theme === "valentine"}
						onChange={handleThemeChange}
					/>
				</li>
				<li>
					<input
						type="radio"
						name="theme-dropdown"
						className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
						aria-label="Aqua"
						value="aqua"
						checked={theme === "aqua"}
						onChange={handleThemeChange}
					/>
				</li>
			</ul>
		</div>
	);
};

export default ThemeSelector;
