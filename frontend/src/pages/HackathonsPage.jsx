import React, { useEffect } from 'react';
import { Github, ExternalLink, Youtube, Calendar, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const hackathons = [
    {
        title: "ArtPark CodeForge",
        subtitle: "IISc, Bangalore",
        year: "2026",
        description: "Prototype Development Round of the ArtPark CodeForge Hackathon, organized by the Indian Institute of Science (IISc), Bangalore.",
        certificateImg: "/iis-cert.png",
        projectTitle: "SkillForge AI",
        projectDesc: "An AI-powered skill development platform designed to streamline learning paths through intelligent analysis and personalized roadmaps.",
        techStack: ["React", "Node.js", "AI API", "Tailwind"],
        github: "https://github.com/Jilanmansuri/Hack-Titans",
        demo: "https://skill-forge-ai-o8j4.vercel.app/",
        video: "https://youtu.be/1tZeN9hGZRo",
        color: "#10b981"
    },
    {
        title: "Doppleganger",
        subtitle: "OpenPools",
        year: "2026",
        description: "A collaborative 30-hour build sprint where teams transformed professional DNA into real-world solutions hosted on OpenPools.",
        certificateImg: "/openpools-cert.png",
        projectTitle: "FreelanceX",
        projectDesc: "A robust freelance marketplace and networking platform built with a focus on seamless connectivity and modern vector-based interactions.",
        techStack: ["React", "Express", "Node.js", "MongoDB", "AI API"],
        github: "https://github.com/abdulhaque2005/vector-minds",
        demo: "https://vector-minds.vercel.app/",
        video: "https://youtu.be/isdwJFdwx0Q?si=V8fTLB0OYzy6Zs9J",
        color: "#3b82f6"
    }
];

const HackathonsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', paddingBottom: '60px' }}>
            <SEO 
                title="Hackathons | Jilan Mansuri" 
                description="View my competitive hackathon projects, achievements, certificates, and innovative tech solutions." 
            />
            <section className="section" id="hackathons-page-content" style={{ paddingTop: '10px' }}>
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
                        {hackathons.map((hack, index) => (
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
                                    <div className="year-badge">
                                        <Calendar size={14} /> <span>{hack.year}</span>
                                    </div>
                                </div>

                                <p className="hack-main-desc">{hack.description}</p>

                                <div className="premium-hack-body">
                                    <div className="premium-hack-image-frame">
                                        <img src={hack.certificateImg} alt="Certificate" />
                                    </div>

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
                                            <a href={hack.github} target="_blank" rel="noopener noreferrer" className="hack-link hack-link-code">
                                                <Github size={18} /> Code
                                            </a>
                                            <a href={hack.demo} target="_blank" rel="noopener noreferrer" className="hack-link hack-link-demo">
                                                <ExternalLink size={18} /> Live
                                            </a>
                                            <a href={hack.video} target="_blank" rel="noopener noreferrer" className="hack-link hack-link-video">
                                                <Youtube size={18} /> Demo Video
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default HackathonsPage;
