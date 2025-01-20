// src/components/About.jsx
import React from "react";

const About = () => {
  return (
    <section id="about" className="py-12 px-4 min-h-screen bg-gray-800 text-white">
      <h2 className="text-3xl font-bold text-center ">About Me</h2>
      <p className="mt-4 text-lg text-center ">
        I'm a passionate web developer with experience in building modern web
        applications using React, JavaScript, HTML, and CSS. I love creating
        beautiful and functional websites.
      </p>
      <div className="mt-8 text-center">
        <img
          src="/assets/profile.jpg"
          alt="Subash Singh Dhami"
          className="w-48 h-48 object-cover rounded-full mx-auto"
        />
      </div>
    </section>
  );
};

export default About;
