import React, { useEffect, useState } from 'react';
import { Github, ExternalLink, Youtube, Users, Target, Lightbulb, Trophy, Calendar, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

const featuredProjects = [
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
    title: "FreelanceX",
    description: "A robust freelance marketplace and networking platform with seamless connectivity and modern vector-based interactions.",
    tags: ["React", "Node.js", "MongoDB", "AI API"],
    img: "/freelancex.png",
    link: "https://vector-minds.vercel.app/",
    github: "https://github.com/Jilanmansuri/FreelanceX",
    video: "https://youtu.be/isdwJFdwx0Q?si=V8fTLB0OYzy6Zs9J",
    color: "#3b82f6"
  },
  {
    title: "SkillForge AI",
    description: "An AI-powered skill development platform designed to streamline learning paths through intelligent analysis and personalized roadmaps.",
    tags: ["React", "Node.js", "AI API", "Tailwind"],
    img: "/skillforge.png",
    link: "https://skill-forge-ai-o8j4.vercel.app/",
    github: "https://github.com/Jilanmansuri/Hack-Titans",
    video: "https://youtu.be/1tZeN9hGZRo",
    color: "#10b981"
  }
];

const websiteClones = [
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

const apiProjects = [
  {
    title: "Github Finder",
    description: "Search GitHub users and view their profiles and repositories.",
    tags: ["React", "API", "Tailwind"],
    img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
    link: "https://github-finder-7655.netlify.app/",
    github: "https://github.com/Jilanmansuri/Projects/tree/main/github-finder",
    color: "#f0f6fc"
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
    title: "Weather App",
    description: "Real-time weather application using external APIs to fetch city forecasts and climate conditions.",
    tags: ["JS", "API Integration", "Weather"],
    img: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=800",
    link: "https://lucent-cascaron-a72951.netlify.app/",
    github: "https://github.com/Jilanmansuri/Projects/tree/main/api-project/api-whether",
    color: "#38bdf8"
  }
];

const figmaDesigns = [
  {
    title: "SAFAL Hospital UI/UX",
    description: "A comprehensive UI/UX design and interactive prototype for a hospital and medical excellence platform.",
    tags: ["Figma", "UI/UX", "Healthcare"],
    img: "/safal-hospital.png",
    link: "https://www.figma.com/design/7hEGL5YrGcDzBBLUriv6iq/Untitled?node-id=254-398&p=f&t=OcdWhPxFQX1t2ZIo-0",
    prototype: "https://www.figma.com/proto/7hEGL5YrGcDzBBLUriv6iq/Untitled?page-id=254%3A398&node-id=439-570&viewport=150%2C137%2C0.24&t=PZFXB5KyiLaqC036-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=439%3A570",
    color: "#2563eb"
  },

  {
    title: "Hotel LandMark Booking UI",
    description: "A modern hotel booking application interface featuring intuitive room selection, location browsing, and top-picked destinations.",
    tags: ["Figma", "UI/UX", "Travel"],
    img: "/hotel-landmark.png",
    link: "https://www.figma.com/design/6dAnbHhaC2brOg8hQu9EXb/blacknest?node-id=1-623&t=NNojOHTfmB03y0t2-1",
    prototype: "https://www.figma.com/proto/6dAnbHhaC2brOg8hQu9EXb/blacknest?node-id=1-623&t=NNojOHTfmB03y0t2-1",
    color: "#3b82f6"
  },


  {
    title: "BlankNest LMS Dashboard",
    description: "A clean and intuitive learning management system dashboard featuring course tracking, upcoming tasks, and a calendar view.",
    tags: ["Figma", "UI/UX", "Dashboard"],
    img: "/blanknest-dashboard.png",
    link: "https://www.figma.com/design/6dAnbHhaC2brOg8hQu9EXb/Untitled?node-id=0-1&t=NNojOHTfmB03y0t2-1",
    prototype: "https://www.figma.com/proto/6dAnbHhaC2brOg8hQu9EXb/Untitled?node-id=0-1&t=NNojOHTfmB03y0t2-1",
    color: "#10b981"
  },


  {
    title: "Level Up Portfolio UI",
    description: "A gamified, neon-styled portfolio mockup designed for a hackathon. Features 'Boss Level' sections and player stats.",
    tags: ["Figma", "Gaming", "Portfolio"],
    img: "/levelup-portfolio.png",
    link: "https://www.figma.com/design/mlHeak89Jp2ptRJHoef6zw/MockUp-Hackethon?node-id=1-3&t=MoVRH0RiQWmWJOsw-1",
    color: "#8b5cf6"
  },


  {
    title: "Codename Analytics Dashboard",
    description: "A comprehensive analytics and reporting dashboard featuring revenue tracking, sales dynamics charts, and cross-platform metrics.",
    tags: ["Figma", "UI/UX", "Dashboard"],
    img: "/codename-dashboard.png",
    link: "https://www.figma.com/design/7hEGL5YrGcDzBBLUriv6iq/projects?node-id=86-35&t=LtZeQJ2FkrQ7JeoF-1",
    color: "#ec4899"
  },
  {
    title: "Billcase Invoicing Tool",
    description: "An intuitive all-in-one invoicing platform for small businesses, offering seamless invoice management and financial automation.",
    tags: ["Figma", "UI/UX", "Finance", "SaaS"],
    img: "/billcase-invoicing.png",
    link: "https://www.figma.com/design/7hEGL5YrGcDzBBLUriv6iq/projects?node-id=30-139&t=LtZeQJ2FkrQ7JeoF-1",
    color: "#22c55e"
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


const allProjects = [
  ...featuredProjects.map(p => ({ ...p, category: "Featured" })),
  ...websiteClones.map(p => ({ ...p, category: "Clones" })),
  ...apiProjects.map(p => ({ ...p, category: "APIs" })),
  ...figmaDesigns.map(p => ({ ...p, category: "Figma" })),
  ...games.map(p => ({ ...p, category: "Games" }))
];

const categories = ["All", "Featured", "Clones", "APIs", "Figma", "Games"];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = activeCategory === "All"
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

  const renderProjectCard = (project, index) => {
    const isFigma = project.category === "Figma";
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
        style={{ '--theme-color': project.color }}
      >
        <div className={`card-image-container ${isGame ? 'game-img-container' : ''}`} style={isFigma ? { height: '210px' } : {}}>
          <img
            src={project.img}
            alt={project.title}
            className="project-img"
            style={isFigma ? { height: '100%', objectFit: 'cover' } : {}}
            onError={(e) => { if (isGame) e.target.src = 'https://placehold.co/600x400?text=Game+Ref' }}
          />
        </div>
        <div className="card-content">
          <h3 style={{ color: project.color, fontSize: isGame ? '1.2rem' : undefined }}>{project.title}</h3>
          <p style={{ fontSize: isGame ? '0.9rem' : undefined }}>{project.description}</p>
          <div className="card-actions">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-text" style={isGame ? { fontSize: '0.85rem' } : {}}>
                <ExternalLink size={isGame ? 14 : 16} /> {isFigma ? "Figma File" : (isGame ? "Play" : "Live Demo")}
              </a>
            )}
            {project.prototype && (
              <a href={project.prototype} target="_blank" rel="noopener noreferrer" className="link-text" style={{ color: '#f43f5e' }}>
                <Target size={16} /> Prototype
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-text github-link">
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
    <div style={{ paddingTop: '80px', minHeight: '100vh', paddingBottom: '60px' }}>
      <SEO
        title="Projects Portfolio | Jilan Mansuri"
        description="Explore my complete portfolio of web applications, AI tools, website clones, APIs, and Figma designs."
      />
      <section className="section" id="projects-page-content" style={{ paddingTop: '10px' }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
            <h2 className="section-title text-center" style={{ marginBottom: 0, fontSize: '36px', backgroundImage: 'linear-gradient(90deg, #3b82f6, #a855f7, #f97316)' }}>
              {activeCategory === "All" ? "My Projects" : `${activeCategory} Projects`}
            </h2>
          </div>
        </motion.div>

        {/* Categories Tab (Skills Design) */}
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

        {/* Dynamic Filtered Grid */}
        <motion.div layout className={`projects-grid ${activeCategory === "Games" ? 'games-row' : ''}`} style={activeCategory !== "Games" ? { gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' } : {}}>
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => renderProjectCard(project, index))}
          </AnimatePresence>
        </motion.div>

      </section>
    </div>
  );
};

export default ProjectsPage;
