import React, { useEffect } from "react";
import Typed from "typed.js"; // Import Typed.js

const About = () => {
  useEffect(() => {
    let typed;

    // Create an Intersection Observer to detect when the #about section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the #about section is in view, start the typing effect
          if (entry.isIntersecting) {
            typed = new Typed(".typed-about", {
              strings: [
                "I'm a passionate web developer with experience in building modern web applications using React, JavaScript, HTML, and CSS. I love creating beautiful and functional websites."
              ],
              typeSpeed: 50, // Adjust typing speed (lower value = faster typing)
              backSpeed: 30, // Adjust backspacing speed (lower value = faster backspace)
              backDelay: 2000, // Delay before backspacing starts
              startDelay: 500, // Delay before typing starts
              loop: false, // Don't loop the typing effect
              showCursor: true, // Show the blinking cursor
              cursorChar: "|", // Customize cursor character to a single pipe (|)
              onComplete: () => {
                // Hide cursor once typing completes to avoid multiple cursors
                document.querySelector(".typed-cursor").style.visibility = "hidden";
              },
            });
          } else {
            // Stop the typing effect when the section is out of view
            if (typed) {
              typed.destroy();
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the #about section is visible
    );

    // Observe the #about section
    const aboutSection = document.querySelector("#about");
    observer.observe(aboutSection);

    // Cleanup the observer when the component unmounts
    return () => {
      if (typed) {
        typed.destroy();
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="py-12 px-4 min-h-screen bg-gray-800 text-white">
      <h2 className="text-3xl font-bold text-center">About Me</h2>
      <p className="mt-4 text-lg text-center">
        <span className="typed-about"></span>
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
