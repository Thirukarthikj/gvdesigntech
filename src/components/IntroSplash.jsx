import React, { useEffect, useState } from 'react';
import './IntroSplash.css';

export default function IntroSplash({ onFinish }) {
  const [exiting, setExiting] = useState(false);

  const complete = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 200);
  };

  useEffect(() => {
    // Prevent scrolling while intro plays
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Auto-complete at the end of the choreographed zoom sequence (3.3s)
    const timer = setTimeout(() => {
      complete();
    }, 3300);

    // Keyboard shortcut to skip (Escape, Space, Enter)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        complete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`intro-splash-overlay ${exiting ? 'intro-exiting' : ''}`}
      onClick={complete}
      role="banner"
      aria-label="GV DesignTech Opening Intro Animation"
    >
      {/* Ambient Cosmic Background */}
      <div className="intro-cosmic-bg"></div>

      {/* Main Animated Cluster: Zoom In -> Zoom Out -> 1s Wait -> Zoom In */}
      <div className="intro-cluster">
        <div className="intro-logo-wrap">
          <div className="intro-halo"></div>
          <img
            src="/assets/cad-engineering-circle.svg"
            alt="CAD Engineering Tech Circle"
            className="intro-tech-circle"
          />
          <img
            src="/assets/gv-logo.png"
            alt="GV DesignTech Emblem"
            className="intro-logo-emblem"
          />
        </div>

        {/* Telemetry / Brand text */}
        <div className="intro-telemetry">
          <h1 className="intro-brand-name">GV DESIGNTECH</h1>
          <div className="intro-subtitle">
            <span className="intro-dot"></span>
            <span>CAD &amp; Engineering Design Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
}
