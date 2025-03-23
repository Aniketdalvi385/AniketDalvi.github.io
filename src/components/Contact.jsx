import React from "react";
import SectionWrapper from "./ui/SectionWrapper";
import { MagicCard } from "./ui/MagicCard";

const Contact = () => {
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
						I'm open to discussing new opportunities,
						collaborations, or technical challenges. Whether you
						have a project in mind, need consulting on web
						development, or just want to connect with a fellow
						developer, feel free to reach out!
					</p>
				</div>

				<div className="flex justify-center px-0 sm:px-4 md:px-8 lg:px-12">
					<MagicCard className="w-full max-w-2xl">
						<form
							action="https://getform.io/f/negrJZdw"
							method="POST"
							className="flex flex-col gap-3 p-2 sm:p-4"
						>
							<input
								type="text"
								name="name"
								placeholder="Your Name"
								className="px-3 sm:px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg 
										text-sm sm:text-base text-gray-900 dark:text-white 
										focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 
										transition-colors duration-300"
								required
							/>
							<input
								type="email"
								name="email"
								placeholder="Your Email"
								className="px-3 sm:px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg 
										text-sm sm:text-base text-gray-900 dark:text-white 
										focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 
										transition-colors duration-300"
								required
							/>
							<textarea
								name="message"
								rows="4"
								placeholder="Your Message - Feel free to include details about your project or questions about my experience"
								className="px-3 sm:px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg 
										text-sm sm:text-base text-gray-900 dark:text-white 
										focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 
										transition-colors duration-300 resize-none"
								required
							></textarea>

							<button
								type="submit"
								className="group relative overflow-hidden rounded-lg bg-blue-500 
										px-4 sm:px-6 py-2 sm:py-3 mt-1
										text-sm sm:text-base text-white font-medium
										transition-all duration-300 
										hover:bg-blue-600 hover:scale-[1.02] 
										active:scale-[0.98]
										focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
							>
								<span className="relative z-10">
									Send Message
								</span>
								<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
							</button>
						</form>
					</MagicCard>
				</div>
			</div>
		</SectionWrapper>
	);
};

export default Contact;
