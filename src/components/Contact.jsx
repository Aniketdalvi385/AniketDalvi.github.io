import React, { useState } from "react";
import SectionWrapper from "./ui/SectionWrapper";
import { MagicCard } from "./ui/MagicCard";
import { cn } from "../lib/utils";
import { useMood } from "../contexts/MoodContext";

/**
 * Contact section with inline submission handling (fetch -> getform)
 * - Shows success / error messages inline (aria-live)
 * - Honeypot field to reduce spam
 * - Mood-aware microcopy (Business Casual vs Mentally Casual)
 */

const GETFORM_ENDPOINT = "https://getform.io/f/negrJZdw";

// tiny inline SVG icons (kept minimal)
const Icon = ({ name, className = "" }) => {
	if (name === "phone")
		return (
			<svg
				className={className}
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 3.09 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.77.65 2.6a2 2 0 0 1-.45 2.11L9.91 9.91a16 16 0 0 0 6 6l1.48-1.48a2 2 0 0 1 2.11-.45c.83.31 1.7.53 2.6.65A2 2 0 0 1 22 16.92z"
					fill="currentColor"
				/>
			</svg>
		);
	if (name === "email")
		return (
			<svg
				className={className}
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M4 4h16v16H4z"
					stroke="currentColor"
					strokeWidth="1.2"
					fill="none"
				/>
				<path
					d="M4 6l8 6 8-6"
					stroke="currentColor"
					strokeWidth="1.2"
					fill="none"
				/>
			</svg>
		);
	if (name === "linkedin")
		return (
			<svg
				className={className}
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM2 9h4v11H2zM9 9h4v2.2c.7-1.2 2.2-2.1 4-2.1 4.3 0 5 2.8 5 6.4V20h-4v-5.2c0-1.6 0-3.6-2.4-3.6-2.4 0-2.8 1.9-2.8 3.5V20H9z"
					fill="currentColor"
				/>
			</svg>
		);
	if (name === "github")
		return (
			<svg
				className={className}
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.7.7 2.1 1.1.1-.8.4-1.4.7-1.8-2.7-.3-5.5-1.4-5.5-6A4.7 4.7 0 0 1 6 9.2c-.8-2 .1-4.2 1.9-5.3.1-.4.8-2 .2-4.2 0 0 1.6 0 5 2A17.4 17.4 0 0 1 12 3c1.6 0 3.2.2 4.7.6 3.4-2 5-2 5-2-.6 2.2.1 3.8.2 4.2 1.8 1.1 2.7 3.2 1.9 5.3A4.7 4.7 0 0 1 20 14c0 4.6-2.8 5.6-5.5 5.9.4.3.7 1 .7 2v2.9c0 .4.2.7.8.6A12 12 0 0 0 12 .5z"
					fill="currentColor"
				/>
			</svg>
		);
	return null;
};

const Contact = () => {
	const { mood } = useMood();
	const isBusiness = mood === "business";
	const [status, setStatus] = useState("idle"); // idle | sending | success | error
	const [errorMsg, setErrorMsg] = useState("");

	const resumeHrefBusiness =
		"https://drive.google.com/drive/folders/10AedTnYZnBg-3deR2XxeYRyGZ0gFFDMD?usp=sharing";
	const resumeHrefUnpro =
		"https://drive.google.com/drive/folders/10AedTnYZnBg-3deR2XxeYRyGZ0gFFDMD?usp=sharing"; // replace if you have a separate unprofessional resume link

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("sending");
		setErrorMsg("");

		const form = e.target;
		// honeypot - treat filled as spam
		if (form["phone_hidden"] && form["phone_hidden"].value) {
			setStatus("success"); // silently accept to discourage bots
			return;
		}

		const formData = new FormData(form);

		try {
			const res = await fetch(GETFORM_ENDPOINT, {
				method: "POST",
				body: formData,
			});
			if (!res.ok) throw new Error(`Server responded ${res.status}`);
			setStatus("success");
			form.reset();
		} catch (err) {
			console.error("Contact submit error:", err);
			setErrorMsg(
				"Something went wrong. Please try again or email me directly."
			);
			setStatus("error");
		}
	};

	return (
		<SectionWrapper
			name="Contact"
			className="bg-white dark:bg-black transition-colors duration-300 min-h-[70vh]"
		>
			<div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
				<div className="pb-3 sm:pb-4 md:pb-6">
					<p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold inline border-b-4 border-gray-500">
						Let's Connect
					</p>
					<p className="py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-2xl">
						{isBusiness
							? "I'm open to discussing opportunities, collaborations, or technical problems. Drop a message below and I'll get back within a few business days."
							: "Have an idea, bug, or caffeinated chaos? Shoot a message — I read the good ones (and the memes)."}
					</p>
				</div>

				<div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
					{/* Left: quick contact cards */}
					<div className="w-full lg:w-1/3 space-y-4">
						<MagicCard className="p-4">
							<div className="space-y-3">
								<h4 className="text-lg font-semibold dark:text-white">
									Quick Contact
								</h4>

								<div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
									<div className="flex items-center gap-2">
										<Icon
											name="phone"
											className="text-gray-700 dark:text-gray-300"
										/>
										<a
											className="underline"
											href="tel:+919404193260"
										>
											+91 9404193260
										</a>
									</div>

									<div className="flex items-center gap-2">
										<Icon
											name="email"
											className="text-gray-700 dark:text-gray-300"
										/>
										<a
											className="underline"
											href="mailto:aniketdalvi385@gmail.com"
										>
											aniketdalvi385@gmail.com
										</a>
									</div>

									<div className="flex items-center gap-2">
										<Icon
											name="linkedin"
											className="text-gray-700 dark:text-gray-300"
										/>
										<a
											className="underline"
											href="https://www.linkedin.com/in/aniket-dalvi385/"
											target="_blank"
											rel="noreferrer"
										>
											aniketdalvi385
										</a>
									</div>

									<div className="flex items-center gap-2">
										<Icon
											name="github"
											className="text-gray-700 dark:text-gray-300"
										/>
										<a
											className="underline"
											href="https://github.com/Aniketdalvi385"
											target="_blank"
											rel="noreferrer"
										>
											GitHub
										</a>
									</div>
								</div>

								<div className="pt-2">
									<a
										href={
											isBusiness
												? resumeHrefBusiness
												: resumeHrefUnpro
										}
										target="_blank"
										rel="noreferrer"
										className="inline-block px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-white hover:scale-[1.02] transition-transform"
									>
										{isBusiness
											? "Download Resume"
											: "Download My Unprofessional Resume"}
									</a>
								</div>
							</div>
						</MagicCard>
					</div>

					{/* Right: form */}
					<div className="w-full lg:w-2/3">
						<MagicCard className="w-full">
							<form
								onSubmit={handleSubmit}
								className="flex flex-col gap-3 p-3 sm:p-4"
								aria-live="polite"
							>
								{/* Honeypot */}
								<input
									type="text"
									name="phone_hidden"
									tabIndex="-1"
									autoComplete="off"
									className="hidden"
									aria-hidden
								/>

								<label className="sr-only" htmlFor="c_name">
									Your name
								</label>
								<input
									id="c_name"
									name="name"
									type="text"
									placeholder="Your name"
									className="px-3 sm:px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300"
									required
								/>

								<label className="sr-only" htmlFor="c_email">
									Your email
								</label>
								<input
									id="c_email"
									name="email"
									type="email"
									placeholder="Your email"
									className="px-3 sm:px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300"
									required
								/>

								<label className="sr-only" htmlFor="c_msg">
									Message
								</label>
								<textarea
									id="c_msg"
									name="message"
									rows="5"
									placeholder="Your message — include project details or questions"
									className="px-3 sm:px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300 resize-none"
									required
								/>

								<div className="flex items-center gap-3">
									<button
										type="submit"
										disabled={status === "sending"}
										className={cn(
											"group relative overflow-hidden rounded-lg px-4 sm:px-6 py-2 sm:py-3 mt-1 text-sm sm:text-base font-medium transition-all duration-300",
											status === "sending"
												? "bg-gray-400 text-gray-900 cursor-wait"
												: "bg-blue-500 hover:bg-blue-600 text-white"
										)}
										aria-live="polite"
									>
										<span className="relative z-10">
											{status === "sending"
												? "Sending..."
												: isBusiness
												? "Send Message"
												: "Send (I respond eventually)"}
										</span>
									</button>

									<div className="text-sm">
										<div
											aria-live="polite"
											className="text-gray-700 dark:text-gray-300"
										>
											{status === "success" && (
												<span className="text-green-400">
													Message sent — thanks!
												</span>
											)}
											{status === "error" && (
												<span className="text-rose-400">
													{errorMsg}
												</span>
											)}
										</div>
									</div>
								</div>
							</form>
						</MagicCard>
					</div>
				</div>
			</div>
		</SectionWrapper>
	);
};

export default Contact;
