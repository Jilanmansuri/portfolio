import { ArrowRight, FileText, Github, Linkedin, Youtube } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import Typewriter from 'typewriter-effect';
import { Reveal } from './Reveal';

const Hero = () => {
    return (
        <section className="hero" id="home">
                <div className="hero-content">
                    <Reveal direction="left" width="auto" overflow="visible">
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
                    </Reveal>

                    <Reveal direction="right" width="auto" delay={0.4}>
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

                        <div className="social-links hero-socials" style={{ display: 'flex', gap: '15px', marginTop: '15px', marginBottom: '30px' }}>
                            <a href="https://github.com/Jilanmansuri" target="_blank" rel="noopener noreferrer" style={{ 
                                border: '1.5px solid rgba(249, 115, 22, 0.2)', borderRadius: '12px', color: '#f97316', transition: 'all 0.3s ease', backgroundColor: 'transparent', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.border = '1.5px solid rgba(249, 115, 22, 1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.border = '1.5px solid rgba(249, 115, 22, 0.2)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                <Github size={20} />
                            </a>
                            <a href="https://linkedin.com/in/jilanmansuri" target="_blank" rel="noopener noreferrer" style={{ 
                                border: '1.5px solid rgba(249, 115, 22, 0.2)', borderRadius: '12px', color: '#f97316', transition: 'all 0.3s ease', backgroundColor: 'transparent', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.border = '1.5px solid rgba(249, 115, 22, 1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.border = '1.5px solid rgba(249, 115, 22, 0.2)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                <Linkedin size={20} />
                            </a>
                            <a href="https://www.youtube.com/@JilanMansuri-b3c" target="_blank" rel="noopener noreferrer" style={{ 
                                border: '1.5px solid rgba(249, 115, 22, 0.2)', borderRadius: '12px', color: '#f97316', transition: 'all 0.3s ease', backgroundColor: 'transparent', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.border = '1.5px solid rgba(249, 115, 22, 1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.border = '1.5px solid rgba(249, 115, 22, 0.2)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                <Youtube size={20} />
                            </a>
                            <a href="https://leetcode.com/u/Jilan2410/" target="_blank" rel="noopener noreferrer" style={{ 
                                border: '1.5px solid rgba(249, 115, 22, 0.2)', borderRadius: '12px', color: '#f97316', transition: 'all 0.3s ease', backgroundColor: 'transparent', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.border = '1.5px solid rgba(249, 115, 22, 1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.border = '1.5px solid rgba(249, 115, 22, 0.2)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                <SiLeetcode size={20} />
                            </a>
                        </div>

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
                    </Reveal>
                </div>
        </section>
    );
};

export default Hero;
