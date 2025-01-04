// ContactForm.tsx
import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contactform.css";
// Define the types for form data and errors
interface FormData {
	fullName: string;
	email: string;
	message: string;
}

interface FormErrors {
	fullName: string;
	email: string;
	message: string;
}

const ContactForm: React.FC = () => {
	// Define state with types
	const [formData, setFormData] = useState<FormData>({
		fullName: "",
		email: "",
		message: "",
	});

	const [errors, setErrors] = useState<FormErrors>({
		fullName: "",
		email: "",
		message: "",
	});

	const form = useRef<HTMLFormElement | null>(null);

	interface EmailJSResponseStatus {
		text: string;
	}

	const sendEmail = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(form.current);
		if (!form.current) return;
		emailjs
			.sendForm(
				"service_o1v4dll",
				"template_fneo06m",
				form.current as HTMLFormElement,
				{
					publicKey: "pwY_zEPyNwhKSPxBt",
				}
			)
			.then(
				() => {
					console.log("SUCCESS!");
				},
				(error: EmailJSResponseStatus) => {
					console.log("FAILED...", error.text);
				}
			);
	};

	// Handle input changes
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Validate form data
	const validateForm = (): boolean => {
		let isValid = true;
		const newErrors: FormErrors = { fullName: "", email: "", message: "" };

		if (!formData.fullName) {
			newErrors.fullName = "Name is required";
			isValid = false;
		}
		if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Valid email is required";
			isValid = false;
		}
		if (!formData.message) {
			newErrors.message = "Message cannot be empty";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	// Handle form submission
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			sendEmail(e as FormEvent<HTMLFormElement>);
			console.log("Form submitted:", formData);
			setFormData({
				fullName: "",
				email: "",
				message: "",
			});
			alert("Form submitted successfully!");
		}
	};

	return (
		<form onSubmit={handleSubmit} ref={form}>
			<div className="leftSide">
				<div className="formLbInp normaltext">
					<label htmlFor="fullName">
						Name <span className="req">*</span>
					</label>
					<input
						type="text"
						name="fullName"
						id="fullName"
						value={formData.fullName}
						onChange={handleChange}
					/>
					{errors.fullName && <p className="error">{errors.fullName}</p>}
				</div>

				<div className="formLbInp normaltext">
					<label htmlFor="email">
						Email <span className="req">*</span>
					</label>
					<input
						type="email"
						name="email"
						id="email"
						value={formData.email}
						onChange={handleChange}
					/>
					{errors.email && <p className="error">{errors.email}</p>}
				</div>

				<div className="formLbInp normaltext">
					<label htmlFor="message">Message</label>
					<textarea
						name="message"
						id="message"
						value={formData.message}
						onChange={handleChange}
					></textarea>
					{errors.message && <p className="error">{errors.message}</p>}
				</div>
				<div className="formBtn ">
					<button className="submitBtn normaltext" type="submit">
						Send
					</button>
				</div>
			</div>
		</form>
	);
};

export default ContactForm;
