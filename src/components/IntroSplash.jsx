import React, { useState, useEffect } from 'react';
import './IntroSplash.css';

export default function IntroSplash({ onFinish }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Zoom in and zoom out animation completes in ~2.1s, then initiate fade out
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2100);

    // Completely finish and unmount after fade transition (2.65s)
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2650);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const handleSkip = () => {
    setFading(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 320);
  };

  return (
    <div
      className={`intro-splash-overlay ${fading ? 'splash-fade-out' : ''}`}
      onClick={handleSkip}
      role="banner"
      aria-label="GV DesignTech Intro Animation"
    >
      <div className="splash-bg-glow"></div>

      {/* Futuristic expanding shockwave energy rings */}
      <div className="splash-energy-ring ring-1"></div>
      <div className="splash-energy-ring ring-2"></div>

      {/* Main Logo & CAD Circle with Zoom In and Zoom Out Animation */}
      <div className="splash-logo-container">
        <div className="splash-halo"></div>
        <img
          src="/assets/cad-engineering-circle.svg"
          alt="GV DesignTech CAD Engineering Rotating Ring"
          className="splash-tech-circle"
        />
        <img
          src="/assets/gv-logo.png"
          alt="GV DesignTech Logo Emblem"
          className="splash-logo-emblem"
        />
      </div>

      <div className="splash-brand-title">
        <span className="splash-brand-dot"></span>
        <span>GV DESIGNTECH</span>
      </div>

      <button
        type="button"
        className="splash-skip-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
      >
        Skip ✕
      </button>
    </div>
  );
}
