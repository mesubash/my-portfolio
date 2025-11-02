import React, { useEffect, useRef, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Typed from "typed.js";

const LandingPage = () => {
  const typedRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay to ensure preloader completes (4000ms in App.jsx)
    const initTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Initialize AOS after visibility
      AOS.init({ 
        duration: 1200,
        once: false,
        offset: 50,
        easing: 'ease-out-cubic'
      });

      // Initialize Typed.js
      if (!typedRef.current) {
        typedRef.current = new Typed(".typed", {
          strings: ["Student", "Developer", "Software Engineer", "Learner", "Void"],
          typeSpeed: 80,
          backSpeed: 60,
          backDelay: 1000,
          startDelay: 300,
          loop: true,
          showCursor: true,
          cursorChar: "|",
        });
      }

      // Force AOS refresh after a brief delay
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }, 4200); // Slightly after preloader (4000ms + 200ms buffer)

    return () => {
      clearTimeout(initTimer);
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
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
            <span className="block hover:scale-105 transition-transform duration-300">Hello, I'm</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x hover:scale-105 transition-transform duration-300 cursor-default">
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
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-in-delayed">
            Full-stack developer passionate about building scalable applications 
            and solving real-world problems with modern technologies.
          </p>
          
          {/* Animated tech badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in-delayed-more">
            {['Java', 'Spring Boot', 'Flutter', 'React', 'PostgreSQL'].map((tech, index) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-sm font-medium rounded-full hover:border-purple-400 hover:bg-gray-700/50 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${4400 + index * 100}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#about"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                Discover More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
            </a>
            
            <a
              href="#hire-me"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-purple-400 border-2 border-purple-400 rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-400/30"
            >
              <span className="flex items-center gap-2">
                Hire Me
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </a>
            
            <a
              href="/assets/Subash_Singh_Dhami_Resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-300 hover:text-white border-2 border-gray-600 hover:border-gray-400 rounded-full transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-500/20"
            >
              <span className="flex items-center gap-2">
                View CV
                <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
            </a>
          </div>

        </div>

        {/* Scroll Indicator - Fixed positioning */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center items-start pt-2">
            <div className="w-1 h-3 bg-purple-400 rounded-full animate-pulse"></div>
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
          
          @keyframes fadeInDelayed {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-fade-in-delayed {
            opacity: 0;
            animation: fadeInDelayed 0.8s ease-out 4.4s forwards;
          }
          
          .animate-fade-in-delayed-more {
            opacity: 0;
            animation: fadeInDelayed 0.8s ease-out 4.6s forwards;
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;