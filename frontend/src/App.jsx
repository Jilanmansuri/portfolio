import React, { useState, useEffect } from "react";
import "./App.css";
import UniverseBackground from "./components/UniverseBackground";
// import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import ScrollToTop from "./components/ScrollToTop";

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

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };



  return (
    <div className="app">
      {/* <CustomCursor /> */}
      {/* Background Animation */}
      <UniverseBackground theme={theme} />

      {/* ===== HEADER ===== */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        {/* ===== HERO ===== */}
        <Hero />

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
      </main>

      {/* ===== BOTTOM NAVIGATION (Mobile Only) ===== */}
      <BottomNav />

      {/* Back to Top Button */}
      <ScrollToTop />

    </div>
  );
}
