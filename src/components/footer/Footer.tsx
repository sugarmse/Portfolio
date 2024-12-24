import "./footer.css";
function Footer() {
	return (
		<>
			<div className="footer">
				<div className="sepa"></div>
				<div className="footerContents">
					<div className="footerContent1 copyRight">
						COPYRIGHT @ 2024 SARTHAK, ALL RIGHTS RESERVED.
					</div>
					<div className="footerLinks">
						<div className="footerContent1 mobSlash">|</div>
						<div className="footerContent1">
							<a href="#navBar">HOME</a>
						</div>
						<div className="footerContent1">|</div>
						<div className="footerContent1">
							<a href="#mainIntro">ABOUT</a>
						</div>
						<div className="footerContent1">|</div>
						<div className="footerContent1">
							<a href="#projects">PROJECTS</a>
						</div>
						<div className="footerContent1">|</div>
						<div className="footerContent1">
							<a href="#contact">CONTACT</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Footer;
