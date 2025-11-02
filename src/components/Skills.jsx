import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const skillCategories = {
  "Core Stack": {
    items: ["Java Spring Boot", "Flutter", "React", "PostgreSQL"],
    color: "purple",
    icon: "⚡"
  },
  "Production Ready": {
    items: ["Docker", "AWS", "CI/CD", "Nginx"],
    color: "green", 
    icon: "🚀"
  },
  "Data & AI": {
    items: ["Python", "Scikit-learn", "ML Models"],
    color: "blue",
    icon: "🤖"
  }
};

const Skills = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100
    });
  }, []);

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-down" data-aos-duration="800">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built With
          </h2>
          <p className="text-gray-400 text-lg">Technologies I use to ship products</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(skillCategories).map(([category, {items, color, icon}], index) => (
            <div 
              key={category} 
              className={`bg-gradient-to-br from-${color}-800/20 to-${color}-900/20 p-6 rounded-xl border border-${color}-500/30 hover:border-${color}-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-${color}-500/20 hover:-translate-y-2 transform`}
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay={index * 100}
            >
              <div className="text-center mb-4">
                <div className="text-3xl mb-2 transform hover:scale-125 hover:rotate-12 transition-all duration-300 inline-block">{icon}</div>
                <h3 className={`text-lg font-semibold text-${color}-400`}>{category}</h3>
              </div>
              <div className="space-y-2">
                {items.map(skill => (
                  <div key={skill} className={`px-3 py-1 bg-${color}-600/10 text-${color}-300 rounded-full text-sm text-center border border-${color}-500/20 hover:border-${color}-400/60 hover:bg-${color}-600/20 hover:shadow-md hover:shadow-${color}-500/20 hover:scale-105 transform transition-all duration-300 cursor-default`}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 transform transition-all duration-300">
            <p className="text-gray-300 text-lg mb-2">
              "The best way to learn is to build real products"
            </p>
            <p className="text-gray-500 text-sm">- Every successful developer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
