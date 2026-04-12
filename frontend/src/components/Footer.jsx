import React from 'react';
import { Code2, Linkedin, Github, Youtube } from 'lucide-react';
import { Reveal } from './Reveal';

const XPlatformIcon = ({ size = 24, color = "currentColor", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" stroke="none" fill="currentColor" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);

const Footer = () => {
    return (
        <footer className="footer">
            <Reveal width="100%">
                <div className="footer-bottom">
                    <p>© 2025 Developer. All rights reserved.</p>
                    <div className="footer-social-icons">
                        <a href="https://www.linkedin.com/in/jilan-mansuri-235b38392/" target="_blank" rel="noopener noreferrer" className="icon-btn-small"><Linkedin size={16} /></a>
                        <a href="https://github.com/Jilanmansuri" target="_blank" rel="noopener noreferrer" className="icon-btn-small"><Github size={16} /></a>
                        <a href="https://x.com/jilan_24" target="_blank" rel="noopener noreferrer" className="icon-btn-small"><XPlatformIcon size={16} /></a>
                        <a href="https://www.youtube.com/@JilanMansuri-b3c" target="_blank" rel="noopener noreferrer" className="icon-btn-small"><Youtube size={16} /></a>
                    </div>
                </div>
            </Reveal>
        </footer>
    );
};

export default Footer;
