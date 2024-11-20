import "./header.css";

function Header() {
	console.log("header loaded");
	return (
		<header>
			<div className="navBar" id="navBar">
				<div className="contents">
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
							<img className="logo" src="/sslogo.png" alt="SS" />
						</a>
					</div>
					<div className="content1">.</div>
					<div className="content1">
						<a href="#asymSection">SERVICES</a>
					</div>
					<div className="content1">.</div>
					<div className="content1">
						<a className="contactBtn" href="#contact">
							CONTACT
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
