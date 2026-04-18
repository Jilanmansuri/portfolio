import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Target, Layers } from 'lucide-react';

const skillsData = [
    // Frontend
    { 
        name: "HTML5", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", 
        category: "Frontend", 
        level: "Advanced", 
        useCase: "Frontend",
        desc: "Expertise in semantic HTML, accessibility standards, and modern layout structures." 
    },
    { 
        name: "CSS3", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", 
        category: "Frontend", 
        level: "Advanced", 
        useCase: "Frontend",
        desc: "Specialized in responsive design, CSS Grid, Flexbox, and advanced animations." 
    },
    { 
        name: "JavaScript", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
        category: "Frontend", 
        level: "Advanced", 
        useCase: "Frontend",
        desc: "Deep knowledge of ES6+, DOM manipulation, and asynchronous programming." 
    },
    { 
        name: "React", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", 
        category: "Frontend", 
        level: "Advanced", 
        useCase: "Frontend",
        desc: "Building highly interactive user interfaces using hooks, state management, and reusable components." 
    },
    { 
        name: "Tailwind", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", 
        category: "Frontend", 
        level: "Advanced", 
        useCase: "Frontend",
        desc: "Rapidly prototyping and building modern, utility-first responsive designs." 
    },
    { 
        name: "Figma", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", 
        category: "Frontend", 
        level: "Intermediate", 
        useCase: "Design",
        desc: "Translating mockups into code and collaborating with design systems." 
    },

    // Backend
    { 
        name: "Node.js", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", 
        category: "Backend", 
        level: "Advanced", 
        useCase: "Backend",
        desc: "Developing performant server-side applications and RESTful APIs with Express." 
    },
    { 
        name: "Python", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", 
        category: "Backend", 
        level: "Intermediate", 
        useCase: "Backend",
        desc: "Proficient in data manipulation, automation scripts, and general-purpose programming." 
    },
    { 
        name: "C++", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", 
        category: "Backend", 
        level: "Intermediate", 
        useCase: "Systems",
        desc: "Familiar with memory management and object-oriented programming concepts." 
    },
    { 
        name: "MongoDB", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", 
        category: "Backend", 
        level: "Intermediate", 
        useCase: "Database",
        desc: "Designing and managing NoSQL databases for content-driven applications." 
    },

    // Tools
    { 
        name: "Git", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", 
        category: "Tools", 
        level: "Intermediate", 
        useCase: "DevOps",
        desc: "Mastering version control, branching workflows, and collaborative development." 
    },
    { 
        name: "GitHub", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", 
        className: "icon-white", 
        category: "Tools", 
        level: "Intermediate", 
        useCase: "DevOps",
        desc: "Proficient in code hosting, project management, and open-source contribution." 
    },
    { 
        name: "Postman", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", 
        category: "Tools", 
        level: "Intermediate", 
        useCase: "Tools",
        desc: "Automating API testing and optimizing backend integration workflows." 
    },
    { 
        name: "Vercel", 
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg", 
        className: "icon-white", 
        category: "Tools", 
        level: "Advanced", 
        useCase: "Deployment",
        desc: "Optimizing frontend performance and automated edge deployments for React apps." 
    },
    { 
        name: "Render", 
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/render.svg", 
        className: "icon-white", 
        category: "Tools", 
        level: "Intermediate", 
        useCase: "Deployment",
        desc: "Managing full-stack service deployments and environment orchestration." 
    },
    { 
        name: "VS Code", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", 
        category: "Tools", 
        level: "Advanced", 
        useCase: "IDE",
        desc: "Optimizing development workflow with extension management and advanced debugging." 
    },
];

const categories = ["All", "Frontend", "Backend", "Tools"];

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedSkill, setSelectedSkill] = useState(skillsData[0]);

    const filteredSkills = activeCategory === "All"
        ? skillsData
        : skillsData.filter(s => s.category === activeCategory);

    // Auto-select first in category when switching
    useEffect(() => {
        if (filteredSkills.length > 0) {
            setSelectedSkill(filteredSkills[0]);
        }
    }, [activeCategory]);

    return (
        <section className="section" id="skills">
            <div className="section-header">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="section-title text-center"
                >
                    Skills & Expertise
                </motion.h2>
            </div>

            <div className="skills-tabs">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`skill-tab ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                        {activeCategory === cat && (
                            <motion.div layoutId="tab-underline" className="tab-underline" />
                        )}
                    </button>
                ))}
            </div>

            <div className="skills-layout">
                {/* Left side: Grid of cards */}
                <div className="skills-grid-wrapper">
                    <motion.div className="mod-skills-grid" layout>
                        <AnimatePresence mode="popLayout">
                            {filteredSkills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className={`skill-card-mod ${selectedSkill?.name === skill.name ? 'active' : ''}`}
                                    onClick={() => setSelectedSkill(skill)}
                                >
                                    <div className="card-glow" />
                                    <img src={skill.icon} alt={skill.name} className={`skill-icon-mod ${skill.className || ''}`} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Right side: Detail Panel */}
                <div className="skill-detail-panel">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedSkill?.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="detail-content"
                        >
                            <div className="detail-header-mod">
                                <div className="detail-title-row">
                                    <img src={selectedSkill?.icon} alt="" className="detail-icon" />
                                    <h3>{selectedSkill?.name}</h3>
                                </div>
                                <span className="cat-badge">{selectedSkill?.category}</span>
                            </div>

                            <p className="detail-description">{selectedSkill?.desc}</p>

                            <div className="detail-stats">
                                <div className="stat-item">
                                    <Zap size={16} className="stat-icon" />
                                    <div className="stat-info">
                                        <span className="stat-label">Level</span>
                                        <span className="stat-value">{selectedSkill?.level}</span>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <Layers size={16} className="stat-icon" />
                                    <div className="stat-info">
                                        <span className="stat-label">Focus</span>
                                        <span className="stat-value">{selectedSkill?.useCase}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Skills;
