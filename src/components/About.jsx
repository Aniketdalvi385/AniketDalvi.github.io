import React from "react";

const About = () => {
    return (
        <div
            name="About"
            className="w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white"
        >
            <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
                <div className="pb-4">
                    <p className="text-4xl font-bold inline border-b-4 border-gray-500">
                        About
                    </p>
                </div>
                <p className="text-xl mt-10">
                    In the fast-paced world of software engineering, I thrive as
                    a versatile and dedicated professional, currently serving as
                    a Software Engineer at Code-B. With a keen focus on
                    full-stack web development, I have honed my skills in
                    architecting and implementing robust solutions across a
                    spectrum of projects.
                </p>
                <br />
                <p className="text-xl">
                    Beyond my professional endeavors, I am deeply passionate
                    about solving complex challenges and contributing to
                    impactful projects that make a difference. With a strong
                    foundation in data structures and algorithms, coupled with
                    proficiency in a wide array of programming languages and
                    technologies, I am equipped to tackle diverse challenges and
                    deliver innovative solutions.
                </p>
            </div>
        </div>
    );
};

export default About;
