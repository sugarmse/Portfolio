import { useState } from "react";
import "./projcard1.css";
const ProjCard1 = () => {
	// State to handle active card (flip effect)
	const [activeCard, setActiveCard] = useState<number | null>(null);

	// Data for cards, including titles and descriptions
	const cards = [
		{
			imageSrc: "/nabilogo.png",
			description: "This is the first card description.",
			buttonText: "Learn More",
		},
		{
			svg: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="100"
					height="100"
				>
					<path d="M12 2L2 7h3v7h4V7h4v7h4V7h3L12 2z" />
				</svg>
			),
			description: "This is the second card description.",
			buttonText: "Learn More",
		},
		{
			svg: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="100"
					height="100"
				>
					<path d="M12 2L2 7h3v7h4V7h4v7h4V7h3L12 2z" />
				</svg>
			),
			description: "This is the third card description.",
			buttonText: "Learn More",
		},
		{
			svg: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="100"
					height="100"
				>
					<path d="M12 2L2 7h3v7h4V7h4v7h4V7h3L12 2z" />
				</svg>
			),
			description: "This is the fourth card description.",
			buttonText: "Learn More",
		},
	];

	// Toggle flip function for a specific card
	const toggleFlip = (cardIndex: number) => {
		setActiveCard(activeCard === cardIndex ? null : cardIndex);
	};

	return (
		<div className="grid-container">
			{cards.map((card, index) => (
				<div
					key={index}
					className={`card ${activeCard === index ? "active" : ""}`}
					onClick={() => toggleFlip(index)}
				>
					<div className="card-inner">
						<div className="card-front">{card.description}</div>
						<div className="card-back">{card.description}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProjCard1;
