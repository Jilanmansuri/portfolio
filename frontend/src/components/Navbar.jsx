import React, { useState, useMemo, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useActiveSection from '../hooks/useActiveSection';

const Navbar = ({ theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    
    const sections = useMemo(() => ['home', 'about', 'education', 'skills', 'work', 'hackathons', 'certificates', 'contact'], []);
    const activeSection = useActiveSection(sections);
    const scrollPosition = React.useRef(0);

    useEffect(() => {
        if (isMenuOpen) {
            // Store current scroll position
            scrollPosition.current = window.pageYOffset;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition.current}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/', isExternal: true }, // Set to true to use Link instead of <a>
        { name: 'About', path: '/', hash: '#about', isExternal: false },
        { name: 'Skills', path: '/', hash: '#skills', isExternal: false },
        { name: 'Projects', path: '/projects', isExternal: true },
        { name: 'Hackathons', path: '/hackathons', isExternal: true },
        { name: 'Certificates', path: '/', hash: '#certificates', isExternal: false },
        { name: 'Contact', path: '/', hash: '#contact', isExternal: false },
        { name: 'Chat', path: '/chat', isExternal: true },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleNavLinkClick = (link, e) => {
        if (link.name === 'Home' && location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (isMenuOpen) setIsMenuOpen(false);
    };

    const isLinkActive = (link) => {
        // If we are on the home page, use section-based highlighting
        if (location.pathname === '/') {
            const hash = link.hash?.replace('#', '');
            
            // If the link has a hash (About, Skills, etc.)
            if (hash) {
                if (activeSection === hash) return true;
                // Special mapping logic for Projects/Hackathons sections on Home
                if (link.name === 'Projects' && activeSection === 'work') return true;
                if (link.name === 'Hackathons' && activeSection === 'hackathons') return true;
                return false;
            }

            // If it's the Home link (no hash)
            if (link.name === 'Home') {
                return activeSection === 'home' || !activeSection;
            }
        }

        // If we are on another page (e.g. /projects, /chat), or for external links on root
        return location.pathname === link.path && !link.hash;
    };

    return (
        <header className="header animate-fade-in">
            <div className="nav-container">
                <div className="logo-container">
                    <Link to="/" className="logo-icon" style={{ textDecoration: 'none' }}>JM</Link>
                </div>
                
                <nav className="desktop-nav">
                    {navLinks.map((link, index) => (
                        link.isExternal ? (
                            <Link 
                                key={index} 
                                to={link.path} 
                                className={isLinkActive(link) ? 'active' : ''}
                                onClick={(e) => handleNavLinkClick(link, e)}
                            >
                                {link.name}
                            </Link>
                        ) : (
                            <a 
                                key={index} 
                                href={link.path + link.hash} 
                                className={isLinkActive(link) ? 'active' : ''}
                                onClick={(e) => handleNavLinkClick(link, e)}
                            >
                                {link.name}
                            </a>
                        )
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
                            link.isExternal ? (
                                <Link 
                                    key={index} 
                                    to={link.path} 
                                    className={isLinkActive(link) ? 'active' : ''} 
                                    onClick={(e) => handleNavLinkClick(link, e)}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a 
                                    key={index} 
                                    href={link.path + link.hash} 
                                    className={isLinkActive(link) ? 'active' : ''} 
                                    onClick={(e) => handleNavLinkClick(link, e)}
                                >
                                    {link.name}
                                </a>
                            )
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
