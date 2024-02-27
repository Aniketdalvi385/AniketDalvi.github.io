import React from "react";
import java from "../assets/java.png";
import javascript from "../assets/javascript.png";
import python from "../assets/python.png";
import typescript from "../assets/typescript.png";
import reactImage from "../assets/react.png";
import nextjs from "../assets/nextjs.png";
import html from "../assets/html.png";
import css from "../assets/css.png";
import tailwind from "../assets/tailwind.png";
import bootstrap from "../assets/bootstrap.png";
import github from "../assets/github.png";
import docker from "../assets/docker.png";
import mongoDB from "../assets/mongoDB.png";

const Experience = () => {
    const tech = [
        {
            id: 1,
            src: java,
            title: "Java",
            style: "shadow-orange-400",
        },
        {
            id: 2,
            src: javascript,
            title: "JavaScript",
            style: "shadow-yellow-500",
        },
        {
            id: 3,
            src: python,
            title: "python",
            style: "shadow-blue-400",
        },
        {
            id: 4,
            src: typescript,
            title: "TypeScript",
            style: "shadow-blue-500",
        },
        {
            id: 5,
            src: reactImage,
            title: "React",
            style: "shadow-sky-500",
        },
        {
            id: 6,
            src: nextjs,
            title: "Nextjs",
            style: "shadow-white",
        },
        {
            id: 7,
            src: "https://nestjs.com/logo-small.ede75a6b.svg",
            title: "NestJs",
            style: "shadow-red-400",
        },
        {
            id: 8,
            src: html,
            title: "HTML",
            style: "shadow-orange-500",
        },
        {
            id: 9,
            src: css,
            title: "CSS",
            style: "shadow-blue-500",
        },
        {
            id: 10,
            src: tailwind,
            title: "Tailwind",
            style: "shadow-teal-400",
        },
        {
            id: 11,
            src: bootstrap,
            title: "BootStrap",
            style: "shadow-fuchsia-700",
        },
        {
            id: 12,
            src: github,
            title: "GitHub",
            style: "shadow-gray-400",
        },
        {
            id: 13,
            src: docker,
            title: "Docker",
            style: "shadow-sky-400",
        },
        {
            id: 14,
            src: mongoDB,
            title: "MongoDB",
            style: "shadow-green-400",
        },
    ];
    return (
        <div
            name="Experience"
            className="bg-gradient-to-b from-gray-800 to-black w-full h-[150vh]"
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
                    {tech.map(({ id, src, title, style }) => (
                        <div
                            key={id}
                            // eslint-disable-next-line
                            className={
                                "shadow-md hover:scale-105 duration-500 py-2 rounded-lg" +
                                " " +
                                style
                            }
                        >
                            <img src={src} alt="" className="w-20 mx-auto" />
                            <p className="mt-4">{title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;
