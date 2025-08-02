import React from "react";
import { FaHandshake, FaCode, FaMobile, FaServer, FaRocket } from "react-icons/fa";

const HireMe = () => {
  return (
    <section id="hire-me" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-600 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center items-center mb-6">
            <FaHandshake className="text-4xl md:text-5xl text-purple-400 mr-4" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Let's Work Together
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm currently <span className="text-purple-400 font-semibold">open to opportunities</span> in backend development, 
            full-stack projects, mobile app development, and exciting tech collaborations.
          </p>
        </div>

        {/* What I Can Do */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 p-6 rounded-xl border border-purple-500 border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:scale-105">
            <FaServer className="text-3xl text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Backend Development</h3>
            <p className="text-purple-200 text-sm">Spring Boot, APIs, Microservices</p>
          </div>

          <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-6 rounded-xl border border-blue-500 border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:scale-105">
            <FaCode className="text-3xl text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Full-Stack Web</h3>
            <p className="text-blue-200 text-sm">React, Next.js, End-to-end solutions</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 p-6 rounded-xl border border-emerald-500 border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:scale-105">
            <FaMobile className="text-3xl text-emerald-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Mobile Apps</h3>
            <p className="text-emerald-200 text-sm">Flutter, Cross-platform development</p>
          </div>

          <div className="bg-gradient-to-br from-pink-800 to-pink-900 p-6 rounded-xl border border-pink-500 border-opacity-30 hover:border-opacity-100 transition-all duration-300 hover:scale-105">
            <FaRocket className="text-3xl text-pink-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">System Architecture</h3>
            <p className="text-pink-200 text-sm">Scalable solutions, DevOps</p>
          </div>
        </div>

        {/* Availability & CTA */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-8 md:p-10 rounded-2xl border border-gray-600 hover:border-purple-500 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Availability Info */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                  <span className="text-gray-300">Available for new opportunities</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-300">Open to internships & freelance work</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-gray-300">Remote & on-site collaboration</span>
                </div>
              </div>
            </div>

            {/* Right Side - CTA */}
            <div className="text-center lg:text-right">
              <p className="text-gray-300 mb-6 text-lg">
                Let's discuss how I can help bring your ideas to life with clean, 
                scalable code and innovative solutions.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center lg:justify-end">
                <a
                  href="#contact"
                  className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Get In Touch
                </a>
                <a
                  href="/assets/Subash_Singh_Dhami_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-400">5+</div>
            <div className="text-gray-400 text-sm">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-400">3+</div>
            <div className="text-gray-400 text-sm">Tech Stacks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-emerald-400">2+</div>
            <div className="text-gray-400 text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-pink-400">24/7</div>
            <div className="text-gray-400 text-sm">Dedication</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireMe;
