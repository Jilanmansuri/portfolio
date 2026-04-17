import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import UniverseBackground from "./components/UniverseBackground";
// import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Hackathons from "./components/Hackathons";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import ScrollToTop from "./components/ScrollToTop";
import ProjectsPage from "./pages/ProjectsPage";
import HackathonsPage from "./pages/HackathonsPage";
import ChatPage from "./pages/ChatPage";
import SEO from "./components/SEO";

const Home = () => (
  <>
    <SEO 
      title="Jilan Mansuri | Full Stack Developer " 
      description="Professional portfolio of Jilan Mansuri. Discover my full-stack projects in React, Node.js, and MongoDB, alongside my UI/UX designs and hackathon achievements." 
    />
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

    {/* ===== HACKATHONS ===== */}
    <Hackathons />

    {/* ===== CERTIFICATES ===== */}
    <Certificates />

    {/* ===== CONTACT Form ===== */}
    <Contact />

    {/* ===== EXPANDED FOOTER ===== */}
    <Footer />
  </>
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/hackathons" element={<HackathonsPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </main>

      {/* ===== BOTTOM NAVIGATION (Mobile Only) ===== */}
      <BottomNav />

      {/* Back to Top Button */}
      <ScrollToTop />
    </div>
  );
}
