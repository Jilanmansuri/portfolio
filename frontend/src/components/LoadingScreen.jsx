import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";

const LoadingScreen = ({ onComplete }) => {
  const [isZoomingOut, setIsZoomingOut] = useState(false);

  useEffect(() => {
    // Prevent rendering/delay if user has already visited in this session
    const hasVisited = sessionStorage.getItem('visited');
    if (hasVisited) {
      onComplete();
      return;
    }
    sessionStorage.setItem('visited', 'true');

    let completed = false;
    const triggerComplete = () => {
      if (completed) return;
      completed = true;
      setIsZoomingOut(true);
      setTimeout(() => {
        onComplete();
      }, 800); // Matches CSS transition duration
    };

    // 1800ms max loading animation duration for a premium feel
    const timer = setTimeout(() => {
      triggerComplete();
    }, 1800);

    const handleLoad = () => {
      triggerComplete();
    };

    // Trigger complete immediately once all assets are loaded
    if (document.readyState !== 'complete') {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, [onComplete]);

  return (
    <div className={`premium-loading-screen ${isZoomingOut ? "zoom-out" : ""}`}>
      <div className="content-wrapper">
        <div className="eclipse-wrapper">
          <div className="eclipse-glow"></div>
          <div className="particles-container">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
          <div className="eclipse-ring-outer"></div>
          <div className="eclipse-ring-inner"></div>
        </div>
        <div className="text-container">
          <h1 className="premium-name">JILAN MANSURI</h1>
          <p className="premium-subtitle">Full Stack Developer | Open Source Contributor</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
