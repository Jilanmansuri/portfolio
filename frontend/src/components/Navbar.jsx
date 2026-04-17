import React, { useState, useMemo } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useActiveSection from '../hooks/useActiveSection';

const Navbar = ({ theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    
    const sections = useMemo(() => ['home', 'about', 'skills', 'work', 'hackathons', 'certificates', 'contact'], []);
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

    const isLinkActive = (link) => {
        if (link.isExternal) {
            if (link.name === 'Home') return location.pathname === '/' && (activeSection === 'home' || !activeSection);
            return location.pathname === link.path;
        }
        return location.pathname === '/' && activeSection === link.hash.replace('#', '');
    };

    return (
        <header className="header animate-fade-in">
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
                        >
                            {link.name}
                        </Link>
                    ) : (
                        <a 
                            key={index} 
                            href={link.path + link.hash} 
                            className={isLinkActive(link) ? 'active' : ''}
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
                                    onClick={toggleMenu}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a 
                                    key={index} 
                                    href={link.path + link.hash} 
                                    className={isLinkActive(link) ? 'active' : ''} 
                                    onClick={toggleMenu}
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
