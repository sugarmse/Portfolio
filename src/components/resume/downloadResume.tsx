import React, { useState } from "react";
import "./download.css";

const DownloadOnClick = () => {
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
	const [showTooltip, setShowTooltip] = useState(false);

	// Handle mouse movement to update tooltip position
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		// Calculate position relative to the scaled element
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		setTooltipPosition({ x, y });
	};

	// Handle file download
	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = "/SS.pdf"; // Replace with the correct file path
		link.download = "SS.pdf"; // The name of the file when downloaded
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
					className="tooltip"
					style={{
						top: tooltipPosition.y + 88,
						left: tooltipPosition.x - 34,
					}}
				>
					Click to download
				</div>
			)}
		</div>
	);
};

export default DownloadOnClick;
