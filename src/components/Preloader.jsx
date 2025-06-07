import React from "react";
import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="loader-container">
        <div className="loader">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="loader-dot" style={{ '--i': i }}></div>
          ))}
        </div>
        <p className="loader-text">Building Experience</p>
      </div>
    </div>
  );
};

export default Preloader;