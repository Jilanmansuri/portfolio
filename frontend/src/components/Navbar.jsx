import React, { useState, useMemo, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useActiveSection from '../hooks/useActiveSection';

const Navbar = ({ theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const sections = useMemo(() => ['home', 'about', 'education', 'skills', 'work', 'coding-activity', 'hackathons', 'certificates', 'contact'], []);
    const activeSection = useActiveSection(sections);
    useEffect(() => {
        const html = document.documentElement;
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            html.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            html.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
            html.style.overflow = '';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/', type: 'page' },
        { name: 'About', sectionId: 'about', type: 'section' },
        { name: 'Skills', sectionId: 'skills', type: 'section' },
        { name: 'Projects', path: '/projects', type: 'page' },
        { name: 'Community', sectionId: 'coding-activity', type: 'section' },
        { name: 'Hackathons', path: '/hackathons', type: 'page' },
        { name: 'Certificates', sectionId: 'certificates', type: 'section' },
        { name: 'Contact', sectionId: 'contact', type: 'section' },
        { name: 'Chat', path: '/chat', type: 'page' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const goToSection = (sectionId) => {
        if (isMenuOpen || location.pathname !== '/') {
            // When menu is open or we're on a different page, use state-based navigation
            // Adding a timestamp ensures the state is always unique, triggering the effect in App.jsx
            setIsMenuOpen(false);
            navigate('/', { state: { scrollTo: sectionId, _t: Date.now() } });
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleNavLinkClick = (link, e) => {
        if (link.type === 'section') {
            e.preventDefault();
            goToSection(link.sectionId);
        } else if (link.name === 'Home' && location.pathname === '/') {
            e.preventDefault();
            if (isMenuOpen) {
                setIsMenuOpen(false);
                // Use unique state to scroll to top after menu closes
                navigate('/', { state: { scrollTo: 'top', _t: Date.now() } });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        if (isMenuOpen) setIsMenuOpen(false);
    };

    const isLinkActive = (link) => {
        // If we are on the home page, use section-based highlighting
        if (location.pathname === '/') {
            // If the link has a sectionId (About, Skills, etc.)
            if (link.sectionId) {
                if (activeSection === link.sectionId) return true;
                // Special mapping logic for Projects/Hackathons sections on Home
                if (link.name === 'Projects' && activeSection === 'work') return true;
                if (link.name === 'Hackathons' && activeSection === 'hackathons') return true;
                return false;
            }

            // If it's the Home link (no hash)
            if (link.name === 'Home') {
                // Return false to disable permanent highlight/hover effect for Home
                return false;
            }
        }

        // If we are on another page (e.g. /projects, /chat), or for external links on root
        return location.pathname === link.path && !link.sectionId;
    };


    return (
        <header className="header animate-fade-in">
            <div className="nav-container">
                <div className="logo-container">
                    <Link to="/" className="logo-icon" style={{ textDecoration: 'none' }}>JM</Link>
                </div>
                
                <nav className="desktop-nav">
                    {navLinks.map((link, index) => (
                        <Link 
                            key={index} 
                            to={link.path || '#'}
                            className={isLinkActive(link) ? 'active' : ''}
                            onClick={(e) => handleNavLinkClick(link, e)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="nav-controls">
                    <button onClick={toggleTheme} className="icon-btn theme-toggle">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    
                    <button onClick={toggleMenu} className="icon-btn hamburger-btn">
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
                    <div className="mobile-menu-header">
                        <Link to="/" className="logo-icon" onClick={toggleMenu}>JM</Link>
                        <button onClick={toggleMenu} className="icon-btn close-btn">
                            <X size={24} />
                        </button>
                    </div>
                    <nav className="mobile-nav-links">
                        {navLinks.map((link, index) => (
                            <Link 
                                key={index} 
                                to={link.path || '#'}
                                className={isLinkActive(link) ? 'active' : ''} 
                                onClick={(e) => handleNavLinkClick(link, e)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
