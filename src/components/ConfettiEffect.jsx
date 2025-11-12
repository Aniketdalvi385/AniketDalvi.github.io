import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useMood } from "../contexts/MoodContext";

const ConfettiEffect = () => {
	const { mood } = useMood();
	const previousMoodRef = useRef(mood);
	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			previousMoodRef.current = mood;
			return;
		}

		if (mood === "casual" && previousMoodRef.current !== "casual") {
			triggerConfetti();
		}

		previousMoodRef.current = mood;
	}, [mood]);

	const triggerConfetti = () => {
		try {
			const confettiFn = confetti.default || confetti;

			if (typeof confettiFn !== "function") {
				return;
			}

			const end = Date.now() + 3 * 1000;
			const colors = ["#ff4444", "#ff6b35", "#ff8c42", "#ffaa5c"];

			const frame = () => {
				if (Date.now() > end) return;

				confettiFn({
					particleCount: 2,
					angle: 60,
					spread: 55,
					startVelocity: 60,
					origin: { x: 0, y: 0.5 },
					colors: colors,
				});

				confettiFn({
					particleCount: 2,
					angle: 120,
					spread: 55,
					startVelocity: 60,
					origin: { x: 1, y: 0.5 },
					colors: colors,
				});

				requestAnimationFrame(frame);
			};

			frame();
		} catch (error) {
			console.error("🎉 Confetti: Error triggering confetti:", error);
		}
	};

	return null;
};

export default ConfettiEffect;
