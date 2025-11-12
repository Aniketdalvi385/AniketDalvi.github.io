import React from "react";
import "./CSS/GradientButton.css";

const GradientButton = ({ children, className = "", onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`gradient-button px-6 py-2 rounded-md font-bold ${className}`}
		>
			<div className="gradient-text">{children}</div>
		</button>
	);
};

export default GradientButton;
