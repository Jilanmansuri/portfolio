import React, { useState, useMemo } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useActiveSection from '../hooks/useActiveSection';

const Navbar = ({ theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    
    const sections = useMemo(() => ['home', 'about', 'education', 'skills', 'work', 'hackathons', 'certificates', 'contact'], []);
    const activeSection = useActiveSection(sections);

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
        if (location.pathname === '/') {
            // Priority 1: Map based on active Section (Scroll)
            const hash = link.hash?.replace('#', '');
            if (activeSection === hash) return true;
            
            // Special cases for external links that have sections on Home
            if (link.name === 'Projects' && activeSection === 'work') return true;
            if (link.name === 'Hackathons' && activeSection === 'hackathons') return true;
            if (link.name === 'Home' && (activeSection === 'home' || !activeSection)) return true;
        }

        // Priority 2: Exact path match (for pages)
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
