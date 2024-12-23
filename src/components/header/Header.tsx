import "./header.css";

function Header() {
	console.log("header loaded");
	return (
		<>
			<div className="navBar" id="navBar">
				<div className="headerContents">
					<div className="content1">
						<a href="#mainIntro">ABOUT</a>
					</div>
					<div className="content1">.</div>
					<div className="content1">
						<a href="#projects">PROJECTS</a>
					</div>
					<div className="content1">.</div>
					<div className="content1">
						<a href="#navBar">
							<img className="logo" src="/logobg.png" alt="" />
						</a>
					</div>
					<div className="content1">.</div>
					<div className="content1">
						<a href="#asymSection">SERVICES</a>
					</div>
					<div className="content1">.</div>
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
				</div>
			</div>
		</>
	);
}

export default Header;
