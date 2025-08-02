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
    <div className="relative h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="200"
          data-aos-offset="100"
          data-aos-easing="ease-out-cubic"
        >
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            <span className="block">Hello, I'm</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Subash Singh Dhami
            </span>
          </h1>

          {/* Dynamic Role */}
          <div className="mb-8">
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-2">
              <span className="typed text-purple-400 font-semibold"></span>
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Full-stack developer passionate about building scalable applications 
            and solving real-world problems with modern technologies.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#about"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <span className="relative z-10">Discover More</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
            </a>
            
            <a
              href="#hire-me"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-purple-400 border-2 border-purple-400 rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Hire Me
            </a>
            
            <a
              href="/assets/Subash_Singh_Dhami_Resume.pdf" 
              download
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-300 hover:text-white border-2 border-gray-600 hover:border-gray-400 rounded-full transition-all duration-300 hover:scale-105"
            >
              Download CV
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          .typed-cursor {
            color: #c084fc;
            display: inline-block;
            font-weight: 600;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;