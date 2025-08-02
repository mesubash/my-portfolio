import React from "react";
import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="loader-container">
        {/* Single elegant geometric loader */}
        <div className="geometric-loader">
          <div className="loader-ring">
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
          </div>
          <div className="loader-core"></div>
        </div>
        
        {/* Loading text with animated dots */}
        <div className="loading-text-container">
          <p className="loading-text">Loading</p>
          <div className="loading-dots">
            <span className="dot">●</span>
            <span className="dot">●</span>
            <span className="dot">●</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;