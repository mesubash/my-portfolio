import React from "react";
import Skills from "./Skills";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gray-800 text-white relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-white">About Me</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-xl border border-gray-600 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
                <span className="w-2 h-8 bg-purple-500 mr-4 rounded"></span>
                Who I Am
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a dedicated Software Engineering student with a strong passion for building impactful, real-world systems. 
                As a full-stack developer, I've worked extensively with modern technologies to develop scalable and production-ready applications.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-xl border border-gray-600 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
                <span className="w-2 h-8 bg-purple-500 mr-4 rounded"></span>
                Recent Work
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Most recently, I led the development of <span className="text-purple-400 font-semibold">Yugo</span>, a smart fare collection platform for public transportation in Nepal. 
                This involved working across backend architecture, mobile app development, and admin dashboard creation, including QR-based tap-in/out systems, wallet integration, and real-time fare calculation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-xl border border-gray-600 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
                <span className="w-2 h-8 bg-purple-500 mr-4 rounded"></span>
                What Drives Me
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm passionate about contributing to impactful projects, learning cutting-edge technologies, and collaborating in fast-paced environments. 
                Currently open to learning opportunities, internships, and collaborations in backend, mobile, or full-stack development.
              </p>
            </div>
          </div>

          {/* Right Column - Tech Stack */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-xl border border-gray-600">
              <h3 className="text-2xl font-bold text-purple-400 mb-8 flex items-center">
                <span className="w-2 h-8 bg-purple-500 mr-4 rounded"></span>
                Tech Stack
              </h3>
              
              <div className="space-y-6">
                <div className="group">
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">Backend Development</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Spring Boot', 'Java', 'PostgreSQL', 'Redis', 'RESTful APIs'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-purple-600 bg-opacity-20 text-purple-300 rounded-full text-sm border border-purple-500 border-opacity-30 hover:border-opacity-100 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">Frontend & Mobile</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'Tailwind CSS', 'Flutter', 'JavaScript', 'Responsive Design'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-600 bg-opacity-20 text-blue-300 rounded-full text-sm border border-blue-500 border-opacity-30 hover:border-opacity-100 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">DevOps & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Docker', 'Git', 'NGINX', 'Microservices', 'Database Design'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-green-600 bg-opacity-20 text-green-300 rounded-full text-sm border border-green-500 border-opacity-30 hover:border-opacity-100 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-800 to-purple-900 p-6 rounded-xl border border-purple-500 border-opacity-30">
              <div className="text-center">
                <p className="text-purple-200 text-lg font-medium mb-2">Full-Stack Experience</p>
                <p className="text-purple-300 text-sm">From RESTful APIs to Mobile Apps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-20">
        <Skills />
      </div>
    </section>
  );
};

export default About;