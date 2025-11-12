import React, { createContext, useContext, useState, useEffect } from "react";

const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
	const [mood, setMood] = useState(() => {
		const savedMood = localStorage.getItem("mood");
		const initialMood = savedMood || "business";

		document.documentElement.setAttribute("data-mood", initialMood);

		console.log("🎨 MoodContext: Initial mood set to:", initialMood);
		console.log(
			"🎨 MoodContext: data-mood attribute:",
			document.documentElement.getAttribute("data-mood")
		);

		return initialMood;
	});

	useEffect(() => {
		localStorage.setItem("mood", mood);

		document.documentElement.setAttribute("data-mood", mood);

		console.log("🎨 MoodContext: Mood changed to:", mood);
		console.log(
			"🎨 MoodContext: data-mood attribute:",
			document.documentElement.getAttribute("data-mood")
		);
		console.log(
			"🎨 MoodContext: HTML element classes:",
			document.documentElement.className
		);

		const bgColor = getComputedStyle(
			document.documentElement
		).getPropertyValue("--background");
		console.log("🎨 MoodContext: --background CSS variable:", bgColor);
	}, [mood]);

	const toggleMood = () => {
		console.log("🎨 MoodContext: toggleMood called, current mood:", mood);
		setMood((prevMood) => {
			const newMood = prevMood === "business" ? "casual" : "business";
			console.log(
				"🎨 MoodContext: Toggling from",
				prevMood,
				"to",
				newMood
			);
			return newMood;
		});
	};

	const value = {
		mood,
		setMood,
		toggleMood,
	};

	return (
		<MoodContext.Provider value={value}>{children}</MoodContext.Provider>
	);
};

export const useMood = () => {
	const context = useContext(MoodContext);
	if (!context) {
		throw new Error("useMood must be used within a MoodProvider");
	}
	return context;
};
