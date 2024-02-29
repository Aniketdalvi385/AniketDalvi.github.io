import React from "react";
import java from "../assets/java.png";
import javascript from "../assets/javascript.png";
import python from "../assets/python.png";
import typescript from "../assets/typescript.png";
import reactImage from "../assets/react.png";
import nextjs from "../assets/nextjs.png";
import nestjs from "../assets/nestjs.png";
import html from "../assets/html.png";
import css from "../assets/css.png";
import tailwind from "../assets/tailwind.png";
import bootstrap from "../assets/bootstrap.png";
import github from "../assets/github.png";
import docker from "../assets/docker.png";
import mongoDB from "../assets/mongoDB.png";
import { motion } from "framer-motion";

const animationVariant = {
    initial: {
        opacity: 0,
        y: 100,
    },
    final: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.3 * (index / 3),
        },
    }),
    hover: {
        scale: 1.05,
    },
};

const Experience = () => {
    const tech = [
        {
            id: 1,
            src: java,
            title: "Java",
            style: "shadow-orange-400",
            link: "https://www.java.com/en/",
        },
        {
            id: 2,
            src: javascript,
            title: "JavaScript",
            style: "shadow-yellow-500",
            link: "https://www.javascript.com/",
        },
        {
            id: 3,
            src: python,
            title: "python",
            style: "shadow-blue-400",
            link: "https://www.python.org/",
        },
        {
            id: 4,
            src: typescript,
            title: "TypeScript",
            style: "shadow-blue-500",
            link: "https://www.typescriptlang.org/",
        },
        {
            id: 5,
            src: reactImage,
            title: "React",
            style: "shadow-sky-500",
            link: "https://react.dev/",
        },
        {
            id: 6,
            src: nextjs,
            title: "Nextjs",
            style: "shadow-white",
            link: "https://nextjs.org/",
        },
        {
            id: 7,
            src: nestjs,
            title: "NestJs",
            style: "shadow-red-400",
            link: "https://nestjs.com/",
        },
        {
            id: 8,
            src: html,
            title: "HTML",
            style: "shadow-orange-500",
            link: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics",
        },
        {
            id: 9,
            src: css,
            title: "CSS",
            style: "shadow-blue-500",
            link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        },
        {
            id: 10,
            src: tailwind,
            title: "Tailwind",
            style: "shadow-teal-400",
            link: "https://tailwindcss.com/",
        },
        {
            id: 11,
            src: bootstrap,
            title: "BootStrap",
            style: "shadow-fuchsia-700",
            link: "https://getbootstrap.com/",
        },
        {
            id: 12,
            src: github,
            title: "GitHub",
            style: "shadow-gray-400",
            link: "https://github.com/",
        },
        {
            id: 13,
            src: docker,
            title: "Docker",
            style: "shadow-sky-400",
            link: "https://www.docker.com/",
        },
        {
            id: 14,
            src: mongoDB,
            title: "MongoDB",
            style: "shadow-green-400",
            link: "https://www.mongodb.com/",
        },
    ];
    return (
        <div
            name="Experience"
            className="bg-gradient-to-b from-gray-800 to-black w-full h-[170vh]"
        >
            <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
                <div>
                    <p className="text-4xl font-bold border-b-4 border-gray-500 p-2 inline">
                        Experience
                    </p>
                    <p className="py-6">
                        These are the Things I am familiar with.
                    </p>
                </div>
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0">
                    {tech.map(({ id, src, title, style, link }) => (
                        <a
                            key={id}
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <motion.div
                                // eslint-disable-next-line
                                className={
                                    "shadow-md hover:scale-105 duration-500 py-2 rounded-lg" +
                                    " " +
                                    style
                                }
                                variants={animationVariant}
                                initial="initial"
                                whileHover="hover"
                                whileInView="final"
                                viewport={{
                                    once: true,
                                }}
                                custom={id}
                            >
                                <img
                                    src={src}
                                    alt=""
                                    className="w-20 mx-auto"
                                />
                                <p className="mt-4">{title}</p>
                            </motion.div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;
