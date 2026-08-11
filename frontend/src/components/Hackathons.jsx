import React from 'react';
import { Github, ExternalLink, Youtube, Calendar, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const hackathons = [
    {
        title: "CodingGita HackSprint '26",
        subtitle: "CodingGita",
        year: "July 2026",
        description: "Secured 2nd Position out of numerous teams in this competitive hackathon. Built as part of TEAM RUNTIME REBELS.",
        certificateImg: "/hackspirit certificate 2nd-rank.png",
        projectTitle: "Digital Twin Autopilot 🚀",
        projectDesc: "A personal AI clone integrating with Telegram, Discord, and Gmail to automatically reply mimicking personal voice texture and slang using LangGraph and Temporal RAG.",
        techStack: ["Python", "Node.js", "React", "whatsapp-web.js"],
        github: "https://github.com/codinggita/runtimerebels",
        demo: "https://whatsapp-ai-murex.vercel.app/",
        video: "https://drive.google.com/drive/folders/14Nanf2SA5Y45Y4PFqpzxNu7honILnY1u?usp=sharing",
        color: "#eab308",
        achievement: "2nd Position"
    },
    {
        title: "Crafthon",
        subtitle: "Gandhinagar University",
        year: "April 2026",
        description: "A 36-hour national level university hackathon bringing together builders and innovators. Developed KrishiSaarthi AI to assist farmers with smart decisions.",
        certificateImg: "/crafthon.png",
        projectTitle: "KrishiSaarthi AI",
        projectDesc: "An intelligent farming assistant providing precise crop and fertilizer recommendations based on soil reports or simple questionnaires.",
        techStack: ["React", "Node.js", "Express", "CORS"],
        github: "https://github.com/Jilanmansuri/AstraX_Greentech",
        demo: "https://krishi-sarthi-ai.vercel.app",
        video: "https://www.youtube.com/watch?v=HOWHKVeituQ",
        color: "#16a34a",
        achievement: "Agriculture Tech Track"
    },
    {
        title: "ArtPark CodeForge",
        subtitle: "IISc, Bangalore",
        year: "March 2026",
        description: "Prototype Development Round of the ArtPark CodeForge Hackathon, organized by the Indian Institute of Science (IISc), Bangalore.",
        certificateImg: "/iis-cert.png",
        projectTitle: "SkillForge AI",
        projectDesc: "An AI-powered skill development platform designed to streamline learning paths through intelligent analysis and personalized roadmaps.",
        techStack: ["React", "Node.js", "AI API", "Tailwind"],
        github: "https://github.com/Jilanmansuri/Hack-Titans",
        demo: "https://skill-forge-ai-o8j4.vercel.app/",
        video: "https://youtu.be/1tZeN9hGZRo",
        color: "#10b981",
        achievement: "Prototype Round Qualifier"
    },
    {
        title: "Doppleganger",
        subtitle: "OpenPools",
        year: "December 2025",
        description: "A collaborative 30-hour build sprint where teams transformed professional DNA into real-world solutions hosted on OpenPools.",
        certificateImg: "/openpools-cert.png",
        projectTitle: "FreelanceX",
        projectDesc: "A robust freelance marketplace and networking platform built with a focus on seamless connectivity and modern vector-based interactions.",
        techStack: ["React", "Express", "Node.js", "MongoDB", "AI API"],
        github: "https://github.com/abdulhaque2005/vector-minds",
        demo: "https://vector-minds.vercel.app/",
        video: "https://youtu.be/isdwJFdwx0Q?si=V8fTLB0OYzy6Zs9J",
        color: "#3b82f6",
        achievement: "Collaborative Build Sprint"
    }
];

const Hackathons = ({ isHomePage = false }) => {
    const displayHackathons = isHomePage
        ? hackathons.filter(hack => hack.title !== "CodingGita HackSprint '26")
        : hackathons;

    return (
        <section className="section" id="hackathons">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '40px' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '50px' }}>
                    <h2 className="section-title text-center" style={{ marginBottom: 0, backgroundImage: 'linear-gradient(90deg, #ef4444, #f43f5e, #ec4899)' }}>Hackathon Participation</h2>
                </div>

                <div className="premium-hackathon-grid">
                    {displayHackathons.map((hack, index) => (
                        <motion.div
                            key={index}
                            className="premium-hackathon-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <div className="premium-hack-header">
                                <div className="header-left">
                                    <h3>{hack.title}</h3>
                                    <span className="subtitle" style={{ color: hack.color }}>{hack.subtitle}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div className="year-badge">
                                        <Calendar size={14} /> <span>{hack.year}</span>
                                    </div>

                                </div>
                            </div>

                            <p className="hack-main-desc">{hack.description}</p>

                            <div className={`premium-hack-body ${!hack.certificateImg ? 'no-image' : ''}`}>
                                {hack.certificateImg && (
                                    <div className="premium-hack-image-frame">
                                        <img src={hack.certificateImg} alt="Certificate" />
                                    </div>
                                )}

                                <div className="premium-hack-project-info">
                                    <div className="project-built-tag">
                                        <Code size={16} color={hack.color} />
                                        <span>PROJECT BUILT</span>
                                    </div>

                                    <h4>{hack.projectTitle}</h4>
                                    <p>{hack.projectDesc}</p>

                                    <div className="premium-hack-tech">
                                        {hack.techStack.map((tech, i) => (
                                            <span key={i} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>

                                    <div className="premium-hack-links">
                                        {hack.github && (
                                            <a href={hack.github} target="_blank" rel="noopener noreferrer" className="hack-link hack-link-code">
                                                <Github size={18} /> Code
                                            </a>
                                        )}
                                        {hack.demo && (
                                            <a href={hack.demo} target="_blank" rel="noopener noreferrer" className="hack-link hack-link-demo">
                                                <ExternalLink size={18} /> Live
                                            </a>
                                        )}
                                        {hack.video && (
                                            <a href={hack.video} target="_blank" rel="noopener noreferrer" className="hack-link hack-link-video">
                                                <Youtube size={18} /> Demo Video
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Hackathons;
