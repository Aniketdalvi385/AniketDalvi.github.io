import React from "react";

const SectionWrapper = ({ name, children, className = "" }) => {
	return (
		<div name={name} className={`min-h-screen w-full py-24 ${className}`}>
			<div className="max-w-screen-lg mx-auto px-4 py-8 flex flex-col justify-center w-full">
				{children}
			</div>
		</div>
	);
};

export default SectionWrapper;
