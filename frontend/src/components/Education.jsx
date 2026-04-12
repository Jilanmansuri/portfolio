import React, { useRef, useEffect } from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";


const Education = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const educationData = [
        {
            id: 1,
            title: "Computer Engineering",
            institution: "Swaminaryan University",
            location: "Kalol, Gujarat, India",
            date: "2025 - 2029",
            grade: "9.33",
            description: [
                "Pursuing Bachelor of Engineering in Computer Science",
                "Building a strong foundation in full-stack development and software engineering",
                "Proficient in HTML, CSS, JavaScript, React, Node.js, and MongoDB",
                "Focusing on advanced web technologies and problem-solving skills"
            ],
            icon: <GraduationCap size={20} />,
            color: "var(--primary)" // Orange
        }
    ];

    return (
        <section className="section education-section" id="education" ref={ref}>
            <motion.h2
                initial={{ opacity: 0, x: -50, y: 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                className="section-title text-center"
            >
                My Education
            </motion.h2>

            <div className={`timeline-container ${educationData.length === 1 ? 'single-item' : ''}`}>
                {/* Central Line - Only if more than 1 item */}
                {educationData.length > 1 && <div className="timeline-line"></div>}

                {educationData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className={`timeline-item ${educationData.length === 1 ? 'centered' : (index % 2 === 0 ? 'left' : 'right')}`}
                        variants={{
                            hidden: { opacity: 0, x: educationData.length === 1 ? 0 : (index % 2 === 0 ? -50 : 50), y: educationData.length === 1 ? 50 : 0 },
                            visible: { opacity: 1, x: 0, y: 0 }
                        }}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <div className="timeline-dot" style={{ borderColor: item.color, boxShadow: `0 0 15px ${item.color}` }}>
                            <div className="dot-inner" style={{ background: item.color }}></div>
                        </div>

                        <div className="timeline-content" style={{ borderTop: `3px solid ${item.color}` }}>

                            <div className="edu-icon-large" style={{ color: item.color, background: `rgba(255,255,255,0.05)` }}>
                                {item.icon}
                            </div>

                            <div className="edu-text-content">
                                <div className="edu-header">
                                    <h3 style={{ color: item.color }}>{item.title}</h3>
                                    <div className="edu-institution">
                                        <span>{item.institution}</span>
                                    </div>

                                    <div className="edu-card-layout">
                                        <div className="edu-loc-box">
                                            <MapPin size={24} className="edu-icon-main" />
                                            <span className="edu-loc-text">{item.location}</span>
                                        </div>

                                        <div className="edu-info-divider"></div>

                                        <div className="edu-stats-grid">
                                            <div className="edu-stat-box">
                                                <Calendar size={22} className="edu-icon-sub" />
                                                <div className="edu-stat-details">
                                                    <span className="edu-stat-val">{item.date}</span>
                                                </div>
                                            </div>

                                            <div className="edu-v-divider"></div>

                                            <div className="edu-stat-box">
                                                <Award size={22} className="edu-icon-sub" />
                                                <div className="edu-stat-details">
                                                    <div className="edu-stat-val">
                                                        <span className="edu-stat-label">CGPA:</span>
                                                        <span className="highlight"> {item.grade} / 10</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <ul className="edu-description">
                                    {item.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Education;


