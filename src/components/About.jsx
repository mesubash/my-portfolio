import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100
    });
  }, []);
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white relative">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-white"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          About Me
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Core Info */}
          <div className="space-y-6">
            <div 
              className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 md:p-8 rounded-xl border border-gray-600 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 transform"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-4 flex items-center">
                <span className="w-2 h-8 bg-purple-500 mr-4 rounded"></span>
                Software Engineer
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Full-stack developer building scalable systems with <span className="text-purple-400 font-semibold">Java Spring Boot</span>, 
                <span className="text-emerald-400 font-semibold"> Flutter</span>, and <span className="text-blue-400 font-semibold">React</span>.
              </p>
              <p className="text-gray-400 text-base">
                Currently leading <span className="text-purple-400 font-semibold">Yugo</span> - a smart public transport platform serving thousands of users in Nepal.
              </p>
            </div>

            <div 
              className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 md:p-8 rounded-xl border border-gray-600 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 transform"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-4 flex items-center">
                <span className="w-2 h-8 bg-purple-500 mr-4 rounded"></span>
                What I Build
              </h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  'RESTful APIs & Microservices',
                  'Cross-platform Mobile Apps',
                  'ML-powered Solutions',
                  'Production-ready Systems'
                ].map((item, index) => (
                  <li 
                    key={item}
                    className="flex items-center group hover:translate-x-2 transition-transform duration-300"
                    data-aos="fade-right"
                    data-aos-duration="600"
                    data-aos-delay={100 + index * 50}
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-green-400/50 transition-all duration-300"></span>
                    <span className="group-hover:text-white group-hover:font-medium transition-all duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div 
              className="bg-gradient-to-br from-purple-800 to-purple-900 p-6 rounded-xl border border-purple-500 border-opacity-30 hover:border-opacity-60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transform"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div className="text-center">
                <p className="text-purple-200 text-lg font-medium mb-2">Talk is cheap. Show me the code.</p>
                <p className="text-purple-300 text-sm">- Linus Torvalds</p>
              </div>
            </div>
          </div>

          {/* Right Column - Tech Stack */}
          <div className="space-y-6">
            <div 
              className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 md:p-8 rounded-xl border border-gray-600 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-6 flex items-center">
                <span className="w-2 h-8 bg-purple-500 mr-4 rounded"></span>
                Tech Stack
              </h3>
              
              <div className="space-y-6">
                {/* Backend */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Java Spring Boot', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-purple-600 bg-opacity-20 text-purple-300 rounded-full text-sm border border-purple-500 border-opacity-30 hover:border-opacity-100 hover:bg-opacity-30 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-110 transform transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <h4 className="text-lg font-semibold text-emerald-400 mb-3">Mobile</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Flutter', 'Android (Java)', 'Cross-platform'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-emerald-600 bg-opacity-20 text-emerald-300 rounded-full text-sm border border-emerald-500 border-opacity-30 hover:border-opacity-100 hover:bg-opacity-30 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-110 transform transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Frontend */}
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Tailwind CSS'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-600 bg-opacity-20 text-blue-300 rounded-full text-sm border border-blue-500 border-opacity-30 hover:border-opacity-100 hover:bg-opacity-30 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-110 transform transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ML & Data */}
                <div>
                  <h4 className="text-lg font-semibold text-indigo-400 mb-3">ML & Data</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'Scikit-learn', 'Data Analysis'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-indigo-600 bg-opacity-20 text-indigo-300 rounded-full text-sm border border-indigo-500 border-opacity-30 hover:border-opacity-100 hover:bg-opacity-30 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-110 transform transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* DevOps */}
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-3">DevOps</h4>
                  <div className="flex flex-wrap gap-2">
                    {['AWS', 'CI/CD', 'Nginx', 'Git'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-green-600 bg-opacity-20 text-green-300 rounded-full text-sm border border-green-500 border-opacity-30 hover:border-opacity-100 hover:bg-opacity-30 hover:shadow-lg hover:shadow-green-500/30 hover:scale-110 transform transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div 
              className="grid grid-cols-2 gap-4"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-xl border border-gray-600 text-center hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 transform transition-all duration-300">
                <div className="text-2xl font-bold text-purple-400">3+</div>
                <div className="text-sm text-gray-400">Years Coding</div>
              </div>
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-xl border border-gray-600 text-center hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105 transform transition-all duration-300">
                <div className="text-2xl font-bold text-emerald-400">10+</div>
                <div className="text-sm text-gray-400">Projects Built</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;