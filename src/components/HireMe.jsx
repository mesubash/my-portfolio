import React, { useEffect } from "react";
import { FaHandshake, FaCode, FaMobile, FaServer, FaRocket } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const HireMe = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100
    });
  }, []);
  return (
    <section id="hire-me" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16" data-aos="fade-down" data-aos-duration="800">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm currently <span className="text-purple-400 font-medium">open to opportunities</span> in backend development, 
            full-stack projects, mobile app development, and exciting tech collaborations.
          </p>
        </div>

        {/* What I Can Do */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div 
            className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-purple-500 transition-all duration-300 text-center hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 hover:scale-105 transform group"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="0"
          >
            <FaServer className="text-2xl text-purple-400 mb-3 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            <h3 className="text-lg font-medium text-white mb-2">Backend Development</h3>
            <p className="text-gray-400 text-sm">Spring Boot, APIs, Microservices</p>
          </div>

          <div 
            className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-purple-500 transition-all duration-300 text-center hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 hover:scale-105 transform group"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            <FaCode className="text-2xl text-purple-400 mb-3 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            <h3 className="text-lg font-medium text-white mb-2">Full-Stack Web</h3>
            <p className="text-gray-400 text-sm">React, Next.js, End-to-end solutions</p>
          </div>

          <div 
            className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-purple-500 transition-all duration-300 text-center hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 hover:scale-105 transform group"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <FaMobile className="text-2xl text-purple-400 mb-3 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            <h3 className="text-lg font-medium text-white mb-2">Mobile Apps</h3>
            <p className="text-gray-400 text-sm">Flutter, Cross-platform development</p>
          </div>

          <div 
            className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-purple-500 transition-all duration-300 text-center hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 hover:scale-105 transform group"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="300"
          >
            <FaRocket className="text-2xl text-purple-400 mb-3 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            <h3 className="text-lg font-medium text-white mb-2">System Architecture</h3>
            <p className="text-gray-400 text-sm">Scalable solutions, DevOps</p>
          </div>
        </div>

        {/* Availability & CTA */}
        <div 
          className="bg-gray-700 p-8 md:p-10 rounded-lg border border-gray-600 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="400"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Availability Info */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Ready to Start Your Project?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <span className="relative w-3 h-3 bg-green-500 rounded-full mr-3">
                    <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
                  </span>
                  <span className="text-gray-300 group-hover:text-white group-hover:font-medium transition-all duration-300">Available for new opportunities</span>
                </div>
                <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <span className="relative w-3 h-3 bg-purple-500 rounded-full mr-3">
                    <span className="absolute inset-0 bg-purple-500 rounded-full animate-pulse"></span>
                  </span>
                  <span className="text-gray-300 group-hover:text-white group-hover:font-medium transition-all duration-300">Open to internships & freelance work</span>
                </div>
                <div className="flex items-center group hover:translate-x-2 transition-transform duration-300">
                  <span className="relative w-3 h-3 bg-blue-500 rounded-full mr-3">
                    <span className="absolute inset-0 bg-blue-500 rounded-full animate-pulse"></span>
                  </span>
                  <span className="text-gray-300 group-hover:text-white group-hover:font-medium transition-all duration-300">Remote & on-site collaboration</span>
                </div>
              </div>
            </div>

            {/* Right Side - CTA */}
            <div className="text-center lg:text-right">
              <p className="text-gray-300 mb-6 text-lg">
                Let's discuss how I can help bring your ideas to life with clean, 
                scalable code and innovative solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/40 transform hover:-translate-y-1"
                >
                  <span className="flex items-center gap-2">
                    Get In Touch
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
                <a
                  href="/assets/Subash_Singh_Dhami_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-6 py-3 border border-gray-500 hover:border-purple-500 text-gray-300 hover:text-purple-400 font-medium rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg transform hover:-translate-y-1"
                >
                  <span className="flex items-center gap-2">
                    View Resume
                    <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">5+</div>
            <div className="text-gray-400 text-sm">Projects Completed</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">3+</div>
            <div className="text-gray-400 text-sm">Tech Stacks</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">2+</div>
            <div className="text-gray-400 text-sm">Years Experience</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">24/7</div>
            <div className="text-gray-400 text-sm">Dedication</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireMe;
