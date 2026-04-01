import React from 'react';
import { Github, ExternalLink, Youtube, Users, Target, Lightbulb, Trophy } from 'lucide-react';
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
        color: "#3b82f6" // Bright Blue
    },
    {
        title: "Cronos Clone",
        description: "Global finance on-chain blockchain platform clone.",
        tags: ["Crypto", "Web3"],
        img: "/cronos.png",
        link: "#",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        color: "#60a5fa" // Lighter Blue for visibility
    },
    {
        title: "News App",
        description: "Search and read news with API integration.",
        tags: ["API Project"],
        img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
        link: "https://jilan-108623-apiproject.netlify.app/",
        github: "#",
        color: "#ef4444" // Red
    },
    {
        title: "Barista Clone",
        description: "Modern coffee shop website clone with ordering.",
        tags: ["Coffee Shop"],
        img: "/barista.png",
        link: "https://barista-web-clone-108623.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        color: "#d97706" // Coffee Brown
    },
    {
        title: "JioTV Clone",
        description: "Live TV streaming platform clone.",
        tags: ["Streaming"],
        img: "/jiotv-mockup.png",
        link: "https://jiotv-web2-clone.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        color: "#0078d7" // Jio Blue
    },
    {
        title: "Glean Clone",
        description: "AI-powered enterprise search platform clone.",
        tags: ["AI Search"],
        img: "/glean.png",
        link: "https://glean-clone-web5-108623.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        color: "#6366f1" // Indigo
    },
    {
        title: "Paxos Gold Clone",
        description: "Digital asset trading platform clone for gold.",
        tags: ["Crypto"],
        img: "/paxos.png",
        link: "https://paxos-clone-web4.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        color: "#facc15" // Gold
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
        title: "Smart Waste Management System",
        problem: "Inefficient waste segregation leading to environmental hazards and low recycling rates.",
        solution: "AI-based tracking and automated segregation system optimizing waste processing.",
        techStack: ["React", "Python", "AI/ML", "Node.js"],
        role: "Team Project",
        result: "Finalist",
        github: "#",
        demo: "#",
        color: "#10b981",
        gradientId: "hack-grad-1"
    },
    {
        title: "Leave Management System",
        problem: "Manual, paper-based tracking of student/employee leaves causing delays and data loss.",
        solution: "A streamlined web app for requesting, approving, and tracking leaves efficiently.",
        techStack: ["React", "Tailwind", "Firebase", "Express"],
        role: "Solo Project",
        result: "Practice Project",
        github: "#",
        demo: "#",
        color: "#6366f1",
        gradientId: "hack-grad-2"
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
                    <h2 className="section-title text-center" style={{ marginBottom: 0, backgroundImage: 'linear-gradient(90deg, #a855f7, #7c3aed, #6b21a8)' }}>Games</h2>
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
                <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', marginBottom: '50px' }}>
                    <h2 className="section-title text-center" style={{ marginBottom: 0, backgroundSize: '150% auto', backgroundImage: 'linear-gradient(90deg, #ef4444, #f43f5e, #ec4899)' }}>Mini Hackathon Projects</h2>
                </div>

                <div className="hackathon-grid">
                    {hackathons.map((hack, index) => (
                        <motion.div
                            key={index}
                            className={`hackathon-card ${hack.gradientId}`}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
                            style={{ '--theme-color': hack.color }}
                        >
                            <div className="hack-header">
                                <h3 style={{ color: hack.color }}>{hack.title}</h3>
                                <div className={`hack-badge ${hack.result === 'Finalist' ? 'badge-gold' : 'badge-blue'}`}>
                                    <Trophy size={14} /> <span>{hack.result}</span>
                                </div>
                            </div>

                            <div className="hack-body">
                                <div className="hack-item" style={{ marginTop: '15px' }}>
                                    <Target size={18} className="hack-icon text-muted" />
                                    <div>
                                        <strong>Problem:</strong>
                                        <p>{hack.problem}</p>
                                    </div>
                                </div>
                                <div className="hack-item">
                                    <Lightbulb size={18} className="hack-icon text-muted" />
                                    <div>
                                        <strong>Solution:</strong>
                                        <p>{hack.solution}</p>
                                    </div>
                                </div>
                                
                                <div className="hack-meta">
                                    <div className="hack-meta-item">
                                        <Users size={16} style={{color: hack.color}} />
                                        <span>{hack.role}</span>
                                    </div>
                                </div>

                                <div className="hack-tech">
                                    {hack.techStack.map((tech, i) => (
                                        <span key={i} className="tech-badge">{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="hack-footer">
                                <a href={hack.github || '#'} target="_blank" rel="noopener noreferrer" className="btn-hack btn-github">
                                    <Github size={18} /> GitHub
                                </a>
                                <a href={hack.demo || '#'} target="_blank" rel="noopener noreferrer" className="btn-hack btn-demo">
                                    <Youtube size={18} /> Demo
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
