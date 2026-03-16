import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Mail, User, Phone, Briefcase, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { Reveal } from './Reveal';
import { motion } from 'framer-motion';

const Contact = () => {
    const [showToast, setShowToast] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const form = useRef();

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        const formElement = form.current;
        const formData = new FormData(formElement);

        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        try {
            const [emailResult, apiResponse] = await Promise.all([
                emailjs.sendForm('service_108623', 'template_5t1zekx', formElement, 'd7XlPrJpcnXHA9SHK'),
                fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }),
            ]);

            console.log("SUCCESS!", emailResult.text);

            if (!apiResponse.ok) {
                const errorData = await apiResponse.json().catch(() => ({}));
                console.error('Failed to save message:', errorData);
            }

            setShowToast(true);
            e.target.reset();
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.log("FAILED...", error);
            alert(`Failed to send message. Please check your internet connection or try again later.`);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <section className="section contact-section" id="contact">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title text-center"
                >
                    Contact Me
                </motion.h2>
                <Reveal width="100%">
                    <div className="contact-wrapper">

                        {/* Left: Contact Info */}
                        <div className="contact-info">
                            <div className="contact-header-left">
                                <div className="icon-box">
                                    <Send size={28} color="#f97316" />
                                </div>
                                <h2>Get in Touch</h2>
                                <p className="sub-text">
                                    Have a project in mind or just want to say hi?
                                    I’m always open to discussing new ideas.
                                </p>
                            </div>

                            <div className="contact-details">
                                <div className="contact-item">
                                    <Mail size={20} className="text-primary" />
                                    <a href="mailto:jilan2410@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>jilan2410@gmail.com</a>
                                </div>
                                <div className="contact-item">
                                    <Phone size={20} className="text-primary" />
                                    <a href="tel:7984088939" style={{ color: 'inherit', textDecoration: 'none' }}>7984088939</a>
                                </div>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <form ref={form} className="contact-form" onSubmit={handleContactSubmit}>
                            <div className="input-row">
                                <div className="input-group">
                                    <User size={18} className="input-icon" />
                                    <input type="text" name="name" placeholder="Your Name" required />
                                </div>
                                <div className="input-group">
                                    <Mail size={18} className="input-icon" />
                                    <input type="email" name="email" placeholder="Email Address" required />
                                </div>
                            </div>

                            <div className="input-group">
                                <Briefcase size={18} className="input-icon" />
                                <input type="text" name="subject" placeholder="Subject" required />
                            </div>

                            <div className="input-group textarea-group">
                                <textarea name="message" placeholder="Your Message..." required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary full-width" disabled={isSending}>
                                {isSending ? 'Sending...' : <>Send Message <ChevronRight size={18} /></>}
                            </button>
                        </form>

                    </div>
                </Reveal>
            </section>

            {/* Toast Notification */}
            {showToast && (
                <div className="toast-notification animate-slide-up">
                    <CheckCircle2 size={24} color="#22c55e" />
                    <div className="toast-content">
                        <h4>Message Sent!</h4>
                        <p>Thanks for reaching out. I'll get back to you soon.</p>
                    </div>
                    <button onClick={() => setShowToast(false)} className="toast-close">
                        <X size={18} />
                    </button>
                </div>
            )}
        </>
    );
};

export default Contact;
