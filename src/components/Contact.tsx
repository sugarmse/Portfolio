import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';
import { useInView } from '../hooks/useInView';
import './Contact.css';

interface FormState { fullName: string; email: string; message: string; }
interface Errors    { fullName: string; email: string; message: string; }

const CONTACT_INFO = [
  {
    label: 'Email',
    value: 'info.sarthakshakya@gmail.com',
    href: 'mailto:info.sarthakshakya@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+977-9865375938',
    href: 'tel:+9779865375938',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/sugarmse',
    href: 'https://github.com/sugarmse',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const [ref, inView] = useInView<HTMLElement>();
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm]       = useState<FormState>({ fullName: '', email: '', message: '' });
  const [errors, setErrors]   = useState<Errors>({ fullName: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name as keyof Errors]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = (): boolean => {
    const e: Errors = { fullName: '', email: '', message: '' };
    let ok = true;
    if (!form.fullName.trim())                   { e.fullName = 'Name is required'; ok = false; }
    if (!/\S+@\S+\.\S+/.test(form.email))        { e.email   = 'Valid email required'; ok = false; }
    if (!form.message.trim())                    { e.message = 'Message cannot be empty'; ok = false; }
    setErrors(e);
    return ok;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || !formRef.current) return;
    setSending(true);
    emailjs.sendForm('service_o1v4dll', 'template_fneo06m', formRef.current, { publicKey: 'pwY_zEPyNwhKSPxBt' })
      .finally(() => { setSending(false); setSent(true); setForm({ fullName: '', email: '', message: '' }); });
  };

  return (
    <section className="contact-section" id="contact" ref={ref}>
      <div className="container">
        <div className={`contact-grid${inView ? ' in-view' : ''}`}>

          {/* ── Left: form ── */}
          <div className="contact-form-col fade-up">
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Let&apos;s Work Together</h2>
            <div className="section-divider" />
            <p className="contact-desc">
              Have a project in mind or just want to say hello? Fill in the form
              and I'll get back to you as soon as possible.
            </p>

            {sent ? (
              <div className="contact-success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <div>
                  <strong>Message sent!</strong>
                  <p>Thanks for reaching out. I'll be in touch soon.</p>
                </div>
                <button className="btn btn-ghost" style={{ marginTop: '1rem' }} onClick={() => setSent(false)}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} ref={formRef} noValidate>
                <div className={`field${errors.fullName ? ' has-error' : ''}`}>
                  <input
                    type="text" name="fullName" id="f-name" placeholder=" "
                    value={form.fullName} onChange={handleChange}
                    autoComplete="name"
                  />
                  <label htmlFor="f-name">Your Name <span>*</span></label>
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>

                <div className={`field${errors.email ? ' has-error' : ''}`}>
                  <input
                    type="email" name="email" id="f-email" placeholder=" "
                    value={form.email} onChange={handleChange}
                    autoComplete="email"
                  />
                  <label htmlFor="f-email">Email Address <span>*</span></label>
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className={`field field-textarea${errors.message ? ' has-error' : ''}`}>
                  <textarea
                    name="message" id="f-msg" placeholder=" " rows={5}
                    value={form.message} onChange={handleChange}
                  />
                  <label htmlFor="f-msg">Your Message <span>*</span></label>
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary contact-submit" disabled={sending}>
                  {sending ? (
                    <>
                      <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Right: contact info ── */}
          <div className="contact-info-col fade-up" style={{ transitionDelay: '0.2s' }}>
            <div className="contact-info-card">
              <h3>Contact Details</h3>
              <div className="info-list">
                {CONTACT_INFO.map(item => (
                  <a key={item.label} href={item.href} className="info-item"
                     target={item.href.startsWith('http') ? '_blank' : undefined}
                     rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    <div className="info-icon">{item.icon}</div>
                    <div className="info-text">
                      <span className="info-label">{item.label}</span>
                      <span className="info-value">{item.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
