import React from 'react';
import { Reveal } from './Reveal';
import { motion } from 'framer-motion';
import { Code, Laptop, Bot } from 'lucide-react';

const About = () => {
    return (
        <section className="section" id="about">
            <motion.h2
                initial={{ opacity: 0, x: -50, y: 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                className="section-title text-center"
            >
                About Me
            </motion.h2>
            <Reveal direction="right">
                <div className="about-content">
                    <p className="about-text">
                        I am a driven <span className="text-highlight">1st Year Computer Engineering Student</span> at <strong className="text-primary">Coding Gita x Swaminarayan University</strong>, passionate about translating logic into creative digital experiences.
                    </p>
                    <p className="about-text">
                        I focus more on <strong>building things</strong> than just learning theory. I work with <span className="text-highlight">HTML, CSS, JavaScript, React, and MongoDB</span>, and I enjoy turning simple ideas into functional web applications. I’ve built multiple projects while learning <strong>Full-Stack Development</strong>, where I focused on clean code, proper structure, and real-world use cases rather than just UI.
                    </p>
                    <p className="about-text">
                        I’m currently looking for <strong>Internship or Entry-level Opportunities</strong> where I can improve my skills, contribute to real projects, and grow as a developer by working with experienced teams.
                    </p>

                    <div className="about-stats">
                        <div className="stat-box">
                            <Code className="stat-icon" size={32} />
                            <h3>500+</h3>
                            <p>Hours of Coding</p>
                        </div>
                        <div className="stat-box">
                            <Laptop className="stat-icon" size={32} />
                            <h3>20+</h3>
                            <p>Projects Built</p>
                        </div>
                        <div className="stat-box">
                            <Bot className="stat-icon" size={32} />
                            <h3>AI-Driven</h3>
                            <p>Efficient Workflow</p>
                        </div>
                    </div>

                </div>
            </Reveal>
        </section >
    );
};

export default About;
