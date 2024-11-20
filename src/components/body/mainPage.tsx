import "./mainPage.css";

function Mainpage() {
	console.log("uywdfgyuw");
	return (
		<>
			<div className="mainBox">
				<div className="banner" id="banner">
					<h1 className="bannerName">SARTHAK SHAKYA</h1>
					<div className="normaltext">UI / UX DESIGNER AND WEB DEVELOPER</div>
				</div>
				<div className="mainIntro" id="mainIntro">
					<div className="intro1">
						<h2>INTRODUCTION</h2>
					</div>
					<div className="intro2">
						<div className="section1">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Accusamus, amet. Lorem ipsum, dolor sit amet consectetur
							adipisicing elit. Accusamus, amet. Lorem ipsum, dolor sit amet
							consectetur adipisicing elit. Accusamus, amet. Lorem ipsum, dolor
							sit amet consectetur adipisicing elit. Accusamus, amet. Lorem
							ipsum dolor sit amet, consectetur adipisicing elit. Facilis
							consectetur, veritatis doloribus praesentium quibusdam molestias
							numquam corrupti veniam assumenda blanditiis.
						</div>
						<div className="section2">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,
							recusandae. Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Accusamus, amet. Lorem ipsum, dolor sit amet consectetur
							adipisicing elit. Accusamus, amet. Lorem ipsum, dolor sit amet
							consectetur adipisicing elit. Accusamus, amet. Lorem ipsum dolor
							sit, amet consectetur adipisicing elit. Beatae reiciendis earum
							optio consectetur magni. Tempora odit velit saepe sed doloremque?
						</div>
					</div>
				</div>
				<div className="asymSection" id="asymSection">
					<div className="column1">
						<div className="edu">
							<h2>EDUCATION</h2>
						</div>
						<div className="exp">
							<h2>EXPERIENCE</h2>
						</div>
					</div>
					<div className="column2">
						<div className="soft">
							<h2>SOFTWARES</h2>
						</div>
						<div className="skills">
							<h2>SKILLS</h2>
						</div>
						<div className="hobb">
							<h2>HOBBIES</h2>
						</div>
					</div>
					<div className="column3">
						<div className="resume">
							<h2>RESUME</h2>
						</div>
					</div>
				</div>
				<div className="projects" id="projects">
					<h2>PROJECTS</h2>
					<div className="projCards">
						<div className="card1">a</div>
						<div className="card1">a</div>
						<div className="card1">a</div>
						<div className="card1">a</div>
					</div>
				</div>
				<div className="contact" id="contact">
					<h2>I’D LOVE TO HEAR FROM YOU.</h2>
					<div className="subText">
						<div className="normaltext">
							LEAVE A MESSAGE BELOW, AND I’LL GET BACK TO YOU AS SOON AS
							POSSIBLE.
						</div>
					</div>

					<div className="contactForm">
						<div className="leftSide">
							<div className="formLbInp">
								<label htmlFor="fullName">
									Name <span className="req">*</span>
								</label>
								<input type="text" name="fullName" id="fullName" />
							</div>
							<div className="formLbInp">
								<label htmlFor="email">
									Email <span className="req">*</span>
								</label>
								<input type="email" name="email" id="email" />
							</div>
							<div className="formLbInp">
								<label htmlFor="message">Message</label>
								<textarea name="message" id="message"></textarea>
							</div>
						</div>
						<div className="rightSide">
							<h3>CONTACT ME</h3>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Mainpage;
