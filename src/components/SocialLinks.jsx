import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useMood } from "../contexts/MoodContext";

const SocialLinks = () => {
	const { mood } = useMood();
	const isCasual = mood === "casual";
	const links = [
		{
			id: 1,
			child: (
				<>
					LinkedIn <FaLinkedin size={30} />
				</>
			),
			href: "https://linkedin.com/in/aniket-dalvi385",
			style: "rounded-tr-md",
		},
		{
			id: 2,
			child: (
				<>
					Github <FaGithub size={30} />
				</>
			),
			href: "https://github.com/Aniketdalvi385",
		},
		{
			id: 3,
			child: (
				<>
					Mail <HiOutlineMail size={30} />
				</>
			),
			href: "mailto:aniketdalvi385@gmail.com",
		},
		{
			id: 4,
			child: (
				<>
					Resume <BsFillPersonLinesFill size={30} />
				</>
			),
			href: "https://drive.google.com/drive/folders/10AedTnYZnBg-3deR2XxeYRyGZ0gFFDMD?usp=sharing",
			style: "rounded-br-md",
			download: true,
		},
	];

	return (
		<div className="hidden lg:flex flex-col top-[35%] left-0 fixed z-10">
			<ul>
				{links.map(({ id, child, href, style, download }) => (
					<li
						key={id}
						className={`
                            flex justify-between items-center w-40 h-14 px-4 
                            ml-[-100px] 
                            ${
								isCasual
									? "bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 border border-red-500 dark:border-[#ff8c1a]"
									: "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
							}
                            hover:ml-[-10px] hover:rounded-md 
                            duration-500 transition-colors
                            ${style}
                        `}
					>
						<a
							href={href}
							className={`flex justify-between items-center w-full transition-colors ${
								isCasual
									? "text-red-700 dark:text-[#ff8c1a] hover:text-[#ff8c1a] dark:hover:text-[#ff8c1a]"
									: "text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100"
							}`}
							download={download}
							target="_blank"
							rel="noreferrer"
						>
							{child}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SocialLinks;
