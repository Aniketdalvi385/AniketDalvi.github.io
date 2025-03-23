import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";

const SocialLinks = () => {
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
			href: "/Resume.pdf",
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
                            bg-gray-200 dark:bg-gray-800 
                            hover:ml-[-10px] hover:rounded-md 
                            duration-500
                            ${style}
                        `}
					>
						<a
							href={href}
							className="flex justify-between items-center w-full text-gray-700 dark:text-gray-200"
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
