import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { Reveal } from './Reveal';

const Hero = () => {
    return (
        <section className="hero" id="home">
            <Reveal width="100%" overflow="visible">
                <div className="hero-content">
                    <div className="profile-container">
                        <div className="profile-img-wrapper">
                            <img
                                src="/profile.png"
                                alt="Jilan Mansuri"
                                className="profile-img"
                            />
                            {/* Verified Badge */}
                            <div className="verified-badge">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#3b82f6" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="hero-text-content">
                        <span className="welcome-tag">WELCOME TO MY PORTFOLIO</span>
                        <h1 className="hero-title">
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString("Hi, I'm <span class='text-gradient'>Jilan Mansuri</span>")
                                        .pauseFor(1000)
                                        .callFunction(() => {
                                            document.querySelector('.Typewriter__cursor').style.display = 'none';
                                        })
                                        .start();
                                }}
                                options={{
                                    autoStart: true,
                                    loop: false,
                                }}
                            />
                        </h1>
                        <p className="hero-subtitle">
                            Aspiring Full-Stack Developer
                        </p>

                        <div className="hero-buttons">
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
                            >
                                <FileText size={20} />
                                View Resume
                            </a>
                            <button
                                className="btn btn-outline"
                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Contact Me
                            </button>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
};

export default Hero;
