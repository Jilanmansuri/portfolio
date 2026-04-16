import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Mail, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const BottomNav = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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

    return (
        <nav className={`bottom-nav ${isVisible ? 'visible' : 'hidden'}`}>
            <a href="/#home" className="nav-item active">
                <Home size={24} />
                <span>Home</span>
            </a>
            <a href="/#about" className="nav-item">
                <User size={24} />
                <span>About</span>
            </a>
            <Link to="/projects" className="nav-item">
                <Briefcase size={24} />
                <span>Work</span>
            </Link>
            <a href="/#contact" className="nav-item nav-item-cta">
                <Mail size={24} />
                <span>Contact</span>
            </a>
        </nav>
    );
};

export default BottomNav;
