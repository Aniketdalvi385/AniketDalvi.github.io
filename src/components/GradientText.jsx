import "./CSS/GradientText.css";

export default function GradientText({
    children,
    className = "",
    colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"], // Default colors
    animationSpeed = 8, // Default animation speed in seconds
    showBorder = false, // Default overlay visibility
}) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
    };

    return (
        <div className={`animated-gradient-text ${className}`}>
            {showBorder ? (
                // Button style with border
                <>
                    <div
                        className="gradient-overlay"
                        style={gradientStyle}
                    ></div>
                    <div
                        className="text-content text-gray-800 dark:text-white"
                        style={{
                            backgroundColor: "var(--bg-color)",
                            "--bg-color": "white",
                        }}
                    >
                        <div className="bg-white dark:bg-black">{children}</div>
                    </div>
                </>
            ) : (
                // Regular gradient text style
                <div className="text-content" style={gradientStyle}>
                    {children}
                </div>
            )}
        </div>
    );
}
