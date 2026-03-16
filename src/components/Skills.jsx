import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillsData = [
    // Languages (Weapons)
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: 95, category: "Languages", rarity: "rare", desc: "Structural Foundation" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: 90, category: "Languages", rarity: "rare", desc: "Styling Engine" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: 80, category: "Languages", rarity: "epic", desc: "Core Logic Unit" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", level: 75, category: "Languages", rarity: "rare", desc: "High Performance" },
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", level: 75, category: "Languages", rarity: "common", desc: "System Programming" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: 70, category: "Languages", rarity: "epic", desc: "Versatile Scripting" },

    // Frameworks (Armor/Modules)
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 75, category: "Frameworks", rarity: "legendary", desc: "UI Library" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: null, category: "Frameworks", rarity: "epic", desc: "Runtime Environment" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", level: 90, category: "Frameworks", rarity: "rare", desc: "Utility CSS" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: 82, category: "Frameworks", rarity: "epic", desc: "NoSQL Database" },

    // Tools (Gadgets)
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", level: 85, category: "Tools", rarity: "common", desc: "Version Control" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", className: "icon-white", level: 90, category: "Tools", rarity: "common", desc: "Code Repository" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", level: 77, category: "Tools", rarity: "rare", desc: "Design Tool" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", level: 92, category: "Tools", rarity: "common", desc: "API Testing" },
];

const categories = ["All", "Languages", "Frameworks", "Tools"];

const rarityColors = {
    common: "#9ca3af",   // Gray
    rare: "#3b82f6",     // Blue
    epic: "#a855f7",     // Purple
    legendary: "#eab308" // Gold
};

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedSkill, setSelectedSkill] = useState(null);

    const filteredSkills = activeCategory === "All"
        ? skillsData
        : skillsData.filter(s => s.category === activeCategory);

    return (
        <section className="section" id="skills">
            <div className="section-header">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="skills-title rpg-title"
                >
                    Tech Arsenal
                </motion.h2>
            </div>

            <div className="rpg-categories">
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

            <div className="rpg-interface">
                {/* Inventory Grid */}
                <motion.div
                    className="inventory-grid"
                    layout
                >
                    <AnimatePresence>
                        {filteredSkills.map((skill) => (
                            <motion.div
                                layout
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className={`inventory-slot rarity-${skill.rarity} ${selectedSkill?.name === skill.name ? 'selected' : ''}`}
                                onClick={() => setSelectedSkill(skill)}
                                whileHover={{ scale: 1.05, borderColor: rarityColors[skill.rarity] }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="slot-corner-tl"></div>
                                <div className="slot-corner-br"></div>
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className={`inventory-icon ${skill.className || ''}`}
                                />
                                {skill.level && <div className="slot-level">{skill.level}</div>}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Skill Details Panel (Review/Stats) */}
                <div className="skill-details-panel">
                    {selectedSkill ? (
                        <motion.div
                            key={selectedSkill.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="details-content"
                        >
                            <div className={`details-header rarity-text-${selectedSkill.rarity}`}>
                                <h3>{selectedSkill.name}</h3>
                                <span className="rarity-badge">{selectedSkill.rarity.toUpperCase()}</span>
                            </div>
                            <p className="skill-desc">{selectedSkill.desc}</p>

                            {selectedSkill.level && (
                                <div className="stat-group">
                                    <div className="stat-label">
                                        <span>Proficiency</span>
                                        <span>{selectedSkill.level}%</span>
                                    </div>
                                    <div className="xp-bar-container">
                                        <motion.div
                                            className={`xp-bar-fill rarity-bg-${selectedSkill.rarity}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${selectedSkill.level}%` }}
                                            transition={{ duration: 1, type: "spring" }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="stat-group">
                                <div className="stat-label">
                                    <span>Category</span>
                                    <span>{selectedSkill.category}</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="empty-state">
                            <p>SELECT AN ITEM TO VIEW STATS</p>
                            <div className="scan-line"></div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Skills;
