import React from "react";
import HeroImage from "../assets/heroImage.png";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-scroll";

const Home = () => {
    return (
        <div
            name="Home"
            className="h-screen w-full bg-gradient-to-b from-black via-black to-gray-800"
        >
            <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
                <div className="flex flex-col justify-center h-full">
                    <h2 className="text-4xl sm:text-7xl font-bold text-white">
                        I am a Full Stack{" "}
                        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                            Developer
                        </span>
                        !
                    </h2>
                    <p className="text-gray-500 py-4 max-w-md">
                        Experienced in full-stack web development, adept at
                        crafting seamless digital experiences across diverse
                        projects. Passionate about pushing the boundaries of
                        innovation, dedicated to delivering impactful solutions
                        through elegant frontend designs and robust backend
                        systems.
                    </p>
                    <div>
                        <Link
                            to="Portfolio"
                            smooth
                            duration={500}
                            className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"
                        >
                            Portfolio
                            <span className="group-hover:rotate-90 duration-300">
                                <RiArrowRightSLine size={25} className="ml-1" />
                            </span>
                        </Link>
                    </div>
                </div>
                <div>
                    <img
                        src={HeroImage}
                        alt="heroImage"
                        className="rounded-2xl mx-auto w-2/3 md:w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
