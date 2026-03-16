import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Download, FileText, ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { motion } from 'framer-motion';

const Resume = () => {
    return (
        <section className="section resume-section" id="resume">
            <Reveal width="100%">
                <div className="section-header resume-header">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title text-center"
                    >
                        My Resume
                    </motion.h2>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline download-btn"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', width: 'max-content', margin: '0 auto 40px auto' }}
                    >
                        <Download size={18} />
                        Download PDF
                    </a>
                </div>

                <div className="resume-container">
                    {/* LEFT COLUMN: Profile & Contact */}
                    <div className="resume-sidebar">
                        <div className="resume-profile">
                            <img src="/profile.png" alt="Jilan Mansuri Profile" className="resume-img" />
                            <h3 className="resume-name">Jilan Mansuri</h3>
                            <p className="resume-title text-primary">Full-Stack Developer</p>
                        </div>

                        <div className="resume-contact-info">
                            <div className="resume-contact-item">
                                <Mail size={16} className="text-primary" />
                                <span>jilan2410@gmail.com</span>
                            </div>
                            <div className="resume-contact-item">
                                <Phone size={16} className="text-primary" />
                                <span>+91 7984088939</span>
                            </div>
                            <div className="resume-contact-item">
                                <MapPin size={16} className="text-primary" />
                                <span>Gujarat, India</span>
                            </div>
                        </div>

                        <div className="resume-skills-sidebar">
                            <h4 className="resume-sidebar-title">Core Skills</h4>
                            <div className="resume-skill-tags">
                                <span>React.js</span>
                                <span>Node.js</span>
                                <span>Express.js</span>
                                <span>MongoDB</span>
                                <span>Tailwind CSS</span>
                                <span>JavaScript</span>
                                <span>HTML & CSS</span>
                                <span>Git</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Content */}
                    <div className="resume-main-content">
                        {/* Summary */}
                        <div className="resume-block">
                            <div className="resume-block-header">
                                <FileText className="text-primary" size={24} />
                                <h3>Professional Summary</h3>
                            </div>
                            <p className="resume-text">
                                Highly motivated 1st Year Computer Engineering Student passionate about building full-stack web applications. Dedicated to writing clean logic and crafting seamless user experiences using modern technologies like React and MongoDB. Strong track record of translating complex problems into robust web-based solutions and continuously expanding skills to build scalable software architectures.
                            </p>
                        </div>

                        {/* Education */}
                        <div className="resume-block">
                            <div className="resume-block-header">
                                <div className="icon-box-small">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM12 12.8L4.34 8.6L12 4.4L19.66 8.6L12 12.8Z" fill="#f97316" />
                                        <path d="M4 11.4V16C4 18.06 7.58 19.85 12 20.32V18.29C8.36 17.85 6 16.52 6 16V12.49L4 11.4Z" fill="#f97316" />
                                    </svg>
                                </div>
                                <h3>Education</h3>
                            </div>

                            <div className="resume-item">
                                <div className="resume-item-header">
                                    <h4>Bachelor of Computer Engineering</h4>
                                    <span className="resume-date text-primary">2023 - Present</span>
                                </div>
                                <p className="resume-company">Coding Gita x Swaminarayan University</p>
                                <ul className="resume-list">
                                    <li><ChevronRight size={14} className="text-primary" /> Focus on modern Web Development stack (MERN).</li>
                                    <li><ChevronRight size={14} className="text-primary" /> Active involvement in building 20+ functional projects.</li>
                                    <li><ChevronRight size={14} className="text-primary" /> Gaining hands-on experience in competitive programming and system logic.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Projects / Experience */}
                        <div className="resume-block">
                            <div className="resume-block-header">
                                <div className="icon-box-small">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2.01 6.9 2.01 8L2 19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z" fill="#f97316" />
                                    </svg>
                                </div>
                                <h3>Key Projects / Experience</h3>
                            </div>

                            <div className="resume-item">
                                <div className="resume-item-header">
                                    <h4>Full-Stack Project Development</h4>
                                    <span className="resume-date text-primary">500+ Hours</span>
                                </div>
                                <p className="resume-company">Independent Work</p>
                                <ul className="resume-list">
                                    <li><ChevronRight size={14} className="text-primary" /> Developed robust front-end interfaces utilizing React.js, focusing proactively on responsive design parameters and animations.</li>
                                    <li><ChevronRight size={14} className="text-primary" /> Integrated REST APIs and designed database schemas in MongoDB for dynamic data handling.</li>
                                    <li><ChevronRight size={14} className="text-primary" /> Prioritized efficient code architecture and clean structure rather than solely UI layout.</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </Reveal>
        </section>
    );
};

export default Resume;
