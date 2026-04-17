import React, { useState, useEffect } from 'react';
import { Home, MessageCircle, Briefcase, Mail, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();

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
        // Special case for home links on the main page
        if (path === '/' && !location.hash && hash === '#home') return location.pathname === '/';
        
        if (hash) {
            return location.pathname === path && location.hash === hash;
        }
        return location.pathname === path && !location.hash;
    };

    return (
        <nav className={`bottom-nav ${isVisible ? 'visible' : 'hidden'}`}>
            <a href="/#home" className={`nav-item ${isActive('/', '#home') ? 'active' : ''}`}>
                <Home size={24} />
                <span>Home</span>
            </a>
            <Link to="/chat" className={`nav-item ${isActive('/chat') ? 'active' : ''}`}>
                <MessageCircle size={24} />
                <span>Chat</span>
            </Link>
            <Link to="/projects" className={`nav-item ${isActive('/projects') ? 'active' : ''}`}>
                <Briefcase size={24} />
                <span>Work</span>
            </Link>

            <a href="/#contact" className={`nav-item nav-item-cta ${isActive('/', '#contact') ? 'active' : ''}`}>
                <Mail size={24} />
                <span>Contact</span>
            </a>
        </nav>
    );
};

export default BottomNav;
