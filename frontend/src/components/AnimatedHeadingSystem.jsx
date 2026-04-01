import React from 'react';

const headingsData = [
  { 
    id: 1, 
    text: "About Me", 
    gradient: "from-blue-600 to-cyan-400", 
    glow: "hover:drop-shadow-[0_0_20px_rgba(37,99,235,0.6)]" 
  },
  { 
    id: 2, 
    text: "Skills & Tech", 
    gradient: "from-green-600 to-lime-400", 
    glow: "hover:drop-shadow-[0_0_20px_rgba(22,163,74,0.6)]" 
  },
  { 
    id: 3, 
    text: "Featured Projects", 
    gradient: "from-yellow-400 to-orange-500", 
    glow: "hover:drop-shadow-[0_0_20px_rgba(234,179,8,0.6)]" 
  },
  { 
    id: 4, 
    text: "Mini Hackathons", 
    gradient: "from-red-600 to-rose-400", 
    glow: "hover:drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]" 
  },
  { 
    id: 5, 
    text: "Experience", 
    gradient: "from-indigo-700 to-blue-500", 
    glow: "hover:drop-shadow-[0_0_20px_rgba(67,56,202,0.6)]" 
  },
  { 
    id: 6, 
    text: "Education", 
    gradient: "from-orange-600 to-amber-400", 
    glow: "hover:drop-shadow-[0_0_20px_rgba(234,88,12,0.6)]" 
  },
  { 
    id: 7, 
    text: "Certifications", 
    gradient: "from-lime-500 to-green-400", 
    glow: "hover:drop-shadow-[0_0_20px_rgba(132,204,22,0.6)]" 
  },
  { 
    id: 8, 
    text: "Games", 
    gradient: "from-violet-700 to-purple-500", 
    glow: "hover:drop-shadow-[0_0_20px_rgba(109,40,217,0.6)]" 
  },
  { 
    id: 9, 
    text: "Contact Me", 
    gradient: "from-gray-500 to-slate-700", 
    glow: "hover:drop-shadow-[0_0_20px_rgba(100,116,139,0.6)]" 
  },
];

// Reusable Heading Component
export const AnimatedHeading = ({ text, gradient, glow, delayIndex }) => {
  return (
    <div className="w-full flex justify-center py-6">
      <h2 
        className={`
          text-4xl md:text-5xl font-extrabold tracking-tight 
          text-transparent bg-clip-text bg-gradient-to-r ${gradient} bg-[length:200%_auto]
          transition-all duration-300 ease-in-out cursor-default
          hover:scale-105 ${glow}
        `}
        style={{
          // Only using inline style for dynamic delay & the keyframe animation
          animation: `gradientMove 4s linear infinite`,
          animationDelay: `${delayIndex * 0.2}s`
        }}
      >
        {text}
      </h2>
    </div>
  );
};

// System Parent Component mapped from Array
export const AnimatedHeadingSystem = () => {
  return (
    <section className="w-full min-h-screen py-16 px-4 flex flex-col items-center">
      {/* 
        Injecting the keyframe globally for the move effect so we 
        don't strictly require modifying tailwind.config.js 
      */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      
      <div className="w-full max-w-5xl flex flex-col gap-4">
        {headingsData.map((heading, index) => (
          <AnimatedHeading 
             key={heading.id}
             text={heading.text}
             gradient={heading.gradient}
             glow={heading.glow}
             delayIndex={index} // Used for creating the staggered start effect
          />
        ))}
      </div>
    </section>
  );
};

export default AnimatedHeadingSystem;
