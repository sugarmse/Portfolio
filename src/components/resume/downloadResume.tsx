import React, { useState } from "react";
import "./download.css";
const DownloadOnClick = () => {
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
	const [showTooltip, setShowTooltip] = useState(false);

	// Handle mouse movement to update tooltip position
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		setTooltipPosition({ x: e.clientX, y: e.clientY });
	};

	// Handle file download
	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = "/"; // Replace with the path to your file
		link.download = "CV.pdf"; // The name of the file when downloaded
		link.click();
	};

	return (
		<div
			className="resumeDownload"
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
		>
			{/* Image to trigger download */}
			<img
				className="resumeImg"
				src="SS.png"
				alt="Click to download"
				onClick={handleDownload}
			/>

			{/* Tooltip */}
			{showTooltip && (
				<div
					style={{
						position: "fixed",
						top: tooltipPosition.y + 10, // Slight offset from the cursor
						left: tooltipPosition.x + 10,
						backgroundColor: "#333",
						color: "#fff",
						padding: "5px 10px",
						borderRadius: "5px",
						fontSize: "12px",
						whiteSpace: "nowrap",
						zIndex: 1000,
						pointerEvents: "none", // Prevent blocking mouse events
					}}
				>
					Click to download
				</div>
			)}
		</div>
	);
};

export default DownloadOnClick;
