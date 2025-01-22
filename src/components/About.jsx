import React, { useEffect } from "react";
import Typed from "typed.js";
import Skills from "./Skills"; // Import the Skills component

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
    <section id="about" className="py-12 px-4 min-h-screen bg-gray-800 text-white relative">
      <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
      
      <div className="w-100 mx-auto flex flex-col md:flex-row items-center bg-purple-100 shadow-lg rounded-lg p-6">
      <div className="md:w-2/3 text-center md:text-left">
          <p className="text-lg">
            <span className="typed-about text-black"></span>
          </p>
          <div className="md:w-1/3 mb-6 md:mb-0">
          <img
            src="src/assets/profile.jpeg"
            alt="Subash Singh Dhami"
            className="w-48 h-48 object-cover rounded-full mx-auto"
          />
        </div>
         
        </div>
       
       
      </div>
      <div className="relative z-10">
        <Skills /> {/* Include the Skills component */}
      </div>
      <style>
        {`
          .typed-about .typed-cursor {
            color: inherit; /* Reset cursor color to inherit the default text color */
          }
        `}
      </style>
    </section>
  );
};

export default About;