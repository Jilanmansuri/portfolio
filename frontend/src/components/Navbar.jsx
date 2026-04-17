import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
    return (
        <header className="header animate-fade-in">
            <div className="logo-container">
                <Link to="/" className="logo-icon" style={{ textDecoration: 'none' }}>JM</Link>
            </div>
            <nav className="desktop-nav">
                <a href="/#home">Home</a>
                <a href="/#about">About</a>
                <a href="/#skills">Skills</a>
                <Link to="/projects">Projects</Link>
                <Link to="/hackathons">Hackathons</Link>
                <a href="/#certificates">Certificates</a>
                <a href="/#contact">Contact</a>
                <Link to="/chat">Chat</Link>
            </nav>
            <button onClick={toggleTheme} className="icon-btn theme-toggle">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </header>
    );
};

export default Navbar;
