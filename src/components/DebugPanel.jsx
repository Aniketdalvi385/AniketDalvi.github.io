import React, { useEffect, useState } from "react";
import { useMood } from "../contexts/MoodContext";

const DebugPanel = () => {
	const { mood } = useMood();
	const [cssVars, setCssVars] = useState({});
	const [htmlClasses, setHtmlClasses] = useState("");
	const [dataMood, setDataMood] = useState("");

	useEffect(() => {
		const updateDebugInfo = () => {
			const styles = getComputedStyle(document.documentElement);
			setCssVars({
				background: styles.getPropertyValue("--background"),
				foreground: styles.getPropertyValue("--foreground"),
				primary: styles.getPropertyValue("--primary"),
			});

			setHtmlClasses(document.documentElement.className);
			setDataMood(
				document.documentElement.getAttribute("data-mood") || "not set"
			);
		};

		updateDebugInfo();

		const observer = new MutationObserver(updateDebugInfo);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class", "data-mood"],
		});

		return () => observer.disconnect();
	}, [mood]);

	return (
		<div
			className="fixed top-20 right-4 z-50 bg-black/90 text-white p-4 rounded-lg text-xs font-mono max-w-xs"
			style={{ fontSize: "10px" }}
		>
			<div className="font-bold mb-2 text-yellow-400">🐛 Debug Panel</div>
			<div className="space-y-1">
				<div>
					<span className="text-cyan-400">Mood State:</span>{" "}
					<span className="text-green-400">{mood}</span>
				</div>
				<div>
					<span className="text-cyan-400">data-mood:</span>{" "}
					<span className="text-green-400">{dataMood}</span>
				</div>
				<div>
					<span className="text-cyan-400">HTML classes:</span>{" "}
					<span className="text-green-400">
						{htmlClasses || "none"}
					</span>
				</div>
				<div className="mt-2 border-t border-gray-600 pt-2">
					<div className="text-yellow-400 mb-1">CSS Variables:</div>
					<div>
						<span className="text-cyan-400">--background:</span>{" "}
						<span className="text-pink-400">
							{cssVars.background || "not set"}
						</span>
					</div>
					<div>
						<span className="text-cyan-400">--foreground:</span>{" "}
						<span className="text-pink-400">
							{cssVars.foreground || "not set"}
						</span>
					</div>
					<div>
						<span className="text-cyan-400">--primary:</span>{" "}
						<span className="text-pink-400">
							{cssVars.primary || "not set"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DebugPanel;
