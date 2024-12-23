import ContactForm from "../contactForm/ContactForm";
import Asym from "./asymSection";
// import Asym from "./asymSection";
import "./mainPage.css";
import Projectcard from "./projectCard";

function Mainpage() {
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
							Hello! I'm a passionate Web Developer with a knack for creating
							visually appealing and user-friendly websites. With a strong
							foundation in HTML, CSS, and JavaScript, along with hands-on
							experience in frameworks like React, I thrive on developing
							responsive and engaging digital experiences. My journey in web
							development began with internships in UI/UX and web design, where
							I honed my skills in crafting intuitive interfaces and seamless
							user experiences. Currently, I work at Techmind Solutions, where I
							contribute to building dynamic web solutions that make a lasting
							impact.
						</div>
						<div className="section2">
							When I’m not coding, you’ll find me exploring new creative outlets
							or hitting the open road on my motorcycle. As a motorcycle
							enthusiast, I enjoy capturing and blending my love for technology
							and the outdoors. This passion for storytelling and attention to
							detail inspires my approach to design, whether it’s crafting a
							polished website or refining the smallest UI elements. I believe
							in constantly challenging myself to grow, learn, and create
							solutions that leave a lasting impression.
						</div>
					</div>
				</div>
				<div className="asymSection" id="asymSection">
					<Asym />
				</div>
				<div className="projects" id="projects">
					<h2>PROJECTS</h2>
					<Projectcard/>
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
						<ContactForm />
						<div className="rightSide">
							<h3>CONTACT ME</h3>
							<div className="contactDetails">
								<div className="row1">
									<svg
										width="40"
										height="32"
										viewBox="0 0 40 32"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M6.4165 0.416748H33.4998C35.1574 0.416748 36.7472 1.07523 37.9193 2.24733C39.0914 3.41943 39.7498 5.00914 39.7498 6.66675V25.4167C39.7498 27.0744 39.0914 28.6641 37.9193 29.8362C36.7472 31.0083 35.1574 31.6667 33.4998 31.6667H6.4165C4.7589 31.6667 3.16919 31.0083 1.99709 29.8362C0.824984 28.6641 0.166504 27.0744 0.166504 25.4167V6.66675C0.166504 5.00914 0.824984 3.41943 1.99709 2.24733C3.16919 1.07523 4.7589 0.416748 6.4165 0.416748ZM6.4165 2.50008C5.37484 2.50008 4.45817 2.85425 3.74984 3.47925L19.9582 13.9584L36.1665 3.47925C35.4582 2.85425 34.5415 2.50008 33.4998 2.50008H6.4165ZM19.9582 16.4792L2.52067 5.16675C2.354 5.62508 2.24984 6.14591 2.24984 6.66675V25.4167C2.24984 26.5218 2.68882 27.5816 3.47023 28.363C4.25163 29.1444 5.31143 29.5834 6.4165 29.5834H33.4998C34.6049 29.5834 35.6647 29.1444 36.4461 28.363C37.2275 27.5816 37.6665 26.5218 37.6665 25.4167V6.66675C37.6665 6.14591 37.5623 5.62508 37.3957 5.16675L19.9582 16.4792Z"
											fill="#0D0D0D"
										/>
									</svg>
									<p>info.sarthak@gmail.com</p>
								</div>
								<div className="row1">
									<svg
										width="50"
										height="50"
										viewBox="0 0 50 50"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M40.6248 45.8333C41.4536 45.8333 42.2485 45.5041 42.8345 44.918C43.4206 44.332 43.7498 43.5371 43.7498 42.7083V35.4167C43.7498 34.5879 43.4206 33.793 42.8345 33.207C42.2485 32.6209 41.4536 32.2917 40.6248 32.2917C38.1873 32.2917 35.7915 31.9167 33.4998 31.1458C32.9519 30.9729 32.3671 30.9533 31.8089 31.0892C31.2507 31.2251 30.7403 31.5113 30.3332 31.9167L27.3332 34.9167C22.1503 32.0884 17.8906 27.8287 15.0623 22.6458L18.0415 19.6667C18.8957 18.8542 19.2082 17.6458 18.8332 16.4792C18.0832 14.2083 17.7082 11.8125 17.7082 9.375C17.7082 8.5462 17.3789 7.75134 16.7929 7.16529C16.2068 6.57924 15.412 6.25 14.5832 6.25H7.2915C6.4627 6.25 5.66785 6.57924 5.0818 7.16529C4.49574 7.75134 4.1665 8.5462 4.1665 9.375C4.1665 29.4792 20.5207 45.8333 40.6248 45.8333ZM7.2915 8.33333H14.5832C14.8594 8.33333 15.1244 8.44308 15.3197 8.63843C15.5151 8.83378 15.6248 9.09873 15.6248 9.375C15.6248 12.0417 16.0415 14.6458 16.854 17.125C16.9582 17.4167 16.9373 17.8333 16.604 18.1667L12.4998 22.25C15.9373 28.9792 20.979 34.0208 27.729 37.5L31.7915 33.3958C32.0832 33.1042 32.479 33.0208 32.854 33.125C35.354 33.9583 37.9582 34.375 40.6248 34.375C40.9011 34.375 41.1661 34.4847 41.3614 34.6801C41.5568 34.8754 41.6665 35.1404 41.6665 35.4167V42.7083C41.6665 42.9846 41.5568 43.2496 41.3614 43.4449C41.1661 43.6403 40.9011 43.75 40.6248 43.75C21.6665 43.75 6.24984 28.3333 6.24984 9.375C6.24984 9.09873 6.35958 8.83378 6.55493 8.63843C6.75028 8.44308 7.01524 8.33333 7.2915 8.33333Z"
											fill="#0D0D0D"
										/>
									</svg>

									<p>info.sarthak@gmail.com</p>
								</div>
								<div className="row1">
									<svg
										width="50"
										height="50"
										viewBox="0 0 50 50"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M38.4167 6.375H11.5833C10.2032 6.37885 8.88066 6.92882 7.90474 7.90474C6.92882 8.88066 6.37885 10.2032 6.375 11.5833V38.4167C6.37885 39.7968 6.92882 41.1194 7.90474 42.0953C8.88066 43.0712 10.2032 43.6212 11.5833 43.625H38.4167C39.798 43.625 41.1228 43.0763 42.0995 42.0995C43.0763 41.1228 43.625 39.798 43.625 38.4167V11.5833C43.625 10.202 43.0763 8.87724 42.0995 7.90049C41.1228 6.92373 39.798 6.375 38.4167 6.375ZM41.5417 38.4167C41.5362 39.2438 41.2052 40.0355 40.6203 40.6203C40.0355 41.2052 39.2438 41.5362 38.4167 41.5417H11.5833C10.7562 41.5362 9.96453 41.2052 9.37966 40.6203C8.79479 40.0355 8.46379 39.2438 8.45833 38.4167V11.5833C8.46379 10.7562 8.79479 9.96453 9.37966 9.37966C9.96453 8.79479 10.7562 8.46379 11.5833 8.45833H38.4167C39.2438 8.46379 40.0355 8.79479 40.6203 9.37966C41.2052 9.96453 41.5362 10.7562 41.5417 11.5833V38.4167Z"
											fill="#0D0D0D"
										/>
										<path
											d="M13.2832 22.3917C13.2832 21.8391 13.5027 21.3092 13.8934 20.9185C14.2841 20.5278 14.814 20.3083 15.3665 20.3083C15.9191 20.3083 16.449 20.5278 16.8397 20.9185C17.2304 21.3092 17.4499 21.8391 17.4499 22.3917V35.9333C17.4499 36.4859 17.2304 37.0158 16.8397 37.4065C16.449 37.7972 15.9191 38.0167 15.3665 38.0167C14.814 38.0167 14.2841 37.7972 13.8934 37.4065C13.5027 37.0158 13.2832 36.4859 13.2832 35.9333V22.3917Z"
											fill="#0D0D0D"
										/>
										<path
											d="M15.3665 16.1332C16.5171 16.1332 17.4499 15.2005 17.4499 14.0499C17.4499 12.8993 16.5171 11.9666 15.3665 11.9666C14.2159 11.9666 13.2832 12.8993 13.2832 14.0499C13.2832 15.2005 14.2159 16.1332 15.3665 16.1332Z"
											fill="#0D0D0D"
										/>
										<path
											d="M36.7085 27.8542V35.9375C36.7085 36.49 36.489 37.0199 36.0983 37.4106C35.7076 37.8013 35.1777 38.0208 34.6252 38.0208C34.0726 38.0208 33.5427 37.8013 33.152 37.4106C32.7613 37.0199 32.5418 36.49 32.5418 35.9375V27.8542C32.5418 26.9618 32.1873 26.106 31.5564 25.475C30.9254 24.8441 30.0696 24.4896 29.1772 24.4896C28.2849 24.4896 27.4291 24.8441 26.7981 25.475C26.1671 26.106 25.8127 26.9618 25.8127 27.8542V35.9375C25.8127 36.49 25.5932 37.0199 25.2025 37.4106C24.8118 37.8013 24.2819 38.0208 23.7293 38.0208C23.1768 38.0208 22.6469 37.8013 22.2562 37.4106C21.8655 37.0199 21.646 36.49 21.646 35.9375V22.3958C21.6546 21.846 21.8768 21.3211 22.2657 20.9322C22.6545 20.5433 23.1795 20.3211 23.7293 20.3125C24.0822 20.3028 24.4311 20.3887 24.7392 20.5611C25.0472 20.7335 25.303 20.9859 25.4793 21.2917C26.6249 20.6424 27.9208 20.3053 29.2375 20.314C30.5543 20.3227 31.8456 20.677 32.9825 21.3414C34.1193 22.0058 35.0618 22.957 35.7157 24.0999C36.3696 25.2429 36.7119 26.5374 36.7085 27.8542Z"
											fill="#0D0D0D"
										/>
									</svg>

									<p>info.sarthak@gmail.com</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Mainpage;
