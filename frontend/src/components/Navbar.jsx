import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/#home', isExternal: false },
        { name: 'About', path: '/#about', isExternal: false },
        { name: 'Skills', path: '/#skills', isExternal: false },
        { name: 'Projects', path: '/projects', isExternal: true },
        { name: 'Hackathons', path: '/hackathons', isExternal: true },
        { name: 'Certificates', path: '/#certificates', isExternal: false },
        { name: 'Contact', path: '/#contact', isExternal: false },
        { name: 'Chat', path: '/chat', isExternal: true },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="header animate-fade-in">
            <div className="logo-container">
                <Link to="/" className="logo-icon" style={{ textDecoration: 'none' }}>JM</Link>
            </div>
            
            <nav className="desktop-nav">
                {navLinks.map((link, index) => (
                    link.isExternal ? (
                        <Link key={index} to={link.path}>{link.name}</Link>
                    ) : (
                        <a key={index} href={link.path}>{link.name}</a>
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
                                <Link key={index} to={link.path} onClick={toggleMenu}>{link.name}</Link>
                            ) : (
                                <a key={index} href={link.path} onClick={toggleMenu}>{link.name}</a>
                            )
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
