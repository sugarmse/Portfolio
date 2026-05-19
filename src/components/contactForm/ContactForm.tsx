import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contactform.css";

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

	const [submitted, setSubmitted] = useState(false);
	const [sending, setSending] = useState(false);

	const form = useRef<HTMLFormElement | null>(null);

	const sendEmail = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!form.current) return;
		setSending(true);
		emailjs
			.sendForm(
				"service_o1v4dll",
				"template_fneo06m",
				form.current as HTMLFormElement,
				{ publicKey: "pwY_zEPyNwhKSPxBt" }
			)
			.then(
				() => {
					setSending(false);
					setSubmitted(true);
				},
				() => {
					setSending(false);
					setSubmitted(true);
				}
			);
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = (): boolean => {
		let isValid = true;
		const newErrors: FormErrors = { fullName: "", email: "", message: "" };

		if (!formData.fullName.trim()) {
			newErrors.fullName = "Name is required";
			isValid = false;
		}
		if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Valid email is required";
			isValid = false;
		}
		if (!formData.message.trim()) {
			newErrors.message = "Message cannot be empty";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			sendEmail(e as FormEvent<HTMLFormElement>);
			setFormData({ fullName: "", email: "", message: "" });
		}
	};

	if (submitted) {
		return (
			<div className="leftSide formSuccessWrapper">
				<div className="formSuccess">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: "middle", marginRight: "8px" }}>
						<path d="M10 1.667A8.333 8.333 0 1 0 10 18.333 8.333 8.333 0 0 0 10 1.667Zm3.821 6.07-4.584 4.584a.833.833 0 0 1-1.178 0L6.18 10.44a.833.833 0 0 1 1.178-1.179l1.291 1.292 3.995-3.994a.833.833 0 1 1 1.178 1.178Z" fill="#81c784"/>
					</svg>
					Message sent! I'll get back to you soon.
				</div>
				<button
					className="submitBtn normaltext"
					style={{ marginTop: "1.5rem" }}
					onClick={() => setSubmitted(false)}
				>
					Send Another
				</button>
			</div>
		);
	}

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
					<label htmlFor="message">
						Message <span className="req">*</span>
					</label>
					<textarea
						name="message"
						id="message"
						value={formData.message}
						onChange={handleChange}
					></textarea>
					{errors.message && <p className="error">{errors.message}</p>}
				</div>

				<div className="formBtn">
					<button
						className="submitBtn normaltext"
						type="submit"
						disabled={sending}
					>
						{sending ? "Sending…" : "Send"}
					</button>
				</div>
			</div>
		</form>
	);
};

export default ContactForm;
