import React from 'react';
import { Sun, Moon } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
    return (
        <header className="header animate-fade-in">
            <div className="logo-container">
                <div className="logo-icon">JM</div>
            </div>
            <nav className="desktop-nav">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#education">Education</a>
                <a href="#skills">Skills</a>
                <a href="#work">Projects</a>
                <a href="#certificates">Certificates</a>
                <a href="#contact">Contact</a>
            </nav>
            <button onClick={toggleTheme} className="icon-btn theme-toggle">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </header>
    );
};

export default Navbar;
