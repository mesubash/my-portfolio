import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Typed from "typed.js";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });

    const typed = new Typed(".typed", {
      strings: ["Student", "Developer", "Software Engineer", "Learner", "Void"],
      typeSpeed: 80,
      backSpeed: 60,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* Background Image with Multiple Layers for Color Grading */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("/assets/profile.webp")`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(31, 41, 55, 0.7),
              rgba(17, 24, 39, 0.8)
            )
          `
        }}
      />
      {/* Color Grading Layer */}
      <div 
        className="absolute inset-0 z-20 mix-blend-multiply"
        style={{
          backgroundColor: "rgba(55, 65, 81, 0.3)",
        }}
      />
      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 z-30"
        style={{
          boxShadow: "inset 0 0 150px rgba(0, 0, 0, 0.7)"
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-40">
        <div className="absolute left-[85%] top-[60%] transform -translate-x-3/4 -translate-y-1/2 text-white w-full max-w-2xl px-4">
          <div 
            data-aos="fade-right"
            data-aos-duration="1200"
            data-aos-delay="200"
            data-aos-offset="100"
            data-aos-easing="ease-out-cubic"
          >
            <h1 className="text-5xl font-bold whitespace-normal break-words">
              Hello, I'm Subash Singh Dhami
            </h1>
            <p className="text-3xl mt-4">
              A <span className="typed text-purple-500 ml-2"></span>
            </p>
            <div className="flex mt-6 justify-center gap-6">
              <a
                href="#about"
                className="inline-block px-6 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-purple-600 hover:underline transition-all"
              >
                Discover
              </a>
              <a
                href="/assets/Subash_Singh_Dhami_Resume.pdf" 
                download
                className="inline-block mt-3.5 text-white font-semibold hover:underline"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .typed-cursor {
            color: #a855f7; /* Change cursor color to match text-purple-500 */
            display: inline-block; /* Ensure cursor is displayed as an inline element */
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;