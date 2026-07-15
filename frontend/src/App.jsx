import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen";
import UniverseBackground from "./components/UniverseBackground";
// import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import CodingActivity from "./components/CodingActivity";
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

const Home = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Unified scroll utility for a natural feel
  const scrollToSection = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (!element) return;

    // Use native scrollIntoView which respects CSS scroll-margin-top
    element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (state?.scrollTo) {
      const sectionId = state.scrollTo;

      // Delay navigation to ensure DOM is fully rendered and menu cleanup is done
      const timer = setTimeout(() => {
        scrollToSection(sectionId);
      }, 300); // 300ms delay to ensure the mobile menu has finished its transition

      return () => clearTimeout(timer);
    }
  }, [state, navigate]);

  return (
    <div className="home-container">
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

      {/* ===== CODING ACTIVITY ===== */}
      <CodingActivity />

      {/* ===== HACKATHONS ===== */}
      <Hackathons isHomePage={true} />

      {/* ===== CERTIFICATES ===== */}
      <Certificates />

      {/* ===== CONTACT Form ===== */}
      <Contact />

      {/* ===== EXPANDED FOOTER ===== */}
      <Footer />
    </div>
  );
};



export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('visited');
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Ping backend to wake up free Render instance
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        if (API_URL) {
          await fetch(`${API_URL}/api/health`);
          console.log("Backend pinged successfully");
        }
      } catch (error) {
        console.error("Failed to ping backend:", error);
      }
    };
    wakeUpBackend();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }



  return (
    <div className="app">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
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
