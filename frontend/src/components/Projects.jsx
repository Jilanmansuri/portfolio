import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Youtube, Users, Target, Lightbulb, Trophy, Calendar, Code, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allProjects = [
    {
        title: "ScamShield",
        description: "AI-powered scam detection and analytics platform.",
        tags: ["React", "AI", "Analytics"],
        img: "/scamshield.png",
        link: "https://scamshield-xjip.vercel.app/",
        github: "https://github.com/Jilanmansuri/scamshield",
        color: "#4f46e5",
        category: "Featured"
    },
    {
        title: "FreelanceX",
        description: "A robust freelance marketplace and networking platform with seamless connectivity and modern vector-based interactions.",
        tags: ["React", "Node.js", "MongoDB", "AI API"],
        img: "/freelancex.png",
        link: "https://vector-minds.vercel.app/",
        github: "https://github.com/Jilanmansuri/FreelanceX",
        video: "https://youtu.be/isdwJFdwx0Q?si=V8fTLB0OYzy6Zs9J",
        color: "#3b82f6",
        category: "Featured"
    },
    {
        title: "SkillForge AI",
        description: "An AI-powered skill development platform designed to streamline learning paths through intelligent analysis and personalized roadmaps.",
        tags: ["React", "Node.js", "AI API", "Tailwind"],
        img: "/skillforge.png",
        link: "https://skill-forge-ai-o8j4.vercel.app/",
        github: "https://github.com/Jilanmansuri/Hack-Titans",
        video: "https://youtu.be/1tZeN9hGZRo",
        color: "#10b981",
        category: "Featured"
    },
    {
        title: "DreamGames Clone",
        description: "Immersive game studio website clone with 3D visuals.",
        tags: ["Game Dev", "UI/UX"],
        img: "/dreams.png",
        link: "#",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        video: "https://youtu.be/OsPK9A-OZRU",
        color: "#3b82f6",
        category: "Clones"
    },
    {
        title: "Github Finder",
        description: "Search GitHub users and view their profiles and repositories.",
        tags: ["React", "API", "Tailwind"],
        img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
        link: "https://github-finder-7655.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/github-finder",
        color: "#f0f6fc",
        category: "APIs"
    },
    {
        title: "News App",
        description: "Search and read news with API integration.",
        tags: ["API Project"],
        img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
        link: "https://jilan-108623-apiproject.netlify.app/",
        github: "#",
        color: "#ef4444",
        category: "APIs"
    },
    {
        title: "Barista Clone",
        description: "Modern coffee shop website clone with ordering.",
        tags: ["Coffee Shop"],
        img: "/barista.png",
        link: "https://barista-web-clone-108623.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        video: "https://youtu.be/MaxuwgmfpDA",
        color: "#d97706",
        category: "Clones"
    },
    {
        title: "JioTV Clone",
        description: "Live TV streaming platform clone.",
        tags: ["Streaming"],
        img: "/jiotv-mockup.png",
        link: "https://jiotv-web2-clone.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        video: "https://youtu.be/q0Vrh8M2Yp0",
        color: "#0078d7",
        category: "Clones"
    },
    {
        title: "Glean Clone",
        description: "AI-powered enterprise search platform clone.",
        tags: ["AI Search"],
        img: "/glean.png",
        link: "https://glean-clone-web5-108623.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        video: "https://youtu.be/ePT3Pho75ic",
        color: "#6366f1",
        category: "Clones"
    },
    {
        title: "Paxos Gold Clone",
        description: "Digital asset trading platform clone for gold.",
        tags: ["Crypto"],
        img: "/paxos.png",
        link: "https://paxos-clone-web4.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        video: "https://youtu.be/fCNuwqJAkJ0",
        color: "#facc15",
        category: "Clones"
    },
    {
        title: "SAFAL Hospital UI/UX",
        description: "A comprehensive UI/UX design and interactive prototype for a hospital and medical excellence platform.",
        tags: ["Figma", "UI/UX", "Healthcare"],
        img: "/safal-hospital.png",
        link: "https://www.figma.com/design/7hEGL5YrGcDzBBLUriv6iq/Untitled?node-id=254-398&p=f&t=OcdWhPxFQX1t2ZIo-0",
        prototype: "https://www.figma.com/proto/7hEGL5YrGcDzBBLUriv6iq/Untitled?page-id=254%3A398&node-id=439-570&viewport=150%2C137%2C0.24&t=PZFXB5KyiLaqC036-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=439%3A570",
        color: "#2563eb",
        category: "Figma"
    },
    {
        title: "Billcase Invoicing Tool",
        description: "An intuitive all-in-one invoicing platform for small businesses, offering seamless invoice management and financial automation.",
        tags: ["Figma", "UI/UX", "Finance", "SaaS"],
        img: "/billcase-invoicing.png",
        link: "https://www.figma.com/design/7hEGL5YrGcDzBBLUriv6iq/projects?node-id=30-139&t=LtZeQJ2FkrQ7JeoF-1",
        color: "#22c55e",
        category: "Figma"
    },
    {
        title: "Click Counter",
        description: "Simple click counting game.",
        tags: ["Mini Game"],
        img: "/game-click-counter.png",
        link: "https://js-games-7655.netlify.app/game-01-click%20counter/",
        github: "#",
        color: "#10b981",
        category: "Games"
    },
    {
        title: "Color Guessing",
        description: "Guess the correct RGB color.",
        tags: ["Mini Game"],
        img: "/game-color-guess.png",
        link: "https://js-games-7655.netlify.app/game-02-colorguesinggame/",
        github: "#",
        color: "#ec4899",
        category: "Games"
    },
    {
        title: "Whack a Mole",
        description: "Fast-paced arcade reflex game.",
        tags: ["Game Dev"],
        img: "/whack-a-mole-preview.png",
        link: "https://js-games-7655.netlify.app/game-03-wack%20a%20mole/",
        github: "#",
        color: "#8b5cf6",
        category: "Games"
    },
    {
        title: "Typing Speed",
        description: "Test your typing WPM.",
        tags: ["Mini Game"],
        img: "/game-typing-speed.png",
        link: "https://js-games-7655.netlify.app/game-04-typing%20speed%20test/",
        github: "#",
        color: "#f59e0b",
        category: "Games"
    },
    {
        title: "Memory Flip",
        description: "Card matching memory game.",
        tags: ["Mini Game"],
        img: "/game-memory-flip.png",
        link: "https://js-games-7655.netlify.app/game-05-memory%20flip%20card/",
        github: "#",
        color: "#3b82f6",
        category: "Games"
    },
    {
        title: "Snake Slider Game",
        description: "Multiplayer Snakes & Ladders game.",
        tags: ["Game Dev"],
        img: "/sapsidi-preview.png",
        link: "https://js-games-7655.netlify.app/sapsidi%20game/index.html",
        github: "#",
        color: "#f59e0b",
        category: "Games"
    },
    {
        title: "Cronos Clone",
        description: "Global finance on-chain blockchain platform clone.",
        tags: ["Crypto", "Web3"],
        img: "/cronos.png",
        link: "#",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/six%20website%20clone",
        video: "https://youtu.be/igXTN2i9gVU",
        color: "#60a5fa",
        category: "Clones"
    },
    {
        title: "Weather App",
        description: "Real-time weather application using external APIs to fetch city forecasts and climate conditions.",
        tags: ["JS", "API Integration", "Weather"],
        img: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=800",
        link: "https://lucent-cascaron-a72951.netlify.app/",
        github: "https://github.com/Jilanmansuri/Projects/tree/main/api-project/api-whether",
        color: "#38bdf8",
        category: "APIs"
    }
];

const mainProjectsData = allProjects.filter(p => p.category !== "Games");
const gamesData = allProjects.filter(p => p.category === "Games");

const categories = ["All", "Featured", "Clones", "APIs", "Figma"];


const Projects = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? mainProjectsData
        : mainProjectsData.filter(p => p.category === activeCategory);

    const renderProjectCard = (project, index) => {
        const isGame = project.category === "Games";
        return (
            <motion.div
                layout
                key={project.title}
                className={`project-card ${isGame ? 'game-card' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                style={{ '--theme-color': project.color }}
            >
                <div className={`card-image-container ${isGame ? 'game-img-container' : ''}`}>
                    <img
                        src={project.img}
                        alt={project.title}
                        className="project-img"
                        onError={(e) => { if (isGame) e.target.src = 'https://placehold.co/600x400?text=Game+Ref' }}
                    />
                </div>
                <div className="card-content">
                    <h3 style={{ color: project.color, fontSize: isGame ? '1.2rem' : undefined }}>{project.title}</h3>
                    <p style={{ fontSize: isGame ? '0.9rem' : undefined }}>{project.description}</p>
                    <div className="card-actions">
                        {project.link && (
                            <a href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="link-text" style={isGame ? { fontSize: '0.85rem' } : {}}>
                                <ExternalLink size={isGame ? 14 : 16} /> {project.category === "Figma" ? "Figma File" : (isGame ? 'Play' : 'Live Demo')}
                            </a>
                        )}
                        {project.prototype && (
                            <a href={project.prototype} target="_blank" rel="noopener noreferrer" className="link-text" style={{ color: '#f43f5e' }}>
                                <Target size={16} /> Prototype
                            </a>
                        )}
                        {!isGame && (
                            <a href={project.github || '#'} target="_blank" rel="noopener noreferrer" className="link-text github-link">
                                <Github size={16} /> Source Code
                            </a>
                        )}
                        {project.video && (
                            <a href={project.video} target="_blank" rel="noopener noreferrer" className="link-text video-link">
                                <Youtube size={16} /> Video
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <section className="section" id="work">
            <motion.h2
                initial={{ opacity: 0, x: -50, y: 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                className="section-title text-center"
            >
                Projects
            </motion.h2>

            <div className="rpg-categories" style={{ marginBottom: '40px' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`rpg-tab ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <motion.div layout className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.map((project, index) => renderProjectCard(project, index))}
                </AnimatePresence>
            </motion.div>

            {activeCategory === "All" && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '60px',
                        marginBottom: '40px'
                    }}
                >
                    <Link to="/projects" className="btn-explore-projects">
                        Explore All Projects <ExternalLink size={20} />
                    </Link>
                </motion.div>
            )}

            {/* GAMES SECTION - ALWAYS VISIBLE ALMOST */}
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
                    {gamesData.map((game, index) => renderProjectCard(game, index))}
                </div>
            </motion.div>

        </section>
    );
};

export default Projects;
