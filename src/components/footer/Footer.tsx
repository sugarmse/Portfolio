import "./footer.css";
function Footer() {
	return (
		<>
			<div className="footer">
				<div className="sepa"></div>
				<div className="footerContents">
						<div className="content1 copyRight">
							COPYRIGHT @ 2024 SARTHAK, ALL RIGHTS RESERVED.
						</div>
						<div className="footerLinks">
							<div className="content1 mobSlash">|</div>
							<div className="content1">
								<a href="#navBar">HOME</a>
							</div>
							<div className="content1">|</div>
							<div className="content1">
								<a href="#mainIntro">ABOUT</a>
							</div>
							<div className="content1">|</div>
							<div className="content1">
								<a href="#projects">PROJECTS</a>
							</div>
							<div className="content1">|</div>
							<div className="content1">
								<a href="#contact">CONTACT</a>
							</div>
						</div>
				</div>
			</div>
		</>
	);
}
export default Footer;
