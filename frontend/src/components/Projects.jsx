import React from 'react';
import { Github, ExternalLink, Youtube, Users, Target, Lightbulb, Trophy, Calendar, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const mainProjects = [
    {
        title: "ScamShield",
        description: "AI-powered scam detection and analytics platform.",
        tags: ["React", "AI", "Analytics"],
        img: "/scamshield.png",
        link: "https://scamshield-xjip.vercel.app/",
        github: "https://github.com/Jilanmansuri/scamshield",
        color: "#4f46e5"
    },
    {
        title: "Github Finder",
        description: "Search GitHub users and view their profiles and repositories.",
        tags: ["React", "API", "Tailwind"],
        img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800", // Github/Code flavored image
        link: "https://github-finder-7655.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/github-finder",
        color: "#f0f6fc" // Github Light (White-ish)
    },
    {
        title: "DreamGames Clone",
        description: "Immersive game studio website clone with 3D visuals.",
        tags: ["Game Dev", "UI/UX"],
        img: "/dreams.png",
        link: "#",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        video: "https://youtu.be/OsPK9A-OZRU",
        color: "#3b82f6"
    },
    {
        title: "Cronos Clone",
        description: "Global finance on-chain blockchain platform clone.",
        tags: ["Crypto", "Web3"],
        img: "/cronos.png",
        link: "#",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        video: "https://youtu.be/igXTN2i9gVU",
        color: "#60a5fa"
    },
    {
        title: "News App",
        description: "Search and read news with API integration.",
        tags: ["API Project"],
        img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
        link: "https://jilan-108623-apiproject.netlify.app/",
        github: "#",
        color: "#ef4444"
    },
    {
        title: "Barista Clone",
        description: "Modern coffee shop website clone with ordering.",
        tags: ["Coffee Shop"],
        img: "/barista.png",
        link: "https://barista-web-clone-108623.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        video: "https://youtu.be/MaxuwgmfpDA",
        color: "#d97706"
    },
    {
        title: "JioTV Clone",
        description: "Live TV streaming platform clone.",
        tags: ["Streaming"],
        img: "/jiotv-mockup.png",
        link: "https://jiotv-web2-clone.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        video: "https://youtu.be/q0Vrh8M2Yp0",
        color: "#0078d7"
    },
    {
        title: "Glean Clone",
        description: "AI-powered enterprise search platform clone.",
        tags: ["AI Search"],
        img: "/glean.png",
        link: "https://glean-clone-web5-108623.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        video: "https://youtu.be/ePT3Pho75ic",
        color: "#6366f1"
    },
    {
        title: "Paxos Gold Clone",
        description: "Digital asset trading platform clone for gold.",
        tags: ["Crypto"],
        img: "/paxos.png",
        link: "https://paxos-clone-web4.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        video: "https://youtu.be/fCNuwqJAkJ0",
        color: "#facc15"
    }
];

const games = [
    {
        title: "Click Counter",
        description: "Simple click counting game.",
        tags: ["Mini Game"],
        img: "/game-click-counter.png",
        link: "https://js-games-7655.netlify.app/game-01-click%20counter/",
        github: "#",
        color: "#10b981"
    },
    {
        title: "Color Guessing",
        description: "Guess the correct RGB color.",
        tags: ["Mini Game"],
        img: "/game-color-guess.png",
        link: "https://js-games-7655.netlify.app/game-02-colorguesinggame/",
        github: "#",
        color: "#ec4899"
    },
    {
        title: "Whack a Mole",
        description: "Fast-paced arcade reflex game.",
        tags: ["Game Dev"],
        img: "/whack-a-mole-preview.png",
        link: "https://js-games-7655.netlify.app/game-03-wack%20a%20mole/",
        github: "#",
        color: "#8b5cf6"
    },
    {
        title: "Typing Speed",
        description: "Test your typing WPM.",
        tags: ["Mini Game"],
        img: "/game-typing-speed.png",
        link: "https://js-games-7655.netlify.app/game-04-typing%20speed%20test/",
        github: "#",
        color: "#f59e0b"
    },
    {
        title: "Memory Flip",
        description: "Card matching memory game.",
        tags: ["Mini Game"],
        img: "/game-memory-flip.png",
        link: "https://js-games-7655.netlify.app/game-05-memory%20flip%20card/",
        github: "#",
        color: "#3b82f6"
    },
    {
        title: "To-Do Game",
        description: "Gamified task management.",
        tags: ["Productivity"],
        img: "/game-todo.png",
        link: "https://js-games-7655.netlify.app/game-06-to-do%20game/",
        github: "#",
        color: "#ef4444"
    },
    {
        title: "Snake Slider Game",
        description: "Multiplayer Snakes & Ladders game.",
        tags: ["Game Dev"],
        img: "/sapsidi-preview.png",
        link: "https://js-games-7655.netlify.app/sapsidi%20game/index.html",
        github: "#",
        color: "#f59e0b"
    }
];

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
        techStack: ["React", "Express", "Node.js", "MongoDB" , "AI API"],
        github: "https://github.com/abdulhaque2005/vector-minds",
        demo: "https://vector-minds.vercel.app/",
        video: "https://youtu.be/isdwJFdwx0Q?si=V8fTLB0OYzy6Zs9J",
        color: "#3b82f6"
    }
];

const Projects = () => {
    const renderProjectCard = (project, index) => (
        <motion.div
            key={project.title}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{ '--theme-color': project.color }}
        >
            <div className="card-image-container">
                <img
                    src={project.img}
                    alt={project.title}
                    className="project-img"
                />
            </div>
            <div className="card-content">
                <h3 style={{ color: project.color }}>{project.title}</h3>
                <p>{project.description}</p>
                <div className="card-actions">
                    <a href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="link-text">
                        <ExternalLink size={16} /> Live Demo
                    </a>
                    <a href={project.github || '#'} target="_blank" rel="noopener noreferrer" className="link-text github-link">
                        <Github size={16} /> Source Code
                    </a>
                    {project.video && (
                        <a href={project.video} target="_blank" rel="noopener noreferrer" className="link-text video-link">
                            <Youtube size={16} /> Video
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return (
        <section className="section" id="work">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-title text-center"
            >
                Featured Projects
            </motion.h2>

            <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {mainProjects.slice(0, 3).map((project, index) => renderProjectCard(project, index))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginTop: '80px', marginBottom: '40px' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h2 className="section-title text-center" style={{ marginBottom: 0, fontSize: '28px', backgroundImage: 'linear-gradient(90deg, #6366f1, #2563eb, #4338ca)' }}>
                        More Projects
                    </h2>
                </div>
            </motion.div>

            <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {mainProjects.slice(3).map((project, index) => renderProjectCard(project, index))}
            </div>

            {/* GAMES SECTION */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginTop: '80px' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px', gap: '15px' }}>
                    <h2 className="section-title text-center" style={{ marginBottom: 0, backgroundImage: 'linear-gradient(90deg, #a855f7, #7c3aed, #6b21a8)' }}>Mini Games</h2>
                </div>

                <div className="games-row">
                    {games.map((game, index) => (
                        <motion.div
                            key={index}
                            className="project-card game-card"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            style={{ '--theme-color': game.color }}
                        >
                            <div className="card-image-container game-img-container">
                                <img
                                    src={game.img}
                                    alt={game.title}
                                    className="project-img"
                                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Game+Ref' }}
                                />
                            </div>
                            <div className="card-content">
                                <h3 style={{ color: game.color, fontSize: '1.2rem' }}>{game.title}</h3>
                                <p style={{ fontSize: '0.9rem' }}>{game.description}</p>
                                <div className="card-actions">
                                    <a href={game.link || '#'} target="_blank" rel="noopener noreferrer" className="link-text" style={{ fontSize: '0.85rem' }}>
                                        <ExternalLink size={14} /> Play
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* HACKATHON SECTION */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginTop: '100px' }}
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
                                            <ExternalLink size={18} /> Live Demo
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
    );
};

export default Projects;
