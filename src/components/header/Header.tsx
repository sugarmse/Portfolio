import { useState } from "react";
import "./header.css";

function Header() {
	console.log("header loaded");
	// State to track dropdown visibility
	const [isOpen, setIsOpen] = useState(false);
	const [animationClass, setAnimationClass] = useState(""); // Track animation class

	const toggleDropdown = () => {
		if (isOpen) {
			// If menu is open, play slide-up animation before hiding it
			setAnimationClass("close");
			setTimeout(() => {
				setIsOpen(false); // Hide menu after animation completes
				setAnimationClass(""); // Reset animation class
			}, 300); // Duration should match the CSS animation time
		} else {
			// If menu is closed, immediately show and play slide-down animation
			setIsOpen(true);
			setAnimationClass("open");
		}
	};
	// const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
	// 	e.preventDefault();
	// 	setAnimationClass("close");
	// 	setTimeout(() => {
	// 		setIsOpen(false);
	// 		setAnimationClass("");
	// 		const targetElement = document.getElementById(targetId);
	// 		if (targetElement) {
	// 			targetElement.scrollIntoView({ behavior: "smooth" });
	// 		}
	// 	}, 300);
	// };
	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault(); // Prevent default anchor behavior
		const target = document.querySelector((e.target as HTMLAnchorElement).getAttribute("href"));
		if (target) {
			window.scrollTo({
				top: target.offsetTop,
				behavior: "smooth",
			});
		}
	};

	return (
		<>
			<div className="navBar" id="navBar">
				<div className="headerContents">
					<div className="content1 aboutNav">
						<a href="#mainIntro">ABOUT</a>
					</div>
					<div className="content1">
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4C9.06087 4 10.0783 4.42143 10.8284 5.17157C11.5786 5.92172 12 6.93913 12 8C12 9.06087 11.5786 10.0783 10.8284 10.8284C10.0783 11.5786 9.06087 12 8 12C6.93913 12 5.92172 11.5786 5.17157 10.8284C4.42143 10.0783 4 9.06087 4 8ZM8 5.5C7.33696 5.5 6.70107 5.76339 6.23223 6.23223C5.76339 6.70107 5.5 7.33696 5.5 8C5.5 8.66304 5.76339 9.29893 6.23223 9.76777C6.70107 10.2366 7.33696 10.5 8 10.5C8.66304 10.5 9.29893 10.2366 9.76777 9.76777C10.2366 9.29893 10.5 8.66304 10.5 8C10.5 7.33696 10.2366 6.70107 9.76777 6.23223C9.29893 5.76339 8.66304 5.5 8 5.5Z"
								fill="white"
							/>
						</svg>
					</div>
					<div className="content1">
						<a href="#projects">PROJECTS</a>
					</div>
					<div className="content1">
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4C9.06087 4 10.0783 4.42143 10.8284 5.17157C11.5786 5.92172 12 6.93913 12 8C12 9.06087 11.5786 10.0783 10.8284 10.8284C10.0783 11.5786 9.06087 12 8 12C6.93913 12 5.92172 11.5786 5.17157 10.8284C4.42143 10.0783 4 9.06087 4 8ZM8 5.5C7.33696 5.5 6.70107 5.76339 6.23223 6.23223C5.76339 6.70107 5.5 7.33696 5.5 8C5.5 8.66304 5.76339 9.29893 6.23223 9.76777C6.70107 10.2366 7.33696 10.5 8 10.5C8.66304 10.5 9.29893 10.2366 9.76777 9.76777C10.2366 9.29893 10.5 8.66304 10.5 8C10.5 7.33696 10.2366 6.70107 9.76777 6.23223C9.29893 5.76339 8.66304 5.5 8 5.5Z"
								fill="white"
							/>
						</svg>
					</div>
					<div className="content1">
						<a href="#navBar">
							<img className="logo" src="/logobg.png" alt="" />
						</a>
					</div>
					<div className="content1">
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4C9.06087 4 10.0783 4.42143 10.8284 5.17157C11.5786 5.92172 12 6.93913 12 8C12 9.06087 11.5786 10.0783 10.8284 10.8284C10.0783 11.5786 9.06087 12 8 12C6.93913 12 5.92172 11.5786 5.17157 10.8284C4.42143 10.0783 4 9.06087 4 8ZM8 5.5C7.33696 5.5 6.70107 5.76339 6.23223 6.23223C5.76339 6.70107 5.5 7.33696 5.5 8C5.5 8.66304 5.76339 9.29893 6.23223 9.76777C6.70107 10.2366 7.33696 10.5 8 10.5C8.66304 10.5 9.29893 10.2366 9.76777 9.76777C10.2366 9.29893 10.5 8.66304 10.5 8C10.5 7.33696 10.2366 6.70107 9.76777 6.23223C9.29893 5.76339 8.66304 5.5 8 5.5Z"
								fill="white"
							/>
						</svg>
					</div>
					<div className="content1">
						<a href="#asymSection">SERVICES</a>
					</div>
					<div className="content1">
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4C9.06087 4 10.0783 4.42143 10.8284 5.17157C11.5786 5.92172 12 6.93913 12 8C12 9.06087 11.5786 10.0783 10.8284 10.8284C10.0783 11.5786 9.06087 12 8 12C6.93913 12 5.92172 11.5786 5.17157 10.8284C4.42143 10.0783 4 9.06087 4 8ZM8 5.5C7.33696 5.5 6.70107 5.76339 6.23223 6.23223C5.76339 6.70107 5.5 7.33696 5.5 8C5.5 8.66304 5.76339 9.29893 6.23223 9.76777C6.70107 10.2366 7.33696 10.5 8 10.5C8.66304 10.5 9.29893 10.2366 9.76777 9.76777C10.2366 9.29893 10.5 8.66304 10.5 8C10.5 7.33696 10.2366 6.70107 9.76777 6.23223C9.29893 5.76339 8.66304 5.5 8 5.5Z"
								fill="white"
							/>
						</svg>
					</div>
					<div className="content1">
						<a className="contactBtn" href="#contact">
							<button>CONTACT</button>
						</a>
					</div>
				</div>
				<div className="mobContents">
					<div className="InsideMobContents">
						<div>
							<a href="#navBar">
								<img className="logo" src="/logobg.png" alt="" />
							</a>
						</div>
						<div>
							<svg
								onClick={toggleDropdown}
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M3 17H21M3 12H21M3 7H21"
									stroke="#E0E0E0"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
					</div>
					{/* Dropdown menu */}

					{isOpen && (
						<div className={`dropdownMenu ${animationClass}`}>
							<ul>
								<li>
									<a
										href="#mainIntro"
										onClick={(e) => handleLinkClick(e, "mainIntro")}
									>
										ABOUT
									</a>
								</li>
								<li>
									<a
										href="#projects"
										onClick={(e) => handleLinkClick(e, "projects")}
									>
										PROJECTS
									</a>
								</li>
								<li>
									<a
										href="#asymSection"
										onClick={(e) => handleLinkClick(e, "asymSection")}
									>
										SERVICES
									</a>
								</li>
								<li>
									<a
										href="#contact"
										onClick={(e) => handleLinkClick(e, "contact")}
									>
										CONTACT
									</a>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Header;
