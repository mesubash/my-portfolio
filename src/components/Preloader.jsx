import React from "react";
import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="loader-container">
        {/* Minimal geometric loader */}
        <div className="geometric-loader">
          <div className="loader-ring">
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
          </div>
          <div className="loader-core"></div>
        </div>
        
        {/* Progress bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="loading-text">Loading</p>
        </div>
        
        {/* Minimal dots indicator */}
        <div className="dots-indicator">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;