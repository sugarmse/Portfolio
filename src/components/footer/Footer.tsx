import "./footer.css";
function Footer() {
	return (
		<>
			<div className="footer">
				<div className="sepa"></div>
				<div className="footerContents">
					<div className="footerContent1 copyRight normaltext">
						COPYRIGHT @ 2024 SARTHAK, ALL RIGHTS RESERVED.
					</div>
					<div className="footerLinks">
						<div className="footerContent1 mobSlash normaltext">|</div>
						<div className="footerContent1 normaltext">
							<a href="#navBar">HOME</a>
						</div>
						<div className="footerContent1 normaltext">|</div>
						<div className="footerContent1 normaltext">
							<a href="#mainIntro">ABOUT</a>
						</div>
						<div className="footerContent1 normaltext">|</div>
						<div className="footerContent1 normaltext">
							<a href="#projects">PROJECTS</a>
						</div>
						<div className="footerContent1 normaltext">|</div>
						<div className="footerContent1 normaltext">
							<a href="#contact">CONTACT</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Footer;
