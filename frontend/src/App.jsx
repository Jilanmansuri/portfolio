import React, { useState, useEffect, Suspense, lazy, useCallback } from "react";
import "./App.css";

// Lazy load sections that are not immediately visible above-the-fold
const UniverseBackground = lazy(() => import("./components/UniverseBackground"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Education = lazy(() => import("./components/Education"));
const Projects = lazy(() => import("./components/Projects"));
const Certificates = lazy(() => import("./components/Certificates"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const BottomNav = lazy(() => import("./components/BottomNav"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));

// Keep Hero and Navbar eager for immediate LCP (Largest Contentful Paint)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Lightweight loading placeholder for lazy components
const SectionLoader = () => (
  <div style={{ 
    height: '100px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    opacity: 0.5
  }}>
    <span>Loading...</span>
  </div>
);

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Memoize toggle function to prevent Navbar re-renders
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  return (
    <div className="app">
      {/* Background Animation - Lazy loaded to push Three.js out of the main bundle */}
      <Suspense fallback={null}>
        <UniverseBackground theme={theme} />
      </Suspense>

      {/* ===== HEADER ===== */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        {/* ===== HERO - Core content, kept eager for performance ===== */}
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          {/* ===== ABOUT ME ===== */}
          <About />

          {/* ===== EDUCATION ===== */}
          <Education />

          {/* ===== SKILLS & TOOLS ===== */}
          <Skills />

          {/* ===== PROJECTS ===== */}
          <Projects />

          {/* ===== CERTIFICATES ===== */}
          <Certificates />

          {/* ===== CONTACT Form ===== */}
          <Contact />

          {/* ===== EXPANDED FOOTER ===== */}
          <Footer />
        </Suspense>
      </main>

      {/* ===== BOTTOM NAVIGATION (Mobile Only) ===== */}
      <Suspense fallback={null}>
        <BottomNav />
      </Suspense>

      {/* Back to Top Button */}
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>

    </div>
  );
}

