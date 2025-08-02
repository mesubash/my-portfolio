import React from "react";

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-white">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Main Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 md:p-8 rounded-xl border border-gray-600 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-4 md:mb-6 flex items-center">
                <span className="w-2 h-6 md:h-8 bg-purple-500 mr-3 md:mr-4 rounded"></span>
                Who I Am
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                I'm a dedicated Software Engineering student with a strong passion for building impactful, real-world systems. 
                As a full-stack developer, I've worked extensively with modern technologies to develop scalable and production-ready applications.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 md:p-8 rounded-xl border border-gray-600 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-4 md:mb-6 flex items-center">
                <span className="w-2 h-6 md:h-8 bg-purple-500 mr-3 md:mr-4 rounded"></span>
                Recent Work
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Most recently, I led the development of <span className="text-purple-400 font-semibold">Yugo</span>, a smart fare collection platform for public transportation in Nepal. 
                This involved working across backend architecture, mobile app development, and admin dashboard creation, including QR-based tap-in/out systems, wallet integration, and real-time fare calculation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 md:p-8 rounded-xl border border-gray-600 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-4 md:mb-6 flex items-center">
                <span className="w-2 h-6 md:h-8 bg-purple-500 mr-3 md:mr-4 rounded"></span>
                What Drives Me
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                I'm passionate about contributing to impactful projects, learning cutting-edge technologies, and collaborating in fast-paced environments. 
                Currently open to learning opportunities, internships, and collaborations in backend, mobile, or full-stack development.
              </p>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 md:p-8 rounded-xl border border-gray-600">
              <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-6 md:mb-8 flex items-center">
                <span className="w-2 h-6 md:h-8 bg-purple-500 mr-3 md:mr-4 rounded"></span>
                Technical Skills
              </h3>
              
              <div className="space-y-4 md:space-y-6">
                <div className="group">
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 group-hover:text-purple-400 transition-colors">Core Backend Development</h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {['Java (Spring Boot)', 'RESTful APIs', 'Nodejs', 'Relational Databases (PostgreSQL, MySQL)', 'Redis', 'JWT & OAuth2 Security', 'Microservices Architecture'].map((tech) => (
                      <span key={tech} className="px-2 md:px-3 py-1 bg-purple-600 bg-opacity-20 text-purple-300 rounded-full text-xs md:text-sm border border-purple-500 border-opacity-30 hover:border-opacity-100 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 group-hover:text-purple-400 transition-colors">Mobile & Cross-platform Development</h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {['Flutter', 'Android Development (Java)'].map((tech) => (
                      <span key={tech} className="px-2 md:px-3 py-1 bg-emerald-600 bg-opacity-20 text-emerald-300 rounded-full text-xs md:text-sm border border-emerald-500 border-opacity-30 hover:border-opacity-100 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 group-hover:text-purple-400 transition-colors">Frontend Development</h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {['Next.js', 'React.js', 'Tailwind CSS'].map((tech) => (
                      <span key={tech} className="px-2 md:px-3 py-1 bg-blue-600 bg-opacity-20 text-blue-300 rounded-full text-xs md:text-sm border border-blue-500 border-opacity-30 hover:border-opacity-100 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 group-hover:text-purple-400 transition-colors">Machine Learning & Data Science</h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {['Python', 'Scikit-learn', 'Data Preprocessing', 'Spam Message Detection', 'Air Quality Prediction', 'Model Training & Evaluation'].map((tech) => (
                      <span key={tech} className="px-2 md:px-3 py-1 bg-indigo-600 bg-opacity-20 text-indigo-300 rounded-full text-xs md:text-sm border border-indigo-500 border-opacity-30 hover:border-opacity-100 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 group-hover:text-purple-400 transition-colors">DevOps & Infrastructure</h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {['Git & GitHub', 'Containerization (Docker)', 'GitHub Actions (CI/CD)', 'AWS (Cloud Services)', 'Vault (Secrets Management)', 'Nginx (Reverse Proxy, URL Redirection)'].map((tech) => (
                      <span key={tech} className="px-2 md:px-3 py-1 bg-green-600 bg-opacity-20 text-green-300 rounded-full text-xs md:text-sm border border-green-500 border-opacity-30 hover:border-opacity-100 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 group-hover:text-purple-400 transition-colors">System Design & Architecture</h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {['Domain-Driven Design (DDD)', 'Event Logging & Audit Trails', 'API Communication via Feign Clients'].map((tech) => (
                      <span key={tech} className="px-2 md:px-3 py-1 bg-cyan-600 bg-opacity-20 text-cyan-300 rounded-full text-xs md:text-sm border border-cyan-500 border-opacity-30 hover:border-opacity-100 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 group-hover:text-purple-400 transition-colors">Professional & Collaboration</h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {['Agile Development (Team-based workflows)', 'Technical Documentation', 'Project Ownership & End-to-End Delivery'].map((tech) => (
                      <span key={tech} className="px-2 md:px-3 py-1 bg-pink-600 bg-opacity-20 text-pink-300 rounded-full text-xs md:text-sm border border-pink-500 border-opacity-30 hover:border-opacity-100 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-800 to-purple-900 p-4 md:p-6 rounded-xl border border-purple-500 border-opacity-30">
              <div className="text-center">
                <p className="text-purple-200 text-base md:text-lg font-medium mb-1 md:mb-2">Full-Stack Experience</p>
                <p className="text-purple-300 text-sm">From RESTful APIs to Mobile Apps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;