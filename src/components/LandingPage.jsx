import React, { useEffect } from "react";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos"; // Import AOS JS
import Typed from "typed.js"; // Import Typed.js

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 }); // Initialize AOS

    // Initialize Typed.js for the typing effect on the roles text
    const typed = new Typed(".typed", {
      strings: ["Developer", "Software Engineer", "Learner", "Student"],
      typeSpeed: 80,  // Adjusted for smoother typing
      backSpeed: 60,   // Adjusted for smoother deleting
      backDelay: 1000, // Delay before starting to delete
      startDelay: 500, // Delay before starting to type
      loop: true,
      showCursor: true, // Ensure cursor is shown
      cursorChar: "|",  // Keep only one cursor
      onComplete: (self) => {
        // Prevent cursor from glitching by resetting once typing is completed
        self.cursor.removeAttribute("style");
      },
    });

    // Cleanup on component unmount
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="h-screen flex items-center justify-center bg-gray-800 text-white" data-aos="zoom-in">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Hello, I'm Subash Singh Dhami</h1>
        <p className="text-lg mt-4">
          A <span className="typed"></span>
        </p>
        <a
          href="#about"
          className="mt-8 inline-block px-6 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-500"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default LandingPage;
