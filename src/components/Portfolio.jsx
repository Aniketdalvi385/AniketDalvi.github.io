import React from "react";
import pdfMagic from "../assets/portfolio/pdfMagic.png";
import taskUp from "../assets/portfolio/taskUp.png";
import textEditor from "../assets/portfolio/textEditor.png";
import webMagic from "../assets/portfolio/webMagic.png";

const Portfolio = () => {
    const portfolios = [
        {
            id: 1,
            src: taskUp,
            name: "TaskUp",
            codeLink: "https://github.com/Aniketdalvi385/TaskUp",
        },
        {
            id: 2,
            src: textEditor,
            name: "Retro Text Editor",
            codeLink:
                "https://github.com/Aniketdalvi385/Java-Projects/tree/main/TextEditorProject1",
        },
        {
            id: 3,
            src: webMagic,
            name: "WebMagic",
            codeLink: "https://github.com/Aniketdalvi385/WebMagic",
        },
        {
            id: 4,
            src: pdfMagic,
            name: "PDF Magic",
            codeLink: "https://github.com/Aniketdalvi385/PDF-and-.TXT-Magic",
        },
        // {
        //     id: 5,
        //     src: installNode,
        // },
        // {
        //     id: 6,
        //     src: reactWeather,
        // },
    ];
    return (
        <div
            name="Portfolio"
            className=" bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen"
        >
            <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
                <div className="pb-8">
                    <p className="text-4xl font-bold inline border-b-4 border-gray-500">
                        Portfolio
                    </p>
                    <p className="py-6">Checkout some of my work right here.</p>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
                    {portfolios.map(({ id, src, name, codeLink }) => (
                        <div
                            key={id}
                            className="shadow-md shadow-gray-600 rounded-lg"
                        >
                            <img
                                src={src}
                                alt=""
                                className="rounded-md duration-200 hover:scale-105"
                            />
                            <div className="flex items-center justify-center py-3">
                                <div>{name}</div>
                            </div>
                            <div className="flex items-center justify-center">
                                {/* <button className='w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105'>Demo</button> */}
                                <a
                                    href={codeLink}
                                    className="flex w-1/2 px-6 m-2 duration-200 hover:scale-105 justify-center"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Code
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
