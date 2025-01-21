import React, { useEffect } from "react";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos"; // Import AOS JS
import Typed from "typed.js"; // Import Typed.js

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });

    const typed = new Typed(".typed", {
      strings: ["Developer", "Software Engineer", "Learner", "Student"],
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
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: "url('src/assets/profile.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

      }}
    >
<div className="absolute inset-0 bg-black bg-opacity-50">
  {/* Content */}
  <div className="absolute left-[85%] top-[60%] transform -translate-x-3/4 -translate-y-1/2 text-white w-full max-w-2xl px-4">
    <div data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
      <h1 className="text-5xl font-bold whitespace-normal break-words">Hello, I'm Subash Singh Dhami</h1>
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
  </div>
</div>




    </section>
  );
};

export default LandingPage;
