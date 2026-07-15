import React, { useState, useEffect, useMemo } from 'react';
import { Home, MessageCircle, Briefcase, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useActiveSection from '../hooks/useActiveSection';

const BottomNav = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    
    const sections = useMemo(() => ['home', 'contact'], []);
    const activeSection = useActiveSection(sections);

    const goToSection = (sectionId) => {
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                const offset = 90;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            navigate('/', { state: { scrollTo: sectionId } });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar when at top
            if (currentScrollY < 10) {
                setIsVisible(true);
            }
            // Hide when scrolling down, show when scrolling up
            else if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const isActive = (path, hash = '') => {
        if (hash) {
            const sectionName = hash.replace('#', '');
            return location.pathname === '/' && activeSection === sectionName;
        }
        return location.pathname === path;
    };

    return (
        <nav className={`bottom-nav ${isVisible ? 'visible' : 'hidden'}`}>
            <Link to="/" className={`nav-item ${isActive('/', 'home') ? 'active' : ''}`}>
                <Home size={24} />
                <span>Home</span>
            </Link>
            <Link to="/chat" className={`nav-item ${isActive('/chat') ? 'active' : ''}`}>
                <MessageCircle size={24} />
                <span>Chat</span>
            </Link>
            <Link to="/projects" className={`nav-item ${isActive('/projects') ? 'active' : ''}`}>
                <Briefcase size={24} />
                <span>Work</span>
            </Link>

            <button 
                onClick={() => goToSection('contact')} 
                className={`nav-item nav-item-cta ${isActive('/', 'contact') ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }}
            >
                <Mail size={24} />
                <span>Contact</span>
            </button>
        </nav>
    );
};

export default BottomNav;
