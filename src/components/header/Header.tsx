import "./header.css";

function Header() {
	console.log("header loaded");
	return (
		<header>
			<div className="navBar">
				<div className="contents">
					<div className="content1">ABOUT</div>
					<div className="content1">.</div>
					<div className="content1">PROJECTS</div>
					<div className="content1">.</div>
					<div className="content1">
						<img className="logo" src="/sslogo.png" alt="SS" />
					</div>
					<div className="content1">.</div>
					<div className="content1">SERVICES</div>
					<div className="content1">.</div>
					<div className="content1">CONTACT</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
